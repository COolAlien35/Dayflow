"""Analytics engine for attendance, leave, and salary statistics."""
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, extract
from datetime import date, datetime, timedelta
from typing import Optional, Literal, Dict, List
from decimal import Decimal
from collections import defaultdict

from api.models import Attendance, LeaveRequest, Payroll, Profile


# Attendance Analytics Functions

def get_attendance_trends(
    db: Session,
    start_date: date,
    end_date: date,
    employee_id: Optional[int] = None,
    group_by: Literal["day", "week", "month"] = "month"
) -> Dict:
    """
    Calculate attendance statistics for date range.
    Returns aggregated counts by status and period.
    
    Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7
    
    Args:
        db: Database session
        start_date: Start date for analysis
        end_date: End date for analysis
        employee_id: Optional employee ID to filter by specific employee
        group_by: Period grouping - "day", "week", or "month"
    
    Returns:
        Dictionary with periods list and total_stats
    """
    # Build base query
    query = db.query(Attendance).filter(
        and_(
            Attendance.date >= start_date,
            Attendance.date <= end_date,
            Attendance.deleted_at.is_(None)
        )
    )
    
    # Apply employee filter if provided
    if employee_id is not None:
        query = query.filter(Attendance.user_id == employee_id)
    
    # Fetch all matching records
    records = query.all()
    
    # Group records by period
    periods_data = defaultdict(lambda: {
        "present": 0,
        "absent": 0,
        "leave": 0,
        "half_day": 0,
        "total": 0
    })
    
    for record in records:
        # Determine period key based on group_by
        if group_by == "day":
            period_key = record.date.isoformat()
        elif group_by == "week":
            # ISO week format: YYYY-Www
            year, week, _ = record.date.isocalendar()
            period_key = f"{year}-W{week:02d}"
        else:  # month
            period_key = record.date.strftime("%Y-%m")
        
        # Increment counts
        status_lower = record.status.lower().replace("-", "_")
        if status_lower in periods_data[period_key]:
            periods_data[period_key][status_lower] += 1
        periods_data[period_key]["total"] += 1
    
    # Build periods list with attendance percentage
    periods = []
    for period_key in sorted(periods_data.keys()):
        data = periods_data[period_key]
        total = data["total"]
        
        # Calculate attendance percentage (present / total * 100)
        attendance_percentage = (data["present"] / total * 100) if total > 0 else 0.0
        
        periods.append({
            "period": period_key,
            "present": data["present"],
            "absent": data["absent"],
            "leave": data["leave"],
            "half_day": data["half_day"],
            "attendance_percentage": round(attendance_percentage, 2)
        })
    
    # Calculate total stats across all periods
    total_present = sum(p["present"] for p in periods)
    total_absent = sum(p["absent"] for p in periods)
    total_leave = sum(p["leave"] for p in periods)
    total_half_day = sum(p["half_day"] for p in periods)
    grand_total = total_present + total_absent + total_leave + total_half_day
    
    # Calculate overall attendance percentage
    overall_attendance_percentage = (total_present / grand_total * 100) if grand_total > 0 else 0.0
    
    # Calculate status distribution (percentage of each status)
    status_distribution = {}
    if grand_total > 0:
        status_distribution = {
            "present": round(total_present / grand_total * 100, 2),
            "absent": round(total_absent / grand_total * 100, 2),
            "leave": round(total_leave / grand_total * 100, 2),
            "half_day": round(total_half_day / grand_total * 100, 2)
        }
    else:
        status_distribution = {
            "present": 0.0,
            "absent": 0.0,
            "leave": 0.0,
            "half_day": 0.0
        }
    
    total_stats = {
        "total_records": grand_total,
        "present": total_present,
        "absent": total_absent,
        "leave": total_leave,
        "half_day": total_half_day,
        "attendance_percentage": round(overall_attendance_percentage, 2),
        "status_distribution": status_distribution
    }
    
    return {
        "periods": periods,
        "total_stats": total_stats
    }



# Leave Analytics Functions

