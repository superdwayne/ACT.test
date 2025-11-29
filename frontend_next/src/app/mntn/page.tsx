"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDown,
  Instagram,
  Menu,
  Mountain,
  Twitter,
  User,
  Compass,
  Map,
  Backpack,
  Camera,
  Check,
  Send,
  MessageCircle,
  Bot,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const HEADER_LINKS = [
  { href: "#equipment", label: "Equipment" },
  { href: "#about-us", label: "About us" },
  { href: "#blog", label: "Blog" },
  { href: "/ai-chat", label: "AI Chat" },
  { href: "#social-generator", label: "Social Media" },
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Mountain landscape at sunrise" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", alt: "Rocky mountain peak" },
  { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80", alt: "Hiker on mountain trail" },
  { src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80", alt: "Mountain valley view" },
];

const SAMPLE_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content: "Welcome to MNTN Trail Assistant! I'm here to help you plan your next adventure. What kind of hike are you looking for?",
    timestamp: "2:15 PM",
  },
  {
    id: 2,
    role: "user",
    content: "I'm looking for a moderate day hike with great views, preferably under 10 miles.",
    timestamp: "2:16 PM",
  },
  {
    id: 3,
    role: "assistant",
    content: "Perfect! Based on your criteria, I'd recommend the Eagle Peak Trail. It's 8.5 miles with stunning panoramic views. The elevation gain is about 2,000 feet, making it a solid moderate hike. Would you like more details about this trail?",
    timestamp: "2:16 PM",
  },
  {
    id: 4,
    role: "user",
    content: "Yes, what's the best time to go?",
    timestamp: "2:17 PM",
  },
  {
    id: 5,
    role: "assistant",
    content: "For Eagle Peak, I recommend starting early morning (6-7 AM) to catch the sunrise from the summit. The golden hour lighting is spectacular for photos. Weather is typically best from June through September. Current conditions show clear skies this weekend!",
    timestamp: "2:17 PM",
  },
];

const AI_AGENTS = [
  {
    id: "trail-guide",
    name: "Trail Guide AI",
    icon: Compass,
    description: "Expert navigation assistant for route planning and real-time trail guidance",
    features: ["Route optimization", "Weather alerts", "Difficulty assessment"],
    popular: true,
  },
  {
    id: "gear-advisor",
    name: "Gear Advisor",
    icon: Backpack,
    description: "Personalized equipment recommendations based on your hiking style and conditions",
    features: ["Equipment matching", "Budget optimization", "Seasonal advice"],
    popular: false,
  },
  {
    id: "map-analyst",
    name: "Map Analyst",
    icon: Map,
    description: "Topographic analysis and terrain interpretation for safer adventures",
    features: ["Elevation profiles", "Landmark identification", "Safety zones"],
    popular: false,
  },
  {
    id: "photo-scout",
    name: "Photo Scout",
    icon: Camera,
    description: "Discover the best photography spots and optimal timing for stunning shots",
    features: ["Golden hour alerts", "Viewpoint suggestions", "Composition tips"],
    popular: true,
  },
];

const CONTENT_SECTIONS = [
  {
    number: "01",
    tagline: "GEt Started",
    title: "What level of hiker are you?",
    description:
      "Determining what level of hiker you are can be an important tool when planning future hikes. This hiking level guide will help you plan hikes according to different hike ratings set by various websites like All Trails and Modern Hiker. What type of hiker are you – novice, moderate, advanced moderate, expert, or expert backpacker?",
  },
  {
    number: "02",
    tagline: "Hiking Essentials",
    title: "Picking the right Hiking Gear!",
    description:
      "The nice thing about beginning hiking is that you don't really need any special gear, you can probably get away with things you already have. Let's start with clothing. A typical mistake hiking beginners make is wearing jeans and regular clothes, which will get heavy and chafe wif they get sweaty or wet.",
  },
  {
    number: "03",
    tagline: "where you go is the key",
    title: "Understand Your Map & Timing",
    description:
      "To start, print out the hiking guide and map. If it's raining, throw them in a Zip-Lock bag. Read over the guide, study the map, and have a good idea of what to expect. I like to know what my next landmark is as I hike. For example, I'll read the guide and know that say, in a mile, I make a right turn at the junction..",
  },
];

