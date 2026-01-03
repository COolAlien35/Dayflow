"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function FogBackground() {
  const { scrollY } = useScroll()
  const fogY1 = useTransform(scrollY, [0, 500], [0, -50])
  const fogY2 = useTransform(scrollY, [0, 500], [0, -30])
  const fogOpacity = useTransform(scrollY, [0, 300], [1, 0.6])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient - light mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(170_20%_98%)] via-[hsl(168_76%_99%)] to-[hsl(170_20%_98%)] dark:from-[hsl(200_20%_7%)] dark:via-[hsl(168_30%_12%)] dark:to-[hsl(200_20%_7%)]" />

      {/* Primary fog layer - teal tint */}
      <motion.div style={{ y: fogY1, opacity: fogOpacity }} className="absolute -top-20 left-0 right-0 h-[600px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,hsl(168_76%_40%_/_0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,hsl(168_76%_40%_/_0.08),transparent_70%)]" />
      </motion.div>

      {/* Secondary fog layer - cyan accent */}
      <motion.div style={{ y: fogY2, opacity: fogOpacity }} className="absolute top-40 left-0 right-0 h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_30%,hsl(161_94%_40%_/_0.025),transparent_60%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_70%_30%,hsl(161_94%_40%_/_0.05),transparent_60%)]" />
      </motion.div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%230D4A4A' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

