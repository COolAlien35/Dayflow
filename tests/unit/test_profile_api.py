"""Unit tests for profile management API endpoints."""
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
    
    # Drop all tables after test
    Base.metadata.drop_all(bind=engine)


def create_test_user_with_profile(email="test@example.com", role="Employee"):
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
            department="Engineering",
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
    
    return login_response.json()["access_token"]


class TestGetMyProfile:
    """Test GET /api/profile/me endpoint."""
    
    def test_get_profile_with_authentication(self):
        """Test successful profile retrieval with valid authentication."""
        token = create_test_user_with_profile()
        
        response = client.get(
            "/api/profile/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify user data is present
        assert "user" in data
        assert data["user"]["email"] == "test@example.com"
        assert data["user"]["role"] == "Employee"
        assert "password_hash" not in data["user"]
        
        # Verify profile data is present
        assert "profile" in data
        assert data["profile"]["first_name"] == "Test"
        assert data["profile"]["last_name"] == "User"
        assert data["profile"]["phone"] == "1234567890"
        assert data["profile"]["department"] == "Engineering"
    
    def test_get_profile_without_authentication(self):
        """Test profile retrieval rejection without authentication."""
        response = client.get("/api/profile/me")
        
        assert response.status_code == 401  # Returns 401 for missing auth
    
    def test_get_profile_with_invalid_token(self):
        """Test profile retrieval rejection with invalid token."""
        response = client.get(
            "/api/profile/me",
            headers={"Authorization": "Bearer invalid.token.here"}
        )
        
        assert response.status_code == 401


class TestUpdateMyProfile:
    """Test PUT /api/profile/me endpoint."""
    
    def test_update_allowed_fields(self):
        """Test successful update of allowed fields (phone, address, emergency_contact)."""
        token = create_test_user_with_profile()
        
        response = client.put(
            "/api/profile/me",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "phone": "9876543210",
                "address": "456 New Address",
                "emergency_contact": "New Emergency Contact"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["message"] == "Profile updated successfully"
        assert data["profile"]["phone"] == "9876543210"
        assert data["profile"]["address"] == "456 New Address"
        assert data["profile"]["emergency_contact"] == "New Emergency Contact"
        
        # Verify other fields remain unchanged
        assert data["profile"]["first_name"] == "Test"
        assert data["profile"]["department"] == "Engineering"
    
    def test_update_partial_fields(self):
        """Test updating only some allowed fields."""
        token = create_test_user_with_profile()
        
        response = client.put(
            "/api/profile/me",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "phone": "5555555555"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["profile"]["phone"] == "5555555555"
        # Original values should remain
        assert data["profile"]["address"] == "123 Test St"
        assert data["profile"]["emergency_contact"] == "Emergency Contact"
    
    def test_update_without_authentication(self):
        """Test profile update rejection without authentication."""
        response = client.put(
            "/api/profile/me",
            json={"phone": "1111111111"}
        )
        
        assert response.status_code == 401
    
    def test_update_with_empty_values(self):
        """Test updating fields with empty strings."""
        token = create_test_user_with_profile()
        
        response = client.put(
            "/api/profile/me",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "phone": "",
                "address": ""
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Empty strings should be stripped to empty
        assert data["profile"]["phone"] == ""
        assert data["profile"]["address"] == ""
