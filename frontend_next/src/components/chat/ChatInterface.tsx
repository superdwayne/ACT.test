'use client'

import { useEffect, useRef, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Actions, Action } from '@/components/ai-elements/actions'
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from '@/components/ai-elements/conversation'
import { Copy, RefreshCcw } from 'lucide-react'
import { Input as PromptInput, PromptInputTextarea, PromptInputSubmit } from '@/components/ai-elements/prompt-input'

type Role = 'user' | 'assistant'
interface ChatMessage {
  id: string
  role: Role
  content: string
}

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return i
    }
    return -1
  })()

  async function handleRegenerate() {
    if (isSending) return
    // find last user message before the last assistant
    let lastUser: ChatMessage | null = null
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUser = messages[i]
        break
      }
    }
    if (!lastUser) return

    // Build context up to and including that user message
    const upToUser = [] as ChatMessage[]
    for (const m of messages) {
      upToUser.push(m)
      if (m.id === lastUser.id) break
    }

    setIsSending(true)
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: upToUser.map((m) => ({ role: m.role, content: m.content }))
        }),
        signal: controller.signal
      })
      if (!res.ok || !res.body) throw new Error('Failed to stream response')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      const assistantId = crypto.randomUUID()
      // remove trailing assistant if currently last
      setMessages((prev) => {
        const trimmed = [...upToUser]
        return [...trimmed, { id: assistantId, role: 'assistant', content: '' }]
      })
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantContent += decoder.decode(value, { stream: true })
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m)))
      }
    } catch (e) {
      // swallow
    } finally {
      setIsSending(false)
      abortControllerRef.current = null
    }
  }

  return (
    <div className="container mx-auto flex min-h-[85vh] flex-col gap-6 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
        <p className="text-sm text-muted-foreground">Streaming responses via Vercel AI SDK</p>
      </div>

      <Card className="flex min-h-[60vh] flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pr-1">
          <Conversation className="relative w-full" style={{ height: '50vh' }}>
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState />
              ) : null}

              {messages.map((m, i) => {
                const isUser = m.role === 'user'
                const isLastAssistant = m.role === 'assistant' && i === lastAssistantIndex
                const bubbleClass = isUser
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-muted/40'
                return (
                  <div key={m.id} className="group/message relative flex flex-col gap-1">
                    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      {!isUser ? (
                        <Avatar className="size-8 border">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      ) : null}

                      <div className={`max-w-[78%] rounded-lg border p-3 text-sm leading-relaxed whitespace-pre-wrap ${bubbleClass}`}>
                        <div className={`mb-1 text-[11px] font-medium text-muted-foreground ${isUser ? 'text-right' : ''}`}>
                          {isUser ? 'You' : 'Assistant'}
                        </div>
                        {m.content}
                      </div>

                      {isUser ? (
                        <Avatar className="size-8 border">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      ) : null}
                    </div>
                    {isLastAssistant ? (
                      <div className="pl-11">
                        <Actions className="mt-1 opacity-0 transition-opacity group-hover/message:opacity-100">
                          <Action label="Retry" onClick={handleRegenerate}>
                            <RefreshCcw className="size-3" />
                          </Action>
                          <Action
                            label="Copy"
                            onClick={() => navigator.clipboard.writeText(m.content)}
                          >
                            <Copy className="size-3" />
                          </Action>
                        </Actions>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <PromptInput
            onSubmit={async (e) => {
              e.preventDefault()
              if (!input.trim() || isSending) return

              const userMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'user',
                content: input
              }
              const nextMessages = [...messages, userMessage]
              setMessages(nextMessages)
              setInput('')

              setIsSending(true)
              const controller = new AbortController()
              abortControllerRef.current = controller

              try {
                const res = await fetch('/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    messages: nextMessages.map((m) => ({ role: m.role, content: m.content }))
                  }),
                  signal: controller.signal
                })

                if (!res.ok || !res.body) {
                  throw new Error('Failed to stream response')
                }

                const reader = res.body.getReader()
                const decoder = new TextDecoder()
                let assistantContent = ''
                const assistantId = crypto.randomUUID()
                setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

                while (true) {
                  const { done, value } = await reader.read()
                  if (done) break
                  assistantContent += decoder.decode(value, { stream: true })
                  setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m)))
                }
              } catch (err) {
                // Optionally surface error with a toast
              } finally {
                setIsSending(false)
                abortControllerRef.current = null
              }
            }}
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <PromptInputSubmit status={isSending ? 'streaming' : 'ready'} disabled={isSending} />
          </PromptInput>
          <div className="flex w-full justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setInput('')}>
              Clear input
            </Button>
            {isSending ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  abortControllerRef.current?.abort()
                }}
              >
                Stop
              </Button>
            ) : null}
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System instructions (optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="You are a helpful brand-aware assistant..."
            value={''}
            readOnly
            className="min-h-20"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatInterface


