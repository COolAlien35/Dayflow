"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { DataTable } from "@/components/data-table/data-table"
import { TableFilters } from "@/components/data-table/table-filters"
import { TableActions } from "@/components/data-table/table-actions"
import { EmployeeDetailDialog } from "@/components/dialogs/employee-detail-dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { staggerContainer, staggerItem } from "@/lib/motion"
import type { Employee } from "@/lib/types"
import { getEmployees } from "@/lib/api"

export default function AdminEmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await getEmployees(1, 100)
        const mappedEmployees: Employee[] = response.employees.map(emp => ({
          id: String(emp.id),
          name: emp.name,
          email: emp.email,
          phone: '',
          department: emp.department || 'Unassigned',
          position: emp.position || 'Employee',
          joinDate: emp.joining_date || '',
          status: emp.status?.toLowerCase() as Employee['status'] || 'active',
          salary: 0,
        }))
        setEmployees(mappedEmployees)
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        toast.error('Failed to load employees')
      } finally {
        setIsLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const statusVariant = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "success"
      case "on-leave":
        return "warning"
      default:
        return "default"
    }
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
            <p className="text-sm text-muted-foreground">{row.email}</p>
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
      key: "position",
      header: "Position",
      cell: (row: Employee) => row.position,
    },
    {
      key: "joinDate",
      header: "Join Date",
      cell: (row: Employee) => <span className="font-mono text-sm text-muted-foreground">{row.joinDate}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Employee) => (
        <StatusBadge variant={statusVariant(row.status)} dot className="capitalize">
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
              label: "View Details",
              icon: <Eye className="h-4 w-4" />,
              onClick: () => {
                setSelectedEmployee(row)
                setShowDetailDialog(true)
              },
            },
            {
              label: "Edit",
              icon: <Edit className="h-4 w-4" />,
              onClick: () => toast.info(`Edit ${row.name}`),
            },
            {
              label: "Delete",
              icon: <Trash2 className="h-4 w-4" />,
              onClick: () => toast.error(`Delete ${row.name}`),
              destructive: true,
              separator: true,
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
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "On Leave", value: "on-leave" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Employees"
        subtitle="Manage your organization's employees"
        breadcrumbs={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Employees" }]}
        action={{
          label: "Add Employee",
          onClick: () => toast.info("Add employee form would open here"),
          icon: <Plus className="mr-2 h-4 w-4" />,
        }}
      />

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6 p-4 lg:p-6">
          <motion.div variants={staggerItem}>
            <SectionCard>
              <div className="space-y-4">
                <TableFilters searchPlaceholder="Search employees..." filters={filters} />
                <DataTable
                  columns={columns}
                  data={employees}
                  emptyTitle="No employees found"
                  emptyDescription="No employees match your current filters"
                />
              </div>
            </SectionCard>
          </motion.div>
        </motion.div>
      )}

      <EmployeeDetailDialog open={showDetailDialog} onOpenChange={setShowDetailDialog} employee={selectedEmployee} />
    </div>
  )
}
