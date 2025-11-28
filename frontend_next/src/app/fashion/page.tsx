"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShapesIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MenuIcon,
  ArrowDownRight,
} from "lucide-react";

const navLinks = [
  { href: "#", label: "Kit" },
  { href: "#", label: "Collections" },
  { href: "#", label: "Variables Set" },
];

const productCategories = [
  {
    title: "Classic",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    bgColor: "bg-[#A6C5C6]",
    textColor: "text-white",
  },
  {
    title: "Traxx",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    bgColor: "bg-muted",
    textColor: "text-white",
  },
  {
    title: "Double",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    bgColor: "bg-muted",
    textColor: "text-white",
  },
];

export default function FashionPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans">
      <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between rounded-full border bg-background/80 px-4 shadow-sm backdrop-blur-sm sm:px-6 transition-all duration-300 hover:shadow-md">
          <Link href="#" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105" prefetch={false}>
            <ShapesIcon className="h-8 w-8" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-y-[-2px]"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110">
              <BookmarkIcon className="h-5 w-5" />
              <span className="sr-only">Saved Items</span>
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110">
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground animate-in zoom-in duration-500">
                4
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://ui.shadcn.com/placeholder.svg"
                      alt="User avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4">
                <div className="flex flex-col gap-6 p-4">
                  <nav className="flex flex-col items-start gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <Button variant="ghost" size="icon">
                      <BookmarkIcon className="h-6 w-6" />
                    </Button>
                    <div className="relative">
                      <Button variant="ghost" size="icon">
                        <ShoppingCartIcon className="h-6 w-6" />
                      </Button>
                       <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        4
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Embrace the essence of minimalist fashion
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Our philosophy is centered around the belief that less is more, and
            we invite you to explore a world of effortless elegance.
          </p>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24 lg:pb-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className={`group relative h-96 overflow-hidden rounded-3xl p-8 md:h-[500px] ${category.bgColor} transition-all duration-500 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h2
                    className={`text-4xl font-bold ${category.textColor} transition-all duration-300 group-hover:translate-y-[-8px]`}
                  >
                    {category.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24 lg:pb-32">
          <div className="group relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl p-8 text-center md:h-[700px] transition-all duration-500 hover:shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
              alt="Slim fit promotion"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/40" />
            <div className="relative z-10 flex flex-col items-center gap-8 text-white">
              <h2 className="text-6xl font-bold md:text-8xl transition-all duration-500 group-hover:scale-105">Slim Fit</h2>
              <Button
                asChild
                size="lg"
                className="h-20 rounded-full bg-white/20 px-10 text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105"
              >
                <Link href="#" className="flex items-center gap-4">
                  View all collection
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowDownRight className="h-6 w-6 text-black" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
