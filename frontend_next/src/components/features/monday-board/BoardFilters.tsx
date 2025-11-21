import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FilterOptions {
  statuses: string[]
  priorities: string[]
  owners: { id: string; name: string }[]
  labels: string[]
}

interface BoardFiltersProps {
  filters: {
    search: string
    status: string[]
    priority: string[]
    owner: string[]
    label: string[]
  }
  options: FilterOptions
  onFilterChange: (filters: BoardFiltersProps["filters"]) => void
}

export function BoardFilters({ filters, options, onFilterChange }: BoardFiltersProps) {
  const [openStatus, setOpenStatus] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)
  const [openOwner, setOpenOwner] = useState(false)
  const [openLabel, setOpenLabel] = useState(false)

  const updateFilter = (key: keyof typeof filters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilter = (key: keyof typeof filters) => {
    updateFilter(key, key === "search" ? "" : [])
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 border-b bg-muted/50">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="h-9"
        />
      </div>

      {/* Status Filter */}
      <Popover open={openStatus} onOpenChange={setOpenStatus}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9">
            Status
            {filters.status.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filters.status.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {options.statuses.map((status) => (
                  <CommandItem
                    key={status}
                    onSelect={() => {
                      const newStatus = filters.status.includes(status)
                        ? filters.status.filter((s) => s !== status)
                        : [...filters.status, status]
                      updateFilter("status", newStatus)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.status.includes(status) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {status}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Priority Filter */}
      <Popover open={openPriority} onOpenChange={setOpenPriority}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9">
            Priority
            {filters.priority.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filters.priority.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search priority..." />
            <CommandList>
              <CommandEmpty>No priority found.</CommandEmpty>
              <CommandGroup>
                {options.priorities.map((priority) => (
                  <CommandItem
                    key={priority}
                    onSelect={() => {
                      const newPriority = filters.priority.includes(priority)
                        ? filters.priority.filter((p) => p !== priority)
                        : [...filters.priority, priority]
                      updateFilter("priority", newPriority)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.priority.includes(priority) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {priority}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Owner Filter */}
      <Popover open={openOwner} onOpenChange={setOpenOwner}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9">
            Owner
            {filters.owner.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filters.owner.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search owner..." />
            <CommandList>
              <CommandEmpty>No owner found.</CommandEmpty>
              <CommandGroup>
                {options.owners.map((owner) => (
                  <CommandItem
                    key={owner.id}
                    onSelect={() => {
                      const newOwner = filters.owner.includes(owner.id)
                        ? filters.owner.filter((o) => o !== owner.id)
                        : [...filters.owner, owner.id]
                      updateFilter("owner", newOwner)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.owner.includes(owner.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {owner.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {(filters.status.length > 0 ||
        filters.priority.length > 0 ||
        filters.owner.length > 0 ||
        filters.label.length > 0 ||
        filters.search) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onFilterChange({
              search: "",
              status: [],
              priority: [],
              owner: [],
              label: []
            })
          }}
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}





