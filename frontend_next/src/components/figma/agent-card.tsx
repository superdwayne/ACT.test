import * as React from "react";
import { cn } from "@/lib/utils";

export interface AgentCardProps {
  title: string;
  description?: string;
  descriptions?: string[];
  className?: string;
  align?: "left" | "center" | "right";
}

export function AgentCard({
  title,
  description,
  descriptions,
  className,
  align = "center",
}: AgentCardProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={cn("flex flex-col gap-2", alignmentClasses[align], className)}>
      <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
        {title}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {descriptions && descriptions.length > 0 && (
        <div className="flex flex-col gap-2">
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

export interface Agent {
  title: string;
  description?: string;
  descriptions?: string[];
}

export interface AgentsSectionProps {
  className?: string;
  title?: string;
  leftAgents?: Agent[];
  rightAgents?: Agent[];
  centerContent?: React.ReactNode;
}

const defaultLeftAgents: Agent[] = [
  {
    title: "Planner",
    description: "Account Planning & Budget",
  },
  {
    title: "Brainstormer",
    description: "Brainstorm session",
  },
];

const defaultRightAgents: Agent[] = [
  {
    title: "Strategist",
    description: "Strategy Playbook",
  },
  {
    title: "Writer",
    descriptions: ["Write Debrief", "Write Creative Brief"],
  },
];

export function AgentsSection({
  className,
  title = "AI Agents",
  leftAgents = defaultLeftAgents,
  rightAgents = defaultRightAgents,
  centerContent,
}: AgentsSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-8 py-16",
        className
      )}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
        {/* Left Agent Cards */}
        <div className="flex flex-col gap-6 items-center md:items-end">
          {leftAgents.map((agent, index) => (
            <React.Fragment key={agent.title}>
              <AgentCard
                title={agent.title}
                description={agent.description}
                descriptions={agent.descriptions}
                align="right"
                className="items-center md:items-end"
              />
              {/* Add "Convex Schema" text between first two agents */}
              {index === 0 && leftAgents.length > 1 && (
                <p className="text-sm text-muted-foreground">Convex Schema</p>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Center Content - Rubik's Cube Illustration */}
        {centerContent || (
          <div className="relative flex items-center justify-center flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
              {/* Rubik's cube illustration */}
              <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 rounded-lg transform rotate-12 shadow-xl">
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
          </div>
        )}

        {/* Right Agent Cards */}
        <div className="flex flex-col gap-6 items-center md:items-start">
          {rightAgents.map((agent) => (
            <AgentCard
              key={agent.title}
              title={agent.title}
              description={agent.description}
              descriptions={agent.descriptions}
              align="left"
              className="items-center md:items-start"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
