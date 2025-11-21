'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const voiceAttributes = [
  { trait: 'Friendly', description: 'Warm, empathetic, and approachable tone that welcomes conversation.' },
  { trait: 'Professional', description: 'Concise, confident delivery that reinforces trust.' },
  { trait: 'Playful', description: 'Lighthearted touches when appropriate, especially in social copy.' },
]

const vocabulary = {
  approved: ['ACT', 'intentional', 'partner', 'craft'],
  restricted: ['cheap', 'cheaply', 'hate', 'dumb'],
  industry: ['AI-native', 'automations', 'collaborative agents'],
}

const examples = [
  {
    label: 'Friendly / Support',
    good: 'Welcome back! Tell us what you need and we’ll handle the rest.',
    bad: 'You again? Figure it out yourself.',
  },
  {
    label: 'Technical / Documentation',
    good: 'The agent pipeline executes in real time with 99.9% availability.',
    bad: 'Our backend just barely stays alive unless you pray for it.',
  },
]

export default function ToneOfVoicePage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-6 space-y-6">
          <section className="space-y-3">
            <div>
              <h1 className="text-3xl font-semibold">Tone of Voice Guidelines</h1>
              <p className="text-sm text-slate-400">
                Set rules for how your brand sounds — what to say, how to say it, and what to avoid.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Badge className="bg-white/5 text-slate-300">Voice attributes</Badge>
              <Badge className="bg-white/5 text-slate-300">Vocabulary</Badge>
              <Badge className="bg-white/5 text-slate-300">Examples</Badge>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="border border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle>Voice attributes</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Traits to lean into plus communication guideposts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {voiceAttributes.map((attribute) => (
                  <div key={attribute.trait} className="space-y-1">
                    <p className="text-sm font-semibold text-white">{attribute.trait}</p>
                    <p className="text-xs text-slate-400">{attribute.description}</p>
                  </div>
                ))}
                <div className="space-y-1 text-[11px] text-slate-500">
                  <p>Do: keep sentences short, sprinkle the brand name when giving reassurances.</p>
                  <p>Don't: use overly complex jargon unless the audience is technical.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle>Brand vocabulary</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Approved terminology plus words to avoid.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Approved</p>
                  <p className="text-sm text-white">{vocabulary.approved.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Restricted</p>
                  <p className="text-sm text-rose-300">{vocabulary.restricted.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Industry terms</p>
                  <p className="text-sm text-slate-400">{vocabulary.industry.join(', ')}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle>Language support</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Reference for multilingual teams.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-400">
                <p>✅ English (US) primary</p>
                <p>✅ English (UK) target copy standards</p>
                <p>⚠ Spanish copy must be reviewed by regional leads</p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tone examples</h2>
              <Button size="sm" variant="outline">
                Add example
              </Button>
            </div>
            <Tabs defaultValue="good" className="space-y-4">
              <TabsList className="rounded-xl border border-slate-800 bg-slate-900/60 p-1">
                <TabsTrigger value="good" className="h-9 px-4">
                  Good examples
                </TabsTrigger>
                <TabsTrigger value="bad" className="h-9 px-4">
                  Bad examples
                </TabsTrigger>
              </TabsList>
              <TabsContent value="good">
                <div className="grid gap-4 md:grid-cols-2">
                  {examples.map((example) => (
                    <Card key={example.label} className="border border-slate-800 bg-slate-900/60">
                      <CardContent className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-slate-500">{example.label}</p>
                        <p className="text-sm text-emerald-400">{example.good}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bad">
                <div className="grid gap-4 md:grid-cols-2">
                  {examples.map((example) => (
                    <Card key={example.label} className="border border-slate-800 bg-slate-900/60">
                      <CardContent className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-slate-500">{example.label}</p>
                        <p className="text-sm text-rose-400">{example.bad}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}
