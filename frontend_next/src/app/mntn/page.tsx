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
      <aside className="fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 transform flex-col items-center gap-6 lg:flex">
        <span className="[writing-mode:vertical-rl] font-bold">Follow us</span>
        <Link href="#" aria-label="Instagram">
          <Instagram className="size-6" />
        </Link>
        <Link href="#" aria-label="Twitter">
          <Twitter className="size-6" />
        </Link>
      </aside>

      {/* Side Navigation */}
      <aside className="fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 transform flex-row items-center gap-8 lg:flex">
        <div className="flex flex-col items-end gap-10 font-bold text-lg">
          <Link href="#start" className="hover:text-[#FBD784]">Start</Link>
          <Link href="#01" className="hover:text-[#FBD784]">01</Link>
          <Link href="#02" className="hover:text-[#FBD784]">02</Link>
          <Link href="#03" className="hover:text-[#FBD784]">03</Link>
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
                <Link key={link.label} href={link.href} className="hover:text-[#FBD784]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 text-lg font-bold md:flex">
              <User className="size-6" />
              <Link href="#" className="hover:text-[#FBD784]">Account</Link>
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
            style={{ backgroundImage: "url('https://ui.shadcn.com/placeholder.svg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D26] via-transparent to-transparent"></div>
            <div className="z-10 container mx-auto flex max-w-4xl flex-col items-start gap-8 text-left">
              <div className="flex items-center gap-4">
                <hr className="w-16 border-[#FBD784]" />
                <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                  A Hiking guide
                </p>
              </div>
              <h1 className="text-5xl font-semibold md:text-7xl lg:text-8xl" style={{ fontFamily: '"Chronicle Display", serif', lineHeight: '1.1' }}>
                Be prepared for the Mountains and beyond!
              </h1>
              <a href="#equipment" className="flex items-center gap-4 font-bold text-lg">
                scroll down <ArrowDown className="size-6" />
              </a>
            </div>
          </section>

          {/* Content Sections */}
          <div className="container mx-auto flex flex-col gap-32 md:gap-48 py-20 px-4">
            {CONTENT_SECTIONS.map((section, index) => (
              <section id={`0${index + 1}`} key={section.number} className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-24">
                <div className="absolute -top-16 left-0 -z-0 select-none text-[12rem] md:text-[15rem] font-bold text-white/10" aria-hidden="true">
                  {section.number}
                </div>
                <div className="order-2 lg:order-1 flex max-w-xl flex-col items-start gap-7">
                  <div className="flex items-center gap-4">
                    <hr className="w-16 border-[#FBD784]" />
                    <p className="font-extrabold uppercase tracking-[0.3em] text-[#FBD784]">
                      {section.tagline}
                    </p>
                  </div>
                  <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl" style={{ fontFamily: '"Chronicle Display", serif' }}>
                    {section.title}
                  </h2>
                  <p className="text-lg font-bold leading-relaxed">{section.description}</p>
                  <Link href="#" className="flex items-center gap-4 font-bold text-[#FBD784]">
                    read more <ArrowDown className="size-6 rotate-[-90deg]" />
                  </Link>
                </div>
                <div className="order-1 lg:order-2 h-96 w-full lg:h-[720px]">
                  <img src="https://ui.shadcn.com/placeholder.svg" alt={section.title} className="h-full w-full object-cover rounded-lg"/>
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
                      <Link href={link.href} className="hover:text-[#FBD784]">{link.label}</Link>
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
