"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Search,
  Plus,
  Sparkles,
  Code,
  Palette,
  Globe,
  BookOpen,
  Settings,
  ChevronDown,
  Mic,
  Paperclip,
  User,
  Bot,
} from "lucide-react";

const AI_MODELS = [
  { id: "claude-3.5", name: "Claude 3.5 Sonnet", icon: "🤖" },
  { id: "gpt-4", name: "GPT-4 Turbo", icon: "✨" },
  { id: "gemini-pro", name: "Gemini Pro", icon: "💎" },
];

const CHAT_MODES = [
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "code", label: "Code", icon: Code },
  { id: "design", label: "Design", icon: Palette },
  { id: "research", label: "Research", icon: Globe },
];

const RECENT_CHATS = [
  { id: 1, title: "What's something you've lear...", time: "Today", category: "today" },
  { id: 2, title: "Best travel experience", time: "Today", category: "today" },
  { id: 3, title: "Favorite book", time: "Today", category: "today" },
  { id: 4, title: "If you could teleport anywher...", time: "Yesterday", category: "yesterday" },
  { id: 5, title: "What's one goal you want to ...", time: "7 Days Ago", category: "week" },
  { id: 6, title: "Favorite programming langu...", time: "7 Days Ago", category: "week" },
  { id: 7, title: "Learning new skills", time: "7 Days Ago", category: "week" },
];

const SAMPLE_CONVERSATION = [
  {
    id: 1,
    role: "assistant",
    content: "Good Morning! How can I assist you today?",
    timestamp: "9:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "I need help creating a modern landing page design",
    timestamp: "9:01 AM",
  },
  {
    id: 3,
    role: "assistant",
    content: "I'd be happy to help you create a modern landing page! Let's break this down into key sections:\n\n1. **Hero Section** - Eye-catching headline with a clear value proposition\n2. **Features** - Highlight your main benefits with icons\n3. **Social Proof** - Testimonials or client logos\n4. **CTA** - Strong call-to-action\n\nWhat industry or product is this landing page for?",
    timestamp: "9:01 AM",
  },
];

export default function AIChatPage() {
  const [messages, setMessages] = React.useState(SAMPLE_CONVERSATION);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(AI_MODELS[0]);
  const [selectedMode, setSelectedMode] = React.useState(CHAT_MODES[0]);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

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
        content: generateResponse(inputValue, selectedMode.id),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (input: string, mode: string): string => {
    const responses: Record<string, string> = {
      summary: `Here's a concise summary: ${input.slice(0, 50)}... I've analyzed your request and can provide a comprehensive overview with key points and actionable insights.`,
      code: `\`\`\`typescript\n// Based on your request: ${input.slice(0, 30)}...\nconst solution = () => {\n  // Implementation here\n  return "Optimized code solution";\n};\n\`\`\`\n\nThis code provides a clean, efficient solution to your problem.`,
      design: `🎨 Design Recommendation:\n\nFor "${input.slice(0, 40)}...", I suggest:\n- Modern, minimalist aesthetic\n- Bold typography with clear hierarchy\n- Vibrant accent colors for CTAs\n- Smooth animations and transitions\n\nWould you like me to elaborate on any aspect?`,
      research: `📚 Research Findings:\n\nBased on "${input.slice(0, 40)}...", here are the key insights:\n\n1. Current industry trends\n2. Best practices and methodologies\n3. Data-driven recommendations\n4. Expert opinions and case studies\n\nLet me know if you need deeper analysis on any point.`,
    };

    return responses[mode] || `I understand you're asking about: "${input}". Let me help you with that in detail.`;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
              AI
            </div>
            <span>AGENCY</span>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Recent Chats */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Today</h3>
              {RECENT_CHATS.filter(c => c.category === "today").map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors mb-1"
                >
                  {chat.title}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Yesterday</h3>
              {RECENT_CHATS.filter(c => c.category === "yesterday").map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors mb-1"
                >
                  {chat.title}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">7 Days Ago</h3>
              {RECENT_CHATS.filter(c => c.category === "week").map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors mb-1"
                >
                  {chat.title}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors">
            <Sparkles className="size-4" />
            Explore
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors">
            <BookOpen className="size-4" />
            Library
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-sm transition-colors">
            <Settings className="size-4" />
            Upgrade
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t">
          <Button className="w-full" size="lg">
            <Plus className="size-4 mr-2" />
            New Chat
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  AI Tools
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Chat</DropdownMenuItem>
                <DropdownMenuItem>Create</DropdownMenuItem>
                <DropdownMenuItem>Check</DropdownMenuItem>
                <DropdownMenuItem>Approve</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Create
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>New Document</DropdownMenuItem>
                <DropdownMenuItem>New Image</DropdownMenuItem>
                <DropdownMenuItem>New Code</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost">Check</Button>
            <Button variant="ghost">Approve</Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Sparkles className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="size-4" />
            </Button>
            <Avatar>
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Toby</div>
              <div className="text-xs text-muted-foreground">toby@example.com</div>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center size-24 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 mb-6 animate-pulse">
                  <Bot className="size-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-2">
                  Good Morning, Toby
                </h1>
                <h2 className="text-3xl font-light">
                  How Can I <span className="text-purple-500 font-semibold">Assist You Today?</span>
                </h2>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${message.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">{message.timestamp}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="size-8">
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="size-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="size-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="size-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-card p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Mode Selection */}
            <div className="flex items-center gap-2">
              {CHAT_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedMode.id === mode.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <Icon className="size-4" />
                    {mode.label}
                  </button>
                );
              })}
            </div>

            {/* Pro Plan Notice */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Use our faster AI on Pro Plan</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Upgrade
              </Button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="relative">
              <div className="flex items-center gap-2 border rounded-2xl bg-background p-2">
                <Button type="button" variant="ghost" size="icon" className="shrink-0">
                  <Paperclip className="size-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 shrink-0">
                      <Globe className="size-4" />
                      {selectedModel.name}
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {AI_MODELS.map((model) => (
                      <DropdownMenuItem
                        key={model.id}
                        onClick={() => setSelectedModel(model)}
                      >
                        {model.icon} {model.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading}
                />

                <Button type="button" variant="ghost" size="icon" className="shrink-0">
                  <Mic className="size-4" />
                </Button>

                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="shrink-0 rounded-full"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
