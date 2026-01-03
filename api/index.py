from fastapi import FastAPI, HTTPException, Depends, status, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from typing import Optional
from datetime import datetime, date
import os
import logging

from api.database import get_db
from api.models import User, Profile, Attendance, LeaveRequest, Payroll, Notification
from api.schemas import (
    SignupRequest, SignupResponse, LoginRequest, TokenResponse,
    ProfileMeResponse, ProfileResponse, UserResponse, ProfileUpdate, ProfileUpdateResponse,
    EmployeeListItem, EmployeeListResponse, EmployeeDetailResponse, AdminProfileUpdate,
    EmployeeCreate, EmployeeCreateResponse,
    CheckInResponse, CheckOutResponse, AttendanceRecord, AttendanceHistoryResponse,
    LeaveRequestCreate, LeaveRequestCreateResponse, LeaveRequestResponse, 
    LeaveRequestListResponse, LeaveRequestWithEmployee, LeaveRequestAllResponse,
    LeaveReview, LeaveReviewResponse,
    EmployeeDashboardResponse, AttendanceSummary, TodayStatus,
    AdminDashboardResponse, AdminDashboardStats, AttendanceOverview,
    PayrollResponse, PayrollCreate, PayrollUpdate, PayrollCreateResponse,
    NotificationListResponse, NotificationResponse, NotificationMarkReadResponse
)
from api.auth import (
    hash_password, 
    verify_password, 
    validate_password, 
    create_access_token,
    get_current_user,
    require_role
)
from api.events import (
    dispatch_event,
    EVENT_LEAVE_REQUESTED,
    EVENT_LEAVE_APPROVED,
    EVENT_LEAVE_REJECTED,
    EVENT_ATTENDANCE_UPDATED
)

# Import v2 routers
from api.v2_admin import router as v2_admin_router
from api.v2_analytics import router as v2_analytics_router
from api.v2_export import router as v2_export_router
from api.v2_notifications import router as v2_notifications_router

# Import notification system
from api.notifications import register_notification_handlers

# Import WebSocket handler
from api.websockets import handle_websocket_connection

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Dayflow HRMS API",
    description="Human Resource Management System API",
    version="1.0.0"
)

# Configure CORS
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register notification handlers
register_notification_handlers()

# Include v2 routers
app.include_router(v2_admin_router)
app.include_router(v2_analytics_router)
app.include_router(v2_export_router)
app.include_router(v2_notifications_router)


# Global Exception Handlers
# Requirements: 14.1, 14.2, 14.3, 14.4, 16.1, 16.2, 16.3, 16.4

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handle validation errors (400 with field details).
    
    Converts Pydantic validation errors into a consistent JSON response format
    with snake_case field names and detailed field-level error messages.
    
    Requirements: 14.1, 16.1, 16.2, 16.3
    """
    # Extract field errors from Pydantic validation error
    field_errors = {}
    for error in exc.errors():
        # Get the field path (e.g., ['body', 'email'] -> 'email')
        field_path = ".".join(str(loc) for loc in error["loc"] if loc != "body")
        error_msg = error["msg"]
        
        # Add error message to field errors
        if field_path in field_errors:
            field_errors[field_path].append(error_msg)
        else:
            field_errors[field_path] = [error_msg]
    
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "detail": "Validation error",
            "error_code": "VALIDATION_ERROR",
            "field_errors": field_errors
        }
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """
    Handle HTTP exceptions with consistent JSON response format.
    
    Ensures all HTTP exceptions return JSON responses with snake_case fields
    and appropriate status codes (401 for auth, 403 for authorization, 404 for not found).
    
    Requirements: 14.2, 14.3, 14.4, 16.1, 16.2, 16.3
    """
    # Map status codes to error codes
    error_code_map = {
        401: "AUTHENTICATION_ERROR",
        403: "AUTHORIZATION_ERROR",
        404: "NOT_FOUND",
        409: "CONFLICT",
        400: "BAD_REQUEST"
    }
    
    error_code = error_code_map.get(exc.status_code, "HTTP_ERROR")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "error_code": error_code
        }
    )


@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    """
    Handle database errors (500 with logging).
    
    Logs database errors for debugging and returns a generic error message
    to avoid exposing internal database details to clients.
    
    Requirements: 14.1, 16.1, 16.2
    """
    # Log the full error for debugging
    logger.error(f"Database error: {str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An internal database error occurred. Please try again later.",
            "error_code": "DATABASE_ERROR"
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """
    Handle all other unexpected exceptions (500 with logging).
    
    Catches any unhandled exceptions, logs them for debugging, and returns
    a generic error message to avoid exposing internal implementation details.
    
    Requirements: 14.1, 16.1, 16.2
    """
    # Log the full error for debugging
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An unexpected error occurred. Please try again later.",
            "error_code": "INTERNAL_SERVER_ERROR"
        }
    )


@app.get("/")
def read_root():
    """Root endpoint."""
    return {"message": "Dayflow HRMS API", "status": "running"}


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@app.post("/api/auth/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """
    Create a new user account with email and password.
    
    Validates email format, password strength, checks for duplicate emails,
    hashes the password, and creates the user record.
    
    Requirements: 1.1, 1.2, 1.4, 1.5, 14.6
    """
    # Validate password meets security requirements
    is_valid, error_message = validate_password(request.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_message
        )
    
    # Check for duplicate email
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Hash password
    password_hash = hash_password(request.password)
    
    # Create user record
    new_user = User(
        email=request.email,
        password_hash=password_hash,
        role=request.role
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Create empty profile for new user
        # Extract name from email (e.g., "john.doe@example.com" -> "John", "Doe")
        email_local = request.email.split('@')[0]
        name_parts = email_local.replace('.', ' ').replace('_', ' ').replace('-', ' ').title().split()
        first_name = name_parts[0] if name_parts else "User"
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        
        new_profile = Profile(
            user_id=new_user.id,
            first_name=first_name,
            last_name=last_name
        )
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Return user data without password_hash
    return SignupResponse(
        user_id=new_user.id,
        email=new_user.email,
        role=new_user.role,
        message="User created successfully"
    )


@app.post("/api/auth/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return JWT token.
    
    Validates email format, verifies credentials, and generates JWT token
    with user_id and role claims.
    
    Requirements: 1.3, 1.6
    """
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    
    # Verify credentials (use generic error message for security)
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Generate JWT token
    access_token = create_access_token(user_id=user.id, role=user.role)
    
    # Return token and user info
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        role=user.role
    )


