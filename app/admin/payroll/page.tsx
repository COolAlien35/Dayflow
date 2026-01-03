"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { NoteBlock, NoteBlockTitle, NoteBlockDescription, noteBlockTextColors } from "@/components/layout/note-block"
import { DataTable } from "@/components/data-table/data-table"
import { TableFilters } from "@/components/data-table/table-filters"
import { TableActions } from "@/components/data-table/table-actions"
import { SalaryEditDialog } from "@/components/dialogs/salary-edit-dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { employees } from "@/lib/mock-data"
import { DollarSign, Users, TrendingUp, Edit, Download, Shield } from "lucide-react"
import { toast } from "sonner"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, payrollAnimationOptions } from "@/lib/motion/index"
import type { Employee } from "@/lib/types"

export default function AdminPayrollPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showSalaryDialog, setShowSalaryDialog] = useState(false)
  
  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  const noteBoxRef = useRef<HTMLDivElement>(null)
  
  // Apply animations
  useScrollAnimation(pageHeaderRef, payrollAnimationOptions.pageHeader)
  useScrollAnimation(noteBoxRef, payrollAnimationOptions.noteBox)

  const totalPayroll = employees.reduce((sum, e) => sum + (e.salary || 0), 0)
  const avgSalary = Math.round(totalPayroll / employees.length)

  const handleSaveSalary = (newSalary: number) => {
    toast.success(`Salary updated to $${newSalary.toLocaleString()}`)
  }

  const columns = [
    {
      key: "employee",
      header: "Employee",
      cell: (row: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-border/50">
            <AvatarImage src={row.avatar || "/placeholder.svg"} alt={row.name} />
            <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-muted-foreground">{row.position}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      cell: (row: Employee) => <span className="text-muted-foreground">{row.department}</span>,
    },
    {
      key: "salary",
      header: "Annual Salary",
      cell: (row: Employee) => <span className="font-mono font-semibold">${row.salary?.toLocaleString() || "—"}</span>,
    },
    {
      key: "monthly",
      header: "Monthly",
      cell: (row: Employee) => (
        <span className="font-mono text-muted-foreground">
          ${row.salary ? Math.round(row.salary / 12).toLocaleString() : "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Employee) => (
        <StatusBadge variant={row.status === "active" ? "success" : "default"} dot className="capitalize">
          {row.status.replace("-", " ")}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row: Employee) => (
        <TableActions
          actions={[
            {
              label: "Edit Salary",
              icon: <Edit className="h-4 w-4" />,
              onClick: () => {
                setSelectedEmployee(row)
                setShowSalaryDialog(true)
              },
            },
            {
              label: "Download Slip",
              icon: <Download className="h-4 w-4" />,
              onClick: () => toast.info(`Downloading pay slip for ${row.name}`),
            },
          ]}
        />
      ),
      className: "w-12",
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
  ]

  return (
    <div className="min-h-screen">
      <div ref={pageHeaderRef} className="payroll-page-header">
        <PageHeader
          title="Payroll Management"
          subtitle="Manage employee salaries and compensation"
          breadcrumbs={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Payroll" }]}
        />
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6 p-4 lg:p-6">
        {/* Confidential Notice */}
        <motion.div variants={staggerItem} ref={noteBoxRef}>
          <NoteBlock variant="warning" icon={<Shield className="h-5 w-5 text-amber-600" />}>
            <NoteBlockTitle className={noteBlockTextColors.warning.title}>
              Confidential Information
            </NoteBlockTitle>
            <NoteBlockDescription className={noteBlockTextColors.warning.description}>
              This section contains confidential salary information. All changes are logged for audit purposes.
            </NoteBlockDescription>
          </NoteBlock>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value={employees.length} icon={<Users className="h-5 w-5" />} delay={0.1} />
          <StatCard
            title="Total Annual Payroll"
            value={`$${(totalPayroll / 1000).toFixed(0)}K`}
            icon={<DollarSign className="h-5 w-5" />}
            delay={0.15}
          />
          <StatCard
            title="Average Salary"
            value={`$${(avgSalary / 1000).toFixed(0)}K`}
            icon={<TrendingUp className="h-5 w-5" />}
            delay={0.2}
          />
          <StatCard
            title="Monthly Payroll"
            value={`$${(totalPayroll / 12 / 1000).toFixed(1)}K`}
            icon={<DollarSign className="h-5 w-5" />}
            delay={0.25}
          />
        </div>

        {/* Payroll Table */}
        <motion.div variants={staggerItem}>
          <SectionCard title="Employee Compensation" delay={0.3}>
            <div className="space-y-4">
              <TableFilters searchPlaceholder="Search employees..." filters={filters} />
              <DataTable
                columns={columns}
                data={employees}
                emptyTitle="No employees found"
                emptyDescription="No employees match your search criteria"
              />
            </div>
          </SectionCard>
        </motion.div>
      </motion.div>

      <SalaryEditDialog
        open={showSalaryDialog}
        onOpenChange={setShowSalaryDialog}
        employeeName={selectedEmployee?.name || ""}
        currentSalary={selectedEmployee?.salary || 0}
        onSave={handleSaveSalary}
      />
    </div>
  )
}
