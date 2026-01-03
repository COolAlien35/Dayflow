import type React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { currentUser } from "@/lib/mock-data"
import { employeeNavGroups } from "@/lib/navigation"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell user={currentUser} navGroups={employeeNavGroups}>
      {children}
    </AppShell>
  )
}
