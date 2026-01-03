"use client"

import type React from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/motion"
import { MotionSystemProvider } from "@/lib/motion/index"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionSystemProvider>
      <div className="flex min-h-screen">
        {/* Left Panel - Premium Branding */}
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[hsl(174_70%_17%)] p-10 lg:flex">
          {/* Fog/gradient effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(168_76%_40%_/_0.15)] via-transparent to-[hsl(161_94%_40%_/_0.1)]" />
            <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[hsl(168_76%_40%_/_0.2)] blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[hsl(161_94%_40%_/_0.15)] blur-[80px]" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 shadow-lg shadow-black/10 backdrop-blur-sm">
              <span className="text-lg font-bold text-white">D</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Dayflow HRMS</span>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="relative space-y-8">
            <motion.blockquote variants={staggerItem} className="space-y-4">
              <p className="text-3xl font-medium leading-relaxed tracking-tight text-white text-balance">
                "Every workday, perfectly aligned."
              </p>
              <p className="max-w-md text-base leading-relaxed text-white/70">
                Streamline your HR operations with our comprehensive management system. From attendance tracking to
                payroll processing, Dayflow has you covered.
              </p>
            </motion.blockquote>

            <motion.div variants={staggerItem} className="flex gap-4">
              {[
                { value: "500+", label: "Companies" },
                { value: "50K+", label: "Employees" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative text-sm text-white/40"
          >
            © 2025 Dayflow HRMS. All rights reserved.
          </motion.p>
        </div>

        {/* Right Panel - Form */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background p-6 lg:p-10">
          {/* Subtle fog effect */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(168_76%_99.5%)] to-background dark:via-[hsl(168_30%_12%)]" />
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(168_76%_40%_/_0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,hsl(168_76%_40%_/_0.08)_0%,transparent_70%)]" />
          </div>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </MotionSystemProvider>
  )
}
