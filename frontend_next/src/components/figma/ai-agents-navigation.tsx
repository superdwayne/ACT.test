"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationItem {
  title: string;
  href?: string;
  hasDropdown?: boolean;
  items?: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
}

const navigationItems: NavigationItem[] = [
  {
    title: "AI Tools",
    hasDropdown: true,
    items: [
      {
        title: "Content Generator",
        href: "/tools/content",
        description: "Generate marketing content with AI",
      },
      {
        title: "Image Creator",
        href: "/tools/images",
        description: "Create stunning visuals",
      },
    ],
  },
  {
    title: "Create",
    hasDropdown: true,
    items: [
      {
        title: "New Campaign",
        href: "/create/campaign",
        description: "Start a new marketing campaign",
      },
      {
        title: "New Project",
        href: "/create/project",
        description: "Create a new project",
      },
    ],
  },
  {
    title: "Check",
    href: "/check",
  },
  {
    title: "Approve",
    href: "/approve",
  },
];

export function AIAgentsNavigation() {
  return (
    <nav className="bg-background flex items-center justify-between px-8 md:px-20 py-5 w-full border-b relative">
      {/* Logo - left side */}
      <div className="flex items-center gap-2 z-10">
        <div className="text-blue-600 font-bold text-base md:text-lg">
          ACT AGENCY
        </div>
      </div>

      {/* Center Navigation Menu - hidden on mobile */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NavigationMenu>
          <NavigationMenuList className="bg-white border border-border rounded-xl p-1.5 gap-0 shadow-sm">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.hasDropdown ? (
                  <>
                    <NavigationMenuTrigger className="h-9 px-4 py-2 gap-1 hover:bg-accent rounded-lg transition-colors bg-transparent data-[state=open]:bg-accent">
                      <span className="font-medium text-sm text-foreground whitespace-nowrap">
                        {item.title}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.items?.map((subItem) => (
                          <ListItem
                            key={subItem.title}
                            title={subItem.title}
                            href={subItem.href}
                          >
                            {subItem.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={item.href}
                    className="inline-flex h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <span className="font-medium text-sm text-foreground whitespace-nowrap">
                      {item.title}
                    </span>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side CTAs */}
      <div className="flex gap-2 items-center z-10">
        <Button variant="ghost" size="sm" className="h-9 hidden sm:flex">
          Login
        </Button>
        <Button size="sm" className="h-9 bg-primary text-primary-foreground shadow-sm">
          Get started
        </Button>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
