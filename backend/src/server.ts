import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import multer from 'multer'
import { randomUUID } from 'crypto'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
// Import pdf-parse (CommonJS module exports PDFParse class)
const { PDFParse } = require('pdf-parse')
import { supabase } from './supabase'
import { extractBrandGuidelinesFromText } from './brandExtraction'

const app = express()
const port = process.env.PORT || 4000
const upload = multer({ storage: multer.memoryStorage() })
const guidelinesBucket = 'brand-guidelines'

type UploadGuidelinesRequest = Request & {
  file?: Express.Multer.File
}

app.use(cors())
app.use(express.json())

app.use((req, _res, next) => {
  console.log(`[request] ${req.method} ${req.url}`)
  next()
})

function mask(value: string, keepStart = 4, keepEnd = 4) {
  if (!value) return ''
  const start = value.slice(0, keepStart)
  const end = value.slice(-keepEnd)
  const mid = Math.max(0, value.length - keepStart - keepEnd)
  return `${start}${'*'.repeat(mid)}${end}`
}

function hostFromUrl(u?: string) {
  try {
    return u ? new URL(u).host : ''
  } catch {
    return ''
  }
}

function jwtRole(token?: string): string | null {
  try {
    if (!token) return null
    const part = token.split('.')[1]
    if (!part) return null
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4
    const str = Buffer.from(pad ? b64 + '='.repeat(4 - pad) : b64, 'base64').toString('utf8')
    const payload = JSON.parse(str)
    return payload.role || payload.user_role || null
  } catch {
    return null
  }
}

const supabaseUrlHost = hostFromUrl(process.env.SUPABASE_URL)
const svcRoleKeyMasked = process.env.SUPABASE_SERVICE_ROLE_KEY ? mask(process.env.SUPABASE_SERVICE_ROLE_KEY) : 'missing'
const svcRoleType = jwtRole(process.env.SUPABASE_SERVICE_ROLE_KEY) || 'unknown'
console.log(`[Supabase] url_host=${supabaseUrlHost || 'missing'} service_key=${svcRoleKeyMasked} role=${svcRoleType}`)

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

// Simple Supabase health check: list profiles for a brand
app.get('/api/profiles', async (req: Request, res: Response) => {
  try {
    const brandId = (req.query.brand_id as string) || 'acme'
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase env vars are missing on the server' })
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('brand_id', brandId)
      .limit(10)

    if (error) {
      return res.status(500).json({ error: error.message })
    }
    res.json({ profiles: data })
  } catch (err) {
    console.error('Supabase fetch error', err)
    res.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

// Create a profile row (demo only)
app.post('/api/profiles', async (req: Request, res: Response) => {
  try {
    const { email, brand_id } = req.body as { email?: string; brand_id?: string }
    if (!email || !brand_id) {
      return res.status(400).json({ error: 'email and brand_id are required' })
    }
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase env vars are missing on the server' })
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({ email, brand_id })
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }
    res.status(201).json({ profile: data })
  } catch (err) {
    console.error('Supabase insert error', err)
    res.status(500).json({ error: 'Failed to create profile' })
  }
})

app.post('/api/upload-guidelines', upload.single('file'), async (req: UploadGuidelinesRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required' })
  }

  try {
    const fileName = `${randomUUID()}-${req.file.originalname}`
    const filePath = `uploads/${fileName}`

    const { error } = await supabase.storage
      .from(guidelinesBucket)
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      })

    if (error) {
      throw error
    }

    const { data } = supabase.storage.from(guidelinesBucket).getPublicUrl(filePath)
    return res.json({ url: data.publicUrl })
  } catch (error) {
    console.error('Upload guidelines error', error)
    return res.status(500).json({ error: 'Failed to upload PDF' })
  }
})

