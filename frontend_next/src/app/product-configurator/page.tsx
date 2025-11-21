'use client'

import * as React from "react"
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight, Search, InfoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Type definitions
interface ColorOption {
  id: string
  sku: string
  name: string
  color: string
  priceModifier: string
}

interface AccessoryOption {
  id: string
  name: string
  description: string
  image: string
}

interface ProductImage {
  id: string
  url: string
  alt: string
}

const colorOptions: ColorOption[] = [
  { id: "1", sku: "R502", name: "Królewski błękit", color: "#1E3A8A", priceModifier: "+0 zł z VAT" },
  { id: "2", sku: "R502", name: "Czarny", color: "#000000", priceModifier: "+0 zł z VAT" },
  { id: "3", sku: "R502", name: "Czerwony", color: "#DC2626", priceModifier: "+0 zł z VAT" },
  { id: "4", sku: "R502", name: "Pomarańczowy", color: "#EA580C", priceModifier: "+0 zł z VAT" },
  { id: "5", sku: "R502", name: "Szary", color: "#9CA3AF", priceModifier: "+0 zł z VAT" },
  { id: "6", sku: "R502", name: "Granatowy", color: "#1E40AF", priceModifier: "+0 zł z VAT" },
  { id: "7", sku: "R502", name: "Bordowy", color: "#7F1D1D", priceModifier: "+0 zł z VAT" },
  { id: "8", sku: "R502", name: "Ciemnozielony", color: "#14532D", priceModifier: "+0 zł z VAT" },
  { id: "9", sku: "R502", name: "Brązowy", color: "#78350F", priceModifier: "+0 zł z VAT" },
]

const accessories: AccessoryOption[] = [
  { id: "standard", name: "Standardowy tłok", description: "siedzisko 50-61 cm", image: "/piston-standard.png" },
  { id: "low", name: "Niski tłok", description: "siedzisko 47-56 cm", image: "/piston-low.png" },
]

const productImages: ProductImage[] = [
  { id: "1", url: "/chair-main.png", alt: "SpinaliS APOLLO - widok główny" },
  { id: "2", url: "/chair-side.png", alt: "SpinaliS APOLLO - widok boczny" },
  { id: "3", url: "/chair-back.png", alt: "SpinaliS APOLLO - widok z tyłu" },
  { id: "4", url: "/chair-detail.png", alt: "SpinaliS APOLLO - szczegóły" },
]

export default function ProductConfigurator() {
  const [selectedColor, setSelectedColor] = React.useState<string>(colorOptions[0].id)
  const [selectedAccessory, setSelectedAccessory] = React.useState<string>(accessories[0].id)
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0)
  const [selectedTab, setSelectedTab] = React.useState<string>("renna")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-[1400px] px-6 lg:px-8 py-8">
          <Card className="overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-slate-950 p-8">
                <nav className="mb-6 text-xs uppercase tracking-wide text-slate-500 flex gap-2">
                  <span className="text-slate-400 hover:text-white cursor-pointer">Strona główna</span>
                  <span>·</span>
                  <span className="text-slate-400 hover:text-white cursor-pointer">Krzesła SpinaliS</span>
                  <span>·</span>
                  <span className="text-slate-100">SpinaliS APOLLO</span>
                </nav>

                <h1 className="text-[36px] font-bold mb-8">SpinaliS APOLLO</h1>

                <div className="relative aspect-square mb-6 bg-slate-900 rounded-2xl overflow-hidden">
                  <img
                    src={productImages[currentImageIndex].url}
                    alt={productImages[currentImageIndex].alt}
                    className="w-full h-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/70 text-slate-100 hover:bg-slate-900"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/70 text-slate-100 hover:bg-slate-900"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex gap-4 justify-center">
                  {productImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-[90px] h-[90px] border-2 rounded-lg overflow-hidden transition-all",
                        currentImageIndex === index
                          ? "border-slate-100"
                          : "border-slate-700 hover:border-slate-500"
                      )}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-8 border-l border-slate-900">
                <h2 className="text-[28px] font-bold mb-6">Tapicerka</h2>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
                  <TabsList className="grid grid-cols-4 h-auto bg-slate-900 border border-slate-800 rounded-2xl p-1">
                    {['renna','renna-plus','dynamica','dynamica-plus'].map((tab) => (
                      <TabsTrigger key={tab} value={tab} className="text-xs font-semibold">
                        {tab.replace('-', ' ')}
                        <InfoIcon className="ml-2 h-4 w-4 text-slate-500" />
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value={selectedTab} className="mt-8">
                    <div className="grid grid-cols-3 gap-6">
                      {colorOptions.map((option) => (
                        <button
                          type="button"
                          key={option.id}
                          onClick={() => setSelectedColor(option.id)}
                          className={cn(
                            "flex flex-col items-center space-y-3 focus:outline-none",
                            selectedColor === option.id
                              ? "ring-4 ring-emerald-500"
                              : "hover:ring-2 hover:ring-slate-600"
                          )}
                        >
                          <Badge variant="secondary" className="text-[10px]">
                            {option.sku}
                          </Badge>
                          <div
                            className={cn(
                              "relative flex items-center justify-center w-[72px] h-[72px] rounded-full border-4",
                              selectedColor === option.id ? "border-slate-200" : "border-slate-700"
                            )}
                            style={{ backgroundColor: option.color }}
                          >
                            <Search className="h-4 w-4 text-white opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-white">{option.name}</p>
                            <p className="text-[11px] text-slate-500">{option.priceModifier}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <Button variant="link" className="mt-4 text-orange-500 hover:text-orange-400">
                      Zobacz pozostałe tapicerki
                    </Button>
                  </TabsContent>
                </Tabs>

                <div className="my-8 h-px bg-slate-800" />

                <div>
                  <h3 className="text-[24px] font-bold mb-6">Akcesoria</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {accessories.map((accessory) => (
                      <label
                        key={accessory.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                          selectedAccessory === accessory.id
                            ? "border-slate-100 bg-slate-900"
                            : "border-slate-800 hover:border-slate-600"
                        )}
                      >
                        <input
                          type="radio"
                          name="accessory"
                          value={accessory.id}
                          checked={selectedAccessory === accessory.id}
                          onChange={() => setSelectedAccessory(accessory.id)}
                          className="sr-only"
                        />
                        <img
                          src={accessory.image}
                          alt={accessory.name}
                          className="w-[48px] h-[48px] object-contain"
                        />
                        <div>
                          <p className="font-medium text-sm text-white">{accessory.name}</p>
                          <p className="text-[11px] text-slate-400">{accessory.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="my-8 h-px bg-slate-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500 mb-1">Cena końcowa</p>
                    <p className="text-[32px] font-bold text-emerald-400">3 870,81 zł</p>
                    <p className="text-[11px] text-slate-500">z VAT</p>
                  </div>
                  <Button size="lg" className="rounded-full px-10 py-3 text-[16px] border border-emerald-500 bg-emerald-500/20 text-white hover:bg-emerald-500">
                    Dodaj do koszyka
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
