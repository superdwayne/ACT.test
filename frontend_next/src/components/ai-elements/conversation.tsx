import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ConversationContextValue = {
  containerRef: React.RefObject<HTMLDivElement>
  atBottom: boolean
  scrollToBottom: () => void
}

const ConversationContext = React.createContext<ConversationContextValue | null>(null)

export function Conversation({ className, style, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [atBottom, setAtBottom] = React.useState(true)

  const onScroll = React.useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const threshold = 16
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
    setAtBottom(isAtBottom)
  }, [])

  const scrollToBottom = React.useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  return (
    <ConversationContext.Provider value={{ containerRef, atBottom, scrollToBottom }}>
      <div
        ref={containerRef}
        onScroll={onScroll}
        className={cn('relative w-full overflow-y-auto', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </ConversationContext.Provider>
  )
}

export function ConversationContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(ConversationContext)
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // stick to bottom on content change when already at bottom
    if (ctx?.atBottom) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  })

  return (
    <div className={cn('flex flex-col gap-3 p-1', className)} {...props}>
      {children}
      <div ref={endRef} />
    </div>
  )
}

export function ConversationEmptyState({ icon, title = 'Start a conversation', description = 'Type a message below to begin chatting', className, ...props }: React.ComponentProps<'div'> & { icon?: React.ReactNode; title?: string; description?: string }) {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center text-sm text-muted-foreground', className)} {...props}>
      {icon}
      <div className="font-medium text-foreground">{title}</div>
      <div className="max-w-sm">{description}</div>
    </div>
  )
}

export function ConversationScrollButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  const ctx = React.useContext(ConversationContext)
  if (!ctx) return null
  return ctx.atBottom ? null : (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className={cn('pointer-events-auto shadow-sm', className)}
        onClick={ctx.scrollToBottom}
        {...props}
      >
        Scroll to latest
      </Button>
    </div>
  )
}


