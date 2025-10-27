'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

type PresetKey = 'assistant' | 'strategist' | 'copywriter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

const PRESETS: Record<
  PresetKey,
  { label: string; badge: string; system: string; description: string }
> = {
  assistant: {
    label: 'Creative Assistant',
    badge: 'Default',
    description: 'General purpose brand aware helper',
    system:
      'You are a collaborative creative assistant for a marketing team. Keep responses concise, aligned with brand guidelines, and suggest next steps when it helps.'
  },
  strategist: {
    label: 'Campaign Strategist',
    badge: 'Strategy',
    description: 'High-level marketing strategy recommendations',
    system:
      'You are a senior campaign strategist. Provide structured recommendations, highlight risks, and tie every idea back to measurable outcomes.'
  },
  copywriter: {
    label: 'Copywriter',
    badge: 'Content',
    description: 'Channel-specific copywriting support',
    system:
      'You are a copywriter with a friendly, concise tone. Craft copy that is on-brand, channel appropriate, and includes a clear call to action.'
  }
}

const PROMPT_STARTER = 'Draft a LinkedIn announcement for the new ACT 2.0 AI workflow launch.'

export default function Home() {
  const [prompt, setPrompt] = useState(PROMPT_STARTER)
  const [systemPreset, setSystemPreset] = useState<PresetKey>('assistant')
  const [systemPrompt, setSystemPrompt] = useState(PRESETS.assistant.system)
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const personaLabel = useMemo(() => PRESETS[systemPreset], [systemPreset])

  const handlePresetChange = (value: PresetKey) => {
    setSystemPreset(value)
    setSystemPrompt(PRESETS[value].system)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!prompt.trim()) {
      toast.error('Add a prompt to continue')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, system: systemPrompt })
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? 'Unable to generate content right now')
      }

      const data = (await res.json()) as { output: string }
      setResponse(data.output)
      toast.success('AI response ready')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!response) {
      toast.info('Nothing to copy yet')
      return
    }

    await navigator.clipboard.writeText(response)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-10 py-10">
      <div className="flex flex-col gap-2 text-center">
        <Badge className="mx-auto w-fit" variant="outline">
          Powered by Vercel AI SDK
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          ACT 2.0 Creative Playground
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experiment with presets powered by the Express backend and Vercel AI
          SDK. Update the system instructions or compose your own brief to see
          tailored output instantly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="space-y-3">
            <CardTitle>Compose a prompt</CardTitle>
            <CardDescription>
              Choose a persona, adjust the system prompt, and submit your brief.
            </CardDescription>

            <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
              <div>
                <p className="text-sm font-medium">{personaLabel.label}</p>
                <p className="text-xs text-muted-foreground">
                  {personaLabel.description}
                </p>
              </div>
              <Badge variant="secondary">{personaLabel.badge}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Tabs
                value={systemPreset}
                onValueChange={(value) => handlePresetChange(value as PresetKey)}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="assistant">Assistant</TabsTrigger>
                  <TabsTrigger value="strategist">Strategist</TabsTrigger>
                  <TabsTrigger value="copywriter">Copywriter</TabsTrigger>
                </TabsList>
                <TabsContent value={systemPreset} className="mt-4">
                  <Label htmlFor="system-prompt" className="mb-2 block">
                    System instructions
                  </Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(event) => setSystemPrompt(event.target.value)}
                    className="min-h-32"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Fine-tune how the model responds. These instructions will be
                    sent to the backend Express AI route on each request.
                  </p>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="prompt">Creative brief</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Tell the assistant what to create..."
                  className="min-h-40"
                />
                <p className="text-sm text-muted-foreground">
                  Provide objectives, tone, key points, and any mandatory
                  elements. The more detailed the brief, the better the output.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="size-8 border">
                    <AvatarFallback>4o</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">gpt-4o-mini</p>
                    <p className="text-xs">Streamlined for fast iteration</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline">
                        Advanced
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Output tokens</DropdownMenuLabel>
                      <DropdownMenuItem disabled>Max 512 tokens</DropdownMenuItem>
                      <DropdownMenuItem disabled>Temperature 0.7</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Generating…' : 'Ask the agent'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Output preview</CardTitle>
            <CardDescription>
              Review, copy, or iterate on the generated response.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage ? (
              <Alert variant="destructive">
                <AlertTitle>Request failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}

            <Textarea
              value={response}
              readOnly
              placeholder="Your AI-generated content will appear here."
              className="min-h-[320px]"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCopy}>
              Copy output
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setResponse('')}
            >
              Clear
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
          <CardDescription>
            This starter wires the Next.js client to an Express API using the
            Vercel AI SDK generateText helper.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Feature
            title="Styled UI out of the box"
            description="shadcn/ui components are preconfigured with Tailwind CSS so you can focus on building workflows."
          />
          <Feature
            title="Flexible system prompts"
            description="Switch contexts instantly or tailor the instructions sent alongside each request."
          />
          <Feature
            title="Backend ready for extensions"
            description="Extend the Express server with additional routes, RAG lookups, or third-party integrations."
          />
        </CardContent>
      </Card>
    </div>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-2 rounded-lg border bg-muted/40 p-4">
      <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
