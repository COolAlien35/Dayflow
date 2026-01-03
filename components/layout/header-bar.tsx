"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Bell, Menu, Settings, UserIcon, LogOut, Search } from "lucide-react"
import Link from "next/link"
import { notifications } from "@/lib/mock-data"

interface HeaderBarProps {
  user: User
  onMenuClick: () => void
}

export function HeaderBar({ user, onMenuClick }: HeaderBarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Search bar - desktop only */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-border/50 bg-muted/30 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[hsl(168_76%_40%_/_0.5)] focus:bg-background focus:ring-2 focus:ring-[hsl(168_76%_40%_/_0.1)]"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-[18px] w-[18px]" />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[hsl(168_76%_40%)] px-1 text-[10px] font-semibold text-white shadow-lg shadow-[hsl(168_76%_40%_/_0.3)]"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-border/50 bg-popover/95 backdrop-blur-xl">
              <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start gap-1 p-3 focus:bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-[hsl(168_76%_40%)]" />}
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{notification.message}</span>
                    <span className="text-xs text-muted-foreground/70">{notification.time}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/shared/notifications" className="w-full justify-center text-[hsl(168_76%_40%)]">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 rounded-lg px-2 hover:bg-muted/50">
                <Avatar className="h-8 w-8 ring-2 ring-border/50">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(174_70%_17%)] to-[hsl(168_76%_40%)] text-xs font-semibold text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-[11px] text-muted-foreground capitalize">{user.role}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-border/50 bg-popover/95 backdrop-blur-xl">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={user.role === "admin" ? "/admin/employees" : "/employee/profile"}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/shared/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login" className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