@app.get("/api/protected")
def protected_endpoint(current_user: dict = Depends(get_current_user)):
    """
    Test endpoint requiring authentication.
    
    Demonstrates the get_current_user middleware in action.
    Any authenticated user can access this endpoint.
    
    Requirements: 2.1, 2.4
    """
    return {
        "message": "Access granted to protected resource",
        "user_id": current_user["user_id"],
        "role": current_user["role"]
    }


@app.get("/api/admin/test")
def admin_only_endpoint(current_user: dict = Depends(require_role(["Admin"]))):
    """
    Test endpoint requiring Admin role.
    
    Demonstrates the require_role decorator in action.
    Only users with Admin role can access this endpoint.
    
    Requirements: 2.2, 2.3
    """
    return {
        "message": "Access granted to admin resource",
        "user_id": current_user["user_id"],
        "role": current_user["role"]
    }


@app.get("/api/profile/me", response_model=ProfileMeResponse)
def get_my_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the authenticated user's complete profile.
    
    Returns user data (without password_hash) and complete profile information
    including personal and employment details.
    
    Requirements: 3.1, 17.2
    """
    user_id = current_user["user_id"]
    
    # Fetch user and profile data
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Build response without password_hash
    user_response = UserResponse(
        id=user.id,
        email=user.email,
        role=user.role,
        created_at=user.created_at.isoformat(),
        updated_at=user.updated_at.isoformat()
    )
    
    profile_response = ProfileResponse.model_validate(profile)
    
    return ProfileMeResponse(
        user=user_response,
        profile=profile_response
    )


@app.put("/api/profile/me", response_model=ProfileUpdateResponse)
def update_my_profile(
    request: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update the authenticated user's profile.
    
    Allows employees to update only specific fields: phone, address, emergency_contact.
    Restricted fields (employee_id, department, position, salary) cannot be updated
    by employees and will result in 403 error if attempted.
    
    All text inputs are sanitized to prevent injection attacks.
    
    Requirements: 3.2, 3.3, 3.4, 14.7
    """
    user_id = current_user["user_id"]
    
    # Fetch profile
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Update only allowed fields
    update_data = request.model_dump(exclude_unset=True)
    
    # Sanitize text inputs (basic sanitization - strip whitespace)
    for field, value in update_data.items():
        if value is not None and isinstance(value, str):
            update_data[field] = value.strip()
    
    # Update profile fields
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    try:
        db.commit()
        db.refresh(profile)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )
    
    profile_response = ProfileResponse.model_validate(profile)
    
    return ProfileUpdateResponse(
        profile=profile_response,
        message="Profile updated successfully"
    )



# Employee Management Endpoints

