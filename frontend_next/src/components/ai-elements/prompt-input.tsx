import * as React from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function Input({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  return <form className={cn('relative flex w-full items-end gap-2', className)} {...props} />
}

export interface PromptInputTextareaProps extends React.ComponentProps<typeof Textarea> {}
export function PromptInputTextarea({ className, ...props }: PromptInputTextareaProps) {
  return <Textarea className={cn('min-h-12 max-h-40 pr-12', className)} {...props} />
}

export function PromptInputSubmit({ status, className, children, ...props }: React.ComponentProps<typeof Button> & { status?: 'ready' | 'streaming' }) {
  return (
    <Button type="submit" className={cn('', className)} {...props}>
      {status === 'streaming' ? 'Sending…' : children ?? 'Send'}
    </Button>
  )
}


