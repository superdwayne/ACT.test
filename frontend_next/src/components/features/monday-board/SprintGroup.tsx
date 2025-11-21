import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "./TaskCard"

interface SprintGroup {
  id: string
  title: string
  tasks: Task[]
  taskCount: number
}

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

interface SprintGroupProps {
  group: SprintGroup
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void
}

export function SprintGroup({ group, onTaskUpdate }: SprintGroupProps) {
  const completedTasks = group.tasks.filter((t) => t.status === "Done").length
  const progressPercentage = group.taskCount > 0 ? (completedTasks / group.taskCount) * 100 : 0

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={group.id} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold">{group.title}</span>
              <Badge variant="secondary">{group.taskCount} tasks</Badge>
              {completedTasks > 0 && (
                <Badge variant="outline" className="text-xs">
                  {completedTasks}/{group.taskCount} done
                </Badge>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-4">
            {group.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No tasks in this sprint
              </p>
            ) : (
              group.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={onTaskUpdate}
                />
              ))
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}





