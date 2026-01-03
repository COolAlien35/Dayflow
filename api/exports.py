"""Export generator for attendance, leave, and payroll data."""
import csv
import io
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import date
from typing import Optional

from api.models import Attendance, LeaveRequest, Payroll, Profile, User


def export_attendance_csv(
    db: Session,
    start_date: date,
    end_date: date,
    department: Optional[str] = None
) -> bytes:
    """
    Generate CSV file with attendance records.
    
    Requirements: 21.1, 21.4, 21.5, 21.6
    
    Args:
        db: Database session
        start_date: Start date for filtering
        end_date: End date for filtering
        department: Optional department filter
    
    Returns:
        CSV file content as bytes
    """
    # Build query joining attendance with user and profile
    query = db.query(Attendance, User, Profile).join(
        User, Attendance.user_id == User.id
    ).join(
        Profile, User.id == Profile.user_id
    ).filter(
        and_(
            Attendance.date >= start_date,
            Attendance.date <= end_date,
            Attendance.deleted_at.is_(None)
        )
    )
    
    # Apply department filter if provided
    if department:
        query = query.filter(Profile.department == department)
    
    # Order by date descending
    query = query.order_by(Attendance.date.desc())
    
    # Fetch all matching records
    records = query.all()
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write column headers
    writer.writerow([
        'Date',
        'Employee ID',
        'Employee Name',
        'Email',
        'Department',
        'Check In',
        'Check Out',
        'Status'
    ])
    
    # Write data rows
    for attendance, user, profile in records:
        employee_name = f"{profile.first_name} {profile.last_name}"
        check_in = attendance.check_in.strftime('%Y-%m-%d %H:%M:%S') if attendance.check_in else ''
        check_out = attendance.check_out.strftime('%Y-%m-%d %H:%M:%S') if attendance.check_out else ''
        
        writer.writerow([
            attendance.date.isoformat(),
            profile.employee_id or '',
            employee_name,
            user.email,
            profile.department or '',
            check_in,
            check_out,
            attendance.status
        ])
    
    # Get CSV content as bytes
    csv_content = output.getvalue()
    output.close()
    
    return csv_content.encode('utf-8')


def export_leave_csv(
    db: Session,
    start_date: date,
    end_date: date,
    department: Optional[str] = None
) -> bytes:
    """
    Generate CSV file with leave requests.
    
    Requirements: 21.2, 21.4, 21.5, 21.6
    
    Args:
        db: Database session
        start_date: Start date for filtering
        end_date: End date for filtering
        department: Optional department filter
    
    Returns:
        CSV file content as bytes
    """
    # Build query joining leave requests with user and profile
    query = db.query(LeaveRequest, User, Profile).join(
        User, LeaveRequest.user_id == User.id
    ).join(
        Profile, User.id == Profile.user_id
    ).filter(
        and_(
            LeaveRequest.start_date >= start_date,
            LeaveRequest.end_date <= end_date,
            LeaveRequest.deleted_at.is_(None)
        )
    )
    
    # Apply department filter if provided
    if department:
        query = query.filter(Profile.department == department)
    
    # Order by created_at descending
    query = query.order_by(LeaveRequest.created_at.desc())
    
    # Fetch all matching records
    records = query.all()
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write column headers
    writer.writerow([
        'Request ID',
        'Employee ID',
        'Employee Name',
        'Email',
        'Department',
        'Leave Type',
        'Start Date',
        'End Date',
        'Days Count',
        'Status',
        'Remarks',
        'Admin Comments',
        'Reviewed At',
        'Created At'
    ])
    
    # Write data rows
    for leave_req, user, profile in records:
        employee_name = f"{profile.first_name} {profile.last_name}"
        reviewed_at = leave_req.reviewed_at.strftime('%Y-%m-%d %H:%M:%S') if leave_req.reviewed_at else ''
        created_at = leave_req.created_at.strftime('%Y-%m-%d %H:%M:%S')
        
        writer.writerow([
            leave_req.id,
            profile.employee_id or '',
            employee_name,
            user.email,
            profile.department or '',
            leave_req.leave_type,
            leave_req.start_date.isoformat(),
            leave_req.end_date.isoformat(),
            leave_req.days_count,
            leave_req.status,
            leave_req.remarks or '',
            leave_req.admin_comments or '',
            reviewed_at,
            created_at
        ])
    
    # Get CSV content as bytes
    csv_content = output.getvalue()
    output.close()
    
    return csv_content.encode('utf-8')


def export_payroll_csv(
    db: Session,
    department: Optional[str] = None
) -> bytes:
    """
    Generate CSV file with current payroll data.
    
    Requirements: 21.3, 21.4, 21.6
    
    Args:
        db: Database session
        department: Optional department filter
    
    Returns:
        CSV file content as bytes
    """
    # Build query joining payroll with user and profile
    query = db.query(Payroll, User, Profile).join(
        User, Payroll.user_id == User.id
    ).join(
        Profile, User.id == Profile.user_id
    ).filter(
        Payroll.deleted_at.is_(None)
    )
    
    # Apply department filter if provided
    if department:
        query = query.filter(Profile.department == department)
    
    # Order by employee name
    query = query.order_by(Profile.first_name, Profile.last_name)
    
    # Fetch all matching records
    records = query.all()
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write column headers
    writer.writerow([
        'Employee ID',
        'Employee Name',
        'Email',
        'Department',
        'Position',
        'Basic Salary',
        'HRA',
        'Transport Allowance',
        'Medical Allowance',
        'Tax Deduction',
        'Insurance Deduction',
        'Total Allowances',
        'Total Deductions',
        'Net Salary',
        'Effective Date'
    ])
    
    # Write data rows
    for payroll, user, profile in records:
        employee_name = f"{profile.first_name} {profile.last_name}"
        
        # Calculate totals
        total_allowances = float(
            payroll.hra +
            payroll.transport_allowance +
            payroll.medical_allowance
        )
        
        total_deductions = float(
            payroll.tax_deduction +
            payroll.insurance_deduction
        )
        
        net_salary = float(payroll.basic_salary) + total_allowances - total_deductions
        
        writer.writerow([
            profile.employee_id or '',
            employee_name,
            user.email,
            profile.department or '',
            profile.position or '',
            float(payroll.basic_salary),
            float(payroll.hra),
            float(payroll.transport_allowance),
            float(payroll.medical_allowance),
            float(payroll.tax_deduction),
            float(payroll.insurance_deduction),
            total_allowances,
            total_deductions,
            net_salary,
            payroll.effective_date.isoformat()
        ])
    
    # Get CSV content as bytes
    csv_content = output.getvalue()
    output.close()
    
    return csv_content.encode('utf-8')
