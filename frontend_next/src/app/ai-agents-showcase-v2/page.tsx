"use client";

import { useState } from "react";
import { AgentHeroSection } from "@/components/ai-agents/agent-hero-section";
import { AgentGridSection } from "@/components/ai-agents/agent-grid-section";
import { AgentComparisonTable } from "@/components/ai-agents/agent-comparison-table";
import type { ShadcnBlocksAgentData } from "@/components/ai-agents/shadcn-blocks-agent-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users,
  ArrowRight,
  CheckCircle2
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

export default function AIAgentsShowcaseV2() {
  const handleSelectAgent = (agent: ShadcnBlocksAgentData) => {
    console.log("Selected agent:", agent);
    // Add navigation logic here
  };

  const handleGetStarted = () => {
    // Scroll to agents section
    document.getElementById('agents-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <AgentHeroSection 
        onGetStarted={handleGetStarted}
        stats={{
          agents: agents.length,
          rating: 4.7,
          reviews: 2000,
          growth: 18
        }}
      />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Why Choose Our AI Agents?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built with cutting-edge technology and designed for maximum productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Top Rated Performance</CardTitle>
              <CardDescription>
                All agents are highly rated by thousands of satisfied users with proven track records
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Optimized for speed and efficiency, delivering results in seconds, not hours
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Always Improving</CardTitle>
              <CardDescription>
                Continuously updated with the latest AI advancements and user feedback
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Bank-level encryption and security protocols to protect your sensitive data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-pink-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <CardTitle>24/7 Availability</CardTitle>
              <CardDescription>
                Your AI agents are always ready to work, no breaks or downtime required
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-red-200 transition-colors">
            <CardHeader>
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Share agents across your team and collaborate seamlessly on projects
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents-section" className="max-w-7xl mx-auto px-4 py-20">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">
                Browse AI Agents
              </h2>
              <p className="text-lg text-slate-600">
                Choose the perfect agent for your needs
              </p>
            </div>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <AgentGridSection 
              agents={agents}
              onSelectAgent={handleSelectAgent}
              title=""
              description=""
            />
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <AgentComparisonTable agents={agents} />
          </TabsContent>
        </Tabs>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started with your AI agent in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-6xl font-black opacity-10 p-6">
                1
              </div>
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Choose Your Agent</CardTitle>
                <CardDescription className="text-base">
                  Browse our collection and select the AI agent that best fits your needs and workflow
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white text-6xl font-black opacity-10 p-6">
                2
              </div>
              <CardHeader>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Configure & Customize</CardTitle>
                <CardDescription className="text-base">
                  Tailor the agent to your specific requirements with our intuitive configuration interface
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-green-500 to-green-600 text-white text-6xl font-black opacity-10 p-6">
                3
              </div>
              <CardHeader>
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Start Working</CardTitle>
                <CardDescription className="text-base">
                  Begin collaborating with your AI agent and watch your productivity soar
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using our AI agents to boost productivity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-slate-100 font-bold text-lg px-8 py-6 h-auto"
                  onClick={handleGetStarted}
                >
                  Browse All Agents
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-bold text-lg px-8 py-6 h-auto"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
