"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { TabsNav } from "@/components/ui/tabs-nav"
import { Button } from "@/components/ui/button"
import { Clock, LogIn, LogOut, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useScrollAnimation, useMountAnimation, attendanceAnimationOptions } from "@/lib/motion/index"
import type { AttendanceRecord } from "@/lib/types"
import { checkIn as apiCheckIn, checkOut as apiCheckOut, getAttendanceHistory, APIError } from "@/lib/api"

export default function EmployeeAttendancePage() {
  const [activeTab, setActiveTab] = useState("daily")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentCheckIn, setCurrentCheckIn] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const checkInCardRef = useRef<HTMLDivElement>(null)
  const historyCardRef = useRef<HTMLDivElement>(null)

  // Apply animations
  useScrollAnimation(pageHeaderRef, attendanceAnimationOptions.pageHeader)
  useMountAnimation(checkInCardRef, attendanceAnimationOptions.statusChips)
  useMountAnimation(historyCardRef, attendanceAnimationOptions.filters)

  // Fetch attendance history on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAttendanceHistory()
        // Map API response to frontend format
        const records: AttendanceRecord[] = response.records.map(record => ({
          id: String(record.id),
          date: record.date,
          checkIn: record.check_in || undefined,
          checkOut: record.check_out || undefined,
          status: record.status.toLowerCase().replace(' ', '-') as AttendanceRecord['status'],
          workHours: record.check_in && record.check_out ?
            Math.round((new Date(`1970-01-01T${record.check_out}`).getTime() - new Date(`1970-01-01T${record.check_in}`).getTime()) / 3600000 * 10) / 10 : undefined
        }))
        setAttendanceRecords(records)

        // Check today's status
        const today = new Date().toISOString().split('T')[0]
        const todayRecord = response.records.find(r => r.date === today)
        if (todayRecord?.check_in) {
          setIsCheckedIn(true)
          setCurrentCheckIn(todayRecord.check_in)
        }
      } catch (error) {
        console.error('Failed to fetch attendance:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCheckIn = async () => {
    setIsAnimating(true)
    try {
      const response = await apiCheckIn()
      const time = response.check_in_time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      setIsCheckedIn(true)
      setCurrentCheckIn(time)
      toast.success(`Checked in at ${time}`)
      // Refresh attendance records
      const historyResponse = await getAttendanceHistory()
      const records: AttendanceRecord[] = historyResponse.records.map(record => ({
        id: String(record.id),
        date: record.date,
        checkIn: record.check_in || undefined,
        checkOut: record.check_out || undefined,
        status: record.status.toLowerCase().replace(' ', '-') as AttendanceRecord['status'],
        workHours: record.check_in && record.check_out ?
          Math.round((new Date(`1970-01-01T${record.check_out}`).getTime() - new Date(`1970-01-01T${record.check_in}`).getTime()) / 3600000 * 10) / 10 : undefined
      }))
      setAttendanceRecords(records)
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to check in. Please try again.")
      }
    } finally {
      setIsAnimating(false)
    }
  }

  const handleCheckOut = async () => {
    setIsAnimating(true)
    try {
      const response = await apiCheckOut()
      const time = response.check_out_time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      toast.success(`Checked out at ${time}`)
      // Refresh attendance records
      const historyResponse = await getAttendanceHistory()
      const records: AttendanceRecord[] = historyResponse.records.map(record => ({
        id: String(record.id),
        date: record.date,
        checkIn: record.check_in || undefined,
        checkOut: record.check_out || undefined,
        status: record.status.toLowerCase().replace(' ', '-') as AttendanceRecord['status'],
        workHours: record.check_in && record.check_out ?
          Math.round((new Date(`1970-01-01T${record.check_out}`).getTime() - new Date(`1970-01-01T${record.check_in}`).getTime()) / 3600000 * 10) / 10 : undefined
      }))
      setAttendanceRecords(records)
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to check out. Please try again.")
      }
    } finally {
      setIsAnimating(false)
    }
  }

  const statusVariant = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return "success"
      case "absent":
        return "destructive"
      case "half-day":
        return "warning"
      case "leave":
        return "info"
      default:
        return "default"
    }
  }

  const columns = [
    {
      key: "date",
      header: "Date",
      cell: (row: AttendanceRecord) => <span className="font-medium">{row.date}</span>,
    },
    {
      key: "checkIn",
      header: "Check In",
      cell: (row: AttendanceRecord) => <span className="font-mono text-sm">{row.checkIn || "-"}</span>,
    },
    {
      key: "checkOut",
      header: "Check Out",
      cell: (row: AttendanceRecord) => <span className="font-mono text-sm">{row.checkOut || "-"}</span>,
    },
    {
      key: "workHours",
      header: "Work Hours",
      cell: (row: AttendanceRecord) => (row.workHours ? `${row.workHours}h` : "-"),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: AttendanceRecord) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize">
          {row.status.replace("-", " ")}
        </StatusBadge>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      <div ref={pageHeaderRef} className="attendance-page-header">
        <PageHeader
          title="Attendance"
          subtitle="Track your daily attendance and work hours"
          breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Attendance" }]}
        />
      </div>

      <div className="space-y-6 p-4 lg:p-6">
        {/* Check In/Out Card */}
        <div ref={checkInCardRef} className="attendance-status-chips">
          <SectionCard>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-5">
                <motion.div
                  animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`relative rounded-2xl p-5 ${isCheckedIn ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5" : "bg-gradient-to-br from-[hsl(168_76%_40%_/_0.1)] to-[hsl(168_76%_40%_/_0.05)]"}`}
                >
                  {isCheckedIn ? (
                    <CheckCircle className="h-10 w-10 text-emerald-500" />
                  ) : (
                    <Clock className="h-10 w-10 text-[hsl(168_76%_40%)]" />
                  )}
                  {isCheckedIn && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-emerald-500"
                    />
                  )}
                </motion.div>
                <div>
                  <p className="text-lg font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isCheckedIn ? "checked-in" : "not-checked"}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="text-sm text-muted-foreground"
                    >
                      {isCheckedIn ? `Checked in at ${currentCheckIn}` : "You haven't checked in yet"}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {!isCheckedIn ? (
                  <Button
                    onClick={handleCheckIn}
                    size="lg"
                    disabled={isAnimating}
                    className="bg-[hsl(174_70%_17%)] shadow-lg shadow-[hsl(174_70%_17%_/_0.2)] hover:bg-[hsl(174_70%_22%)]"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Check In
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckOut}
                    variant="outline"
                    size="lg"
                    disabled={isAnimating}
                    className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Check Out
                  </Button>
                )}
              </motion.div>
            </div>
          </SectionCard>
        </div>

        {/* Attendance Records */}
        <div ref={historyCardRef}>
          <SectionCard title="Attendance History">
            <TabsNav
              tabs={[
                { id: "daily", label: "Daily View" },
                { id: "weekly", label: "Weekly View" },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-6"
            />
            {/* Table is NOT animated - data should be immediately visible */}
            <DataTable
              columns={columns}
              data={attendanceRecords}
              emptyTitle="No attendance records"
              emptyDescription="Your attendance records will appear here"
            />
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
