"use client";

import { motion } from "motion/react";
import { ShadcnBlocksAgentCard, type ShadcnBlocksAgentData } from "./shadcn-blocks-agent-card";

interface AgentGridSectionProps {
  agents: ShadcnBlocksAgentData[];
  onSelectAgent: (agent: ShadcnBlocksAgentData) => void;
  title?: string;
  description?: string;
}

export function AgentGridSection({ 
  agents, 
  onSelectAgent, 
  title = "Featured AI Agents",
  description = "Discover our most popular and highly-rated AI agents"
}: AgentGridSectionProps) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ShadcnBlocksAgentCard
              agent={agent}
              onClick={() => onSelectAgent(agent)}
              featured={agent.badge === "Most Popular"}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
