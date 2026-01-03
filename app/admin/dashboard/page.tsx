"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { NoteBlock } from "@/components/layout/note-block"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { employees, leaveRequests, adminUser } from "@/lib/mock-data"
import { Users, Clock, CheckSquare, DollarSign, ArrowRight, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, dashboardAnimationOptions } from "@/lib/motion/index"

export default function AdminDashboardPage() {
  const activeEmployees = employees.filter((e) => e.status === "active").length
  const pendingLeaves = leaveRequests.filter((l) => l.status === "pending")
  const onLeaveEmployees = employees.filter((e) => e.status === "on-leave").length

  const alerts = [
    { id: 1, message: "2 pending leave requests require your approval", type: "warning", icon: AlertTriangle },
    { id: 2, message: "January payroll processing deadline in 3 days", type: "info", icon: Info },
  ]

  // Refs for scroll animations
  const pageTitleRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)

  // Apply scroll animations
  useScrollAnimation(pageTitleRef, {
    from: dashboardAnimationOptions.pageTitle.from,
    to: dashboardAnimationOptions.pageTitle.to,
    start: dashboardAnimationOptions.pageTitle.start,
  })

  useScrollAnimation(statsGridRef, {
    from: dashboardAnimationOptions.featureCards.from,
    to: dashboardAnimationOptions.featureCards.to,
    start: dashboardAnimationOptions.featureCards.start,
  })

  useScrollAnimation(sectionsRef, {
    from: dashboardAnimationOptions.featureCards.from,
    to: dashboardAnimationOptions.featureCards.to,
    start: dashboardAnimationOptions.featureCards.start,
  })

  return (
    <div className="min-h-screen">
      <div ref={pageTitleRef} className="dashboard-page-title">
        <PageHeader
          title={`Welcome back, ${adminUser.name.split(" ")[0]}`}
          subtitle="Here's an overview of your organization"
          breadcrumbs={[{ label: "Admin Dashboard" }]}
        />
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6 p-4 lg:p-6">
        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div variants={staggerItem} className="space-y-2">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NoteBlock
                  variant={alert.type === "warning" ? "warning" : "info"}
                  icon={<alert.icon className="h-4 w-4" />}
                  disableAnimation={true}
                >
                  <span className="text-sm font-medium">{alert.message}</span>
                </NoteBlock>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Grid */}
        <div ref={statsGridRef} className="dashboard-feature-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={employees.length}
            subtitle={`${activeEmployees} active`}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 5, label: "this month", positive: true }}
            delay={0.1}
          />
          <StatCard
            title="Present Today"
            value={activeEmployees - onLeaveEmployees}
            subtitle={`${onLeaveEmployees} on leave`}
            icon={<Clock className="h-5 w-5" />}
            delay={0.15}
          />
          <StatCard
            title="Pending Approvals"
            value={pendingLeaves.length}
            subtitle="Leave requests"
            icon={<CheckSquare className="h-5 w-5" />}
            delay={0.2}
          />
          <StatCard
            title="Monthly Payroll"
            value="$48.5K"
            subtitle="January 2025"
            icon={<DollarSign className="h-5 w-5" />}
            delay={0.25}
          />
        </div>

        <div ref={sectionsRef} className="dashboard-feature-card-grid grid gap-6 lg:grid-cols-2">
          {/* Pending Leave Approvals */}
          <motion.div variants={staggerItem}>
            <SectionCard
              title="Pending Leave Approvals"
              delay={0.3}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[hsl(168_76%_40%)] hover:text-[hsl(168_76%_35%)]"
                >
                  <Link href="/admin/leave-approvals">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              }
            >
              <div className="space-y-3">
                {pendingLeaves.length > 0 ? (
                  pendingLeaves.slice(0, 3).map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-border/50">
                          <AvatarImage src="/placeholder.svg" alt={request.employeeName} />
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
                            {request.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.employeeName}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {request.type} leave • {request.startDate}
                          </p>
                        </div>
                      </div>
                      <StatusBadge variant="pending" dot>
                        Pending
                      </StatusBadge>
                    </motion.div>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">No pending approvals</p>
                )}
              </div>
            </SectionCard>
          </motion.div>

          {/* Recent Employees */}
          <motion.div variants={staggerItem}>
            <SectionCard
              title="Recent Employees"
              delay={0.35}
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[hsl(168_76%_40%)] hover:text-[hsl(168_76%_35%)]"
                >
                  <Link href="/admin/employees">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              }
            >
              <div className="space-y-3">
                {employees.slice(0, 4).map((employee, index) => {
                  const statusVariant =
                    employee.status === "active" ? "success" : employee.status === "on-leave" ? "warning" : "default"

                  return (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-border/50">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {employee.position} • {employee.department}
                          </p>
                        </div>
                      </div>
                      <StatusBadge variant={statusVariant} dot className="capitalize">
                        {employee.status.replace("-", " ")}
                      </StatusBadge>
                    </motion.div>
                  )
                })}
              </div>
            </SectionCard>
          </motion.div>
        </div>

        {/* Department Overview */}
        <motion.div variants={staggerItem}>
          <SectionCard title="Department Overview" delay={0.4}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["Engineering", "Design", "Marketing", "Finance"].map((dept, index) => {
                const count = employees.filter((e) => e.department === dept).length
                const colors = [
                  "from-[hsl(168_76%_40%_/_0.1)] to-[hsl(168_76%_40%_/_0.02)]",
                  "from-[hsl(161_94%_40%_/_0.15)] to-[hsl(161_94%_40%_/_0.02)]",
                  "from-emerald-500/10 to-emerald-500/2",
                  "from-amber-500/10 to-amber-500/2",
                ]
                return (
                  <motion.div
                    key={dept}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={`rounded-xl border border-border/50 bg-gradient-to-br ${colors[index]} p-5`}
                  >
                    <p className="text-sm font-medium text-muted-foreground">{dept}</p>
                    <p className="mt-1 text-3xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">employees</p>
                  </motion.div>
                )
              })}
            </div>
          </SectionCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
