import type { NavGroup } from "./types"

export const employeeNavGroups: NavGroup[] = [
  {
    title: "Core",
    items: [
      { title: "Dashboard", href: "/employee/dashboard", icon: "LayoutDashboard" },
      { title: "My Profile", href: "/employee/profile", icon: "User" },
      { title: "Attendance", href: "/employee/attendance", icon: "Clock" },
      { title: "Leave", href: "/employee/leave", icon: "Calendar" },
      { title: "Payroll", href: "/employee/payroll", icon: "DollarSign" },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Settings", href: "/shared/settings", icon: "Settings" },
      { title: "Notifications", href: "/shared/notifications", icon: "Bell" },
    ],
  },
]

export const adminNavGroups: NavGroup[] = [
  {
    title: "Core",
    items: [{ title: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" }],
  },
  {
    title: "Management",
    items: [
      { title: "Employees", href: "/admin/employees", icon: "Users" },
      { title: "Attendance", href: "/admin/attendance", icon: "Clock" },
      { title: "Leave Approvals", href: "/admin/leave-approvals", icon: "CheckSquare", badge: 2 },
      { title: "Payroll", href: "/admin/payroll", icon: "DollarSign" },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Settings", href: "/admin/settings", icon: "Settings" },
      { title: "Notifications", href: "/shared/notifications", icon: "Bell" },
    ],
  },
]

