"""Unit tests for role management functionality."""
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set up test environment variables BEFORE importing api modules
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from api.index import app
from api.database import Base, get_db
from api.models import User, Profile, RoleChangeLog
from api.auth import create_access_token

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
        # Clear all tables
        db.query(RoleChangeLog).delete()
        db.query(Profile).delete()
        db.query(User).delete()
        db.commit()
    finally:
        db.close()
    
    yield
    
    # Cleanup after test
    db = TestingSessionLocal()
    try:
        db.query(RoleChangeLog).delete()
        db.query(Profile).delete()
        db.query(User).delete()
        db.commit()
    finally:
        db.close()


def create_test_user(email="test@example.com", role="Employee"):
    """Helper function to create a test user and return user data."""
    response = client.post(
        "/api/auth/signup",
        json={
            "email": email,
            "password": "TestPass123",
            "role": role
        }
    )
    assert response.status_code == 201
    return response.json()


class TestRoleUpdateFunction:
    """Test the update_user_role function."""
    
    def test_update_employee_to_admin(self):
        """Test updating an employee to admin role."""
        # Create admin and employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee_user = create_test_user("employee@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Update employee to admin
        response = client.put(
            f"/api/v2/admin/users/{employee_user['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user"]["role"] == "Admin"
        assert "successfully" in data["message"].lower()
    
    def test_update_admin_to_employee(self):
        """Test updating an admin to employee role."""
        # Create two admin users
        admin1 = create_test_user("admin1@example.com", "Admin")
        admin2 = create_test_user("admin2@example.com", "Admin")
        
        # Generate admin1 token
        admin_token = create_access_token(user_id=admin1["user_id"], role="Admin")
        
        # Update admin2 to employee
        response = client.put(
            f"/api/v2/admin/users/{admin2['user_id']}/role",
            json={"role": "Employee"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user"]["role"] == "Employee"
    
    def test_prevent_self_role_change(self):
        """Test that users cannot change their own role."""
        # Create admin user
        admin_user = create_test_user("admin@example.com", "Admin")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Try to change own role
        response = client.put(
            f"/api/v2/admin/users/{admin_user['user_id']}/role",
            json={"role": "Employee"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 403
        assert "cannot change your own role" in response.json()["detail"].lower()
    
    def test_invalid_role_rejected(self):
        """Test that invalid roles are rejected."""
        # Create admin and employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee_user = create_test_user("employee@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Try to set invalid role
        response = client.put(
            f"/api/v2/admin/users/{employee_user['user_id']}/role",
            json={"role": "SuperAdmin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        # Pydantic validation happens at schema level (422) or business logic (400)
        assert response.status_code in [400, 422]
    
    def test_user_not_found(self):
        """Test updating role for non-existent user."""
        # Create admin user
        admin_user = create_test_user("admin@example.com", "Admin")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Try to update non-existent user
        response = client.put(
            "/api/v2/admin/users/99999/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 404
        assert "user not found" in response.json()["detail"].lower()
    
    def test_role_already_set(self):
        """Test updating to the same role."""
        # Create admin and employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee_user = create_test_user("employee@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Try to set role to current role
        response = client.put(
            f"/api/v2/admin/users/{employee_user['user_id']}/role",
            json={"role": "Employee"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 400
        assert "already has role" in response.json()["detail"].lower()


class TestRoleChangeAuditLog:
    """Test role change audit logging."""
    
    def test_audit_log_created_on_role_change(self):
        """Test that audit log entry is created when role changes."""
        # Create admin and employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee_user = create_test_user("employee@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Update employee to admin
        response = client.put(
            f"/api/v2/admin/users/{employee_user['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        
        # Check audit log
        db = TestingSessionLocal()
        try:
            log_entry = db.query(RoleChangeLog).filter(
                RoleChangeLog.user_id == employee_user["user_id"]
            ).first()
            
            assert log_entry is not None
            assert log_entry.old_role == "Employee"
            assert log_entry.new_role == "Admin"
            assert log_entry.changed_by == admin_user["user_id"]
            assert log_entry.changed_at is not None
        finally:
            db.close()
    
    def test_get_role_changes_endpoint(self):
        """Test retrieving role change audit log."""
        # Create admin and employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee_user = create_test_user("employee@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Update employee to admin
        client.put(
            f"/api/v2/admin/users/{employee_user['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        # Get role changes
        response = client.get(
            "/api/v2/admin/role-changes",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["total"] >= 1
        assert len(data["changes"]) >= 1
        
        # Check first change
        change = data["changes"][0]
        assert change["user_id"] == employee_user["user_id"]
        assert change["old_role"] == "Employee"
        assert change["new_role"] == "Admin"
        assert change["changed_by"] == admin_user["user_id"]
    
    def test_get_role_changes_filtered_by_user(self):
        """Test filtering role changes by user ID."""
        # Create admin and two employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        employee1 = create_test_user("employee1@example.com", "Employee")
        employee2 = create_test_user("employee2@example.com", "Employee")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Update both employees
        client.put(
            f"/api/v2/admin/users/{employee1['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        client.put(
            f"/api/v2/admin/users/{employee2['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        # Get role changes for employee1 only
        response = client.get(
            f"/api/v2/admin/role-changes?user_id={employee1['user_id']}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 1
        assert data["changes"][0]["user_id"] == employee1["user_id"]
    
    def test_get_role_changes_pagination(self):
        """Test pagination of role changes."""
        # Create admin and multiple employee users
        admin_user = create_test_user("admin@example.com", "Admin")
        
        # Generate admin token
        admin_token = create_access_token(user_id=admin_user["user_id"], role="Admin")
        
        # Create and update multiple employees
        for i in range(5):
            employee = create_test_user(f"employee{i}@example.com", "Employee")
            client.put(
                f"/api/v2/admin/users/{employee['user_id']}/role",
                json={"role": "Admin"},
                headers={"Authorization": f"Bearer {admin_token}"}
            )
        
        # Get first page with page_size=2
        response = client.get(
            "/api/v2/admin/role-changes?page=1&page_size=2",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 5
        assert len(data["changes"]) == 2
        assert data["page"] == 1
        assert data["page_size"] == 2


class TestRoleManagementAuthorization:
    """Test authorization for role management endpoints."""
    
    def test_employee_cannot_update_roles(self):
        """Test that employees cannot update roles."""
        # Create two employee users
        employee1 = create_test_user("employee1@example.com", "Employee")
        employee2 = create_test_user("employee2@example.com", "Employee")
        
        # Generate employee token
        employee_token = create_access_token(user_id=employee1["user_id"], role="Employee")
        
        # Try to update role
        response = client.put(
            f"/api/v2/admin/users/{employee2['user_id']}/role",
            json={"role": "Admin"},
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
        assert "insufficient permissions" in response.json()["detail"].lower()
    
    def test_employee_cannot_view_role_changes(self):
        """Test that employees cannot view role change log."""
        # Create employee user
        employee = create_test_user("employee@example.com", "Employee")
        
        # Generate employee token
        employee_token = create_access_token(user_id=employee["user_id"], role="Employee")
        
        # Try to get role changes
        response = client.get(
            "/api/v2/admin/role-changes",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
        assert "insufficient permissions" in response.json()["detail"].lower()
    
    def test_unauthenticated_cannot_update_roles(self):
        """Test that unauthenticated users cannot update roles."""
        # Create employee user
        employee = create_test_user("employee@example.com", "Employee")
        
        # Try to update role without token
        response = client.put(
            f"/api/v2/admin/users/{employee['user_id']}/role",
            json={"role": "Admin"}
        )
        
        # 401 for missing auth, 403 for insufficient permissions
        assert response.status_code in [401, 403]
