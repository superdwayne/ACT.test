"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AgentBadgeProps {
  title: string;
  className?: string;
}

function AgentBadge({ title, className }: AgentBadgeProps) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-sm",
        className
      )}
    >
      {title}
    </div>
  );
}

interface AgentCardProps {
  title: string;
  description?: string;
  descriptions?: string[];
  align?: "left" | "center" | "right";
}

function AgentCard({ title, description, descriptions, align = "center" }: AgentCardProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={cn("flex flex-col gap-2", alignmentClasses[align])}>
      <AgentBadge title={title} />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {descriptions && descriptions.length > 0 && (
        <div className="flex flex-col gap-1">
          {descriptions.map((desc, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {desc}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

interface NavigationItemProps {
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
}

function NavigationItem({ label, hasDropdown, onClick }: NavigationItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-1 h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors"
    >
      <span className="font-medium text-sm text-foreground whitespace-nowrap">
        {label}
      </span>
      {hasDropdown && <ChevronDown className="w-3 h-3" />}
    </button>
  );
}

export function AIAgentsSection() {
  return (
    <div className="bg-background flex flex-col gap-0 items-center w-full min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-background flex items-center justify-between px-8 md:px-20 py-5 w-full border-b relative">
        {/* Logo */}
        <div className="flex items-center gap-2 z-10">
          <div className="text-blue-600 font-bold text-base md:text-lg">
            ACT AGENCY
          </div>
        </div>

        {/* Center Navigation Menu - Desktop Only */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-xl p-1.5 gap-0 items-center shadow-sm">
          <NavigationItem label="AI Tools" hasDropdown />
          <NavigationItem label="Create" hasDropdown />
          <NavigationItem label="Check" />
          <NavigationItem label="Approve" />
        </div>

        {/* Right CTAs */}
        <div className="flex gap-2 items-center z-10">
          <Button variant="ghost" size="sm" className="h-9 hidden sm:flex">
            Login
          </Button>
          <Button size="sm" className="h-9 shadow-sm">
            Get started
          </Button>
        </div>
      </nav>

      {/* AI Agents Content Section */}
      <section className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-20">
          AI Agents
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
          {/* Left Agent Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-end">
            <AgentCard
              title="Planner"
              description="Account Planning & Budget"
              align="center"
            />
            <p className="text-sm text-muted-foreground">Convex Schema</p>
            <AgentCard
              title="Brainstormer"
              description="Brainstorm session"
              align="center"
            />
          </div>

          {/* Center Illustration */}
          <Card className="flex-shrink-0 border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-blue-50 flex items-center justify-center">
                {/* Rubik's Cube Placeholder */}
                <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-red-400 via-yellow-400 to-blue-500 rounded-lg transform rotate-12 shadow-xl">
                  <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white/20 rounded-sm border border-white/40 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Agent Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start">
            <AgentCard
              title="Strategist"
              description="Strategy Playbook"
              align="center"
            />
            <AgentCard
              title="Writer"
              descriptions={["Write Debrief", "Write Creative Brief"]}
              align="center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
