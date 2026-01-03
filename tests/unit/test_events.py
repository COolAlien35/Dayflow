"""Unit tests for event dispatcher functionality.

Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7
"""
import pytest
from api.events import (
    register_handler,
    dispatch_event,
    clear_handlers,
    get_registered_handlers,
    EVENT_LEAVE_REQUESTED,
    EVENT_LEAVE_APPROVED,
    EVENT_LEAVE_REJECTED,
    EVENT_ATTENDANCE_UPDATED,
    EVENT_PAYSLIP_GENERATED,
    EVENT_SALARY_UPDATED,
)


@pytest.fixture(autouse=True)
def clear_event_handlers():
    """Clear event handlers before and after each test."""
    clear_handlers()
    yield
    clear_handlers()


class TestEventRegistration:
    """Test event handler registration."""
    
    def test_register_handler_for_event_type(self):
        """Test that handlers can be registered for event types."""
        # Requirements: 26.5
        handler_called = []
        
        def test_handler(payload: dict) -> None:
            handler_called.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, test_handler)
        
        handlers = get_registered_handlers(EVENT_LEAVE_REQUESTED)
        assert len(handlers) == 1
        assert handlers[0] == test_handler
    
    def test_register_multiple_handlers_for_same_event(self):
        """Test that multiple handlers can be registered for the same event type."""
        # Requirements: 26.5
        handler1_called = []
        handler2_called = []
        
        def handler1(payload: dict) -> None:
            handler1_called.append(payload)
        
        def handler2(payload: dict) -> None:
            handler2_called.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, handler1)
        register_handler(EVENT_LEAVE_REQUESTED, handler2)
        
        handlers = get_registered_handlers(EVENT_LEAVE_REQUESTED)
        assert len(handlers) == 2
    
    def test_register_handlers_for_different_events(self):
        """Test that handlers can be registered for different event types."""
        # Requirements: 26.5
        def handler1(payload: dict) -> None:
            pass
        
        def handler2(payload: dict) -> None:
            pass
        
        register_handler(EVENT_LEAVE_REQUESTED, handler1)
        register_handler(EVENT_LEAVE_APPROVED, handler2)
        
        assert len(get_registered_handlers(EVENT_LEAVE_REQUESTED)) == 1
        assert len(get_registered_handlers(EVENT_LEAVE_APPROVED)) == 1


class TestEventDispatching:
    """Test event dispatching functionality."""
    
    def test_dispatch_event_invokes_registered_handler(self):
        """Test that dispatching an event invokes the registered handler."""
        # Requirements: 26.1, 26.6
        handler_called = []
        
        def test_handler(payload: dict) -> None:
            handler_called.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, test_handler)
        
        test_payload = {"user_id": 123, "request_id": 456}
        dispatch_event(EVENT_LEAVE_REQUESTED, test_payload)
        
        assert len(handler_called) == 1
        assert handler_called[0] == test_payload
    
    def test_dispatch_event_invokes_all_registered_handlers(self):
        """Test that dispatching an event invokes all registered handlers."""
        # Requirements: 26.6
        handler1_called = []
        handler2_called = []
        
        def handler1(payload: dict) -> None:
            handler1_called.append(payload)
        
        def handler2(payload: dict) -> None:
            handler2_called.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, handler1)
        register_handler(EVENT_LEAVE_REQUESTED, handler2)
        
        test_payload = {"user_id": 123}
        dispatch_event(EVENT_LEAVE_REQUESTED, test_payload)
        
        assert len(handler1_called) == 1
        assert len(handler2_called) == 1
        assert handler1_called[0] == test_payload
        assert handler2_called[0] == test_payload
    
    def test_dispatch_event_with_no_handlers_does_not_error(self):
        """Test that dispatching an event with no handlers does not raise an error."""
        # Requirements: 26.6
        # Should not raise any exception
        dispatch_event(EVENT_LEAVE_REQUESTED, {"user_id": 123})
    
    def test_dispatch_event_handler_exception_does_not_block_other_handlers(self):
        """Test that if one handler raises an exception, other handlers still execute."""
        # Requirements: 26.7
        handler1_called = []
        handler2_called = []
        
        def handler1(payload: dict) -> None:
            raise Exception("Handler 1 failed")
        
        def handler2(payload: dict) -> None:
            handler2_called.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, handler1)
        register_handler(EVENT_LEAVE_REQUESTED, handler2)
        
        test_payload = {"user_id": 123}
        # Should not raise exception even though handler1 fails
        dispatch_event(EVENT_LEAVE_REQUESTED, test_payload)
        
        # Handler 2 should still have been called
        assert len(handler2_called) == 1
        assert handler2_called[0] == test_payload


