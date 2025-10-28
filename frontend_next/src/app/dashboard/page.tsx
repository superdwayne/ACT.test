'use client'

import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Plus, Rocket, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  const { setTheme } = useTheme()
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[22px] sm:text-2xl font-semibold leading-tight tracking-tight">Dashboard</h2>
              <p className="text-[13px] text-muted-foreground">A dashboard with sidebar, charts and data table</p>
            </div>
            <a href="https://ui.shadcn.com/blocks#dashboard-01" className="text-sm underline underline-offset-2">Documentation</a>
          </div>

          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Total revenue" value="$82,450" delta="+12.3% from last month" />
            <KpiCard title="New Customers" value="1,204" delta="+4.1% from last month" />
            <KpiCard title="Active Accounts" value="8,431" delta="+2.7% from last month" />
            <KpiCard title="Growth Rate" value="18.9%" delta="vs. prior period" />
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Total visitors</CardTitle>
                <CardDescription>Traffic overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="q3">
                  <TabsList className="h-9 rounded-md bg-muted/60 p-1">
                    <TabsTrigger value="q3" className="h-7 px-3">Last 3 months</TabsTrigger>
                    <TabsTrigger value="q6" className="h-7 px-3">Last 6 months</TabsTrigger>
                    <TabsTrigger value="q12" className="h-7 px-3">Last 12 months</TabsTrigger>
                  </TabsList>
                  <TabsContent value="q3">
                    <div className="mt-4 h-64 rounded-md border bg-gradient-to-br from-accent/40 to-background" />
                  </TabsContent>
                  <TabsContent value="q6">
                    <div className="mt-4 h-64 rounded-md border bg-gradient-to-br from-accent/40 to-background" />
                  </TabsContent>
                  <TabsContent value="q12">
                    <div className="mt-4 h-64 rounded-md border bg-gradient-to-br from-accent/40 to-background" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

          <section className="mt-6">
            <Tabs defaultValue="past" className="space-y-4">
              <TabsList className="h-9 rounded-md bg-muted/60 p-1">
                <TabsTrigger value="outline" className="h-7 px-3">Outline</TabsTrigger>
                <TabsTrigger value="past" className="h-7 px-3">Past Performance</TabsTrigger>
                <TabsTrigger value="people" className="h-7 px-3">Key Personnel</TabsTrigger>
                <TabsTrigger value="docs" className="h-7 px-3">Focus Documents</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>

            
          </section>

          

          <section className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Columns</CardTitle>
                <CardDescription>Manage table data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 text-left">
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Columns</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Header</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Section Type</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Target</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Limit</th>
                        <th className="h-10 px-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Reviewer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b odd:bg-background even:bg-muted/20 hover:bg-muted/40">
                        <td className="h-12 px-4 align-middle">Engagement</td>
                        <td className="h-12 px-4 align-middle">Active</td>
                        <td className="h-12 px-4 align-middle">Yes</td>
                        <td className="h-12 px-4 align-middle">Metric</td>
                        <td className="h-12 px-4 align-middle">&gt; 3.0%</td>
                        <td className="h-12 px-4 align-middle">N/A</td>
                        <td className="h-12 px-4 align-middle">Morgan</td>
                      </tr>
                      <tr className="border-b odd:bg-background even:bg-muted/20 hover:bg-muted/40">
                        <td className="h-12 px-4 align-middle">Churn</td>
                        <td className="h-12 px-4 align-middle">Monitoring</td>
                        <td className="h-12 px-4 align-middle">Yes</td>
                        <td className="h-12 px-4 align-middle">Metric</td>
                        <td className="h-12 px-4 align-middle">&lt; 2.0%</td>
                        <td className="h-12 px-4 align-middle">N/A</td>
                        <td className="h-12 px-4 align-middle">Lee</td>
                      </tr>
                      <tr className="odd:bg-background even:bg-muted/20 hover:bg-muted/40">
                        <td className="h-12 px-4 align-middle">Revenue</td>
                        <td className="h-12 px-4 align-middle">Active</td>
                        <td className="h-12 px-4 align-middle">Yes</td>
                        <td className="h-12 px-4 align-middle">Metric</td>
                        <td className="h-12 px-4 align-middle">$100k+</td>
                        <td className="h-12 px-4 align-middle">N/A</td>
                        <td className="h-12 px-4 align-middle">Park</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>0 of 68 row(s) selected.</span>
                  <div className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <Input className="h-8 w-16" defaultValue={10} />
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">Prev</Button>
                      <span>Page 1 of 7</span>
                      <Button variant="ghost" size="sm">Next</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t pt-6 text-sm text-muted-foreground">
            <span>© Shadcraft 2025</span>
            <div className="flex items-center gap-4">
              <a href="#">Docs</a>
              <a href="#">Website</a>
              <a href="#">Support</a>
            </div>
          </footer>
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


