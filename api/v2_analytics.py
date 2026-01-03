"""API v2 Analytics endpoints for advanced features."""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import Optional, Literal

from api.database import get_db
from api.auth import require_role
from api.analytics import (
    get_attendance_trends,
    get_leave_statistics,
    get_salary_distribution
)
from api.schemas import (
    AttendanceTrendsResponse,
    LeaveStatisticsResponse,
    SalaryDistributionResponse
)


router = APIRouter(prefix="/api/v2/analytics", tags=["Analytics v2"])


@router.get("/attendance", response_model=AttendanceTrendsResponse)
def get_attendance_analytics(
    start_date: date = Query(..., description="Start date for analysis"),
    end_date: date = Query(..., description="End date for analysis"),
    employee_id: Optional[int] = Query(None, description="Filter by specific employee"),
    group_by: Literal["day", "week", "month"] = Query("month", description="Period grouping"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get attendance trends and statistics.
    
    Admin-only endpoint that returns aggregated attendance data by period.
    Supports filtering by date range, employee, and grouping by day/week/month.
    
    Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 34.5
    """
    # Validate date range
    if start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be after end date"
        )
    
    # Validate date range is not excessive (max 1 year)
    date_diff = (end_date - start_date).days
    if date_diff > 365:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Date range cannot exceed 1 year (365 days)"
        )
    
    # Get attendance trends
    result = get_attendance_trends(
        db=db,
        start_date=start_date,
        end_date=end_date,
        employee_id=employee_id,
        group_by=group_by
    )
    
    return AttendanceTrendsResponse(**result)


@router.get("/leave", response_model=LeaveStatisticsResponse)
def get_leave_analytics(
    start_date: date = Query(..., description="Start date for analysis"),
    end_date: date = Query(..., description="End date for analysis"),
    department: Optional[str] = Query(None, description="Filter by department"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get leave usage statistics.
    
    Admin-only endpoint that returns leave statistics by type and status.
    Supports filtering by date range and department.
    
    Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 34.5
    """
    # Validate date range
    if start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be after end date"
        )
    
    # Validate date range is not excessive (max 1 year)
    date_diff = (end_date - start_date).days
    if date_diff > 365:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Date range cannot exceed 1 year (365 days)"
        )
    
    # Get leave statistics
    result = get_leave_statistics(
        db=db,
        start_date=start_date,
        end_date=end_date,
        department=department
    )
    
    return LeaveStatisticsResponse(**result)


@router.get("/salary", response_model=SalaryDistributionResponse)
def get_salary_analytics(
    department: Optional[str] = Query(None, description="Filter by department"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Get salary distribution and statistics.
    
    Admin-only endpoint that returns salary statistics and distribution.
    Supports filtering by department.
    
    Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6
    """
    # Get salary distribution
    result = get_salary_distribution(
        db=db,
        department=department
    )
    
    return SalaryDistributionResponse(**result)
