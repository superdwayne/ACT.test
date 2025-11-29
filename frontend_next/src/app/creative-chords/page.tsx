"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function CreativeChordsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="size-3 mr-1" />
            Creative Design Showcase
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Creative Chords
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A stunning vertical design composition showcasing creative excellence
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="group">
              Explore Design
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Main Image Showcase */}
        <Card className="overflow-hidden border-2 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <CardContent className="p-0">
            <div className="relative w-full max-w-[492px] mx-auto bg-white">
              <div className="relative w-full" style={{ aspectRatio: '492/4096' }}>
                <Image
                  src="/creative-chords/creative-chords-hero.svg"
                  alt="Creative Chords Design"
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-[1.02]"
                  priority
                  sizes="(max-width: 768px) 100vw, 492px"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Pixel Perfect</h3>
              <p className="text-muted-foreground">
                Extracted directly from Figma with exact dimensions: 492×4096px
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">SVG Quality</h3>
              <p className="text-muted-foreground">
                Crisp vector graphics that scale perfectly at any resolution
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ArrowRight className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Responsive</h3>
              <p className="text-muted-foreground">
                Optimized layout that adapts beautifully to all screen sizes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <div className="mt-16 p-8 rounded-2xl bg-muted/50 border animate-in fade-in duration-1000 delay-700">
          <h2 className="text-2xl font-bold mb-4">Design Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-mono font-semibold">492 × 4096 px</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-mono font-semibold">SVG</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Aspect Ratio:</span>
                <span className="font-mono font-semibold">~1:8.3</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Background:</span>
                <span className="font-mono font-semibold">#FFFFFF</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Layout Mode:</span>
                <span className="font-mono font-semibold">None</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Source:</span>
                <span className="font-mono font-semibold">Figma</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
