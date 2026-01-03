"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { NoteBlock, NoteBlockTitle, NoteBlockDescription, noteBlockTextColors } from "@/components/layout/note-block"
import { DataTable } from "@/components/data-table/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { DollarSign, Download, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, payrollAnimationOptions } from "@/lib/motion/index"
import { getMyPayroll, type PayrollRecord as APIPayrollRecord } from "@/lib/api"

interface PayrollDisplayRecord {
  id: string
  month: string
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  status: 'paid' | 'processed' | 'pending'
}

export default function EmployeePayrollPage() {
  const [payrollData, setPayrollData] = useState<APIPayrollRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Refs for animations
  const pageHeaderRef = useRef<HTMLDivElement>(null)
  
  // Apply animations
  useScrollAnimation(pageHeaderRef, payrollAnimationOptions.pageHeader)

  useEffect(() => {
    async function fetchPayroll() {
      try {
        const data = await getMyPayroll()
        setPayrollData(data)
      } catch (error) {
        console.error('Failed to fetch payroll:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPayroll()
  }, [])

  // Convert API data to display format
  const payrollRecords: PayrollDisplayRecord[] = payrollData ? [{
    id: String(payrollData.id),
    month: new Date(payrollData.effective_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    basicSalary: payrollData.basic_salary,
    allowances: payrollData.allowances,
    deductions: payrollData.deductions,
    netSalary: payrollData.net_salary,
    status: 'paid' as const
  }] : []

  const latestPayroll = payrollRecords[0]

  const statusVariant = (status: PayrollDisplayRecord["status"]) => {
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
      cell: (row: PayrollDisplayRecord) => <span className="font-medium">{row.month}</span>,
    },
    {
      key: "basicSalary",
      header: "Basic Salary",
      cell: (row: PayrollDisplayRecord) => <span className="font-mono">${row.basicSalary.toLocaleString()}</span>,
    },
    {
      key: "allowances",
      header: "Allowances",
      cell: (row: PayrollDisplayRecord) => (
        <span className="font-mono text-emerald-600">+${row.allowances.toLocaleString()}</span>
      ),
    },
    {
      key: "deductions",
      header: "Deductions",
      cell: (row: PayrollDisplayRecord) => (
        <span className="font-mono text-rose-500">-${row.deductions.toLocaleString()}</span>
      ),
    },
    {
      key: "netSalary",
      header: "Net Salary",
      cell: (row: PayrollDisplayRecord) => (
        <span className="font-mono font-semibold text-foreground">${row.netSalary.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: PayrollDisplayRecord) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize">
          {row.status}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row: PayrollDisplayRecord) =>
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

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
