"use client"

import { useState, useRef, useEffect } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SectionCard } from "@/components/layout/section-card"
import { ProfileEditForm, ProfileFormData } from "@/components/forms/profile-edit-form"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Building2, Calendar, Briefcase, Edit2, MapPin, Users, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useMountAnimation, useScrollAnimation, useHoverAnimation } from "@/lib/motion/hooks"
import { profileAnimationOptions } from "@/lib/motion/animations/profileAnimations"
import { getMyProfile, UserProfile, updateMyProfile } from "@/lib/api"

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<UserProfile | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile()
      setProfileData(data)
    } catch (error) {
      console.error("Failed to fetch profile:", error)
      toast.error("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }

  // Refs for animations
  const avatarRef = useRef<HTMLDivElement>(null)
  const infoRowsRef = useRef<HTMLDivElement>(null)
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const noteBoxRef = useRef<HTMLDivElement>(null)

  // Apply animations
  // useScrollAnimation(avatarRef, profileAnimationOptions.avatar)
  // useMountAnimation(infoRowsRef, profileAnimationOptions.infoRows)
  // useMountAnimation(editButtonRef, profileAnimationOptions.editButton)
  // useHoverAnimation(editButtonRef, profileAnimationOptions.editButtonHover)
  // useScrollAnimation(noteBoxRef, profileAnimationOptions.noteBox)

  const handleSaveProfile = async (data: ProfileFormData) => {
    try {
      await updateMyProfile({
        phone: data.phone,
        address: data.address, // Now strictly typed
      })
      await fetchProfile() // Refresh data
      setIsEditing(false)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile", error)
      toast.error("Failed to update profile")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[hsl(168_76%_40%)]" />
      </div>
    )
  }

  if (!profileData) return null

  const { user, profile } = profileData

  // Construct full name safely
  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : user.email.split("@")[0]

  // Format joining date
  const joiningDate = profile?.date_of_joining
    ? new Date(profile.date_of_joining).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "N/A"

  const profileDetails = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: profile?.phone || "Not set" },
    { icon: Building2, label: "Department", value: profile?.department || "N/A" },
    { icon: Briefcase, label: "Position", value: profile?.position || "N/A" },
    { icon: Calendar, label: "Join Date", value: joiningDate },
  ]

  return (
    <div className="min-h-screen">
      <PageHeader
        title="My Profile"
        subtitle="View and manage your personal information"
        breadcrumbs={[{ label: "Dashboard", href: "/employee/dashboard" }, { label: "Profile" }]}
        action={
          !isEditing
            ? {
              label: "Edit Profile",
              onClick: () => setIsEditing(true),
              icon: <Edit2 className="mr-2 h-4 w-4" />,
            }
            : undefined
        }
      />

      <div className="space-y-6 p-4 lg:p-6">
        {isEditing ? (
          <SectionCard title="Edit Profile">
            <ProfileEditForm
              initialData={{
                name: fullName,
                email: user.email,
                phone: profile?.phone || "",
                address: profile?.address || "",
              }}
              onSubmit={handleSaveProfile}
              onCancel={() => setIsEditing(false)}
            />
          </SectionCard>
        ) : (
          <>
            {/* Profile Header with Avatar */}
            <div>
              <SectionCard>
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <div ref={avatarRef} className="profile-avatar relative">
                    <Avatar className="h-28 w-28 ring-4 ring-[hsl(168_76%_40%_/_0.1)]">
                      <AvatarImage src="/placeholder.svg" alt={fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-2xl font-semibold text-white">
                        {fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white bg-emerald-500" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-semibold">{fullName}</h2>
                    <p className="text-muted-foreground">{profile?.position || "Employee"}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {profile?.department || "No Department"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile?.address || "Location not set"}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button
                        ref={editButtonRef}
                        className="profile-edit-button border-[hsl(168_76%_40%_/_0.3)] text-[hsl(168_76%_40%)] hover:bg-[hsl(168_76%_40%_/_0.05)] bg-transparent"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Profile Details with Info Rows */}
            <div>
              <SectionCard title="Personal Information">
                <div ref={infoRowsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {profileDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="profile-info-row flex items-start gap-3"
                    >
                      <div className="rounded-lg bg-gradient-to-br from-[hsl(168_76%_40%_/_0.1)] to-[hsl(161_94%_40%_/_0.05)] p-2.5">
                        <detail.icon className="h-4 w-4 text-[hsl(168_76%_40%)]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{detail.label}</p>
                        <p className="font-medium">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Employment Info with Note Box */}
            <div ref={noteBoxRef} className="profile-note-box">
              <SectionCard title="Employment Information">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Employee ID</p>
                    <p className="font-mono text-lg font-semibold">{profile?.employee_id || `EMP-${user.id}`}</p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Employment Type</p>
                    <p className="text-lg font-semibold">Full-time</p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Work Location</p>
                    <p className="text-lg font-semibold">{profile?.address ? "Remote/On-site" : "Headquarters"}</p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">Role</p>
                    </div>
                    <p className="text-lg font-semibold">{user.role}</p>
                  </div>
                </div>
              </SectionCard>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
