'use client'

import { useEffect, useRef, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
        <CardContent className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              Start by asking a question or giving a brief.
            </div>
          ) : null}

          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              <Avatar className="size-8 border">
                <AvatarFallback>{m.role === 'user' ? 'You' : 'AI'}</AvatarFallback>
              </Avatar>
              <div className="rounded-lg border bg-muted/40 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                {m.content}
              </div>
            </div>
          ))}

          <div ref={endRef} />
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <form
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
            className="flex w-full items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? 'Sending…' : 'Send'}
            </Button>
          </form>
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


