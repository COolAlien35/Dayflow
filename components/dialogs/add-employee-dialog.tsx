"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createEmployee, type CreateEmployeeRequest } from "@/lib/api"

interface AddEmployeeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function AddEmployeeDialog({ open, onOpenChange, onSuccess }: AddEmployeeDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<CreateEmployeeRequest>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        department: "",
        position: "",
        employee_id: "",
        phone: "",
        date_of_joining: new Date().toISOString().split("T")[0],
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Validate required fields
            if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
                toast.error("Please fill in all required fields")
                setIsLoading(false)
                return
            }

            // Validate password length
            if (formData.password.length < 8) {
                toast.error("Password must be at least 8 characters long")
                setIsLoading(false)
                return
            }

            await createEmployee(formData)
            toast.success("Employee added successfully!")

            // Reset form
            setFormData({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                department: "",
                position: "",
                employee_id: "",
                phone: "",
                date_of_joining: new Date().toISOString().split("T")[0],
            })

            onOpenChange(false)
            onSuccess?.()
        } catch (error: any) {
            console.error("Failed to add employee:", error)
            toast.error(error.message || "Failed to add employee")
        } finally {
            setIsLoading(false)
        }
    }

    const updateField = (field: keyof CreateEmployeeRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>Create a new employee account with their details</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">
                                First Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="first_name"
                                value={formData.first_name}
                                onChange={(e) => updateField("first_name", e.target.value)}
                                required
                                placeholder="John"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">
                                Last Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="last_name"
                                value={formData.last_name}
                                onChange={(e) => updateField("last_name", e.target.value)}
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            required
                            placeholder="john.doe@company.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => updateField("password", e.target.value)}
                            required
                            placeholder="Minimum 8 characters"
                            minLength={8}
                        />
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
                            Add Employee
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
