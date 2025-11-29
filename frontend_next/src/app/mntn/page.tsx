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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const HEADER_LINKS = [
  { href: "#equipment", label: "Equipment" },
  { href: "#about-us", label: "About us" },
  { href: "#blog", label: "Blog" },
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Mountain landscape at sunrise" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", alt: "Rocky mountain peak" },
  { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80", alt: "Hiker on mountain trail" },
  { src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80", alt: "Mountain valley view" },
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

export default function Mntn() {
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
          <section id="agents" className="container mx-auto px-4 py-20 md:py-32">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-center gap-4 mb-4">
                <hr className="w-16 border-[#FBD784]" />
                <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                  AI Assistants
                </p>
                <hr className="w-16 border-[#FBD784]" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4" style={{ fontFamily: '"Chronicle Display", serif' }}>
                Choose Your Hiking Companion
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Select an AI agent to enhance your mountain adventure with personalized guidance and insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {AI_AGENTS.map((agent, index) => {
                const IconComponent = agent.icon;
                return (
                  <div
                    key={agent.id}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 ${
                      agent.popular
                        ? 'border-[#FBD784] bg-gradient-to-br from-[#FBD784]/10 to-transparent'
                        : 'border-white/20 bg-[#0B1D26]/50 hover:border-[#FBD784]/50'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {agent.popular && (
                      <div className="absolute top-4 right-4 bg-[#FBD784] text-[#0B1D26] px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Popular
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-[#FBD784]/20 group-hover:bg-[#FBD784]/30 transition-colors">
                          <IconComponent className="size-8 text-[#FBD784]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FBD784] transition-colors">
                            {agent.name}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {agent.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {agent.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="size-4 text-[#FBD784] shrink-0" />
                            <span className="text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`w-full font-bold transition-all duration-300 ${
                          agent.popular
                            ? 'bg-[#FBD784] text-[#0B1D26] hover:bg-[#FBD784]/90'
                            : 'bg-white/10 text-white hover:bg-[#FBD784] hover:text-[#0B1D26]'
                        }`}
                      >
                        Select {agent.name}
                      </Button>
                    </div>
                  </div>
                );
              })}
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
