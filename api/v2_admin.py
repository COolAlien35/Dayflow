"""API v2 Admin endpoints for advanced features."""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Dict, Optional

from api.database import get_db
from api.auth import require_role
from api.models import FeatureFlag, RoleChangeLog, User, Profile
from api.schemas import (
    FeatureFlagsListResponse,
    FeatureFlagUpdate,
    FeatureFlagUpdateResponse,
    FeatureFlagResponse,
    RoleUpdate,
    RoleUpdateResponse,
    RoleChangeLogListResponse,
    RoleChangeLogResponse,
    UserResponse
)
from api.feature_flags import get_all_feature_flags
from api.role_management import update_user_role
from datetime import datetime


router = APIRouter(prefix="/api/v2/admin", tags=["Admin v2"])


@router.get("/feature-flags", response_model=FeatureFlagsListResponse)
def get_feature_flags(
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get all feature flags and their states (Admin only).
    
    Returns a dictionary mapping feature names to their enabled status.
    
    Requirements: 32.5
    """
    flags = get_all_feature_flags(db)
    
    return FeatureFlagsListResponse(flags=flags)


@router.put("/feature-flags/{feature_name}", response_model=FeatureFlagUpdateResponse)
def update_feature_flag(
    feature_name: str,
    request: FeatureFlagUpdate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Update a feature flag state (Admin only).
    
    Enables or disables a specific feature flag.
    
    Requirements: 32.5
    """
    # Fetch feature flag
    feature_flag = db.query(FeatureFlag).filter(
        FeatureFlag.feature_name == feature_name
    ).first()
    
    if not feature_flag:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feature flag '{feature_name}' not found"
        )
    
    # Update enabled status
    feature_flag.enabled = request.enabled
    feature_flag.updated_at = datetime.utcnow()
    
    try:
        db.commit()
        db.refresh(feature_flag)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update feature flag"
        )
    
    # Build response
    flag_response = FeatureFlagResponse(
        feature_name=feature_flag.feature_name,
        enabled=feature_flag.enabled,
        description=feature_flag.description,
        updated_at=feature_flag.updated_at.isoformat()
    )
    
    return FeatureFlagUpdateResponse(
        flag=flag_response,
        message=f"Feature flag '{feature_name}' updated successfully"
    )


@router.put("/users/{user_id}/role", response_model=RoleUpdateResponse)
def update_user_role_endpoint(
    user_id: int,
    request: RoleUpdate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Update a user's role (Admin only).
    
    Changes a user's role to Admin or Employee. Prevents self-role-change
    and creates an audit log entry.
    
    Args:
        user_id: ID of the user whose role is being changed
        request: RoleUpdate containing the new role
        current_user: Authenticated admin user
        db: Database session
        
    Returns:
        Updated user information and success message
        
    Requirements: 29.7
    """
    # Get admin ID from current user
    admin_id = current_user["user_id"]
    
    # Update the user's role
    updated_user = update_user_role(
        user_id=user_id,
        new_role=request.role,
        admin_id=admin_id,
        db=db
    )
    
    # Build response
    user_response = UserResponse(
        id=updated_user.id,
        email=updated_user.email,
        role=updated_user.role,
        created_at=updated_user.created_at.isoformat(),
        updated_at=updated_user.updated_at.isoformat()
    )
    
    return RoleUpdateResponse(
        user=user_response,
        message=f"User role updated to '{request.role}' successfully"
    )


@router.get("/role-changes", response_model=RoleChangeLogListResponse)
def get_role_changes(
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get role change audit log (Admin only).
    
    Returns a paginated list of role changes with optional filtering by user ID.
    
    Args:
        user_id: Optional user ID to filter by
        page: Page number (1-indexed)
        page_size: Number of items per page
        current_user: Authenticated admin user
        db: Database session
        
    Returns:
        Paginated list of role change log entries
        
    Requirements: 29.7
    """
    # Build query
    query = db.query(RoleChangeLog)
    
    # Apply user_id filter if provided
    if user_id is not None:
        query = query.filter(RoleChangeLog.user_id == user_id)
    
    # Get total count
    total = query.count()
    
    # Apply pagination and ordering (most recent first)
    changes = query.order_by(RoleChangeLog.changed_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    # Build response
    change_responses = [
        RoleChangeLogResponse(
            id=change.id,
            user_id=change.user_id,
            old_role=change.old_role,
            new_role=change.new_role,
            changed_by=change.changed_by,
            changed_at=change.changed_at.isoformat()
        )
        for change in changes
    ]
    
    return RoleChangeLogListResponse(
        changes=change_responses,
        total=total,
        page=page,
        page_size=page_size
    )
