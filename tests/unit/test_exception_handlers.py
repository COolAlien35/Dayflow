"""Tests for global exception handlers."""
import pytest
from fastapi.testclient import TestClient
from api.index import app
from api.database import get_db, Base, engine
from api.models import User
from api.auth import hash_password, create_access_token
from datetime import date


@pytest.fixture(scope="function")
def client():
    """Create a test client with a fresh database."""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create test client
    test_client = TestClient(app)
    
    yield test_client
    
    # Clean up
    Base.metadata.drop_all(bind=engine)


class TestValidationErrorHandler:
    """Test validation error handling (400 with field details)."""
    
    def test_validation_error_returns_400(self, client):
        """Test that validation errors return 400 status code."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "invalid-email",  # Invalid email format
                "password": "Test123",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "error_code" in data
        assert data["error_code"] == "VALIDATION_ERROR"
    
    def test_validation_error_includes_field_errors(self, client):
        """Test that validation errors include field-level error details."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "invalid-email",
                "password": "Test123",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "field_errors" in data
        # Should have error for email field
        assert "email" in data["field_errors"]
    
    def test_validation_error_uses_snake_case(self, client):
        """Test that validation error responses use snake_case."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "invalid-email",
                "password": "Test123",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 400
        data = response.json()
        # Check that keys are in snake_case
        assert "error_code" in data
        assert "field_errors" in data
        # Should not have camelCase keys
        assert "errorCode" not in data
        assert "fieldErrors" not in data


class TestAuthenticationErrorHandler:
    """Test authentication error handling (401)."""
    
    def test_authentication_error_returns_401(self, client):
        """Test that authentication errors return 401 status code."""
        response = client.get("/api/protected")
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert "error_code" in data
        assert data["error_code"] == "AUTHENTICATION_ERROR"
    
    def test_authentication_error_is_json(self, client):
        """Test that authentication errors return JSON response."""
        response = client.get("/api/protected")
        
        assert response.status_code == 401
        assert response.headers["content-type"] == "application/json"
        data = response.json()
        assert isinstance(data, dict)


class TestAuthorizationErrorHandler:
    """Test authorization error handling (403)."""
    
    def test_authorization_error_returns_403(self, client):
        """Test that authorization errors return 403 status code."""
        # Create an employee user
        db = next(get_db())
        user = User(
            email="employee@test.com",
            password_hash=hash_password("Test123"),
            role="Employee"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Get token for employee
        token = create_access_token(user_id=user.id, role=user.role)
        
        # Try to access admin-only endpoint
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 403
        data = response.json()
        assert "detail" in data
        assert "error_code" in data
        assert data["error_code"] == "AUTHORIZATION_ERROR"
        
        db.close()
    
    def test_authorization_error_is_json(self, client):
        """Test that authorization errors return JSON response."""
        # Create an employee user
        db = next(get_db())
        user = User(
            email="employee@test.com",
            password_hash=hash_password("Test123"),
            role="Employee"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Get token for employee
        token = create_access_token(user_id=user.id, role=user.role)
        
        # Try to access admin-only endpoint
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 403
        assert response.headers["content-type"] == "application/json"
        data = response.json()
        assert isinstance(data, dict)
        
        db.close()


class TestNotFoundErrorHandler:
    """Test not found error handling (404)."""
    
    def test_not_found_error_returns_404(self, client):
        """Test that not found errors return 404 status code."""
        # Create an admin user
        db = next(get_db())
        admin = User(
            email="admin@test.com",
            password_hash=hash_password("Test123"),
            role="Admin"
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        # Get token for admin
        token = create_access_token(user_id=admin.id, role=admin.role)
        
        # Try to get non-existent employee
        response = client.get(
            "/api/employees/99999",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 404
        data = response.json()
        assert "detail" in data
        assert "error_code" in data
        assert data["error_code"] == "NOT_FOUND"
        
        db.close()


class TestConflictErrorHandler:
    """Test conflict error handling (409)."""
    
    def test_conflict_error_returns_409(self, client):
        """Test that conflict errors return 409 status code."""
        # Create a user
        response1 = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "Test123!",  # Valid password with all requirements
                "role": "Employee"
            }
        )
        assert response1.status_code == 201
        
        # Try to create duplicate user
        response2 = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "Test123!",  # Valid password with all requirements
                "role": "Employee"
            }
        )
        
        assert response2.status_code == 409
        data = response2.json()
        assert "detail" in data
        assert "error_code" in data
        assert data["error_code"] == "CONFLICT"


class TestResponseConsistency:
    """Test that all error responses follow consistent format."""
    
    def test_all_errors_return_json(self, client):
        """Test that all error types return JSON responses."""
        # Test validation error (400)
        response1 = client.post(
            "/api/auth/signup",
            json={"email": "invalid"}
        )
        assert response1.headers["content-type"] == "application/json"
        
        # Test authentication error (401)
        response2 = client.get("/api/protected")
        assert response2.headers["content-type"] == "application/json"
    
    def test_all_errors_have_required_fields(self, client):
        """Test that all error responses have detail and error_code fields."""
        # Test validation error (400)
        response1 = client.post(
            "/api/auth/signup",
            json={"email": "invalid"}
        )
        data1 = response1.json()
        assert "detail" in data1
        assert "error_code" in data1
        
        # Test authentication error (401)
        response2 = client.get("/api/protected")
        data2 = response2.json()
        assert "detail" in data2
        assert "error_code" in data2
    
    def test_all_errors_use_snake_case(self, client):
        """Test that all error responses use snake_case for field names."""
        # Test validation error (400)
        response1 = client.post(
            "/api/auth/signup",
            json={"email": "invalid"}
        )
        data1 = response1.json()
        assert "error_code" in data1
        assert "errorCode" not in data1
        
        # Test authentication error (401)
        response2 = client.get("/api/protected")
        data2 = response2.json()
        assert "error_code" in data2
        assert "errorCode" not in data2
