import * as React from 'react'
import { Plus, ListFilter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChatInterface } from '@/components/chat/ChatInterface'

export default function Page() {
  return (
    <div className="flex">
      {/* Sidebar approximated from Figma (296px) */}
      <aside className="hidden w-[296px] shrink-0 border-r bg-neutral-50 dark:bg-neutral-900 p-6 lg:flex lg:flex-col lg:gap-4">
        <div className="text-sm font-medium">Chats</div>
        <nav className="space-y-1 text-sm text-muted-foreground">
          {['General', 'Design review', 'Engineering', 'Support'].map((t) => (
            <div key={t} className="rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground">
              {t}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        {/* Top input container (≈459px) */}
        <div className="mb-6 flex items-center gap-3">
          <Input placeholder="Search" className="w-[443px] rounded-lg" />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" className="gap-2 rounded-lg">
              <ListFilter className="size-4" />
              Filter
            </Button>
            <Button className="gap-2 rounded-lg">
              <Plus className="size-4" />
              New chat
            </Button>
          </div>
        </div>

        {/* Chat module styled to match Figma */}
        <ChatInterface variant="figma" frameless height="64vh" />

        {/* Figma preview for alignment */}
        <div className="mt-6 overflow-hidden rounded-xl border">
          <img
            src="/figma/untitled-1-2235.png"
            alt="Figma preview 1:2235"
            className="h-auto w-full"
          />
        </div>
      </main>
    </div>
  )
}
