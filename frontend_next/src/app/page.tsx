'use client'

import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpenText,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  FileStack,
  Github,
  Globe,
  GripVertical,
  Headphones,
  Layers,
  LineChart,
  ListFilter,
  Menu,
  MoreHorizontal,
  PieChart as PieChartIcon,
  Plus,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'

type Metric = {
  id: string
  label: string
  change: string
  changeTone: 'positive' | 'negative'
  value: string
  helper: string
  footnote: string
}

type NavLink = {
  label: string
  icon: LucideIcon
  badge?: string
  active?: boolean
}

type NavGroup = {
  label: string
  links: NavLink[]
}

type DocumentRow = {
  id: number
  title: string
  type: string
  status: 'Done' | 'In progress'
  target: number
  limit: number
  reviewer: string
}

const metrics: Metric[] = [
  {
    id: 'revenue',
    label: 'Total revenue',
    change: '+12.5%',
    changeTone: 'positive',
    value: '$1,250.00',
    helper: 'Trending up this month',
    footnote: 'Visitors for the last 6 months',
  },
  {
    id: 'customers',
    label: 'New customers',
    change: '-20%',
    changeTone: 'negative',
    value: '1,234',
    helper: 'Down 20% this period',
    footnote: 'Acquisition needs attention',
  },
  {
    id: 'accounts',
    label: 'Active accounts',
    change: '+12.5%',
    changeTone: 'positive',
    value: '45,678',
    helper: 'Strong user retention',
    footnote: 'Engagement exceed targets',
  },
  {
    id: 'growth',
    label: 'Growth rate',
    change: '+4.5%',
    changeTone: 'positive',
    value: '4.5%',
    helper: 'Steady performance increase',
    footnote: 'Meets growth projections',
  },
]

const navGroups: NavGroup[] = [
  {
    label: 'Dashboard',
    links: [
      { label: 'Overview', icon: BarChart3, active: true },
      { label: 'Lifecycle', icon: Compass },
      { label: 'Analytics', icon: LineChart },
      { label: 'Projects', icon: Layers },
      { label: 'Team', icon: Users },
    ],
  },
  {
    label: 'Documents',
    links: [
      { label: 'Data library', icon: FileStack },
      { label: 'Reports', icon: PieChartIcon },
      { label: 'Word Assistant', icon: Sparkles },
      { label: 'Trash', icon: Target },
    ],
  },
  {
    label: 'Workspaces',
    links: [
      { label: 'Language learning progress', icon: BookOpenText, badge: '🗣️' },
      { label: 'Home renovation ideas', icon: Building, badge: '🏠' },
      { label: 'Personal finance', icon: Sparkles, badge: '💰' },
      { label: 'Movie & TV watchlist', icon: Sparkles, badge: '🎬' },
      { label: 'Daily habit tracker', icon: Sparkles, badge: '✅' },
    ],
  },
  {
    label: 'More',
    links: [
      { label: 'Settings', icon: SettingsIcon },
      { label: 'Get help', icon: Headphones },
    ],
  },
]

const documents: DocumentRow[] = [
  {
    id: 1,
    title: 'Cover page',
    type: 'Cover page',
    status: 'In progress',
    target: 18,
    limit: 5,
    reviewer: 'Eddie Lake',
  },
  {
    id: 2,
    title: 'Table of contents',
    type: 'Table of contents',
    status: 'Done',
    target: 29,
    limit: 24,
    reviewer: 'Eddie Lake',
  },
  {
    id: 3,
    title: 'Executive summary',
    type: 'Narrative',
    status: 'Done',
    target: 10,
    limit: 13,
    reviewer: 'Eddie Lake',
  },
  {
    id: 4,
    title: 'Technical approach',
    type: 'Narrative',
    status: 'Done',
    target: 27,
    limit: 23,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 5,
    title: 'Design',
    type: 'Narrative',
    status: 'In progress',
    target: 2,
    limit: 16,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 6,
    title: 'Capabilities',
    type: 'Narrative',
    status: 'In progress',
    target: 20,
    limit: 8,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 7,
    title: 'Integration with existing systems',
    type: 'Narrative',
    status: 'In progress',
    target: 19,
    limit: 21,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 8,
    title: 'Innovation and advantages',
    type: 'Narrative',
    status: 'Done',
    target: 25,
    limit: 26,
    reviewer: 'Assign reviewer',
  },
  {
    id: 9,
    title: "Overview of EMR's innovative solutions",
    type: 'Cover page',
    status: 'Done',
    target: 7,
    limit: 23,
    reviewer: 'Assign reviewer',
  },
  {
    id: 10,
    title: 'Advanced algorithms and machine learning',
    type: 'Cover page',
    status: 'Done',
    target: 30,
    limit: 28,
    reviewer: 'Assign reviewer',
  },
]

