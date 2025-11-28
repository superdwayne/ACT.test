"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Star, Users, Zap } from "lucide-react";

interface AgentHeroSectionProps {
  title?: string;
  subtitle?: string;
  stats?: {
    agents: number;
    rating: number;
    reviews: number;
    growth: number;
  };
  onGetStarted?: () => void;
}

export function AgentHeroSection({ 
  title = "Choose Your AI Agent",
  subtitle = "Select from our curated collection of specialized AI agents designed to supercharge your workflow",
  stats = {
    agents: 6,
    rating: 4.7,
    reviews: 2000,
    growth: 18
  },
  onGetStarted
}: AgentHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-semibold border-0">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-10">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          {onGetStarted && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-bold text-lg px-8 py-6 h-auto"
                onClick={onGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-bold text-lg px-8 py-6 h-auto"
              >
                View Demo
              </Button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-blue-400 mr-2" />
                <div className="text-3xl font-bold text-white">{stats.agents}+</div>
              </div>
              <div className="text-sm text-slate-300">AI Agents</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-400 mr-2 fill-yellow-400" />
                <div className="text-3xl font-bold text-white">{stats.rating}</div>
              </div>
              <div className="text-sm text-slate-300">Avg Rating</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-green-400 mr-2" />
                <div className="text-3xl font-bold text-white">{(stats.reviews / 1000).toFixed(1)}K+</div>
              </div>
              <div className="text-sm text-slate-300">Reviews</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-purple-400 mr-2" />
                <div className="text-3xl font-bold text-white">{stats.growth}%</div>
              </div>
              <div className="text-sm text-slate-300">Avg Growth</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
