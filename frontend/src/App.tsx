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
  PieChart,
  Plus,
  Search,
  Settings,
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
      { label: 'Reports', icon: PieChart },
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
      { label: 'Settings', icon: Settings },
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
          ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
          : 'border-rose-200 bg-rose-50 text-rose-600'
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
      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
      : 'border-amber-200 bg-amber-50 text-amber-600'

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
    const x =
      paddingX +
      (index / (chartData.length - 1)) * (width - paddingX * 2)
    const y =
      height -
      paddingY -
      ((point.value - minValue) / range) * (height - paddingY * 2)
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
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#22c55e" />
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
            key={point.x}
            cx={point.x}
            cy={point.y}
            r={4}
            className="fill-white stroke-emerald-500 stroke-[3px]"
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

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-slate-900">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-8 lg:px-10">


        <section className="rounded-[32px] border border-slate-200 bg-white shadow-md">
          <div className="flex flex-col lg:flex-row">
            <aside className="w-full border-b border-slate-200 bg-[#FAFAFA] p-8 lg:w-72 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium shadow-sm transition hover:border-emerald-300 hover:text-emerald-600">
                    <span className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Sparkles className="size-4" />
                      </div>
                      Acme Inc
                    </span>
                    <ChevronDown className="size-4 text-slate-400" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Button className="flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-600/90">
                      <Plus className="size-4" />
                      Quick create
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bell className="size-4" />
                    </Button>
                  </div>
                </div>

                <nav className="space-y-6 text-sm">
                  {navGroups.map((group) => (
                    <div key={group.label} className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-400">
                        <span>{group.label}</span>
                      </div>
                      <div className="space-y-1">
                        {group.links.map((link) => (
                          <button
                            key={link.label}
                            className={cn(
                              'group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition',
                              link.active
                                ? 'bg-white font-semibold text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:bg-white hover:text-slate-900'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="flex size-5 items-center justify-center rounded-md bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600">
                                <link.icon className="size-3.5" />
                              </span>
                              <span>{link.label}</span>
                            </span>
                            {link.badge ? (
                              <span className="text-base">{link.badge}</span>
                            ) : (
                              <span className="text-xs text-slate-400">
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
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search"
                      className="rounded-xl border-none bg-white pl-9 shadow-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-600">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-slate-900">shadcn</p>
                      <p className="text-xs text-slate-500">m@example.com</p>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 p-8">
              <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-lg">
                    <Menu className="size-4" />
                  </Button>
                  <div className="h-9 w-px bg-slate-200" />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Documents
                    </h2>
                    <p className="text-sm text-slate-500">
                      A curated view of proposal sections and owners.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="gap-2 rounded-lg">
                  <Github className="size-4" />
                  Github
                </Button>
              </header>

              <div className="space-y-8 py-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {metrics.map((metric) => (
                    <Card
                      key={metric.id}
                      className="rounded-2xl border-slate-200 shadow-sm"
                    >
                      <CardHeader className="space-y-4 border-b border-slate-100 pb-6">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{metric.label}</span>
                          <TrendBadge tone={metric.changeTone} value={metric.change} />
                        </div>
                        <div>
                          <p className="text-3xl font-semibold text-slate-900">
                            {metric.value}
                          </p>
                          <p className="text-sm text-slate-500">{metric.helper}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-6 text-sm text-slate-400">
                        {metric.footnote}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="rounded-3xl border-slate-200 shadow-md">
                  <CardHeader className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                        <Activity className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-900">
                          Total visitors
                        </CardTitle>
                        <CardDescription>
                          Total for the last 3 months
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {['Last 3 months', 'Last 30 days', 'Last 7 days'].map(
                        (item, index) => (
                          <Button
                            key={item}
                            variant={index === 0 ? 'default' : 'outline'}
                            size="sm"
                            className={cn(
                              'rounded-full',
                              index === 0
                                ? 'bg-emerald-600 text-white hover:bg-emerald-600/90'
                                : 'border-slate-200'
                            )}
                          >
                            {item}
                          </Button>
                        )
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <VisitorsChart />
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <Tabs defaultValue="outline" className="lg:flex-1">
                    <TabsList className="rounded-full bg-slate-100 p-1">
                      {[
                        { key: 'outline', label: 'Outline', count: 8 },
                        { key: 'performance', label: 'Past Performance', count: 3 },
                        { key: 'personnel', label: 'Key Personnel', count: 2 },
                        { key: 'documents', label: 'Focus Documents', count: 8 },
                      ].map((tab) => (
                        <TabsTrigger
                          key={tab.key}
                          value={tab.key}
                          className="rounded-full px-4 py-1 text-xs font-medium data-[state=active]:bg-white"
                        >
                          <span>{tab.label}</span>
                          <Badge
                            variant="secondary"
                            className="border-0 bg-slate-900/5 text-slate-600"
                          >
                            {tab.count}
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2 rounded-lg border-slate-200">
                      <ListFilter className="size-4" />
                      Customize columns
                      <Badge
                        variant="secondary"
                        className="border-0 bg-slate-100 text-slate-500"
                      >
                        ⌘
                      </Badge>
                    </Button>
                    <Button className="gap-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-600/90">
                      <Plus className="size-4" />
                      Add section
                      <Badge
                        variant="secondary"
                        className="border-0 bg-emerald-500/20 text-white"
                      >
                        ⌘
                      </Badge>
                    </Button>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-sm">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Filter sections"
                        className="rounded-xl border-slate-200 pl-9"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Target className="size-4" />
                        Target view
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <PieChart className="size-4" />
                        Reports
                      </Button>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[840px] w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
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
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {documents.map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50/80">
                            <td className="px-6 py-3">
                              <button className="rounded-lg border border-transparent p-1 text-slate-300 hover:border-slate-200 hover:text-slate-500">
                                <GripVertical className="size-4" />
                              </button>
                            </td>
                            <td className="px-2 py-3">
                              <input
                                type="checkbox"
                                aria-label={`Select ${doc.title}`}
                                className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                              />
                            </td>
                            <td className="px-6 py-3 font-medium text-slate-900">
                              {doc.title}
                            </td>
                            <td className="px-6 py-3 text-slate-500">{doc.type}</td>
                            <td className="px-6 py-3">
                              <StatusBadge status={doc.status} />
                            </td>
                            <td className="px-6 py-3 text-slate-500">{doc.target}</td>
                            <td className="px-6 py-3 text-slate-500">{doc.limit}</td>
                            <td className="px-6 py-3">
                              {doc.reviewer === 'Assign reviewer' ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 rounded-full border-dashed border-emerald-300 text-emerald-600 hover:border-emerald-400 hover:text-emerald-700"
                                >
                                  <Plus className="size-4" />
                                  Assign reviewer
                                </Button>
                              ) : (
                                <span className="text-slate-600">{doc.reviewer}</span>
                              )}
                            </td>
                            <td className="px-6 py-3 text-right">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-slate-100 p-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                    <p>
                      <span className="font-medium text-slate-700">0</span> of{' '}
                      <span className="font-medium text-slate-700">68</span> row(s) selected.
                    </p>
                    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Rows per page</span>
                        <Button variant="outline" size="sm" className="gap-1 rounded-lg">
                          10
                          <ChevronDown className="size-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-slate-400">Page 1 of 7</div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-lg">
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-lg">
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

        <footer className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 px-10 py-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-600">
              <Sparkles className="size-4" />
            </div>
            © Shadcraft 2025
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Button variant="ghost" className="gap-2 text-slate-600">
              <BookOpenText className="size-4" />
              Docs
            </Button>
            <Button variant="ghost" className="gap-2 text-slate-600">
              <Globe className="size-4" />
              Website
            </Button>
            <Button variant="ghost" className="gap-2 text-slate-600">
              <Headphones className="size-4" />
              Support
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return <DashboardPage />
}

export default App
