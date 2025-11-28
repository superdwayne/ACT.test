"use client";

import { AgentSelectionCard, AgentData } from "@/components/ai-agents/agent-selection-card";
import { PlayfulAgentCard, PlayfulAgentData } from "@/components/ai-agents/playful-agent-card";

const sampleAgent: AgentData = {
  id: "planner",
  name: "PLANNER",
  category: "STRATEGY",
  score: 4450,
  color: "blue",
  icon: "calendar",
  description: "Account Planning & Budget Management",
};

const playfulAgent: PlayfulAgentData = {
  ...sampleAgent,
  pattern: "waves",
};

export default function AgentComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Component Comparison
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Choose the style that fits your design
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Standard Version */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Standard Card
              </h2>
              <p className="text-slate-600">
                Clean, modern design with subtle animations
              </p>
            </div>
            <div className="flex justify-center">
              <AgentSelectionCard
                agent={sampleAgent}
                onClick={() => console.log("Standard card clicked")}
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Features:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Scale + lift animation on hover</li>
                <li>✓ Clean, minimal design</li>
                <li>✓ Subtle decorative elements</li>
                <li>✓ Professional appearance</li>
                <li>✓ Smaller card size</li>
              </ul>
            </div>
          </div>

          {/* Playful Version */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Playful Card
              </h2>
              <p className="text-slate-600">
                Vibrant, game-inspired design with enhanced animations
              </p>
            </div>
            <div className="flex justify-center">
              <PlayfulAgentCard
                agent={playfulAgent}
                onClick={() => console.log("Playful card clicked")}
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Features:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Scale + rotate animation on hover</li>
                <li>✓ Bold, vibrant design</li>
                <li>✓ Animated decorative circles</li>
                <li>✓ Corner accents</li>
                <li>✓ Larger card size</li>
                <li>✓ Enhanced shadows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Usage Examples
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Usage */}
            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
              <h3 className="text-white font-bold mb-4">Standard Card</h3>
              <pre className="text-sm text-green-400">
{`import { AgentSelectionCard } from "@/components/ai-agents";

<AgentSelectionCard
  agent={{
    id: "planner",
    name: "PLANNER",
    category: "STRATEGY",
    score: 4450,
    color: "blue",
    icon: "calendar",
    description: "Account Planning",
  }}
  onClick={(agent) => console.log(agent)}
/>`}
              </pre>
            </div>

            {/* Playful Usage */}
            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
              <h3 className="text-white font-bold mb-4">Playful Card</h3>
              <pre className="text-sm text-green-400">
{`import { PlayfulAgentCard } from "@/components/ai-agents";

<PlayfulAgentCard
  agent={{
    id: "planner",
    name: "PLANNER",
    category: "STRATEGY",
    score: 4450,
    color: "blue",
    icon: "calendar",
    description: "Account Planning",
  }}
  onClick={(agent) => console.log(agent)}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-slate-600 font-medium">
            See full implementations:
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/ai-agent-selection"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Standard Demo
            </a>
            <a
              href="/ai-agent-selection-demo"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
            >
              Playful Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
