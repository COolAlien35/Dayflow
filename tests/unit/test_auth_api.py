"""Unit tests for authentication API endpoints."""
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
from api.models import User

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


class TestSignupEndpoint:
    """Test POST /api/auth/signup endpoint."""
    
    def test_signup_with_valid_credentials(self):
        """Test successful user signup with valid credentials."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "ValidPass123",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["role"] == "Employee"
        assert "user_id" in data
        assert "message" in data
        assert "password" not in data
        assert "password_hash" not in data
    
    def test_signup_with_invalid_email_format(self):
        """Test signup rejection with invalid email format."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "not-an-email",
                "password": "ValidPass123",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 400  # Converted to 400 by custom handler
    
    def test_signup_with_weak_password(self):
        """Test signup rejection with password that doesn't meet requirements."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "weak",
                "role": "Employee"
            }
        )
        
        assert response.status_code == 400
        assert "password" in response.json()["detail"].lower()
    
    def test_signup_with_duplicate_email(self):
        """Test signup rejection when email already exists."""
        # Create first user
        client.post(
            "/api/auth/signup",
            json={
                "email": "duplicate@example.com",
                "password": "ValidPass123",
                "role": "Employee"
            }
        )
        
        # Try to create second user with same email
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "duplicate@example.com",
                "password": "AnotherPass456",
                "role": "Admin"
            }
        )
        
        assert response.status_code == 409
        assert "already registered" in response.json()["detail"].lower()
    
    def test_signup_admin_role(self):
        """Test signup with Admin role."""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "admin@example.com",
                "password": "AdminPass123",
                "role": "Admin"
            }
        )
        
        assert response.status_code == 201
        data = response.json()
        assert data["role"] == "Admin"


class TestLoginEndpoint:
    """Test POST /api/auth/login endpoint."""
    
    def test_login_with_valid_credentials(self):
        """Test successful login with valid credentials."""
        # Create user first
        client.post(
            "/api/auth/signup",
            json={
                "email": "login@example.com",
                "password": "ValidPass123",
                "role": "Employee"
            }
        )
        
        # Login
        response = client.post(
            "/api/auth/login",
            json={
                "email": "login@example.com",
                "password": "ValidPass123"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert "user_id" in data
        assert data["role"] == "Employee"
    
    def test_login_with_non_existent_email(self):
        """Test login rejection with non-existent email."""
        response = client.post(
            "/api/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "SomePass123"
            }
        )
        
        assert response.status_code == 401
        assert "invalid" in response.json()["detail"].lower()
    
    def test_login_with_wrong_password(self):
        """Test login rejection with incorrect password."""
        # Create user first
        client.post(
            "/api/auth/signup",
            json={
                "email": "user@example.com",
                "password": "CorrectPass123",
                "role": "Employee"
            }
        )
        
        # Try to login with wrong password
        response = client.post(
            "/api/auth/login",
            json={
                "email": "user@example.com",
                "password": "WrongPass123"
            }
        )
        
        assert response.status_code == 401
        assert "invalid" in response.json()["detail"].lower()
    
    def test_login_with_invalid_email_format(self):
        """Test login rejection with invalid email format."""
        response = client.post(
            "/api/auth/login",
            json={
                "email": "not-an-email",
                "password": "SomePass123"
            }
        )
        
        assert response.status_code == 400  # Converted to 400 by custom handler
    
    def test_login_returns_valid_jwt_token(self):
        """Test that login returns a valid JWT token that can be decoded."""
        from api.auth import decode_access_token
        
        # Create user
        signup_response = client.post(
            "/api/auth/signup",
            json={
                "email": "jwt@example.com",
                "password": "ValidPass123",
                "role": "Admin"
            }
        )
        user_id = signup_response.json()["user_id"]
        
        # Login
        login_response = client.post(
            "/api/auth/login",
            json={
                "email": "jwt@example.com",
                "password": "ValidPass123"
            }
        )
        
        token = login_response.json()["access_token"]
        
        # Decode token and verify claims
        payload = decode_access_token(token)
        assert payload["user_id"] == user_id
        assert payload["role"] == "Admin"