const chartData = [
  { date: 'Apr 2', value: 126 },
  { date: 'Apr 7', value: 141 },
  { date: 'Apr 12', value: 133 },
  { date: 'Apr 17', value: 152 },
  { date: 'Apr 22', value: 147 },
  { date: 'Apr 27', value: 159 },
  { date: 'May 2', value: 172 },
  { date: 'May 7', value: 168 },
  { date: 'May 12', value: 182 },
  { date: 'May 17', value: 189 },
  { date: 'May 23', value: 178 },
  { date: 'May 29', value: 196 },
  { date: 'Jun 3', value: 203 },
  { date: 'Jun 8', value: 198 },
  { date: 'Jun 13', value: 208 },
  { date: 'Jun 18', value: 215 },
  { date: 'Jun 23', value: 221 },
  { date: 'Jun 30', value: 229 },
]

function TrendBadge({
  tone,
  value,
}: {
  tone: 'positive' | 'negative'
  value: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium',
        tone === 'positive'
          ? 'border-primary/30 bg-primary/10 text-primary'
          : 'border-destructive/30 bg-destructive/10 text-destructive'
      )}
    >
      <Circle className="size-2 fill-current" />
      {value}
    </span>
  )
}

function StatusBadge({ status }: { status: DocumentRow['status'] }) {
  const tone =
    status === 'Done'
      ? 'border-primary/30 bg-primary/10 text-primary'
      : 'border-accent/40 bg-accent text-accent-foreground'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        tone
      )}
    >
      {status}
    </span>
  )
}

