"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { NoteBlock, NoteBlockTitle, NoteBlockDescription, noteBlockTextColors } from "@/components/layout/note-block"
import { DataTable } from "@/components/data-table/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { payrollRecords } from "@/lib/mock-data"
import { DollarSign, Download, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, payrollAnimationOptions } from "@/lib/motion/index"
import type { PayrollRecord } from "@/lib/types"

export default function EmployeePayrollPage() {
  const latestPayroll = payrollRecords.find((p) => p.status === "paid")
  
  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  
  // Apply animations
  useScrollAnimation(pageHeaderRef, payrollAnimationOptions.pageHeader)

  const statusVariant = (status: PayrollRecord["status"]) => {
    switch (status) {
      case "paid":
        return "success"
      case "processed":
        return "info"
      default:
        return "pending"
    }
  }

  const columns = [
    {
      key: "month",
      header: "Month",
      cell: (row: PayrollRecord) => <span className="font-medium">{row.month}</span>,
    },
    {
      key: "basicSalary",
      header: "Basic Salary",
      cell: (row: PayrollRecord) => <span className="font-mono">${row.basicSalary.toLocaleString()}</span>,
    },
    {
      key: "allowances",
      header: "Allowances",
      cell: (row: PayrollRecord) => (
        <span className="font-mono text-emerald-600">+${row.allowances.toLocaleString()}</span>
      ),
    },
    {
      key: "deductions",
      header: "Deductions",
      cell: (row: PayrollRecord) => (
        <span className="font-mono text-rose-500">-${row.deductions.toLocaleString()}</span>
      ),
    },
    {
      key: "netSalary",
      header: "Net Salary",
      cell: (row: PayrollRecord) => (
        <span className="font-mono font-semibold text-foreground">${row.netSalary.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: PayrollRecord) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize">
          {row.status}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row: PayrollRecord) =>
        row.status === "paid" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="text-[hsl(168_76%_40%)]">
              <Download className="mr-2 h-4 w-4" />
              Slip
            </Button>
          </motion.div>
        ),
      className: "text-right",
    },
  ]

  return (
    <div className="min-h-screen">
      <div ref={pageHeaderRef} className="payroll-page-header">
        <PageHeader
          title="Payroll"
          subtitle="View your salary information and pay slips"
          breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Payroll" }]}
        />
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6 p-4 lg:p-6">
        {/* Confidential Notice */}
        <motion.div variants={staggerItem}>
          <NoteBlock variant="warning" icon={<Shield className="h-5 w-5 text-amber-600" />}>
            <NoteBlockTitle className={noteBlockTextColors.warning.title}>
              Confidential Information
            </NoteBlockTitle>
            <NoteBlockDescription className={noteBlockTextColors.warning.description}>
              This is confidential salary information. If you notice any discrepancies, please contact HR.
            </NoteBlockDescription>
          </NoteBlock>
        </motion.div>

        {/* Current Salary Summary */}
        {latestPayroll && (
          <motion.div variants={staggerItem}>
            <SectionCard title="Latest Salary Breakdown" description={latestPayroll.month} delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl bg-muted/30 p-5"
                >
                  <p className="text-sm font-medium text-muted-foreground">Basic Salary</p>
                  <p className="mt-1 font-mono text-2xl font-semibold">${latestPayroll.basicSalary.toLocaleString()}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-xl bg-emerald-50 p-5"
                >
                  <p className="text-sm font-medium text-emerald-700">Allowances</p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-emerald-600">
                    +${latestPayroll.allowances.toLocaleString()}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl bg-rose-50 p-5"
                >
                  <p className="text-sm font-medium text-rose-700">Deductions</p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-rose-500">
                    -${latestPayroll.deductions.toLocaleString()}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-xl bg-gradient-to-br from-[hsl(168_76%_40%_/_0.1)] to-[hsl(161_94%_40%_/_0.05)] p-5"
                >
                  <p className="text-sm font-medium text-[hsl(168_76%_35%)]">Net Salary</p>
                  <div className="mt-1 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-[hsl(168_76%_40%)]" />
                    <p className="font-mono text-2xl font-bold text-[hsl(174_70%_17%)]">
                      {latestPayroll.netSalary.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Payroll History */}
        <motion.div variants={staggerItem}>
          <SectionCard title="Payroll History" description="Your salary records for the past months" delay={0.2}>
            <DataTable
              columns={columns}
              data={payrollRecords}
              emptyTitle="No payroll records"
              emptyDescription="Your payroll history will appear here"
            />
          </SectionCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
