"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Brain, 
  Lightbulb, 
  Target, 
  Pencil, 
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";

export interface ShadcnBlocksAgentData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  score: number;
  trend: number;
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  features: string[];
  badge?: string;
}

const colorSchemes = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-500",
    border: "border-blue-200",
    hover: "hover:border-blue-400",
    icon: "text-blue-600",
    chart: "#3b82f6",
  },
  green: {
    gradient: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
    border: "border-emerald-200",
    hover: "hover:border-emerald-400",
    icon: "text-emerald-600",
    chart: "#10b981",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-500",
    border: "border-orange-200",
    hover: "hover:border-orange-400",
    icon: "text-orange-600",
    chart: "#f97316",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    badge: "bg-purple-500",
    border: "border-purple-200",
    hover: "hover:border-purple-400",
    icon: "text-purple-600",
    chart: "#a855f7",
  },
  pink: {
    gradient: "from-pink-500 to-pink-600",
    bg: "bg-pink-50",
    text: "text-pink-700",
    badge: "bg-pink-500",
    border: "border-pink-200",
    hover: "hover:border-pink-400",
    icon: "text-pink-600",
    chart: "#ec4899",
  },
  red: {
    gradient: "from-red-500 to-red-600",
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-500",
    border: "border-red-200",
    hover: "hover:border-red-400",
    icon: "text-red-600",
    chart: "#ef4444",
  },
};

const iconMap = {
  sparkles: Sparkles,
  brain: Brain,
  lightbulb: Lightbulb,
  target: Target,
  pencil: Pencil,
  calendar: Calendar,
};

interface ShadcnBlocksAgentCardProps {
  agent: ShadcnBlocksAgentData;
  onClick?: () => void;
  featured?: boolean;
  className?: string;
}

export function ShadcnBlocksAgentCard({ 
  agent, 
  onClick, 
  featured = false,
  className 
}: ShadcnBlocksAgentCardProps) {
  const scheme = colorSchemes[agent.color];
  const Icon = iconMap[agent.icon];
  const isPositive = agent.trend > 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-300",
        featured ? "border-2 shadow-xl" : "shadow-lg",
        scheme.border,
        scheme.hover
      )}>
        {/* Featured Badge */}
        {featured && (
          <Badge className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-white font-bold",
            scheme.badge
          )}>
            {agent.badge || "Most Popular"}
          </Badge>
        )}

        {/* Header with Icon */}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
              scheme.gradient
            )}>
              <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            
            {/* Category Badge */}
            <Badge variant="secondary" className="text-xs">
              {agent.category}
            </Badge>
          </div>

          <div className="mt-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {agent.name}
            </CardTitle>
            <CardDescription className="mt-1.5 text-base font-medium">
              {agent.tagline}
            </CardDescription>
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(agent.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({agent.reviews})
            </span>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {agent.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <Zap className={cn("h-5 w-5", scheme.icon)} />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Score</p>
                <p className={cn("text-xl font-bold tabular-nums", scheme.text)}>
                  {agent.score}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className={cn(
                "h-5 w-5",
                isPositive ? "text-green-600" : "text-red-600"
              )} />
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-medium">Trend</p>
                <p className={cn(
                  "text-xl font-bold tabular-nums",
                  isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {isPositive ? "+" : ""}{agent.trend}%
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            {agent.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  scheme.badge
                )} />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex gap-2 pt-4">
          <Button 
            className={cn(
              "w-full group/btn bg-gradient-to-r text-white font-semibold shadow-md hover:shadow-lg transition-all",
              scheme.gradient
            )}
            size="lg"
          >
            Select Agent
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>

        {/* Hover Glow Effect */}
        <div className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 blur-xl",
          scheme.gradient
        )} />
      </Card>
    </motion.div>
  );
}
