import type React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { adminUser } from "@/lib/mock-data"
import { adminNavGroups } from "@/lib/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell user={adminUser} navGroups={adminNavGroups}>
      {children}
    </AppShell>
  )
}
