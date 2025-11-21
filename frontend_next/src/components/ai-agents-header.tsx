import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentsSection } from "./ai-agents-card";

export function AIAgentsHeader() {
  return (
    <div className="bg-background flex flex-col gap-0 items-center pb-20 pt-0 px-0 w-full min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-background flex items-center justify-between px-8 md:px-20 py-5 w-full border-b relative">
        {/* Logo - left side */}
        <div className="flex items-center gap-2 z-10">
          <div className="text-blue-600 font-bold text-base md:text-lg">ACT AGENCY</div>
        </div>

        {/* Center Navigation Menu - hidden on mobile */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-border rounded-xl p-1.5 gap-0 items-center shadow-sm">
          <button className="flex gap-1 h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors">
            <span className="font-medium text-sm text-foreground whitespace-nowrap">
              AI Tools
            </span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex gap-1 h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors">
            <span className="font-medium text-sm text-foreground whitespace-nowrap">
              Create
            </span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex gap-1 h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors">
            <span className="font-medium text-sm text-foreground whitespace-nowrap">
              Check
            </span>
          </button>
          <button className="flex gap-1 h-9 items-center px-4 py-2 hover:bg-accent rounded-lg transition-colors">
            <span className="font-medium text-sm text-foreground whitespace-nowrap">
              Approve
            </span>
          </button>
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

      {/* AI Agents Section */}
      <AgentsSection />
    </div>
  );
}
