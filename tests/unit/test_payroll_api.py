"""Unit tests for payroll API endpoints."""
import pytest
from fastapi.testclient import TestClient
from datetime import date
from decimal import Decimal

from api.index import app
from api.database import get_db, Base, engine
from api.models import User, Profile, Payroll
from api.auth import hash_password, create_access_token


# Create test client
client = TestClient(app)


# Test database setup
@pytest.fixture(autouse=True)
def setup_database():
    """Create tables before each test and drop after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    """Get database session for test."""
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def employee_user(db_session):
    """Create a test employee user."""
    user = User(
        email="employee@test.com",
        password_hash=hash_password("Test1234"),
        role="Employee"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # Create profile
    profile = Profile(
        user_id=user.id,
        employee_id=f"EMP{user.id:03d}",
        first_name="Test",
        last_name="Employee",
        department="Engineering"
    )
    db_session.add(profile)
    db_session.commit()
    
    return user


@pytest.fixture
def admin_user(db_session):
    """Create a test admin user."""
    user = User(
        email="admin@test.com",
        password_hash=hash_password("Admin1234"),
        role="Admin"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # Create profile
    profile = Profile(
        user_id=user.id,
        employee_id=f"ADM{user.id:03d}",
        first_name="Test",
        last_name="Admin",
        department="Management"
    )
    db_session.add(profile)
    db_session.commit()
    
    return user


@pytest.fixture
def employee_token(employee_user):
    """Generate JWT token for employee."""
    return create_access_token(employee_user.id, employee_user.role)


@pytest.fixture
def admin_token(admin_user):
    """Generate JWT token for admin."""
    return create_access_token(admin_user.id, admin_user.role)


class TestGetMyPayroll:
    """Tests for GET /api/payroll/me endpoint."""
    
    def test_get_payroll_success(self, db_session, employee_user, employee_token):
        """Test employee can retrieve their own payroll."""
        # Create payroll record
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Make request
        response = client.get(
            "/api/payroll/me",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == employee_user.id
        assert float(data["basic_salary"]) == 50000.00
        assert float(data["hra"]) == 10000.00
        assert float(data["transport_allowance"]) == 2000.00
        assert float(data["medical_allowance"]) == 1500.00
        assert float(data["tax_deduction"]) == 5000.00
        assert float(data["insurance_deduction"]) == 1000.00
        assert data["effective_date"] == "2026-01-01"
    
    def test_get_payroll_not_found(self, employee_user, employee_token):
        """Test 404 when no payroll record exists."""
        response = client.get(
            "/api/payroll/me",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 404
        assert "No payroll record found" in response.json()["detail"]
    
    def test_get_payroll_requires_authentication(self):
        """Test endpoint requires authentication."""
        response = client.get("/api/payroll/me")
        assert response.status_code == 401  # 401 for missing authentication


class TestGetEmployeePayroll:
    """Tests for GET /api/payroll/{employee_id} endpoint."""
    
    def test_admin_can_get_employee_payroll(self, db_session, employee_user, admin_token):
        """Test admin can retrieve any employee's payroll."""
        # Create payroll record
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Make request
        response = client.get(
            f"/api/payroll/{employee_user.id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == employee_user.id
        assert float(data["basic_salary"]) == 50000.00
    
    def test_employee_cannot_get_other_payroll(self, db_session, employee_user, admin_user, employee_token):
        """Test employee cannot access other employee's payroll."""
        # Create payroll for admin
        payroll = Payroll(
            user_id=admin_user.id,
            basic_salary=Decimal("80000.00"),
            hra=Decimal("15000.00"),
            transport_allowance=Decimal("3000.00"),
            medical_allowance=Decimal("2000.00"),
            tax_deduction=Decimal("8000.00"),
            insurance_deduction=Decimal("1500.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Make request
        response = client.get(
            f"/api/payroll/{admin_user.id}",
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
    
    def test_get_employee_payroll_not_found(self, employee_user, admin_token):
        """Test 404 when no payroll record exists."""
        response = client.get(
            f"/api/payroll/{employee_user.id}",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 404


class TestCreateEmployeePayroll:
    """Tests for POST /api/payroll/{employee_id} endpoint."""
    
    def test_admin_can_create_payroll(self, employee_user, admin_token):
        """Test admin can create payroll for employee."""
        payload = {
            "basic_salary": 50000.00,
            "hra": 10000.00,
            "transport_allowance": 2000.00,
            "medical_allowance": 1500.00,
            "tax_deduction": 5000.00,
            "insurance_deduction": 1000.00,
            "effective_date": "2026-01-01"
        }
        
        response = client.post(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 201
        data = response.json()
        assert data["message"] == "Payroll record created successfully"
        assert data["payroll"]["user_id"] == employee_user.id
        assert float(data["payroll"]["basic_salary"]) == 50000.00
    
    def test_create_payroll_validates_employee_exists(self, admin_token):
        """Test creating payroll for non-existent employee fails."""
        payload = {
            "basic_salary": 50000.00,
            "effective_date": "2026-01-01"
        }
        
        response = client.post(
            "/api/payroll/99999",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 404
        assert "Employee not found" in response.json()["detail"]
    
    def test_create_payroll_prevents_duplicate(self, db_session, employee_user, admin_token):
        """Test cannot create duplicate payroll record."""
        # Create existing payroll
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Try to create another
        payload = {
            "basic_salary": 60000.00,
            "effective_date": "2026-02-01"
        }
        
        response = client.post(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 409
        assert "already exists" in response.json()["detail"]
    
    def test_create_payroll_validates_non_negative(self, employee_user, admin_token):
        """Test payroll fields must be non-negative."""
        payload = {
            "basic_salary": -50000.00,
            "effective_date": "2026-01-01"
        }
        
        response = client.post(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 400  # Converted to 400 by custom handler
    
    def test_employee_cannot_create_payroll(self, employee_user, admin_user, employee_token):
        """Test employee cannot create payroll records."""
        payload = {
            "basic_salary": 50000.00,
            "effective_date": "2026-01-01"
        }
        
        response = client.post(
            f"/api/payroll/{admin_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403


class TestUpdateEmployeePayroll:
    """Tests for PUT /api/payroll/{employee_id} endpoint."""
    
    def test_admin_can_update_payroll(self, db_session, employee_user, admin_token):
        """Test admin can update employee payroll."""
        # Create payroll record
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Update payroll
        payload = {
            "basic_salary": 60000.00,
            "hra": 12000.00
        }
        
        response = client.put(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Payroll record updated successfully"
        assert float(data["payroll"]["basic_salary"]) == 60000.00
        assert float(data["payroll"]["hra"]) == 12000.00
        # Other fields should remain unchanged
        assert float(data["payroll"]["transport_allowance"]) == 2000.00
    
    def test_update_payroll_not_found(self, employee_user, admin_token):
        """Test updating non-existent payroll returns 404."""
        payload = {
            "basic_salary": 60000.00
        }
        
        response = client.put(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 404
    
    def test_update_payroll_validates_non_negative(self, db_session, employee_user, admin_token):
        """Test update validates non-negative values."""
        # Create payroll record
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Try to update with negative value
        payload = {
            "basic_salary": -60000.00
        }
        
        response = client.put(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 400  # Converted to 400 by custom handler
    
    def test_employee_cannot_update_payroll(self, db_session, employee_user, employee_token):
        """Test employee cannot update payroll records."""
        # Create payroll record
        payroll = Payroll(
            user_id=employee_user.id,
            basic_salary=Decimal("50000.00"),
            hra=Decimal("10000.00"),
            transport_allowance=Decimal("2000.00"),
            medical_allowance=Decimal("1500.00"),
            tax_deduction=Decimal("5000.00"),
            insurance_deduction=Decimal("1000.00"),
            effective_date=date(2026, 1, 1)
        )
        db_session.add(payroll)
        db_session.commit()
        
        # Try to update
        payload = {
            "basic_salary": 100000.00
        }
        
        response = client.put(
            f"/api/payroll/{employee_user.id}",
            json=payload,
            headers={"Authorization": f"Bearer {employee_token}"}
        )
        
        assert response.status_code == 403
