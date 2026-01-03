"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function TabsNav({ tabs, activeTab, onTabChange, className }: TabsNavProps) {
  return (
    <div className={cn("flex gap-1 rounded-lg bg-muted/50 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 rounded-md bg-card shadow-sm dark:bg-card"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative">{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={cn(
                "relative flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs",
                activeTab === tab.id
                  ? "bg-[hsl(168_76%_40%)] text-white"
                  : "bg-muted-foreground/20 text-muted-foreground",
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
