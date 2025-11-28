"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { Sparkles, Brain, Lightbulb, Target, Pencil, Calendar } from "lucide-react";

export interface PlayfulAgentData {
  id: string;
  name: string;
  category: string;
  score: number;
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  description: string;
  pattern?: "waves" | "dots" | "stripes" | "blob";
}

const colorSchemes = {
  blue: {
    bg: "from-blue-400 via-blue-500 to-blue-600",
    card: "bg-blue-50",
    text: "text-blue-700",
    badge: "bg-blue-500",
    border: "border-blue-200",
    shadow: "shadow-blue-200/50",
  },
  green: {
    bg: "from-emerald-400 via-emerald-500 to-emerald-600",
    card: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
    border: "border-emerald-200",
    shadow: "shadow-emerald-200/50",
  },
  orange: {
    bg: "from-orange-400 via-orange-500 to-orange-600",
    card: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-500",
    border: "border-orange-200",
    shadow: "shadow-orange-200/50",
  },
  purple: {
    bg: "from-purple-400 via-purple-500 to-purple-600",
    card: "bg-purple-50",
    text: "text-purple-700",
    badge: "bg-purple-500",
    border: "border-purple-200",
    shadow: "shadow-purple-200/50",
  },
  pink: {
    bg: "from-pink-400 via-pink-500 to-pink-600",
    card: "bg-pink-50",
    text: "text-pink-700",
    badge: "bg-pink-500",
    border: "border-pink-200",
    shadow: "shadow-pink-200/50",
  },
  red: {
    bg: "from-red-400 via-red-500 to-red-600",
    card: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-500",
    border: "border-red-200",
    shadow: "shadow-red-200/50",
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

interface PlayfulAgentCardProps {
  agent: PlayfulAgentData;
  onClick?: () => void;
  className?: string;
}

export function PlayfulAgentCard({ agent, onClick, className }: PlayfulAgentCardProps) {
  const scheme = colorSchemes[agent.color];
  const Icon = iconMap[agent.icon];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
    >
      <Card className={cn(
        "relative overflow-hidden border-[6px] border-white shadow-2xl rounded-3xl",
        scheme.card,
        scheme.shadow
      )}>
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={cn(
            "px-4 py-1.5 rounded-full text-white font-black text-xs uppercase tracking-wider shadow-lg",
            scheme.badge
          )}>
            {agent.category}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Agent Name */}
          <div className="text-center pt-2">
            <h3 className={cn(
              "text-4xl font-black uppercase tracking-tight",
              scheme.text,
              "drop-shadow-sm"
            )}>
              {agent.name}
            </h3>
          </div>

          {/* Character/Icon Container */}
          <div className="flex items-center justify-center py-4">
            <div className={cn(
              "relative w-48 h-48 rounded-[2rem] shadow-2xl bg-gradient-to-br",
              scheme.bg,
              "transform transition-transform"
            )}>
              {/* Main Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  className="w-24 h-24 text-white drop-shadow-2xl" 
                  strokeWidth={2.5} 
                />
              </div>
              
              {/* Decorative Elements - Playful Circles */}
              <div className="absolute top-3 left-3 w-4 h-4 bg-white/40 rounded-full animate-pulse" />
              <div className="absolute bottom-4 right-4 w-5 h-5 bg-white/50 rounded-full animate-pulse delay-100" />
              <div className="absolute top-1/2 right-3 w-3 h-3 bg-white/60 rounded-full animate-pulse delay-200" />
              <div className="absolute bottom-1/3 left-4 w-3 h-3 bg-white/45 rounded-full animate-pulse delay-300" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/30 rounded-tl-[2rem]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/30 rounded-br-[2rem]" />
            </div>
          </div>

          {/* Score Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className={cn("w-1 h-10 rounded-full bg-gradient-to-b", scheme.bg)} />
              
              <div className="text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  Score
                </p>
                <p className={cn("text-6xl font-black tabular-nums", scheme.text)}>
                  {agent.score}
                </p>
              </div>
              
              <div className={cn("w-1 h-10 rounded-full bg-gradient-to-b", scheme.bg)} />
            </div>

            {/* Decorative Circuit Lines */}
            <div className="flex items-center justify-center gap-2 opacity-50">
              <div className={cn("w-3 h-3 rounded-full border-2", scheme.border)} />
              <div className={cn("h-0.5 w-16 bg-gradient-to-r", scheme.bg)} />
              <div className={cn("w-2 h-2 rounded-full bg-gradient-to-br", scheme.bg)} />
              <div className={cn("h-0.5 w-16 bg-gradient-to-r", scheme.bg)} />
              <div className={cn("w-3 h-3 rounded-full border-2", scheme.border)} />
            </div>
          </div>

          {/* Description */}
          <div className="text-center px-2">
            <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
              {agent.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