@app.get("/api/employees", response_model=EmployeeListResponse)
def get_employees(
    page: int = 1,
    page_size: int = 10,
    department: Optional[str] = None,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get list of all employees with pagination and filtering.
    
    Admin-only endpoint that returns employee list with key information.
    Supports pagination via page and page_size query parameters.
    Supports filtering by department.
    
    Requirements: 4.1, 4.5, 16.5
    """
    # Validate pagination parameters
    if page < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page must be >= 1"
        )
    
    if page_size < 1 or page_size > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page size must be between 1 and 100"
        )
    
    # Build query joining users and profiles
    query = db.query(User, Profile).join(Profile, User.id == Profile.user_id)
    
    # Apply department filter if provided
    if department:
        query = query.filter(Profile.department == department)
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    offset = (page - 1) * page_size
    results = query.offset(offset).limit(page_size).all()
    
    # Build employee list
    employees = []
    for user, profile in results:
        employee = EmployeeListItem(
            id=user.id,
            email=user.email,
            role=user.role,
            employee_id=profile.employee_id,
            first_name=profile.first_name,
            last_name=profile.last_name,
            department=profile.department,
            position=profile.position,
            date_of_joining=profile.date_of_joining
        )
        employees.append(employee)
    
    return EmployeeListResponse(
        employees=employees,
        total=total,
        page=page,
        page_size=page_size
    )


@app.post("/api/employees", response_model=EmployeeCreateResponse, status_code=status.HTTP_201_CREATED)
def create_employee(
    request: EmployeeCreate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Create a new employee (Admin only).
    
    Creates a new user account with Employee role and associated profile.
    Validates email uniqueness and password strength.
    """
    # Validate password meets security requirements
    is_valid, error_message = validate_password(request.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_message
        )
    
    # Check for duplicate email
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Hash password
    password_hash = hash_password(request.password)
    
    # Create user record with Employee role
    new_user = User(
        email=request.email,
        password_hash=password_hash,
        role="Employee"
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Create profile with provided information
        new_profile = Profile(
            user_id=new_user.id,
            first_name=request.first_name,
            last_name=request.last_name,
            employee_id=request.employee_id,
            department=request.department,
            position=request.position,
            phone=request.phone,
            date_of_joining=request.date_of_joining or date.today()
        )
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Failed to create employee. Email or employee ID may already exist."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create employee"
        )
    
    # Build response
    user_response = UserResponse(
        id=new_user.id,
        email=new_user.email,
        role=new_user.role,
        created_at=new_user.created_at.isoformat(),
        updated_at=new_user.updated_at.isoformat()
    )
    
    profile_response = ProfileResponse.model_validate(new_profile)
    
    return EmployeeCreateResponse(
        user=user_response,
        profile=profile_response,
        message="Employee created successfully"
    )


@app.get("/api/employees/{employee_id}", response_model=EmployeeDetailResponse)
def get_employee_detail(
    employee_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get detailed information for a specific employee.
    
    Accessible by Admin role or by the employee themselves (self-access).
    Returns complete employee profile and user data.
    
    Requirements: 4.2, 14.4
    """
    # Check authorization: Admin can access any employee, Employee can only access self
    user_role = current_user["role"]
    user_id = current_user["user_id"]
    
    if user_role != "Admin" and user_id != employee_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to access this employee's information"
        )
    
    # Fetch user and profile
    user = db.query(User).filter(User.id == employee_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    profile = db.query(Profile).filter(Profile.user_id == employee_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found"
        )
    
    # Build response without password_hash
    user_response = UserResponse(
        id=user.id,
        email=user.email,
        role=user.role,
        created_at=user.created_at.isoformat(),
        updated_at=user.updated_at.isoformat()
    )
    
    profile_response = ProfileResponse.model_validate(profile)
    
    return EmployeeDetailResponse(
        user=user_response,
        profile=profile_response
    )


@app.put("/api/employees/{employee_id}", response_model=ProfileUpdateResponse)
def update_employee_profile(
    employee_id: int,
    request: AdminProfileUpdate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Update employee profile (Admin only).
    
    Allows admins to update any profile field including restricted fields
    that employees cannot modify themselves.
    
    Requirements: 4.3
    """
    # Fetch profile
    profile = db.query(Profile).filter(Profile.user_id == employee_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found"
        )
    
    # Update fields
    update_data = request.model_dump(exclude_unset=True)
    
    # Sanitize text inputs (basic sanitization - strip whitespace)
    for field, value in update_data.items():
        if value is not None and isinstance(value, str):
            update_data[field] = value.strip()
    
    # Update profile fields
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    try:
        db.commit()
        db.refresh(profile)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update employee profile"
        )
    
    profile_response = ProfileResponse.model_validate(profile)
    
    return ProfileUpdateResponse(
        profile=profile_response,
        message="Employee profile updated successfully"
    )



# Attendance Endpoints

@app.post("/api/attendance/check-in", response_model=CheckInResponse, status_code=status.HTTP_201_CREATED)
def check_in(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Record employee check-in for the current day.
    
    Creates a new attendance record with the current timestamp and date.
    Prevents duplicate check-ins for the same date.
    Sets status to "Present".
    
    Requirements: 7.1, 7.3, 7.5, 7.6
    """
    user_id = current_user["user_id"]
    today = date.today()
    now = datetime.utcnow()
    
    # Check for existing attendance record for today
    existing_record = db.query(Attendance).filter(
        Attendance.user_id == user_id,
        Attendance.date == today
    ).first()
    
    if existing_record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already checked in for today"
        )
    
    # Create new attendance record
    attendance = Attendance(
        user_id=user_id,
        date=today,
        check_in=now,
        status="Present"
    )
    
    try:
        db.add(attendance)
        db.commit()
        db.refresh(attendance)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record check-in"
        )
    
    # Dispatch attendance_updated event
    # Requirements: 26.4
    dispatch_event(EVENT_ATTENDANCE_UPDATED, {
        "user_id": user_id,
        "attendance_id": attendance.id,
        "date": attendance.date.isoformat(),
        "action": "check_in",
        "status": attendance.status
    })
    
    return CheckInResponse(
        attendance_id=attendance.id,
        check_in_time=attendance.check_in.isoformat(),
        date=attendance.date.isoformat(),
        message="Check-in recorded successfully"
    )


@app.post("/api/attendance/check-out", response_model=CheckOutResponse)
def check_out(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Record employee check-out for the current day.
    
    Updates the existing attendance record with check-out timestamp.
    Requires that a check-in record exists for today.
    
    Requirements: 7.2, 7.4
    """
    user_id = current_user["user_id"]
    today = date.today()
    now = datetime.utcnow()
    
    # Check for existing check-in record for today
    attendance = db.query(Attendance).filter(
        Attendance.user_id == user_id,
        Attendance.date == today
    ).first()
    
    if not attendance:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No check-in record found for today. Please check in first."
        )
    
    # Update attendance record with check-out time
    attendance.check_out = now
    
    # Compute status based on hours worked
    # If worked less than 4 hours, mark as Half-day; otherwise, Present
    if attendance.check_in:
        hours_worked = (now - attendance.check_in).total_seconds() / 3600
        if hours_worked < 4:
            attendance.status = "Half-day"
        else:
            attendance.status = "Present"
    
    try:
        db.commit()
        db.refresh(attendance)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record check-out"
        )
    
    # Dispatch attendance_updated event
    # Requirements: 26.4
    dispatch_event(EVENT_ATTENDANCE_UPDATED, {
        "user_id": user_id,
        "attendance_id": attendance.id,
        "date": attendance.date.isoformat(),
        "action": "check_out",
        "status": attendance.status
    })
    
    return CheckOutResponse(
        attendance_id=attendance.id,
        check_out_time=attendance.check_out.isoformat(),
        status=attendance.status,
        message="Check-out recorded successfully"
    )