app.post('/api/extract-guidelines', upload.single('file'), async (req: UploadGuidelinesRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required for extraction' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server' })
  }

  const brandName = (req.body.brandName as string) || 'Uploaded Brand'

  try {
    const parser = new PDFParse({ data: req.file.buffer })
    const result = await parser.getText()
    await parser.destroy()
    const normalizedText = (result.text ?? '').trim()
    if (!normalizedText) {
      return res.status(400).json({ error: 'Unable to read text from PDF' })
    }

    const extraction = await extractBrandGuidelinesFromText(normalizedText, brandName)
    
    // Optionally save to brand settings if brandId is provided
    const brandId = (req.body.brandId as string) || null
    if (brandId) {
      try {
        // Save each setting type separately
        const settingTypes = [
          { type: 'voice_tone', data: extraction.voice_and_tone },
          { type: 'visual_identity', data: extraction.visual_identity },
          { type: 'social_media', data: extraction.social_media },
          { type: 'messaging', data: extraction.messaging },
          { type: 'guidelines', data: extraction.guidelines },
        ]

        for (const { type, data } of settingTypes) {
          // Deactivate existing active setting
          await supabase
            .from('brand_settings')
            .update({ is_active: false })
            .eq('brand_id', brandId)
            .eq('setting_type', type)
            .eq('is_active', true)

          // Insert new active setting
          await supabase.from('brand_settings').insert({
            brand_id: brandId,
            setting_type: type,
            setting_data: data,
            confidence_score: data.confidence_score,
            is_active: true,
          })
        }
      } catch (saveError) {
        console.error('Error saving to brand settings:', saveError)
        // Don't fail the extraction if save fails
      }
    }

    return res.json(extraction)
  } catch (error) {
    console.error('Extraction error', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Error stack:', error.stack)
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error)
    } else {
      errorMessage = String(error)
    }
    return res.status(500).json({ error: `Failed to extract guidelines: ${errorMessage}` })
  }
})

// Get brand settings
app.get('/api/brand-settings/:brandId', async (req: Request, res: Response) => {
  const { brandId } = req.params

  try {
    const { data, error } = await supabase
      .from('brand_settings')
      .select('*')
      .eq('brand_id', brandId)
      .eq('is_active', true)
      .order('setting_type')

    if (error) throw error

    // Group by setting type
    const settings = data.reduce((acc: any, setting: any) => {
      acc[setting.setting_type] = {
        id: setting.id,
        data: setting.setting_data,
        confidence_score: setting.confidence_score,
        updated_at: setting.updated_at,
      }
      return acc
    }, {})

    return res.json({ brand_id: brandId, settings })
  } catch (error) {
    console.error('Error fetching brand settings:', error)
    return res.status(500).json({ error: 'Failed to fetch brand settings' })
  }
})

