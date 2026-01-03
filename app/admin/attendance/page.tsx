"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { TableFilters } from "@/components/data-table/table-filters"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { TabsNav } from "@/components/ui/tabs-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useScrollAnimation, useMountAnimation, attendanceAnimationOptions } from "@/lib/motion/index"
import { Users, UserCheck, UserX, Clock, Loader2 } from "lucide-react"
import { getEmployees, getAttendanceHistory } from "@/lib/api"

interface AttendanceDisplayRecord {
  id: string
  employeeName: string
  employeeEmail: string
  avatar?: string
  department: string
  checkIn: string | null
  checkOut: string | null
  status: 'present' | 'absent' | 'leave' | 'half-day'
  workHours: number
}

export default function AdminAttendancePage() {
  const [activeTab, setActiveTab] = useState("today")
  const [todayAttendance, setTodayAttendance] = useState<AttendanceDisplayRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const statusChipsRef = useRef<HTMLDivElement>(null)
  
  // Apply animations
  useScrollAnimation(pageHeaderRef, attendanceAnimationOptions.pageHeader)
  useMountAnimation(filtersRef, attendanceAnimationOptions.filters)
  useMountAnimation(statusChipsRef, attendanceAnimationOptions.statusChips)

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesResponse = await getEmployees(1, 100)
        setTotalEmployees(employeesResponse.total)
        
        // Map employees to attendance records
        const attendanceRecords: AttendanceDisplayRecord[] = employeesResponse.employees.map(emp => ({
          id: String(emp.id),
          employeeName: emp.name,
          employeeEmail: emp.email,
          department: emp.department || 'Unassigned',
          checkIn: null,
          checkOut: null,
          status: 'absent' as const,
          workHours: 0,
        }))
        
        setTodayAttendance(attendanceRecords)
      } catch (error) {
        console.error('Failed to fetch attendance data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter attendance records based on search and filters
  const filteredAttendance = useMemo(() => {
    return todayAttendance.filter(record => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          record.employeeName.toLowerCase().includes(query) ||
          record.employeeEmail.toLowerCase().includes(query) ||
          record.department.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Department filter
      if (activeFilters.department && activeFilters.department !== 'all') {
        if (record.department.toLowerCase() !== activeFilters.department.toLowerCase()) {
          return false
        }
      }

      // Status filter
      if (activeFilters.status && activeFilters.status !== 'all') {
        if (record.status !== activeFilters.status) {
          return false
        }
      }

      return true
    })
  }, [todayAttendance, searchQuery, activeFilters])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveFilters({})
  }

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
      cell: (row: AttendanceDisplayRecord) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-background shadow-sm">
            <AvatarImage src={row.avatar || "/placeholder.svg"} alt={row.employeeName || ''} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-medium text-primary">
              {row.employeeName
                ? row.employeeName.split(" ").map((n) => n[0]).join("")
                : "??"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{row.employeeName || 'Unknown'}</p>
            <p className="text-sm text-muted-foreground">{row.department || ''}</p>
          </div>
        </div>
      ),
    },
    {
      key: "checkIn",
      header: "Check In",
      cell: (row: AttendanceDisplayRecord) => (
        <span className={row.checkIn ? "font-medium text-success" : "text-muted-foreground"}>{row.checkIn || "—"}</span>
      ),
    },
    {
      key: "checkOut",
      header: "Check Out",
      cell: (row: AttendanceDisplayRecord) => (
        <span className={row.checkOut ? "font-medium text-foreground" : "text-muted-foreground"}>
          {row.checkOut || "—"}
        </span>
      ),
    },
    {
      key: "workHours",
      header: "Work Hours",
      cell: (row: AttendanceDisplayRecord) => (
        <span className={row.workHours ? "font-medium" : "text-muted-foreground"}>
          {row.workHours ? `${row.workHours}h` : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: AttendanceDisplayRecord) => (
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

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-6 p-4 lg:p-6">
          {/* Stats - Status chips container */}
          <div ref={statusChipsRef} className="attendance-status-chips grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Employees" value={totalEmployees} icon={<Users className="h-5 w-5" />} index={0} />
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
                  <TableFilters 
                    searchPlaceholder="Search employees..." 
                    filters={filters}
                    onSearchChange={handleSearchChange}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
                {/* Table is NOT animated - data should be immediately visible */}
                <DataTable
                  columns={columns}
                  data={filteredAttendance}
                  emptyTitle="No attendance records"
                  emptyDescription="Attendance data will appear here"
                />
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  )
}
