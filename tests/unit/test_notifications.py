"""Unit tests for notification system.

Tests notification creation, event handlers, and API endpoints.
"""
import pytest
from datetime import datetime
from unittest.mock import Mock, MagicMock, patch

from api.notifications import (
    create_notification,
    handle_leave_approved,
    handle_leave_rejected,
    handle_leave_requested,
    register_notification_handlers
)
from api.events import (
    dispatch_event,
    clear_handlers,
    get_registered_handlers,
    EVENT_LEAVE_APPROVED,
    EVENT_LEAVE_REJECTED,
    EVENT_LEAVE_REQUESTED
)


class TestNotificationCreation:
    """Test notification creation function."""
    
    def test_create_notification_basic(self):
        """Test creating a basic notification."""
        # Mock database session
        db_mock = MagicMock()
        notification_mock = MagicMock()
        notification_mock.id = 1
        notification_mock.user_id = 123
        notification_mock.notification_type = "test_notification"
        notification_mock.message = "This is a test notification"
        notification_mock.is_read = False
        notification_mock.related_entity_type = None
        notification_mock.related_entity_id = None
        notification_mock.created_at = datetime.utcnow()
        
        # Mock the commit and refresh
        db_mock.commit.return_value = None
        db_mock.refresh.return_value = None
        
        # Call create_notification
        with patch('api.notifications.Notification', return_value=notification_mock):
            notification = create_notification(
                db=db_mock,
                user_id=123,
                notification_type="test_notification",
                message="This is a test notification"
            )
        
        # Verify notification was added to session
        db_mock.add.assert_called_once()
        db_mock.commit.assert_called_once()
        db_mock.refresh.assert_called_once()
        
        # Verify notification properties
        assert notification.user_id == 123
        assert notification.notification_type == "test_notification"
        assert notification.message == "This is a test notification"
        assert notification.is_read is False
    
    def test_create_notification_with_related_entity(self):
        """Test creating a notification with related entity information."""
        db_mock = MagicMock()
        notification_mock = MagicMock()
        notification_mock.related_entity_type = "leave_request"
        notification_mock.related_entity_id = 456
        
        db_mock.commit.return_value = None
        db_mock.refresh.return_value = None
        
        with patch('api.notifications.Notification', return_value=notification_mock):
            notification = create_notification(
                db=db_mock,
                user_id=123,
                notification_type="leave_approved",
                message="Your leave has been approved",
                related_entity_type="leave_request",
                related_entity_id=456
            )
        
        assert notification.related_entity_type == "leave_request"
        assert notification.related_entity_id == 456


class TestNotificationHandlers:
    """Test notification event handlers."""
    
    def test_handle_leave_approved(self):
        """Test leave_approved event handler creates notification."""
        db_mock = MagicMock()
        
        payload = {
            "user_id": 123,
            "request_id": 789,
            "leave_type": "Sick",
            "start_date": "2024-01-15",
            "end_date": "2024-01-17",
            "db": db_mock
        }
        
        with patch('api.notifications.create_notification') as mock_create:
            handle_leave_approved(payload)
            
            # Verify create_notification was called with correct arguments
            mock_create.assert_called_once()
            call_args = mock_create.call_args
            assert call_args[1]['user_id'] == 123
            assert call_args[1]['notification_type'] == "leave_approved"
            assert "Sick" in call_args[1]['message']
            assert "2024-01-15" in call_args[1]['message']
            assert call_args[1]['related_entity_id'] == 789
    
    def test_handle_leave_rejected_with_comments(self):
        """Test leave_rejected event handler includes admin comments."""
        db_mock = MagicMock()
        
        payload = {
            "user_id": 456,
            "request_id": 999,
            "leave_type": "Vacation",
            "start_date": "2024-02-01",
            "end_date": "2024-02-05",
            "admin_comments": "Insufficient leave balance",
            "db": db_mock
        }
        
        with patch('api.notifications.create_notification') as mock_create:
            handle_leave_rejected(payload)
            
            # Verify notification includes admin comments
            call_args = mock_create.call_args
            assert "Vacation" in call_args[1]['message']
            assert "rejected" in call_args[1]['message']
            assert "Insufficient leave balance" in call_args[1]['message']
    
    def test_handle_leave_requested_notifies_admins(self):
        """Test leave_requested event handler notifies all admins."""
        db_mock = MagicMock()
        
        # Mock admin users
        admin1 = MagicMock()
        admin1.id = 10
        admin2 = MagicMock()
        admin2.id = 20
        
        db_mock.query.return_value.filter.return_value.all.return_value = [admin1, admin2]
        
        # Mock requester profile query
        user_mock = MagicMock()
        profile_mock = MagicMock()
        profile_mock.first_name = "John"
        profile_mock.last_name = "Doe"
        db_mock.query.return_value.join.return_value.filter.return_value.first.return_value = (user_mock, profile_mock)
        
        payload = {
            "user_id": 123,
            "request_id": 555,
            "leave_type": "Casual",
            "start_date": "2024-03-10",
            "end_date": "2024-03-12",
            "days_count": 3,
            "db": db_mock
        }
        
        with patch('api.notifications.create_notification') as mock_create:
            handle_leave_requested(payload)
            
            # Verify create_notification was called twice (once for each admin)
            assert mock_create.call_count == 2
    
    def test_handle_leave_approved_without_db_session(self):
        """Test handler gracefully handles missing db session."""
        payload = {
            "user_id": 123,
            "request_id": 789,
            "leave_type": "Sick",
            "start_date": "2024-01-15",
            "end_date": "2024-01-17"
            # Missing 'db' key
        }
        
        # Should not raise exception
        handle_leave_approved(payload)


class TestNotificationEventIntegration:
    """Test notification handlers integrated with event system."""
    
    def test_register_notification_handlers(self):
        """Test that notification handlers are registered correctly."""
        # Clear any existing handlers
        clear_handlers()
        
        # Register notification handlers
        register_notification_handlers()
        
        # Verify handlers are registered for each event type
        leave_approved_handlers = get_registered_handlers(EVENT_LEAVE_APPROVED)
        leave_rejected_handlers = get_registered_handlers(EVENT_LEAVE_REJECTED)
        leave_requested_handlers = get_registered_handlers(EVENT_LEAVE_REQUESTED)
        
        assert len(leave_approved_handlers) > 0
        assert len(leave_rejected_handlers) > 0
        assert len(leave_requested_handlers) > 0
    
    def test_event_dispatch_triggers_handler(self):
        """Test that dispatching an event triggers the handler."""
        # Clear any existing handlers
        clear_handlers()
        
        # Create a mock handler
        handler_called = []
        
        def mock_handler(payload):
            handler_called.append(payload)
        
        # Register mock handler
        from api.events import register_handler
        register_handler(EVENT_LEAVE_APPROVED, mock_handler)
        
        # Dispatch event
        test_payload = {
            "user_id": 123,
            "request_id": 789,
            "leave_type": "Sick"
        }
        dispatch_event(EVENT_LEAVE_APPROVED, test_payload)
        
        # Verify handler was called
        assert len(handler_called) == 1
        assert handler_called[0]["user_id"] == 123
        assert handler_called[0]["request_id"] == 789

