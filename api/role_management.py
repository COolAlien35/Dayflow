"""Role management functions for user role updates and audit logging."""
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from api.models import User, RoleChangeLog


def update_user_role(
    user_id: int,
    new_role: str,
    admin_id: int,
    db: Session
) -> User:
    """
    Update a user's role and create an audit log entry.
    
    Validates the new role, prevents self-role-change, updates the user's role,
    and creates an audit log entry.
    
    Args:
        user_id: ID of the user whose role is being changed
        new_role: New role to assign (must be "Admin" or "Employee")
        admin_id: ID of the admin performing the role change
        db: Database session
        
    Returns:
        Updated User object
        
    Raises:
        HTTPException: 400 if role is invalid
        HTTPException: 403 if admin tries to change their own role
        HTTPException: 404 if user not found
        
    Requirements: 29.1, 29.2, 29.5, 29.6
    """
    # Validate new role (Admin or Employee)
    if new_role not in ["Admin", "Employee"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Must be 'Admin' or 'Employee'"
        )
    
    # Prevent self-role-change
    if user_id == admin_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot change your own role"
        )
    
    # Fetch the user
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Store old role for audit log
    old_role = user.role
    
    # Check if role is actually changing
    if old_role == new_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User already has role '{new_role}'"
        )
    
    # Update the user's role
    user.role = new_role
    user.updated_at = datetime.utcnow()
    
    # Create audit log entry
    log_entry = log_role_change(
        user_id=user_id,
        old_role=old_role,
        new_role=new_role,
        changed_by=admin_id,
        db=db
    )
    
    try:
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user role"
        )
    
    return user


def log_role_change(
    user_id: int,
    old_role: str,
    new_role: str,
    changed_by: int,
    db: Session
) -> RoleChangeLog:
    """
    Create an audit log entry for a role change.
    
    Args:
        user_id: ID of the user whose role was changed
        old_role: Previous role
        new_role: New role
        changed_by: ID of the admin who made the change
        db: Database session
        
    Returns:
        Created RoleChangeLog object
        
    Requirements: 29.6
    """
    log_entry = RoleChangeLog(
        user_id=user_id,
        old_role=old_role,
        new_role=new_role,
        changed_by=changed_by,
        changed_at=datetime.utcnow()
    )
    
    db.add(log_entry)
    # Note: Commit is handled by the caller (update_user_role)
    
    return log_entry