class TestSupportedEventTypes:
    """Test that all required event types are supported."""
    
    def test_leave_requested_event_type_exists(self):
        """Test that leave_requested event type is defined."""
        # Requirements: 26.1
        assert EVENT_LEAVE_REQUESTED == "leave_requested"
    
    def test_leave_approved_event_type_exists(self):
        """Test that leave_approved event type is defined."""
        # Requirements: 26.2
        assert EVENT_LEAVE_APPROVED == "leave_approved"
    
    def test_leave_rejected_event_type_exists(self):
        """Test that leave_rejected event type is defined."""
        # Requirements: 26.3
        assert EVENT_LEAVE_REJECTED == "leave_rejected"
    
    def test_attendance_updated_event_type_exists(self):
        """Test that attendance_updated event type is defined."""
        # Requirements: 26.4
        assert EVENT_ATTENDANCE_UPDATED == "attendance_updated"
    
    def test_payslip_generated_event_type_exists(self):
        """Test that payslip_generated event type is defined."""
        assert EVENT_PAYSLIP_GENERATED == "payslip_generated"
    
    def test_salary_updated_event_type_exists(self):
        """Test that salary_updated event type is defined."""
        assert EVENT_SALARY_UPDATED == "salary_updated"


class TestEventIntegration:
    """Test event dispatching in realistic scenarios."""
    
    def test_leave_requested_event_payload_structure(self):
        """Test that leave_requested event has expected payload structure."""
        # Requirements: 26.1
        received_payload = []
        
        def handler(payload: dict) -> None:
            received_payload.append(payload)
        
        register_handler(EVENT_LEAVE_REQUESTED, handler)
        
        expected_payload = {
            "user_id": 123,
            "request_id": 456,
            "leave_type": "Sick",
            "start_date": "2024-01-15",
            "end_date": "2024-01-17",
            "days_count": 3
        }
        
        dispatch_event(EVENT_LEAVE_REQUESTED, expected_payload)
        
        assert len(received_payload) == 1
        assert received_payload[0] == expected_payload
    
    def test_leave_approved_event_payload_structure(self):
        """Test that leave_approved event has expected payload structure."""
        # Requirements: 26.2
        received_payload = []
        
        def handler(payload: dict) -> None:
            received_payload.append(payload)
        
        register_handler(EVENT_LEAVE_APPROVED, handler)
        
        expected_payload = {
            "user_id": 123,
            "request_id": 456,
            "leave_type": "Sick",
            "start_date": "2024-01-15",
            "end_date": "2024-01-17",
            "days_count": 3,
            "reviewed_by": 789,
            "admin_comments": "Approved"
        }
        
        dispatch_event(EVENT_LEAVE_APPROVED, expected_payload)
        
        assert len(received_payload) == 1
        assert received_payload[0] == expected_payload
    
    def test_attendance_updated_event_payload_structure(self):
        """Test that attendance_updated event has expected payload structure."""
        # Requirements: 26.4
        received_payload = []
        
        def handler(payload: dict) -> None:
            received_payload.append(payload)
        
        register_handler(EVENT_ATTENDANCE_UPDATED, handler)
        
        expected_payload = {
            "user_id": 123,
            "attendance_id": 456,
            "date": "2024-01-15",
            "action": "check_in",
            "status": "Present"
        }
        
        dispatch_event(EVENT_ATTENDANCE_UPDATED, expected_payload)
        
        assert len(received_payload) == 1
        assert received_payload[0] == expected_payload
