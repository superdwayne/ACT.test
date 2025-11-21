'use client'

import { useMemo, useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X, AlertCircle, Image as ImageIcon, ListOrdered, Rows } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'

type AssetStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs changes'

type Asset = {
  id: string
  title: string
  campaign: string
  creator: string
  channel: string
  createdAt: string
  aspect: '16:9' | '1:1' | '9:16'
  status: AssetStatus
  notes?: string
  imageUrl: string
}

const DUMMY_ASSETS: Asset[] = [
  {
    id: 'a1',
    title: 'Summer launch hero visual',
    campaign: 'Summer 24 Launch',
    creator: 'Alex Johnson',
    channel: 'Instagram',
    createdAt: '2025-06-01',
    aspect: '4:5' as any, // slight cheat just for visual label
    status: 'Pending',
    notes: 'Hero image for paid + organic',
    imageUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'a2',
    title: 'Product detail close-up',
    campaign: 'Summer 24 Launch',
    creator: 'Alex Johnson',
    channel: 'Facebook',
    createdAt: '2025-06-02',
    aspect: '1:1',
    status: 'Approved',
    notes: 'For carousel slot 2',
    imageUrl: 'https://images.pexels.com/photos/4050347/pexels-photo-4050347.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'a3',
    title: 'Stories variant (bright)',
    campaign: 'Brand Always-on',
    creator: 'Taylor Kim',
    channel: 'Instagram Stories',
    createdAt: '2025-05-29',
    aspect: '9:16',
    status: 'Pending',
    notes: 'Variant B – brighter background',
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'a4',
    title: 'LinkedIn thought leadership header',
    campaign: 'ACT 2.0 Launch',
    creator: 'Jordan Lee',
    channel: 'LinkedIn',
    createdAt: '2025-05-20',
    aspect: '16:9',
    status: 'Needs changes',
    notes: 'Client requested logo sizing review',
    imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'a5',
    title: 'Retargeting banner v3',
    campaign: 'ACT 2.0 Launch',
    creator: 'Jordan Lee',
    channel: 'Display',
    createdAt: '2025-05-18',
    aspect: '16:9',
    status: 'Rejected',
    notes: 'Brand team prefer v2 layout',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
] as Asset[]

const STATUS_LABELS: AssetStatus[] = ['Pending', 'Approved', 'Rejected', 'Needs changes']

function statusBadgeVariant(status: AssetStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Approved':
      return 'default'
    case 'Pending':
      return 'secondary'
    case 'Rejected':
      return 'destructive'
    case 'Needs changes':
      return 'outline'
    default:
      return 'secondary'
  }
}