// Update a specific brand setting
app.put('/api/brand-settings/:brandId/:settingType', async (req: Request, res: Response) => {
  const { brandId, settingType } = req.params
  const { setting_data, confidence_score } = req.body

  if (!setting_data) {
    return res.status(400).json({ error: 'setting_data is required' })
  }

  try {
    // Find the active setting
    const { data: existing, error: findError } = await supabase
      .from('brand_settings')
      .select('id, confidence_score')
      .eq('brand_id', brandId)
      .eq('setting_type', settingType)
      .eq('is_active', true)
      .single()

    if (findError && findError.code !== 'PGRST116') {
      throw findError
    }

    if (existing) {
      // Update existing setting
      const { data, error } = await supabase
        .from('brand_settings')
        .update({
          setting_data,
          confidence_score: confidence_score ?? existing.confidence_score,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) throw error
      return res.json(data)
    } else {
      // Create new setting
      const { data, error } = await supabase
        .from('brand_settings')
        .insert({
          brand_id: brandId,
          setting_type: settingType,
          setting_data,
          confidence_score: confidence_score ?? null,
          is_active: true,
        })
        .select()
        .single()

      if (error) throw error
      return res.json(data)
    }
  } catch (error) {
    console.error('Error updating brand setting:', error)
    return res.status(500).json({ error: 'Failed to update brand setting' })
  }
})

// Save all extracted settings at once
app.post('/api/brand-settings/:brandId/save-extraction', async (req: Request, res: Response) => {
  const { brandId } = req.params
  const { extraction } = req.body

  if (!extraction) {
    return res.status(400).json({ error: 'extraction data is required' })
  }

  try {
    const settingTypes = [
      { type: 'voice_tone', data: extraction.voice_and_tone },
      { type: 'visual_identity', data: extraction.visual_identity },
      { type: 'social_media', data: extraction.social_media },
      { type: 'messaging', data: extraction.messaging },
      { type: 'guidelines', data: extraction.guidelines },
    ]

    const results = []

    for (const { type, data } of settingTypes) {
      // Deactivate existing active setting
      await supabase
        .from('brand_settings')
        .update({ is_active: false })
        .eq('brand_id', brandId)
        .eq('setting_type', type)
        .eq('is_active', true)

      // Insert new active setting
      const { data: inserted, error } = await supabase
        .from('brand_settings')
        .insert({
          brand_id: brandId,
          setting_type: type,
          setting_data: data,
          confidence_score: data.confidence_score,
          is_active: true,
        })
        .select()
        .single()

      if (error) throw error
      results.push(inserted)
    }

    return res.json({ success: true, saved: results.length, settings: results })
  } catch (error) {
    console.error('Error saving extraction to brand settings:', error)
    return res.status(500).json({ error: 'Failed to save brand settings' })
  }
})

// Extract brand identity from uploaded document
app.post('/api/extract-brand', upload.single('file'), async (req: UploadGuidelinesRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    console.log(`[extract-brand] Processing file: ${req.file.originalname}`)

    let extractedText = ''

    // Extract text from PDF
    if (req.file.mimetype === 'application/pdf') {
      try {
        const pdfParser = new PDFParse()
        const pdfData = await pdfParser.parse(req.file.buffer)
        extractedText = pdfData.text
        console.log(`[extract-brand] Extracted ${extractedText.length} characters from PDF`)
      } catch (error) {
        console.error('[extract-brand] PDF parsing error:', error)
        return res.status(500).json({ error: 'Failed to parse PDF' })
      }
    } else if (req.file.mimetype.startsWith('image/')) {
      // For images, use OpenAI Vision to extract text/brand elements
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })

      try {
        const base64Image = req.file.buffer.toString('base64')
        const result = await generateText({
          model: openai('gpt-4o'),
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this brand document/image and extract all brand identity elements including colors (with hex codes), typography (font families), logos, and brand tone. Provide detailed information.',
                },
                {
                  type: 'image',
                  image: `data:${req.file.mimetype};base64,${base64Image}`,
                },
              ],
            },
          ],
        })
        extractedText = result.text
        console.log(`[extract-brand] Extracted brand info from image`)
      } catch (error) {
        console.error('[extract-brand] Vision API error:', error)
        return res.status(500).json({ error: 'Failed to analyze image' })
      }
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Please upload PDF or image.' })
    }

    // Use AI to structure the brand data
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const structuredResult = await generateText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `You are a brand identity expert. Extract and structure brand information into a JSON format with the following structure:
{
  "theme": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "accentColor": "#hex",
    "backgroundColor": "#hex",
    "textColor": "#hex"
  },
  "typography": {
    "fontFamily": "font name",
    "headingFont": "heading font name",
    "fontSize": {
      "base": "16px",
      "heading": "32px"
    }
  },
  "logo": {
    "url": "logo url if available",
    "width": 200,
    "height": 60
  },
  "tone": "brand tone description"
}

Only include fields that you can confidently extract. Use null for missing values.`,
        },
        {
          role: 'user',
          content: `Extract brand identity from this content:\n\n${extractedText}`,
        },
      ],
    })

    // Parse the AI response as JSON
    let brandData
    try {
      // Try to extract JSON from the response
      const jsonMatch = structuredResult.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        brandData = JSON.parse(jsonMatch[0])
      } else {
        brandData = JSON.parse(structuredResult.text)
      }
    } catch (error) {
      console.error('[extract-brand] JSON parsing error:', error)
      // Return a basic structure if parsing fails
      brandData = {
        theme: {
          primaryColor: '#FF6B35',
          secondaryColor: '#004E89',
          accentColor: '#F77F00',
        },
        typography: {
          fontFamily: 'Inter',
          headingFont: 'Poppins',
        },
        extractedText: extractedText.substring(0, 500), // Include some raw text for debugging
      }
    }

    console.log(`[extract-brand] Successfully extracted brand data`)
    return res.json({ success: true, brandData })
  } catch (error) {
    console.error('[extract-brand] Error:', error)
    return res.status(500).json({ error: 'Failed to extract brand identity' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