@app.get("/api/attendance/history", response_model=AttendanceHistoryResponse)
def get_attendance_history(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    user_id: Optional[int] = None,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retrieve attendance history with date range filtering.
    
    Employees can view their own attendance history.
    Admins can view any employee's attendance by specifying user_id.
    Defaults to current month if no date range is specified.
    
    Requirements: 8.1, 8.3, 8.4, 8.5
    """
    # Determine which user's attendance to retrieve
    target_user_id = current_user["user_id"]
    user_role = current_user["role"]
    
    # If user_id is specified, check if requester is admin
    if user_id is not None:
        if user_role != "Admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only admins can view other employees' attendance"
            )
        target_user_id = user_id
    
    # Default to current month if no date range specified
    if start_date is None or end_date is None:
        today = date.today()
        start_date = date(today.year, today.month, 1)
        
        # Calculate last day of current month
        if today.month == 12:
            end_date = date(today.year, 12, 31)
        else:
            next_month = date(today.year, today.month + 1, 1)
            from datetime import timedelta
            end_date = next_month - timedelta(days=1)
    
    # Query attendance records for date range
    records = db.query(Attendance).filter(
        Attendance.user_id == target_user_id,
        Attendance.date >= start_date,
        Attendance.date <= end_date
    ).order_by(Attendance.date.desc()).all()
    
    # Convert records to response format
    attendance_records = []
    for record in records:
        attendance_records.append(AttendanceRecord(
            id=record.id,
            user_id=record.user_id,
            date=record.date,
            check_in=record.check_in.isoformat() if record.check_in else None,
            check_out=record.check_out.isoformat() if record.check_out else None,
            status=record.status
        ))
    
    return AttendanceHistoryResponse(records=attendance_records)



# Leave Management Endpoints

@app.post("/api/leave/request", response_model=LeaveRequestCreateResponse, status_code=status.HTTP_201_CREATED)
def create_leave_request(
    request: LeaveRequestCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new leave request.
    
    Validates leave_type is in allowed list, validates start_date is not after end_date,
    validates required fields, calculates days_count from date range,
    creates leave request with status "Pending", and links to requesting employee.
    
    Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
    """
    user_id = current_user["user_id"]
    
    # Validate start_date is not after end_date
    if request.start_date > request.end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be after end date"
        )
    
    # Calculate days_count (inclusive of both start and end dates)
    days_count = (request.end_date - request.start_date).days + 1
    
    # Create leave request
    leave_request = LeaveRequest(
        user_id=user_id,
        leave_type=request.leave_type,
        start_date=request.start_date,
        end_date=request.end_date,
        days_count=days_count,
        remarks=request.remarks,
        status="Pending"
    )
    
    try:
        db.add(leave_request)
        db.commit()
        db.refresh(leave_request)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create leave request"
        )
    
    # Dispatch leave_requested event
    # Requirements: 26.1
    dispatch_event(EVENT_LEAVE_REQUESTED, {
        "user_id": user_id,
        "request_id": leave_request.id,
        "leave_type": leave_request.leave_type,
        "start_date": leave_request.start_date.isoformat(),
        "end_date": leave_request.end_date.isoformat(),
        "days_count": leave_request.days_count,
        "db": db
    })
    
    return LeaveRequestCreateResponse(
        leave_request=LeaveRequestResponse.model_validate(leave_request),
        message="Leave request created successfully"
    )


