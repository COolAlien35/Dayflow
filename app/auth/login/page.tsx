"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useMountAnimation, useHoverAnimation } from "@/lib/motion/index"
import { authAnimationOptions } from "@/lib/motion/animations/authAnimations"
import { login, APIError } from "@/lib/api"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Refs for GSAP animations
  const cardRef = useRef<HTMLDivElement>(null)
  const inputsRef = useRef<HTMLFormElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const switchLinkRef = useRef<HTMLAnchorElement>(null)

  // Apply GSAP animations
  useMountAnimation(cardRef, authAnimationOptions.card)
  useMountAnimation(inputsRef, authAnimationOptions.inputs)
  useMountAnimation(ctaRef, authAnimationOptions.cta)
  useHoverAnimation(switchLinkRef, authAnimationOptions.switchLinkHover)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      const response = await login({ email, password })
      toast.success("Login successful!")

      // Redirect based on user role
      if (response.role === "Admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/employee/dashboard")
      }
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 401) {
          setErrors({ password: "Invalid email or password" })
        } else {
          toast.error(error.message || "Login failed. Please try again.")
        }
      } else {
        toast.error("Connection error. Please check if the server is running.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={cardRef} className="auth-card w-full max-w-md space-y-8">
      {/* Mobile Logo - Not animated per requirements 5.5 */}
      <div className="flex items-center justify-center gap-3 lg:hidden">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(174_70%_17%)] shadow-lg shadow-[hsl(174_70%_17%_/_0.2)]">
          <span className="text-lg font-bold text-white">D</span>
        </div>
        <span className="text-xl font-semibold tracking-tight">Dayflow HRMS</span>
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form
        ref={inputsRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="auth-input space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
            }}
            className={`h-11 border-border/50 bg-background transition-all focus:border-[hsl(168_76%_40%_/_0.5)] focus:ring-2 focus:ring-[hsl(168_76%_40%_/_0.1)] ${errors.email ? "border-rose-500" : ""}`}
            disabled={isLoading}
          />
          {/* Error messages are not animated per requirements 5.5 */}
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-rose-500"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="auth-input space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link href="#" className="text-sm text-[hsl(168_76%_40%)] transition-colors hover:text-[hsl(168_76%_35%)]">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }))
              }}
              className={`h-11 border-border/50 bg-background pr-11 transition-all focus:border-[hsl(168_76%_40%_/_0.5)] focus:ring-2 focus:ring-[hsl(168_76%_40%_/_0.1)] ${errors.password ? "border-rose-500" : ""}`}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
          {/* Error messages are not animated per requirements 5.5 */}
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-rose-500"
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="auth-input flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-border/50 data-[state=checked]:border-[hsl(168_76%_40%)] data-[state=checked]:bg-[hsl(168_76%_40%)]"
          />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
            Remember me for 30 days
          </Label>
        </div>

        <div ref={ctaRef} className="auth-cta">
          <Button
            type="submit"
            className="h-11 w-full bg-[hsl(174_70%_17%)] text-white shadow-lg shadow-[hsl(174_70%_17%_/_0.2)] transition-all hover:bg-[hsl(174_70%_22%)] hover:shadow-xl hover:shadow-[hsl(174_70%_17%_/_0.25)]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          ref={switchLinkRef}
          href="/auth/signup"
          className="auth-switch-link font-medium text-[hsl(168_76%_40%)] transition-colors hover:text-[hsl(168_76%_35%)]"
        >
          Sign up
        </Link>
      </p>


    </div>
  )
}
