"use client"

import { useState } from "react"
import { FilterButton } from "@/components/ui/filter-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const filterGroups = [
  {
    id: "status",
    label: "Status",
    options: [
      { id: "active", label: "Active", value: "active" },
      { id: "inactive", label: "Inactive", value: "inactive" },
      { id: "pending", label: "Pending", value: "pending" },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: [
      { id: "medicine", label: "Medicine", value: "medicine" },
      { id: "supplies", label: "Supplies", value: "supplies" },
      { id: "equipment", label: "Equipment", value: "equipment" },
    ],
  },
  {
    id: "location",
    label: "Location",
    options: [
      { id: "shelf-a", label: "Shelf A", value: "shelf-a" },
      { id: "shelf-b", label: "Shelf B", value: "shelf-b" },
      { id: "storage", label: "Storage", value: "storage" },
    ],
  },
]

export function FilterButtonExample() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FilterButton
              groups={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium">Selected Filters:</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(selectedFilters, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 