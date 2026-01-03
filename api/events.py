"""Event dispatcher for system events and notifications.

This module provides a central event dispatching system that allows
different parts of the application to react to system events without
tight coupling. Handlers can be registered for specific event types
and will be invoked synchronously when events are dispatched.

Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7
"""
import logging
from typing import Callable, Dict, List, Any

# Configure logging
logger = logging.getLogger(__name__)

# Event handler registry: maps event types to lists of handler functions
_event_handlers: Dict[str, List[Callable]] = {}

# Supported event types
EVENT_LEAVE_REQUESTED = "leave_requested"
EVENT_LEAVE_APPROVED = "leave_approved"
EVENT_LEAVE_REJECTED = "leave_rejected"
EVENT_ATTENDANCE_UPDATED = "attendance_updated"
EVENT_PAYSLIP_GENERATED = "payslip_generated"
EVENT_SALARY_UPDATED = "salary_updated"

SUPPORTED_EVENT_TYPES = {
    EVENT_LEAVE_REQUESTED,
    EVENT_LEAVE_APPROVED,
    EVENT_LEAVE_REJECTED,
    EVENT_ATTENDANCE_UPDATED,
    EVENT_PAYSLIP_GENERATED,
    EVENT_SALARY_UPDATED,
}


def register_handler(event_type: str, handler: Callable[[dict], None]) -> None:
    """
    Register an event handler for a specific event type.
    
    Handlers are functions that accept a single dictionary argument (the event payload)
    and return None. Multiple handlers can be registered for the same event type,
    and they will all be invoked when that event is dispatched.
    
    Args:
        event_type: The type of event to handle (e.g., "leave_requested")
        handler: A callable that accepts a dict payload and returns None
        
    Requirements: 26.5
    
    Example:
        def on_leave_requested(payload: dict) -> None:
            print(f"Leave requested by user {payload['user_id']}")
        
        register_handler("leave_requested", on_leave_requested)
    """
    if event_type not in SUPPORTED_EVENT_TYPES:
        logger.warning(f"Registering handler for unsupported event type: {event_type}")
    
    if event_type not in _event_handlers:
        _event_handlers[event_type] = []
    
    _event_handlers[event_type].append(handler)
    logger.info(f"Registered handler for event type: {event_type}")


def dispatch_event(event_type: str, payload: dict) -> None:
    """
    Dispatch an event to all registered handlers.
    
    Executes all handlers registered for the given event type synchronously
    within the current request. If a handler raises an exception, it is logged
    but does not prevent other handlers from executing or block the main request.
    
    Args:
        event_type: The type of event being dispatched
        payload: Dictionary containing event data (e.g., user_id, request_id, etc.)
        
    Requirements: 26.1, 26.2, 26.3, 26.4, 26.6, 26.7
    
    Example:
        dispatch_event("leave_requested", {
            "user_id": 123,
            "request_id": 456,
            "leave_type": "Sick",
            "start_date": "2024-01-15",
            "end_date": "2024-01-17"
        })
    """
    if event_type not in SUPPORTED_EVENT_TYPES:
        logger.warning(f"Dispatching unsupported event type: {event_type}")
    
    handlers = _event_handlers.get(event_type, [])
    
    if not handlers:
        logger.debug(f"No handlers registered for event type: {event_type}")
        return
    
    logger.info(f"Dispatching event: {event_type} with payload: {payload}")
    
    # Execute all handlers synchronously
    for handler in handlers:
        try:
            handler(payload)
        except Exception as e:
            # Log the error but don't block other handlers or the main request
            logger.error(
                f"Error executing handler for event {event_type}: {str(e)}",
                exc_info=True
            )


def clear_handlers() -> None:
    """
    Clear all registered event handlers.
    
    This is primarily useful for testing to ensure a clean state
    between test runs.
    """
    global _event_handlers
    _event_handlers = {}
    logger.info("Cleared all event handlers")


def get_registered_handlers(event_type: str) -> List[Callable]:
    """
    Get all handlers registered for a specific event type.
    
    This is primarily useful for testing and debugging.
    
    Args:
        event_type: The event type to query
        
    Returns:
        List of handler functions registered for the event type
    """
    return _event_handlers.get(event_type, []).copy()
