'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Plus, Rocket, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Slider } from '@/components/ui/slider'

export default function DashboardLightPage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('light')
  }, [setTheme])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Overview (Light)</h2>
              <p className="text-sm text-muted-foreground">Bright surface, subtle borders, Obra-style spacing</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/chat"><Button variant="outline"><Sparkles className="mr-2 size-4" /> Open Chat</Button></Link>
              <Button><Plus className="mr-2 size-4" /> New Project</Button>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Active Brands" value="7" delta="+2 this week" />
            <KpiCard title="Running Agents" value="14" delta="-1 today" />
            <KpiCard title="Tokens Used" value="128,540" delta="+12%" />
            <KpiCard title="Cost Today" value="$23.84" delta="-8%" />
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest agent runs and generated assets</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">Item</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Brand</th>
                      <th className="py-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { item: 'Social post batch', type: 'Content', brand: 'Nova', time: '2m ago' },
                      { item: 'Campaign brief analysis', type: 'Strategy', brand: 'Orion', time: '18m ago' },
                      { item: 'Ad copy variants', type: 'Content', brand: 'Lumen', time: '1h ago' },
                      { item: 'Workflow run: social-media-campaign', type: 'Workflow', brand: 'Apex', time: '2h ago' },
                    ].map((row) => (
                      <tr key={row.item}>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">New</Badge>
                            <span className="font-medium">{row.item}</span>
                          </div>
                        </td>
                        <td className="py-2">{row.type}</td>
                        <td className="py-2">{row.brand}</td>
                        <td className="py-2 text-right text-muted-foreground">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into common workflows</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Link href="/chat"><Button variant="outline" className="justify-between">Ask the Assistant <ArrowUpRight className="size-4" /></Button></Link>
                <Button variant="outline" className="justify-between">Generate Social Posts <ArrowUpRight className="size-4" /></Button>
                <Button variant="outline" className="justify-between">Analyze Campaign Brief <ArrowUpRight className="size-4" /></Button>
                <Button className="justify-between"><Rocket className="mr-2 size-4" /> Launch Workflow</Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-medium">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
                </div>
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


