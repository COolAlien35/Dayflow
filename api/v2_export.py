"""API v2 Export endpoints for advanced features."""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import Response
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional

from api.database import get_db
from api.auth import require_role
from api.exports import (
    export_attendance_csv,
    export_leave_csv,
    export_payroll_csv
)


router = APIRouter(prefix="/api/v2/export", tags=["Export v2"])


# Maximum number of days for export to prevent timeout
MAX_EXPORT_DAYS = 365


@router.get("/attendance")
def export_attendance(
    start_date: date = Query(..., description="Start date for export"),
    end_date: date = Query(..., description="End date for export"),
    department: Optional[str] = Query(None, description="Filter by department"),
    format: str = Query("csv", description="Export format (csv only for now)"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Export attendance data to CSV.
    
    Admin-only endpoint that generates CSV file with attendance records.
    Supports filtering by date range and department.
    
    Requirements: 21.1, 21.4, 21.5, 21.6, 21.8, 21.9, 35.2
    """
    # Validate date range
    if start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be after end date"
        )
    
    # Validate date range is not excessive (max 1 year)
    date_diff = (end_date - start_date).days
    if date_diff > MAX_EXPORT_DAYS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Date range cannot exceed {MAX_EXPORT_DAYS} days (1 year). Please reduce the date range.",
            headers={"X-Error-Code": "EXPORT_TOO_LARGE"}
        )
    
    # Validate format
    if format.lower() != "csv":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV format is currently supported"
        )
    
    try:
        # Generate CSV export
        csv_content = export_attendance_csv(
            db=db,
            start_date=start_date,
            end_date=end_date,
            department=department
        )
        
        # Return file download response
        filename = f"attendance_export_{start_date}_{end_date}.csv"
        
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "X-API-Version": "v2"
            }
        )
    
    except Exception as e:
        # Log error and return generic error message
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate export. The dataset may be too large or a system error occurred.",
            headers={"X-Error-Code": "EXPORT_FAILED"}
        )


@router.get("/leave")
def export_leave(
    start_date: date = Query(..., description="Start date for export"),
    end_date: date = Query(..., description="End date for export"),
    department: Optional[str] = Query(None, description="Filter by department"),
    format: str = Query("csv", description="Export format (csv only for now)"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Export leave data to CSV.
    
    Admin-only endpoint that generates CSV file with leave requests.
    Supports filtering by date range and department.
    
    Requirements: 21.2, 21.4, 21.5, 21.6, 21.8, 21.9, 35.2
    """
    # Validate date range
    if start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be after end date"
        )
    
    # Validate date range is not excessive (max 1 year)
    date_diff = (end_date - start_date).days
    if date_diff > MAX_EXPORT_DAYS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Date range cannot exceed {MAX_EXPORT_DAYS} days (1 year). Please reduce the date range.",
            headers={"X-Error-Code": "EXPORT_TOO_LARGE"}
        )
    
    # Validate format
    if format.lower() != "csv":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV format is currently supported"
        )
    
    try:
        # Generate CSV export
        csv_content = export_leave_csv(
            db=db,
            start_date=start_date,
            end_date=end_date,
            department=department
        )
        
        # Return file download response
        filename = f"leave_export_{start_date}_{end_date}.csv"
        
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "X-API-Version": "v2"
            }
        )
    
    except Exception as e:
        # Log error and return generic error message
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate export. The dataset may be too large or a system error occurred.",
            headers={"X-Error-Code": "EXPORT_FAILED"}
        )


@router.get("/payroll")
def export_payroll(
    department: Optional[str] = Query(None, description="Filter by department"),
    format: str = Query("csv", description="Export format (csv only for now)"),
    current_user: dict = Depends(require_role(["Admin"])),
    db: Session = Depends(get_db)
):
    """
    Export payroll data to CSV.
    
    Admin-only endpoint that generates CSV file with current payroll information.
    Supports filtering by department.
    
    Requirements: 21.3, 21.4, 21.6, 21.8, 21.9
    """
    # Validate format
    if format.lower() != "csv":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV format is currently supported"
        )
    
    try:
        # Generate CSV export
        csv_content = export_payroll_csv(
            db=db,
            department=department
        )
        
        # Return file download response
        filename = f"payroll_export_{date.today().isoformat()}.csv"
        
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "X-API-Version": "v2"
            }
        )
    
    except Exception as e:
        # Log error and return generic error message
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate export. The dataset may be too large or a system error occurred.",
            headers={"X-Error-Code": "EXPORT_FAILED"}
        )
