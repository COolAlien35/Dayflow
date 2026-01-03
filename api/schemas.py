"""Pydantic models for request/response validation."""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal, Dict
from datetime import date
from decimal import Decimal


# Authentication Schemas
class SignupRequest(BaseModel):
    """Request model for user signup."""
    email: EmailStr
    password: str = Field(..., min_length=1)
    role: Literal["Admin", "Employee"]


class SignupResponse(BaseModel):
    """Response model for user signup."""
    user_id: int
    email: str
    role: str
    message: str


class LoginRequest(BaseModel):
    """Request model for user login."""
    email: EmailStr
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    """Response model for login with JWT token."""
    access_token: str
    token_type: str
    user_id: int
    role: str


# Profile Schemas
class ProfileResponse(BaseModel):
    """Response model for profile data."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    employee_id: Optional[str]
    first_name: str
    last_name: str
    phone: Optional[str]
    address: Optional[str]
    department: Optional[str]
    position: Optional[str]
    date_of_joining: Optional[date]
    emergency_contact: Optional[str]


class UserResponse(BaseModel):
    """Response model for user data (without password_hash)."""
    id: int
    email: str
    role: str
    created_at: str
    updated_at: str


class ProfileMeResponse(BaseModel):
    """Response model for GET /api/profile/me."""
    user: UserResponse
    profile: ProfileResponse


class ProfileUpdate(BaseModel):
    """Request model for profile updates by employees."""
    phone: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None


class ProfileUpdateResponse(BaseModel):
    """Response model for profile update."""
    profile: ProfileResponse
    message: str


# Leave Request Schemas
class LeaveRequestCreate(BaseModel):
    """Request model for creating leave requests."""
    leave_type: Literal["Sick", "Casual", "Vacation", "Unpaid"]
    start_date: date
    end_date: date
    remarks: Optional[str] = None


class LeaveRequestResponse(BaseModel):
    """Response model for leave request."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    leave_type: str
    start_date: date
    end_date: date
    days_count: int
    remarks: Optional[str]
    status: str
    reviewed_by: Optional[int]
    reviewed_at: Optional[str]
    admin_comments: Optional[str]
    created_at: str
    updated_at: str


class LeaveRequestCreateResponse(BaseModel):
    """Response model for leave request creation."""
    leave_request: LeaveRequestResponse
    message: str


class LeaveRequestListResponse(BaseModel):
    """Response model for leave request list with pagination."""
    leave_requests: list[LeaveRequestResponse]
    total: int
    page: int
    page_size: int


class LeaveRequestWithEmployee(BaseModel):
    """Response model for leave request with employee details."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    leave_type: str
    start_date: date
    end_date: date
    days_count: int
    remarks: Optional[str]
    status: str
    reviewed_by: Optional[int]
    reviewed_at: Optional[str]
    admin_comments: Optional[str]
    created_at: str
    updated_at: str
    employee_name: str
    employee_email: str
    department: Optional[str]


class LeaveRequestAllResponse(BaseModel):
    """Response model for all leave requests with employee details."""
    leave_requests: list[LeaveRequestWithEmployee]
    total: int
    page: int
    page_size: int


class LeaveReview(BaseModel):
    """Request model for leave approval/rejection."""
    comments: Optional[str] = None


class LeaveReviewResponse(BaseModel):
    """Response model for leave approval/rejection."""
    leave_request: LeaveRequestResponse
    message: str


# Employee Management Schemas
class EmployeeListItem(BaseModel):
    """Response model for employee list item."""
    model_config = {"from_attributes": True}
    
    id: int
    email: str
    role: str
    employee_id: Optional[str]
    first_name: str
    last_name: str
    department: Optional[str]
    position: Optional[str]
    date_of_joining: Optional[date]


class EmployeeListResponse(BaseModel):
    """Response model for employee list with pagination."""
    employees: list[EmployeeListItem]
    total: int
    page: int
    page_size: int


class EmployeeDetailResponse(BaseModel):
    """Response model for detailed employee information."""
    user: UserResponse
    profile: ProfileResponse


class AdminProfileUpdate(BaseModel):
    """Request model for admin profile updates (all fields allowed)."""
    employee_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None
    date_of_joining: Optional[date] = None
    emergency_contact: Optional[str] = None


# Payroll Schemas
class PayrollResponse(BaseModel):
    """Response model for payroll data."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    basic_salary: Decimal
    hra: Decimal
    transport_allowance: Decimal
    medical_allowance: Decimal
    tax_deduction: Decimal
    insurance_deduction: Decimal
    effective_date: date
    created_at: str
    updated_at: str


class PayrollCreate(BaseModel):
    """Request model for creating payroll records."""
    basic_salary: Decimal = Field(..., ge=0)
    hra: Optional[Decimal] = Field(default=0, ge=0)
    transport_allowance: Optional[Decimal] = Field(default=0, ge=0)
    medical_allowance: Optional[Decimal] = Field(default=0, ge=0)
    tax_deduction: Optional[Decimal] = Field(default=0, ge=0)
    insurance_deduction: Optional[Decimal] = Field(default=0, ge=0)
    effective_date: date