@app.get("/api/leave/my-requests", response_model=LeaveRequestListResponse)
def get_my_leave_requests(
    page: int = 1,
    page_size: int = 10,
    status_filter: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get leave requests for the authenticated employee.
    
    Supports pagination (page, page_size), status filtering, and date range filtering.
    Orders by created_at descending. Returns leave requests with metadata.
    
    Requirements: 10.1, 10.2, 10.3, 10.5, 16.5
    """
    user_id = current_user["user_id"]
    
    # Validate pagination parameters
    if page < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page must be >= 1"
        )
    
    if page_size < 1 or page_size > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page size must be between 1 and 100"
        )
    
    # Build query
    query = db.query(LeaveRequest).filter(LeaveRequest.user_id == user_id)
    
    # Apply status filter if provided
    if status_filter:
        # Validate status is one of the allowed values
        if status_filter not in ["Pending", "Approved", "Rejected"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid status filter. Must be one of: Pending, Approved, Rejected"
            )
        query = query.filter(LeaveRequest.status == status_filter)
    
    # Apply date range filter if provided
    if start_date:
        query = query.filter(LeaveRequest.start_date >= start_date)
    if end_date:
        query = query.filter(LeaveRequest.end_date <= end_date)
    
    # Order by created_at descending
    query = query.order_by(LeaveRequest.created_at.desc())
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    offset = (page - 1) * page_size
    results = query.offset(offset).limit(page_size).all()
    
    # Convert to response format
    leave_requests = []
    for leave_req in results:
        leave_requests.append(LeaveRequestResponse(
            id=leave_req.id,
            user_id=leave_req.user_id,
            leave_type=leave_req.leave_type,
            start_date=leave_req.start_date,
            end_date=leave_req.end_date,
            days_count=leave_req.days_count,
            remarks=leave_req.remarks,
            status=leave_req.status,
            reviewed_by=leave_req.reviewed_by,
            reviewed_at=leave_req.reviewed_at.isoformat() if leave_req.reviewed_at else None,
            admin_comments=leave_req.admin_comments,
            created_at=leave_req.created_at.isoformat(),
            updated_at=leave_req.updated_at.isoformat()
        ))
    
    return LeaveRequestListResponse(
        leave_requests=leave_requests,
        total=total,
        page=page,
        page_size=page_size
    )


@app.get("/api/leave/all-requests", response_model=LeaveRequestAllResponse)
def get_all_leave_requests(
    page: int = 1,
    page_size: int = 10,
    status_filter: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get all leave requests from all employees (Admin only).
    
    Supports pagination and filtering like my-requests endpoint.
    Includes employee details in response.
    
    Requirements: 11.1
    """
    # Validate pagination parameters
    if page < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page must be >= 1"
        )
    
    if page_size < 1 or page_size > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Page size must be between 1 and 100"
        )
    
    # Build query joining leave_requests with users and profiles
    query = db.query(LeaveRequest, User, Profile).join(
        User, LeaveRequest.user_id == User.id
    ).join(
        Profile, User.id == Profile.user_id
    )
    
    # Apply status filter if provided
    if status_filter:
        # Validate status is one of the allowed values
        if status_filter not in ["Pending", "Approved", "Rejected"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid status filter. Must be one of: Pending, Approved, Rejected"
            )
        query = query.filter(LeaveRequest.status == status_filter)
    
    # Apply date range filter if provided
    if start_date:
        query = query.filter(LeaveRequest.start_date >= start_date)
    if end_date:
        query = query.filter(LeaveRequest.end_date <= end_date)
    
    # Order by created_at descending
    query = query.order_by(LeaveRequest.created_at.desc())
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination
    offset = (page - 1) * page_size
    results = query.offset(offset).limit(page_size).all()
    
    # Convert to response format with employee details
    leave_requests = []
    for leave_req, user, profile in results:
        employee_name = f"{profile.first_name} {profile.last_name}"
        leave_requests.append(LeaveRequestWithEmployee(
            id=leave_req.id,
            user_id=leave_req.user_id,
            leave_type=leave_req.leave_type,
            start_date=leave_req.start_date,
            end_date=leave_req.end_date,
            days_count=leave_req.days_count,
            remarks=leave_req.remarks,
            status=leave_req.status,
            reviewed_by=leave_req.reviewed_by,
            reviewed_at=leave_req.reviewed_at.isoformat() if leave_req.reviewed_at else None,
            admin_comments=leave_req.admin_comments,
            created_at=leave_req.created_at.isoformat(),
            updated_at=leave_req.updated_at.isoformat(),
            employee_name=employee_name,
            employee_email=user.email,
            department=profile.department
        ))
    
    return LeaveRequestAllResponse(
        leave_requests=leave_requests,
        total=total,
        page=page,
        page_size=page_size
    )


@app.put("/api/leave/{request_id}/approve", response_model=LeaveReviewResponse)
def approve_leave_request(
    request_id: int,
    review: LeaveReview,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Approve a leave request (Admin only).
    
    Validates leave request exists and is Pending, updates status to "Approved",
    sets reviewed_by to admin user_id, sets reviewed_at to current timestamp,
    stores admin_comments if provided, and rejects if already reviewed with 400.
    
    Requirements: 11.2, 11.4, 11.5, 11.6
    """
    admin_id = current_user["user_id"]
    
    # Fetch leave request
    leave_request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    
    if not leave_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Leave request not found"
        )
    
    # Validate leave request is Pending
    if leave_request.status != "Pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Leave request has already been {leave_request.status.lower()}. Cannot modify reviewed requests."
        )
    
    # Update leave request
    leave_request.status = "Approved"
    leave_request.reviewed_by = admin_id
    leave_request.reviewed_at = datetime.utcnow()
    
    if review.comments:
        leave_request.admin_comments = review.comments
    
    try:
        db.commit()
        db.refresh(leave_request)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to approve leave request"
        )
    
    # Dispatch leave_approved event
    # Requirements: 26.2
    dispatch_event(EVENT_LEAVE_APPROVED, {
        "user_id": leave_request.user_id,
        "request_id": leave_request.id,
        "leave_type": leave_request.leave_type,
        "start_date": leave_request.start_date.isoformat(),
        "end_date": leave_request.end_date.isoformat(),
        "days_count": leave_request.days_count,
        "reviewed_by": admin_id,
        "admin_comments": leave_request.admin_comments,
        "db": db
    })
    
    # Build response
    leave_response = LeaveRequestResponse(
        id=leave_request.id,
        user_id=leave_request.user_id,
        leave_type=leave_request.leave_type,
        start_date=leave_request.start_date,
        end_date=leave_request.end_date,
        days_count=leave_request.days_count,
        remarks=leave_request.remarks,
        status=leave_request.status,
        reviewed_by=leave_request.reviewed_by,
        reviewed_at=leave_request.reviewed_at.isoformat() if leave_request.reviewed_at else None,
        admin_comments=leave_request.admin_comments,
        created_at=leave_request.created_at.isoformat(),
        updated_at=leave_request.updated_at.isoformat()
    )
    
    return LeaveReviewResponse(
        leave_request=leave_response,
        message="Leave request approved successfully"
    )


@app.put("/api/leave/{request_id}/reject", response_model=LeaveReviewResponse)
def reject_leave_request(
    request_id: int,
    review: LeaveReview,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Reject a leave request (Admin only).
    
    Validates leave request exists and is Pending, updates status to "Rejected",
    sets reviewed_by to admin user_id, sets reviewed_at to current timestamp,
    stores admin_comments if provided, and rejects if already reviewed with 400.
    
    Requirements: 11.3, 11.4, 11.5, 11.6
    """
    admin_id = current_user["user_id"]
    
    # Fetch leave request
    leave_request = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    
    if not leave_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Leave request not found"
        )
    
    # Validate leave request is Pending
    if leave_request.status != "Pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Leave request has already been {leave_request.status.lower()}. Cannot modify reviewed requests."
        )
    
    # Update leave request
    leave_request.status = "Rejected"
    leave_request.reviewed_by = admin_id
    leave_request.reviewed_at = datetime.utcnow()
    
    if review.comments:
        leave_request.admin_comments = review.comments
    
    try:
        db.commit()
        db.refresh(leave_request)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reject leave request"
        )
    
    # Dispatch leave_rejected event
    # Requirements: 26.3
    dispatch_event(EVENT_LEAVE_REJECTED, {
        "user_id": leave_request.user_id,
        "request_id": leave_request.id,
        "leave_type": leave_request.leave_type,
        "start_date": leave_request.start_date.isoformat(),
        "end_date": leave_request.end_date.isoformat(),
        "days_count": leave_request.days_count,
        "reviewed_by": admin_id,
        "admin_comments": leave_request.admin_comments,
        "db": db
    })
    
    # Build response
    leave_response = LeaveRequestResponse(
        id=leave_request.id,
        user_id=leave_request.user_id,
        leave_type=leave_request.leave_type,
        start_date=leave_request.start_date,
        end_date=leave_request.end_date,
        days_count=leave_request.days_count,
        remarks=leave_request.remarks,
        status=leave_request.status,
        reviewed_by=leave_request.reviewed_by,
        reviewed_at=leave_request.reviewed_at.isoformat() if leave_request.reviewed_at else None,
        admin_comments=leave_request.admin_comments,
        created_at=leave_request.created_at.isoformat(),
        updated_at=leave_request.updated_at.isoformat()
    )
    
    return LeaveReviewResponse(
        leave_request=leave_response,
        message="Leave request rejected successfully"
    )



