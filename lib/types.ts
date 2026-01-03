import type { IconName } from "./icons"

export type UserRole = "employee" | "admin"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  department?: string
  position?: string
  joinDate?: string
}

export interface NavItem {
  title: string
  href: string
  icon: IconName // String icon name for serialization across Server/Client boundary
  badge?: number
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar?: string
  type: "annual" | "sick" | "personal" | "unpaid"
  startDate: string
  endDate: string
  status: "pending" | "approved" | "rejected"
  remarks?: string
  approverRemarks?: string
}

export interface AttendanceRecord {
  id: string
  date: string
  checkIn?: string
  checkOut?: string
  status: "present" | "absent" | "half-day" | "leave" | "holiday"
  workHours?: number
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  joinDate: string
  status: "active" | "inactive" | "on-leave"
  avatar?: string
  salary?: number
}

export interface PayrollRecord {
  id: string
  employeeId: string
  month: string
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  status: "pending" | "processed" | "paid"
}

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: "info" | "success" | "warning" | "error"
}
