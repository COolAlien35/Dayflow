"""Authentication utilities for password hashing, validation, and JWT token management."""
import os
import re
import bcrypt
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from functools import wraps
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session

# JWT Configuration from environment variables
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

if not JWT_SECRET_KEY:
    raise ValueError("JWT_SECRET_KEY environment variable is not set")


def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password: Plain text password to hash
        
    Returns:
        Hashed password string
        
    Requirements: 1.1, 17.1
    """
    # Convert password to bytes and hash it
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Return as string for database storage
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.
    
    Args:
        plain_password: Plain text password to verify
        hashed_password: Hashed password to verify against
        
    Returns:
        True if password matches, False otherwise
        
    Requirements: 1.1, 17.1
    """
    # Convert both to bytes for bcrypt
    password_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)


def validate_password(password: str) -> tuple[bool, Optional[str]]:
    """
    Validate password meets security requirements.
    
    Password must:
    - Be at least 8 characters long
    - Contain at least one uppercase letter
    - Contain at least one lowercase letter
    - Contain at least one digit
    
    Args:
        password: Password string to validate
        
    Returns:
        Tuple of (is_valid, error_message)
        - (True, None) if password is valid
        - (False, error_message) if password is invalid
        
    Requirements: 1.2
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one digit"
    
    return True, None


def create_access_token(user_id: int, role: str) -> str:
    """
    Generate a JWT access token with user_id and role claims.
    
    Args:
        user_id: User's database ID
        role: User's role (Admin or Employee)
        
    Returns:
        Encoded JWT token string
        
    Requirements: 1.3, 1.6, 17.3, 17.4
    """
    # Calculate expiration time using timezone-aware datetime
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    
    # Create token payload
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    
    # Encode and return token
    encoded_jwt = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Validate and decode a JWT access token.
    
    Args:
        token: JWT token string to decode
        
    Returns:
        Decoded token payload as dictionary
        
    Raises:
        JWTError: If token is invalid, expired, or signature verification fails
        
    Requirements: 1.3, 1.6, 17.3, 17.4
    """
    try:
        # Decode and validate token signature
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError as e:
        # Re-raise JWT errors for caller to handle
        raise e


# HTTP Bearer security scheme for extracting JWT from Authorization header
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Authentication middleware dependency to extract and validate JWT token.
    
    Extracts JWT from Authorization header, validates the token signature,
    and returns the decoded user context (user_id and role).
    
    Args:
        credentials: HTTP Authorization credentials from request header
        
    Returns:
        Dictionary containing user_id and role from token payload
        
    Raises:
        HTTPException: 401 if token is missing, invalid, or expired
        
    Requirements: 2.1, 2.4, 14.2
    """
    try:
        # Extract token from credentials
        token = credentials.credentials
        
        # Decode and validate token
        payload = decode_access_token(token)
        
        # Extract user_id and role from payload
        user_id = payload.get("user_id")
        role = payload.get("role")
        
        # Validate required fields are present
        if user_id is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Return user context
        return {
            "user_id": user_id,
            "role": role
        }
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_role(allowed_roles: List[str]):
    """
    Role-based access control decorator factory.
    
    Creates a dependency that checks if the authenticated user's role
    is in the list of allowed roles for an endpoint.
    
    Args:
        allowed_roles: List of role strings that are allowed access
                      (e.g., ["Admin"] or ["Admin", "Employee"])
        
    Returns:
        Dependency function that validates user role
        
    Raises:
        HTTPException: 403 if user role is not in allowed_roles
        
    Requirements: 2.2, 2.3, 14.3
    
    Example:
        @app.get("/api/admin/endpoint")
        def admin_only_endpoint(user: dict = Depends(require_role(["Admin"]))):
            return {"message": "Admin access granted"}
    """
    def role_checker(current_user: dict = Depends(get_current_user)) -> dict:
        """
        Check if current user's role is in allowed roles.
        
        Args:
            current_user: User context from get_current_user dependency
            
        Returns:
            User context if role is allowed
            
        Raises:
            HTTPException: 403 if role is not allowed
        """
        user_role = current_user.get("role")
        
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions to access this resource"
            )
        
        return current_user
    
    return role_checker
