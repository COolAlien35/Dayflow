"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SectionCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
  action?: React.ReactNode
  delay?: number
}

export function SectionCard({
  title,
  description,
  children,
  className,
  contentClassName,
  action,
  delay = 0,
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card
        className={cn(
          "border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:bg-card/90",
          className,
        )}
      >
        {(title || description) && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
              {description && <CardDescription className="mt-1">{description}</CardDescription>}
            </div>
            {action}
          </CardHeader>
        )}
        <CardContent className={cn(!(title || description) && "pt-6", contentClassName)}>{children}</CardContent>
      </Card>
    </motion.div>
  )
}
