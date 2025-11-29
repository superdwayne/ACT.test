"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Mountain, Code, Palette, Globe, BookOpen, Instagram, Twitter, Menu, Bot, User } from "lucide-react";
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

const RECENT_CHATS = [
  "What's something you've learned...",
  "Best travel experience",
  "Favorite book",
];

const SAMPLE_CONVERSATION = [
  {
    id: 1,
    role: "assistant",
    content: "Good Morning! How can I assist you with your mountain adventure today?",
    timestamp: "9:00 AM",
  },
];

const Logo = () => (
  <Link href="/mntn" className="flex items-center gap-2 text-3xl font-bold tracking-wider" style={{ fontFamily: '"Chronicle Display", serif' }}>
    <Mountain className="size-8" /> MNTN
  </Link>
);

export default function AIChatPage() {
  const [messages, setMessages] = React.useState(SAMPLE_CONVERSATION);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedMode, setSelectedMode] = React.useState(CHAT_MODES[0]);

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
        content: "I understand your question. Let me help you with that!",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#0B1D26] text-white min-h-screen">
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
            </div>
          </ScrollArea>

          <div className="border-t border-white/10 bg-[#0B1D26] p-6">
            <div className="max-w-4xl mx-auto">
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
