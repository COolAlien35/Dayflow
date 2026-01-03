/**
 * API Client for Dayflow HRMS
 * Connects frontend to FastAPI backend running on localhost:8000
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Token storage helpers
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('dayflow_token');
}

export function setToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('dayflow_token', token);
    }
}

export function clearToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('dayflow_token');
    }
}

// Generic fetch wrapper with auth
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
            errorData.message || errorData.detail || `API Error: ${response.status}`,
            response.status,
            errorData
        );
    }

    return response.json();
}

// Custom error class for API errors
export class APIError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

// ============ AUTH ENDPOINTS ============

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user_id: number;
    role: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    role: 'Admin' | 'Employee';
}

export interface SignupResponse {
    user_id: number;
    email: string;
    role: string;
    message: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });

    // Store the token
    setToken(response.access_token);

    return response;
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await apiFetch<SignupResponse>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    });

    // Note: Signup doesn't return a token - user must login after signup
    return response;
}

export function logout(): void {
    clearToken();
}

// ============ ATTENDANCE ENDPOINTS ============

export interface AttendanceRecord {
    id: number;
    user_id: number;
    date: string;
    check_in: string | null;
    check_out: string | null;
    status: 'Present' | 'Half-day' | 'Absent' | 'On Leave';
    created_at: string;
}

export interface CheckInResponse {
    attendance_id: number;
    check_in_time: string;
    date: string;
    message: string;
}

export interface CheckOutResponse {
    attendance_id: number;
    check_out_time: string;
    status: string;
    message: string;
}

export async function checkIn(): Promise<CheckInResponse> {
    return apiFetch<CheckInResponse>('/api/attendance/check-in', {
        method: 'POST',
    });
}

export async function checkOut(): Promise<CheckOutResponse> {
    return apiFetch<CheckOutResponse>('/api/attendance/check-out', {
        method: 'POST',
    });
}

export interface AttendanceHistoryParams {
    start_date?: string;
    end_date?: string;
    user_id?: number;
}

export interface AttendanceHistoryResponse {
    records: AttendanceRecord[];
}

export async function getAttendanceHistory(
    params?: AttendanceHistoryParams
): Promise<AttendanceHistoryResponse> {
    const searchParams = new URLSearchParams();
    if (params?.start_date) searchParams.append('start_date', params.start_date);
    if (params?.end_date) searchParams.append('end_date', params.end_date);
    if (params?.user_id) searchParams.append('user_id', String(params.user_id));

    const query = searchParams.toString();
    return apiFetch<AttendanceHistoryResponse>(
        `/api/attendance/history${query ? `?${query}` : ''}`
    );
}

// ============ LEAVE ENDPOINTS ============

export interface LeaveRequest {
    id: number;
    user_id: number;
    leave_type: 'Sick' | 'Casual' | 'Vacation' | 'Unpaid';
    start_date: string;
    end_date: string;
    remarks: string | null;
    status: 'Pending' | 'Approved' | 'Rejected';
    days_count: number;
    reviewed_by: number | null;
    reviewed_at: string | null;
    admin_comments: string | null;
    created_at: string;
}

export interface CreateLeaveRequest {
    leave_type: 'Sick' | 'Casual' | 'Vacation' | 'Unpaid';
    start_date: string;
    end_date: string;
    remarks?: string;
}

export interface LeaveRequestResponse {
    message: string;
    leave_request: LeaveRequest;
}

export async function createLeaveRequest(
    data: CreateLeaveRequest
): Promise<LeaveRequestResponse> {
    return apiFetch<LeaveRequestResponse>('/api/leave/request', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export interface LeaveListResponse {
    leave_requests: LeaveRequest[];
    total: number;
    page: number;
    page_size: number;
}

export async function getMyLeaveRequests(
    page = 1,
    pageSize = 10
): Promise<LeaveListResponse> {
    return apiFetch<LeaveListResponse>(
        `/api/leave/my-requests?page=${page}&page_size=${pageSize}`
    );
}

export async function getAllLeaveRequests(
    page = 1,
    pageSize = 10,
    status?: string
): Promise<LeaveListResponse> {
    const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
    });
    if (status) params.append('status_filter', status);

    return apiFetch<LeaveListResponse>(`/api/leave/all-requests?${params.toString()}`);
}

export interface LeaveReview {
    comments?: string;
}

export async function approveLeaveRequest(
    requestId: number,
    review?: LeaveReview
): Promise<LeaveRequestResponse> {
    return apiFetch<LeaveRequestResponse>(`/api/leave/${requestId}/approve`, {
        method: 'PUT',
        body: JSON.stringify(review || {}),
    });
}

export async function rejectLeaveRequest(
    requestId: number,
    review?: LeaveReview
): Promise<LeaveRequestResponse> {
    return apiFetch<LeaveRequestResponse>(`/api/leave/${requestId}/reject`, {
        method: 'PUT',
        body: JSON.stringify(review || {}),
    });
}

// ============ PROFILE ENDPOINTS ============

export interface UserProfile {
    user: {
        id: number;
        email: string;
        role: string;
    };
    profile: {
        id: number;
        employee_id: string | null;
        first_name: string;
        last_name: string;
        department: string | null;
        position: string | null;
        phone: string | null;
        address: string | null;
        date_of_joining: string | null;
        emergency_contact: string | null;
    } | null;
}

export async function getMyProfile(): Promise<UserProfile> {
    return apiFetch<UserProfile>('/api/profile/me');
}

export interface ProfileUpdateData {
    phone?: string;
    address?: string;
    emergency_contact?: string;
}

export async function updateMyProfile(
    data: ProfileUpdateData
): Promise<UserProfile> {
    return apiFetch<UserProfile>('/api/profile/me', {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// ============ DASHBOARD ENDPOINTS ============

export interface EmployeeDashboard {
    attendance_summary: {
        present_days: number;
        absent_days: number;
        half_days: number;
        on_leave_days: number;
        total_working_days: number;
    };
    recent_attendance: AttendanceRecord[];
    recent_leave_requests: LeaveRequest[];
    pending_leave_count: number;
    today_status: AttendanceRecord | null;
}

export async function getEmployeeDashboard(): Promise<EmployeeDashboard> {
    return apiFetch<EmployeeDashboard>('/api/dashboard/employee');
}

export interface AdminDashboard {
    total_employees: number;
    present_today: number;
    on_leave_today: number;
    pending_approvals: number;
    attendance_overview: {
        present: number;
        absent: number;
        on_leave: number;
        half_day: number;
    };
    pending_leave_requests: LeaveRequest[];
}

export async function getAdminDashboard(): Promise<AdminDashboard> {
    return apiFetch<AdminDashboard>('/api/dashboard/admin');
}

// ============ EMPLOYEE ENDPOINTS (Admin) ============

export interface Employee {
    id: number;
    user_id: number;
    name: string;
    email: string;
    employee_id: string;
    department: string;
    position: string;
    status: string;
    joining_date: string;
}

export interface EmployeeListResponse {
    employees: Employee[];
    total: number;
    page: number;
    page_size: number;
}

export async function getEmployees(
    page = 1,
    pageSize = 10,
    department?: string
): Promise<EmployeeListResponse> {
    const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
    });
    if (department) params.append('department', department);

    return apiFetch<EmployeeListResponse>(`/api/employees?${params.toString()}`);
}

export async function getEmployee(employeeId: number): Promise<Employee> {
    return apiFetch<Employee>(`/api/employees/${employeeId}`);
}

// ============ PAYROLL ENDPOINTS ============

export interface PayrollRecord {
    id: number;
    user_id: number;
    basic_salary: number;
    allowances: number;
    deductions: number;
    net_salary: number;
    effective_date: string;
}

export async function getMyPayroll(): Promise<PayrollRecord> {
    return apiFetch<PayrollRecord>('/api/payroll/me');
}

export async function getEmployeePayroll(
    employeeId: number
): Promise<PayrollRecord> {
    return apiFetch<PayrollRecord>(`/api/payroll/${employeeId}`);
}

// ============ NOTIFICATION ENDPOINTS ============

export interface Notification {
    id: number;
    notification_type: string;
    message: string;
    related_entity_type: string | null;
    related_entity_id: number | null;
    is_read: boolean;
    created_at: string;
}

export interface NotificationListResponse {
    notifications: Notification[];
    unread_count: number;
    total: number;
    page: number;
    page_size: number;
}

export async function getNotifications(
    page = 1,
    pageSize = 10
): Promise<NotificationListResponse> {
    return apiFetch<NotificationListResponse>(
        `/api/notifications?page=${page}&page_size=${pageSize}`
    );
}

export async function markNotificationRead(id: number): Promise<void> {
    return apiFetch<void>(`/api/notifications/${id}/read`, {
        method: 'POST',
    });
}
