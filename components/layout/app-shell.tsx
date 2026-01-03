"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarNav } from "./sidebar-nav"
import { HeaderBar } from "./header-bar"
import { FogBackground } from "./fog-background"
import type { User, NavGroup } from "@/lib/types"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { sidebarTransition, pageTransition } from "@/lib/motion"
import { useMountAnimation, dashboardAnimationOptions } from "@/lib/motion/index"

interface AppShellProps {
  children: React.ReactNode
  user: User
  navGroups: NavGroup[]
  showFog?: boolean
}

export function AppShell({ children, user, navGroups, showFog = true }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ref for sidebar animation
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Apply mount animation to sidebar
  useMountAnimation(sidebarRef, {
    from: dashboardAnimationOptions.sidebar.from,
    to: dashboardAnimationOptions.sidebar.to,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fog Background */}
      {showFog && <FogBackground />}

      {/* Desktop Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={sidebarTransition}
        className="dashboard-sidebar fixed inset-y-0 left-0 z-50 hidden border-r border-sidebar-border bg-sidebar/95 backdrop-blur-sm lg:block"
      >
        <SidebarNav
          navGroups={navGroups}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </motion.aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 border-r border-sidebar-border bg-sidebar/95 p-0 backdrop-blur-sm">
          <SidebarNav navGroups={navGroups} collapsed={false} onClose={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ paddingLeft: sidebarCollapsed ? 72 : 260 }}
        transition={sidebarTransition}
        className="relative min-h-screen transition-colors lg:pl-[260px]"
        style={{ paddingLeft: 0 }}
      >
        <div className="lg:hidden" />
        <HeaderBar user={user} onMenuClick={() => setSidebarOpen(true)} />
        <AnimatePresence mode="wait">
          <motion.main
            key="main-content"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            className="relative min-h-[calc(100vh-4rem)]"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
