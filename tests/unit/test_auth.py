"""Unit tests for authentication module."""
import os
import pytest
from jose import JWTError

# Set up test environment variables BEFORE importing api.auth
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"

from api.auth import (
    hash_password,
    verify_password,
    validate_password,
    create_access_token,
    decode_access_token
)


class TestPasswordHashing:
    """Test password hashing and verification."""
    
    def test_hash_password_returns_different_value(self):
        """Test that hashing returns a different value than the input."""
        password = "TestPassword123"
        hashed = hash_password(password)
        assert hashed != password
        assert len(hashed) > 0
    
    def test_verify_password_with_correct_password(self):
        """Test password verification with correct password."""
        password = "TestPassword123"
        hashed = hash_password(password)
        assert verify_password(password, hashed) is True
    
    def test_verify_password_with_incorrect_password(self):
        """Test password verification with incorrect password."""
        password = "TestPassword123"
        hashed = hash_password(password)
        assert verify_password("WrongPassword123", hashed) is False


class TestPasswordValidation:
    """Test password validation rules."""
    
    def test_valid_password(self):
        """Test that a valid password passes validation."""
        is_valid, error = validate_password("ValidPass123")
        assert is_valid is True
        assert error is None
    
    def test_password_too_short(self):
        """Test that passwords shorter than 8 characters are rejected."""
        is_valid, error = validate_password("Short1A")
        assert is_valid is False
        assert "at least 8 characters" in error
    
    def test_password_no_uppercase(self):
        """Test that passwords without uppercase are rejected."""
        is_valid, error = validate_password("lowercase123")
        assert is_valid is False
        assert "uppercase letter" in error
    
    def test_password_no_lowercase(self):
        """Test that passwords without lowercase are rejected."""
        is_valid, error = validate_password("UPPERCASE123")
        assert is_valid is False
        assert "lowercase letter" in error
    
    def test_password_no_digit(self):
        """Test that passwords without digits are rejected."""
        is_valid, error = validate_password("NoDigitsHere")
        assert is_valid is False
        assert "digit" in error


class TestJWTTokens:
    """Test JWT token creation and decoding."""
    
    def test_create_access_token(self):
        """Test JWT token creation."""
        user_id = 1
        role = "Employee"
        token = create_access_token(user_id, role)
        assert isinstance(token, str)
        assert len(token) > 0
    
    def test_decode_access_token(self):
        """Test JWT token decoding."""
        user_id = 1
        role = "Admin"
        token = create_access_token(user_id, role)
        
        payload = decode_access_token(token)
        assert payload["user_id"] == user_id
        assert payload["role"] == role
        assert "exp" in payload
        assert "iat" in payload
    
    def test_decode_invalid_token(self):
        """Test that invalid tokens raise JWTError."""
        with pytest.raises(JWTError):
            decode_access_token("invalid.token.here")
    
    def test_decode_tampered_token(self):
        """Test that tampered tokens are rejected."""
        token = create_access_token(1, "Employee")
        # Tamper with the token by changing a character
        tampered_token = token[:-5] + "XXXXX"
        
        with pytest.raises(JWTError):
            decode_access_token(tampered_token)

