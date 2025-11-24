'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  MessageCircle,
  Users,
  Settings,
  Moon,
  Archive,
  LogOut,
  Check,
  CirclePlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chat {
  id: string
  name: string
  avatar?: string
  initials: string
  lastMessage: string
  timestamp: string
  unread?: number
  online?: boolean
  hasCheck?: boolean
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Jacquenetta Slowgrave',
    initials: 'JS',
    lastMessage: 'Great! Looking forward to it. See you later!',
    timestamp: '10 minutes',
    unread: 8,
    online: true,
    hasCheck: true,
  },
  {
    id: '2',
    name: 'Nickola Peever',
    initials: 'NP',
    lastMessage: "Sounds perfect! I've been wanting to try that place. See you there!",
    timestamp: '40 minutes',
    unread: 2,
    online: true,
    hasCheck: true,
  },
  {
    id: '3',
    name: 'Farand Hume',
    initials: 'FH',
    lastMessage: 'How about 7 PM at the new Italian place downtown?',
    timestamp: 'Yesterday',
    online: true,
    hasCheck: true,
  },
  {
    id: '4',
    name: 'Ossie Peasey',
    initials: 'OP',
    lastMessage: 'Hey Bonnie, yes, definitely! What time should we meet?',
    timestamp: '13 days',
    online: false,
    hasCheck: true,
  },
  {
    id: '5',
    name: 'Hall Negri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hall',
    initials: 'HN',
    lastMessage: "No worries at all! I'll grab a table and wait for you. Drive safe!",
    timestamp: '2 days',
    online: true,
    hasCheck: true,
  },
  {
    id: '6',
    name: 'Elyssa Segot',
    initials: 'ES',
    lastMessage: 'She just told me today.',
    timestamp: 'Yesterday',
    online: true,
    hasCheck: true,
  },
  {
    id: '7',
    name: 'Gil Wilfing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gil',
    initials: 'GW',
    lastMessage: 'See you in 5 minutes!',
    timestamp: '1 day',
    online: true,
    hasCheck: true,
  },
  {
    id: '8',
    name: 'Bab Cleaton',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bab',
    initials: 'BC',
    lastMessage: 'If it takes long you can mail',
    timestamp: '3 hours',
    online: true,
    hasCheck: true,
  },
  {
    id: '9',
    name: 'Janith Satch',
    initials: 'JS',
    lastMessage: "Absolutely! It's amazing to see her so happy and passionate about it.",
    timestamp: '1 day',
    unread: 2,
    online: true,
    hasCheck: true,
  },
  {
    id: '10',
    name: 'Biron Alison',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Biron',
    initials: 'BA',
    lastMessage: 'Yeah, she mentioned it last week.',
    timestamp: '1 day',
    online: true,
    hasCheck: true,
  },
  {
    id: '11',
    name: 'Baily Younie',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Baily',
    initials: 'BY',
    lastMessage: 'Thanks, I appreciate it!',
    timestamp: 'Yesterday',
    unread: 2,
    online: true,
    hasCheck: true,
  },
  {
    id: '12',
    name: 'Lawton Broadbury',
    initials: 'LB',
    lastMessage: 'Drive safe!',
    timestamp: '1 hours',
    online: false,
    hasCheck: true,
  },
  {
    id: '13',
    name: 'Ealasaid Bohlje',
    initials: 'EB',
    lastMessage: 'I might be 10 minutes late. Sorry!',
    timestamp: '10 days',
    online: false,
    hasCheck: true,
  },
]

export default function ChatsAgainPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      {/* Left Sidebar */}
      <aside className="w-16 bg-[#111111] border-r border-[#1F1F1F] flex flex-col items-center py-6">
        <div className="mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SP</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-lg bg-[#1F1F1F] text-white"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <Users className="h-5 w-5" />
          </Button>
        </nav>

        <div className="flex flex-col items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <Archive className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <Moon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-[#1F1F1F] text-gray-400 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* Chat List Panel */}
      <div className="w-[380px] bg-[#111111] border-r border-[#1F1F1F] flex flex-col">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Chats</h1>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-white text-black hover:bg-gray-200 rounded-lg"
            >
              <CirclePlus className="h-4 w-4" />
              New
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Chats search..."
              className="pl-10 bg-[#0A0A0A] border-[#1F1F1F] text-white placeholder:text-gray-600 h-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-0.5">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  'w-full p-3 rounded-lg text-left transition-all hover:bg-[#1A1A1A] group',
                  selectedChat?.id === chat.id && 'bg-[#1A1A1A]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <Avatar className="h-11 w-11 border-2 border-[#1F1F1F]">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-medium">
                        {chat.initials}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-[15px] text-white truncate">
                        {chat.name}
                      </span>
                      <span className="text-xs text-gray-500 shrink-0">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {chat.hasCheck && (
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      )}
                      <p className="text-sm text-gray-400 truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread && (
                        <Badge className="h-5 min-w-[20px] px-1.5 bg-emerald-500 hover:bg-emerald-500 text-white text-xs rounded-full shrink-0">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area - Empty State */}
      <div className="flex-1 flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <div className="mb-6 flex justify-center opacity-20">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="80" r="40" fill="currentColor" className="text-gray-600" />
              <path
                d="M60 140 Q80 120 100 120 Q120 120 140 140 L140 180 Q100 200 60 180 Z"
                fill="currentColor"
                className="text-gray-600"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  )
}
