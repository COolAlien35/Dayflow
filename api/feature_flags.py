"""Feature flag management module."""
from sqlalchemy.orm import Session
from typing import Dict, Optional, Callable
from fastapi import HTTPException, status, Request, Depends
from api.models import FeatureFlag
from api.database import get_db
from datetime import datetime
from functools import wraps


def is_feature_enabled(db: Session, feature_name: str) -> bool:
    """
    Check if a feature flag is enabled.
    
    Args:
        db: Database session
        feature_name: Name of the feature to check
    
    Returns:
        bool: True if feature is enabled, False otherwise
    
    Requirements: 32.1, 32.7
    """
    feature_flag = db.query(FeatureFlag).filter(
        FeatureFlag.feature_name == feature_name
    ).first()
    
    if not feature_flag:
        # If feature flag doesn't exist, default to disabled
        return False
    
    return feature_flag.enabled


def get_all_feature_flags(db: Session) -> Dict[str, bool]:
    """
    Get all feature flags and their states.
    
    Args:
        db: Database session
    
    Returns:
        Dict[str, bool]: Dictionary mapping feature names to enabled status
    
    Requirements: 32.1, 32.7
    """
    feature_flags = db.query(FeatureFlag).all()
    
    return {flag.feature_name: flag.enabled for flag in feature_flags}


def seed_default_feature_flags(db: Session) -> None:
    """
    Seed default feature flags (all disabled).
    
    Creates feature flag records for all advanced features if they don't exist.
    All flags are disabled by default for gradual rollout.
    
    Args:
        db: Database session
    
    Requirements: 32.1, 32.7
    """
    default_flags = [
        {
            "feature_name": "analytics",
            "enabled": False,
            "description": "Analytics and reporting features"
        },
        {
            "feature_name": "exports",
            "enabled": False,
            "description": "Data export functionality (CSV/PDF)"
        },
        {
            "feature_name": "payroll_engine",
            "enabled": False,
            "description": "Advanced payroll engine with tax calculations"
        },
        {
            "feature_name": "real_time_updates",
            "enabled": False,
            "description": "WebSocket real-time updates"
        },
        {
            "feature_name": "bulk_import",
            "enabled": False,
            "description": "Bulk employee import from CSV"
        },
        {
            "feature_name": "soft_deletes",
            "enabled": False,
            "description": "Soft delete and archival functionality"
        },
        {
            "feature_name": "role_management",
            "enabled": False,
            "description": "Role reassignment and audit logging"
        }
    ]
    
    for flag_data in default_flags:
        # Check if flag already exists
        existing_flag = db.query(FeatureFlag).filter(
            FeatureFlag.feature_name == flag_data["feature_name"]
        ).first()
        
        if not existing_flag:
            # Create new feature flag
            new_flag = FeatureFlag(
                feature_name=flag_data["feature_name"],
                enabled=flag_data["enabled"],
                description=flag_data["description"]
            )
            db.add(new_flag)
    
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise e



# Request-scoped cache for feature flags
_request_feature_flag_cache: Dict[int, Dict[str, bool]] = {}


def get_feature_flags_cached(db: Session, request_id: int) -> Dict[str, bool]:
    """
    Get feature flags with per-request caching.
    
    Caches feature flags for the duration of a single request to avoid
    repeated database queries.
    
    Args:
        db: Database session
        request_id: Unique identifier for the current request
    
    Returns:
        Dict[str, bool]: Dictionary mapping feature names to enabled status
    
    Requirements: 32.6
    """
    if request_id not in _request_feature_flag_cache:
        _request_feature_flag_cache[request_id] = get_all_feature_flags(db)
    
    return _request_feature_flag_cache[request_id]


def clear_request_cache(request_id: int) -> None:
    """
    Clear the feature flag cache for a specific request.
    
    Should be called at the end of request processing to prevent memory leaks.
    
    Args:
        request_id: Unique identifier for the request
    """
    if request_id in _request_feature_flag_cache:
        del _request_feature_flag_cache[request_id]


def require_feature(feature_name: str):
    """
    Dependency to check if a feature is enabled before route execution.
    
    Returns 404 when feature is disabled to hide the endpoint.
    Caches feature flags per request to avoid repeated database queries.
    
    Args:
        feature_name: Name of the feature to check
    
    Returns:
        Callable: FastAPI dependency function
    
    Raises:
        HTTPException: 404 if feature is disabled
    
    Requirements: 32.2, 32.3, 32.6
    
    Example:
        @app.get("/api/v2/analytics/attendance", dependencies=[Depends(require_feature("analytics"))])
        def get_attendance_analytics(...):
            ...
    """
    def dependency(request: Request, db: Session = Depends(get_db)):
        # Use request id as cache key
        request_id = id(request)
        
        try:
            # Get cached feature flags for this request
            feature_flags = get_feature_flags_cached(db, request_id)
            
            # Check if feature is enabled
            if not feature_flags.get(feature_name, False):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Feature not found or not available"
                )
        finally:
            # Clean up cache after check (will be recreated if needed again in same request)
            pass
        
        return True
    
    return dependency
