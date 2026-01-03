"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface LeaveApplyFormProps {
  onSubmit: (data: LeaveFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export interface LeaveFormData {
  type: string
  dateRange: DateRange | undefined
  remarks: string
}

export function LeaveApplyForm({ onSubmit, onCancel, isSubmitting }: LeaveApplyFormProps) {
  const [type, setType] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [remarks, setRemarks] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!type) newErrors.type = "Please select a leave type"
    if (!dateRange?.from) newErrors.dateRange = "Please select dates"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ type, dateRange, remarks })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Leave Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type" className={cn(errors.type && "border-destructive")}>
            <SelectValue placeholder="Select leave type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vacation">Vacation Leave</SelectItem>
            <SelectItem value="Sick">Sick Leave</SelectItem>
            <SelectItem value="Casual">Casual Leave</SelectItem>
            <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
      </div>

      <div className="space-y-2">
        <Label>Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground",
                errors.dateRange && "border-destructive",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Select dates"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {errors.dateRange && <p className="text-sm text-destructive">{errors.dateRange}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks (Optional)</Label>
        <Textarea
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add any additional information..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Request
        </Button>
      </div>
    </form>
  )
}
