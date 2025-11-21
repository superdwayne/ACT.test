'use client'

import { useMemo, useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const categories = ['Apparel', 'Accessories', 'Gadgets', 'Digital', 'Home']
const deliveryOptions = ['Immediate', '3-5 days', '1 week', 'Pre-order']
const defaultTags = ['New', 'Limited', 'Best seller', 'Handmade']

export default function AddProductFormPage() {
  const [status, setStatus] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0])

  const tagSummary = useMemo(() => defaultTags.join(', '), [])

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6 space-y-6">
          <section className="space-y-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-[22px] sm:text-3xl font-semibold">Add product</h1>
              <p className="text-sm text-slate-400">
                Create a new product listing with structured metadata, pricing, and inventory details before pushing it to your storefront.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-400">Draft mode</span>
              <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-400">Inventory tracked</span>
              <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-400">Ready for review</span>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="gap-1 pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Product information</CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    The core details that shoppers will see on the storefront.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="product-name" className="text-sm text-slate-300">
                      Product name
                    </Label>
                    <Input id="product-name" placeholder="Eau de Noir - Midnight perfume" className="bg-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="product-description" className="text-sm text-slate-300">
                      Description
                    </Label>
                    <Textarea id="product-description" rows={4} className="bg-slate-900" placeholder="Describe what makes this product special..." />
                    <p className="text-xs text-slate-500">Use bullet points to highlight materials, sizing, and delivery time.</p>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="category" className="text-sm text-slate-300">
                        Category
                      </Label>
                      <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger id="category" className="bg-slate-900 text-xs">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="delivery" className="text-sm text-slate-300">
                        Delivery window
                      </Label>
                      <Select value={selectedDelivery} onValueChange={(value) => setSelectedDelivery(value)}>
                        <SelectTrigger id="delivery" className="bg-slate-900 text-xs">
                          <SelectValue placeholder="Select delivery" />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="tags" className="text-sm text-slate-300">
                        Tags & highlights
                      </Label>
                      <Input id="tags" placeholder={tagSummary} className="bg-slate-900" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <Label className="text-sm text-slate-300">Published</Label>
                        <p className="text-xs text-slate-500">Toggle to publish immediately</p>
                      </div>
                      <Toggle pressed={status} onPressedChange={setStatus} className="h-7 w-[70px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="gap-1 pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Pricing & availability</CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Set price, compare-at price, and cost information for this SKU.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <Label htmlFor="price" className="text-sm text-slate-300">
                        Price
                      </Label>
                      <Input id="price" placeholder="$120.00" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="compare" className="text-sm text-slate-300">
                        Compare-at
                      </Label>
                      <Input id="compare" placeholder="$140.00" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cost" className="text-sm text-slate-300">
                        Cost per item
                      </Label>
                      <Input id="cost" placeholder="$60.00" className="bg-slate-900" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="sku" className="text-sm text-slate-300">
                      SKU / Barcode
                    </Label>
                    <Input id="sku" placeholder="SKU-4321" className="bg-slate-900" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="gap-1 pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Inventory & shipping</CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Store quantity, weight, and shipping profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="quantity" className="text-sm text-slate-300">
                      Quantity
                    </Label>
                    <Input id="quantity" placeholder="240" className="bg-slate-900" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="weight" className="text-sm text-slate-300">
                        Weight (lbs)
                      </Label>
                      <Input id="weight" placeholder="1.2" className="bg-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="dimensions" className="text-sm text-slate-300">
                        Dimensions (L × W × H)
                      </Label>
                      <Input id="dimensions" placeholder="12 × 4 × 10" className="bg-slate-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="gap-1 pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Assets & imagery</CardTitle>
                  <CardDescription className="text-xs text-slate-400">Upload hero visuals or attach PDFs for product guides.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-center text-sm text-slate-400">
                    Drop files here or browse
                    <div className="mt-2 text-xs text-slate-500">SVG, PNG, JPG, MP4 · up to 100MB</div>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-500">
                    <p>Uploaded assets will appear in the media library for future use.</p>
                    <p>Reorder images in the gallery to highlight the hero creative.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                  <span>Publishing workflow</span>
                  <span>{status ? 'Live' : 'Draft'}</span>
                </div>
                <p className="text-[12px] text-slate-500">
                  Save your progress to create a publishing checklist. Reviewers will see the latest note when approving the listing.
                </p>
                <Button variant="ghost" className="text-slate-100 hover:text-white" size="sm">
                  Add reviewer note
                </Button>
              </div>
              <Button className="w-full" size="lg">
                Save product
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
