import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const system = typeof body?.system === 'string' && body.system.trim().length > 0
      ? body.system
      : 'You are a helpful brand-aware assistant. Keep responses concise and actionable.'

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system,
      messages,
      temperature: 0.7
    })

    return result.toTextStreamResponse()
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Chat route failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}


