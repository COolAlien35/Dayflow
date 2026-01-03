"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { LeaveRequest } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface LeaveApprovalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: LeaveRequest | null
  onApprove: (id: string, remarks: string) => void
  onReject: (id: string, remarks: string) => void
}

export function LeaveApprovalDialog({ open, onOpenChange, request, onApprove, onReject }: LeaveApprovalDialogProps) {
  const [remarks, setRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

  const handleAction = async (type: "approve" | "reject") => {
    if (!request) return
    setIsSubmitting(true)
    setAction(type)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (type === "approve") {
      onApprove(request.id, remarks)
    } else {
      onReject(request.id, remarks)
    }

    setIsSubmitting(false)
    setAction(null)
    setRemarks("")
    onOpenChange(false)
  }

  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Leave Request</DialogTitle>
          <DialogDescription>Review and respond to the leave request from {request.employeeName}.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type</span>
              <p className="font-medium capitalize">{request.type} Leave</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration</span>
              <p className="font-medium">
                {request.startDate} - {request.endDate}
              </p>
            </div>
          </div>
          {request.remarks && (
            <div className="text-sm">
              <span className="text-muted-foreground">Employee Remarks</span>
              <p className="mt-1 rounded-md bg-muted p-2">{request.remarks}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="approverRemarks">Your Response (Optional)</Label>
            <Textarea
              id="approverRemarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add a note for the employee..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => handleAction("reject")} disabled={isSubmitting}>
            {isSubmitting && action === "reject" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reject
          </Button>
          <Button onClick={() => handleAction("approve")} disabled={isSubmitting}>
            {isSubmitting && action === "approve" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
