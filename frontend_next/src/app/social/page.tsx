'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Plus, ArrowUpRight, Calendar, Send } from 'lucide-react'
import Link from 'next/link'

export default function SocialDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Social Media Dashboard</h2>
              <p className="text-sm text-muted-foreground">Performance, queue, and recent posts across platforms</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/chat"><Button variant="outline"><Sparkles className="mr-2 size-4" /> Ask Assistant</Button></Link>
              <Button><Plus className="mr-2 size-4" /> New Post</Button>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Total Followers" value="128,940" delta="+1.2% this week" />
            <KpiCard title="Engagement Rate" value="3.8%" delta="+0.4%" />
            <KpiCard title="Posts Scheduled" value="23" delta="Next 7 days" />
            <KpiCard title="Avg CTR" value="2.4%" delta="+0.3%" />
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Latest published content across platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="all">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <PostsTable rows={samplePosts} />
                  </TabsContent>
                  <TabsContent value="twitter">
                    <PostsTable rows={samplePosts.filter(p => p.platform === 'Twitter')} />
                  </TabsContent>
                  <TabsContent value="linkedin">
                    <PostsTable rows={samplePosts.filter(p => p.platform === 'LinkedIn')} />
                  </TabsContent>
                  <TabsContent value="instagram">
                    <PostsTable rows={samplePosts.filter(p => p.platform === 'Instagram')} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Queue</CardTitle>
                <CardDescription>Upcoming posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sampleQueue.map((q) => (
                  <div key={q.id} className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
                    <div>
                      <p className="text-sm font-medium">{q.title}</p>
                      <p className="text-xs text-muted-foreground">{q.platform} • {q.when}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{q.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Send className="mr-2 size-3" /> Publish
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full"><Calendar className="mr-2 size-4" /> Open Calendar</Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
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
        <div className="text-xs text-muted-foreground">{delta}</div>
      </CardContent>
    </Card>
  )
}

type PostRow = { id: string; platform: 'Twitter' | 'LinkedIn' | 'Instagram'; title: string; status: 'Published' | 'Scheduled' | 'Draft'; metrics: string }
function PostsTable({ rows }: { rows: PostRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-2">Title</th>
            <th className="py-2">Platform</th>
            <th className="py-2">Status</th>
            <th className="py-2 text-right">Metrics</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{row.platform}</Badge>
                  <span className="font-medium">{row.title}</span>
                </div>
              </td>
              <td className="py-2">{row.platform}</td>
              <td className="py-2">{row.status}</td>
              <td className="py-2 text-right text-muted-foreground">{row.metrics}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const samplePosts: PostRow[] = [
  { id: '1', platform: 'Twitter', title: 'Q4 launch teaser', status: 'Published', metrics: '2.1k views · 180 likes' },
  { id: '2', platform: 'LinkedIn', title: 'Case study: ACT 2.0', status: 'Published', metrics: '12k views · 420 reactions' },
  { id: '3', platform: 'Instagram', title: 'Behind the scenes', status: 'Published', metrics: '5.3k views · 600 likes' },
  { id: '4', platform: 'Twitter', title: 'Feature highlight', status: 'Scheduled', metrics: '—' },
]

const sampleQueue = [
  { id: 'q1', title: 'Holiday promo set 1', platform: 'Twitter', when: 'Tomorrow 10:00', status: 'Queued' },
  { id: 'q2', title: 'Founder note', platform: 'LinkedIn', when: 'Fri 09:30', status: 'Queued' },
  { id: 'q3', title: 'Reel: workflow tips', platform: 'Instagram', when: 'Mon 14:00', status: 'Queued' },
]


