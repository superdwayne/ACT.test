# Monday.com Board Components

This directory contains React components for displaying and interacting with Monday.com board data in the ACT 2.0 application.

## Components

### TaskCard
A complete task card component that displays all Monday.com task fields:
- Task name (editable)
- Status with progress indicator
- Owner/assignee with avatar
- Priority badge
- Due date with calendar picker
- Story points and estimated hours
- Labels/tags
- Action menu

**Usage:**
```tsx
import { TaskCard } from "@/components/features/monday-board/TaskCard"

<TaskCard 
  task={taskData} 
  onUpdate={(taskId, updates) => {
    // Handle task updates
  }}
/>
```

### SprintGroup
Displays a sprint group with collapsible accordion containing tasks.

**Usage:**
```tsx
import { SprintGroup } from "@/components/features/monday-board/SprintGroup"

<SprintGroup 
  group={sprintGroupData}
  onTaskUpdate={(taskId, updates) => {
    // Handle task updates
  }}
/>
```

### BoardFilters
Advanced filtering component with multi-select capabilities using Command + Popover.

**Usage:**
```tsx
import { BoardFilters } from "@/components/features/monday-board/BoardFilters"

<BoardFilters
  filters={filterState}
  options={filterOptions}
  onFilterChange={(newFilters) => {
    setFilterState(newFilters)
  }}
/>
```

## Integration with Monday.com API

To connect these components to your Monday.com board:

1. Fetch board data using the Monday.com API
2. Map Monday.com column types to component props
3. Implement update handlers to sync changes back to Monday.com

Example data mapping:
```typescript
interface MondayTask {
  id: string
  name: string
  column_values: {
    [key: string]: {
      text?: string
      value?: any
    }
  }
}

// Map to TaskCard format
const mapMondayTask = (mondayTask: MondayTask): Task => ({
  id: mondayTask.id,
  name: mondayTask.name,
  status: mondayTask.column_values.status?.text as Task["status"],
  priority: mondayTask.column_values.priority?.text as Task["priority"],
  // ... map other fields
})
```

## Dependencies

All required shadcn/ui components are installed:
- Card, Badge, Avatar, Button, Input, Select
- Calendar, Popover, Progress, Checkbox
- Accordion, Command, Dropdown Menu
- Alert Dialog, Tooltip, Table, Collapsible

## Next Steps

1. Connect to Monday.com API
2. Add drag-and-drop functionality
3. Implement file upload/display
4. Add timeline view
5. Add subitems/subtasks display