export default function AssetApprovalsPage() {
  const [assets, setAssets] = useState<Asset[]>(DUMMY_ASSETS)
  const [statusFilter, setStatusFilter] = useState<'all' | AssetStatus>('all')
  const [campaignFilter, setCampaignFilter] = useState<string>('all')
  const [creatorFilter, setCreatorFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const campaigns = useMemo(
    () => Array.from(new Set(assets.map((a) => a.campaign))),
    [assets],
  )
  const creators = useMemo(
    () => Array.from(new Set(assets.map((a) => a.creator))),
    [assets],
  )

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (statusFilter !== 'all' && asset.status !== statusFilter) return false
      if (campaignFilter !== 'all' && asset.campaign !== campaignFilter) return false
      if (creatorFilter !== 'all' && asset.creator !== creatorFilter) return false

      if (search.trim()) {
        const q = search.toLowerCase()
        const haystack = [
          asset.title,
          asset.campaign,
          asset.creator,
          asset.channel,
          asset.notes ?? '',
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
  }, [assets, statusFilter, campaignFilter, creatorFilter, search])

  function updateStatus(id: string, next: AssetStatus) {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, status: next } : a)))
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <section className="mb-6 space-y-3">
            <div className="space-y-1">
              <h2 className="text-[22px] sm:text-2xl font-semibold leading-tight tracking-tight">
                Asset approvals
              </h2>
              <p className="text-[13px] text-muted-foreground">
                Review and approve generated assets before they go live.
              </p>
            </div>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard title="Total assets" value="900" delta="+12.3% from last month" />
              <KpiCard title="Total approval" value="1,204" delta="+4.1% from last month" />
              <KpiCard title="Time saved" value="8,431" delta="+2.7% from last month" />
              <KpiCard title="Growth Rate" value="18.9%" delta="vs. prior period" />
            </section>
          </section>

          <section className="mb-4 grid gap-3 md:grid-cols-4">
            <Card className="md:col-span-4">
              <CardContent className="pt-3 pb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                  <FilterSelect
                    label="Status"
                    value={statusFilter}
                    onChange={(v) => setStatusFilter(v as any)}
                    options={['all', ...STATUS_LABELS]}
                    renderLabel={(value) =>
                      value === 'all' ? 'All statuses' : (value as string)
                    }
                  />
                  <FilterSelect
                    label="Campaign"
                    value={campaignFilter}
                    onChange={setCampaignFilter}
                    options={['all', ...campaigns]}
                    renderLabel={(value) =>
                      value === 'all' ? 'All campaigns' : value
                    }
                  />
                  <FilterSelect
                    label="Creator"
                    value={creatorFilter}
                    onChange={setCreatorFilter}
                    options={['all', ...creators]}
                    renderLabel={(value) =>
                      value === 'all' ? 'All creators' : value
                    }
                  />
                </div>
                <div className="w-full md:w-64">
                  <Input
                    placeholder="Search title, campaign, notes…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Tabs defaultValue="images" className="space-y-4">
              <TabsList className="h-9 rounded-md bg-muted/60 p-1">
                <TabsTrigger value="images" className="h-7 px-3 flex items-center gap-1">
                  <ImageIcon className="size-4" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="table" className="h-7 px-3 flex items-center gap-1">
                  <Rows className="size-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="compact" className="h-7 px-3 flex items-center gap-1">
                  <ListOrdered className="size-4" />
                  Compact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images">
                <ImagesView assets={filteredAssets} onUpdateStatus={updateStatus} />
              </TabsContent>

              <TabsContent value="table">
                <TableView assets={filteredAssets} onUpdateStatus={updateStatus} />
              </TabsContent>

              <TabsContent value="compact">
                <CompactListView assets={filteredAssets} onUpdateStatus={updateStatus} />
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}

