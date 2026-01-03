"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { containerVariants, itemVariants } from "@/lib/motion"
import { toast } from "sonner"
import { Building2, Clock, Calendar, Settings2 } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Admin Settings"
        subtitle="Configure system-wide settings and preferences"
        breadcrumbs={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Settings" }]}
      />

      <motion.div className="space-y-6 p-4 lg:p-6" variants={containerVariants} initial="hidden" animate="visible">
        {/* Company Information */}
        <motion.div variants={itemVariants}>
          <SectionCard
            title="Company Information"
            description="Basic company details for the HRMS"
            icon={<Building2 className="h-5 w-5 text-primary" />}
          >
            <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  defaultValue="Dayflow Inc."
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail" className="text-sm font-medium">
                  Company Email
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  defaultValue="hr@dayflow.com"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="companyAddress" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="companyAddress"
                  defaultValue="123 Business Ave, San Francisco, CA 94102"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => toast.success("Company information saved")}
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </Button>
            </div>
          </SectionCard>
        </motion.div>

        {/* Work Hours */}
        <motion.div variants={itemVariants}>
          <SectionCard
            title="Work Hours"
            description="Configure standard work hours and overtime settings"
            icon={<Clock className="h-5 w-5 text-primary" />}
          >
            <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="workStart" className="text-sm font-medium">
                  Work Start Time
                </Label>
                <Select defaultValue="09:00">
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="08:30">8:30 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="09:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEnd" className="text-sm font-medium">
                  Work End Time
                </Label>
                <Select defaultValue="18:00">
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="17:30">5:30 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="18:30">6:30 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workDays" className="text-sm font-medium">
                  Work Days Per Week
                </Label>
                <Select defaultValue="5">
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium">
                  Timezone
                </Label>
                <Select defaultValue="america/los_angeles">
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => toast.success("Work hours updated")}
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </Button>
            </div>
          </SectionCard>
        </motion.div>

        {/* Leave Policies */}
        <motion.div variants={itemVariants}>
          <SectionCard
            title="Leave Policies"
            description="Configure annual leave allocations"
            icon={<Calendar className="h-5 w-5 text-primary" />}
          >
            <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="annualLeave" className="text-sm font-medium">
                  Annual Leave (days)
                </Label>
                <Input
                  id="annualLeave"
                  type="number"
                  defaultValue="15"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sickLeave" className="text-sm font-medium">
                  Sick Leave (days)
                </Label>
                <Input
                  id="sickLeave"
                  type="number"
                  defaultValue="10"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalLeave" className="text-sm font-medium">
                  Personal Leave (days)
                </Label>
                <Input
                  id="personalLeave"
                  type="number"
                  defaultValue="5"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carryOver" className="text-sm font-medium">
                  Max Carry Over (days)
                </Label>
                <Input
                  id="carryOver"
                  type="number"
                  defaultValue="5"
                  className="bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => toast.success("Leave policies updated")}
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </Button>
            </div>
          </SectionCard>
        </motion.div>

        {/* System Preferences */}
        <motion.div variants={itemVariants}>
          <SectionCard
            title="System Preferences"
            description="Toggle system-wide features"
            icon={<Settings2 className="h-5 w-5 text-primary" />}
          >
            <div className="max-w-2xl space-y-3">
              {[
                {
                  title: "Email Notifications",
                  description: "Send email alerts for leave approvals and payroll",
                  defaultChecked: true,
                },
                {
                  title: "Auto Check-out",
                  description: "Automatically check out employees at end of day",
                  defaultChecked: true,
                },
                {
                  title: "Weekend Attendance",
                  description: "Allow attendance tracking on weekends",
                  defaultChecked: false,
                },
                {
                  title: "Public Holidays",
                  description: "Automatically mark public holidays in calendar",
                  defaultChecked: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
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
      </motion.div>
    </div>
  )
}
