"use client";

import { useState } from "react";
import { PlayfulAgentCard, PlayfulAgentData } from "@/components/ai-agents/playful-agent-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const agentData: PlayfulAgentData[] = [
  {
    id: "planner",
    name: "PLANNER",
    category: "STRATEGY",
    score: 4450,
    color: "blue",
    icon: "calendar",
    description: "Account Planning & Budget Management",
    pattern: "waves",
  },
  {
    id: "brainstormer",
    name: "BRAINSTORMER",
    category: "CREATIVE",
    score: 4450,
    color: "green",
    icon: "lightbulb",
    description: "Ideation & Creative Sessions",
    pattern: "dots",
  },
  {
    id: "strategist",
    name: "STRATEGIST",
    category: "STRATEGY",
    score: 4450,
    color: "orange",
    icon: "target",
    description: "Strategic Playbook Development",
    pattern: "stripes",
  },
  {
    id: "writer",
    name: "WRITER",
    category: "CONTENT",
    score: 4450,
    color: "purple",
    icon: "pencil",
    description: "Creative Briefs & Debriefs",
    pattern: "blob",
  },
  {
    id: "analyst",
    name: "ANALYST",
    category: "INSIGHTS",
    score: 4450,
    color: "pink",
    icon: "brain",
    description: "Data Analysis & Insights",
    pattern: "waves",
  },
  {
    id: "innovator",
    name: "INNOVATOR",
    category: "CREATIVE",
    score: 4450,
    color: "red",
    icon: "sparkles",
    description: "Innovation & Trend Spotting",
    pattern: "dots",
  },
];

export default function AIAgentSelectionDemoPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentClick = (agent: PlayfulAgentData) => {
    setSelectedAgent(agent.id);
    console.log("Selected agent:", agent);
  };

  const handleReset = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            CHOOSE YOUR
            <br />
            AI AGENT
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 font-bold tracking-wide">
            Select an AI agent to help you with your creative tasks
          </p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
          {agentData.map((agent) => (
            <PlayfulAgentCard
              key={agent.id}
              agent={agent}
              onClick={() => handleAgentClick(agent)}
              className={cn(
                "transition-all duration-300",
                selectedAgent === agent.id && "ring-8 ring-white ring-offset-8 ring-offset-purple-600"
              )}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-4">
          {selectedAgent ? (
            <>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block">
                <p className="text-white text-lg font-bold">
                  Selected: {agentData.find(a => a.id === selectedAgent)?.name}
                </p>
              </div>
              <div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 font-bold"
                >
                  Reset Selection
                </Button>
              </div>
            </>
          ) : (
            <p className="text-purple-100 text-lg font-semibold">
              Click on an agent card to get started
            </p>
          )}
        </div>

        {/* Design Credits */}
        <div className="mt-12 text-center">
          <p className="text-purple-200/60 text-sm font-medium">
            Inspired by playful game character cards • Built with shadcn/ui & Motion
          </p>
        </div>
      </div>
    </div>
  );
}
