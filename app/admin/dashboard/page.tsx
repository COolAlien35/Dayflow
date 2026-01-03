"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { NoteBlock } from "@/components/layout/note-block"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Clock, CheckSquare, DollarSign, ArrowRight, AlertTriangle, Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, dashboardAnimationOptions } from "@/lib/motion/index"
import { getAdminDashboard, getMyProfile, AdminDashboard, UserProfile } from "@/lib/api"
import { toast } from "sonner"

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<AdminDashboard | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashboard, profile] = await Promise.all([
          getAdminDashboard(),
          getMyProfile()
        ])
        setDashboardData(dashboard)
        setUserProfile(profile)
      } catch (error) {
        console.error("Failed to load admin dashboard data", error)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const pendingLeaves = dashboardData?.pending_leave_requests || []
  const pendingCount = dashboardData?.pending_approvals || 0

  const alerts = pendingCount > 0
    ? [{ id: 1, message: `${pendingCount} pending leave request${pendingCount > 1 ? 's' : ''} require${pendingCount === 1 ? 's' : ''} your approval`, type: "warning", icon: AlertTriangle }]
    : []

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[hsl(168_76%_40%)]" />
      </div>
    )
  }

  const userName = userProfile?.profile
    ? userProfile.profile.first_name
    : userProfile?.user.email.split("@")[0] || "Admin"

  return (
    <div className="min-h-screen">
      <div ref={pageTitleRef} className="dashboard-page-title">
        <PageHeader
          title={`Welcome back, ${userName}`}
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
            value={dashboardData?.total_employees || 0}
            subtitle="registered"
            icon={<Users className="h-5 w-5" />}
            delay={0.1}
          />
          <StatCard
            title="Present Today"
            value={dashboardData?.present_today || 0}
            subtitle={`${dashboardData?.on_leave_today || 0} on leave`}
            icon={<Clock className="h-5 w-5" />}
            delay={0.15}
          />
          <StatCard
            title="Pending Approvals"
            value={pendingCount}
            subtitle="Leave requests"
            icon={<CheckSquare className="h-5 w-5" />}
            delay={0.2}
          />
          <StatCard
            title="On Leave Today"
            value={dashboardData?.on_leave_today || 0}
            subtitle="employees"
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
                          <AvatarImage src="/placeholder.svg" alt={`User ${request.user_id}`} />
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
                            U{request.user_id}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Employee #{request.user_id}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {request.leave_type} leave • {request.start_date}
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
              title="Today's Attendance Overview"
              delay={0.35}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-emerald-50 dark:bg-emerald-950/20 p-5">
                  <p className="text-sm font-medium text-muted-foreground">Present</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-400">{dashboardData?.attendance_overview?.present || 0}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-rose-50 dark:bg-rose-950/20 p-5">
                  <p className="text-sm font-medium text-muted-foreground">Absent</p>
                  <p className="mt-1 text-3xl font-bold text-rose-700 dark:text-rose-400">{dashboardData?.attendance_overview?.absent || 0}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-sky-50 dark:bg-sky-950/20 p-5">
                  <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                  <p className="mt-1 text-3xl font-bold text-sky-700 dark:text-sky-400">{dashboardData?.attendance_overview?.on_leave || 0}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-amber-50 dark:bg-amber-950/20 p-5">
                  <p className="text-sm font-medium text-muted-foreground">Half Day</p>
                  <p className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400">{dashboardData?.attendance_overview?.half_day || 0}</p>
                </div>
              </div>
            </SectionCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
