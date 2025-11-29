"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Mountain, Code, Palette, Globe, BookOpen, Instagram, Twitter, Menu, Bot, User, Plus, Sparkles, History } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

const HEADER_LINKS = [
  { href: "/mntn#equipment", label: "Equipment" },
  { href: "/mntn#about-us", label: "About us" },
  { href: "/mntn#blog", label: "Blog" },
  { href: "/mntn", label: "Back to MNTN" },
];

const CHAT_MODES = [
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "code", label: "Code", icon: Code },
  { id: "design", label: "Design", icon: Palette },
  { id: "research", label: "Research", icon: Globe },
];

const CONVERSATIONS = [
  {
    id: 1,
    title: "What's something you've learned...",
    category: "today",
    messages: [
      { id: 1, role: "assistant" as const, content: "Good Morning! How can I assist you with your mountain adventure today?", timestamp: "9:00 AM" },
      { id: 2, role: "user" as const, content: "I need help planning a multi-day trek", timestamp: "9:01 AM" },
      { id: 3, role: "assistant" as const, content: "Great! Let me help you plan your trek. What's your experience level?", timestamp: "9:01 AM" },
    ],
  },
  {
    id: 2,
    title: "Best travel experience",
    category: "today",
    messages: [
      { id: 1, role: "assistant" as const, content: "Tell me about your best travel experience!", timestamp: "8:30 AM" },
      { id: 2, role: "user" as const, content: "Hiking in the Swiss Alps was incredible", timestamp: "8:31 AM" },
    ],
  },
  {
    id: 3,
    title: "Favorite book",
    category: "today",
    messages: [
      { id: 1, role: "assistant" as const, content: "What's your favorite hiking or adventure book?", timestamp: "8:00 AM" },
    ],
  },
  {
    id: 4,
    title: "If you could teleport anywher...",
    category: "yesterday",
    messages: [
      { id: 1, role: "assistant" as const, content: "If you could teleport anywhere for a hike, where would you go?", timestamp: "Yesterday" },
      { id: 2, role: "user" as const, content: "Definitely Patagonia!", timestamp: "Yesterday" },
    ],
  },
  {
    id: 5,
    title: "What's one goal you want to ...",
    category: "week",
    messages: [
      { id: 1, role: "assistant" as const, content: "What's one hiking goal you want to achieve this year?", timestamp: "7 Days Ago" },
    ],
  },
  {
    id: 6,
    title: "Favorite programming langu...",
    category: "week",
    messages: [
      { id: 1, role: "assistant" as const, content: "What's your favorite programming language for trail apps?", timestamp: "7 Days Ago" },
    ],
  },
  {
    id: 7,
    title: "Learning new skills",
    category: "week",
    messages: [
      { id: 1, role: "assistant" as const, content: "What new outdoor skills are you learning?", timestamp: "7 Days Ago" },
    ],
  },
];

const Logo = () => (
  <Link href="/mntn" className="flex items-center gap-2 text-3xl font-bold tracking-wider" style={{ fontFamily: '"Chronicle Display", serif' }}>
    <Mountain className="size-8" /> MNTN
  </Link>
);

export default function AIChatPage() {
  const [currentConversationId, setCurrentConversationId] = React.useState(1);
  const [conversations, setConversations] = React.useState(CONVERSATIONS);
  const [messages, setMessages] = React.useState(CONVERSATIONS[0].messages);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedMode, setSelectedMode] = React.useState(CHAT_MODES[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const loadConversation = (conversationId: number) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setMessages(conversation.messages);
    }
  };

  const createNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: "New conversation",
      category: "today",
      messages: [
        {
          id: 1,
          role: "assistant" as const,
          content: "Good Morning! How can I assist you with your mountain adventure today?",
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        },
      ],
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    setMessages(newConversation.messages);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: "I understand your question about hiking. Let me provide you with detailed guidance on this topic!",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const todayChats = filteredConversations.filter(c => c.category === "today");
  const yesterdayChats = filteredConversations.filter(c => c.category === "yesterday");
  const weekChats = filteredConversations.filter(c => c.category === "week");

  return (
    <div className="bg-[#0B1D26] text-white min-h-screen">
      <aside className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 transform flex-col items-center gap-6 lg:flex">
        <span className="[writing-mode:vertical-rl] font-bold text-sm">Follow us</span>
        <Link href="#" className="transition-all duration-300 hover:scale-110 hover:text-[#FBD784]">
          <Instagram className="size-5" />
        </Link>
        <Link href="#" className="transition-all duration-300 hover:scale-110 hover:text-[#FBD784]">
          <Twitter className="size-5" />
        </Link>
      </aside>

      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1D26]/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {HEADER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="font-bold transition-all duration-300 hover:text-[#FBD784]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex min-h-screen pt-24">
        <aside className="hidden w-64 border-r border-white/10 lg:block">
          <div className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..."
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FBD784]"
              />
            </div>

            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-6">
                {todayChats.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Today</h3>
                    <div className="space-y-1">
                      {todayChats.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => loadConversation(conv.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            currentConversationId === conv.id
                              ? "bg-[#FBD784]/20 text-[#FBD784]"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {conv.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {yesterdayChats.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Yesterday</h3>
                    <div className="space-y-1">
                      {yesterdayChats.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => loadConversation(conv.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            currentConversationId === conv.id
                              ? "bg-[#FBD784]/20 text-[#FBD784]"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {conv.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {weekChats.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">7 Days Ago</h3>
                    <div className="space-y-1">
                      {weekChats.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => loadConversation(conv.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            currentConversationId === conv.id
                              ? "bg-[#FBD784]/20 text-[#FBD784]"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {conv.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
                <Sparkles className="size-4 text-[#FBD784]" />
                <span>Explore</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
                <BookOpen className="size-4 text-[#FBD784]" />
                <span>Library</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
                <History className="size-4 text-[#FBD784]" />
                <span>History</span>
              </button>
            </div>

            <Button onClick={createNewChat} className="w-full bg-[#FBD784] text-[#0B1D26] hover:bg-[#FBD784]/90 font-bold">
              <Plus className="size-4 mr-2" />
              New Chat
            </Button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="size-10 rounded-full bg-[#FBD784]/20 flex items-center justify-center shrink-0">
                      <Bot className="size-5 text-[#FBD784]" />
                    </div>
                  )}
                  <div className={`max-w-[70%] ${message.role === "user" ? "order-first" : ""}`}>
                    <div className={`px-6 py-4 ${message.role === "user" ? "bg-[#FBD784] text-[#0B1D26]" : "bg-white/5 border border-white/10"}`}>
                      <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                    </div>
                    <p className="text-xs text-white/40 mt-2 px-2">{message.timestamp}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <User className="size-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-[#FBD784]/20 flex items-center justify-center">
                    <Bot className="size-5 text-[#FBD784]" />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-6 py-4">
                    <div className="flex gap-1">
                      <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-white/10 bg-[#0B1D26] p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <hr className="w-8 border-[#FBD784]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FBD784]">Mode</span>
                </div>
                <div className="flex gap-2">
                  {CHAT_MODES.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 ${
                          selectedMode.id === mode.id ? "bg-[#FBD784] text-[#0B1D26]" : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="size-4" />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSendMessage}>
                <div className="flex items-center gap-3 border border-white/10 bg-white/5 p-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about trails, gear, or conditions..."
                    className="flex-1 border-0 bg-transparent text-white placeholder:text-white/40"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-[#FBD784] text-[#0B1D26] hover:bg-[#FBD784]/90 font-bold">
                    <Send className="size-4 mr-2" />
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
