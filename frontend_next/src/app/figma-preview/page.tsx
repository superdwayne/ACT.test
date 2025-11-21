import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FigmaEmbed from "@/components/figma/FigmaEmbed"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus } from "lucide-react"

const DEFAULT_FIGMA_URL =
  process.env.NEXT_PUBLIC_FIGMA_URL ||
  "https://www.figma.com/design/gWvwglFYaC6DKqchMfQrYF/Untitled?node-id=1-2235&m=dev"

export default function FigmaPreviewPage() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Figma Preview</h1>
            <p className="text-sm text-muted-foreground">Live preview of the provided Figma frame.</p>
          </div>
          <ThemeToggle />
        </header>

        <Card className="rounded-2xl">
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Design Frame</CardTitle>
              <CardDescription>Embed is configurable via NEXT_PUBLIC_FIGMA_URL.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={DEFAULT_FIGMA_URL} target="_blank" rel="noreferrer">Open in Figma</a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FigmaEmbed href={DEFAULT_FIGMA_URL} height="78vh" />
          </CardContent>
        </Card>

        <section className="mt-8 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Replica (First Pass)</h2>
              <p className="text-sm text-muted-foreground">Coded version to iterate while we await MCP specs.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Plus className="size-4" /> Quick action</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Kpi title="Total revenue" value="$1,250.00" badge="+12.5%" trend="Trending up this month" sub="Visitors for the last 6 months" />
            <Kpi title="New Customers" value="1,234" badge="-20%" trend="Down 20% this period" sub="Acquisition needs attention" negative />
            <Kpi title="Active Accounts" value="45,678" badge="+12.5%" trend="Strong user retention" sub="Engagement exceed targets" />
            <Kpi title="Growth Rate" value="4.5%" badge="+4.5%" trend="Steady performance increase" sub="Meets growth projections" />
          </div>

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

          <Card className="rounded-2xl">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Sample data to mirror table layout.</CardDescription>
              </div>
              <Button variant="outline" size="sm">Customize Columns</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Title</th>
                      <th className="px-6 py-3 font-medium">Type</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_DOCS.map((doc) => (
                      <tr key={doc.id} className="border-t">
                        <td className="px-6 py-3 font-medium">{doc.title}</td>
                        <td className="px-6 py-3 text-muted-foreground">{doc.type}</td>
                        <td className="px-6 py-3">
                          <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs", doc.status === 'Done' ? "border-primary/30 bg-primary/10 text-primary" : "border-accent/40 bg-accent text-accent-foreground")}>{doc.status}</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

function AreaChart({ height = 320 }: { height?: number }) {
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
          <span className={cn("font-medium", negative ? 'text-rose-600' : undefined)}>{trend}</span>
        </div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  )
}

const SAMPLE_DOCS = [
  { id: 1, title: 'Cover page', type: 'Cover page', status: 'In progress' as const },
  { id: 2, title: 'Table of contents', type: 'Table of contents', status: 'Done' as const },
  { id: 3, title: 'Executive summary', type: 'Narrative', status: 'Done' as const },
  { id: 4, title: 'Technical approach', type: 'Narrative', status: 'Done' as const },
  { id: 5, title: 'Design', type: 'Narrative', status: 'In progress' as const },
]
