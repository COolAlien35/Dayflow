"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  className?: string
  delay?: number
}

export function StatCard({ title, value, subtitle, icon, trend, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:bg-card/90",
          className,
        )}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(168_76%_40%_/_0)] to-[hsl(161_94%_40%_/_0)] opacity-0 transition-opacity group-hover:opacity-[0.03]" />

        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.1 }}
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                {value}
              </motion.p>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
              {trend && (
                <div
                  className={cn(
                    "mt-2 flex items-center gap-1 text-xs font-medium",
                    trend.positive ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {trend.positive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {trend.positive ? "+" : ""}
                    {trend.value}% {trend.label}
                  </span>
                </div>
              )}
            </div>
            {icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.15 }}
                className="rounded-xl bg-gradient-to-br from-[hsl(168_76%_40%_/_0.1)] to-[hsl(161_94%_40%_/_0.05)] p-3 text-[hsl(168_76%_40%)]"
              >
                {icon}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
