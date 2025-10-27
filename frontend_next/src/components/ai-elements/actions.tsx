import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Actions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center gap-1.5', className)} {...props} />
}

export interface ActionProps extends React.ComponentProps<typeof Button> {
  label?: string
  tooltip?: string
}

export const Action = React.forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn('h-7 px-2 text-xs', className)}
        aria-label={label}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
Action.displayName = 'Action'


