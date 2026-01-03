"""Notification system for user notifications.

This module provides functions to create and manage notifications
for users based on system events. It also integrates with WebSocket
push notifications for real-time updates.

Requirements: 27.1, 27.2, 27.3, 27.4, 27.5, 27.6
"""
import logging
import asyncio
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session

from api.models import Notification

# Configure logging
logger = logging.getLogger(__name__)


def create_notification(
    db: Session,
    user_id: int,
    notification_type: str,
    message: str,
    related_entity_type: Optional[str] = None,
    related_entity_id: Optional[int] = None
) -> Notification:
    """
    Create a notification record in the database.
    
    Stores notifications with type, message, timestamp, and related entity information.
    Notifications are created as unread by default.
    
    Args:
        db: Database session
        user_id: ID of the user to notify
        notification_type: Type of notification (e.g., "leave_approved", "leave_rejected")
        message: Human-readable notification message
        related_entity_type: Optional type of related entity (e.g., "leave_request", "attendance")
        related_entity_id: Optional ID of related entity
        
    Returns:
        Created Notification object
        
    Requirements: 27.5, 27.6
    
    Example:
        notification = create_notification(
            db=db,
            user_id=123,
            notification_type="leave_approved",
            message="Your leave request has been approved",
            related_entity_type="leave_request",
            related_entity_id=456
        )
    """
    notification = Notification(
        user_id=user_id,
        notification_type=notification_type,
        message=message,
        related_entity_type=related_entity_type,
        related_entity_id=related_entity_id,
        is_read=False,
        created_at=datetime.utcnow()
    )
    
    try:
        db.add(notification)
        db.commit()
        db.refresh(notification)
        logger.info(f"Created notification {notification.id} for user {user_id}: {notification_type}")
        return notification
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to create notification for user {user_id}: {str(e)}", exc_info=True)
        raise



def handle_leave_approved(payload: dict) -> None:
    """
    Handler for leave_approved event.
    
    Creates a notification for the employee whose leave was approved.
    Pushes real-time update via WebSocket if user is connected.
    Falls back to database storage if no active connections.
    Expects 'db' key in payload with database session.
    
    Args:
        payload: Event payload containing user_id, request_id, leave_type, db, etc.
        
    Requirements: 27.1, 27.4, 27.5
    """
    from api.websockets import push_update
    
    db = payload.get("db")
    if not db:
        logger.error("No database session in payload for leave_approved handler")
        return
    
    user_id = payload.get("user_id")
    request_id = payload.get("request_id")
    leave_type = payload.get("leave_type")
    start_date = payload.get("start_date")
    end_date = payload.get("end_date")
    
    message = f"Your {leave_type} leave request from {start_date} to {end_date} has been approved."
    
    # Try to push via WebSocket first
    try:
        # Run async push_update in sync context
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        pushed = loop.run_until_complete(push_update(
            user_id=user_id,
            update_type="leave_approved",
            payload={
                "request_id": request_id,
                "message": message,
                "leave_type": leave_type,
                "start_date": start_date,
                "end_date": end_date
            }
        ))
        loop.close()
        
        if pushed:
            logger.info(f"Pushed leave_approved update via WebSocket to user {user_id}")
        else:
            logger.debug(f"No active WebSocket connections for user {user_id}, falling back to database")
    except Exception as e:
        logger.error(f"Failed to push WebSocket update: {str(e)}", exc_info=True)
        pushed = False
    
    # Always create database notification as fallback/backup
    try:
        create_notification(
            db=db,
            user_id=user_id,
            notification_type="leave_approved",
            message=message,
            related_entity_type="leave_request",
            related_entity_id=request_id
        )
        logger.info(f"Notification sent to user {user_id} for approved leave request {request_id}")
    except Exception as e:
        logger.error(f"Failed to create notification for leave approval: {str(e)}", exc_info=True)


