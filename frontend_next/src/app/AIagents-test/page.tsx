"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Brain, Lightbulb, Target, Zap, Settings, Activity } from "lucide-react";

export default function AIAgentsTestPage() {
  const agents = [
    {
      id: 1,
      name: "Planner Agent",
      description: "Strategic planning and budget allocation for campaigns",
      status: "active",
      icon: Target,
      capabilities: ["Budget Planning", "Resource Allocation", "Timeline Management"],
      metrics: { tasks: 24, efficiency: 94 }
    },
    {
      id: 2,
      name: "Brainstormer Agent",
      description: "Creative ideation and concept generation",
      status: "active",
      icon: Lightbulb,
      capabilities: ["Idea Generation", "Creative Concepts", "Trend Analysis"],
      metrics: { tasks: 18, efficiency: 89 }
    },
    {
      id: 3,
      name: "Strategist Agent",
      description: "Campaign strategy and competitive analysis",
      status: "active",
      icon: Brain,
      capabilities: ["Market Analysis", "Strategy Development", "Competitor Research"],
      metrics: { tasks: 31, efficiency: 96 }
    },
    {
      id: 4,
      name: "Writer Agent",
      description: "Content creation and copywriting",
      status: "idle",
      icon: Bot,
      capabilities: ["Creative Briefs", "Debrief Writing", "Content Optimization"],
      metrics: { tasks: 42, efficiency: 91 }
    },
    {
      id: 5,
      name: "Optimizer Agent",
      description: "Performance optimization and A/B testing",
      status: "active",
      icon: Zap,
      capabilities: ["Performance Analysis", "A/B Testing", "Conversion Optimization"],
      metrics: { tasks: 15, efficiency: 88 }
    },
    {
      id: 6,
      name: "Coordinator Agent",
      description: "Multi-agent coordination and workflow management",
      status: "idle",
      icon: Settings,
      capabilities: ["Workflow Coordination", "Task Distribution", "Agent Orchestration"],
      metrics: { tasks: 12, efficiency: 92 }
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "idle":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">AI Agents Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage and monitor your autonomous AI agents for campaign management
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{agents.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {agents.filter(a => a.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Currently running</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {agents.reduce((sum, agent) => sum + agent.metrics.tasks, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Completed this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(agents.reduce((sum, agent) => sum + agent.metrics.efficiency, 0) / agents.length)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Performance score</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">AI Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <Badge variant={getStatusVariant(agent.status)} className="mt-2">
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-3">{agent.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Capabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Tasks</p>
                        <p className="text-xl font-bold">{agent.metrics.tasks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                        <p className="text-xl font-bold">{agent.metrics.efficiency}%</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">Configure</Button>
                      <Button size="sm" variant="outline" className="flex-1">View Logs</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Agent Activity</CardTitle>
            <CardDescription>Latest actions performed by your AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: "Strategist Agent", action: "Completed market analysis for Q4 campaign", time: "2 minutes ago" },
                { agent: "Writer Agent", action: "Generated creative brief for new product launch", time: "15 minutes ago" },
                { agent: "Planner Agent", action: "Optimized budget allocation across channels", time: "1 hour ago" },
                { agent: "Brainstormer Agent", action: "Created 12 new campaign concepts", time: "2 hours ago" },
                { agent: "Optimizer Agent", action: "Improved conversion rate by 3.2%", time: "3 hours ago" }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.agent}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
