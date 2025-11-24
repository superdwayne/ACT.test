'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { supabase } from '@/lib/supabase-client'

const tileSrc =
  'https://kota-content.b-cdn.net/app/uploads/2024/04/tone-of-voice-1.png'

const backendUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const extractEndpoint = backendUrl ? `${backendUrl}/api/extract-guidelines` : '/api/extract-guidelines'

type ExtractionStage = 
  | 'idle'
  | 'uploading'
  | 'extracting_voice'
  | 'extracting_visual'
  | 'extracting_social'
  | 'extracting_messaging'
  | 'extracting_guidelines'
  | 'success'
  | 'error'

const STAGE_LABELS: Record<ExtractionStage, string> = {
  idle: 'Upload PDF',
  uploading: 'Uploading PDF...',
  extracting_voice: 'Extracting voice & tone...',
  extracting_visual: 'Extracting visual identity...',
  extracting_social: 'Extracting social media...',
  extracting_messaging: 'Extracting messaging...',
  extracting_guidelines: 'Extracting guidelines...',
  success: 'Upload PDF',
  error: 'Upload PDF',
}

export default function BrandVisualsPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<ExtractionStage>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [brandName, setBrandName] = useState('Test Brand')
  const [brandId, setBrandId] = useState('')
  const [extractionResult, setExtractionResult] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [imagePrompt, setImagePrompt] = useState('A minimalist ACT brand illustration with bold colors')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(event.target.files?.[0] ?? null)
    setUploadUrl(null)
    setErrorMessage(null)
    setStatus('idle')
  }

  const handleUpload = async () => {
    if (!pdfFile) {
      setErrorMessage('Select a PDF before uploading.')
      return
    }

    setStatus('uploading')
    setErrorMessage(null)

    // Progress simulation - update stages based on estimated time
    const progressInterval = setInterval(() => {
      setStatus((current) => {
        if (current === 'uploading') return 'extracting_voice'
        if (current === 'extracting_voice') return 'extracting_visual'
        if (current === 'extracting_visual') return 'extracting_social'
        if (current === 'extracting_social') return 'extracting_messaging'
        if (current === 'extracting_messaging') return 'extracting_guidelines'
        return current
      })
    }, 3000) // Update every 3 seconds

    try {
      const formData = new FormData()
      formData.append('file', pdfFile)
      formData.append('brandName', brandName)
      if (brandId) {
        formData.append('brandId', brandId)
      }

      const response = await fetch(extractEndpoint, {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        // Try to get error message from response
        let errorMsg = `Upload failed (${response.status})`
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMsg = errorData.error
          }
        } catch {
          // If response is not JSON, use status text
          errorMsg = `Upload failed: ${response.statusText}`
        }
        throw new Error(errorMsg)
      }

      const result = await response.json()
      console.log('[handleUpload] Extraction result:', result)
      console.log('[handleUpload] Result keys:', Object.keys(result || {}))
      setExtractionResult(result)
      setStatus('success')
      setErrorMessage(null)
    } catch (error) {
      clearInterval(progressInterval)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      setImageError('Enter a prompt before generating an image.')
      return
    }

    setImageLoading(true)
    setImageError(null)
    setGeneratedImageUrl(null)

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt: imagePrompt,
          size: '1024x1024',
        },
      })

      if (error) {
        throw error
      }

      const payload = data as { imageUrl?: string; imageBase64?: string }

      if (payload?.imageUrl) {
        setGeneratedImageUrl(payload.imageUrl)
      } else if (payload?.imageBase64) {
        setGeneratedImageUrl(`data:image/png;base64,${payload.imageBase64}`)
      } else {
        setImageError('No image returned from generate-image function.')
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[generate-image] error', err)
      if (err instanceof Error) {
        setImageError(err.message)
      } else {
        setImageError('Failed to generate image.')
      }
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-6xl px-6 lg:px-8 py-10 space-y-8">
          <section className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Brand visuals</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Pair the atmospheric mood board with a quick brief so every feature release inherits the same tone.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative h-[520px] overflow-hidden border border-slate-800 bg-slate-900 rounded-none">
              <Image
                src={tileSrc}
                alt="Brand mosaic"
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
            </div>

            <div className="space-y-6">
              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Upload brand guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-[11px] text-slate-400">Brand Name</label>
                    <Input
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g., ACT"
                      className="bg-slate-900 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Brand ID (for saving settings)</label>
                    <Input
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                      placeholder="e.g., act, acme (optional)"
                      className="bg-slate-900 mt-1"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Optional: Provide a brand ID to automatically save extracted settings.</p>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="mt-1 block w-full text-sm text-slate-100 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-1 file:text-[11px] file:text-slate-800"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Upload a brand guidelines PDF to extract settings.</p>
                  </div>
                  {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
                  {saveMessage && (
                    <p className={`text-xs ${saveMessage.includes('success') ? 'text-emerald-300' : 'text-destructive'}`}>
                      {saveMessage}
                    </p>
                  )}
                  {extractionResult && (
                    <div className="space-y-2 text-xs text-emerald-300">
                      <p>Extraction complete: <strong>{(extractionResult.extraction_metadata.average_confidence * 100).toFixed(1)}% avg confidence</strong></p>
                      <p>Voice: {
                        (() => {
                          const voice = extractionResult.voice_and_tone?.primary_voice
                          if (!voice || voice.toLowerCase().includes('unknown') || voice === '<UNKNOWN>') {
                            return extractionResult.voice_and_tone?.writing_style || 'Not found'
                          }
                          return voice
                        })()
                      }</p>
                      <p>Primary colors: {extractionResult.visual_identity?.color_palette?.primary_colors?.length || 0}</p>
                      <div className="flex gap-2 mt-2">
                        {!brandId && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={async () => {
                              const id = prompt('Enter Brand ID to save settings:')
                              if (!id) return
                              
                              setSaving(true)
                              setSaveMessage(null)
                              try {
                                const response = await fetch(`${backendUrl}/api/brand-settings/${id}/save-extraction`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ extraction: extractionResult }),
                                })
                                
                                if (!response.ok) throw new Error('Failed to save')
                                setSaveMessage('Successfully saved to brand settings!')
                                setBrandId(id)
                              } catch (error) {
                                setSaveMessage('Failed to save settings')
                              } finally {
                                setSaving(false)
                              }
                            }}
                            disabled={saving}
                          >
                            {saving ? 'Saving...' : 'Save Settings'}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.location.href = `/brand-settings?brandId=${brandId || extractionResult.brand_name.toLowerCase()}`}
                        >
                          View Settings
                        </Button>
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleUpload}
                    disabled={!pdfFile || (status !== 'idle' && status !== 'error' && status !== 'success')}
                  >
                    {STAGE_LABELS[status]}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Record the brief</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-[11px] text-slate-400">Campaign focus</label>
                    <Input placeholder="e.g., Aurora Release" className="bg-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Visual direction</label>
                    <Textarea rows={3} placeholder="Describe the gradients, lighting, and mood." className="bg-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Tone keywords</label>
                    <Input placeholder="Premium, cinematic, nocturnal" className="bg-slate-900" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Uploaded files</span>
                    <Button variant="outline" size="sm">
                      Attach file
                    </Button>
                  </div>
                  <Button className="w-full" size="lg">
                    Save visual brief
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-800 bg-slate-900/60 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white">Generate brand visual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-[11px] text-slate-400">Image prompt</label>
                    <Textarea
                      rows={3}
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe the gradients, lighting, and mood for the generated visual."
                      className="bg-slate-900 mt-1"
                    />
                  </div>
                  {imageError && <p className="text-xs text-destructive">{imageError}</p>}
                  {generatedImageUrl && (
                    <div className="mt-2 flex flex-col gap-2">
                      <p className="text-[11px] text-slate-400">Preview</p>
                      <div className="relative w-full aspect-square overflow-hidden rounded border border-slate-800 bg-slate-900">
                        {/* Using a standard img tag to avoid Next image domain configuration issues for dynamic URLs */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={generatedImageUrl}
                          alt="Generated brand visual"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleGenerateImage}
                    disabled={imageLoading}
                  >
                    {imageLoading ? 'Generating image...' : 'Generate image'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {extractionResult ? (
            <section className="space-y-4">
              <Card className="border border-emerald-500/40 bg-emerald-500/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-emerald-300">Extraction Summary</CardTitle>
                    <Badge variant="outline" className="text-emerald-300 border-emerald-500/50">
                      {extractionResult?.extraction_metadata?.average_confidence 
                        ? `${(extractionResult.extraction_metadata.average_confidence * 100).toFixed(0)}% Confidence`
                        : 'Processing...'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-100">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Brand Name</p>
                      <p className="font-semibold">{extractionResult.brand_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Extraction Date</p>
                      <p>{new Date(extractionResult.extraction_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Primary Voice</p>
                      <p className="font-semibold">{
                        (() => {
                          const voice = extractionResult.voice_and_tone?.primary_voice
                          if (!voice || voice.toLowerCase().includes('unknown') || voice === '<UNKNOWN>') {
                            return extractionResult.voice_and_tone?.writing_style || 'Not found'
                          }
                          return voice
                        })()
                      }</p>
                    </div>
                  </div>

                  <Accordion type="multiple" className="w-full">
                    {/* Voice & Tone */}
                    <AccordionItem value="voice" className="border-slate-700">
                      <AccordionTrigger className="text-slate-200 hover:text-emerald-300">
                        Voice & Tone
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {extractionResult.voice_and_tone?.confidence_score ? 
                            `${(extractionResult.voice_and_tone.confidence_score * 100).toFixed(0)}%` : '—'}
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        {extractionResult.voice_and_tone?.voice_description && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Description</p>
                            <p>{extractionResult.voice_and_tone.voice_description}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Tone Attributes</p>
                          <div className="flex flex-wrap gap-1">
                            {extractionResult.voice_and_tone?.tone_attributes?.map((attr: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">{attr}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Writing Style</p>
                          <p>{extractionResult.voice_and_tone?.writing_style}</p>
                        </div>
                        {extractionResult.voice_and_tone?.communication_approach && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Communication Approach</p>
                            <p>{extractionResult.voice_and_tone.communication_approach}</p>
                          </div>
                        )}
                        {extractionResult.voice_and_tone?.example_phrases && extractionResult.voice_and_tone.example_phrases.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Example Phrases</p>
                            <ul className="list-disc list-inside space-y-1">
                              {extractionResult.voice_and_tone.example_phrases.map((phrase: string, i: number) => (
                                <li key={i} className="text-slate-300">"{phrase}"</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.voice_and_tone?.vocabulary_preferences && extractionResult.voice_and_tone.vocabulary_preferences.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Vocabulary Preferences</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.voice_and_tone.vocabulary_preferences.map((word: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs text-emerald-300">{word}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.voice_and_tone?.forbidden_words && extractionResult.voice_and_tone.forbidden_words.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Forbidden Words</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.voice_and_tone.forbidden_words.map((word: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs text-red-400">{word}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.voice_and_tone?.tone_examples && extractionResult.voice_and_tone.tone_examples.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Tone Examples</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.voice_and_tone.tone_examples.map((example: string, i: number) => (
                                <li key={i} className="text-slate-300">{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Visual Identity */}
                    <AccordionItem value="visual" className="border-slate-700">
                      <AccordionTrigger className="text-slate-200 hover:text-emerald-300">
                        Visual Identity
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {extractionResult.visual_identity?.confidence_score ? 
                            `${(extractionResult.visual_identity.confidence_score * 100).toFixed(0)}%` : '—'}
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        {/* Colors */}
                        <div>
                          <p className="text-xs text-slate-400 mb-2 font-semibold">Color Palette</p>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Primary Colors</p>
                              <div className="space-y-2">
                                {extractionResult.visual_identity?.color_palette?.primary_colors?.map((color: any, i: number) => (
                                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded">
                                    <div 
                                      className="w-8 h-8 rounded border border-slate-600" 
                                      style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium">{color.name}</p>
                                      <p className="text-xs text-slate-400">{color.hex} {color.rgb && `• RGB: ${color.rgb}`}</p>
                                      {color.usage && <p className="text-xs text-slate-500 mt-0.5">{color.usage}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {extractionResult.visual_identity?.color_palette?.secondary_colors && 
                             extractionResult.visual_identity.color_palette.secondary_colors.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Secondary Colors</p>
                                <div className="space-y-2">
                                  {extractionResult.visual_identity.color_palette.secondary_colors.map((color: any, i: number) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded">
                                      <div 
                                        className="w-8 h-8 rounded border border-slate-600" 
                                        style={{ backgroundColor: color.hex }}
                                      />
                                      <div className="flex-1">
                                        <p className="font-medium">{color.name}</p>
                                        <p className="text-xs text-slate-400">{color.hex} {color.rgb && `• RGB: ${color.rgb}`}</p>
                                        {color.usage && <p className="text-xs text-slate-500 mt-0.5">{color.usage}</p>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Typography */}
                        <div>
                          <p className="text-xs text-slate-400 mb-2 font-semibold">Typography</p>
                          <div className="space-y-2">
                            {extractionResult.visual_identity?.typography?.primary_font && (
                              <div className="p-2 bg-slate-800/50 rounded">
                                <p className="font-medium">Primary: {extractionResult.visual_identity.typography.primary_font.family}</p>
                                <p className="text-xs text-slate-400">
                                  Weights: {extractionResult.visual_identity.typography.primary_font.weights?.join(', ')}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  {extractionResult.visual_identity.typography.primary_font.usage_context}
                                </p>
                              </div>
                            )}
                            {extractionResult.visual_identity?.typography?.secondary_fonts && extractionResult.visual_identity.typography.secondary_fonts.length > 0 && (
                              <div className="space-y-2">
                                {extractionResult.visual_identity.typography.secondary_fonts.map((font: any, i: number) => (
                                  <div key={i} className="p-2 bg-slate-800/50 rounded">
                                    <p className="font-medium">Secondary: {font.family}</p>
                                    {font.weights && font.weights.length > 0 && (
                                      <p className="text-xs text-slate-400">Weights: {font.weights.join(', ')}</p>
                                    )}
                                    <p className="text-xs text-slate-500 mt-1">{font.usage_context}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {extractionResult.visual_identity?.typography?.typography_hierarchy && (
                              <div className="p-2 bg-slate-800/50 rounded">
                                <p className="text-xs text-slate-400 mb-1">Typography Hierarchy</p>
                                <p className="text-xs text-slate-300">{extractionResult.visual_identity.typography.typography_hierarchy}</p>
                              </div>
                            )}
                            {extractionResult.visual_identity?.typography?.typography_rules && extractionResult.visual_identity.typography.typography_rules.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Typography Rules</p>
                                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                                  {extractionResult.visual_identity.typography.typography_rules.map((rule: string, i: number) => (
                                    <li key={i}>{rule}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Imagery Style */}
                        {extractionResult.visual_identity?.imagery_style && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Imagery Style</p>
                            <div className="space-y-2">
                              {extractionResult.visual_identity.imagery_style.photography_guidelines && (
                                <div className="p-2 bg-slate-800/50 rounded">
                                  <p className="text-xs text-slate-400 mb-1">Photography Guidelines</p>
                                  <p className="text-xs text-slate-300">{extractionResult.visual_identity.imagery_style.photography_guidelines}</p>
                                </div>
                              )}
                              {extractionResult.visual_identity.imagery_style.illustration_style && (
                                <div className="p-2 bg-slate-800/50 rounded">
                                  <p className="text-xs text-slate-400 mb-1">Illustration Style</p>
                                  <p className="text-xs text-slate-300">{extractionResult.visual_identity.imagery_style.illustration_style}</p>
                                </div>
                              )}
                              {extractionResult.visual_identity.imagery_style.image_treatments && extractionResult.visual_identity.imagery_style.image_treatments.length > 0 && (
                                <div>
                                  <p className="text-xs text-slate-500 mb-1">Image Treatments</p>
                                  <div className="flex flex-wrap gap-1">
                                    {extractionResult.visual_identity.imagery_style.image_treatments.map((treatment: string, i: number) => (
                                      <Badge key={i} variant="outline" className="text-xs">{treatment}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Color Combinations */}
                        {extractionResult.visual_identity?.color_palette?.color_combinations && extractionResult.visual_identity.color_palette.color_combinations.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Color Combinations</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.visual_identity.color_palette.color_combinations.map((combo: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{combo}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Layout Guidelines */}
                        {extractionResult.visual_identity?.layout_guidelines && extractionResult.visual_identity.layout_guidelines.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Layout Guidelines</p>
                            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                              {extractionResult.visual_identity.layout_guidelines.map((guideline: string, i: number) => (
                                <li key={i}>{guideline}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Logo Guidelines */}
                        {extractionResult.visual_identity?.logo && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Logo Guidelines</p>
                            {extractionResult.visual_identity.logo.description && (
                              <p className="text-xs text-slate-300 mb-2">{extractionResult.visual_identity.logo.description}</p>
                            )}
                            {extractionResult.visual_identity.logo.placement_rules && 
                             extractionResult.visual_identity.logo.placement_rules.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Placement Rules</p>
                                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                                  {extractionResult.visual_identity.logo.placement_rules.map((rule: string, i: number) => (
                                    <li key={i}>{rule}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Messaging */}
                    <AccordionItem value="messaging" className="border-slate-700">
                      <AccordionTrigger className="text-slate-200 hover:text-emerald-300">
                        Messaging
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {extractionResult.messaging?.confidence_score ? 
                            `${(extractionResult.messaging.confidence_score * 100).toFixed(0)}%` : '—'}
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        {extractionResult.messaging?.brand_story && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Brand Story</p>
                            <p>{extractionResult.messaging.brand_story}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.brand_mission && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Mission</p>
                            <p>{extractionResult.messaging.brand_mission}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.core_values && extractionResult.messaging.core_values.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Core Values</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.messaging.core_values.map((value: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{value}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.messaging?.key_messages && extractionResult.messaging.key_messages.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Key Messages</p>
                            <ul className="list-disc list-inside space-y-1">
                              {extractionResult.messaging.key_messages.map((msg: string, i: number) => (
                                <li key={i} className="text-slate-300">{msg}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.messaging?.taglines && extractionResult.messaging.taglines.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Taglines</p>
                            <div className="space-y-1">
                              {extractionResult.messaging.taglines.map((tagline: string, i: number) => (
                                <p key={i} className="text-emerald-300 font-medium">"{tagline}"</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.messaging?.value_propositions && extractionResult.messaging.value_propositions.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Value Propositions</p>
                            <ul className="list-disc list-inside space-y-1">
                              {extractionResult.messaging.value_propositions.map((prop: string, i: number) => (
                                <li key={i} className="text-slate-300">{prop}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.messaging?.elevator_pitch && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Elevator Pitch</p>
                            <p className="text-slate-300 italic">{extractionResult.messaging.elevator_pitch}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.brand_positioning && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Brand Positioning</p>
                            <p className="text-slate-300">{extractionResult.messaging.brand_positioning}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.target_audience && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Target Audience</p>
                            <p className="text-slate-300">{extractionResult.messaging.target_audience}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.messaging_tone && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Messaging Tone</p>
                            <p className="text-slate-300">{extractionResult.messaging.messaging_tone}</p>
                          </div>
                        )}
                        {extractionResult.messaging?.brand_vision && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Vision</p>
                            <p className="text-slate-300">{extractionResult.messaging.brand_vision}</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Social Media */}
                    <AccordionItem value="social" className="border-slate-700">
                      <AccordionTrigger className="text-slate-200 hover:text-emerald-300">
                        Social Media
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {extractionResult.social_media?.confidence_score ? 
                            `${(extractionResult.social_media.confidence_score * 100).toFixed(0)}%` : '—'}
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        {extractionResult.social_media?.platform_guidelines && 
                         Object.keys(extractionResult.social_media.platform_guidelines).length > 0 && (
                          <div className="space-y-3">
                            {Object.entries(extractionResult.social_media.platform_guidelines).map(([platform, guidelines]: [string, any]) => (
                              <div key={platform} className="p-3 bg-slate-800/50 rounded">
                                <p className="font-semibold mb-2">{platform}</p>
                                {guidelines.tone_adjustments && (
                                  <p className="text-xs text-slate-400 mb-1">Tone: {guidelines.tone_adjustments}</p>
                                )}
                                {guidelines.content_types && guidelines.content_types.length > 0 && (
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Content Types</p>
                                    <div className="flex flex-wrap gap-1">
                                      {guidelines.content_types.map((type: string, i: number) => (
                                        <Badge key={i} variant="outline" className="text-xs">{type}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {guidelines.hashtag_strategy && (
                                  <p className="text-xs text-slate-400 mt-2">Hashtag Strategy: {guidelines.hashtag_strategy}</p>
                                )}
                                {guidelines.visual_specs && (
                                  <div className="mt-2 text-xs text-slate-500">
                                    {guidelines.visual_specs.image_dimensions && (
                                      <p>Image: {guidelines.visual_specs.image_dimensions}</p>
                                    )}
                                    {guidelines.visual_specs.video_specs && (
                                      <p>Video: {guidelines.visual_specs.video_specs}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {extractionResult.social_media?.content_pillars && extractionResult.social_media.content_pillars.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Content Pillars</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.social_media.content_pillars.map((pillar: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{pillar}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.social_media?.engagement_rules && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Engagement Rules</p>
                            <p className="text-slate-300">{extractionResult.social_media.engagement_rules}</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Guidelines */}
                    <AccordionItem value="guidelines" className="border-slate-700">
                      <AccordionTrigger className="text-slate-200 hover:text-emerald-300">
                        Guidelines
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {extractionResult.guidelines?.confidence_score ? 
                            `${(extractionResult.guidelines.confidence_score * 100).toFixed(0)}%` : '—'}
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        {extractionResult.guidelines?.dos && extractionResult.guidelines.dos.length > 0 && (
                          <div>
                            <p className="text-xs text-emerald-400 mb-2 font-semibold">✓ Do's</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.guidelines.dos.map((doItem: string, i: number) => (
                                <li key={i} className="text-slate-300">{doItem}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.guidelines?.donts && extractionResult.guidelines.donts.length > 0 && (
                          <div>
                            <p className="text-xs text-red-400 mb-2 font-semibold">✗ Don'ts</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.guidelines.donts.map((dont: string, i: number) => (
                                <li key={i} className="text-slate-300">{dont}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.guidelines?.brand_personality && extractionResult.guidelines.brand_personality.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Brand Personality</p>
                            <div className="flex flex-wrap gap-1">
                              {extractionResult.guidelines.brand_personality.map((trait: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{trait}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {extractionResult.guidelines?.usage_rules && extractionResult.guidelines.usage_rules.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Usage Rules</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.guidelines.usage_rules.map((rule: string, i: number) => (
                                <li key={i} className="text-slate-300">{rule}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.guidelines?.quality_standards && extractionResult.guidelines.quality_standards.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Quality Standards</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.guidelines.quality_standards.map((standard: string, i: number) => (
                                <li key={i} className="text-slate-300">{standard}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {extractionResult.guidelines?.consistency_requirements && extractionResult.guidelines.consistency_requirements.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-400 mb-2 font-semibold">Consistency Requirements</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              {extractionResult.guidelines.consistency_requirements.map((req: string, i: number) => (
                                <li key={i} className="text-slate-300">{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>
          ) : (
            <section className="space-y-4">
              <Card className="border border-slate-800">
                <CardContent className="py-8 text-center text-slate-400">
                  <p>No extraction results yet. Upload a PDF to extract brand guidelines.</p>
                </CardContent>
              </Card>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
