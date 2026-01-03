"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Employee } from "@/lib/types"

interface EditEmployeeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    employee: Employee | null
    onSuccess?: () => void
}

interface UpdateData {
    first_name?: string
    last_name?: string
    employee_id?: string
    department?: string
    position?: string
    phone?: string
    date_of_joining?: string
}

export function EditEmployeeDialog({ open, onOpenChange, employee, onSuccess }: EditEmployeeDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        employee_id: "",
        department: "",
        position: "",
        phone: "",
        date_of_joining: "",
    })

    useEffect(() => {
        if (employee) {
            const [firstName, ...lastNameParts] = (employee.name || "").split(" ")
            setFormData({
                first_name: firstName || "",
                last_name: lastNameParts.join(" ") || "",
                employee_id: "",
                department: employee.department || "",
                position: employee.position || "",
                phone: employee.phone || "",
                date_of_joining: employee.joinDate || "",
            })
        }
    }, [employee])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!employee) return

        setIsLoading(true)

        try {
            const updateData: UpdateData = {}
            if (formData.first_name) updateData.first_name = formData.first_name
            if (formData.last_name) updateData.last_name = formData.last_name
            if (formData.employee_id) updateData.employee_id = formData.employee_id
            if (formData.department) updateData.department = formData.department
            if (formData.position) updateData.position = formData.position
            if (formData.phone) updateData.phone = formData.phone
            if (formData.date_of_joining) updateData.date_of_joining = formData.date_of_joining

            const token = localStorage.getItem('dayflow_token')
            const response = await fetch(`http://localhost:8000/api/employees/${employee.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.detail || 'Failed to update employee')
            }

            toast.success("Employee updated successfully!")
            onOpenChange(false)
            onSuccess?.()
        } catch (error: any) {
            console.error("Failed to update employee:", error)
            toast.error(error.message || "Failed to update employee")
        } finally {
            setIsLoading(false)
        }
    }

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (!employee) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogDescription>Update employee information</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                value={formData.first_name}
                                onChange={(e) => updateField("first_name", e.target.value)}
                                placeholder="John"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                value={formData.last_name}
                                onChange={(e) => updateField("last_name", e.target.value)}
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employee_id">Employee ID</Label>
                            <Input
                                id="employee_id"
                                value={formData.employee_id}
                                onChange={(e) => updateField("employee_id", e.target.value)}
                                placeholder="EMP001"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select value={formData.department} onValueChange={(value) => updateField("department", value)}>
                                <SelectTrigger id="department">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Design">Design</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                    <SelectItem value="Sales">Sales</SelectItem>
                                    <SelectItem value="Operations">Operations</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position">Position</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) => updateField("position", e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date_of_joining">Date of Joining</Label>
                        <Input
                            id="date_of_joining"
                            type="date"
                            value={formData.date_of_joining}
                            onChange={(e) => updateField("date_of_joining", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Employee
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
