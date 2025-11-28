"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  ChevronDownIcon,
  MenuIcon,
  ArrowUpRightIcon,
  BotIcon,
  BrainCircuitIcon,
  SparklesIcon,
  ZapIcon,
  MessageSquareIcon,
  FileTextIcon,
  ImageIcon,
  CodeIcon,
  MailIcon,
  PhoneIcon,
  MessagesSquareIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

const navLinks = [
  { href: "#", label: "Products", hasDropdown: true },
  { href: "#", label: "Solutions", hasDropdown: true },
  { href: "#", label: "Pricing", hasDropdown: false },
  { href: "#", label: "Company", hasDropdown: false },
];

const carouselImages = [
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "AI Agent in action 1" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "AI Agent in action 2" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "AI Agent in action 3" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "AI Agent in action 4" },
];

const aiAgentCategories = [
  {
    category: "Content Creation",
    agents: [
      { name: "ContentCraft AI", capability: "Blog posts, articles, and social media content" },
      { name: "CopyGenius", capability: "Marketing copy and ad campaigns" },
      { name: "StoryWeaver", capability: "Creative storytelling and narratives" },
    ],
  },
  {
    category: "Data Analysis",
    agents: [
      { name: "DataMind Pro", capability: "Advanced analytics and insights" },
      { name: "TrendSpotter", capability: "Market trend analysis and forecasting" },
    ],
  },
  {
    category: "Customer Support",
    agents: [
      { name: "SupportBot Elite", capability: "24/7 customer service automation" },
      { name: "QueryResolver", capability: "Technical support and troubleshooting" },
    ],
  },
  {
    category: "Development",
    agents: [
      { name: "CodeAssist AI", capability: "Code generation and debugging" },
      { name: "DevOps Guardian", capability: "Infrastructure monitoring and optimization" },
    ],
  },
];

const aiAgentFeatures = [
  {
    icon: BotIcon,
    category: "Conversational AI",
    title: "ChatFlow Assistant",
    description: "Natural language processing for seamless customer interactions and support.",
    capabilities: ["Multi-language", "Context-aware", "24/7 availability"],
    performance: "99.9% uptime",
    pricing: "Starting at $299/mo",
  },
  {
    icon: BrainCircuitIcon,
    category: "Machine Learning",
    title: "PredictiveGenius",
    description: "Advanced ML models for forecasting and pattern recognition.",
    capabilities: ["Real-time analysis", "Custom models", "Auto-scaling"],
    performance: "95% accuracy",
    pricing: "Starting at $499/mo",
  },
  {
    icon: FileTextIcon,
    category: "Document Processing",
    title: "DocIntelligence",
    description: "Automated document analysis, extraction, and summarization.",
    capabilities: ["OCR enabled", "Multi-format", "Smart extraction"],
    performance: "10k docs/hour",
    pricing: "Starting at $199/mo",
  },
  {
    icon: ImageIcon,
    category: "Visual AI",
    title: "VisionCraft Pro",
    description: "Image generation, editing, and visual content creation.",
    capabilities: ["HD generation", "Style transfer", "Batch processing"],
    performance: "Sub-second",
    pricing: "Starting at $399/mo",
  },
  {
    icon: CodeIcon,
    category: "Code Generation",
    title: "DevMate AI",
    description: "Intelligent code completion, generation, and refactoring.",
    capabilities: ["Multi-language", "Best practices", "Security scanning"],
    performance: "Real-time",
    pricing: "Starting at $149/mo",
  },
  {
    icon: SparklesIcon,
    category: "Creative AI",
    title: "CreativeFlow",
    description: "AI-powered creative ideation and content brainstorming.",
    capabilities: ["Idea generation", "Trend analysis", "Brand alignment"],
    performance: "Instant",
    pricing: "Starting at $249/mo",
  },
  {
    icon: ZapIcon,
    category: "Automation",
    title: "WorkflowGenius",
    description: "Intelligent workflow automation and process optimization.",
    capabilities: ["No-code setup", "Integration hub", "Smart triggers"],
    performance: "99.5% success",
    pricing: "Starting at $349/mo",
  },
  {
    icon: MessageSquareIcon,
    category: "Social Media",
    title: "SocialSense AI",
    description: "Social media management, scheduling, and engagement optimization.",
    capabilities: ["Multi-platform", "Analytics", "Auto-posting"],
    performance: "Real-time",
    pricing: "Starting at $179/mo",
  },
];

const contactMethods = [
  {
    icon: MailIcon,
    title: "Email",
    description: "Send us an email and we'll respond within 24hrs",
    contact: "ai@example.com",
    href: "mailto:ai@example.com",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    description: "Available for calls from 9 AM to 5 PM",
    contact: "(123) 456-7890",
    href: "tel:1234567890",
  },
  {
    icon: MessagesSquareIcon,
    title: "Live Chat",
    description: "Chat with our AI experts for immediate assistance",
    contact: "www.example.com/chat",
    href: "#",
  },
];

