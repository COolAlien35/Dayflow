"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser } from "@/lib/mock-data"
import { containerVariants } from "@/lib/motion"
import { Upload, Shield, Bell, Palette, Globe, User, Check } from "lucide-react"
import { toast } from "sonner"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language & Region", icon: Globe },
]

export default function SharedSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and settings"
        breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Settings" }]}
      />

      <div className="p-4 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Navigation */}
          <motion.div
            className="lg:w-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-2">
              <nav className="space-y-1">
                {settingsTabs.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 ${
                        activeTab === item.id
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      {activeTab === item.id && (
                        <motion.div
                          layoutId="settings-tab-bg"
                          className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <Icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="flex-1" variants={containerVariants} initial="hidden" animate="visible">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionCard title="Profile Photo">
                    <div className="flex items-center gap-6">
                      <motion.div whileHover={{ scale: 1.05 }} className="relative">
                        <Avatar className="h-24 w-24 ring-4 ring-primary/10 shadow-xl">
                          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white">
                            {currentUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success border-2 border-background flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Personal Information">
                    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue={currentUser.name.split(" ")[0]}
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue={currentUser.name.split(" ")[1]}
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={currentUser.email}
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          Bio
                        </Label>
                        <Input
                          id="bio"
                          placeholder="Tell us a bit about yourself"
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={() => toast.success("Profile updated successfully")}
                        className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionCard title="Change Password">
                    <div className="max-w-md space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium">
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmNewPassword" className="text-sm font-medium">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmNewPassword"
                          type="password"
                          className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <Button
                        onClick={() => toast.success("Password updated successfully")}
                        className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                      >
                        Update Password
                      </Button>
                    </div>
                  </SectionCard>

                  <SectionCard title="Two-Factor Authentication">
                    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4">
                      <div>
                        <p className="font-medium text-foreground">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </SectionCard>

                  <SectionCard title="Active Sessions">
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between rounded-xl border border-success/30 bg-success/5 p-4"
                      >
                        <div>
                          <p className="font-medium text-foreground">Current Session</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA - Chrome on MacOS</p>
                          <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                        </div>
                        <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
                          Active
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4"
                      >
                        <div>
                          <p className="font-medium text-foreground">iPhone 14 Pro</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA - Safari on iOS</p>
                          <p className="text-xs text-muted-foreground">Last active 1 day ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </motion.div>
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionCard title="Email Notifications">
                    <div className="space-y-3">
                      {[
                        {
                          title: "Leave Requests",
                          description: "Get notified when your leave request is approved or rejected",
                          defaultChecked: true,
                        },
                        {
                          title: "Payroll Updates",
                          description: "Receive notifications when your salary is credited",
                          defaultChecked: true,
                        },
                        {
                          title: "Attendance Reminders",
                          description: "Daily reminders to check in and check out",
                          defaultChecked: false,
                        },
                        {
                          title: "Policy Updates",
                          description: "Be informed about company policy changes",
                          defaultChecked: true,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="Push Notifications">
                    <div className="space-y-3">
                      {[
                        {
                          title: "Desktop Notifications",
                          description: "Show notifications on your desktop",
                          defaultChecked: false,
                        },
                        {
                          title: "Mobile Notifications",
                          description: "Receive push notifications on your phone",
                          defaultChecked: true,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionCard title="Theme">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Color Theme</p>
                          <p className="text-sm text-muted-foreground">Select your preferred color theme</p>
                        </div>
                        <Select defaultValue="light">
                          <SelectTrigger className="w-32 bg-muted/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4">
                        <div>
                          <p className="font-medium text-foreground">Compact Mode</p>
                          <p className="text-sm text-muted-foreground">Reduce spacing for a denser interface</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Sidebar">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Default State</p>
                          <p className="text-sm text-muted-foreground">Sidebar default state on page load</p>
                        </div>
                        <Select defaultValue="expanded">
                          <SelectTrigger className="w-32 bg-muted/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="expanded">Expanded</SelectItem>
                            <SelectItem value="collapsed">Collapsed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {activeTab === "language" && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionCard title="Language & Region">
                    <div className="max-w-md space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="bg-muted/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="en-gb">English (UK)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Timezone</Label>
                        <Select defaultValue="america/los_angeles">
                          <SelectTrigger className="bg-muted/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                            <SelectItem value="europe/london">GMT (London)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger className="bg-muted/50 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => toast.success("Preferences saved")}
                        className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </SectionCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