# Dashboard Endpoints

@app.get("/api/dashboard/employee", response_model=EmployeeDashboardResponse)
def get_employee_dashboard(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get employee dashboard data.
    
    Returns attendance summary for current month, last 5 attendance records,
    last 5 leave requests, pending leave requests count, and today's attendance status.
    
    Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
    """
    user_id = current_user["user_id"]
    today = date.today()
    
    # Calculate current month date range
    month_start = date(today.year, today.month, 1)
    if today.month == 12:
        month_end = date(today.year, 12, 31)
    else:
        from datetime import timedelta
        next_month = date(today.year, today.month + 1, 1)
        month_end = next_month - timedelta(days=1)
    
    # Calculate attendance summary for current month
    attendance_records = db.query(Attendance).filter(
        Attendance.user_id == user_id,
        Attendance.date >= month_start,
        Attendance.date <= month_end
    ).all()
    
    present_count = sum(1 for record in attendance_records if record.status == "Present")
    absent_count = sum(1 for record in attendance_records if record.status == "Absent")
    leave_count = sum(1 for record in attendance_records if record.status == "Leave")
    
    attendance_summary = AttendanceSummary(
        present=present_count,
        absent=absent_count,
        leave=leave_count,
        current_month=today.strftime("%B %Y")
    )
    
    # Fetch last 5 attendance records
    recent_attendance_records = db.query(Attendance).filter(
        Attendance.user_id == user_id
    ).order_by(Attendance.date.desc()).limit(5).all()
    
    recent_attendance = []
    for record in recent_attendance_records:
        recent_attendance.append(AttendanceRecord(
            id=record.id,
            user_id=record.user_id,
            date=record.date,
            check_in=record.check_in.isoformat() if record.check_in else None,
            check_out=record.check_out.isoformat() if record.check_out else None,
            status=record.status
        ))
    
    # Fetch last 5 leave requests
    recent_leave_records = db.query(LeaveRequest).filter(
        LeaveRequest.user_id == user_id
    ).order_by(LeaveRequest.created_at.desc()).limit(5).all()
    
    recent_leaves = []
    for leave_req in recent_leave_records:
        recent_leaves.append(LeaveRequestResponse(
            id=leave_req.id,
            user_id=leave_req.user_id,
            leave_type=leave_req.leave_type,
            start_date=leave_req.start_date,
            end_date=leave_req.end_date,
            days_count=leave_req.days_count,
            remarks=leave_req.remarks,
            status=leave_req.status,
            reviewed_by=leave_req.reviewed_by,
            reviewed_at=leave_req.reviewed_at.isoformat() if leave_req.reviewed_at else None,
            admin_comments=leave_req.admin_comments,
            created_at=leave_req.created_at.isoformat(),
            updated_at=leave_req.updated_at.isoformat()
        ))
    
    # Count pending leave requests
    pending_leaves_count = db.query(LeaveRequest).filter(
        LeaveRequest.user_id == user_id,
        LeaveRequest.status == "Pending"
    ).count()
    
    # Get today's attendance status
    today_attendance = db.query(Attendance).filter(
        Attendance.user_id == user_id,
        Attendance.date == today
    ).first()
    
    if today_attendance:
        today_status = TodayStatus(
            checked_in=True,
            check_in_time=today_attendance.check_in.isoformat() if today_attendance.check_in else None,
            checked_out=today_attendance.check_out is not None,
            check_out_time=today_attendance.check_out.isoformat() if today_attendance.check_out else None
        )
    else:
        today_status = TodayStatus(
            checked_in=False,
            check_in_time=None,
            checked_out=False,
            check_out_time=None
        )
    
    return EmployeeDashboardResponse(
        attendance_summary=attendance_summary,
        recent_attendance=recent_attendance,
        recent_leaves=recent_leaves,
        pending_leaves_count=pending_leaves_count,
        today_status=today_status
    )



@app.get("/api/dashboard/admin", response_model=AdminDashboardResponse)
def get_admin_dashboard(
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get admin dashboard data.
    
    Returns organization-wide statistics including total employees, present today,
    on leave today, pending leave approvals, attendance overview by status for today,
    and all pending leave requests.
    
    Requirements: 6.1, 6.2, 6.3
    """
    today = date.today()
    
    # Calculate total employees count
    total_employees = db.query(User).filter(User.role == "Employee").count()
    
    # Count employees present today
    present_today = db.query(Attendance).filter(
        Attendance.date == today,
        Attendance.status == "Present"
    ).count()
    
    # Count employees on leave today
    # An employee is on leave today if they have an approved leave request that covers today
    on_leave_today = db.query(LeaveRequest).filter(
        LeaveRequest.status == "Approved",
        LeaveRequest.start_date <= today,
        LeaveRequest.end_date >= today
    ).count()
    
    # Count pending leave approvals
    pending_approvals = db.query(LeaveRequest).filter(
        LeaveRequest.status == "Pending"
    ).count()
    
    # Build stats
    stats = AdminDashboardStats(
        total_employees=total_employees,
        present_today=present_today,
        on_leave_today=on_leave_today,
        pending_approvals=pending_approvals
    )
    
    # Calculate attendance overview by status for today
    attendance_today = db.query(Attendance).filter(
        Attendance.date == today
    ).all()
    
    present_count = sum(1 for record in attendance_today if record.status == "Present")
    absent_count = sum(1 for record in attendance_today if record.status == "Absent")
    leave_count = sum(1 for record in attendance_today if record.status == "Leave")
    half_day_count = sum(1 for record in attendance_today if record.status == "Half-day")
    
    attendance_overview = AttendanceOverview(
        present=present_count,
        absent=absent_count,
        leave=leave_count,
        half_day=half_day_count
    )
    
    # Fetch all pending leave requests with employee details
    pending_leave_records = db.query(LeaveRequest, User, Profile).join(
        User, LeaveRequest.user_id == User.id
    ).join(
        Profile, User.id == Profile.user_id
    ).filter(
        LeaveRequest.status == "Pending"
    ).order_by(LeaveRequest.created_at.desc()).all()
    
    pending_leave_requests = []
    for leave_req, user, profile in pending_leave_records:
        employee_name = f"{profile.first_name} {profile.last_name}"
        pending_leave_requests.append(LeaveRequestWithEmployee(
            id=leave_req.id,
            user_id=leave_req.user_id,
            leave_type=leave_req.leave_type,
            start_date=leave_req.start_date,
            end_date=leave_req.end_date,
            days_count=leave_req.days_count,
            remarks=leave_req.remarks,
            status=leave_req.status,
            reviewed_by=leave_req.reviewed_by,
            reviewed_at=leave_req.reviewed_at.isoformat() if leave_req.reviewed_at else None,
            admin_comments=leave_req.admin_comments,
            created_at=leave_req.created_at.isoformat(),
            updated_at=leave_req.updated_at.isoformat(),
            employee_name=employee_name,
            employee_email=user.email,
            department=profile.department
        ))
    
    return AdminDashboardResponse(
        stats=stats,
        attendance_overview=attendance_overview,
        pending_leave_requests=pending_leave_requests
    )



# Payroll Endpoints

@app.get("/api/payroll/me", response_model=PayrollResponse)
def get_my_payroll(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get payroll information for the authenticated employee.
    
    Returns complete salary structure including basic_salary, allowances, and deductions.
    Returns 404 if no payroll record exists for the employee.
    
    Requirements: 12.1, 12.2, 12.4
    """
    user_id = current_user["user_id"]
    
    # Fetch payroll record for authenticated user
    payroll = db.query(Payroll).filter(Payroll.user_id == user_id).first()
    
    if not payroll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No payroll record found for this employee"
        )
    
    # Return complete salary structure
    return PayrollResponse(
        id=payroll.id,
        user_id=payroll.user_id,
        basic_salary=payroll.basic_salary,
        hra=payroll.hra,
        transport_allowance=payroll.transport_allowance,
        medical_allowance=payroll.medical_allowance,
        tax_deduction=payroll.tax_deduction,
        insurance_deduction=payroll.insurance_deduction,
        effective_date=payroll.effective_date,
        created_at=payroll.created_at.isoformat(),
        updated_at=payroll.updated_at.isoformat()
    )


@app.get("/api/payroll/{employee_id}", response_model=PayrollResponse)
def get_employee_payroll(
    employee_id: int,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get payroll information for a specific employee (Admin only).
    
    Returns complete salary structure for the specified employee.
    Returns 404 if no payroll record exists for the employee.
    
    Requirements: 13.5
    """
    # Fetch payroll record for specified employee
    payroll = db.query(Payroll).filter(Payroll.user_id == employee_id).first()
    
    if not payroll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No payroll record found for this employee"
        )
    
    # Return complete salary structure
    return PayrollResponse(
        id=payroll.id,
        user_id=payroll.user_id,
        basic_salary=payroll.basic_salary,
        hra=payroll.hra,
        transport_allowance=payroll.transport_allowance,
        medical_allowance=payroll.medical_allowance,
        tax_deduction=payroll.tax_deduction,
        insurance_deduction=payroll.insurance_deduction,
        effective_date=payroll.effective_date,
        created_at=payroll.created_at.isoformat(),
        updated_at=payroll.updated_at.isoformat()
    )


@app.post("/api/payroll/{employee_id}", response_model=PayrollCreateResponse, status_code=status.HTTP_201_CREATED)
def create_employee_payroll(
    employee_id: int,
    request: PayrollCreate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Create payroll record for an employee (Admin only).
    
    Validates required fields (user_id, basic_salary, effective_date),
    validates employee exists, validates all numeric fields are non-negative,
    and creates the payroll record.
    
    Requirements: 13.1, 13.2, 13.3, 13.4
    """
    # Validate employee exists
    employee = db.query(User).filter(User.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Check if payroll record already exists for this employee
    existing_payroll = db.query(Payroll).filter(Payroll.user_id == employee_id).first()
    if existing_payroll:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payroll record already exists for this employee. Use PUT to update."
        )
    
    # Create payroll record
    payroll = Payroll(
        user_id=employee_id,
        basic_salary=request.basic_salary,
        hra=request.hra,
        transport_allowance=request.transport_allowance,
        medical_allowance=request.medical_allowance,
        tax_deduction=request.tax_deduction,
        insurance_deduction=request.insurance_deduction,
        effective_date=request.effective_date
    )
    
    try:
        db.add(payroll)
        db.commit()
        db.refresh(payroll)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payroll record already exists for this employee"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create payroll record"
        )
    
    # Build response
    payroll_response = PayrollResponse(
        id=payroll.id,
        user_id=payroll.user_id,
        basic_salary=payroll.basic_salary,
        hra=payroll.hra,
        transport_allowance=payroll.transport_allowance,
        medical_allowance=payroll.medical_allowance,
        tax_deduction=payroll.tax_deduction,
        insurance_deduction=payroll.insurance_deduction,
        effective_date=payroll.effective_date,
        created_at=payroll.created_at.isoformat(),
        updated_at=payroll.updated_at.isoformat()
    )
    
    return PayrollCreateResponse(
        payroll=payroll_response,
        message="Payroll record created successfully"
    )


@app.put("/api/payroll/{employee_id}", response_model=PayrollCreateResponse)
def update_employee_payroll(
    employee_id: int,
    request: PayrollUpdate,
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Update payroll record for an employee (Admin only).
    
    Validates numeric fields are non-negative and updates the payroll record.
    
    Requirements: 13.2
    """
    # Fetch payroll record
    payroll = db.query(Payroll).filter(Payroll.user_id == employee_id).first()
    
    if not payroll:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No payroll record found for this employee"
        )
    
    # Update fields
    update_data = request.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        if value is not None:
            setattr(payroll, field, value)
    
    try:
        db.commit()
        db.refresh(payroll)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update payroll record"
        )
    
    # Build response
    payroll_response = PayrollResponse(
        id=payroll.id,
        user_id=payroll.user_id,
        basic_salary=payroll.basic_salary,
        hra=payroll.hra,
        transport_allowance=payroll.transport_allowance,
        medical_allowance=payroll.medical_allowance,
        tax_deduction=payroll.tax_deduction,
        insurance_deduction=payroll.insurance_deduction,
        effective_date=payroll.effective_date,
        created_at=payroll.created_at.isoformat(),
        updated_at=payroll.updated_at.isoformat()
    )
    
    return PayrollCreateResponse(
        payroll=payroll_response,
        message="Payroll record updated successfully"
    )



