"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, CheckCircle, TrendingUp, Plus, ArrowRight, Sun, Loader2 } from "lucide-react"
import Link from "next/link"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollAnimation, dashboardAnimationOptions } from "@/lib/motion/index"
import {
  getEmployeeDashboard,
  getNotifications,
  getMyProfile,
  EmployeeDashboard,
  Notification,
  UserProfile
} from "@/lib/api"
import { toast } from "sonner"

export default function EmployeeDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<EmployeeDashboard | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashboard, notifs, profile] = await Promise.all([
          getEmployeeDashboard(),
          getNotifications(1, 4), // Fetch top 4 notifications
          getMyProfile()
        ])
        setDashboardData(dashboard)
        setNotifications(notifs.notifications)
        setUserProfile(profile)
      } catch (error) {
        console.error("Failed to load dashboard data", error)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

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

  const todayAttendance = dashboardData?.today_status
  const attendanceSummary = dashboardData?.attendance_summary
  const pendingLeaves = dashboardData?.pending_leave_count || 0

  // Construct name safely
  const userName = userProfile?.profile
    ? userProfile.profile.first_name
    : userProfile?.user.email.split("@")[0] || "Employee"

  return (
    <div className="min-h-screen">
      <div ref={pageTitleRef} className="dashboard-page-title">
        <PageHeader
          title={`${getGreeting()}, ${userName}`}
          subtitle="Here's what's happening with your work today"
          breadcrumbs={[{ label: "Dashboard" }]}
        />
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6 p-4 lg:p-6">
        {/* Hero Welcome Card */}
        <motion.div
          variants={staggerItem}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_30%)] p-6 text-white shadow-xl shadow-[hsl(174_70%_17%_/_0.2)] md:p-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[hsl(161_94%_40%_/_0.1)] blur-2xl" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/70">
                <Sun className="h-4 w-4" />
                <span className="text-sm">
                  Today, {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
              </div>
              <h2 className="text-xl font-semibold md:text-2xl">
                {todayAttendance?.check_in ? "You're checked in for today" : "Ready to start your day?"}
              </h2>
              <p className="text-sm text-white/70">
                {todayAttendance?.check_in
                  ? `Checked in at ${new Date(todayAttendance.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${todayAttendance.check_out ? ` • Checked out at ${new Date(todayAttendance.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ""}`
                  : "Check in to track your attendance"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild className="bg-white text-[hsl(174_70%_17%)] shadow-lg hover:bg-white/90">
                  <Link href="/employee/attendance">
                    <Clock className="mr-2 h-4 w-4" />
                    {todayAttendance?.check_in && !todayAttendance?.check_out ? "Check Out" : "Check In"}
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                >
                  <Link href="/employee/leave">
                    <Plus className="mr-2 h-4 w-4" />
                    Apply Leave
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div ref={statsGridRef} className="dashboard-feature-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Status"
            value={todayAttendance?.status === "Present" ? "Present" : todayAttendance?.status || "Not Checked In"}
            subtitle={
              todayAttendance?.check_in ? `Checked in at ${new Date(todayAttendance.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Check in to start your day"
            }
            icon={<Clock className="h-5 w-5" />}
            delay={0.1}
          />
          <StatCard
            title="Leave Balance"
            value="12 days"
            subtitle="Annual leave remaining"
            icon={<Calendar className="h-5 w-5" />}
            delay={0.15}
          />
          <StatCard
            title="Attendance Rate"
            value={`${attendanceSummary ? Math.round((attendanceSummary.present_days / (attendanceSummary.total_working_days || 1)) * 100) : 0}%`}
            subtitle="This month"
            icon={<CheckCircle className="h-5 w-5" />}
            trend={{ value: 0, label: "vs last month", positive: true }}
            delay={0.2}
          />
          <StatCard
            title="Pending Requests"
            value={pendingLeaves}
            subtitle="Awaiting approval"
            icon={<TrendingUp className="h-5 w-5" />}
            delay={0.25}
          />
        </div>

        <div ref={sectionsRef} className="dashboard-feature-card-grid grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <SectionCard
            title="Recent Activity"
            delay={0.3}
            action={
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-[hsl(168_76%_40%)] hover:text-[hsl(168_76%_35%)]"
              >
                <Link href="/shared/notifications">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={`mt-1.5 h-2 w-2 rounded-full transition-all ${notification.is_read ? "bg-muted-foreground/30" : "bg-[hsl(168_76%_40%)] shadow-sm shadow-[hsl(168_76%_40%_/_0.3)]"}`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.notification_type.replace(/_/g, " ")}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground/70">{new Date(notification.created_at).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">No recent notifications</p>
              )}
            </div>
          </SectionCard>

          {/* Leave Requests */}
          <SectionCard
            title="My Leave Requests"
            delay={0.35}
            action={
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-[hsl(168_76%_40%)] hover:text-[hsl(168_76%_35%)]"
              >
                <Link href="/employee/leave">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {dashboardData?.recent_leave_requests && dashboardData.recent_leave_requests.length > 0 ? (
                dashboardData.recent_leave_requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.05 }}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium capitalize">{request.leave_type} Leave</p>
                      <p className="text-xs text-muted-foreground">
                        {request.start_date} - {request.end_date}
                      </p>
                    </div>
                    <StatusBadge
                      variant={
                        request.status === "Approved"
                          ? "success"
                          : request.status === "Rejected"
                            ? "destructive"
                            : "pending"
                      }
                      dot
                      className="capitalize"
                    >
                      {request.status}
                    </StatusBadge>
                  </motion.div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No leave requests yet</p>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Attendance This Week */}
        <SectionCard title="Attendance Recent History" delay={0.4}>
          <div className="grid grid-cols-5 gap-2">
            {(dashboardData?.recent_attendance || []).slice(0, 5).map((record, index) => {
              const statusConfig = {
                Present: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
                Absent: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
                "Half-day": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
                "On Leave": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
              } as const;

              const config = record.status && statusConfig[record.status as keyof typeof statusConfig]
                ? statusConfig[record.status as keyof typeof statusConfig]
                : { bg: "bg-muted/30", text: "text-muted-foreground", border: "border-border/50" }

              // Calculate work hours if both check-in/out exist
              let workHours = null;
              if (record.check_in && record.check_out) {
                const start = new Date(record.check_in);
                const end = new Date(record.check_out);
                workHours = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(1);
              }

              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.03 }}
                  className={`flex flex-col items-center rounded-xl border p-3 transition-all hover:shadow-sm ${config.bg} ${config.text} ${config.border}`}
                >
                  <span className="text-xs font-semibold">{new Date(record.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                  <span className="mt-1 text-[10px] capitalize">{record.status || "-"}</span>
                  <span className="mt-0.5 text-[9px] opacity-70">
                    {new Date(record.date).getDate()}
                  </span>
                  {workHours && <span className="mt-0.5 text-[9px] opacity-70">{workHours}h</span>}
                </motion.div>
              )
            })}
            {(dashboardData?.recent_attendance?.length || 0) === 0 && (
              <p className="col-span-5 text-center text-sm text-muted-foreground">No recent attendance records</p>
            )}
          </div>
        </SectionCard>
      </motion.div>
    </div>
  )
}