function FilterSelect(props: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  renderLabel?: (v: string) => string
}) {
  const { label, value, onChange, options, renderLabel } = props
  return (
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-[180px] text-sm">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {renderLabel ? renderLabel(opt) : opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ImagesView({
  assets,
  onUpdateStatus,
}: {
  assets: Asset[]
  onUpdateStatus: (id: string, next: AssetStatus) => void
}) {
  if (!assets.length) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {assets.map((asset) => (
        <Card
          key={asset.id}
          className="group overflow-hidden bg-card shadow-lg transition hover:translate-y-0.5 hover:shadow-2xl"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-muted">
            <Image
              src={asset.imageUrl}
              alt={asset.title}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <Badge
              className="absolute right-3 top-3 text-[11px]"
              variant={statusBadgeVariant(asset.status)}
            >
              {asset.status}
            </Badge>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-3 opacity-0 transition duration-300 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{asset.title}</p>
              <p className="text-xs text-white/90">
                {asset.campaign} · {asset.channel}
              </p>
            </div>
          </div>
          <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between text-[12px] text-muted-foreground">
              <span className="font-medium text-foreground">{asset.creator}</span>
              <span>{asset.createdAt}</span>
            </div>
            {asset.notes && <p className="line-clamp-2 text-[11px]">{asset.notes}</p>}
            <div className="flex flex-wrap gap-1 text-[11px]">
              <Badge variant="outline">Aspect {asset.aspect}</Badge>
              <Badge variant="outline">{asset.channel}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={() => onUpdateStatus(asset.id, 'Approved')}
              >
                <Check className="mr-1 size-3" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs"
                onClick={() => onUpdateStatus(asset.id, 'Rejected')}
              >
                <X className="mr-1 size-3" />
                Reject
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-xs"
                onClick={() => onUpdateStatus(asset.id, 'Needs changes')}
              >
                <AlertCircle className="mr-1 size-3" />
                Needs changes
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TableView({
  assets,
  onUpdateStatus,
}: {
  assets: Asset[]
  onUpdateStatus: (id: string, next: AssetStatus) => void
}) {
  if (!assets.length) {
    return <EmptyState />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Assets</CardTitle>
        <CardDescription>Tabular view with text-only rows and hover previews.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id} className="group relative">
                {/* text-only cells */}
                <TableCell>
                  <div>
                    <div className="text-sm font-medium">{asset.title}</div>
                    {asset.notes && (
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {asset.notes}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{asset.campaign}</TableCell>
                <TableCell>{asset.creator}</TableCell>
                <TableCell>{asset.channel}</TableCell>
                <TableCell>{asset.createdAt}</TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(asset.status)} className="text-[11px]">
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <ChipButton
                      active={asset.status === 'Approved'}
                      onClick={() => onUpdateStatus(asset.id, 'Approved')}
                    >
                      Approve
                    </ChipButton>
                    <ChipButton
                      active={asset.status === 'Rejected'}
                      onClick={() => onUpdateStatus(asset.id, 'Rejected')}
                    >
                      Reject
                    </ChipButton>
                    <ChipButton
                      active={asset.status === 'Needs changes'}
                      onClick={() => onUpdateStatus(asset.id, 'Needs changes')}
                    >
                      Needs changes
                    </ChipButton>
                  </div>
                  <div
                    className="
                      pointer-events-none invisible opacity-0
                      group-hover:visible group-hover:opacity-100
                      transition-opacity
                      absolute left-full top-1/2 -translate-y-1/2 z-20
                    "
                  >
                    <Card className="w-64 shadow-lg">
                      <div className="relative h-40 w-full bg-muted">
                        <Image
                          src={asset.imageUrl}
                          alt={asset.title}
                          fill
                          sizes="256px"
                          className="object-cover rounded-t-md"
                        />
                      </div>
                      <CardContent className="p-2">
                        <p className="text-xs font-medium truncate">{asset.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {asset.campaign} · {asset.channel}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="text-xs">
            Hover a row to see the associated asset preview.
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  )
}
function CompactListView({
  assets,
  onUpdateStatus,
}: {
  assets: Asset[]
  onUpdateStatus: (id: string, next: AssetStatus) => void
}) {
  if (!assets.length) {
    return <EmptyState />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Compact list</CardTitle>
        <CardDescription>Dense view optimized for quick scanning.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2 text-xs"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium truncate">{asset.title}</span>
                <span className="text-muted-foreground">· {asset.campaign}</span>
                <Badge variant="outline" className="border-dashed">
                  {asset.channel}
                </Badge>
                <Badge variant={statusBadgeVariant(asset.status)} className="text-[10px]">
                  {asset.status}
                </Badge>
              </div>
              <div className="mt-0.5 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <span>{asset.creator}</span>
                <span>· {asset.createdAt}</span>
                {asset.notes && <span className="truncate max-w-xs">{asset.notes}</span>}
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <ChipButton
                size="xs"
                active={asset.status === 'Approved'}
                onClick={() => onUpdateStatus(asset.id, 'Approved')}
              >
                Approve
              </ChipButton>
              <ChipButton
                size="xs"
                active={asset.status === 'Rejected'}
                onClick={() => onUpdateStatus(asset.id, 'Rejected')}
              >
                Reject
              </ChipButton>
              <ChipButton
                size="xs"
                active={asset.status === 'Needs changes'}
                onClick={() => onUpdateStatus(asset.id, 'Needs changes')}
              >
                Needs changes
              </ChipButton>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ChipButton({
  children,
  active,
  size = 'sm',
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  size?: 'sm' | 'xs'
  onClick: () => void
}) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      className={clsx(
        'h-7 px-2 text-[11px]',
        size === 'xs' && 'h-6 px-2 text-[10px]',
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function KpiCard({ title, value, delta }: { title: string; value: string; delta: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        {(() => {
          const isNegative = delta.trim().startsWith('-')
          return (
            <div className={`text-xs ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>{delta}</div>
          )
        })()}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-center text-sm text-muted-foreground">
      <p>No assets match the current filters.</p>
      <p className="text-xs">Adjust filters or search to see more results.</p>
    </div>
  )
}