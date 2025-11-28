"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Palette, Grid3x3, LayoutGrid, Layers, Zap } from "lucide-react";

interface PageInfo {
  title: string;
  path: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  category: "Original" | "Enhanced" | "Shadcn Blocks" | "Comparison";
}

const pages: PageInfo[] = [
  // Shadcn Blocks Style (Recommended)
  {
    title: "Simple Agent Selection",
    path: "/ai-agents-simple",
    description: "True shadcn blocks style - clean, minimal, and professional. Follows actual shadcn-ui-blocks patterns.",
    badge: "Recommended",
    icon: <Sparkles className="h-5 w-5" />,
    category: "Shadcn Blocks"
  },
  {
    title: "Shadcn Blocks Demo",
    path: "/ai-agents-shadcn-blocks",
    description: "Enterprise-grade cards with ratings, trends, and rich features. Professional SaaS style.",
    icon: <Layers className="h-5 w-5" />,
    category: "Shadcn Blocks"
  },
  {
    title: "Selection V2",
    path: "/ai-agents-selection-v2",
    description: "Full-featured selection interface with search, filtering, sorting, and multiple view modes.",
    icon: <Grid3x3 className="h-5 w-5" />,
    category: "Shadcn Blocks"
  },
  {
    title: "Showcase V2",
    path: "/ai-agents-showcase-v2",
    description: "Complete showcase with hero section, feature cards, grid/table views, and marketing sections.",
    icon: <LayoutGrid className="h-5 w-5" />,
    category: "Shadcn Blocks"
  },

  // Comparison Pages
  {
    title: "All Versions Comparison",
    path: "/ai-agents-all-versions",
    description: "Side-by-side comparison of all three card styles (Standard, Playful, Shadcn Blocks) with feature table.",
    badge: "Compare",
    icon: <Layers className="h-5 w-5" />,
    category: "Comparison"
  },
  {
    title: "Agent Comparison",
    path: "/ai-agent-comparison",
    description: "Compare different agent implementations and styles.",
    icon: <Grid3x3 className="h-5 w-5" />,
    category: "Comparison"
  },

  // Original Versions
  {
    title: "Agent Selection (Standard)",
    path: "/ai-agent-selection",
    description: "Original clean, modern design with subtle animations. Minimal and professional.",
    icon: <Zap className="h-5 w-5" />,
    category: "Original"
  },
  {
    title: "Agent Selection Demo",
    path: "/ai-agent-selection-demo",
    description: "Playful, vibrant design with game-inspired animations and bold colors.",
    icon: <Palette className="h-5 w-5" />,
    category: "Original"
  },
  {
    title: "AI Agents Demo",
    path: "/ai-agents-demo",
    description: "Demo version of AI agents interface.",
    icon: <Zap className="h-5 w-5" />,
    category: "Original"
  },
  {
    title: "AI Agents Showcase",
    path: "/ai-agents-showcase",
    description: "Showcase of various AI agent implementations.",
    icon: <LayoutGrid className="h-5 w-5" />,
    category: "Original"
  },
  {
    title: "AI Agents V2",
    path: "/ai-agents-v2",
    description: "Version 2 of AI agents interface.",
    icon: <Layers className="h-5 w-5" />,
    category: "Enhanced"
  },
  {
    title: "AI Agents Test",
    path: "/AIagents-test",
    description: "Test version for experimenting with agent features.",
    icon: <Zap className="h-5 w-5" />,
    category: "Original"
  }
];

const categories = ["Shadcn Blocks", "Comparison", "Original", "Enhanced"] as const;

export default function AIAgentsNavigation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-12">
          <Badge className="mb-4">Navigation</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI Agent Pages
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Browse all available AI agent selection interfaces. Each page demonstrates different design approaches and features.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {categories.map((category) => {
          const categoryPages = pages.filter(p => p.category === category);
          if (categoryPages.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{category}</h2>
                <p className="text-muted-foreground">
                  {category === "Shadcn Blocks" && "Clean, minimal designs following true shadcn-ui-blocks patterns"}
                  {category === "Comparison" && "Compare different implementations side-by-side"}
                  {category === "Original" && "Original implementations with various design approaches"}
                  {category === "Enhanced" && "Enhanced versions with additional features"}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryPages.map((page) => (
                  <Card key={page.path} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-primary">
                            {page.icon}
                          </div>
                          <CardTitle className="text-lg">{page.title}</CardTitle>
                        </div>
                        {page.badge && (
                          <Badge variant="secondary" className="shrink-0">
                            {page.badge}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {page.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="mt-auto pt-0">
                      <Link href={page.path}>
                        <Button className="w-full group">
                          View Page
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Quick Stats */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{pages.length}</div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {pages.filter(p => p.category === "Shadcn Blocks").length}
              </div>
              <div className="text-sm text-muted-foreground">Shadcn Blocks</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {pages.filter(p => p.badge).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm text-muted-foreground">Design Styles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  For Production Use
                </CardTitle>
                <CardDescription>
                  Best choice for real applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Use <strong>Simple Agent Selection</strong> - it follows true shadcn blocks patterns, 
                  is easy to maintain, and provides a clean professional interface.
                </p>
                <Link href="/ai-agents-simple">
                  <Button className="w-full">
                    View Recommended
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  For Feature-Rich Apps
                </CardTitle>
                <CardDescription>
                  When you need more functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Use <strong>Selection V2</strong> or <strong>Showcase V2</strong> - they include 
                  search, filtering, sorting, and multiple view modes.
                </p>
                <Link href="/ai-agents-selection-v2">
                  <Button variant="outline" className="w-full">
                    View Feature-Rich
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
