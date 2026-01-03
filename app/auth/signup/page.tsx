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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useMountAnimation, useHoverAnimation } from "@/lib/motion/index"
import { authAnimationOptions } from "@/lib/motion/animations/authAnimations"
import { signup, APIError } from "@/lib/api"
import { toast } from "sonner"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
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
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.department) newErrors.department = "Please select a department"
    if (!acceptTerms) newErrors.terms = "You must accept the terms and conditions"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        role: 'Employee', // Default to Employee role for self-registration
      })
      toast.success("Account created successfully! Please login.")
      router.push("/auth/login")
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 409) {
          setErrors({ email: "This email is already registered" })
        } else if (error.status === 400) {
          toast.error(error.message || "Invalid data. Please check your inputs.")
        } else {
          toast.error(error.message || "Signup failed. Please try again.")
        }
      } else {
        toast.error("Connection error. Please check if the server is running.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const inputClassName = (hasError: boolean) =>
    `h-11 border-border/50 bg-background transition-all focus:border-[hsl(168_76%_40%_/_0.5)] focus:ring-2 focus:ring-[hsl(168_76%_40%_/_0.1)] ${hasError ? "border-rose-500" : ""}`

  return (
    <div ref={cardRef} className="auth-card w-full max-w-md space-y-6">
      {/* Mobile Logo - Not animated per requirements 5.5 */}
      <div className="flex items-center justify-center gap-3 lg:hidden">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(174_70%_17%)] shadow-lg shadow-[hsl(174_70%_17%_/_0.2)]">
          <span className="text-lg font-bold text-white">D</span>
        </div>
        <span className="text-xl font-semibold tracking-tight">Dayflow HRMS</span>
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to get started with Dayflow
        </p>
      </div>

      <form
        ref={inputsRef}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="auth-input space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClassName(!!errors.name)}
            disabled={isLoading}
          />
          {/* Error messages are not animated per requirements 5.5 */}
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-rose-500"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="auth-input space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Work Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClassName(!!errors.email)}
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
          <Label htmlFor="department" className="text-sm font-medium">
            Department
          </Label>
          <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
            <SelectTrigger
              className={`h-11 border-border/50 bg-background transition-all focus:border-[hsl(168_76%_40%_/_0.5)] focus:ring-2 focus:ring-[hsl(168_76%_40%_/_0.1)] ${errors.department ? "border-rose-500" : ""}`}
            >
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent className="border-border/50 bg-popover/95 backdrop-blur-xl">
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
          {/* Error messages are not animated per requirements 5.5 */}
          <AnimatePresence>
            {errors.department && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-rose-500"
              >
                {errors.department}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="auth-input grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`${inputClassName(!!errors.password)} pr-11`}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={inputClassName(!!errors.confirmPassword)}
              disabled={isLoading}
            />
            {/* Error messages are not animated per requirements 5.5 */}
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm text-rose-500"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="auth-input space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => {
                setAcceptTerms(checked as boolean)
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }))
              }}
              className="mt-0.5 border-border/50 data-[state=checked]:border-[hsl(168_76%_40%)] data-[state=checked]:bg-[hsl(168_76%_40%)]"
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-relaxed text-muted-foreground">
              I agree to the{" "}
              <Link href="#" className="text-[hsl(168_76%_40%)] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[hsl(168_76%_40%)] hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {/* Error messages are not animated per requirements 5.5 */}
          <AnimatePresence>
            {errors.terms && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-rose-500"
              >
                {errors.terms}
              </motion.p>
            )}
          </AnimatePresence>
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
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          ref={switchLinkRef}
          href="/auth/login"
          className="auth-switch-link font-medium text-[hsl(168_76%_40%)] transition-colors hover:text-[hsl(168_76%_35%)]"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
