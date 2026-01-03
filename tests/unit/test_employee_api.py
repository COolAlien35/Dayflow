"""Unit tests for employee management API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import date

# Set up test environment variables BEFORE importing api modules
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from api.index import app
from api.database import Base, get_db
from api.models import User, Profile

# Create test database engine
engine = create_engine(
    "sqlite:///./test.db",
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables
Base.metadata.create_all(bind=engine)


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
def reset_db():
    """Create tables and clear all data before each test."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        # Delete all records from all tables
        for table in reversed(Base.metadata.sorted_tables):
            db.execute(table.delete())
        db.commit()
    finally:
        db.close()
    yield


def create_test_user_with_profile(email="test@example.com", role="Employee", department="Engineering"):
    """Helper function to create a test user with profile and return auth token."""
    # Create user via signup
    signup_response = client.post(
        "/api/auth/signup",
        json={
            "email": email,
            "password": "ValidPass123",
            "role": role
        }
    )
    user_id = signup_response.json()["user_id"]
    
    # Create profile directly in database
    db = TestingSessionLocal()
    try:
        profile = Profile(
            user_id=user_id,
            employee_id=f"EMP{user_id:03d}",
            first_name="Test",
            last_name="User",
            phone="1234567890",
            address="123 Test St",
            department=department,
            position="Developer",
            date_of_joining=date(2024, 1, 1),
            emergency_contact="Emergency Contact"
        )
        db.add(profile)
        db.commit()
    finally:
        db.close()
    
    # Login to get token
    login_response = client.post(
        "/api/auth/login",
        json={
            "email": email,
            "password": "ValidPass123"
        }
    )
    
    return login_response.json()["access_token"], user_id


class TestGetEmployees:
    """Test GET /api/employees endpoint."""
    
    def test_get_employees_as_admin(self):
        """Test admin can retrieve employee list."""
        # Create admin
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        
        # Create some employees
        create_test_user_with_profile("emp1@example.com", "Employee", "Engineering")
        create_test_user_with_profile("emp2@example.com", "Employee", "HR")
        
        response = client.get(
            "/api/employees",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "employees" in data
        assert "total" in data
        assert "page" in data
        assert "page_size" in data
        assert data["total"] >= 3  # Admin + 2 employees
        assert len(data["employees"]) >= 3
    
    def test_get_employees_with_pagination(self):
        """Test pagination works correctly."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        
        # Create multiple employees
        for i in range(5):
            create_test_user_with_profile(f"emp{i}@example.com", "Employee")
        
        response = client.get(
            "/api/employees?page=1&page_size=3",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["page"] == 1
        assert data["page_size"] == 3
        assert len(data["employees"]) == 3
        assert data["total"] >= 6
    
    def test_get_employees_with_department_filter(self):
        """Test department filtering works."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin", "Management")
        
        create_test_user_with_profile("eng1@example.com", "Employee", "Engineering")
        create_test_user_with_profile("eng2@example.com", "Employee", "Engineering")
        create_test_user_with_profile("hr1@example.com", "Employee", "HR")
        
        response = client.get(
            "/api/employees?department=Engineering",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["total"] == 2
        for emp in data["employees"]:
            assert emp["department"] == "Engineering"
    
    def test_get_employees_as_employee_denied(self):
        """Test employee cannot access employee list."""
        emp_token, _ = create_test_user_with_profile("emp@example.com", "Employee")
        
        response = client.get(
            "/api/employees",
            headers={"Authorization": f"Bearer {emp_token}"}
        )
        
        assert response.status_code == 403
    
    def test_get_employees_without_auth(self):
        """Test unauthenticated access is denied."""
        response = client.get("/api/employees")
        
        assert response.status_code == 401


class TestGetEmployeeDetail:
    """Test GET /api/employees/{employee_id} endpoint."""
    
    def test_admin_can_view_any_employee(self):
        """Test admin can view any employee's details."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        emp_token, emp_id = create_test_user_with_profile("emp@example.com", "Employee")
        
        response = client.get(
            f"/api/employees/{emp_id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "user" in data
        assert "profile" in data
        assert data["user"]["email"] == "emp@example.com"
        assert data["profile"]["first_name"] == "Test"
    
    def test_employee_can_view_self(self):
        """Test employee can view their own details."""
        emp_token, emp_id = create_test_user_with_profile("emp@example.com", "Employee")
        
        response = client.get(
            f"/api/employees/{emp_id}",
            headers={"Authorization": f"Bearer {emp_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["user"]["email"] == "emp@example.com"
    
    def test_employee_cannot_view_other_employee(self):
        """Test employee cannot view another employee's details."""
        emp1_token, _ = create_test_user_with_profile("emp1@example.com", "Employee")
        _, emp2_id = create_test_user_with_profile("emp2@example.com", "Employee")
        
        response = client.get(
            f"/api/employees/{emp2_id}",
            headers={"Authorization": f"Bearer {emp1_token}"}
        )
        
        assert response.status_code == 403
    
    def test_get_nonexistent_employee(self):
        """Test 404 for non-existent employee."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        
        response = client.get(
            "/api/employees/99999",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 404


class TestUpdateEmployeeProfile:
    """Test PUT /api/employees/{employee_id} endpoint."""
    
    def test_admin_can_update_any_field(self):
        """Test admin can update any profile field including restricted ones."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        _, emp_id = create_test_user_with_profile("emp@example.com", "Employee")
        
        response = client.put(
            f"/api/employees/{emp_id}",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={
                "first_name": "Updated",
                "last_name": "Name",
                "department": "HR",
                "position": "Manager",
                "phone": "9999999999"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["profile"]["first_name"] == "Updated"
        assert data["profile"]["last_name"] == "Name"
        assert data["profile"]["department"] == "HR"
        assert data["profile"]["position"] == "Manager"
        assert data["profile"]["phone"] == "9999999999"
    
    def test_employee_cannot_update_other_employee(self):
        """Test employee cannot update another employee's profile."""
        emp1_token, _ = create_test_user_with_profile("emp1@example.com", "Employee")
        _, emp2_id = create_test_user_with_profile("emp2@example.com", "Employee")
        
        response = client.put(
            f"/api/employees/{emp2_id}",
            headers={"Authorization": f"Bearer {emp1_token}"},
            json={"phone": "1111111111"}
        )
        
        assert response.status_code == 403
    
    def test_update_nonexistent_employee(self):
        """Test 404 for updating non-existent employee."""
        admin_token, _ = create_test_user_with_profile("admin@example.com", "Admin")
        
        response = client.put(
            "/api/employees/99999",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"phone": "1111111111"}
        )
        
        assert response.status_code == 404
