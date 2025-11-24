import { AIAgentsNavigation } from "./ai-agents-navigation";
import { AgentsSection } from "./agent-card";

export function AIAgentsHeaderV2() {
  return (
    <div className="bg-background flex flex-col gap-0 items-center w-full min-h-screen">
      <AIAgentsNavigation />
      <AgentsSection />
    </div>
  );
}
