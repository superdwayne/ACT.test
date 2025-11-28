import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  name: string
  status: "Not Started" | "In Progress" | "Blocked" | "Done"
  priority: "Critical ⚠️" | "High" | "Medium" | "Low"
  owner?: {
    id: string
    name: string
    photo?: string
    initials: string
  }
  dueDate?: Date
  storyPoints?: number
  estimatedHours?: number
  labels?: string[]
}

interface TaskCardProps {
  task: Task
  onUpdate?: (taskId: string, updates: Partial<Task>) => void
}

const statusVariants = {
  "Not Started": "secondary",
  "In Progress": "default",
  "Blocked": "destructive",
  "Done": "default"
} as const

const priorityColors = {
  "Critical ⚠️": "bg-gray-900 text-white",
  "High": "bg-purple-700 text-white",
  "Medium": "bg-purple-500 text-white",
  "Low": "bg-blue-500 text-white"
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const statusProgress = {
    "Not Started": 0,
    "In Progress": 50,
    "Blocked": 25,
    "Done": 100
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Input
            value={task.name}
            onChange={(e) => onUpdate?.(task.id, { name: e.target.value })}
            className="font-semibold border-none p-0 h-auto focus-visible:ring-0"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Status */}
        <div className="space-y-1">
          <Select
            value={task.status}
            onValueChange={(value) => onUpdate?.(task.id, { status: value as Task["status"] })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Progress value={statusProgress[task.status]} className="h-1" />
        </div>

        {/* Owner & Priority */}
        <div className="flex items-center justify-between gap-2">
          {task.owner && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.owner.photo} />
                <AvatarFallback className="text-xs">
                  {task.owner.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{task.owner.name}</span>
            </div>
          )}
          <Badge className={cn("text-xs", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-8",
                  !task.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {task.dueDate ? format(task.dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={task.dueDate}
                onSelect={(date) => date && onUpdate?.(task.id, { dueDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        {/* Story Points & Hours */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {task.storyPoints && (
            <Badge variant="outline">SP: {task.storyPoints}</Badge>
          )}
          {task.estimatedHours && (
            <Badge variant="outline">{task.estimatedHours}h</Badge>
          )}
        </div>

        {/* Labels */}
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}






