'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Sparkles } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export default function ObraExamplePage() {
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
              <h2 className="text-xl font-semibold tracking-tight">Obra Light Template</h2>
              <p className="text-sm text-muted-foreground">Clean surfaces, subtle borders, balanced spacing</p>
            </div>
            <Button variant="outline"><Sparkles className="mr-2 size-4" />Do Something</Button>
          </div>

          <Alert className="mb-6">
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              This page mirrors an Obra-style light layout using our shadcn primitives and theme tokens.
            </AlertDescription>
          </Alert>

          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your basic information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Jane" />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us a bit about yourself" className="min-h-28" />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Personalize your experience</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select defaultValue="light" onValueChange={(v) => setTheme(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Notifications</Label>
                      <Toggle aria-label="Toggle notifications">On</Toggle>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Density</span>
                      <span className="font-medium">Comfortable</span>
                    </div>
                    <Slider defaultValue={[60]} max={100} step={10} aria-label="Density" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shortcuts</CardTitle>
                  <CardDescription>Quick entry points</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button variant="outline">Create project</Button>
                  <Button variant="outline">Invite member</Button>
                  <Button>Launch workflow</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}


