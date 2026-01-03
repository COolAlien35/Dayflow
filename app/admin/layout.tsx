"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { adminNavGroups } from "@/lib/navigation"
import { getMyProfile } from "@/lib/api"
import type { User } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getMyProfile()
        const fullName = profile.profile
          ? `${profile.profile.first_name} ${profile.profile.last_name}`.trim()
          : profile.user.email.split('@')[0]
        
        setUser({
          id: String(profile.user.id),
          name: fullName || 'Admin',
          email: profile.user.email,
          role: profile.user.role.toLowerCase() as 'employee' | 'admin',
          department: profile.profile?.department || undefined,
          position: profile.profile?.position || undefined,
          joinDate: profile.profile?.date_of_joining || undefined,
        })
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        // Redirect to login if not authenticated
        window.location.href = '/auth/login'
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <AppShell user={user} navGroups={adminNavGroups}>
      {children}
    </AppShell>
  )
}
