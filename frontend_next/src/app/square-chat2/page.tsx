"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function SquareChat2Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: Date;
  }>>([]);
  const [isConversationStarted, setIsConversationStarted] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user" as const,
      timestamp: new Date(),
    };

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      content: "Hello! I'm Square AI, your intelligent assistant. I'm here to help you with anything you need. How can I assist you today?",
      sender: "ai" as const,
      timestamp: new Date(),
    };

    setMessages([userMessage, aiMessage]);
    setMessage("");
    setIsConversationStarted(true);
  };

  const handleReset = () => {
    setMessages([]);
    setMessage("");
    setIsConversationStarted(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64 border-r border-border bg-sidebar">
        <div className="flex h-full flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <svg className="size-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </div>
              <span className="font-semibold">Square AI</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Recent
              </div>
              <Button variant="ghost" className="w-full justify-start text-sm">
                New Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between border-b border-border px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="size-5" />
          </Button>
          <span className="font-semibold">Square AI</span>
          <div className="size-10" />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                  linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #27272a 1px, transparent 1px),
                  linear-gradient(to bottom, #27272a 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Chat Content */}
          <div className="relative z-10 h-full flex flex-col">
            {!isConversationStarted ? (
              // Welcome Screen
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl space-y-8">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="size-20 rounded-2xl bg-primary flex items-center justify-center">
                        <svg className="size-12 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="2" />
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold">Hey! I'm Square.ai</h1>
                    <p className="text-xl text-muted-foreground">Tell me everything you need</p>
                  </div>

                  {/* Input Box */}
                  <div className="rounded-2xl border border-border bg-card p-1">
                    <div className="rounded-xl border border-border bg-background">
                      <textarea
                        placeholder="Ask anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        className="w-full min-h-[120px] resize-none border-0 bg-transparent px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none"
                      />
                      <div className="flex items-center justify-end px-4 py-3 border-t border-border">
                        <Button onClick={handleSend} disabled={!message.trim()}>
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Square AI can make mistakes. Check important info.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Conversation View
              <>
                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                      >
                        New Chat
                      </Button>
                    </div>
                    
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-4 ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div className="shrink-0">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                              <svg className="size-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="8" y="8" width="8" height="8" rx="1" />
                              </svg>
                            </div>
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>

                        {msg.sender === "user" && (
                          <div className="shrink-0">
                            <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-sm font-medium">U</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-border px-4 md:px-8 py-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="rounded-2xl border border-border bg-card p-1">
                      <div className="rounded-xl border border-border bg-background">
                        <textarea
                          placeholder="Continue the conversation..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              if (message.trim()) {
                                const newMsg = {
                                  id: Date.now().toString(),
                                  content: message,
                                  sender: "user" as const,
                                  timestamp: new Date(),
                                };
                                setMessages([...messages, newMsg]);
                                setMessage("");
                              }
                            }
                          }}
                          className="w-full min-h-[80px] resize-none border-0 bg-transparent px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none"
                        />
                        <div className="flex items-center justify-end px-4 py-3 border-t border-border">
                          <Button
                            onClick={() => {
                              if (message.trim()) {
                                const newMsg = {
                                  id: Date.now().toString(),
                                  content: message,
                                  sender: "user" as const,
                                  timestamp: new Date(),
                                };
                                setMessages([...messages, newMsg]);
                                setMessage("");
                              }
                            }}
                            disabled={!message.trim()}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
