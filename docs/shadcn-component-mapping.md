# Shadcn Component Mapping for ACT.2.0 Monday.com Board

Based on your **ACT.2.0** board structure, here are the recommended shadcn components for each section:

## ✅ Installation Status

**All high-priority components have been installed!**

### Installed Components
- ✅ Accordion
- ✅ Calendar
- ✅ Popover
- ✅ Progress
- ✅ Checkbox
- ✅ Alert Dialog
- ✅ Command (for combobox functionality)
- ✅ Tooltip
- ✅ Table
- ✅ Collapsible

### Example Components Created
- `TaskCard.tsx` - Complete task card component with all Monday.com fields
- `SprintGroup.tsx` - Accordion-based sprint group display
- `BoardFilters.tsx` - Advanced filtering with Command + Popover

### Installation Script
Run `./scripts/install-shadcn-components.sh` to install any additional components.

## Board Overview & Layout

### Main Board Container
- **Card** (`card.tsx`) ✅ Already installed
  - Use for each task/item container
  - Wrap individual tasks with Card component for clean separation

### Group/Sprint Sections
- **Tabs** (`tabs.tsx`) ✅ Already installed
  - Use for switching between different sprint groups
  - Alternative: **Accordion** (needs installation) for collapsible sprint sections
- **Badge** (`badge.tsx`) ✅ Already installed
  - Display sprint labels, status indicators, and priority tags

## Task/Item Display Components

### Task Name Column
- **Input** (`input.tsx`) ✅ Already installed
  - For inline editing of task names
- **Label** (`label.tsx`) ✅ Already installed
  - For form labels when editing

### Owner/Assignee Column
- **Avatar** (`avatar.tsx`) ✅ Already installed
  - Display user avatars for assignees
- **Popover** (needs installation)
  - Show user details on hover/click
- **Dropdown Menu** (`dropdown-menu.tsx`) ✅ Already installed
  - For selecting/changing assignees

### Status Column
- **Badge** (`badge.tsx`) ✅ Already installed
  - Color-coded status badges (Working on it, Done, Blocked, Not Started)
- **Select** (`select.tsx`) ✅ Already installed
  - For changing status via dropdown
- **Progress** (needs installation)
  - Visual progress indicator for status progression

### Priority Column
- **Badge** (`badge.tsx`) ✅ Already installed
  - Display priority levels (Critical ⚠️, High, Medium, Low)
- **Select** (`select.tsx`) ✅ Already installed
  - For priority selection

### Due Date Column
- **Calendar** (needs installation)
  - Date picker for setting due dates
- **Popover** (needs installation)
  - Calendar popup for date selection
- **Badge** (`badge.tsx`) ✅ Already installed
  - Display date badges with styling for overdue/upcoming

### Timeline Column
- **Calendar** (needs installation)
  - Timeline view integration
- **Progress** (needs installation)
  - Visual timeline progress bars

### Files Column
- **Button** (`button.tsx`) ✅ Already installed
  - Upload/attach file buttons
- **Dialog** (`dialog.tsx`) ✅ Already installed
  - File preview modal
- **Sheet** (`sheet.tsx`) ✅ Already installed
  - Side panel for file management

### Label Column
- **Badge** (`badge.tsx`) ✅ Already installed
  - Display category labels (Development, UX, Front end, etc.)
- **Multi-select** (needs installation - use Combobox)
  - For selecting multiple labels

### Story Points Column
- **Input** (`input.tsx`) ✅ Already installed
  - Number input for story points
- **Badge** (`badge.tsx`) ✅ Already installed
  - Display story point values

### Details Column (Long Text)
- **Textarea** (`textarea.tsx`) ✅ Already installed
  - For editing task descriptions
- **Dialog** (`dialog.tsx`) ✅ Already installed
  - Full-screen detail editor
- **Collapsible** (needs installation)
  - Expandable detail preview

### Estimated Hours Column
- **Input** (`input.tsx`) ✅ Already installed
  - Number input for hours
- **Progress** (needs installation)
  - Visual representation of time estimates

### Milestone Date Column
- **Calendar** (needs installation)
  - Date picker for milestones
- **Badge** (`badge.tsx`) ✅ Already installed
  - Milestone indicators

## Board-Level Features

### Filtering & Search
- **Input** (`input.tsx`) ✅ Already installed
  - Search bar for filtering tasks
- **Combobox** (needs installation)
  - Advanced filter dropdowns
- **Select** (`select.tsx`) ✅ Already installed
  - Filter by status, priority, owner, etc.
- **Checkbox** (needs installation)
  - Multi-select filters

### Sorting & View Options
- **Dropdown Menu** (`dropdown-menu.tsx`) ✅ Already installed
  - View options (Board, Timeline, Calendar)
