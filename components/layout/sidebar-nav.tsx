"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { NavGroup } from "@/lib/types"
import { getIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { staggerContainer, staggerItem } from "@/lib/motion"

interface SidebarNavProps {
  navGroups: NavGroup[]
  collapsed: boolean
  onToggleCollapse?: () => void
  onClose?: () => void
}

export function SidebarNav({ navGroups, collapsed, onToggleCollapse, onClose }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] shadow-lg shadow-[hsl(168_76%_40%_/_0.2)]">
              <span className="text-sm font-bold text-white">D</span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(168_76%_40%_/_0.3)] to-transparent opacity-0 transition-opacity hover:opacity-100" />
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-semibold tracking-tight text-sidebar-foreground"
                >
                  Dayflow
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          {/* Mobile close button */}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
            {navGroups.map((group) => (
              <motion.div key={group.title} variants={staggerItem}>
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70"
                    >
                      {group.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const Icon = getIcon(item.icon)

                    const linkContent = (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                          collapsed && "justify-center px-2",
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[hsl(168_76%_40%_/_0.1)] to-transparent"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <Icon
                          className={cn(
                            "relative h-5 w-5 shrink-0 transition-colors",
                            isActive
                              ? "text-[hsl(168_76%_40%)]"
                              : "text-muted-foreground group-hover:text-sidebar-foreground",
                          )}
                        />
                        <AnimatePresence mode="wait">
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="relative flex-1 truncate"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {!collapsed && item.badge !== undefined && item.badge > 0 && (
                          <span className="relative flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(168_76%_40%)] px-1.5 text-[10px] font-semibold text-white shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )

                    return (
                      <li key={item.href}>
                        {collapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-2">
                              {item.title}
                              {item.badge !== undefined && item.badge > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(168_76%_40%)] px-1.5 text-[10px] font-semibold text-white">
                                  {item.badge}
                                </span>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          linkContent
                        )}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        {/* Collapse Toggle */}
        {onToggleCollapse && (
          <div className="border-t border-sidebar-border p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="w-full justify-center text-muted-foreground hover:text-foreground"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="ml-2">Collapse</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
