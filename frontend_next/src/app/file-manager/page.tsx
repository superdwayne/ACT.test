'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Folder,
  Search,
  RefreshCw,
  Grid,
  List,
  FolderPlus,
  Upload,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type FolderCard = {
  id: string
  title: string
  files: number
  owner: string
  updated: string
  accent: string
}

type FileRecord = {
  id: string
  name: string
  type: string
  size: string
  modified: string
  owner: string
  status: 'Shared' | 'Private' | 'In review'
}

const FOLDERS: FolderCard[] = [
  { id: 'campaign', title: 'Campaign assets', files: 42, owner: 'Creative', updated: '2h ago', accent: 'bg-sky-500/10 text-sky-500' },
  { id: 'docs', title: 'Strategy docs', files: 18, owner: 'Strategy', updated: 'Yesterday', accent: 'bg-emerald-500/10 text-emerald-600' },
  { id: 'reports', title: 'Reports library', files: 26, owner: 'Analytics', updated: '3d ago', accent: 'bg-indigo-500/10 text-indigo-600' },
  { id: 'assets', title: 'Creative archive', files: 104, owner: 'Design', updated: '1w ago', accent: 'bg-fuchsia-500/10 text-fuchsia-600' },
]

const FILES: FileRecord[] = [
  { id: 'f1', name: 'ACT 2.0 launch deck', type: 'Presentation', size: '28 MB', modified: 'Today', owner: 'Lena Patel', status: 'Shared' },
  { id: 'f2', name: 'Social guidelines', type: 'Document', size: '6.2 MB', modified: 'Yesterday', owner: 'Marcus Lee', status: 'In review' },
  { id: 'f3', name: 'Retargeting storyboard', type: 'Video', size: '118 MB', modified: 'May 11', owner: 'Jordan Lee', status: 'Shared' },
  { id: 'f4', name: 'Budget spreadsheet', type: 'Sheet', size: '1.1 MB', modified: 'May 8', owner: 'Priya Singh', status: 'Private' },
  { id: 'f5', name: 'Influencer list', type: 'Document', size: '3.9 MB', modified: 'May 4', owner: 'Kai Nguyen', status: 'Shared' },
  { id: 'f6', name: 'Lead magnet banner', type: 'Image', size: '5.7 MB', modified: 'Apr 30', owner: 'Alexa Grey', status: 'In review' },
]

const CATEGORY_PROGRESS = [
  { label: 'Assets', used: 512, total: 1024, percent: 50, color: 'from-emerald-500 via-emerald-500 to-emerald-500' },
  { label: 'Images', used: 312, total: 512, percent: 61, color: 'from-sky-500 via-sky-500 to-sky-500' },
  { label: 'Audio', used: 124, total: 256, percent: 48, color: 'from-pink-500 via-pink-500 to-pink-500' },
  { label: 'Video', used: 220, total: 384, percent: 57, color: 'from-indigo-500 via-indigo-500 to-indigo-500' },
]

const STATS = [
  { title: 'Total files', value: '1,842', delta: '+8% vs last week' },
  { title: 'Shared today', value: '28', delta: '+4 from yesterday' },
  { title: 'Storage used', value: '724 GB', delta: 'out of 1 TB' },
  { title: 'Active collaborators', value: '16', delta: 'across 7 teams' },
]

function statusVariant(status: FileRecord['status']) {
  switch (status) {
    case 'Shared':
      return 'default'
    case 'Private':
      return 'outline'
    case 'In review':
      return 'secondary'
  }
}

export default function FileManagerPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const storageSummary = useMemo(
    () => ({ used: 724, limit: 1024, percent: Math.round((724 / 1024) * 100) }),
    [],
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6 space-y-6 bg-slate-950 text-slate-100">
          <section className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[22px] sm:text-2xl font-semibold tracking-tight">File manager</h2>
                <p className="text-[13px] text-muted-foreground">Browse, organize, and share everything in one place.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-1" variant="outline">
                  <FolderPlus className="size-4" />
                  New folder
                </Button>
                <Button size="sm" className="gap-1">
                  <Upload className="size-4" />
                  Upload files
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {STATS.map((stat) => (
                <Card key={stat.title} className="border border-slate-800 bg-slate-900/60 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-[11px] uppercase tracking-wide text-slate-300">
                      {stat.title}
                    </CardDescription>
                    <CardTitle className="text-2xl text-white">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-slate-400">{stat.delta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="rounded-lg border border-dashed bg-background/40 px-4 py-3 text-sm">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Storage usage</span>
                <span>{storageSummary.percent}% used</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${storageSummary.percent}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {storageSummary.used} GB of {storageSummary.limit} GB used
              </p>
              <div className="mt-4 space-y-3">
                {CATEGORY_PROGRESS.map((category) => (
                  <div key={category.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{category.label}</span>
                      <span>{category.percent}% · {category.used}GB / {category.total}GB</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        style={{ width: `${category.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-xl">
            <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2 shadow-sm">
              <Search className="size-4 text-muted-foreground" />
              <Input placeholder="Search files, folders, or collaborators" className="border-none p-0 text-sm" />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              Filters
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="size-4" />
            </Button>
            <div className="ml-auto flex gap-2">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="size-4" />
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'table' ? 'default' : 'outline'}
                onClick={() => setViewMode('table')}
              >
                <List className="size-4" />
                List
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {FOLDERS.map((folder) => (
                <Card key={folder.id} className="border border-slate-800 bg-slate-900/60 shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <Folder className="size-4 text-slate-300" />
                      <span>{folder.files} files</span>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <p className="text-sm font-semibold text-white">{folder.title}</p>
                    <p className="text-xs text-slate-400">
                      {folder.owner} · Updated {folder.updated}
                    </p>
                    <div className={`text-[11px] font-medium ${folder.accent}`}>View folder</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="border border-slate-800 bg-slate-900/60 shadow-none">
              <CardHeader className="flex flex-col gap-2 border-b pb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Recent files</CardTitle>
                  <CardDescription>Track ownership, sharing status, and storage usage.</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{storageSummary.percent}% of storage used</span>
                  <span>· {storageSummary.used} GB used out of {storageSummary.limit} GB</span>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'table' ? (
                  <Table className="bg-transparent">
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Last modified</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FILES.map((file) => (
                        <TableRow key={file.id} className="border-b border-slate-800/60">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{file.name}</span>
                              <span className="text-[11px] text-muted-foreground">{file.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{file.owner}</TableCell>
                          <TableCell>{file.modified}</TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>
                            <Badge className="text-[11px]" variant={statusVariant(file.status)}>
                              {file.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption className="text-xs text-muted-foreground">
                      All files are stored in a shared workspace. Click a row to reveal actions (coming soon).
                    </TableCaption>
                  </Table>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {FILES.map((file) => (
                      <Card key={file.id} className="border border-slate-800 bg-slate-900/60 shadow">
                        <CardHeader className="pb-1">
                          <div className="text-xs text-muted-foreground">{file.type}</div>
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                        </CardHeader>
                        <CardContent className="space-y-2 text-[11px] text-muted-foreground">
                          <p>Owner · {file.owner}</p>
                          <p>Size · {file.size}</p>
                          <p>Modified · {file.modified}</p>
                          <Badge variant={statusVariant(file.status)} className="text-[11px]">
                            {file.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
