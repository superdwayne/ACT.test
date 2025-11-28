"use client";

import { AgentSelectionCard, AgentData } from "@/components/ai-agents/agent-selection-card";
import { PlayfulAgentCard, PlayfulAgentData } from "@/components/ai-agents/playful-agent-card";
import { ShadcnBlocksAgentCard, ShadcnBlocksAgentData } from "@/components/ai-agents/shadcn-blocks-agent-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const standardAgent: AgentData = {
  id: "planner",
  name: "PLANNER",
  category: "STRATEGY",
  score: 4450,
  color: "blue",
  icon: "calendar",
  description: "Account Planning & Budget Management",
};

const playfulAgent: PlayfulAgentData = {
  ...standardAgent,
  pattern: "waves",
};

const shadcnBlocksAgent: ShadcnBlocksAgentData = {
  id: "planner",
  name: "Strategic Planner",
  tagline: "Master of Planning & Budgets",
  description: "Expert in account planning, budget allocation, and strategic resource management for optimal project outcomes.",
  category: "STRATEGY",
  rating: 4.8,
  reviews: 342,
  score: 4450,
  trend: 15.3,
  color: "blue",
  icon: "calendar",
  features: [
    "Budget optimization & forecasting",
    "Resource allocation planning",
    "Timeline & milestone tracking"
  ],
  badge: "Most Popular"
};

export default function AllVersionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5">
            Component Showcase
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            AI Agent Card Versions
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
            Compare all three design styles and choose the one that fits your needs
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Version 1: Standard */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Standard Card
              </h2>
              <p className="text-slate-600 text-sm">
                Clean, modern design with subtle animations
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <AgentSelectionCard
                  agent={standardAgent}
                  onClick={() => console.log("Standard clicked")}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h3 className="font-bold text-base mb-3">Features:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Minimal, professional design</li>
                <li>✓ Scale + lift animation</li>
                <li>✓ Icon-based character</li>
                <li>✓ Score display</li>
                <li>✓ Compact size</li>
              </ul>
              <Link href="/ai-agent-selection">
                <Button className="w-full mt-4" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Version 2: Playful */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Playful Card
              </h2>
              <p className="text-slate-600 text-sm">
                Vibrant, game-inspired with enhanced animations
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <PlayfulAgentCard
                  agent={playfulAgent}
                  onClick={() => console.log("Playful clicked")}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h3 className="font-bold text-base mb-3">Features:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Bold, vibrant design</li>
                <li>✓ Scale + rotate animation</li>
                <li>✓ Animated decorations</li>
                <li>✓ Corner accents</li>
                <li>✓ Larger card size</li>
                <li>✓ Enhanced shadows</li>
              </ul>
              <Link href="/ai-agent-selection-demo">
                <Button className="w-full mt-4" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Version 3: Shadcn Blocks */}
          <div className="space-y-6">
            <div className="text-center">
              <Badge className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                NEW
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Shadcn Blocks
              </h2>
              <p className="text-slate-600 text-sm">
                Professional design with rich features
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <ShadcnBlocksAgentCard
                  agent={shadcnBlocksAgent}
                  onClick={() => console.log("Shadcn blocks clicked")}
                  featured={true}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h3 className="font-bold text-base mb-3">Features:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>✓ Star ratings & reviews</li>
                <li>✓ Trend indicators</li>
                <li>✓ Feature lists</li>
                <li>✓ Gradient buttons</li>
                <li>✓ Stats display</li>
                <li>✓ Hover glow effect</li>
                <li>✓ Featured badge</li>
              </ul>
              <Link href="/ai-agents-shadcn-blocks">
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl border p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Standard</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Playful</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Shadcn Blocks</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Animations</td>
                  <td className="text-center py-4 px-4">Scale + Lift</td>
                  <td className="text-center py-4 px-4">Scale + Rotate</td>
                  <td className="text-center py-4 px-4">Scale + Lift</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Star Ratings</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Trend Indicators</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Feature Lists</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Decorative Elements</td>
                  <td className="text-center py-4 px-4">Minimal</td>
                  <td className="text-center py-4 px-4">Animated Circles</td>
                  <td className="text-center py-4 px-4">Glow Effect</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Card Size</td>
                  <td className="text-center py-4 px-4">Medium</td>
                  <td className="text-center py-4 px-4">Large</td>
                  <td className="text-center py-4 px-4">Medium-Large</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Best For</td>
                  <td className="text-center py-4 px-4">Professional Apps</td>
                  <td className="text-center py-4 px-4">Playful/Gaming</td>
                  <td className="text-center py-4 px-4">Enterprise/SaaS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/ai-agent-selection">
            <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg mb-2">Standard Demo</h3>
              <p className="text-sm text-slate-600">View the clean, minimal version</p>
            </div>
          </Link>
          <Link href="/ai-agent-selection-demo">
            <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg mb-2">Playful Demo</h3>
              <p className="text-sm text-slate-600">View the vibrant, game-inspired version</p>
            </div>
          </Link>
          <Link href="/ai-agents-shadcn-blocks">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-bold text-lg mb-2 text-white">Shadcn Blocks Demo</h3>
              <p className="text-sm text-white/90">View the feature-rich version</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
