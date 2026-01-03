"""Example event handlers for the event dispatcher.

This module demonstrates how to register event handlers for system events.
In a real application, you would register these handlers at application startup.

Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 26.6
"""
import logging
from api.events import (
    register_handler,
    EVENT_LEAVE_REQUESTED,
    EVENT_LEAVE_APPROVED,
    EVENT_LEAVE_REJECTED,
    EVENT_ATTENDANCE_UPDATED,
)

logger = logging.getLogger(__name__)


def on_leave_requested(payload: dict) -> None:
    """
    Handle leave_requested event.
    
    This handler is invoked when an employee submits a new leave request.
    In a real application, this might:
    - Send notifications to admins
    - Log the request for audit purposes
    - Update analytics dashboards
    
    Requirements: 26.1
    """
    logger.info(
        f"Leave requested by user {payload['user_id']}: "
        f"{payload['leave_type']} from {payload['start_date']} to {payload['end_date']}"
    )
    # Example: Send notification to admins
    # notify_admins(f"New leave request from user {payload['user_id']}")


def on_leave_approved(payload: dict) -> None:
    """
    Handle leave_approved event.
    
    This handler is invoked when an admin approves a leave request.
    In a real application, this might:
    - Send notification to the employee
    - Update leave balance
    - Send calendar invites
    
    Requirements: 26.2
    """
    logger.info(
        f"Leave approved for user {payload['user_id']}: "
        f"Request {payload['request_id']} approved by admin {payload['reviewed_by']}"
    )
    # Example: Send notification to employee
    # notify_user(payload['user_id'], f"Your leave request has been approved")


def on_leave_rejected(payload: dict) -> None:
    """
    Handle leave_rejected event.
    
    This handler is invoked when an admin rejects a leave request.
    In a real application, this might:
    - Send notification to the employee with rejection reason
    - Log the rejection for audit purposes
    
    Requirements: 26.3
    """
    logger.info(
        f"Leave rejected for user {payload['user_id']}: "
        f"Request {payload['request_id']} rejected by admin {payload['reviewed_by']}"
    )
    # Example: Send notification to employee
    # notify_user(
    #     payload['user_id'],
    #     f"Your leave request has been rejected. Reason: {payload.get('admin_comments', 'N/A')}"
    # )


def on_attendance_updated(payload: dict) -> None:
    """
    Handle attendance_updated event.
    
    This handler is invoked when an employee checks in or checks out.
    In a real application, this might:
    - Send real-time updates to admin dashboards
    - Update attendance analytics
    - Trigger alerts for late check-ins
    
    Requirements: 26.4
    """
    logger.info(
        f"Attendance updated for user {payload['user_id']}: "
        f"{payload['action']} on {payload['date']}"
    )
    # Example: Push update to admin dashboard
    # push_to_admin_dashboard({
    #     "type": "attendance_update",
    #     "user_id": payload['user_id'],
    #     "action": payload['action']
    # })


def register_all_handlers() -> None:
    """
    Register all event handlers.
    
    This function should be called at application startup to register
    all event handlers with the event dispatcher.
    
    Requirements: 26.5
    """
    register_handler(EVENT_LEAVE_REQUESTED, on_leave_requested)
    register_handler(EVENT_LEAVE_APPROVED, on_leave_approved)
    register_handler(EVENT_LEAVE_REJECTED, on_leave_rejected)
    register_handler(EVENT_ATTENDANCE_UPDATED, on_attendance_updated)
    
    logger.info("All event handlers registered successfully")


# Example usage:
# At application startup, call:
# from api.event_handlers_example import register_all_handlers
# register_all_handlers()
