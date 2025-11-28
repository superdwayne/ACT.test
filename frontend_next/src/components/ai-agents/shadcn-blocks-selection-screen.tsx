"use client";

import { useState } from "react";
import { ShadcnBlocksAgentCard, ShadcnBlocksAgentData } from "./shadcn-blocks-agent-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Grid3x3, LayoutGrid } from "lucide-react";

const agentData: ShadcnBlocksAgentData[] = [
  {
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
  },
  {
    id: "brainstormer",
    name: "Creative Brainstormer",
    tagline: "Ideation & Innovation Expert",
    description: "Facilitates creative brainstorming sessions, generates innovative ideas, and helps teams think outside the box.",
    category: "CREATIVE",
    rating: 4.9,
    reviews: 428,
    score: 4650,
    trend: 22.7,
    color: "green",
    icon: "lightbulb",
    features: [
      "Creative ideation sessions",
      "Innovation workshops",
      "Concept development"
    ],
  },
  {
    id: "strategist",
    name: "Business Strategist",
    tagline: "Strategic Playbook Developer",
    description: "Develops comprehensive business strategies, competitive analysis, and actionable playbooks for success.",
    category: "STRATEGY",
    rating: 4.7,
    reviews: 289,
    score: 4320,
    trend: 18.5,
    color: "orange",
    icon: "target",
    features: [
      "Strategic framework development",
      "Competitive analysis",
      "Market positioning"
    ],
  },
  {
    id: "writer",
    name: "Content Writer",
    tagline: "Creative Brief & Debrief Specialist",
    description: "Crafts compelling creative briefs, detailed debriefs, and engaging content that resonates with audiences.",
    category: "CONTENT",
    rating: 4.6,
    reviews: 512,
    score: 4280,
    trend: 12.4,
    color: "purple",
    icon: "pencil",
    features: [
      "Creative brief writing",
      "Project debriefs",
      "Content strategy"
    ],
  },
  {
    id: "analyst",
    name: "Data Analyst",
    tagline: "Insights & Analytics Pro",
    description: "Transforms raw data into actionable insights, identifies trends, and provides data-driven recommendations.",
    category: "INSIGHTS",
    rating: 4.8,
    reviews: 376,
    score: 4520,
    trend: 20.1,
    color: "pink",
    icon: "brain",
    features: [
      "Data analysis & visualization",
      "Trend identification",
      "Predictive insights"
    ],
  },
  {
    id: "innovator",
    name: "Innovation Catalyst",
    tagline: "Trend Spotter & Innovator",
    description: "Identifies emerging trends, drives innovation initiatives, and helps organizations stay ahead of the curve.",
    category: "CREATIVE",
    rating: 4.9,
    reviews: 445,
    score: 4720,
    trend: 25.8,
    color: "red",
    icon: "sparkles",
    features: [
      "Trend forecasting",
      "Innovation strategy",
      "Disruptive thinking"
    ],
  },
];

interface ShadcnBlocksSelectionScreenProps {
  onSelectAgent?: (agent: ShadcnBlocksAgentData) => void;
  className?: string;
}

export function ShadcnBlocksSelectionScreen({ 
  onSelectAgent, 
  className 
}: ShadcnBlocksSelectionScreenProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleAgentClick = (agent: ShadcnBlocksAgentData) => {
    setSelectedAgent(agent.id);
    onSelectAgent?.(agent);
  };

  const categories = ["all", "strategy", "creative", "content", "insights"];
  
  const filteredAgents = agentData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
                           agent.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", className)}>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5">
            AI-Powered Agents
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 tracking-tight">
            Choose Your AI Agent
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto">
            Select from our collection of specialized AI agents to supercharge your workflow
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "compact" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("compact")}
            >
              <Grid3x3 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-12">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-sm font-semibold capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Agent Grid */}
        <div className={cn(
          "grid gap-8 mb-12",
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {filteredAgents.map((agent, index) => (
            <ShadcnBlocksAgentCard
              key={agent.id}
              agent={agent}
              onClick={() => handleAgentClick(agent)}
              featured={index === 0}
              className={cn(
                "transition-all duration-300",
                selectedAgent === agent.id && "ring-4 ring-offset-4 ring-blue-500"
              )}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No agents found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Selected Agent Info */}
        {selectedAgent && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-4 border-2 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-medium mb-1">Selected Agent</p>
                  <p className="text-lg font-bold text-slate-900">
                    {agentData.find(a => a.id === selectedAgent)?.name}
                  </p>
                </div>
                <Button
                  onClick={() => setSelectedAgent(null)}
                  variant="outline"
                  size="sm"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900">{agentData.length}</p>
            <p className="text-sm text-slate-600 font-medium">AI Agents</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900">4.8</p>
            <p className="text-sm text-slate-600 font-medium">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900">2.4K+</p>
            <p className="text-sm text-slate-600 font-medium">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-slate-900">18.5%</p>
            <p className="text-sm text-slate-600 font-medium">Avg Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
