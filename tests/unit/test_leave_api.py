"""Unit tests for leave management API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from datetime import date, datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set up test environment variables BEFORE importing api modules
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from api.index import app
from api.database import Base, get_db
from api.models import User, Profile, LeaveRequest
from api.auth import hash_password, create_access_token


# Test database setup
engine = create_engine("sqlite:///./test.db", connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """Override database dependency for testing."""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    """Create tables before each test and drop after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def employee_user():
    """Create a test employee user."""
    db = TestingSessionLocal()
    user = User(
        email="employee@test.com",
        password_hash=hash_password("Test1234"),
        role="Employee"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    user_id = user.id
    user_role = user.role
    
    profile = Profile(
        user_id=user.id,
        employee_id=f"EMP{user.id:05d}",  # Use user_id to ensure uniqueness
        first_name="Test",
        last_name="Employee",
        department="Engineering"
    )
    db.add(profile)
    db.commit()
    
    db.close()
    
    return {"id": user_id, "role": user_role}


@pytest.fixture
def admin_user():
    """Create a test admin user."""
    db = TestingSessionLocal()
    user = User(
        email="admin@test.com",
        password_hash=hash_password("Admin1234"),
        role="Admin"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    user_id = user.id
    user_role = user.role
    
    profile = Profile(
        user_id=user.id,
        employee_id=f"ADM{user.id:05d}",  # Use user_id to ensure uniqueness
        first_name="Test",
        last_name="Admin",
        department="Management"
    )
    db.add(profile)
    db.commit()
    
    db.close()
    
    return {"id": user_id, "role": user_role}


class TestCreateLeaveRequest:
    """Test cases for POST /api/leave/request endpoint."""
    
    def test_create_leave_request_success(self, employee_user):
        """Test successful leave request creation."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        today = date.today()
        start_date = today + timedelta(days=7)
        end_date = today + timedelta(days=10)
        
        response = client.post(
            "/api/leave/request",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "leave_type": "Casual",
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat(),
                "remarks": "Family vacation"
            }
        )
        
        assert response.status_code == 201
        data = response.json()
        assert "request_id" in data
        assert data["status"] == "Pending"
        assert data["message"] == "Leave request created successfully"
    
    def test_create_leave_request_validates_date_order(self, employee_user):
        """Test that start_date cannot be after end_date."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        today = date.today()
        start_date = today + timedelta(days=10)
        end_date = today + timedelta(days=7)  # Before start_date
        
        response = client.post(
            "/api/leave/request",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "leave_type": "Sick",
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        )
        
        assert response.status_code == 400
        assert "Start date cannot be after end date" in response.json()["detail"]
    
    def test_create_leave_request_validates_leave_type(self, employee_user):
        """Test that leave_type must be in allowed list."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        today = date.today()
        start_date = today + timedelta(days=7)
        end_date = today + timedelta(days=10)
        
        response = client.post(
            "/api/leave/request",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "leave_type": "InvalidType",
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        )
        
        assert response.status_code == 400  # Converted to 400 by custom handler
    
    def test_create_leave_request_calculates_days_count(self, employee_user):
        """Test that days_count is calculated correctly."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        today = date.today()
        start_date = today + timedelta(days=7)
        end_date = today + timedelta(days=10)  # 4 days (7, 8, 9, 10)
        
        response = client.post(
            "/api/leave/request",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "leave_type": "Vacation",
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        )
        
        assert response.status_code == 201
        
        # Verify in database
        db = TestingSessionLocal()
        leave_req = db.query(LeaveRequest).filter(
            LeaveRequest.user_id == employee_user["id"]
        ).first()
        assert leave_req.days_count == 4  # Inclusive of both dates
        db.close()
    
    def test_create_leave_request_requires_authentication(self):
        """Test that leave request creation requires authentication."""
        today = date.today()
        start_date = today + timedelta(days=7)
        end_date = today + timedelta(days=10)
        
        response = client.post(
            "/api/leave/request",
            json={
                "leave_type": "Casual",
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        )
        
        assert response.status_code == 401


class TestGetMyLeaveRequests:
    """Test cases for GET /api/leave/my-requests endpoint."""
    
    def test_get_my_leave_requests_success(self, employee_user):
        """Test employee can view their own leave requests."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create some leave requests
        db = TestingSessionLocal()
        today = date.today()
        
        for i in range(3):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status="Pending"
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        response = client.get(
            "/api/leave/my-requests",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "requests" in data
        assert "total" in data
        assert "page" in data
        assert "page_size" in data
        assert len(data["requests"]) == 3
        assert data["total"] == 3
    
    def test_get_my_leave_requests_pagination(self, employee_user):
        """Test pagination works correctly."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create 15 leave requests
        db = TestingSessionLocal()
        today = date.today()
        
        for i in range(15):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status="Pending"
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        # Get first page
        response = client.get(
            "/api/leave/my-requests?page=1&page_size=10",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 10
        assert data["total"] == 15
        assert data["page"] == 1
        assert data["page_size"] == 10
        
        # Get second page
        response = client.get(
            "/api/leave/my-requests?page=2&page_size=10",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 5
        assert data["total"] == 15
        assert data["page"] == 2
    
    def test_get_my_leave_requests_status_filter(self, employee_user):
        """Test status filtering works correctly."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create leave requests with different statuses
        db = TestingSessionLocal()
        today = date.today()
        
        statuses = ["Pending", "Approved", "Rejected", "Pending", "Approved"]
        for i, status in enumerate(statuses):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status=status
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        # Filter by Pending
        response = client.get(
            "/api/leave/my-requests?status_filter=Pending",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 2
        assert all(req["status"] == "Pending" for req in data["requests"])
        
        # Filter by Approved
        response = client.get(
            "/api/leave/my-requests?status_filter=Approved",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 2
        assert all(req["status"] == "Approved" for req in data["requests"])
    
    def test_get_my_leave_requests_date_range_filter(self, employee_user):
        """Test date range filtering works correctly."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create leave requests with different dates
        db = TestingSessionLocal()
        today = date.today()
        
        for i in range(5):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*30),
                end_date=today + timedelta(days=i*30 + 2),
                days_count=3,
                status="Pending"
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        # Filter by date range
        filter_start = today + timedelta(days=30)
        filter_end = today + timedelta(days=90)
        
        response = client.get(
            f"/api/leave/my-requests?start_date={filter_start.isoformat()}&end_date={filter_end.isoformat()}",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        # Should get requests with start_date >= filter_start and end_date <= filter_end
        assert len(data["requests"]) >= 2
    
    def test_get_my_leave_requests_ordered_by_created_at(self, employee_user):
        """Test results are ordered by created_at descending."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create leave requests
        db = TestingSessionLocal()
        today = date.today()
        
        for i in range(3):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status="Pending"
            )
            db.add(leave_req)
            db.commit()  # Commit each to ensure different created_at times
        
        db.close()
        
        response = client.get(
            "/api/leave/my-requests",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify descending order (most recent first)
        created_dates = [req["created_at"] for req in data["requests"]]
        assert created_dates == sorted(created_dates, reverse=True)
    
    def test_get_my_leave_requests_requires_authentication(self):
        """Test that endpoint requires authentication."""
        response = client.get("/api/leave/my-requests")
        assert response.status_code == 401


class TestGetAllLeaveRequests:
    """Test cases for GET /api/leave/all-requests endpoint."""
    
    def test_get_all_leave_requests_admin_success(self, admin_user, employee_user):
        """Test admin can view all leave requests."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create leave requests for employee
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.close()
        
        response = client.get(
            "/api/leave/all-requests",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "requests" in data
        assert len(data["requests"]) > 0
        
        # Verify employee details are included
        request = data["requests"][0]
        assert "employee_name" in request
        assert "employee_email" in request
        assert "department" in request
    
    def test_get_all_leave_requests_includes_employee_details(self, admin_user, employee_user):
        """Test that response includes employee details."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Sick",
            start_date=today + timedelta(days=1),
            end_date=today + timedelta(days=3),
            days_count=3,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.close()
        
        response = client.get(
            "/api/leave/all-requests",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        request = data["requests"][0]
        
        assert request["employee_name"] == "Test Employee"
        assert request["employee_email"] == "employee@test.com"
        assert request["department"] == "Engineering"
    
    def test_get_all_leave_requests_employee_forbidden(self, employee_user):
        """Test that employees cannot access all leave requests."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        response = client.get(
            "/api/leave/all-requests",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 403
        assert "Insufficient permissions" in response.json()["detail"]
    
    def test_get_all_leave_requests_supports_pagination(self, admin_user, employee_user):
        """Test pagination works for all-requests endpoint."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create multiple leave requests
        db = TestingSessionLocal()
        today = date.today()
        
        for i in range(15):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status="Pending"
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        response = client.get(
            "/api/leave/all-requests?page=1&page_size=10",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 10
        assert data["total"] == 15
        assert data["page"] == 1
        assert data["page_size"] == 10
    
    def test_get_all_leave_requests_supports_status_filter(self, admin_user, employee_user):
        """Test status filtering works for all-requests endpoint."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create leave requests with different statuses
        db = TestingSessionLocal()
        today = date.today()
        
        statuses = ["Pending", "Approved", "Rejected", "Pending"]
        for i, status in enumerate(statuses):
            leave_req = LeaveRequest(
                user_id=employee_user["id"],
                leave_type="Casual",
                start_date=today + timedelta(days=i*7),
                end_date=today + timedelta(days=i*7 + 2),
                days_count=3,
                status=status
            )
            db.add(leave_req)
        
        db.commit()
        db.close()
        
        response = client.get(
            "/api/leave/all-requests?status_filter=Pending",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["requests"]) == 2
        assert all(req["status"] == "Pending" for req in data["requests"])
    
    def test_get_all_leave_requests_requires_authentication(self):
        """Test that endpoint requires authentication."""
        response = client.get("/api/leave/all-requests")
        assert response.status_code == 401


class TestApproveLeaveRequest:
    """Test cases for PUT /api/leave/{request_id}/approve endpoint."""
    
    def test_approve_leave_request_success(self, admin_user, employee_user):
        """Test admin can approve a pending leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"comments": "Approved for vacation"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Leave request approved successfully"
        assert data["request"]["status"] == "Approved"
        assert data["request"]["reviewed_by"] == admin_user["id"]
        assert data["request"]["reviewed_at"] is not None
        assert data["request"]["admin_comments"] == "Approved for vacation"
    
    def test_approve_leave_request_without_comments(self, admin_user, employee_user):
        """Test admin can approve without providing comments."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Sick",
            start_date=today + timedelta(days=1),
            end_date=today + timedelta(days=3),
            days_count=3,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["request"]["status"] == "Approved"
        assert data["request"]["admin_comments"] is None
    
    def test_approve_leave_request_not_found(self, admin_user):
        """Test approving non-existent leave request returns 404."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        response = client.put(
            "/api/leave/99999/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 404
        assert "Leave request not found" in response.json()["detail"]
    
    def test_approve_leave_request_already_approved(self, admin_user, employee_user):
        """Test cannot approve already approved leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create an already approved leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Approved",
            reviewed_by=admin_user["id"],
            reviewed_at=datetime.utcnow()
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 400
        assert "already been approved" in response.json()["detail"]
    
    def test_approve_leave_request_already_rejected(self, admin_user, employee_user):
        """Test cannot approve already rejected leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create an already rejected leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Rejected",
            reviewed_by=admin_user["id"],
            reviewed_at=datetime.utcnow()
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/approve",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 400
        assert "already been rejected" in response.json()["detail"]
    
    def test_approve_leave_request_employee_forbidden(self, employee_user):
        """Test employees cannot approve leave requests."""
        employee_token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/approve",
            headers={"Authorization": f"Bearer {employee_token}"},
            json={}
        )
        
        assert response.status_code == 403
        assert "Insufficient permissions" in response.json()["detail"]
    
    def test_approve_leave_request_requires_authentication(self, employee_user):
        """Test that endpoint requires authentication."""
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(f"/api/leave/{request_id}/approve", json={})
        assert response.status_code == 401


class TestRejectLeaveRequest:
    """Test cases for PUT /api/leave/{request_id}/reject endpoint."""
    
    def test_reject_leave_request_success(self, admin_user, employee_user):
        """Test admin can reject a pending leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/reject",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"comments": "Insufficient staffing during this period"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Leave request rejected successfully"
        assert data["request"]["status"] == "Rejected"
        assert data["request"]["reviewed_by"] == admin_user["id"]
        assert data["request"]["reviewed_at"] is not None
        assert data["request"]["admin_comments"] == "Insufficient staffing during this period"
    
    def test_reject_leave_request_without_comments(self, admin_user, employee_user):
        """Test admin can reject without providing comments."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Sick",
            start_date=today + timedelta(days=1),
            end_date=today + timedelta(days=3),
            days_count=3,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/reject",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["request"]["status"] == "Rejected"
        assert data["request"]["admin_comments"] is None
    
    def test_reject_leave_request_not_found(self, admin_user):
        """Test rejecting non-existent leave request returns 404."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        response = client.put(
            "/api/leave/99999/reject",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 404
        assert "Leave request not found" in response.json()["detail"]
    
    def test_reject_leave_request_already_approved(self, admin_user, employee_user):
        """Test cannot reject already approved leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create an already approved leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Approved",
            reviewed_by=admin_user["id"],
            reviewed_at=datetime.utcnow()
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/reject",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 400
        assert "already been approved" in response.json()["detail"]
    
    def test_reject_leave_request_already_rejected(self, admin_user, employee_user):
        """Test cannot reject already rejected leave request."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create an already rejected leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Rejected",
            reviewed_by=admin_user["id"],
            reviewed_at=datetime.utcnow()
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/reject",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={}
        )
        
        assert response.status_code == 400
        assert "already been rejected" in response.json()["detail"]
    
    def test_reject_leave_request_employee_forbidden(self, employee_user):
        """Test employees cannot reject leave requests."""
        employee_token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(
            f"/api/leave/{request_id}/reject",
            headers={"Authorization": f"Bearer {employee_token}"},
            json={}
        )
        
        assert response.status_code == 403
        assert "Insufficient permissions" in response.json()["detail"]
    
    def test_reject_leave_request_requires_authentication(self, employee_user):
        """Test that endpoint requires authentication."""
        # Create a pending leave request
        db = TestingSessionLocal()
        today = date.today()
        
        leave_req = LeaveRequest(
            user_id=employee_user["id"],
            leave_type="Casual",
            start_date=today + timedelta(days=7),
            end_date=today + timedelta(days=10),
            days_count=4,
            status="Pending"
        )
        db.add(leave_req)
        db.commit()
        db.refresh(leave_req)
        request_id = leave_req.id
        db.close()
        
        response = client.put(f"/api/leave/{request_id}/reject", json={})
        assert response.status_code == 401

