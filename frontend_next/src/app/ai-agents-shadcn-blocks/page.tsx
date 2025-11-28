"use client";

import { ShadcnBlocksSelectionScreen } from "@/components/ai-agents";
import type { ShadcnBlocksAgentData } from "@/components/ai-agents";

export default function AIShadcnBlocksPage() {
  const handleSelectAgent = (agent: ShadcnBlocksAgentData) => {
    console.log("Selected agent:", agent);
    // Add your navigation or state management logic here
    // Example: router.push(`/chat/${agent.id}`)
  };

  return (
    <ShadcnBlocksSelectionScreen onSelectAgent={handleSelectAgent} />
  );
}
