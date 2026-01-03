"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton"
import { Inbox } from "lucide-react"

interface Column<T> {
  key: string
  header: string
  cell: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  isLoading?: boolean
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  emptyTitle = "No data found",
  emptyDescription,
  emptyAction,
  isLoading,
}: DataTableProps<T>) {
  if (isLoading) {
    return <DataTableSkeleton columns={columns.length} rows={5} />
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<Inbox className="h-6 w-6" />}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border/50">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
            {columns.map((column) => (
              <TableHead key={column.key} className={`font-semibold text-foreground ${column.className || ""}`}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              className="border-border/50 transition-colors hover:bg-muted/30"
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
