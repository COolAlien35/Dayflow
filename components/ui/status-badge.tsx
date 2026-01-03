"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "success" | "warning" | "destructive" | "info" | "outline" | "pending"

interface StatusBadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  animate?: boolean
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  destructive: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
  info: "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400",
  pending: "bg-[hsl(168_76%_97%)] text-[hsl(168_76%_35%)]",
  outline: "border border-border bg-transparent text-foreground",
}

const dotStyles: Record<BadgeVariant, string> = {
  default: "bg-muted-foreground",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  info: "bg-sky-500",
  pending: "bg-[hsl(168_76%_40%)]",
  outline: "bg-foreground",
}

export function StatusBadge({
  variant = "default",
  children,
  className,
  animate = false,
  dot = false,
}: StatusBadgeProps) {
  return (
    <motion.span
      initial={animate ? { opacity: 0, scale: 0.9 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[variant])} />}
      {children}
    </motion.span>
  )
}
