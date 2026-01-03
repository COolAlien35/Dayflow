"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { TabsNav } from "@/components/ui/tabs-nav"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { notifications } from "@/lib/mock-data"
import { containerVariants } from "@/lib/motion"
import { Bell, Check, CheckCheck, Trash2, Calendar, DollarSign, FileText, Users } from "lucide-react"
import { toast } from "sonner"

const allNotifications = [
  ...notifications,
  {
    id: "n-4",
    title: "Attendance reminder",
    message: "Don't forget to check out before leaving today.",
    time: "5 days ago",
    read: true,
    type: "attendance",
  },
  {
    id: "n-5",
    title: "New team member",
    message: "David Martinez has joined the Engineering team.",
    time: "1 week ago",
    read: true,
    type: "team",
  },
  {
    id: "n-6",
    title: "Leave balance updated",
    message: "Your annual leave balance has been updated for 2025.",
    time: "2 weeks ago",
    read: true,
    type: "leave",
  },
]

export default function SharedNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(allNotifications)

  const unreadNotifications = notificationsList.filter((n) => !n.read)
  const filteredNotifications = activeTab === "unread" ? unreadNotifications : notificationsList

  const getIcon = (type?: string) => {
    switch (type) {
      case "leave":
        return <Calendar className="h-5 w-5" />
      case "payroll":
        return <DollarSign className="h-5 w-5" />
      case "attendance":
        return <Bell className="h-5 w-5" />
      case "policy":
        return <FileText className="h-5 w-5" />
      case "team":
        return <Users className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconColor = (type?: string, read?: boolean) => {
    if (read) return "bg-muted text-muted-foreground"
    switch (type) {
      case "leave":
        return "bg-info/10 text-info"
      case "payroll":
        return "bg-success/10 text-success"
      case "attendance":
        return "bg-warning/10 text-warning"
      case "team":
        return "bg-accent/10 text-accent"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotificationsList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    toast.success("Marked as read")
  }

  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id))
    toast.success("Notification deleted")
  }

  const handleClearAll = () => {
    setNotificationsList([])
    toast.success("All notifications cleared")
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with the latest activities"
        breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Notifications" }]}
        action={
          unreadNotifications.length > 0
            ? {
                label: "Mark all as read",
                onClick: handleMarkAllAsRead,
                icon: <CheckCheck className="mr-2 h-4 w-4" />,
              }
            : undefined
        }
      />

      <motion.div className="p-4 lg:p-6" variants={containerVariants} initial="hidden" animate="visible">
        <SectionCard>
          <TabsNav
            tabs={[
              { id: "all", label: "All", count: notificationsList.length },
              { id: "unread", label: "Unread", count: unreadNotifications.length },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    layout
                    className={`group relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${
                      notification.read
                        ? "border-border/50 bg-background hover:bg-muted/30"
                        : "border-primary/20 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10"
                    }`}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary"
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`rounded-xl p-2.5 ${getIconColor((notification as { type?: string }).type, notification.read)}`}
                    >
                      {getIcon((notification as { type?: string }).type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${notification.read ? "text-foreground" : "text-foreground"}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-2 w-2 rounded-full bg-primary"
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        </motion.div>
                      )}
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {notificationsList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center pt-6"
                >
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="text-muted-foreground hover:text-destructive hover:border-destructive/50 bg-transparent"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Notifications
                  </Button>
                </motion.div>
              )}
            </div>
          ) : (
            <EmptyState
              icon={<Bell className="h-6 w-6" />}
              title={activeTab === "unread" ? "No unread notifications" : "No notifications"}
              description={
                activeTab === "unread"
                  ? "You're all caught up! No unread notifications at the moment."
                  : "You don't have any notifications yet."
              }
              action={
                activeTab === "unread" ? (
                  <Button variant="outline" onClick={() => setActiveTab("all")}>
                    View All Notifications
                  </Button>
                ) : undefined
              }
            />
          )}
        </SectionCard>
      </motion.div>
    </div>
  )
}