class PayrollUpdate(BaseModel):
    """Request model for updating payroll records."""
    basic_salary: Optional[Decimal] = Field(default=None, ge=0)
    hra: Optional[Decimal] = Field(default=None, ge=0)
    transport_allowance: Optional[Decimal] = Field(default=None, ge=0)
    medical_allowance: Optional[Decimal] = Field(default=None, ge=0)
    tax_deduction: Optional[Decimal] = Field(default=None, ge=0)
    insurance_deduction: Optional[Decimal] = Field(default=None, ge=0)


class PayrollCreateResponse(BaseModel):
    """Response model for payroll creation."""
    payroll: PayrollResponse
    message: str


# Attendance Schemas
class CheckInResponse(BaseModel):
    """Response model for check-in."""
    attendance_id: int
    check_in_time: str
    date: str
    message: str


class CheckOutResponse(BaseModel):
    """Response model for check-out."""
    attendance_id: int
    check_out_time: str
    status: str
    message: str


class AttendanceRecord(BaseModel):
    """Response model for attendance record."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    date: date
    check_in: Optional[str]
    check_out: Optional[str]
    status: str


class AttendanceHistoryResponse(BaseModel):
    """Response model for attendance history."""
    records: list[AttendanceRecord]


# Dashboard Schemas
class AttendanceSummary(BaseModel):
    """Attendance summary for current month."""
    present: int
    absent: int
    leave: int
    current_month: str


class TodayStatus(BaseModel):
    """Today's attendance status."""
    checked_in: bool
    check_in_time: Optional[str]
    checked_out: bool
    check_out_time: Optional[str]


class EmployeeDashboardResponse(BaseModel):
    """Response model for employee dashboard."""
    attendance_summary: AttendanceSummary
    recent_attendance: list[AttendanceRecord]
    recent_leaves: list[LeaveRequestResponse]
    pending_leaves_count: int
    today_status: TodayStatus


class AttendanceOverview(BaseModel):
    """Attendance overview by status."""
    present: int
    absent: int
    leave: int
    half_day: int


class AdminDashboardStats(BaseModel):
    """Admin dashboard statistics."""
    total_employees: int
    present_today: int
    on_leave_today: int
    pending_approvals: int


class AdminDashboardResponse(BaseModel):
    """Response model for admin dashboard."""
    stats: AdminDashboardStats
    attendance_overview: AttendanceOverview
    pending_leave_requests: list[LeaveRequestWithEmployee]


# Feature Flag Schemas
class FeatureFlagResponse(BaseModel):
    """Response model for feature flag data."""
    feature_name: str
    enabled: bool
    description: Optional[str] = None
    updated_at: str


class FeatureFlagUpdate(BaseModel):
    """Request model for updating a feature flag."""
    enabled: bool


class FeatureFlagsListResponse(BaseModel):
    """Response model for all feature flags."""
    flags: Dict[str, bool]


class FeatureFlagUpdateResponse(BaseModel):
    """Response model for feature flag update."""
    flag: FeatureFlagResponse
    message: str



# Analytics Schemas
class PeriodStats(BaseModel):
    """Statistics for a single period."""
    period: str
    present: int
    absent: int
    leave: int
    half_day: int
    attendance_percentage: float


class AttendanceStats(BaseModel):
    """Overall attendance statistics."""
    total_records: int
    present: int
    absent: int
    leave: int
    half_day: int
    attendance_percentage: float
    status_distribution: Dict[str, float]


class AttendanceTrendsResponse(BaseModel):
    """Response model for attendance trends."""
    periods: list[PeriodStats]
    total_stats: AttendanceStats


class LeaveStatisticsResponse(BaseModel):
    """Response model for leave statistics."""
    by_type: Dict[str, int]
    by_status: Dict[str, int]
    approval_rate: float
    average_days_per_employee: float
    total_requests: int
    total_days: int


class SalaryRange(BaseModel):
    """Salary range distribution."""
    range: str
    count: int


class DepartmentSalaryStats(BaseModel):
    """Salary statistics for a department."""
    total: float
    average: float
    count: int


class SalaryDistributionResponse(BaseModel):
    """Response model for salary distribution."""
    total: float
    average: float
    median: float
    min: float
    max: float
    distribution: list[SalaryRange]
    by_department: Dict[str, DepartmentSalaryStats]


# Notification Schemas
class NotificationResponse(BaseModel):
    """Response model for notification data."""
    model_config = {"from_attributes": True}
    
    id: int
    notification_type: str
    message: str
    related_entity_type: Optional[str]
    related_entity_id: Optional[int]
    is_read: bool
    created_at: str


class NotificationListResponse(BaseModel):
    """Response model for notification list with pagination."""
    notifications: list[NotificationResponse]
    unread_count: int
    total: int
    page: int
    page_size: int


class NotificationMarkReadResponse(BaseModel):
    """Response model for marking notification as read."""
    notification: NotificationResponse
    message: str


# Role Management Schemas
class RoleUpdate(BaseModel):
    """Request model for updating user role."""
    role: Literal["Admin", "Employee"]


class RoleChangeLogResponse(BaseModel):
    """Response model for role change log entry."""
    model_config = {"from_attributes": True}
    
    id: int
    user_id: int
    old_role: str
    new_role: str
    changed_by: int
    changed_at: str


class RoleUpdateResponse(BaseModel):
    """Response model for role update."""
    user: UserResponse
    message: str


class RoleChangeLogListResponse(BaseModel):
    """Response model for role change log list with pagination."""
    changes: list[RoleChangeLogResponse]
    total: int
    page: int
    page_size: int