def get_leave_statistics(
    db: Session,
    start_date: date,
    end_date: date,
    department: Optional[str] = None
) -> Dict:
    """
    Calculate leave usage statistics.
    Returns counts by type, status, and approval rate.
    
    Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7
    
    Args:
        db: Database session
        start_date: Start date for analysis
        end_date: End date for analysis
        department: Optional department filter
    
    Returns:
        Dictionary with by_type, by_status, approval_rate, and average_days_per_employee
    """
    # Build base query
    query = db.query(LeaveRequest).filter(
        and_(
            LeaveRequest.start_date >= start_date,
            LeaveRequest.end_date <= end_date,
            LeaveRequest.deleted_at.is_(None)
        )
    )
    
    # Apply department filter if provided
    if department:
        query = query.join(Profile, LeaveRequest.user_id == Profile.user_id).filter(
            Profile.department == department
        )
    
    # Fetch all matching records
    records = query.all()
    
    # Aggregate by leave type
    by_type = defaultdict(int)
    for record in records:
        by_type[record.leave_type] += 1
    
    # Aggregate by status
    by_status = defaultdict(int)
    for record in records:
        by_status[record.status] += 1
    
    # Calculate approval rate
    total_requests = len(records)
    approved_count = by_status.get("Approved", 0)
    approval_rate = (approved_count / total_requests * 100) if total_requests > 0 else 0.0
    
    # Calculate average days per employee
    employee_days = defaultdict(int)
    for record in records:
        employee_days[record.user_id] += record.days_count
    
    total_days = sum(employee_days.values())
    unique_employees = len(employee_days)
    average_days_per_employee = (total_days / unique_employees) if unique_employees > 0 else 0.0
    
    return {
        "by_type": dict(by_type),
        "by_status": dict(by_status),
        "approval_rate": round(approval_rate, 2),
        "average_days_per_employee": round(average_days_per_employee, 2),
        "total_requests": total_requests,
        "total_days": total_days
    }



# Salary Analytics Functions

def get_salary_distribution(
    db: Session,
    department: Optional[str] = None
) -> Dict:
    """
    Calculate salary statistics and distribution.
    Returns min, max, average, median, and range counts.
    
    Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6
    
    Args:
        db: Database session
        department: Optional department filter
    
    Returns:
        Dictionary with total, average, median, min, max, and distribution
    """
    # Build base query joining payroll with profiles
    query = db.query(Payroll, Profile).join(
        Profile, Payroll.user_id == Profile.user_id
    ).filter(
        Payroll.deleted_at.is_(None)
    )
    
    # Apply department filter if provided
    if department:
        query = query.filter(Profile.department == department)
    
    # Fetch all matching records
    records = query.all()
    
    if not records:
        return {
            "total": 0,
            "average": 0,
            "median": 0,
            "min": 0,
            "max": 0,
            "distribution": [],
            "by_department": {}
        }
    
    # Calculate total compensation for each employee
    compensations = []
    department_totals = defaultdict(Decimal)
    department_counts = defaultdict(int)
    
    for payroll, profile in records:
        # Total compensation = basic + allowances - deductions
        total_comp = (
            payroll.basic_salary +
            payroll.hra +
            payroll.transport_allowance +
            payroll.medical_allowance -
            payroll.tax_deduction -
            payroll.insurance_deduction
        )
        compensations.append(float(total_comp))
        
        # Track by department
        dept = profile.department or "Unassigned"
        department_totals[dept] += total_comp
        department_counts[dept] += 1
    
    # Calculate statistics
    total = sum(compensations)
    average = total / len(compensations) if compensations else 0
    min_salary = min(compensations) if compensations else 0
    max_salary = max(compensations) if compensations else 0
    
    # Calculate median
    sorted_comps = sorted(compensations)
    n = len(sorted_comps)
    if n % 2 == 0:
        median = (sorted_comps[n//2 - 1] + sorted_comps[n//2]) / 2
    else:
        median = sorted_comps[n//2]
    
    # Calculate distribution by salary ranges
    ranges = [
        (0, 50000, "0-50000"),
        (50000, 100000, "50000-100000"),
        (100000, 150000, "100000-150000"),
        (150000, 200000, "150000-200000"),
        (200000, float('inf'), "200000+")
    ]
    
    distribution = []
    for min_range, max_range, label in ranges:
        count = sum(1 for comp in compensations if min_range <= comp < max_range)
        if count > 0:  # Only include ranges with employees
            distribution.append({
                "range": label,
                "count": count
            })
    
    # Calculate by department statistics
    by_department = {}
    for dept, dept_total in department_totals.items():
        dept_count = department_counts[dept]
        by_department[dept] = {
            "total": float(dept_total),
            "average": float(dept_total / dept_count),
            "count": dept_count
        }
    
    return {
        "total": round(total, 2),
        "average": round(average, 2),
        "median": round(median, 2),
        "min": round(min_salary, 2),
        "max": round(max_salary, 2),
        "distribution": distribution,
        "by_department": by_department
    }
