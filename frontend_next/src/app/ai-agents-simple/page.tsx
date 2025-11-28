"use client";

import { SimpleAgentCard, type SimpleAgentData } from "@/components/ai-agents/simple-agent-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState } from "react";

const agents: SimpleAgentData[] = [
  {
    id: "planner",
    name: "Strategic Planner",
    description: "Expert in account planning, budget allocation, and strategic resource management.",
    category: "Strategy",
    features: [
      "Budget optimization & forecasting",
      "Resource allocation planning",
      "Timeline & milestone tracking"
    ],
    badge: "Popular"
  },
  {
    id: "creative",
    name: "Creative Genius",
    description: "Specializes in creative problem-solving, design thinking, and innovative solutions.",
    category: "Creative",
    features: [
      "Design thinking workshops",
      "Creative brainstorming sessions",
      "Innovation strategy development"
    ]
  },
  {
    id: "analyst",
    name: "Data Analyst",
    description: "Transform raw data into actionable insights with advanced analytics and visualization.",
    category: "Analytics",
    features: [
      "Advanced data visualization",
      "Predictive analytics modeling",
      "Real-time reporting dashboards"
    ]
  },
  {
    id: "writer",
    name: "Content Creator",
    description: "Craft compelling narratives and engaging content across all platforms.",
    category: "Content",
    features: [
      "Multi-platform content creation",
      "SEO optimization strategies",
      "Audience engagement analytics"
    ]
  },
  {
    id: "automation",
    name: "Automation Expert",
    description: "Streamline operations with intelligent automation and process optimization.",
    category: "Automation",
    features: [
      "Workflow automation design",
      "Process efficiency analysis",
      "Integration & API management"
    ],
    badge: "New"
  },
  {
    id: "marketer",
    name: "Market Strategist",
    description: "Drive growth with data-driven market strategies and competitive analysis.",
    category: "Marketing",
    features: [
      "Market research & analysis",
      "Competitive intelligence",
      "Growth strategy planning"
    ]
  }
];

export default function SimpleAgentSelectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(agents.map(a => a.category)))];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectAgent = (agent: SimpleAgentData) => {
    console.log("Selected agent:", agent);
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4">AI Agents</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Choose Your AI Agent
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our collection of specialized AI agents designed to help you work smarter
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat === "all" ? "All" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'}
          </p>
        </div>

        {/* Agent Grid */}
        {filteredAgents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No agents found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <SimpleAgentCard
                key={agent.id}
                agent={agent}
                onClick={() => handleSelectAgent(agent)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="border-t mt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose an AI agent above to begin transforming your workflow
          </p>
        </div>
      </section>
    </div>
  );
}
