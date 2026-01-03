"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import type { Employee } from "@/lib/types"
import { Mail, Phone, Building2, Calendar, Briefcase, DollarSign } from "lucide-react"

interface EmployeeDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
}

export function EmployeeDetailDialog({ open, onOpenChange, employee }: EmployeeDetailDialogProps) {
  if (!employee) return null

  const statusVariant =
    employee.status === "active" ? "success" : employee.status === "on-leave" ? "warning" : "default"

  const details = [
    { icon: Mail, label: "Email", value: employee.email },
    { icon: Phone, label: "Phone", value: employee.phone },
    { icon: Building2, label: "Department", value: employee.department },
    { icon: Briefcase, label: "Position", value: employee.position },
    { icon: Calendar, label: "Join Date", value: employee.joinDate },
    {
      icon: DollarSign,
      label: "Annual Salary",
      value: employee.salary ? `$${employee.salary.toLocaleString()}` : "Confidential",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="bg-primary/10 text-lg text-primary">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
              <StatusBadge variant={statusVariant} className="mt-1 capitalize">
                {employee.status.replace("-", " ")}
              </StatusBadge>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <detail.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{detail.label}</p>
                  <p className="text-sm font-medium">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
