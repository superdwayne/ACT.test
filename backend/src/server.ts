import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.post('/api/chat', async (req: Request, res: Response) => {
  const { prompt, system } = req.body as {
    prompt?: string
    system?: string
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server' })
  }

  try {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY!
    })

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt,
      system,
      maxOutputTokens: 512,
      temperature: 0.7
    })

    res.json({ output: result.text })
  } catch (error) {
    console.error('Chat generation error', error)
    res.status(500).json({ error: 'Failed to generate response' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

