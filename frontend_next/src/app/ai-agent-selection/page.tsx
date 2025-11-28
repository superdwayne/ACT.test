"use client";

import { AgentSelectionScreen } from "@/components/ai-agents";
import type { AgentData } from "@/components/ai-agents";

export default function AIAgentSelectionPage() {
  const handleSelectAgent = (agent: AgentData) => {
    console.log("Selected agent:", agent);
    // You can add navigation or state management here
    // For example: router.push(`/chat/${agent.id}`)
  };

  return (
    <AgentSelectionScreen onSelectAgent={handleSelectAgent} />
  );
}
