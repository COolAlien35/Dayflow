"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { fadeInUp } from "@/lib/motion"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("relative flex flex-col items-center justify-center overflow-hidden py-16 text-center", className)}
    >
      {/* Fog background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(168_76%_40%_/_0.02)] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(168_76%_40%_/_0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[hsl(168_76%_40%_/_0.08)] to-[hsl(161_94%_40%_/_0.04)] p-4 text-[hsl(168_76%_40%)]"
          >
            {icon}
          </motion.div>
        )}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-lg font-semibold text-foreground"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-2 max-w-sm text-sm text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="mt-6"
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
