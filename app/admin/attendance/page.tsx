"use client"

import { useState, useRef } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { TableFilters } from "@/components/data-table/table-filters"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { TabsNav } from "@/components/ui/tabs-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { employees } from "@/lib/mock-data"
import { useScrollAnimation, useMountAnimation, attendanceAnimationOptions } from "@/lib/motion/index"
import { Users, UserCheck, UserX, Clock } from "lucide-react"

// Mock attendance data for all employees
const todayAttendance = employees.map((emp) => ({
  id: emp.id,
  employeeName: emp.name,
  employeeEmail: emp.email,
  avatar: emp.avatar,
  department: emp.department,
  checkIn: emp.status === "active" ? "09:00" : null,
  checkOut: emp.status === "active" && Math.random() > 0.3 ? "18:00" : null,
  status: emp.status === "on-leave" ? "leave" : emp.status === "active" ? "present" : "absent",
  workHours: emp.status === "active" ? 8.5 : 0,
}))

export default function AdminAttendancePage() {
  const [activeTab, setActiveTab] = useState("today")
  
  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const statusChipsRef = useRef<HTMLDivElement>(null)
  
  // Apply animations
  useScrollAnimation(pageHeaderRef, attendanceAnimationOptions.pageHeader)
  useMountAnimation(filtersRef, attendanceAnimationOptions.filters)
  useMountAnimation(statusChipsRef, attendanceAnimationOptions.statusChips)

  const presentCount = todayAttendance.filter((a) => a.status === "present").length
  const absentCount = todayAttendance.filter((a) => a.status === "absent").length
  const onLeaveCount = todayAttendance.filter((a) => a.status === "leave").length

  const statusVariant = (status: string) => {
    switch (status) {
      case "present":
        return "success"
      case "absent":
        return "destructive"
      case "leave":
        return "info"
      default:
        return "default"
    }
  }

  const columns = [
    {
      key: "employee",
      header: "Employee",
      cell: (row: (typeof todayAttendance)[0]) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-background shadow-sm">
            <AvatarImage src={row.avatar || "/placeholder.svg"} alt={row.employeeName} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-medium text-primary">
              {row.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{row.employeeName}</p>
            <p className="text-sm text-muted-foreground">{row.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: "checkIn",
      header: "Check In",
      cell: (row: (typeof todayAttendance)[0]) => (
        <span className={row.checkIn ? "font-medium text-success" : "text-muted-foreground"}>{row.checkIn || "—"}</span>
      ),
    },
    {
      key: "checkOut",
      header: "Check Out",
      cell: (row: (typeof todayAttendance)[0]) => (
        <span className={row.checkOut ? "font-medium text-foreground" : "text-muted-foreground"}>
          {row.checkOut || "—"}
        </span>
      ),
    },
    {
      key: "workHours",
      header: "Work Hours",
      cell: (row: (typeof todayAttendance)[0]) => (
        <span className={row.workHours ? "font-medium" : "text-muted-foreground"}>
          {row.workHours ? `${row.workHours}h` : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: (typeof todayAttendance)[0]) => (
        <StatusBadge variant={statusVariant(row.status)} className="capitalize">
          {row.status}
        </StatusBadge>
      ),
    },
  ]

  const filters = [
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Design", value: "design" },
        { label: "Marketing", value: "marketing" },
        { label: "Finance", value: "finance" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Present", value: "present" },
        { label: "Absent", value: "absent" },
        { label: "On Leave", value: "leave" },
      ],
    },
  ]

  return (
    <div>
      <div ref={pageHeaderRef} className="attendance-page-header">
        <PageHeader
          title="Attendance Management"
          subtitle="Monitor and manage employee attendance across departments"
          breadcrumbs={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Attendance" }]}
        />
      </div>

      <div className="space-y-6 p-4 lg:p-6">
        {/* Stats - Status chips container */}
        <div ref={statusChipsRef} className="attendance-status-chips grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value={employees.length} icon={<Users className="h-5 w-5" />} index={0} />
          <StatCard
            title="Present Today"
            value={presentCount}
            icon={<UserCheck className="h-5 w-5" />}
            trend={{ value: 95, isPositive: true }}
            index={1}
          />
          <StatCard title="Absent" value={absentCount} icon={<UserX className="h-5 w-5" />} index={2} />
          <StatCard title="On Leave" value={onLeaveCount} icon={<Clock className="h-5 w-5" />} index={3} />
        </div>

        {/* Attendance Table */}
        <div>
          <SectionCard title="Attendance Records" description="Real-time attendance tracking for all employees">
            <TabsNav
              tabs={[
                { id: "today", label: "Today" },
                { id: "weekly", label: "This Week" },
                { id: "monthly", label: "This Month" },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-4"
            />
            <div className="space-y-4">
              <div ref={filtersRef} className="attendance-filters">
                <TableFilters searchPlaceholder="Search employees..." filters={filters} />
              </div>
              {/* Table is NOT animated - data should be immediately visible */}
              <DataTable
                columns={columns}
                data={todayAttendance}
                emptyTitle="No attendance records"
                emptyDescription="Attendance data will appear here"
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
