'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FigmaDocumentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <Card className="rounded-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Documents</span>
              </div>
              <Button variant="ghost" size="sm">Github</Button>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
              <Kpi title="Total revenue" value="$1,250.00" badge="+12.5%" trend="Trending up this month" sub="Visitors for the last 6 months" />
              <Kpi title="New Customers" value="1,234" badge="-20%" trend="Down 20% this period" sub="Acquisition needs attention" negative />
              <Kpi title="Active Accounts" value="45,678" badge="+12.5%" trend="Strong user retention" sub="Engagement exceed targets" />
              <Kpi title="Growth Rate" value="4.5%" badge="+4.5%" trend="Steady performance increase" sub="Meets growth projections" />
            </div>

            <div className="px-4 pb-6">
              <Card className="rounded-2xl">
                <CardHeader className="flex-row items-center justify-between">
                  <div>
                    <CardTitle>Total visitors</CardTitle>
                    <CardDescription>Total for the last 3 months</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Last 3 months</Button>
                    <Button variant="ghost" size="sm">Last 30 days</Button>
                    <Button variant="ghost" size="sm">Last 7 days</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChart height={340} />
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between px-4 pb-4">
              <Tabs defaultValue="outline">
                <TabsList className="h-9 rounded-md bg-muted/60 p-1">
                  <TabsTrigger value="outline" className="h-7 px-3">Outline</TabsTrigger>
                  <TabsTrigger value="past" className="h-7 px-3">
                    <span>Past Performance</span>
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted px-1 text-xs">3</span>
                  </TabsTrigger>
                  <TabsTrigger value="people" className="h-7 px-3">
                    <span>Key Personnel</span>
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted px-1 text-xs">2</span>
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="h-7 px-3">Focus Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="outline" />
                <TabsContent value="past" />
                <TabsContent value="people" />
                <TabsContent value="docs" />
              </Tabs>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Customize Columns</Button>
                <Button variant="outline" size="sm">Add Section</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}

function AreaChart({ height = 320 }: { height?: number }) {
  // Fixed data to mirror the Figma preview style
  const points = [
    20, 45, 35, 70, 50, 110, 65, 130, 90, 85, 120, 150, 95, 160, 140, 170,
    120, 180, 130, 175, 150, 165, 185, 170, 190, 160, 200, 180, 175, 195
  ]

  const width = 940
  const h = height
  const max = 200
  const stepX = width / (points.length - 1)

  const toY = (v: number) => h - (v / max) * (h - 16) - 8

  const linePath = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${toY(v)}`)
    .join(' ')

  const areaPath = `${linePath} L ${width} ${h} L 0 ${h} Z`

  const gridLines = 5
  const gridYs = Array.from({ length: gridLines }, (_, i) => (h / gridLines) * (i + 1))

  return (
    <div className="relative w-full overflow-hidden rounded-lg border bg-background">
      <svg viewBox={`0 0 ${width} ${h}`} width="100%" height={h} role="img" aria-label="Visitors over time">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridYs.map((y, idx) => (
          <line key={idx} x1="0" x2={width} y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
        ))}

        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" stroke="var(--foreground)" strokeOpacity="0.35" strokeWidth="2" />
      </svg>
    </div>
  )
}

function Kpi({ title, value, badge, trend, sub, negative }: { title: string; value: string; badge: string; trend: string; sub: string; negative?: boolean }) {
  return (
    <Card className="rounded-2xl border">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{title}</span>
          <span className="rounded border px-2 py-0.5 text-xs">{badge}</span>
        </div>
        <div className="mb-4 text-2xl font-semibold tracking-tight">{value}</div>
        <div className="mb-1 flex items-center gap-2 text-sm">
          <span className={`font-medium ${negative ? 'text-rose-600' : ''}`}>{trend}</span>
        </div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  )
}