def handle_leave_rejected(payload: dict) -> None:
    """
    Handler for leave_rejected event.
    
    Creates a notification for the employee whose leave was rejected,
    including admin comments if provided.
    Pushes real-time update via WebSocket if user is connected.
    Falls back to database storage if no active connections.
    Expects 'db' key in payload with database session.
    
    Args:
        payload: Event payload containing user_id, request_id, leave_type, admin_comments, db, etc.
        
    Requirements: 27.2, 27.4, 27.5
    """
    from api.websockets import push_update
    
    db = payload.get("db")
    if not db:
        logger.error("No database session in payload for leave_rejected handler")
        return
    
    user_id = payload.get("user_id")
    request_id = payload.get("request_id")
    leave_type = payload.get("leave_type")
    start_date = payload.get("start_date")
    end_date = payload.get("end_date")
    admin_comments = payload.get("admin_comments")
    
    message = f"Your {leave_type} leave request from {start_date} to {end_date} has been rejected."
    
    if admin_comments:
        message += f" Reason: {admin_comments}"
    
    # Try to push via WebSocket first
    try:
        # Run async push_update in sync context
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        pushed = loop.run_until_complete(push_update(
            user_id=user_id,
            update_type="leave_rejected",
            payload={
                "request_id": request_id,
                "message": message,
                "leave_type": leave_type,
                "start_date": start_date,
                "end_date": end_date,
                "admin_comments": admin_comments
            }
        ))
        loop.close()
        
        if pushed:
            logger.info(f"Pushed leave_rejected update via WebSocket to user {user_id}")
        else:
            logger.debug(f"No active WebSocket connections for user {user_id}, falling back to database")
    except Exception as e:
        logger.error(f"Failed to push WebSocket update: {str(e)}", exc_info=True)
        pushed = False
    
    # Always create database notification as fallback/backup
    try:
        create_notification(
            db=db,
            user_id=user_id,
            notification_type="leave_rejected",
            message=message,
            related_entity_type="leave_request",
            related_entity_id=request_id
        )
        logger.info(f"Notification sent to user {user_id} for rejected leave request {request_id}")
    except Exception as e:
        logger.error(f"Failed to create notification for leave rejection: {str(e)}", exc_info=True)


def handle_leave_requested(payload: dict) -> None:
    """
    Handler for leave_requested event.
    
    Creates notifications for all admin users when a new leave request is submitted.
    Pushes real-time updates via WebSocket to all connected admins.
    Falls back to database storage if no active connections.
    Expects 'db' key in payload with database session.
    
    Args:
        payload: Event payload containing user_id, request_id, leave_type, db, etc.
        
    Requirements: 27.3, 27.4, 27.5
    """
    from api.models import User, Profile
    from api.websockets import push_update
    
    db = payload.get("db")
    if not db:
        logger.error("No database session in payload for leave_requested handler")
        return
    
    requester_id = payload.get("user_id")
    request_id = payload.get("request_id")
    leave_type = payload.get("leave_type")
    start_date = payload.get("start_date")
    end_date = payload.get("end_date")
    days_count = payload.get("days_count")
    
    # Get requester's name
    try:
        requester = db.query(User, Profile).join(
            Profile, User.id == Profile.user_id
        ).filter(User.id == requester_id).first()
        
        if requester:
            user, profile = requester
            requester_name = f"{profile.first_name} {profile.last_name}"
        else:
            requester_name = f"User {requester_id}"
    except Exception as e:
        logger.warning(f"Failed to fetch requester name: {str(e)}")
        requester_name = f"User {requester_id}"
    
    message = f"{requester_name} has requested {leave_type} leave from {start_date} to {end_date} ({days_count} days)."
    
    # Get all admin users
    try:
        admin_users = db.query(User).filter(User.role == "Admin").all()
        
        for admin in admin_users:
            # Try to push via WebSocket first
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                pushed = loop.run_until_complete(push_update(
                    user_id=admin.id,
                    update_type="leave_requested",
                    payload={
                        "request_id": request_id,
                        "message": message,
                        "requester_id": requester_id,
                        "requester_name": requester_name,
                        "leave_type": leave_type,
                        "start_date": start_date,
                        "end_date": end_date,
                        "days_count": days_count
                    }
                ))
                loop.close()
                
                if pushed:
                    logger.info(f"Pushed leave_requested update via WebSocket to admin {admin.id}")
            except Exception as e:
                logger.error(f"Failed to push WebSocket update to admin {admin.id}: {str(e)}", exc_info=True)
            
            # Always create database notification as fallback/backup
            try:
                create_notification(
                    db=db,
                    user_id=admin.id,
                    notification_type="leave_requested",
                    message=message,
                    related_entity_type="leave_request",
                    related_entity_id=request_id
                )
            except Exception as e:
                logger.error(f"Failed to create notification for admin {admin.id}: {str(e)}", exc_info=True)
        
        logger.info(f"Notifications sent to {len(admin_users)} admins for leave request {request_id}")
    except Exception as e:
        logger.error(f"Failed to notify admins about leave request: {str(e)}", exc_info=True)