function VisitorsChart() {
  const width = 900
  const height = 220
  const paddingX = 16
  const paddingY = 12
  const values = chartData.map((point) => point.value)
  const minValue = Math.min(...values) - 10
  const maxValue = Math.max(...values) + 10
  const range = Math.max(maxValue - minValue, 1)

  const points = chartData.map((point, index) => {
    const x = paddingX + (index / (chartData.length - 1)) * (width - paddingX * 2)
    const y =
      height - paddingY - ((point.value - minValue) / range) * (height - paddingY * 2)
    return { x, y }
  })

  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ')
  const areaPath = [
    `M ${points[0]?.x ?? 0} ${height - paddingY}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points.at(-1)?.x ?? width} ${height - paddingY}`,
    'Z',
  ].join(' ')

  return (
    <div className="space-y-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-64 w-full"
        role="img"
        aria-labelledby="visitorsTitle"
      >
        <title id="visitorsTitle">Visitors over time</title>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.85} />
          </linearGradient>
        </defs>
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          className="transition-all duration-300"
        />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={4}
            className="fill-card stroke-primary stroke-[3px]"
          />
        ))}
      </svg>
      <div className="grid grid-cols-6 gap-4 text-xs text-muted-foreground sm:grid-cols-9 lg:grid-cols-12">
        {chartData.map((point) => (
          <span key={point.date} className="text-center">
            {point.date}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-8 lg:px-10">
      

        <section className="rounded-[32px] border border-border bg-card shadow-md">
          <div className="flex flex-col lg:flex-row">
            <aside className="w-full border-b border-border bg-sidebar p-8 lg:w-72 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <button className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-medium shadow-sm transition hover:border-primary/40 hover:text-primary">
                    <span className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Sparkles className="size-4" />
                      </span>
                      Acme Inc
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Button className="flex-1 gap-2">
                      <Plus className="size-4" />
                      Quick create
                    </Button>
                    <Button variant="outline" size="icon" className="text-muted-foreground">
                      <Bell className="size-4" />
                    </Button>
                  </div>
                </div>

                <nav className="space-y-6 text-sm">
                  {navGroups.map((group) => (
                    <div key={group.label} className="space-y-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.links.map((link) => (
                          <button
                            key={link.label}
                            className={cn(
                              'group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition',
                              link.active
                                ? 'bg-card font-semibold text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-card hover:text-foreground'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="flex size-5 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                <link.icon className="size-3.5" />
                              </span>
                              <span>{link.label}</span>
                            </span>
                            {link.badge ? (
                              <span className="text-base">{link.badge}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                {link.active ? '⌘1' : '⌘'}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>

                <div className="space-y-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                      type="search"
                      placeholder="Search"
                      className="rounded-xl border-transparent bg-card pl-9 shadow-sm focus-visible:border-transparent focus-visible:ring-ring"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-primary/10 text-primary">SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm">
                      <p className="font-medium">shadcn</p>
                      <p className="text-xs text-muted-foreground">m@example.com</p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 p-8">
              <header className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-lg text-muted-foreground">
                    <Menu className="size-4" />
                  </Button>
                  <div className="h-9 w-px bg-border" />
                  <div>
                    <h2 className="text-xl font-semibold">Documents</h2>
                    <p className="text-sm text-muted-foreground">
                      A curated view of proposal sections and owners.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="gap-2 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <Github className="size-4" />
                  Github
                </Button>
              </header>

              <div className="space-y-8 py-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <Card key={metric.id} className="rounded-2xl border-border shadow-sm">
                      <CardHeader className="space-y-4 border-b border-border pb-6">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{metric.label}</span>
                          <TrendBadge tone={metric.changeTone} value={metric.change} />
                        </div>
                        <div>
                          <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                          <p className="text-sm text-muted-foreground">{metric.helper}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-6 text-sm text-muted-foreground">
                        {metric.footnote}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="rounded-3xl border-border shadow-md">
                  <CardHeader className="flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Activity className="size-5" />
                      </span>
                      <div>
                        <CardTitle className="text-xl">Total visitors</CardTitle>
                        <CardDescription>Total for the last 3 months</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {['Last 3 months', 'Last 30 days', 'Last 7 days'].map((item, index) => (
                        <Button
                          key={item}
                          variant={index === 0 ? 'default' : 'outline'}
                          size="sm"
                          className={cn('rounded-full', index === 0 ? undefined : 'text-muted-foreground')}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <VisitorsChart />
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <Tabs defaultValue="outline" className="lg:flex-1">
                    <TabsList className="rounded-full bg-muted/60 p-1">
                      {[
                        { key: 'outline', label: 'Outline', count: 8 },
                        { key: 'performance', label: 'Past Performance', count: 3 },
                        { key: 'personnel', label: 'Key Personnel', count: 2 },
                        { key: 'documents', label: 'Focus Documents', count: 8 },
                      ].map((tab) => (
                        <TabsTrigger
                          key={tab.key}
                          value={tab.key}
                          className="rounded-full px-4 py-1 text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground"
                        >
                          <span>{tab.label}</span>
                          <Badge
                            variant="secondary"
                            className="border-0 bg-muted/70 text-muted-foreground"
                          >
                            {tab.count}
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2 rounded-lg text-muted-foreground">
                      <ListFilter className="size-4" />
                      Customize columns
                      <Badge
                        variant="secondary"
                        className="border-0 bg-muted/70 text-muted-foreground"
                      >
                        ⌘
                      </Badge>
                    </Button>
                    <Button className="gap-2 rounded-lg">
                      <Plus className="size-4" />
                      Add section
                      <Badge
                        variant="secondary"
                        className="border-0 bg-primary/20 text-primary"
                      >
                        ⌘
                      </Badge>
                    </Button>
                  </div>
                </div>

                <div className="rounded-3xl border border-border shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-sm">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        placeholder="Filter sections"
                        className="rounded-xl border-border pl-9"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg text-muted-foreground">
                        <Target className="size-4" />
                        Target view
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg text-muted-foreground">
                        <PieChartIcon className="size-4" />
                        Reports
                      </Button>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[840px] w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                          <th className="px-6 py-4 font-medium">
                            <span className="sr-only">Reorder</span>
                          </th>
                          <th className="px-2 py-4 font-medium">
                            <span className="sr-only">Select</span>
                          </th>
                          <th className="px-6 py-4 font-medium">Section</th>
                          <th className="px-6 py-4 font-medium">Section type</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Target</th>
                          <th className="px-6 py-4 font-medium">Limit</th>
                          <th className="px-6 py-4 font-medium">Reviewer</th>
                          <th className="px-6 py-4 font-medium">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-sm">
                        {documents.map((doc) => (
                          <tr key={doc.id} className="hover:bg-muted/50">
                            <td className="px-6 py-3">
                              <button className="rounded-lg border border-transparent p-1 text-muted-foreground/60 transition-colors hover:border-border hover:text-foreground">
                                <GripVertical className="size-4" />
                              </button>
                            </td>
                            <td className="px-2 py-3">
                              <input
                                type="checkbox"
                                aria-label={`Select ${doc.title}`}
                                className="size-4 rounded border-border text-primary focus:ring-ring"
                              />
                            </td>
                            <td className="px-6 py-3 font-medium">{doc.title}</td>
                            <td className="px-6 py-3 text-muted-foreground">{doc.type}</td>
                            <td className="px-6 py-3">
                              <StatusBadge status={doc.status} />
                            </td>
                            <td className="px-6 py-3 text-muted-foreground">{doc.target}</td>
                            <td className="px-6 py-3 text-muted-foreground">{doc.limit}</td>
                            <td className="px-6 py-3">
                              {doc.reviewer === 'Assign reviewer' ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 rounded-full border-dashed border-primary/40 text-primary hover:border-primary/60"
                                >
                                  <Plus className="size-4" />
                                  Assign reviewer
                                </Button>
                              ) : (
                                <span className="text-muted-foreground">{doc.reviewer}</span>
                              )}
                            </td>
                            <td className="px-6 py-3 text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-border p-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>
                      <span className="font-medium text-foreground">0</span> of{' '}
                      <span className="font-medium text-foreground">68</span> row(s) selected.
                    </p>
                    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Rows per page</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 rounded-lg text-muted-foreground"
                        >
                          10
                          <ChevronDown className="size-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">Page 1 of 7</div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-lg text-muted-foreground">
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-lg text-muted-foreground">
                          <ChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 rounded-3xl border border-border bg-card/95 px-10 py-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
              <Sparkles className="size-4" />
            </span>
            © Shadcraft 2025
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <BookOpenText className="size-4" />
              Docs
            </Button>
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <Globe className="size-4" />
              Website
            </Button>
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <Headphones className="size-4" />
              Support
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