- **Button** (`button.tsx`) ✅ Already installed
  - Sort buttons
- **Toggle** (`toggle.tsx`) ✅ Already installed
  - Toggle between view modes

### Task Actions
- **Button** (`button.tsx`) ✅ Already installed
  - Action buttons (Edit, Delete, Duplicate)
- **Dropdown Menu** (`dropdown-menu.tsx`) ✅ Already installed
  - Task action menu
- **Dialog** (`dialog.tsx`) ✅ Already installed
  - Edit task modal
- **Alert Dialog** (needs installation)
  - Confirmation dialogs for destructive actions

### Subitems/Subtasks
- **Accordion** (needs installation)
  - Collapsible subitem sections
- **Card** (`card.tsx`) ✅ Already installed
  - Nested cards for subitems
- **Checkbox** (needs installation)
  - Subtask completion checkboxes

## Group/Sprint Management

### Sprint Groups
- **Tabs** (`tabs.tsx`) ✅ Already installed
  - Switch between sprint groups
- **Accordion** (needs installation)
  - Collapsible sprint sections
- **Badge** (`badge.tsx`) ✅ Already installed
  - Sprint labels and item counts

### Backlog Section
- **Card** (`card.tsx`) ✅ Already installed
  - Backlog item cards
- **Drag and Drop** (needs installation - use DnD Kit or similar)
  - Reorder backlog items

## Additional Recommended Components

### Notifications & Feedback
- **Sonner** (`sonner.tsx`) ✅ Already installed
  - Toast notifications for actions
- **Alert** (`alert.tsx`) ✅ Already installed
  - Important notifications and warnings

### Forms & Input
- **Form** (`form.tsx`) ✅ Already installed
  - Task creation/editing forms
- **Slider** (`slider.tsx`) ✅ Already installed
  - For story points or priority sliders

### Navigation & Layout
- **Sheet** (`sheet.tsx`) ✅ Already installed
  - Side panels for filters/settings
- **Dialog** (`dialog.tsx`) ✅ Already installed
  - Modals for task details

## Components to Install

Based on your board structure, here are the components you should add:

### High Priority
1. **Accordion** - For collapsible sprint groups and subitems
2. **Calendar** - For date selection (due dates, milestones)
3. **Popover** - For date pickers and user info tooltips
4. **Progress** - For status and timeline visualization
5. **Checkbox** - For subtasks and filters
6. **Combobox** - For advanced filtering and multi-select
7. **Alert Dialog** - For confirmation dialogs

### Medium Priority
8. **Collapsible** - For expandable detail sections
9. **Tooltip** - For helpful hints and additional info
10. **Command** - For command palette/search
11. **Table** - For table view of tasks (alternative to card view)

### Optional Enhancements
12. **Hover Card** - For quick task previews
13. **Menubar** - For top navigation
14. **Navigation Menu** - For main navigation
15. **Separator** - For visual section dividers
16. **Skeleton** - For loading states

## Implementation Priority

### Phase 1: Core Task Display
- Card (✅)
- Badge (✅)
- Avatar (✅)
- Input (✅)
- Textarea (✅)
- Select (✅)
- Button (✅)

### Phase 2: Task Management
- Dialog (✅)
- Dropdown Menu (✅)
- Calendar (install)
- Popover (install)
- Checkbox (install)

### Phase 3: Board Organization
- Tabs (✅)
- Accordion (install)
- Progress (install)
- Combobox (install)

### Phase 4: Advanced Features
- Alert Dialog (install)
- Table (install)
- Command (install)
- Tooltip (install)

## Component Usage Examples

### Task Card
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <Input value={task.name} />
      <Badge variant={getStatusVariant(task.status)}>
        {task.status}
      </Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={task.owner.photo} />
        <AvatarFallback>{task.owner.initials}</AvatarFallback>
      </Avatar>
      <Select value={task.priority}>
        {/* Priority options */}
      </Select>
    </div>
  </CardContent>
</Card>
```

### Sprint Group with Accordion
```tsx
<Accordion>
  <AccordionItem value="sprint-1">
    <AccordionTrigger>
      Sprint 1 - Development infrastructure
      <Badge>{sprint.taskCount}</Badge>
    </AccordionTrigger>
    <AccordionContent>
      {/* Task cards */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Status Badge with Progress
```tsx
<div className="space-y-2">
  <Badge>{status}</Badge>
  <Progress value={progressPercentage} />
</div>
```

## Notes

- All existing components (✅) are already installed and ready to use
- Components marked "needs installation" should be added using:
  ```bash
  npx shadcn@latest add [component-name]
  ```
- Consider using **Table** component for a more structured view alternative to cards
- **Command** component can be used for a powerful search/filter interface
- **Tooltip** should be added for better UX on interactive elements

