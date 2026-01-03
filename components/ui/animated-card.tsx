"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ children, className, delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
    >
      <Card
        className={cn(
          "border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:bg-card/90",
          className,
        )}
      >
        {children}
      </Card>
    </motion.div>
  )
}