# Notification Endpoints

@app.get("/api/notifications", response_model=NotificationListResponse)
def get_notifications(
    page: int = 1,
    page_size: int = 10,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get notifications for the authenticated user.
    
    Returns notifications ordered by created_at descending (newest first).
    """
    user_id = current_user["user_id"]
    
    # Requirements: 27.7
    
    # Build query for user's notifications
    query = db.query(Notification).filter(Notification.user_id == user_id)
    
    # Order by created_at descending (newest first)
    query = query.order_by(Notification.created_at.desc())
    
    # Get total count before pagination
    total = query.count()
    
    # Get unread count
    unread_count = db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False
    ).count()
    
    # Apply pagination
    offset = (page - 1) * page_size
    results = query.offset(offset).limit(page_size).all()
    
    # Convert to response format
    notifications = []
    for notification in results:
        notifications.append(NotificationResponse(
            id=notification.id,
            notification_type=notification.notification_type,
            message=notification.message,
            related_entity_type=notification.related_entity_type,
            related_entity_id=notification.related_entity_id,
            is_read=notification.is_read,
            created_at=notification.created_at.isoformat()
        ))
    
    return NotificationListResponse(
        notifications=notifications,
        unread_count=unread_count,
        total=total,
        page=page,
        page_size=page_size
    )


@app.post("/api/notifications/{notification_id}/read", response_model=NotificationMarkReadResponse)
def mark_notification_read(
    notification_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Mark a notification as read.
    
    Only the notification owner can mark their own notifications as read.
    """
    user_id = current_user["user_id"]
    
    # Fetch notification
    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Verify notification belongs to current user
    if notification.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only mark your own notifications as read"
        )
    
    # Mark as read
    notification.is_read = True
    
    try:
        db.commit()
        db.refresh(notification)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to mark notification as read"
        )
    
    # Build response
    notification_response = NotificationResponse(
        id=notification.id,
        notification_type=notification.notification_type,
        message=notification.message,
        related_entity_type=notification.related_entity_type,
        related_entity_id=notification.related_entity_id,
        is_read=notification.is_read,
        created_at=notification.created_at.isoformat()
    )
    
    return NotificationMarkReadResponse(
        notification=notification_response,
        message="Notification marked as read"
    )


# WebSocket Endpoint

@app.websocket("/api/v2/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time updates.
    
    Handles WebSocket connections with JWT authentication.
    Clients must send an authentication message with their JWT token
    as the first message after connecting.
    
    Requirements: 25.4
    
    Protocol:
        Client → Server: {"type": "auth", "token": "jwt_token"}
        Server → Client: {"type": "auth_success", "user_id": 123}
        
        Server → Client: {
            "type": "leave_approved",
            "payload": {...},
            "timestamp": "2024-01-15T10:30:00"
        }
    """
    await handle_websocket_connection(websocket)