const footerLinks = {
  product: [
    { label: "AI Agents", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#", isNew: true },
    { label: "Demo", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Community", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};

export default function AIAgentsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-1" prefetch={false}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
              width={24}
              height={24}
              alt="Acme Inc. logo"
            />
            <span className="font-semibold">Acme AI</span>
          </Link>
          <nav className="hidden items-center gap-4 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                {link.label}
                {link.hasDropdown && <ChevronDownIcon className="size-3" />}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeSwitcher />
            <Button variant="outline" asChild>
              <Link href="#">Login</Link>
            </Button>
            <Button asChild>
              <Link href="#">Get started</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="size-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <div className="flex flex-col gap-4">
                <Link href="#" className="flex items-center gap-1" prefetch={false}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                    width={24}
                    height={24}
                    alt="Acme Inc. logo"
                  />
                  <span className="font-semibold">Acme AI</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeSwitcher />
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="#">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="#">Get started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-2">
                <SparklesIcon className="mr-1 size-3" />
                Powered by AI
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Meet Our AI Agents
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Discover our suite of intelligent AI agents designed to transform your workflow. From content creation to data analysis, our agents work tirelessly to help you achieve more with less effort.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-9">
              <Carousel className="w-full">
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={600}
                        className="aspect-square w-full rounded-xl object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="w-full max-w-3xl overflow-x-auto">
                <div className="min-w-[672px] border-t">
                  {aiAgentCategories.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {group.agents.map((agent, agentIndex) => (
                        <div key={agent.name} className="flex border-b">
                          <div className="w-40 flex-shrink-0 p-2 font-medium">
                            {agentIndex === 0 ? group.category : ""}
                          </div>
                          <div className="flex-1 p-2 text-right font-medium">{agent.name}</div>
                          <div className="w-80 flex-shrink-0 p-2 text-muted-foreground">{agent.capability}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-9 text-center">
              <div className="max-w-3xl space-y-3">
                <p className="font-medium text-primary">Our AI Solutions</p>
                <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
                  Explore Our AI Agent Catalog
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Each AI agent is purpose-built with cutting-edge technology to solve specific challenges. Choose the perfect agent for your needs or combine multiple agents for maximum impact.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                {aiAgentFeatures.map((agent, index) => (
                  <Link 
                    href="#" 
                    key={index} 
                    className="group block rounded-lg border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md lg:p-9"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <agent.icon className="size-6" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant="secondary" className="w-fit">{agent.category}</Badge>
                            <h3 className="text-lg font-semibold text-foreground">{agent.title}</h3>
                          </div>
                        </div>
                        <Button variant="ghost" className="hidden shrink-0 sm:flex lg:hidden">
                          View <ArrowUpRightIcon className="ml-1 size-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{agent.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <ZapIcon className="size-4 text-primary" />
                          <span className="font-medium">{agent.performance}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span>{agent.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex w-full max-w-md flex-col items-center gap-4 pt-6">
                <Button className="w-full">
                  View All AI Agents <ArrowUpRightIcon className="ml-2 size-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-9 text-center">
              <div className="max-w-md space-y-3">
                <p className="font-medium text-primary">Get in Touch</p>
                <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Have questions about our AI agents? Our team is here to help you find the perfect solution for your needs.
                </p>
              </div>
              <div className="w-full">
                <Image
                  src="https://ui.shadcn.com/placeholder.svg"
                  alt="AI technology background"
                  width={896}
                  height={400}
                  className="aspect-video w-full rounded-xl object-cover"
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {contactMethods.map((method) => (
                  <div key={method.title} className="rounded-xl border bg-card p-6 text-left shadow-sm">
                    <div className="flex h-full flex-col items-start gap-4">
                      <div className="flex size-11 items-center justify-center rounded-full border bg-muted">
                        <method.icon className="size-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-foreground">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <Link
                        href={method.href}
                        className="mt-auto text-sm font-medium text-primary hover:underline"
                        prefetch={false}
                      >
                        {method.contact}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-base text-foreground transition-colors hover:text-primary"
                        prefetch={false}
                      >
                        {link.label}
                        {link.isNew && <Badge variant="outline">New</Badge>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-foreground transition-colors hover:text-primary"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Resources</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-foreground transition-colors hover:text-primary"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Legal</h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-foreground transition-colors hover:text-primary"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted-foreground">© Copyright Acme AI 2025. All rights reserved</p>
              <div className="flex items-center gap-4">
                <Link href="#" className="flex items-center gap-1" prefetch={false}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                    width={24}
                    height={24}
                    alt="Acme AI logo"
                  />
                  <span className="font-semibold">Acme AI</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                  <Link href="#" aria-label="LinkedIn" prefetch={false}>
                    <LinkedinIcon className="size-4" />
                  </Link>
                  <Link href="#" aria-label="Twitter" prefetch={false}>
                    <TwitterIcon className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
