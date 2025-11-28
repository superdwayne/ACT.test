'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  Plus, 
  Search, 
  Brain, 
  Lightbulb, 
  Target, 
  Pencil, 
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  score: number
  trend: number
  color: string
  icon: any
  features: string[]
  badge?: string
}

const agents: Agent[] = [
  {
    id: "planner",
    name: "Strategic Planner",
    description: "Expert in account planning, budget allocation, and strategic resource management.",
    category: "Strategy",
    rating: 4.8,
    reviews: 342,
    score: 4450,
    trend: 15.3,
    color: "blue",
    icon: Calendar,
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
    rating: 4.9,
    reviews: 289,
    score: 4680,
    trend: 22.7,
    color: "purple",
    icon: Lightbulb,
    features: [
      "Design thinking workshops",
      "Creative brainstorming sessions",
      "Innovation strategy development"
    ]
  },
  {
    id: "analyst",
    name: "Data Analyst",
    description: "Transform raw data into actionable insights with advanced analytics.",
    category: "Analytics",
    rating: 4.7,
    reviews: 412,
    score: 4320,
    trend: 18.5,
    color: "green",
    icon: Brain,
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
    rating: 4.6,
    reviews: 267,
    score: 4180,
    trend: 12.3,
    color: "orange",
    icon: Pencil,
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
    rating: 4.8,
    reviews: 356,
    score: 4520,
    trend: 25.1,
    color: "pink",
    icon: Sparkles,
    features: [
      "Workflow automation design",
      "Process efficiency analysis",
      "Integration & API management"
    ],
    badge: "Trending"
  },
  {
    id: "marketer",
    name: "Market Strategist",
    description: "Drive growth with data-driven market strategies and competitive analysis.",
    category: "Marketing",
    rating: 4.7,
    reviews: 298,
    score: 4390,
    trend: 16.8,
    color: "red",
    icon: Target,
    features: [
      "Market research & analysis",
      "Competitive intelligence",
      "Growth strategy planning"
    ]
  }
]

export default function AIAgentsDashboard() {
  const { setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  const categories = ["all", ...Array.from(new Set(agents.map(a => a.category)))]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">AI Agents</h2>
              <p className="text-sm text-muted-foreground">Select and manage your AI agents</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Search className="mr-2 size-4" /> Browse All
              </Button>
              <Button>
                <Plus className="mr-2 size-4" /> Create Agent
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Agents</CardDescription>
                <CardTitle className="text-3xl">{agents.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Available for use</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg Rating</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  4.7
                  <Star className="size-5 fill-yellow-500 text-yellow-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Across all agents</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Reviews</CardDescription>
                <CardTitle className="text-3xl">2K+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">User feedback</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg Growth</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  +18%
                  <TrendingUp className="size-5 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Performance trend</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
              <TabsList>
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All" : cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'}
            </p>
          </div>

          {/* Agents Grid */}
          {filteredAgents.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-muted-foreground">No agents found. Try adjusting your search.</p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => {
                const Icon = agent.icon
                return (
                  <Card key={agent.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {agent.category}
                            </Badge>
                          </div>
                        </div>
                        {agent.badge && (
                          <Badge className="shrink-0">{agent.badge}</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm mt-2">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(agent.rating)
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({agent.reviews})
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Score</p>
                            <p className="text-sm font-bold">{agent.score}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`h-4 w-4 ${agent.trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Trend</p>
                            <p className={`text-sm font-bold ${agent.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {agent.trend > 0 ? '+' : ''}{agent.trend}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-1.5 text-xs">
                        {agent.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="w-full group">
                        Select Agent
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
