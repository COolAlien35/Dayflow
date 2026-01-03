"""SQLAlchemy database models."""
from datetime import datetime, date
from sqlalchemy import (
    Column, Integer, String, DateTime, Date, Text, 
    ForeignKey, CheckConstraint, UniqueConstraint, DECIMAL, Boolean, JSON
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.types import TypeDecorator
from api.database import Base


class JSONType(TypeDecorator):
    """Platform-independent JSON type.
    
    Uses JSONB for PostgreSQL and JSON for other databases.
    """
    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(JSONB())
        else:
            return dialect.type_descriptor(JSON())



class User(Base):
    """User model for authentication."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True, index=True)

    # Relationships
    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    attendance_records = relationship("Attendance", back_populates="user", cascade="all, delete-orphan")
    leave_requests = relationship("LeaveRequest", back_populates="user", foreign_keys="[LeaveRequest.user_id]", cascade="all, delete-orphan")
    payroll = relationship("Payroll", back_populates="user", uselist=False, cascade="all, delete-orphan")
    salary_history = relationship("SalaryHistory", back_populates="user", foreign_keys="[SalaryHistory.user_id]", cascade="all, delete-orphan")
    payslips = relationship("Payslip", back_populates="user", foreign_keys="[Payslip.user_id]", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("role IN ('Admin', 'Employee')", name="check_role"),
    )


class Profile(Base):
    """Employee profile model."""
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    employee_id = Column(String(50), unique=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(20))
    address = Column(Text)
    department = Column(String(100), index=True)
    position = Column(String(100))
    date_of_joining = Column(Date)
    emergency_contact = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True, index=True)

    # Relationships
    user = relationship("User", back_populates="profile")


class Attendance(Base):
    """Attendance tracking model."""
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    check_in = Column(DateTime)
    check_out = Column(DateTime)
    status = Column(String(20), default="Present", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True, index=True)

    # Relationships
    user = relationship("User", back_populates="attendance_records")

    __table_args__ = (
        UniqueConstraint("user_id", "date", name="unique_user_date"),
    )


class LeaveRequest(Base):
    """Leave request model."""
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    leave_type = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    days_count = Column(Integer, nullable=False)
    remarks = Column(Text)
    status = Column(String(20), default="Pending", index=True)
    reviewed_by = Column(Integer, ForeignKey("users.id"))
    reviewed_at = Column(DateTime)
    admin_comments = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True, index=True)

    # Relationships
    user = relationship("User", back_populates="leave_requests", foreign_keys=[user_id])

    __table_args__ = (
        CheckConstraint("leave_type IN ('Sick', 'Casual', 'Vacation', 'Unpaid')", name="check_leave_type"),
        CheckConstraint("status IN ('Pending', 'Approved', 'Rejected')", name="check_status"),
    )


class Payroll(Base):
    """Payroll model."""
    __tablename__ = "payroll"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    basic_salary = Column(DECIMAL(10, 2), nullable=False)
    hra = Column(DECIMAL(10, 2), default=0)
    transport_allowance = Column(DECIMAL(10, 2), default=0)
    medical_allowance = Column(DECIMAL(10, 2), default=0)
    tax_deduction = Column(DECIMAL(10, 2), default=0)
    insurance_deduction = Column(DECIMAL(10, 2), default=0)
    effective_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True, index=True)

    # Relationships
    user = relationship("User", back_populates="payroll")

    __table_args__ = (
        CheckConstraint("basic_salary >= 0", name="check_basic_salary_positive"),
        CheckConstraint("hra >= 0", name="check_hra_positive"),
        CheckConstraint("transport_allowance >= 0", name="check_transport_positive"),
        CheckConstraint("medical_allowance >= 0", name="check_medical_positive"),
        CheckConstraint("tax_deduction >= 0", name="check_tax_positive"),
        CheckConstraint("insurance_deduction >= 0", name="check_insurance_positive"),
    )



class SalaryHistory(Base):
    """Salary history model with versioning support."""
    __tablename__ = "salary_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    basic_salary = Column(DECIMAL(10, 2), nullable=False)
    hra = Column(DECIMAL(10, 2), default=0)
    transport_allowance = Column(DECIMAL(10, 2), default=0)
    medical_allowance = Column(DECIMAL(10, 2), default=0)
    tax_deduction = Column(DECIMAL(10, 2), default=0)
    insurance_deduction = Column(DECIMAL(10, 2), default=0)
    effective_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

    # Relationships - specify foreign_keys to resolve ambiguity
    user = relationship("User", back_populates="salary_history", foreign_keys=[user_id])

    __table_args__ = (
        UniqueConstraint("user_id", "effective_date", name="unique_user_effective_date"),
        CheckConstraint("basic_salary >= 0", name="check_salary_history_basic_positive"),
        CheckConstraint("hra >= 0", name="check_salary_history_hra_positive"),
        CheckConstraint("transport_allowance >= 0", name="check_salary_history_transport_positive"),
        CheckConstraint("medical_allowance >= 0", name="check_salary_history_medical_positive"),
        CheckConstraint("tax_deduction >= 0", name="check_salary_history_tax_positive"),
        CheckConstraint("insurance_deduction >= 0", name="check_salary_history_insurance_positive"),
    )


class Payslip(Base):
    """Payslip model for monthly salary statements."""
    __tablename__ = "payslips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    basic_salary = Column(DECIMAL(10, 2), nullable=False)
    total_allowances = Column(DECIMAL(10, 2), nullable=False)
    total_deductions = Column(DECIMAL(10, 2), nullable=False)
    tax_amount = Column(DECIMAL(10, 2), nullable=False)
    net_pay = Column(DECIMAL(10, 2), nullable=False)
    generated_at = Column(DateTime, default=datetime.utcnow)
    generated_by = Column(Integer, ForeignKey("users.id"))

    # Relationships
    user = relationship("User", back_populates="payslips", foreign_keys=[user_id])

    __table_args__ = (
        UniqueConstraint("user_id", "month", "year", name="unique_user_month_year"),
        CheckConstraint("month BETWEEN 1 AND 12", name="check_month_range"),
        CheckConstraint("year >= 2020", name="check_year_range"),
    )


class TaxConfig(Base):
    """Tax configuration model."""
    __tablename__ = "tax_config"

    id = Column(Integer, primary_key=True, index=True)
    config_type = Column(String(20), nullable=False)
    flat_rate = Column(DECIMAL(5, 2))
    brackets = Column(JSONType)
    effective_date = Column(Date, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("config_type IN ('flat_rate', 'progressive')", name="check_config_type"),
        CheckConstraint("flat_rate IS NULL OR (flat_rate >= 0 AND flat_rate <= 100)", name="check_flat_rate_range"),
    )


class Notification(Base):
    """Notification model for user notifications."""
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    notification_type = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    related_entity_type = Column(String(50))
    related_entity_id = Column(Integer)
    is_read = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="notifications")


class RoleChangeLog(Base):
    """Role change audit log model."""
    __tablename__ = "role_change_log"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    old_role = Column(String(20), nullable=False)
    new_role = Column(String(20), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    changed_at = Column(DateTime, default=datetime.utcnow)


class FeatureFlag(Base):
    """Feature flag model for feature toggles."""
    __tablename__ = "feature_flags"

    id = Column(Integer, primary_key=True, index=True)
    feature_name = Column(String(50), unique=True, nullable=False)
    enabled = Column(Boolean, default=False)
    description = Column(Text)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
