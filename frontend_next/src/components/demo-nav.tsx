"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Home, Sparkles, Layout, MessageSquare } from "lucide-react";

const demoPages = {
  figma: [
    { name: "AI Agents Demo", href: "/ai-agents-demo" },
    { name: "AI Agents V2", href: "/ai-agents-v2" },
    { name: "AI Agents Showcase", href: "/ai-agents-showcase" },
  ],
  mainline: [
    { name: "Mainline Demo", href: "/mainline-demo" },
    { name: "Mainline Blocks", href: "/mainline-blocks" },
  ],
  squareUI: [
    { name: "Square Chat", href: "/square-chat" },
  ],
  other: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chat", href: "/chat" },
    { name: "Brand Settings", href: "/brand-settings" },
    { name: "File Manager", href: "/file-manager" },
  ],
};

export function DemoNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo/Home */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Home className="h-5 w-5" />
          <span className="hidden font-bold sm:inline-block">ACT Agency</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Figma Components */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">
                <Sparkles className="mr-2 h-4 w-4" />
                Figma
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {demoPages.figma.map((page) => (
                    <li key={page.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === page.href && "bg-accent"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.href}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Mainline Template */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">
                <Layout className="mr-2 h-4 w-4" />
                Mainline
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {demoPages.mainline.map((page) => (
                    <li key={page.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === page.href && "bg-accent"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.href}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Square UI */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">
                <MessageSquare className="mr-2 h-4 w-4" />
                Square UI
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {demoPages.squareUI.map((page) => (
                    <li key={page.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === page.href && "bg-accent"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.href}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other Pages */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {demoPages.other.map((page) => (
                    <li key={page.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === page.href && "bg-accent"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.name}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="flex md:hidden ml-auto gap-2">
          <select
            value={pathname}
            onChange={(e) => window.location.href = e.target.value}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="/">Home</option>
            <optgroup label="Figma Components">
              {demoPages.figma.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Mainline Template">
              {demoPages.mainline.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Square UI">
              {demoPages.squareUI.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other Pages">
              {demoPages.other.map((page) => (
                <option key={page.href} value={page.href}>
                  {page.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Right side - Theme Toggle */}
        <div className="ml-auto hidden md:flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
