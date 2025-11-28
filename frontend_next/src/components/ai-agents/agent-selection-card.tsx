"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";
import { Sparkles, Brain, Lightbulb, Target, Pencil, Calendar } from "lucide-react";

export interface AgentData {
  id: string;
  name: string;
  category: string;
  score: number;
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  description: string;
}

const colorSchemes = {
  blue: {
    bg: "bg-gradient-to-br from-blue-400 to-blue-600",
    card: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-500",
    accent: "from-blue-300 to-blue-500",
  },
  green: {
    bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    card: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
    accent: "from-emerald-300 to-emerald-500",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-400 to-orange-600",
    card: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-500",
    accent: "from-orange-300 to-orange-500",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-400 to-purple-600",
    card: "bg-purple-50",
    text: "text-purple-700",
    badge: "bg-purple-500",
    accent: "from-purple-300 to-purple-500",
  },
  pink: {
    bg: "bg-gradient-to-br from-pink-400 to-pink-600",
    card: "bg-pink-50",
    text: "text-pink-700",
    badge: "bg-pink-500",
    accent: "from-pink-300 to-pink-500",
  },
  red: {
    bg: "bg-gradient-to-br from-red-400 to-red-600",
    card: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-500",
    accent: "from-red-300 to-red-500",
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

interface AgentSelectionCardProps {
  agent: AgentData;
  onClick?: () => void;
  className?: string;
}

export function AgentSelectionCard({ agent, onClick, className }: AgentSelectionCardProps) {
  const scheme = colorSchemes[agent.color];
  const Icon = iconMap[agent.icon];

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <Card className={cn("relative overflow-hidden border-4 border-white shadow-2xl", scheme.card)}>
        {/* Badge at top right */}
        <div className="absolute top-3 right-3 z-10">
          <Badge className={cn("text-white font-bold text-xs px-3 py-1", scheme.badge)}>
            {agent.category}
          </Badge>
        </div>

        <CardHeader className="pb-4 pt-6">
          {/* Agent Name */}
          <h3 className={cn("text-3xl font-black uppercase tracking-tight text-center", scheme.text)}>
            {agent.name}
          </h3>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Character Illustration */}
          <div className="flex items-center justify-center">
            <div className={cn("relative w-40 h-40 rounded-3xl shadow-lg", scheme.bg)}>
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-20 h-20 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
              
              {/* Playful dots/circles */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full" />
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-white/40 rounded-full" />
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-white/50 rounded-full" />
            </div>
          </div>

          {/* Score Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className={cn("w-2 h-8 rounded-full", scheme.bg)} />
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Score
                </p>
                <p className={cn("text-5xl font-black", scheme.text)}>
                  {agent.score}
                </p>
              </div>
              <div className={cn("w-2 h-8 rounded-full", scheme.bg)} />
            </div>

            {/* Decorative circuit-like lines */}
            <div className="flex items-center justify-center gap-2 opacity-40">
              <div className={cn("w-3 h-3 rounded-full border-2", `border-${agent.color}-500`)} />
              <div className={cn("h-0.5 w-12", scheme.bg)} />
              <div className={cn("w-2 h-2 rounded-full", scheme.bg)} />
              <div className={cn("h-0.5 w-12", scheme.bg)} />
              <div className={cn("w-3 h-3 rounded-full border-2", `border-${agent.color}-500`)} />
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-sm text-muted-foreground font-medium px-2">
            {agent.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
