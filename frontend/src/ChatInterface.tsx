import React from 'react';
import { useChat } from '@ai-sdk/react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'

export function ChatInterface() {
  const API_BASE_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:4000'
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${API_BASE_URL}/api/chat`,
    headers: { 'x-brand-context': 'brandId' }
  })

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ACT 2.0 Chat</h1>
        <span className="text-sm text-gray-500">Vite + AI SDK</span>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[50vh] space-y-3 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500">Start by asking a question…</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={
                    'inline-block rounded-lg px-3 py-2 text-sm ' +
                    (m.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-800')
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message…"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send'}
        </Button>
      </form>
    </div>
  )
}
