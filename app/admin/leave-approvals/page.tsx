"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { TableFilters } from "@/components/data-table/table-filters"
import { TabsNav } from "@/components/ui/tabs-nav"
import { LeaveApprovalDialog } from "@/components/dialogs/leave-approval-dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useScrollAnimation, useHoverAnimation } from "@/lib/motion/hooks"
import { leaveApprovalAnimationOptions } from "@/lib/motion/animations/leaveApprovalAnimations"
import type { LeaveRequest } from "@/lib/types"
import { getAllLeaveRequests, approveLeaveRequest, rejectLeaveRequest, APIError } from "@/lib/api"

export default function AdminLeaveApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  // Refs for animations
  const tableRef = useRef<HTMLDivElement>(null)

  // Apply scroll animation to table
  useScrollAnimation(tableRef, leaveApprovalAnimationOptions.table)

  // Fetch leave requests on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllLeaveRequests(1, 100) // Get all for now
        const requests: LeaveRequest[] = response.leave_requests.map(req => ({
          id: String(req.id),
          employeeId: String(req.user_id),
          employeeName: `Employee ${req.user_id}`, // Would need profile info
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

  const pendingRequests = leaveRequests.filter((r) => r.status === "pending")
  const approvedRequests = leaveRequests.filter((r) => r.status === "approved")
  const rejectedRequests = leaveRequests.filter((r) => r.status === "rejected")

  const tabFilteredRequests =
    activeTab === "pending" ? pendingRequests : activeTab === "approved" ? approvedRequests : rejectedRequests

  // Apply search and filter to tab-filtered requests
  const filteredRequests = useMemo(() => {
    return tabFilteredRequests.filter(req => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          req.employeeName.toLowerCase().includes(query) ||
          req.type.toLowerCase().includes(query) ||
          (req.remarks && req.remarks.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Type filter
      if (activeFilters.type && activeFilters.type !== 'all') {
        if (req.type !== activeFilters.type) {
          return false
        }
      }

      return true
    })
  }, [tabFilteredRequests, searchQuery, activeFilters])

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

  const refreshData = async () => {
    try {
      const response = await getAllLeaveRequests(1, 100)
      const requests: LeaveRequest[] = response.leave_requests.map(req => ({
        id: String(req.id),
        employeeId: String(req.user_id),
        employeeName: `Employee ${req.user_id}`,
        type: req.leave_type.toLowerCase() as LeaveRequest['type'],
        startDate: req.start_date,
        endDate: req.end_date,
        status: req.status.toLowerCase() as LeaveRequest['status'],
        remarks: req.remarks,
      }))
      setLeaveRequests(requests)
    } catch (error) {
      console.error('Failed to refresh data:', error)
    }
  }

  const handleApprove = async (id: string, remarks: string) => {
    try {
      await approveLeaveRequest(Number(id), { comments: remarks })
      toast.success(`Leave request approved${remarks ? ` with remarks: ${remarks}` : ""}`, {
        duration: leaveApprovalAnimationOptions.toast.autoDismiss,
      })
      await refreshData()
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to approve leave request")
      }
    }
  }

  const handleReject = async (id: string, remarks: string) => {
    try {
      await rejectLeaveRequest(Number(id), { comments: remarks })
      toast.error(`Leave request rejected${remarks ? ` with remarks: ${remarks}` : ""}`, {
        duration: leaveApprovalAnimationOptions.toast.autoDismiss,
      })
      await refreshData()
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to reject leave request")
      }
    }
  }

  const columns = [
    {
      key: "employee",
      header: "Employee",
      cell: (row: LeaveRequest) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-border/50">
            <AvatarImage src="/placeholder.svg" alt={row.employeeName} />
            <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
              {row.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.employeeName}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Leave Type",
      cell: (row: LeaveRequest) => <span className="capitalize">{row.type} Leave</span>,
    },
    {
      key: "dates",
      header: "Duration",
      cell: (row: LeaveRequest) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.startDate} - {row.endDate}
        </span>
      ),
    },
    {
      key: "remarks",
      header: "Reason",
      cell: (row: LeaveRequest) => (
        <span className="max-w-[200px] truncate text-muted-foreground">{row.remarks || "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: LeaveRequest) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize leave-approval-status-cell">
          {row.status}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row: LeaveRequest) =>
        row.status === "pending" && (
          <div className="flex gap-1">
            <ApproveButton
              onClick={() => {
                setSelectedRequest(row)
                setShowApprovalDialog(true)
              }}
            />
            <RejectButton
              onClick={() => {
                setSelectedRequest(row)
                setShowApprovalDialog(true)
              }}
            />
          </div>
        ),
      className: "w-24",
    },
  ]

  const filters = [
    {
      key: "type",
      label: "Type",
      options: [
        { label: "Annual", value: "annual" },
        { label: "Sick", value: "sick" },
        { label: "Personal", value: "personal" },
        { label: "Unpaid", value: "unpaid" },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Leave Approvals"
        subtitle="Review and manage employee leave requests"
        breadcrumbs={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Leave Approvals" }]}
      />

      <div className="space-y-6 p-4 lg:p-6">
        <SectionCard>
          <TabsNav
            tabs={[
              { id: "pending", label: "Pending", count: pendingRequests.length },
              { id: "approved", label: "Approved", count: approvedRequests.length },
              { id: "rejected", label: "Rejected", count: rejectedRequests.length },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />
          <div className="space-y-4">
            <TableFilters 
              searchPlaceholder="Search by employee name..." 
              filters={filters}
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
            <div ref={tableRef} className="leave-approval-table">
              <DataTable
                columns={columns}
                data={filteredRequests}
                emptyTitle={`No ${activeTab} requests`}
                emptyDescription={`There are no ${activeTab} leave requests at the moment`}
              />
            </div>
          </div>
        </SectionCard>
      </div>

      <LeaveApprovalDialog
        open={showApprovalDialog}
        onOpenChange={setShowApprovalDialog}
        request={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}

// Approve button component with hover animation
function ApproveButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Apply hover animation
  useHoverAnimation(buttonRef, leaveApprovalAnimationOptions.approveButtonHover)

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      className="leave-approval-approve-button h-9 w-9 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      onClick={onClick}
    >
      <CheckCircle className="h-5 w-5" />
      <span className="sr-only">Approve</span>
    </Button>
  )
}

// Reject button component with hover animation
function RejectButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Apply hover animation
  useHoverAnimation(buttonRef, leaveApprovalAnimationOptions.rejectButtonHover)

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      className="leave-approval-reject-button h-9 w-9 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
      onClick={onClick}
    >
      <XCircle className="h-5 w-5" />
      <span className="sr-only">Reject</span>
    </Button>
  )
}
