"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface FilterOption {
  label: string
  value: string
}

interface Filter {
  key: string
  label: string
  options: FilterOption[]
}

interface TableFiltersProps {
  searchPlaceholder?: string
  filters?: Filter[]
  onSearchChange?: (value: string) => void
  onFilterChange?: (key: string, value: string) => void
  onClearFilters?: () => void
}

export function TableFilters({
  searchPlaceholder = "Search...",
  filters = [],
  onSearchChange,
  onFilterChange,
  onClearFilters,
}: TableFiltersProps) {
  const [searchValue, setSearchValue] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onSearchChange?.(e.target.value)
  }

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
    onFilterChange?.(key, value)
  }

  const handleClearFilters = () => {
    setSearchValue("")
    setActiveFilters({})
    onClearFilters?.()
  }

  const hasActiveFilters = searchValue || Object.values(activeFilters).some((v) => v && v !== "all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || "all"}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
          >
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-9 px-2">
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