def handle_attendance_updated(payload: dict) -> None:
    """
    Handler for attendance_updated event.
    
    Pushes real-time updates via WebSocket to all connected admins
    when an employee checks in or checks out.
    Does not create database notifications (attendance updates are not
    critical enough to warrant persistent notifications).
    Expects 'db' key in payload with database session.
    
    Args:
        payload: Event payload containing user_id, attendance_id, date, action, status, db, etc.
        
    Requirements: 27.4, 27.5
    """
    from api.models import User, Profile
    from api.websockets import push_update
    
    db = payload.get("db")
    if not db:
        logger.error("No database session in payload for attendance_updated handler")
        return
    
    user_id = payload.get("user_id")
    attendance_id = payload.get("attendance_id")
    date = payload.get("date")
    action = payload.get("action")  # "check_in" or "check_out"
    status = payload.get("status")
    
    # Get employee's name
    try:
        employee = db.query(User, Profile).join(
            Profile, User.id == Profile.user_id
        ).filter(User.id == user_id).first()
        
        if employee:
            user, profile = employee
            employee_name = f"{profile.first_name} {profile.last_name}"
        else:
            employee_name = f"User {user_id}"
    except Exception as e:
        logger.warning(f"Failed to fetch employee name: {str(e)}")
        employee_name = f"User {user_id}"
    
    # Build message
    action_text = "checked in" if action == "check_in" else "checked out"
    message = f"{employee_name} has {action_text} on {date}"
    
    # Get all admin users
    try:
        admin_users = db.query(User).filter(User.role == "Admin").all()
        
        for admin in admin_users:
            # Try to push via WebSocket
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                pushed = loop.run_until_complete(push_update(
                    user_id=admin.id,
                    update_type="attendance_updated",
                    payload={
                        "attendance_id": attendance_id,
                        "employee_id": user_id,
                        "employee_name": employee_name,
                        "date": date,
                        "action": action,
                        "status": status,
                        "message": message
                    }
                ))
                loop.close()
                
                if pushed:
                    logger.info(f"Pushed attendance_updated update via WebSocket to admin {admin.id}")
            except Exception as e:
                logger.error(f"Failed to push WebSocket update to admin {admin.id}: {str(e)}", exc_info=True)
        
        logger.info(f"Attendance update pushed to {len(admin_users)} admins")
    except Exception as e:
        logger.error(f"Failed to notify admins about attendance update: {str(e)}", exc_info=True)



def register_notification_handlers() -> None:
    """
    Register notification handlers for system events.
    
    This function should be called once during application initialization
    to register all notification handlers with the event dispatcher.
    Handlers expect a 'db' key in the event payload containing the database session.
    
    Requirements: 27.1, 27.2, 27.3, 27.4, 27.5
    """
    from api.events import (
        register_handler, 
        EVENT_LEAVE_APPROVED, 
        EVENT_LEAVE_REJECTED, 
        EVENT_LEAVE_REQUESTED,
        EVENT_ATTENDANCE_UPDATED
    )
    
    # Register handlers
    register_handler(EVENT_LEAVE_APPROVED, handle_leave_approved)
    register_handler(EVENT_LEAVE_REJECTED, handle_leave_rejected)
    register_handler(EVENT_LEAVE_REQUESTED, handle_leave_requested)
    register_handler(EVENT_ATTENDANCE_UPDATED, handle_attendance_updated)
    
    logger.info("Notification handlers registered successfully")
