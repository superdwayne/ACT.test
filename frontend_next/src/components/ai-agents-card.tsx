import { cn } from "@/lib/utils";

interface AgentCardProps {
  title: string;
  description?: string;
  descriptions?: string[];
  className?: string;
}

export function AgentCard({ title, description, descriptions, className }: AgentCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap">
        {title}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
      {descriptions && descriptions.length > 0 && (
        <div className="flex flex-col gap-2">
          {descriptions.map((desc, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              {desc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface AgentsSectionProps {
  className?: string;
}

export function AgentsSection({ className }: AgentsSectionProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-8 py-16", className)}>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
        AI Agents
      </h1>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
        {/* Left Agent Cards */}
        <div className="flex flex-col gap-6 items-center md:items-end">
          <AgentCard
            title="Planner"
            description="Account Planning & Budget"
            className="items-center md:items-end"
          />
          <div className="text-sm text-muted-foreground">Convex Schema</div>
          <AgentCard
            title="Brainstormer"
            description="Brainstorm session"
            className="items-center md:items-end"
          />
        </div>

        {/* Center Rubik's Cube Illustration */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-blue-100 flex items-center justify-center">
            {/* Placeholder for Rubik's cube illustration */}
            <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 rounded-lg transform rotate-12 shadow-lg">
              <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/20 rounded-sm border border-white/40"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Agent Cards */}
        <div className="flex flex-col gap-6 items-center md:items-start">
          <AgentCard
            title="Strategist"
            description="Strategy Playbook"
            className="items-center md:items-start"
          />
          <AgentCard
            title="Writer"
            descriptions={["Write Debrief", "Write Creative Brief"]}
            className="items-center md:items-start"
          />
        </div>
      </div>
    </div>
  );
}
