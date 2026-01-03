"""Pytest configuration and shared fixtures."""
import os
import pytest

# Set up test environment variables BEFORE any imports
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"


@pytest.fixture(scope="session", autouse=True)
def setup_test_environment():
    """Set up test environment variables for all tests."""
    # Environment variables are already set above
    yield
