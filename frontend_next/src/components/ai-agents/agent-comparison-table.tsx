"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, TrendingUp, Zap, Check, X } from "lucide-react";
import type { ShadcnBlocksAgentData } from "./shadcn-blocks-agent-card";

interface AgentComparisonTableProps {
  agents: ShadcnBlocksAgentData[];
}

export function AgentComparisonTable({ agents }: AgentComparisonTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-bold text-slate-900">Agent</TableHead>
              <TableHead className="font-bold text-slate-900">Category</TableHead>
              <TableHead className="font-bold text-slate-900">Rating</TableHead>
              <TableHead className="font-bold text-slate-900">Score</TableHead>
              <TableHead className="font-bold text-slate-900">Trend</TableHead>
              <TableHead className="font-bold text-slate-900">Features</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id} className="hover:bg-slate-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-slate-900">{agent.name}</div>
                    {agent.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {agent.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">{agent.tagline}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{agent.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{agent.rating}</span>
                    <span className="text-sm text-slate-500">({agent.reviews})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="font-bold text-blue-600">{agent.score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`h-4 w-4 ${agent.trend > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`font-semibold ${agent.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {agent.trend > 0 ? '+' : ''}{agent.trend}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {agent.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-3 w-3 text-green-600" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                    {agent.features.length > 2 && (
                      <div className="text-xs text-slate-500">
                        +{agent.features.length - 2} more
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
