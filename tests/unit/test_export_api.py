"""Unit tests for export API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from datetime import date, datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from decimal import Decimal

# Set up test environment variables BEFORE importing api modules
os.environ["JWT_SECRET_KEY"] = "test-secret-key-for-testing-only"
os.environ["JWT_ALGORITHM"] = "HS256"
os.environ["JWT_EXPIRATION_HOURS"] = "24"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from api.index import app
from api.database import Base, get_db
from api.models import User, Profile, Attendance, LeaveRequest, Payroll
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
    
    user_id = user.id
    user_role = user.role
    
    profile = Profile(
        user_id=user.id,
        employee_id=f"EMP{user.id:05d}",
        first_name="Admin",
        last_name="User",
        department="Management"
    )
    db.add(profile)
    db.commit()
    
    db.close()
    
    return {"id": user_id, "role": user_role}


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
    
    user_id = user.id
    
    profile = Profile(
        user_id=user.id,
        employee_id=f"EMP{user.id:05d}",
        first_name="Test",
        last_name="Employee",
        department="Engineering"
    )
    db.add(profile)
    db.commit()
    
    db.close()
    
    return {"id": user_id}


def test_export_attendance_csv_success(admin_user, employee_user):
    """Test successful attendance CSV export."""
    # Create attendance records
    db = TestingSessionLocal()
    attendance = Attendance(
        user_id=employee_user["id"],
        date=date(2024, 1, 15),
        check_in=datetime(2024, 1, 15, 9, 0, 0),
        check_out=datetime(2024, 1, 15, 17, 0, 0),
        status="Present"
    )
    db.add(attendance)
    db.commit()
    db.close()
    
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2024-01-01",
            "end_date": "2024-01-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "text/csv; charset=utf-8"
    assert "attachment" in response.headers["content-disposition"]
    
    # Verify CSV content
    csv_content = response.text
    assert "Date,Employee ID,Employee Name,Email,Department,Check In,Check Out,Status" in csv_content
    assert "2024-01-15" in csv_content
    assert "Test Employee" in csv_content


def test_export_leave_csv_success(admin_user, employee_user):
    """Test successful leave CSV export."""
    # Create leave request
    db = TestingSessionLocal()
    leave_req = LeaveRequest(
        user_id=employee_user["id"],
        leave_type="Sick",
        start_date=date(2024, 1, 10),
        end_date=date(2024, 1, 12),
        days_count=3,
        status="Approved"
    )
    db.add(leave_req)
    db.commit()
    db.close()
    
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export
    response = client.get(
        "/api/v2/export/leave",
        params={
            "start_date": "2024-01-01",
            "end_date": "2024-01-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "text/csv; charset=utf-8"
    
    # Verify CSV content
    csv_content = response.text
    assert "Request ID,Employee ID,Employee Name,Email,Department,Leave Type" in csv_content
    assert "Sick" in csv_content
    assert "Test Employee" in csv_content


def test_export_payroll_csv_success(admin_user, employee_user):
    """Test successful payroll CSV export."""
    # Create payroll record
    db = TestingSessionLocal()
    payroll = Payroll(
        user_id=employee_user["id"],
        basic_salary=Decimal("50000.00"),
        hra=Decimal("10000.00"),
        transport_allowance=Decimal("5000.00"),
        medical_allowance=Decimal("3000.00"),
        tax_deduction=Decimal("8000.00"),
        insurance_deduction=Decimal("2000.00"),
        effective_date=date(2024, 1, 1)
    )
    db.add(payroll)
    db.commit()
    db.close()
    
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export
    response = client.get(
        "/api/v2/export/payroll",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "text/csv; charset=utf-8"
    
    # Verify CSV content
    csv_content = response.text
    assert "Employee ID,Employee Name,Email,Department,Position,Basic Salary" in csv_content
    assert "Test Employee" in csv_content
    assert "50000" in csv_content


def test_export_attendance_requires_admin(employee_user):
    """Test that attendance export requires admin role."""
    # Generate employee token
    token = create_access_token(user_id=employee_user["id"], role="Employee")
    
    # Request export
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2024-01-01",
            "end_date": "2024-01-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 403


def test_export_attendance_invalid_date_range(admin_user):
    """Test export with invalid date range."""
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export with start_date after end_date
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2024-12-31",
            "end_date": "2024-01-01"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 400
    assert "Start date cannot be after end date" in response.json()["detail"]


def test_export_attendance_excessive_date_range(admin_user):
    """Test export with date range exceeding maximum."""
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export with date range > 365 days
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2023-01-01",
            "end_date": "2024-12-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 400
    assert "cannot exceed" in response.json()["detail"]


def test_export_attendance_with_department_filter(admin_user, employee_user):
    """Test attendance export with department filter."""
    # Create attendance records
    db = TestingSessionLocal()
    attendance = Attendance(
        user_id=employee_user["id"],
        date=date(2024, 1, 15),
        check_in=datetime(2024, 1, 15, 9, 0, 0),
        status="Present"
    )
    db.add(attendance)
    db.commit()
    db.close()
    
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export with department filter
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2024-01-01",
            "end_date": "2024-01-31",
            "department": "Engineering"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    csv_content = response.text
    assert "Engineering" in csv_content


def test_export_attendance_empty_dataset(admin_user):
    """Test attendance export with no matching records."""
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export with date range that has no data
    response = client.get(
        "/api/v2/export/attendance",
        params={
            "start_date": "2025-01-01",
            "end_date": "2025-01-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # Should still return 200 with just headers
    assert response.status_code == 200
    csv_content = response.text
    # Should have headers but no data rows
    lines = csv_content.strip().split('\n')
    assert len(lines) == 1  # Only header row
    assert "Date,Employee ID,Employee Name" in lines[0]


def test_export_leave_empty_dataset(admin_user):
    """Test leave export with no matching records."""
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export with date range that has no data
    response = client.get(
        "/api/v2/export/leave",
        params={
            "start_date": "2025-01-01",
            "end_date": "2025-01-31"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # Should still return 200 with just headers
    assert response.status_code == 200
    csv_content = response.text
    # Should have headers but no data rows
    lines = csv_content.strip().split('\n')
    assert len(lines) == 1  # Only header row
    assert "Request ID,Employee ID,Employee Name" in lines[0]


def test_export_payroll_empty_dataset(admin_user):
    """Test payroll export with no matching records."""
    # Generate admin token
    token = create_access_token(user_id=admin_user["id"], role=admin_user["role"])
    
    # Request export (no payroll records exist)
    response = client.get(
        "/api/v2/export/payroll",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # Should still return 200 with just headers
    assert response.status_code == 200
    csv_content = response.text
    # Should have headers but no data rows
    lines = csv_content.strip().split('\n')
    assert len(lines) == 1  # Only header row
    assert "Employee ID,Employee Name,Email" in lines[0]
