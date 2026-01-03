"use client"

import type { Employee } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Mail, Phone, Building2 } from "lucide-react"

interface EmployeeCardProps {
  employee: Employee
  onClick?: () => void
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const statusVariant =
    employee.status === "active" ? "success" : employee.status === "on-leave" ? "warning" : "default"

  return (
    <Card
      className="cursor-pointer border-border transition-shadow hover:shadow-md"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">{employee.name}</h3>
              <StatusBadge variant={statusVariant} className="capitalize">
                {employee.status.replace("-", " ")}
              </StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">{employee.position}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {employee.department}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {employee.phone}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
