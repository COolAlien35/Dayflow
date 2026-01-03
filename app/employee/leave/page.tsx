"use client"

import { useState, useRef, useEffect } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { LeaveApplyForm, type LeaveFormData } from "@/components/forms/leave-apply-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Calendar, Clock, CheckCircle, Palmtree } from "lucide-react"
import { toast } from "sonner"
import { useScrollAnimation, leaveApplicationAnimationOptions } from "@/lib/motion/index"
import type { LeaveRequest } from "@/lib/types"
import { getMyLeaveRequests, createLeaveRequest, APIError } from "@/lib/api"
import { format } from "date-fns"

export default function EmployeeLeavePage() {
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Refs for animations
  const leaveFormRef = useRef<HTMLDivElement>(null)
  const infoPanelRef = useRef<HTMLDivElement>(null)

  // Apply animations
  useScrollAnimation(leaveFormRef, leaveApplicationAnimationOptions.form)
  useScrollAnimation(infoPanelRef, leaveApplicationAnimationOptions.infoPanelParallax)

  // Fetch leave requests on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMyLeaveRequests()
        // Map API response to frontend format
        const requests: LeaveRequest[] = response.leave_requests.map(req => ({
          id: String(req.id),
          employeeId: String(req.user_id),
          employeeName: '', // Employee view - own requests
          type: req.leave_type.toLowerCase() as LeaveRequest['type'],
          startDate: req.start_date,
          endDate: req.end_date,
          status: req.status.toLowerCase() as LeaveRequest['status'],
          remarks: req.remarks,
        }))
        setLeaveRequests(requests)
      } catch (error) {
        console.error('Failed to fetch leave requests:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const statusVariant = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "destructive"
      default:
        return "pending"
    }
  }

  const columns = [
    {
      key: "type",
      header: "Type",
      cell: (row: LeaveRequest) => <span className="font-medium capitalize">{row.type} Leave</span>,
    },
    {
      key: "dates",
      header: "Dates",
      cell: (row: LeaveRequest) => (
        <span className="text-muted-foreground">
          {row.startDate} - {row.endDate}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "Remarks",
      cell: (row: LeaveRequest) => (
        <span className="max-w-[200px] truncate text-muted-foreground">{row.remarks || "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: LeaveRequest) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize">
          {row.status}
        </StatusBadge>
      ),
    },
  ]

  const handleApplyLeave = async (data: LeaveFormData) => {
    setIsSubmitting(true)
    try {
      // The form now returns the correct leave type directly
      const leaveType = data.type as 'Sick' | 'Casual' | 'Vacation' | 'Unpaid'

      await createLeaveRequest({
        leave_type: leaveType,
        start_date: data.dateRange?.from ? format(data.dateRange.from, 'yyyy-MM-dd') : '',
        end_date: data.dateRange?.to ? format(data.dateRange.to, 'yyyy-MM-dd') : format(data.dateRange?.from || new Date(), 'yyyy-MM-dd'),
        remarks: data.remarks || undefined,
      })

      toast.success("Leave request submitted successfully")
      setShowApplyDialog(false)

      // Refresh leave requests
      const response = await getMyLeaveRequests()
      const requests: LeaveRequest[] = response.leave_requests.map(req => ({
        id: String(req.id),
        employeeId: String(req.user_id),
        employeeName: '', // Employee view - own requests
        type: req.leave_type.toLowerCase() as LeaveRequest['type'],
        startDate: req.start_date,
        endDate: req.end_date,
        status: req.status.toLowerCase() as LeaveRequest['status'],
        remarks: req.remarks,
      }))
      setLeaveRequests(requests)
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to submit leave request. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Leave Management"
        subtitle="Apply for leave and track your requests"
        breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Leave" }]}
        action={{
          label: "Apply Leave",
          onClick: () => setShowApplyDialog(true),
          icon: <Plus className="mr-2 h-4 w-4" />,
        }}
      />

      <div className="space-y-6 p-4 lg:p-6">
        {/* Leave Balance Stats - Info Panel with Parallax */}
        <div ref={infoPanelRef} className="leave-info-panel grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Annual Leave"
            value="12 days"
            subtitle="Available"
            icon={<Palmtree className="h-5 w-5" />}
            delay={0}
          />
          <StatCard
            title="Sick Leave"
            value="5 days"
            subtitle="Available"
            icon={<Clock className="h-5 w-5" />}
            delay={0.05}
          />
          <StatCard
            title="Personal Leave"
            value="3 days"
            subtitle="Available"
            icon={<CheckCircle className="h-5 w-5" />}
            delay={0.1}
          />
          <StatCard
            title="Leaves Taken"
            value="8 days"
            subtitle="This year"
            icon={<Calendar className="h-5 w-5" />}
            delay={0.15}
          />
        </div>

        {/* Leave Requests - Form with Scroll Animation */}
        <div ref={leaveFormRef} className="leave-form">
          <SectionCard
            title="Leave Requests"
            description="Your leave application history"
            delay={0.2}
            action={
              <Button
                size="sm"
                onClick={() => setShowApplyDialog(true)}
                className="bg-[hsl(174_70%_17%)] shadow-sm hover:bg-[hsl(174_70%_22%)]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Apply Leave
              </Button>
            }
          >
            <DataTable
              columns={columns}
              data={leaveRequests}
              emptyTitle="No leave requests"
              emptyDescription="You haven't applied for any leave yet"
              emptyAction={
                <Button onClick={() => setShowApplyDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Apply Leave
                </Button>
              }
            />
          </SectionCard>
        </div>
      </div>

      {/* Apply Leave Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="border-border/50 bg-popover/95 backdrop-blur-xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for Leave</DialogTitle>
          </DialogHeader>
          <LeaveApplyForm
            onSubmit={handleApplyLeave}
            onCancel={() => setShowApplyDialog(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
