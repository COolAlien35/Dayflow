"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
  delay?: number
  noPadding?: boolean
}

export function SectionContainer({
  children,
  className,
  title,
  subtitle,
  action,
  delay = 0,
  noPadding = false,
}: SectionContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("rounded-xl border border-border/50 bg-card/80 shadow-sm backdrop-blur-sm dark:bg-card/90", className)}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div>
            {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
    </motion.div>
  )
}
