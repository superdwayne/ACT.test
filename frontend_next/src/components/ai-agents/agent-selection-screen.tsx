"use client";

import { useState } from "react";
import { AgentSelectionCard, AgentData } from "./agent-selection-card";
import { cn } from "@/lib/utils";

const agentData: AgentData[] = [
  {
    id: "planner",
    name: "PLANNER",
    category: "STRATEGY",
    score: 4450,
    color: "blue",
    icon: "calendar",
    description: "Account Planning & Budget Management",
  },
  {
    id: "brainstormer",
    name: "BRAINSTORMER",
    category: "CREATIVE",
    score: 4450,
    color: "green",
    icon: "lightbulb",
    description: "Ideation & Creative Sessions",
  },
  {
    id: "strategist",
    name: "STRATEGIST",
    category: "STRATEGY",
    score: 4450,
    color: "orange",
    icon: "target",
    description: "Strategic Playbook Development",
  },
  {
    id: "writer",
    name: "WRITER",
    category: "CONTENT",
    score: 4450,
    color: "purple",
    icon: "pencil",
    description: "Creative Briefs & Debriefs",
  },
  {
    id: "analyst",
    name: "ANALYST",
    category: "INSIGHTS",
    score: 4450,
    color: "pink",
    icon: "brain",
    description: "Data Analysis & Insights",
  },
  {
    id: "innovator",
    name: "INNOVATOR",
    category: "CREATIVE",
    score: 4450,
    color: "red",
    icon: "sparkles",
    description: "Innovation & Trend Spotting",
  },
];

interface AgentSelectionScreenProps {
  onSelectAgent?: (agent: AgentData) => void;
  className?: string;
}

export function AgentSelectionScreen({ onSelectAgent, className }: AgentSelectionScreenProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentClick = (agent: AgentData) => {
    setSelectedAgent(agent.id);
    onSelectAgent?.(agent);
  };

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 py-16 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            CHOOSE YOUR AI AGENT
          </h1>
          <p className="text-xl text-purple-100 font-medium">
            Select an AI agent to help you with your creative tasks
          </p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {agentData.map((agent) => (
            <AgentSelectionCard
              key={agent.id}
              agent={agent}
              onClick={() => handleAgentClick(agent)}
              className={cn(
                "transition-all duration-300",
                selectedAgent === agent.id && "ring-4 ring-white ring-offset-4 ring-offset-purple-600"
              )}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-purple-100 text-sm font-medium">
            {selectedAgent 
              ? `Selected: ${agentData.find(a => a.id === selectedAgent)?.name}` 
              : "Click on an agent card to get started"}
          </p>
        </div>
      </div>
    </div>
  );
}
