'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useMemo, useState } from 'react'

const statuses = ['Draft', 'In review', 'Published'] as const

const shipments = ['Air', 'Ground', 'Ocean']

const KPIS = [
  { label: 'Active products', value: '1,293' },
  { label: 'Submissions this week', value: '27' },
  { label: 'Approval rate', value: '92%' },
]

const variants = [
  { id: 'v1', name: 'Midnight Edition', sku: 'ACT-002', price: '$120', inventory: 88, status: 'Live' },
  { id: 'v2', name: 'Daybreak Edition', sku: 'ACT-003', price: '$110', inventory: 42, status: 'Low stock' },
]

export default function CreateProductPage() {
  const [selectedStatus, setSelectedStatus] = useState<"Draft" | "In review" | "Published">('Draft')
  const [selectedShipment, setSelectedShipment] = useState(shipments[0])
  const kpiSummary = useMemo(() => KPIS, [])

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6 space-y-6">
          <section className="space-y-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">Launch product</h1>
              <p className="text-sm text-slate-400">
                A guided experience to capture all required metadata, pricing, and logistics before the review board greenlights the product.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Badge className="bg-white/5 text-slate-300">Product onboarding</Badge>
              <Badge className="bg-white/5 text-slate-300">Quality gate</Badge>
              <Badge className="bg-white/5 text-slate-300">Shipping plan</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kpiSummary.map((kpi) => (
                <Card key={kpi.label} className="border border-slate-800 bg-slate-900/60">
                  <CardContent>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{kpi.label}</p>
                    <p className="text-2xl font-semibold text-white">{kpi.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
            <Card className="border border-slate-800 bg-slate-900/60">
              <CardHeader className="flex flex-col gap-1 pb-2">
                <CardTitle className="text-lg font-semibold text-white">Product details</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Collect title, description, assortment, and shipping rules.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1">
                  <Label htmlFor="product-title" className="text-xs text-slate-400">
                    Product title
                  </Label>
                  <Input id="product-title" placeholder="Solstice fragrance kit" className="bg-slate-900" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="product-name" className="text-xs text-slate-400">
                    Headline copy
                  </Label>
                  <Textarea id="product-name" rows={3} className="bg-slate-900" placeholder="A cinematic fragrance ritual inspired by late nights in Paris." />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Status</Label>
                    <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as typeof statuses[number])}>
                      <SelectTrigger className="bg-slate-900 text-xs">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Shipment method</Label>
                    <Select value={selectedShipment} onValueChange={(value) => setSelectedShipment(value)}>
                      <SelectTrigger className="bg-slate-900 text-xs">
                        <SelectValue placeholder="Choose method" />
                      </SelectTrigger>
                      <SelectContent>
                        {shipments.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/60">
              <CardHeader className="gap-1 pb-2">
                <CardTitle className="text-lg font-semibold text-white">Launch actions</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Confirm approvals, image assets, and launch date before publication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full text-sm" size="sm">
                  Upload hero assets
                </Button>
                <Button variant="outline" className="w-full text-sm" size="sm">
                  Add review notes
                </Button>
                <p className="text-[11px] text-slate-500">
                  Reviewers will receive notifications after saving. Admins can add comments before the content board meets.
                </p>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="metadata" className="space-y-4">
            <TabsList className="rounded-xl border border-slate-800 bg-slate-900/60 p-1">
              <TabsTrigger value="metadata" className="h-10 px-4 text-sm" >Metadata</TabsTrigger>
              <TabsTrigger value="pricing" className="h-10 px-4 text-sm" >Pricing</TabsTrigger>
              <TabsTrigger value="variants" className="h-10 px-4 text-sm" >Variants</TabsTrigger>
            </TabsList>
            <TabsContent value="metadata">
              <Card className="border border-slate-800 bg-slate-900/60">
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Brand</Label>
                      <Input placeholder="Acme Atelier" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Collection</Label>
                      <Input placeholder="Gilded Autumn" className="bg-slate-900" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Material</Label>
                      <Input placeholder="Glass, leather" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Care</Label>
                      <Input placeholder="Dry clean only" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Origin</Label>
                      <Input placeholder="Made in France" className="bg-slate-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pricing">
              <Card className="border border-slate-800 bg-slate-900/60">
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Retail price</Label>
                      <Input placeholder="$180.00" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Discount price</Label>
                      <Input placeholder="$150.00" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-slate-400">Cost</Label>
                      <Input placeholder="$90.00" className="bg-slate-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="variants">
              <Card className="border border-slate-800 bg-slate-900/60">
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {variants.map((variant) => (
                      <div key={variant.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                        <div className="flex items-center justify-between text-sm text-white">
                          <p className="font-semibold">{variant.name}</p>
                          <Badge className="text-xs">{variant.status}</Badge>
                        </div>
                        <p className="text-xs text-slate-500">SKU {variant.sku}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                          <span>{variant.price}</span>
                          <span>{variant.inventory} units</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
