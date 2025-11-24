"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Search,
  Sparkles,
  Library,
  History,
  TrendingUp,
  Plus,
  Mic,
  Paperclip,
  Send,
  Code,
  Palette,
  Globe,
} from "lucide-react";

export default function ChantV3Page() {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 sonnet");
  const [activeTab, setActiveTab] = useState("Summary");

  const conversations = [
    { title: "What's something you've lear...", time: "Today" },
    { title: "Best travel experience", time: "Today" },
    { title: "Favorite book", time: "Today" },
    { title: "If you could teleport anywher...", time: "Yesterday" },
    { title: "What's one goal you want to...", time: "7 Days Ago" },
    { title: "Favorite programming langu...", time: "7 Days Ago" },
    { title: "Learning new skills", time: "7 Days Ago" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="font-bold text-lg">ACT AGENCY</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">Today</div>
            {conversations.slice(0, 3).map((conv, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm truncate"
              >
                {conv.title}
              </button>
            ))}
            
            <div className="text-xs font-medium text-muted-foreground mb-2 mt-4">Yesterday</div>
            {conversations.slice(3, 4).map((conv, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm truncate"
              >
                {conv.title}
              </button>
            ))}

            <div className="text-xs font-medium text-muted-foreground mb-2 mt-4">7 Days Ago</div>
            {conversations.slice(4).map((conv, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-sm truncate"
              >
                {conv.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-border space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm">
            <Sparkles className="size-4" />
            Explore
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm">
            <Library className="size-4" />
            Library
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm">
            <History className="size-4" />
            History
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-sm">
            <TrendingUp className="size-4" />
            Upgrade
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button className="w-full" size="lg">
            <Plus className="size-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  AI Tools
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Chat Assistant</DropdownMenuItem>
                <DropdownMenuItem>Code Generator</DropdownMenuItem>
                <DropdownMenuItem>Image Creator</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  Create
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>New Document</DropdownMenuItem>
                <DropdownMenuItem>New Project</DropdownMenuItem>
                <DropdownMenuItem>New Template</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost">Check</Button>
            <Button variant="ghost">Approve</Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M1 12h6m6 0h6M5.8 5.8l4.2 4.2m0 6l-4.2 4.2" />
              </svg>
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">shadcn</div>
              <div className="text-muted-foreground text-xs">m@example.com</div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Gradient Orb */}
          <div className="mb-8">
            <div className="size-32 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 blur-2xl opacity-60" />
          </div>

          {/* Greeting */}
          <h1 className="text-4xl font-bold mb-2">Good Morning, Toby</h1>
          <p className="text-2xl mb-8">
            How Can I <span className="text-purple-500">Assist You Today?</span>
          </p>

          {/* Upgrade Banner */}
          <div className="bg-muted rounded-lg px-4 py-2 mb-8 flex items-center gap-2 text-sm">
            <span>Use our faster AI on Pro Plan</span>
            <Button variant="link" className="h-auto p-0 text-primary">
              Upgrade
            </Button>
          </div>

          {/* Input Area */}
          <div className="w-full max-w-3xl">
            <div className="bg-card border border-border rounded-2xl p-4">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-0 focus-visible:ring-0 text-base mb-4"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-8">
                    <Paperclip className="size-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 h-8 text-sm">
                        <Globe className="size-4" />
                        {selectedModel}
                        <ChevronDown className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedModel("Claude 3.5 sonnet")}>
                        Claude 3.5 sonnet
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedModel("GPT-4")}>
                        GPT-4
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedModel("Gemini Pro")}>
                        Gemini Pro
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-8">
                    <Mic className="size-4" />
                  </Button>
                  <Button size="icon" className="size-8 rounded-full">
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Tabs */}
            <div className="flex items-center gap-4 mt-6 justify-center">
              {[
                { icon: Sparkles, label: "Summary" },
                { icon: Code, label: "Code" },
                { icon: Palette, label: "Design" },
                { icon: Globe, label: "Research" },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.label
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <tab.icon className="size-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
