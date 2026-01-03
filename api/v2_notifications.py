"""API v2 Notification endpoints.

This module provides endpoints for managing user notifications.

Requirements: 27.7
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from api.database import get_db
from api.auth import get_current_user
from api.models import Notification
from api.schemas import (
    NotificationListResponse,
    NotificationResponse,
    NotificationMarkReadResponse
)
from datetime import datetime


router = APIRouter(prefix="/api/v2", tags=["Notifications v2"])


@router.get("/notifications", response_model=NotificationListResponse)
def get_notifications(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    unread_only: bool = Query(False),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get notifications for the authenticated user.
    
    Supports pagination and filtering by unread status.
    Returns notifications ordered by created_at descending (newest first).
    
    Args:
        page: Page number (default: 1)
        page_size: Number of notifications per page (default: 10, max: 100)
        unread_only: If True, return only unread notifications (default: False)
        current_user: Authenticated user from JWT token
        db: Database session
        
    Returns:
        NotificationListResponse with notifications, unread count, and pagination info
        
    Requirements: 27.7
    """
    user_id = current_user["user_id"]
    
    # Build query for user's notifications
    query = db.query(Notification).filter(Notification.user_id == user_id)
    
    # Apply unread filter if requested
    if unread_only:
        query = query.filter(Notification.is_read == False)
    
    # Order by created_at descending (newest first)
    query = query.order_by(Notification.created_at.desc())
    
    # Get total count before pagination
    total = query.count()
    
    # Get unread count (always calculate, regardless of filter)
    unread_count = db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).count()
    
    # Apply pagination
    offset = (page - 1) * page_size
    results = query.offset(offset).limit(page_size).all()
    
    # Convert to response format
    notifications = []
    for notification in results:
        notifications.append(NotificationResponse(
            id=notification.id,
            notification_type=notification.notification_type,
            message=notification.message,
            related_entity_type=notification.related_entity_type,
            related_entity_id=notification.related_entity_id,
            is_read=notification.is_read,
            created_at=notification.created_at.isoformat()
        ))
    
    return NotificationListResponse(
        notifications=notifications,
        unread_count=unread_count,
        total=total,
        page=page,
        page_size=page_size
    )


@router.put("/notifications/{notification_id}/read", response_model=NotificationMarkReadResponse)
def mark_notification_read(
    notification_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Mark a notification as read.
    
    Only the notification owner can mark their own notifications as read.
    
    Args:
        notification_id: ID of the notification to mark as read
        current_user: Authenticated user from JWT token
        db: Database session
        
    Returns:
        NotificationMarkReadResponse with updated notification
        
    Requirements: 27.7
    """
    user_id = current_user["user_id"]
    
    # Fetch notification
    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Verify notification belongs to current user
    if notification.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only mark your own notifications as read"
        )
    
    # Mark as read
    notification.is_read = True
    
    try:
        db.commit()
        db.refresh(notification)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to mark notification as read"
        )
    
    # Build response
    notification_response = NotificationResponse(
        id=notification.id,
        notification_type=notification.notification_type,
        message=notification.message,
        related_entity_type=notification.related_entity_type,
        related_entity_id=notification.related_entity_id,
        is_read=notification.is_read,
        created_at=notification.created_at.isoformat()
    )
    
    return NotificationMarkReadResponse(
        notification=notification_response,
        message="Notification marked as read"
    )
