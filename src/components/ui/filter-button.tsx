"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Filter, X } from "lucide-react"

export interface FilterOption {
  id: string
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
}

interface FilterButtonProps {
  groups: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filters: Record<string, string[]>) => void
  className?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  showCount?: boolean
  searchable?: boolean
}

export function FilterButton({
  groups,
  selectedFilters,
  onFilterChange,
  className,
  buttonVariant = "outline",
  buttonSize = "default",
  showCount = true,
  searchable = true,
}: FilterButtonProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [localFilters, setLocalFilters] = React.useState(selectedFilters)

  const totalSelected = Object.values(selectedFilters).flat().length

  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const currentValues = prev[groupId] || []
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value)
      
      return {
        ...prev,
        [groupId]: newValues,
      }
    })
  }

  const handleApply = () => {
    onFilterChange(localFilters)
    setOpen(false)
  }

  const handleClear = () => {
    setLocalFilters({})
    onFilterChange({})
    setOpen(false)
  }

  const filteredGroups = React.useMemo(() => {
    if (!searchTerm) return groups

    return groups.map((group) => ({
      ...group,
      options: group.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })).filter((group) => group.options.length > 0)
  }, [groups, searchTerm])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={cn("relative", className)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {showCount && totalSelected > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 rounded-sm px-1 font-normal"
            >
              {totalSelected}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-4"
        align="start"
        sideOffset={8}
      >
        <div className="flex items-center justify-between">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          {totalSelected > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 px-2 text-xs"
            >
              Clear all
              <X className="ml-2 h-3 w-3" />
            </Button>
          )}
        </div>
        {searchable && (
          <div className="mt-2">
            <Input
              placeholder="Search filters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
        )}
        <DropdownMenuSeparator className="my-2" />
        <div className="max-h-[300px] overflow-y-auto">
          {filteredGroups.map((group) => (
            <DropdownMenuGroup key={group.id}>
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                {group.label}
              </DropdownMenuLabel>
              {group.options.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  className="flex items-center gap-2 p-2"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Checkbox
                    id={`${group.id}-${option.id}`}
                    checked={localFilters[group.id]?.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleFilterChange(group.id, option.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`${group.id}-${option.id}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-2" />
            </DropdownMenuGroup>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 