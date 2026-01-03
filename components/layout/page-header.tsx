"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { fadeInUp } from "@/lib/motion"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: {
    label: string
    onClick?: () => void
    href?: string
    icon?: React.ReactNode
  }
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, breadcrumbs, action, children }: PageHeaderProps) {
  const { scrollY } = useScroll()
  const headerPadding = useTransform(scrollY, [0, 100], [24, 16])
  const titleSize = useTransform(scrollY, [0, 100], [1.5, 1.25])

  return (
    <motion.div
      style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
      className="relative border-b border-border/50 bg-background/50 px-4 backdrop-blur-sm lg:px-6"
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(168_76%_40%_/_0.02)] via-transparent to-[hsl(161_94%_40%_/_0.02)]" />

      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3 flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
                {item.href ? (
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title and Action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <motion.h1 style={{ fontSize: `${titleSize}rem` }} className="font-semibold tracking-tight text-foreground">
              {title}
            </motion.h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {children}
            {action && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {action.href ? (
                  <Button
                    asChild
                    className="bg-[hsl(174_70%_17%)] shadow-lg shadow-[hsl(174_70%_17%_/_0.2)] hover:bg-[hsl(174_70%_22%)]"
                  >
                    <Link href={action.href}>
                      {action.icon}
                      {action.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={action.onClick}
                    className="bg-[hsl(174_70%_17%)] shadow-lg shadow-[hsl(174_70%_17%_/_0.2)] hover:bg-[hsl(174_70%_22%)]"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
