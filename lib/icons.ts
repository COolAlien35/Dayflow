import {
    LayoutDashboard,
    User,
    Clock,
    Calendar,
    DollarSign,
    Users,
    CheckSquare,
    Settings,
    Bell,
    type LucideIcon,
} from "lucide-react"

// Map of icon names to icon components
// This allows us to pass string icon names from Server Components
// and resolve them to actual components in Client Components
export const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    User,
    Clock,
    Calendar,
    DollarSign,
    Users,
    CheckSquare,
    Settings,
    Bell,
}

// Type for icon names (string keys of the icon map)
export type IconName = keyof typeof iconMap

// Helper function to get icon component from name
export function getIcon(name: IconName): LucideIcon {
    return iconMap[name] || LayoutDashboard
}
