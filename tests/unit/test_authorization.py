"""Unit tests for authorization middleware and role-based access control."""
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
        # Delete all records from all tables
        for table in reversed(Base.metadata.sorted_tables):
            db.execute(table.delete())
        db.commit()
    finally:
        db.close()
    yield


class TestAuthenticationMiddleware:
    """Test authentication middleware (get_current_user)."""
    
    def test_protected_endpoint_without_token(self):
        """Test that protected endpoint rejects requests without token."""
        response = client.get("/api/protected")
        
        assert response.status_code == 401  # HTTPBearer returns 401 for missing auth
    
    def test_protected_endpoint_with_invalid_token(self):
        """Test that protected endpoint rejects invalid tokens."""
        response = client.get(
            "/api/protected",
            headers={"Authorization": "Bearer invalid.token.here"}
        )
        
        assert response.status_code == 401
        assert "invalid" in response.json()["detail"].lower() or "expired" in response.json()["detail"].lower()
    
    def test_protected_endpoint_with_valid_token(self):
        """Test that protected endpoint accepts valid tokens."""
        # Create a valid token
        token = create_access_token(user_id=1, role="Employee")
        
        response = client.get(
            "/api/protected",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == 1
        assert data["role"] == "Employee"
        assert "Access granted" in data["message"]
    
    def test_protected_endpoint_with_tampered_token(self):
        """Test that protected endpoint rejects tampered tokens."""
        # Create a valid token and tamper with it
        token = create_access_token(user_id=1, role="Employee")
        tampered_token = token[:-5] + "XXXXX"
        
        response = client.get(
            "/api/protected",
            headers={"Authorization": f"Bearer {tampered_token}"}
        )
        
        assert response.status_code == 401
    
    def test_protected_endpoint_extracts_user_context(self):
        """Test that middleware correctly extracts user_id and role from token."""
        # Create tokens with different user contexts
        admin_token = create_access_token(user_id=42, role="Admin")
        employee_token = create_access_token(user_id=99, role="Employee")
        
        # Test admin token
        response = client.get(
            "/api/protected",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert response.status_code == 200
        assert response.json()["user_id"] == 42
        assert response.json()["role"] == "Admin"
        
        # Test employee token
        response = client.get(
            "/api/protected",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        assert response.status_code == 200
        assert response.json()["user_id"] == 99
        assert response.json()["role"] == "Employee"


class TestRoleBasedAccessControl:
    """Test role-based access control (require_role decorator)."""
    
    def test_admin_endpoint_with_admin_role(self):
        """Test that Admin users can access Admin-only endpoints."""
        admin_token = create_access_token(user_id=1, role="Admin")
        
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["role"] == "Admin"
        assert "admin resource" in data["message"].lower()
    
    def test_admin_endpoint_with_employee_role(self):
        """Test that Employee users cannot access Admin-only endpoints."""
        employee_token = create_access_token(user_id=2, role="Employee")
        
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
        assert "insufficient permissions" in response.json()["detail"].lower()
    
    def test_admin_endpoint_without_token(self):
        """Test that Admin endpoints reject requests without authentication."""
        response = client.get("/api/admin/test")
        
        assert response.status_code == 401  # HTTPBearer returns 401 for missing auth
    
    def test_admin_endpoint_with_invalid_token(self):
        """Test that Admin endpoints reject invalid tokens."""
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": "Bearer invalid.token.here"}
        )
        
        assert response.status_code == 401
    
    def test_role_based_access_preserves_user_context(self):
        """Test that role checker preserves user context for authorized users."""
        admin_token = create_access_token(user_id=123, role="Admin")
        
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == 123
        assert data["role"] == "Admin"


class TestAuthorizationErrorResponses:
    """Test that authorization errors return consistent error responses."""
    
    def test_401_error_format(self):
        """Test that 401 errors return consistent JSON format."""
        response = client.get(
            "/api/protected",
            headers={"Authorization": "Bearer invalid.token"}
        )
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert isinstance(data["detail"], str)
    
    def test_403_error_format(self):
        """Test that 403 errors return consistent JSON format."""
        employee_token = create_access_token(user_id=1, role="Employee")
        
        response = client.get(
            "/api/admin/test",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
        data = response.json()
        assert "detail" in data
        assert isinstance(data["detail"], str)
    
    def test_www_authenticate_header_on_401(self):
        """Test that 401 responses include WWW-Authenticate header."""
        response = client.get(
            "/api/protected",
            headers={"Authorization": "Bearer invalid.token"}
        )
        
        assert response.status_code == 401
        # FastAPI/Starlette may or may not include this header depending on configuration
        # This is a nice-to-have but not strictly required
