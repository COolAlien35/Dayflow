import { Skeleton } from "@/components/ui/skeleton"

interface DataTableSkeletonProps {
  columns?: number
  rows?: number
}

export function DataTableSkeleton({ columns = 5, rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 border-b border-border px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 border-b border-border px-4 py-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
