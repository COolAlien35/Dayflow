"""Unit tests for attendance API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from datetime import date, datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set up test environment variables BEFORE importing api modules
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from api.index import app
from api.database import Base, get_db
from api.models import User, Profile, Attendance
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
    
    # Store user_id and role before closing session
    user_id = user.id
    user_role = user.role
    
    # Create profile with unique employee_id based on user_id
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
    
    # Return a simple dict instead of the ORM object
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
    
    # Store user_id and role before closing session
    user_id = user.id
    user_role = user.role
    
    # Create profile with unique employee_id based on user_id
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
    
    # Return a simple dict instead of the ORM object
    return {"id": user_id, "role": user_role}


class TestCheckIn:
    """Test cases for POST /api/attendance/check-in endpoint."""
    
    def test_check_in_success(self, employee_user):
        """Test successful check-in."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        response = client.post(
            "/api/attendance/check-in",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 201
        data = response.json()
        assert "attendance_id" in data
        assert "check_in_time" in data
        assert "date" in data
        assert data["message"] == "Check-in recorded successfully"
    
    def test_check_in_duplicate_same_day(self, employee_user):
        """Test that duplicate check-in on same day is rejected."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # First check-in
        response1 = client.post(
            "/api/attendance/check-in",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response1.status_code == 201
        
        # Second check-in (should fail)
        response2 = client.post(
            "/api/attendance/check-in",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response2.status_code == 400
        assert "Already checked in" in response2.json()["detail"]
    
    def test_check_in_without_authentication(self):
        """Test that check-in requires authentication."""
        response = client.post("/api/attendance/check-in")
        assert response.status_code == 401  # No auth header


class TestCheckOut:
    """Test cases for POST /api/attendance/check-out endpoint."""
    
    def test_check_out_success(self, employee_user):
        """Test successful check-out after check-in."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # First check in
        client.post(
            "/api/attendance/check-in",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        # Then check out
        response = client.post(
            "/api/attendance/check-out",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "attendance_id" in data
        assert "check_out_time" in data
        assert "status" in data
        assert data["message"] == "Check-out recorded successfully"
    
    def test_check_out_without_check_in(self, employee_user):
        """Test that check-out requires prior check-in."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        response = client.post(
            "/api/attendance/check-out",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 400
        assert "No check-in record found" in response.json()["detail"]
    
    def test_check_out_without_authentication(self):
        """Test that check-out requires authentication."""
        response = client.post("/api/attendance/check-out")
        assert response.status_code == 401  # No auth header


class TestAttendanceHistory:
    """Test cases for GET /api/attendance/history endpoint."""
    
    def test_get_own_attendance_history(self, employee_user):
        """Test employee can view their own attendance history."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Create some attendance records
        db = TestingSessionLocal()
        today = date.today()
        attendance = Attendance(
            user_id=employee_user["id"],
            date=today,
            check_in=datetime.utcnow(),
            status="Present"
        )
        db.add(attendance)
        db.commit()
        db.close()
        
        response = client.get(
            "/api/attendance/history",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "records" in data
        assert len(data["records"]) > 0
        assert data["records"][0]["user_id"] == employee_user["id"]
    
    def test_admin_can_view_other_employee_attendance(self, admin_user, employee_user):
        """Test admin can view any employee's attendance."""
        admin_token = create_access_token(admin_user["id"], admin_user["role"])
        
        # Create attendance for employee
        db = TestingSessionLocal()
        today = date.today()
        attendance = Attendance(
            user_id=employee_user["id"],
            date=today,
            check_in=datetime.utcnow(),
            status="Present"
        )
        db.add(attendance)
        db.commit()
        db.close()
        
        response = client.get(
            f"/api/attendance/history?user_id={employee_user['id']}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "records" in data
        assert len(data["records"]) > 0
        assert data["records"][0]["user_id"] == employee_user["id"]
    
    def test_employee_cannot_view_other_employee_attendance(self, employee_user):
        """Test employee cannot view other employee's attendance."""
        token = create_access_token(employee_user["id"], employee_user["role"])
        
        # Try to view another user's attendance
        response = client.get(
            "/api/attendance/history?user_id=999",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]
    
    def test_attendance_history_without_authentication(self):
        """Test that attendance history requires authentication."""
        response = client.get("/api/attendance/history")
        assert response.status_code == 401  # No auth header
