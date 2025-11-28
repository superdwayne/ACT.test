"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface SimpleAgentData {
  id: string;
  name: string;
  description: string;
  category: string;
  features?: string[];
  badge?: string;
}

interface SimpleAgentCardProps {
  agent: SimpleAgentData;
  onClick?: () => void;
}

export function SimpleAgentCard({ agent, onClick }: SimpleAgentCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          {agent.badge && (
            <Badge variant="secondary" className="shrink-0">
              {agent.badge}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm">
          {agent.description}
        </CardDescription>
      </CardHeader>
      
      {agent.features && agent.features.length > 0 && (
        <CardContent className="flex-1">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {agent.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      <CardFooter>
        <Button 
          className="w-full group" 
          onClick={onClick}
        >
          Select Agent
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