const FOOTER_LINKS = [
  {
    title: "More on The Blog",
    links: [
      { href: "#", label: "About MNTN" },
      { href: "#", label: "Contributors & Writers" },
      { href: "#", label: "Write For Us" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
  {
    title: "More on MNTN",
    links: [
      { href: "#", label: "The Team" },
      { href: "#", label: "Jobs" },
      { href: "#", label: "Press" },
    ],
  },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-3xl font-bold tracking-wider" style={{ fontFamily: '"Chronicle Display", serif' }}>
    <Mountain className="size-8" /> MNTN
  </Link>
);

export default function MNTNPage() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [messages, setMessages] = React.useState(SAMPLE_MESSAGES);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Social Media Generator State
  const [socialTopic, setSocialTopic] = React.useState("");
  const [socialPlatform, setSocialPlatform] = React.useState("instagram");
  const [socialTone, setSocialTone] = React.useState("inspirational");
  const [socialDetails, setSocialDetails] = React.useState("");
  const [generatedPost, setGeneratedPost] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Trail recommendations
    if (input.includes('trail') || input.includes('hike') || input.includes('recommend')) {
      return "I'd recommend checking out these popular trails: Eagle Peak (8.5 mi, moderate), Summit Ridge (12 mi, challenging), or Meadow Loop (4 mi, easy). Each offers unique views and experiences. Would you like detailed information about any of these?";
    }
    
    // Weather queries
    if (input.includes('weather') || input.includes('condition')) {
      return "Current conditions are looking great! Clear skies with temperatures around 65°F. Perfect hiking weather. Sunrise is at 6:15 AM and sunset at 7:45 PM. I recommend starting early to avoid afternoon heat.";
    }
    
    // Gear questions
    if (input.includes('gear') || input.includes('equipment') || input.includes('pack')) {
      return "Essential gear for day hiking: sturdy boots, 2L water, snacks/lunch, first aid kit, map/GPS, sun protection, and layers. For overnight trips, add tent, sleeping bag, and cooking equipment. What type of hike are you planning?";
    }
    
    // Safety questions
    if (input.includes('safe') || input.includes('danger') || input.includes('bear')) {
      return "Safety first! Always tell someone your plans, carry the 10 essentials, stay on marked trails, and check weather forecasts. For wildlife, make noise while hiking and store food properly. Need specific safety tips for your destination?";
    }
    
    // Difficulty questions
    if (input.includes('difficult') || input.includes('easy') || input.includes('beginner')) {
      return "Trail difficulty depends on distance, elevation gain, and terrain. Beginner: <5 miles, <1000ft gain. Moderate: 5-10 miles, 1000-2000ft. Advanced: 10+ miles, 2000ft+ gain. What's your experience level?";
    }
    
    // Time/duration questions
    if (input.includes('time') || input.includes('long') || input.includes('duration')) {
      return "Plan for 2-3 mph on flat terrain, 1-2 mph on steep sections. Add time for breaks, photos, and navigation. A 10-mile moderate hike typically takes 4-6 hours. What distance are you considering?";
    }
    
    // Default response
    return "Great question! I can help you with trail recommendations, weather conditions, gear advice, safety tips, and route planning. What specific aspect of your hiking adventure would you like to explore?";
  };

  const handleGeneratePost = async () => {
    if (!socialTopic.trim()) return;

    setIsGenerating(true);
    setGeneratedPost("");

    try {
      const platformGuidelines = {
        instagram: "Use emojis, include 3-5 relevant hashtags, keep it visual and inspiring, max 2200 characters",
        twitter: "Keep under 280 characters, use 1-2 hashtags, be concise and engaging",
        facebook: "More detailed and conversational, can be longer, include call-to-action"
      };

      const toneDescriptions = {
        inspirational: "motivational and uplifting, encouraging others to get outdoors",
        educational: "informative and helpful, sharing knowledge and tips",
        adventurous: "exciting and bold, emphasizing the thrill of exploration",
        casual: "friendly and relatable, like talking to a friend"
      };

      const systemPrompt = `You are a social media content creator for MNTN, a hiking and outdoor adventure brand.
Create an engaging ${socialPlatform} post about: "${socialTopic}"

Platform guidelines: ${platformGuidelines[socialPlatform as keyof typeof platformGuidelines]}
Tone: ${toneDescriptions[socialTone as keyof typeof toneDescriptions]}
${socialDetails ? `Additional context: ${socialDetails}` : ''}

Make it authentic, engaging, and optimized for ${socialPlatform}. Include relevant emojis and hashtags.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: systemPrompt }
          ],
          system: 'You are an expert social media content creator specializing in outdoor and hiking content.'
        }),
      });

      if (!response.ok) throw new Error('Failed to generate post');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          content += chunk;
          setGeneratedPost(content);
        }
      }

      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedPost("Sorry, I couldn't generate a post right now. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleCopyPost = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
      // You could add a toast notification here
    }
  };

  const handleDownloadPost = () => {
    if (generatedPost) {
      const blob = new Blob([generatedPost], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${socialPlatform}-post-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-[#0B1D26] text-white" style={{ fontFamily: '"Gilroy", sans-serif' }}>
      {/* Side Social Links */}
      <aside className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 transform flex-col items-center gap-6 lg:flex animate-in fade-in slide-in-from-left-8 duration-700">
        <span className="[writing-mode:vertical-rl] font-bold">Follow us</span>
        <Link href="#" aria-label="Instagram" className="transition-all duration-300 hover:scale-110 hover:text-[#FBD784]">
          <Instagram className="size-6" />
        </Link>
        <Link href="#" aria-label="Twitter" className="transition-all duration-300 hover:scale-110 hover:text-[#FBD784]">
          <Twitter className="size-6" />
        </Link>
      </aside>

      {/* Side Navigation */}
      <aside className="fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 transform flex-row items-center gap-8 lg:flex animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="flex flex-col items-end gap-10 font-bold text-lg">
          <Link href="#start" className="transition-all duration-300 hover:text-[#FBD784] hover:translate-x-[-4px]">Start</Link>
          <Link href="#01" className="transition-all duration-300 hover:text-[#FBD784] hover:translate-x-[-4px]">01</Link>
          <Link href="#02" className="transition-all duration-300 hover:text-[#FBD784] hover:translate-x-[-4px]">02</Link>
          <Link href="#03" className="transition-all duration-300 hover:text-[#FBD784] hover:translate-x-[-4px]">03</Link>
        </div>
        <div className="h-60 w-1 bg-white/50 relative">
          <div className="w-full h-1/4 bg-white absolute top-1/4"></div>
        </div>
      </aside>

      <div className="relative overflow-x-hidden">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto flex items-center justify-between py-6">
            <Logo />
            <nav className="hidden items-center gap-10 text-lg font-bold md:flex">
              {HEADER_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="transition-all duration-300 hover:text-[#FBD784] hover:translate-y-[-2px]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 text-lg font-bold md:flex">
              <User className="size-6 transition-transform duration-300 hover:rotate-12" />
              <Link href="#" className="transition-all duration-300 hover:text-[#FBD784] hover:translate-y-[-2px]">Account</Link>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-8" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-[#0B1D26] text-white border-l border-white/20">
                  <SheetHeader>
                    <Logo />
                  </SheetHeader>
                  <nav className="mt-12 flex flex-col gap-8 text-xl font-bold">
                    {HEADER_LINKS.map((link) => (
                      <Link key={link.label} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                    <Link href="#" className="flex items-center gap-3">
                      <User className="size-6" />
                      Account
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section
            id="start"
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D26] via-transparent to-transparent"></div>
            <div className="z-10 container mx-auto flex max-w-4xl flex-col items-start gap-8 text-left">
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <hr className="w-16 border-[#FBD784] animate-in slide-in-from-left-8 duration-500" />
                <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                  A Hiking guide
                </p>
              </div>
              <h1 className="text-5xl font-semibold md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200" style={{ fontFamily: '"Chronicle Display", serif', lineHeight: '1.1' }}>
                Be prepared for the Mountains and beyond!
              </h1>
              <a href="#equipment" className="flex items-center gap-4 font-bold text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 transition-all hover:gap-6 group">
                scroll down <ArrowDown className="size-6 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </section>

          {/* AI Agent Selection */}
          <section id="agents" className="relative py-32 px-4 bg-[#0B1D26]">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-left mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4 mb-6">
                  <hr className="w-16 border-[#FBD784]" />
                  <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                    AI Companions
                  </p>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6" style={{ fontFamily: '"Chronicle Display", serif' }}>
                  Choose Your Trail Assistant
                </h2>
                <p className="text-lg font-bold leading-relaxed text-white/70">
                  Enhance your mountain journey with AI-powered guidance. Each assistant specializes in different aspects of your adventure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {AI_AGENTS.map((agent, index) => {
                  const IconComponent = agent.icon;
                  return (
                    <div
                      key={agent.id}
                      className="group relative overflow-hidden bg-[#0B1D26] border border-white/10 transition-all duration-500 hover:border-[#FBD784]/40 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {agent.popular && (
                        <div className="absolute top-0 right-0 bg-[#FBD784] text-[#0B1D26] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                          Popular Choice
                        </div>
                      )}
                      
                      <div className="p-10">
                        <div className="mb-8">
                          <div className="inline-block p-4 bg-[#FBD784]/10 group-hover:bg-[#FBD784]/20 transition-colors mb-6">
                            <IconComponent className="size-12 text-[#FBD784]" />
                          </div>
                          <h3 className="text-3xl font-bold mb-3 group-hover:text-[#FBD784] transition-colors" style={{ fontFamily: '"Chronicle Display", serif' }}>
                            {agent.name}
                          </h3>
                          <p className="text-white/60 font-bold leading-relaxed">
                            {agent.description}
                          </p>
                        </div>

                        <div className="space-y-3 mb-8 pb-8 border-b border-white/10">
                          {agent.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="mt-1 p-1 bg-[#FBD784]/20">
                                <Check className="size-3 text-[#FBD784]" />
                              </div>
                              <span className="text-white/70 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href="#"
                          className="group/btn flex items-center gap-4 font-bold text-[#FBD784] transition-all duration-300 hover:gap-6"
                        >
                          Activate {agent.name}
                          <ArrowDown className="size-5 rotate-[-90deg] transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* AI Chat Interface */}
          <section id="chat" className="relative py-32 px-4 bg-gradient-to-b from-[#0B1D26] to-[#0B1D26]/95">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
                {/* Left Side - Info */}
                <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="flex items-center gap-4 mb-6">
                    <hr className="w-16 border-[#FBD784]" />
                    <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                      Live Assistance
                    </p>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6" style={{ fontFamily: '"Chronicle Display", serif' }}>
                    Chat with Trail AI
                  </h2>
                  <p className="text-lg font-bold leading-relaxed text-white/70 mb-8">
                    Get instant answers about trails, gear, weather conditions, and safety tips. Our AI assistant is trained on thousands of hiking experiences.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#FBD784]/10">
                        <MessageCircle className="size-5 text-[#FBD784]" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Real-time Responses</h4>
                        <p className="text-white/60 text-sm">Get immediate answers to your hiking questions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#FBD784]/10">
                        <Compass className="size-5 text-[#FBD784]" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Trail Recommendations</h4>
                        <p className="text-white/60 text-sm">Personalized suggestions based on your preferences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#FBD784]/10">
                        <Mountain className="size-5 text-[#FBD784]" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Expert Knowledge</h4>
                        <p className="text-white/60 text-sm">Trained on extensive hiking data and safety protocols</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Chat Interface */}
                <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                  <div className="border border-white/10 bg-[#0B1D26] overflow-hidden">
                    {/* Chat Header */}
                    <div className="border-b border-white/10 p-6 bg-[#FBD784]/5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#FBD784]/20 rounded-full">
                          <Bot className="size-6 text-[#FBD784]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Trail Guide AI</h3>
                          <p className="text-xs text-white/60">Online • Ready to help</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <ScrollArea ref={scrollAreaRef} className="h-[400px] p-6">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                          >
                            <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                              <div
                                className={`p-4 ${
                                  message.role === "user"
                                    ? "bg-[#FBD784] text-[#0B1D26]"
                                    : "bg-white/5 text-white border border-white/10"
                                }`}
                              >
                                <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                              </div>
                              <p className="text-xs text-white/40 mt-1 px-1">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="max-w-[80%]">
                              <div className="p-4 bg-white/5 border border-white/10">
                                <div className="flex gap-1">
                                  <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                  <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                  <div className="size-2 bg-[#FBD784] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="border-t border-white/10 p-4 bg-[#0B1D26]">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask about trails, gear, or conditions..."
                          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FBD784] focus:ring-[#FBD784]"
                          disabled={isLoading}
                        />
                        <Button 
                          type="submit"
                          disabled={isLoading || !inputValue.trim()}
                          className="bg-[#FBD784] text-[#0B1D26] hover:bg-[#FBD784]/90 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="size-4" />
                        </Button>
                      </form>
                      <p className="text-xs text-white/40 mt-2">Press Enter to send • Powered by MNTN AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Generator Section */}
          <section id="social-generator" className="relative py-32 px-4 bg-gradient-to-b from-[#0B1D26]/95 to-[#0B1D26]">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16 animate-in fade-in duration-700">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <hr className="w-16 border-[#FBD784]" />
                  <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                    AI Powered
                  </p>
                  <hr className="w-16 border-[#FBD784]" />
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6" style={{ fontFamily: '"Chronicle Display", serif' }}>
                  Social Media Generator
                </h2>
                <p className="text-lg font-bold leading-relaxed text-white/70 max-w-2xl mx-auto">
                  Create engaging social media posts for your hiking adventures with AI assistance
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="bg-white/5 border-white/10 p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[#FBD784] mb-3">
                        Adventure Topic
                      </label>
                      <Input
                        value={socialTopic}
                        onChange={(e) => setSocialTopic(e.target.value)}
                        placeholder="e.g., Summit of Mount Rainier, Backpacking in Yosemite..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FBD784]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[#FBD784] mb-3">
                        Platform
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button 
                          onClick={() => setSocialPlatform('instagram')}
                          className={`border border-white/10 ${socialPlatform === 'instagram' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          <Instagram className="size-4 mr-2" />
                          Instagram
                        </Button>
                        <Button 
                          onClick={() => setSocialPlatform('twitter')}
                          className={`border border-white/10 ${socialPlatform === 'twitter' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          <Twitter className="size-4 mr-2" />
                          Twitter
                        </Button>
                        <Button 
                          onClick={() => setSocialPlatform('facebook')}
                          className={`border border-white/10 ${socialPlatform === 'facebook' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          <MessageCircle className="size-4 mr-2" />
                          Facebook
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[#FBD784] mb-3">
                        Tone
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => setSocialTone('inspirational')}
                          className={`border border-white/10 ${socialTone === 'inspirational' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          Inspirational
                        </Button>
                        <Button 
                          onClick={() => setSocialTone('educational')}
                          className={`border border-white/10 ${socialTone === 'educational' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          Educational
                        </Button>
                        <Button 
                          onClick={() => setSocialTone('adventurous')}
                          className={`border border-white/10 ${socialTone === 'adventurous' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          Adventurous
                        </Button>
                        <Button 
                          onClick={() => setSocialTone('casual')}
                          className={`border border-white/10 ${socialTone === 'casual' ? 'bg-[#FBD784] text-[#0B1D26]' : 'bg-white/5 hover:bg-[#FBD784] hover:text-[#0B1D26]'}`}
                        >
                          Casual
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[#FBD784] mb-3">
                        Additional Details (Optional)
                      </label>
                      <Textarea
                        value={socialDetails}
                        onChange={(e) => setSocialDetails(e.target.value)}
                        placeholder="Add specific details, hashtags, or mentions..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FBD784] min-h-[100px]"
                      />
                    </div>

                    <Button 
                      onClick={handleGeneratePost}
                      disabled={!socialTopic.trim() || isGenerating}
                      className="w-full bg-[#FBD784] text-[#0B1D26] hover:bg-[#FBD784]/90 font-bold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="size-5 mr-2" />
                      {isGenerating ? 'Generating...' : 'Generate Post'}
                    </Button>
                  </div>
                </Card>

                {/* Output Section */}
                <Card className="bg-white/5 border-white/10 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#FBD784]">Generated Content</h3>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-white/10"
                          onClick={handleGeneratePost}
                          disabled={!socialTopic.trim() || isGenerating}
                          title="Regenerate"
                        >
                          <RefreshCw className="size-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-white/10"
                          onClick={handleCopyPost}
                          disabled={!generatedPost}
                          title="Copy to clipboard"
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-white/10"
                          onClick={handleDownloadPost}
                          disabled={!generatedPost}
                          title="Download as text"
                        >
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 min-h-[300px]">
                      {isGenerating ? (
                        <div className="text-center text-white/60 py-12">
                          <RefreshCw className="size-12 mx-auto mb-4 animate-spin text-[#FBD784]" />
                          <p className="font-medium">Generating your post...</p>
                          <p className="text-sm mt-2">This will take just a moment</p>
                        </div>
                      ) : generatedPost ? (
                        <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                          {generatedPost}
                        </div>
                      ) : (
                        <div className="text-center text-white/40 py-12">
                          <Sparkles className="size-12 mx-auto mb-4 opacity-50" />
                          <p className="font-medium">Your generated post will appear here</p>
                          <p className="text-sm mt-2">Fill in the details and click Generate Post</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Check className="size-4 text-[#FBD784]" />
                        <span>Optimized for engagement</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Check className="size-4 text-[#FBD784]" />
                        <span>Includes relevant hashtags</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Check className="size-4 text-[#FBD784]" />
                        <span>Platform-specific formatting</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Example Posts */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-[#FBD784]">Example Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Instagram className="size-5 text-[#FBD784]" />
                      <span className="font-bold text-sm">Instagram</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">
                      "Summit sunrise at 14,000ft 🏔️✨ The climb was tough, but this view made every step worth it. Remember: the mountain doesn't care about your excuses. #MountainLife #HikingAdventures #SummitViews"
                    </p>
                  </Card>
                  <Card className="bg-white/5 border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Twitter className="size-5 text-[#FBD784]" />
                      <span className="font-bold text-sm">Twitter</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">
                      "Just completed a 3-day backpacking loop through the Rockies. Trail conditions: excellent. Wildlife encounters: 2 elk, 1 marmot. Blisters: worth it. 🥾🏔️ #Backpacking #GetOutside"
                    </p>
                  </Card>
                  <Card className="bg-white/5 border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="size-5 text-[#FBD784]" />
                      <span className="font-bold text-sm">Facebook</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">
                      "Trail Report: Eagle Peak Loop is absolutely stunning right now! Wildflowers in full bloom, perfect weather, and minimal crowds. Highly recommend for intermediate hikers. Total distance: 8.5 miles. Bring plenty of water! 💧🌸"
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <div className="container mx-auto flex flex-col gap-32 md:gap-48 py-20 px-4">
            {CONTENT_SECTIONS.map((section, index) => (
              <section id={`0${index + 1}`} key={section.number} className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-24">
                <div className="absolute -top-16 left-0 -z-0 select-none text-[12rem] md:text-[15rem] font-bold text-white/10" aria-hidden="true">
                  {section.number}
                </div>
                <div className="order-2 lg:order-1 flex max-w-xl flex-col items-start gap-7 animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="flex items-center gap-4">
                    <hr className="w-16 border-[#FBD784] transition-all duration-500 hover:w-24" />
                    <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                      {section.tagline}
                    </p>
                  </div>
                  <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl transition-colors duration-300 hover:text-[#FBD784]" style={{ fontFamily: '"Chronicle Display", serif' }}>
                    {section.title}
                  </h2>
                  <p className="text-lg font-bold leading-relaxed">{section.description}</p>
                  <Link href="#" className="flex items-center gap-4 font-bold text-[#FBD784] transition-all duration-300 hover:gap-6 group">
                    read more <ArrowDown className="size-6 rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="order-1 lg:order-2 h-96 w-full lg:h-[720px] animate-in fade-in slide-in-from-right-8 duration-700">
                  <img src={carouselImages[index].src} alt={carouselImages[index].alt} className="h-full w-full object-cover rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"/>
                </div>
              </section>
            ))}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="container mx-auto py-20 px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-3 lg:col-span-1 flex flex-col gap-6">
              <Logo />
              <p className="max-w-xs text-lg font-bold leading-relaxed">
                Get out there & discover your next slope, mountain & destination!
              </p>
            </div>
            {FOOTER_LINKS.map((list) => (
              <div key={list.title} className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-[#FBD784]">{list.title}</h3>
                <ul className="flex flex-col gap-4 text-lg font-medium">
                  {list.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-all duration-300 hover:text-[#FBD784] hover:translate-x-2 inline-block">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-16 pt-12 border-t border-white/20 text-center text-lg font-medium text-white/50">
            Copyright 2023 MNTN, Inc. Terms & Privacy
          </p>
        </footer>
      </div>
    </div>
  );
}
