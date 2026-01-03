"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SalaryEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeName: string
  currentSalary: number
  onSave: (newSalary: number) => void
}

export function SalaryEditDialog({ open, onOpenChange, employeeName, currentSalary, onSave }: SalaryEditDialogProps) {
  const [salary, setSalary] = useState(currentSalary.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const newSalary = Number.parseFloat(salary)
    if (Number.isNaN(newSalary) || newSalary <= 0) {
      setError("Please enter a valid salary amount")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave(newSalary)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Salary</DialogTitle>
          <DialogDescription>Update the annual salary for {employeeName}.</DialogDescription>
        </DialogHeader>

        <Alert className="border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning-foreground" />
          <AlertDescription className="text-warning-foreground">
            This is confidential information. Changes will be logged.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSave}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Annual Salary</Label>
              <Input id="currentSalary" value={`$${currentSalary.toLocaleString()}`} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSalary">New Annual Salary</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="newSalary"
                  type="number"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value)
                    setError("")
                  }}
                  className={`pl-7 ${error ? "border-destructive" : ""}`}
                  min="0"
                  step="1000"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
