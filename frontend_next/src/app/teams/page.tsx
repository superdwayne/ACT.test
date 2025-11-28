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
  MountainIcon,
  ChevronDownIcon,
  MenuIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  ClockIcon,
  CircleDollarSignIcon,
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
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "Team photo 1" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "Team photo 2" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "Team photo 3" },
  { src: "https://ui.shadcn.com/placeholder.svg", alt: "Team photo 4" },
];

const teamMembers = [
  {
    department: "Leadership",
    members: [
      { name: "Alice Johnson", role: "Founder & CEO" },
      { name: "Bob Smith", role: "People & Culture" },
      { name: "Charlie Brown", role: "Chief Financial Officer" },
    ],
  },
  {
    department: "Design",
    members: [
      { name: "Diana Prince", role: "Creative Director" },
      { name: "Ethan Hunt", role: "Snr. Product Designer" },
    ],
  },
  {
    department: "Strategy",
    members: [
      { name: "Fiona Gallagher", role: "Snr. Strategist" },
      { name: "George Clooney", role: "Strategist" },
    ],
  },
];

const jobListings = [
  {
    category: "Design",
    title: "Creative Director",
    description: "Shape future brand experiences for our customers.",
    location: "Remote",
    type: "Full-time",
    salary: "100-120k",
  },
  {
    category: "Creative Strategist",
    title: "Artistic Visionary",
    description: "Craft unforgettable experiences that captivate our audience.",
    location: "Flexible",
    type: "Full-time",
    salary: "90-110k",
  },
  {
    category: "User Experience",
    title: "UX Researcher",
    description: "Generate the insights to drive top-quality product experiences.",
    location: "Hybrid",
    type: "Part-time",
    salary: "80-100k",
  },
  {
    category: "Customer Experience Specialist",
    title: "User Insights Analyst",
    description: "Uncover valuable insights to enhance product quality.",
    location: "Remote/On-site",
    type: "Freelance",
    salary: "60-80k",
  },
  {
    category: "Design",
    title: "UI/UX Designer",
    description: "Enhance user interactions through innovative design solutions.",
    location: "On-site",
    type: "Part-time",
    salary: "70-90k",
  },
  {
    category: "Creative Development",
    title: "Digital Experience Designer",
    description: "Transform user experiences with cutting-edge design.",
    location: "In-office",
    type: "Freelance",
    salary: "60-75k",
  },
  {
    category: "Design",
    title: "Product Manager",
    description: "Lead product strategy and execution to meet market demands.",
    location: "Hybrid",
    type: "Full-time",
    salary: "110-140k",
  },
  {
    category: "Creative Direction",
    title: "Innovation Lead",
    description: "Drive product innovation and execution to align with market trends.",
    location: "Flexible",
    type: "Full-time",
    salary: "120-150k",
  },
];

const contactMethods = [
  {
    icon: MailIcon,
    title: "Email",
    description: "Send us an email and we'll respond within 48hrs",
    contact: "email@example.com",
    href: "mailto:email@example.com",
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
    description: "Chat with us for immediate assistance",
    contact: "www.example.com/chat",
    href: "#",
  },
];

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
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
    { label: "Help Center", href: "#" },
    { label: "FAQs", href: "#" },
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

export default function TeamPage() {
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
            <span className="font-semibold">Acme Inc.</span>
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
                  <span className="font-semibold">Acme Inc.</span>
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
              <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Meet the Team
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Behind every innovation at Acme Inc. is a group of curious thinkers, builders, and problem solvers. We're a diverse team united by a shared passion for creating AI that helps people work smarter and achieve more.
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
                  {teamMembers.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {group.members.map((member, memberIndex) => (
                        <div key={member.name} className="flex border-b">
                          <div className="w-32 flex-shrink-0 p-2 font-medium">
                            {memberIndex === 0 ? group.department : ""}
                          </div>
                          <div className="flex-1 p-2 text-right">{member.name}</div>
                          <div className="w-52 flex-shrink-0 p-2 text-muted-foreground">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-background py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-9 text-center">
              <div className="max-w-3xl space-y-3">
                <p className="font-medium text-primary">Careers</p>
                <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
                  Careers at Acme Inc.
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  We're a team of curious thinkers and creators shaping how people work smarter with AI. If you're passionate about technology, collaboration, and making an impact, we'd love to hear from you.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                {jobListings.map((job, index) => (
                  <Link href="#" key={index} className="block rounded-lg border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md lg:p-9">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary">{job.category}</Badge>
                          <h3 className="text-base font-medium text-foreground">{job.title}</h3>
                        </div>
                        <Button variant="ghost" className="hidden shrink-0 sm:flex lg:hidden">
                          View <ArrowUpRightIcon className="ml-1 size-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="size-4 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="size-4 text-muted-foreground" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CircleDollarSignIcon className="size-4 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex w-full max-w-md flex-col items-center gap-4 pt-6">
                <Button variant="outline" className="w-full">
                  All jobs <ArrowUpRightIcon className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="flex flex-col items-center gap-9 text-center">
              <div className="max-w-md space-y-3">
                <p className="font-medium text-primary">Contact us</p>
                <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">Let's Connect</h2>
                <p className="text-muted-foreground md:text-lg">
                  Have questions about Acme AI? Our team is here to help you get the answers you need.
                </p>
              </div>
              <div className="w-full">
                <Image
                  src="https://ui.shadcn.com/placeholder.svg"
                  alt="Contact background image"
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
              <p className="text-sm text-muted-foreground">© Copyright Acme Inc. 2025. All right reserved</p>
              <div className="flex items-center gap-4">
                <Link href="#" className="flex items-center gap-1" prefetch={false}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                    width={24}
                    height={24}
                    alt="Acme Inc. logo"
                  />
                  <span className="font-semibold">Acme Inc.</span>
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
