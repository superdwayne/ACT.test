"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShadcnBlocksAgentCard, type ShadcnBlocksAgentData } from "@/components/ai-agents/shadcn-blocks-agent-card";
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

// Sample agent data
const agents: ShadcnBlocksAgentData[] = [
  {
    id: "strategic-planner",
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
    id: "creative-genius",
    name: "Creative Genius",
    tagline: "Innovation & Design Expert",
    description: "Specializes in creative problem-solving, design thinking, and innovative solutions that push boundaries.",
    category: "CREATIVE",
    rating: 4.9,
    reviews: 289,
    score: 4680,
    trend: 22.7,
    color: "purple",
    icon: "lightbulb",
    features: [
      "Design thinking workshops",
      "Creative brainstorming sessions",
      "Innovation strategy development"
    ],
    badge: "Top Rated"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    tagline: "Insights & Analytics Pro",
    description: "Transform raw data into actionable insights with advanced analytics, visualization, and reporting capabilities.",
    category: "ANALYTICS",
    rating: 4.7,
    reviews: 412,
    score: 4320,
    trend: 18.5,
    color: "green",
    icon: "brain",
    features: [
      "Advanced data visualization",
      "Predictive analytics modeling",
      "Real-time reporting dashboards"
    ]
  },
  {
    id: "content-creator",
    name: "Content Creator",
    tagline: "Storytelling & Content Master",
    description: "Craft compelling narratives and engaging content across all platforms with SEO optimization and audience insights.",
    category: "CONTENT",
    rating: 4.6,
    reviews: 267,
    score: 4180,
    trend: 12.3,
    color: "orange",
    icon: "pencil",
    features: [
      "Multi-platform content creation",
      "SEO optimization strategies",
      "Audience engagement analytics"
    ]
  },
  {
    id: "automation-expert",
    name: "Automation Expert",
    tagline: "Workflow & Process Optimizer",
    description: "Streamline operations with intelligent automation, process optimization, and efficiency improvements.",
    category: "AUTOMATION",
    rating: 4.8,
    reviews: 356,
    score: 4520,
    trend: 25.1,
    color: "pink",
    icon: "sparkles",
    features: [
      "Workflow automation design",
      "Process efficiency analysis",
      "Integration & API management"
    ],
    badge: "Trending"
  },
  {
    id: "market-strategist",
    name: "Market Strategist",
    tagline: "Growth & Market Analysis",
    description: "Drive growth with data-driven market strategies, competitive analysis, and customer acquisition tactics.",
    category: "MARKETING",
    rating: 4.7,
    reviews: 298,
    score: 4390,
    trend: 16.8,
    color: "red",
    icon: "target",
    features: [
      "Market research & analysis",
      "Competitive intelligence",
      "Growth strategy planning"
    ]
  }
];

export default function AIAgentSelectionV2() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filter and sort agents
  const filteredAgents = agents
    .filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "trending":
          return b.trend - a.trend;
        case "score":
          return b.score - a.score;
        default:
          return b.reviews - a.reviews;
      }
    });

  const categories = ["all", ...Array.from(new Set(agents.map(a => a.category)))];

  const handleSelectAgent = (agent: ShadcnBlocksAgentData) => {
    console.log("Selected agent:", agent);
    // Add navigation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-semibold">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Choose Your AI Agent
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-8">
            Select from our curated collection of specialized AI agents designed to supercharge your workflow
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">{agents.length}+</div>
              <div className="text-sm text-slate-300">AI Agents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">4.7</div>
              <div className="text-sm text-slate-300">Avg Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">2K+</div>
              <div className="text-sm text-slate-300">Reviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">18%</div>
              <div className="text-sm text-slate-300">Avg Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px] h-11 bg-white">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] h-11 bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="score">Top Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {filteredAgents.length} {filteredAgents.length === 1 ? 'Agent' : 'Agents'} Available
              </h2>
              <p className="text-slate-600 mt-1">
                {selectedCategory === "all" 
                  ? "Showing all categories" 
                  : `Filtered by ${selectedCategory}`}
              </p>
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No agents found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAgents.map((agent) => (
                  <ShadcnBlocksAgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleSelectAgent(agent)}
                    featured={agent.badge === "Most Popular"}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No agents found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAgents.map((agent) => (
                  <ShadcnBlocksAgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleSelectAgent(agent)}
                    featured={agent.badge === "Most Popular"}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Feature Highlights */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose Our AI Agents?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Built with cutting-edge technology and designed for maximum productivity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Top Rated</h3>
              <p className="text-slate-300">
                All agents are highly rated by thousands of satisfied users with proven track records.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-300">
                Optimized for speed and efficiency, delivering results in seconds, not hours.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Always Improving</h3>
              <p className="text-slate-300">
                Continuously updated with the latest AI advancements and user feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Choose an AI agent above and start transforming your workflow today
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-slate-100 font-bold text-lg px-8 py-6 h-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Browse All Agents
          </Button>
        </div>
      </section>
    </div>
  );
}
