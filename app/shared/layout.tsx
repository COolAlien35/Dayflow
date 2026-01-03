"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { currentUser, adminUser } from "@/lib/mock-data"
import { employeeNavGroups, adminNavGroups } from "@/lib/navigation"

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Determine role from referrer or default to employee
  // In a real app, this would come from auth context
  const isAdmin =
    typeof window !== "undefined" &&
    (document.referrer.includes("/admin") || sessionStorage.getItem("lastRole") === "admin")

  // Store the role for navigation persistence
  if (typeof window !== "undefined") {
    if (pathname.includes("/admin")) {
      sessionStorage.setItem("lastRole", "admin")
    } else if (pathname.includes("/employee")) {
      sessionStorage.setItem("lastRole", "employee")
    }
  }

  const user = isAdmin ? adminUser : currentUser
  const navGroups = isAdmin ? adminNavGroups : employeeNavGroups

  return (
    <AppShell user={user} navGroups={navGroups}>
      {children}
    </AppShell>
  )
}
