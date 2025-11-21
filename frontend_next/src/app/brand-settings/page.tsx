'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

const backendUrl = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '')

function BrandSettingsContent() {
  const searchParams = useSearchParams()
  const [brandId, setBrandId] = useState('')
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<any>(null)

  const loadSettings = useCallback(async () => {
    if (!brandId) return
    
    setLoading(true)
    try {
      const url = `${backendUrl}/api/brand-settings/${brandId}`
      console.log('[loadSettings] Fetching from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `Failed to load settings (${response.status})`
        
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch {
          errorMessage = `${errorMessage}: ${errorText}`
        }
        
        if (response.status === 404) {
          console.log('[loadSettings] No settings found (404), setting empty object')
          setSettings({})
          return
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      console.log('[loadSettings] Settings loaded:', data)
      setSettings(data.settings || {})
    } catch (error) {
      console.error('[loadSettings] Error loading settings:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to load settings: ${errorMessage}\n\nMake sure:\n1. Backend server is running on ${backendUrl || 'http://localhost:4000'}\n2. NEXT_PUBLIC_API_URL is set in .env.local`)
      setSettings(null)
    } finally {
      setLoading(false)
    }
  }, [brandId, backendUrl])

  // Load brandId from URL params
  useEffect(() => {
    const id = searchParams.get('brandId')
    if (id) {
      setBrandId(id)
    }
  }, [searchParams])

  // Load settings when brandId changes
  useEffect(() => {
    if (brandId) {
      loadSettings()
    }
  }, [brandId, loadSettings])

  const updateSetting = async (settingType: string, fieldPath: string[], value: any) => {
    if (!brandId || !settings?.[settingType]) return

    setSaving(settingType)
    try {
      // Deep clone and update
      const updatedData = JSON.parse(JSON.stringify(settings[settingType].data))
      let current = updatedData
      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!current[fieldPath[i]]) current[fieldPath[i]] = {}
        current = current[fieldPath[i]]
      }
      current[fieldPath[fieldPath.length - 1]] = value

      const response = await fetch(`${backendUrl}/api/brand-settings/${brandId}/${settingType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setting_data: updatedData,
          confidence_score: settings[settingType].confidence_score,
        }),
      })

      if (!response.ok) throw new Error('Failed to update')
      
      const updated = await response.json()
      setSettings((prev: any) => ({
        ...prev,
        [settingType]: {
          ...prev[settingType],
          data: updated.setting_data,
        },
      }))
      setEditingField(null)
    } catch (error) {
      console.error('Error updating setting:', error)
      alert('Failed to update setting')
    } finally {
      setSaving(null)
    }
  }

  const startEdit = (settingType: string, fieldPath: string[], currentValue: any) => {
    setEditingField(`${settingType}.${fieldPath.join('.')}`)
    setEditValue(typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue, null, 2))
  }

  const cancelEdit = () => {
    setEditingField(null)
    setEditValue(null)
  }

  const saveEdit = (settingType: string, fieldPath: string[]) => {
    let value: any = editValue
    try {
      // Try to parse as JSON if it looks like JSON
      if (editValue.trim().startsWith('[') || editValue.trim().startsWith('{')) {
        value = JSON.parse(editValue)
      }
    } catch {
      // If not valid JSON, use as string
    }
    updateSetting(settingType, fieldPath, value)
  }

  const renderEditableField = (
    settingType: string,
    fieldPath: string[],
    label: string,
    value: any,
    type: 'string' | 'array' | 'object' = 'string'
  ) => {
    const fieldKey = `${settingType}.${fieldPath.join('.')}`
    const isEditing = editingField === fieldKey

    if (isEditing) {
      return (
        <div className="space-y-2">
          <label className="text-xs text-slate-400">{label}</label>
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="bg-slate-900 text-sm"
            rows={type === 'array' || type === 'object' ? 4 : 2}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => saveEdit(settingType, fieldPath)} disabled={saving === settingType}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-slate-400 mb-1">{label}</p>
            {type === 'array' && Array.isArray(value) ? (
              <div className="flex flex-wrap gap-1">
                {value.map((item, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            ) : type === 'object' ? (
              <pre className="text-xs text-slate-300 bg-slate-900 p-2 rounded overflow-auto">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-slate-200">{value || '—'}</p>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => startEdit(settingType, fieldPath, value)}
          >
            Edit
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto max-w-6xl px-6 lg:px-8 py-10 space-y-8">
          <section className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Brand Settings</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              View and edit brand settings extracted from guidelines. Each setting can be manually updated.
            </p>
          </section>

          <Card className="border border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Load Brand Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  placeholder="Enter Brand ID (e.g., act, acme)"
                  className="bg-slate-900"
                  onKeyDown={(e) => e.key === 'Enter' && loadSettings()}
                />
                <Button onClick={loadSettings} disabled={!brandId || loading}>
                  {loading ? 'Loading...' : 'Load Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {settings && (
            <div className="space-y-4">
              <Accordion type="multiple" className="w-full">
                {/* Voice & Tone */}
                {settings.voice_tone && (
                  <AccordionItem value="voice" className="border-slate-700">
                    <AccordionTrigger className="text-slate-200">
                      Voice & Tone
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {settings.voice_tone.confidence_score ? 
                          `${(settings.voice_tone.confidence_score * 100).toFixed(0)}%` : '—'}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      {renderEditableField('voice_tone', ['primary_voice'], 'Primary Voice', settings.voice_tone.data.primary_voice)}
                      {renderEditableField('voice_tone', ['writing_style'], 'Writing Style', settings.voice_tone.data.writing_style)}
                      {renderEditableField('voice_tone', ['tone_attributes'], 'Tone Attributes', settings.voice_tone.data.tone_attributes, 'array')}
                      {renderEditableField('voice_tone', ['example_phrases'], 'Example Phrases', settings.voice_tone.data.example_phrases, 'array')}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Visual Identity */}
                {settings.visual_identity && (
                  <AccordionItem value="visual" className="border-slate-700">
                    <AccordionTrigger className="text-slate-200">
                      Visual Identity
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {settings.visual_identity.confidence_score ? 
                          `${(settings.visual_identity.confidence_score * 100).toFixed(0)}%` : '—'}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-2 font-semibold">Primary Colors</p>
                        {settings.visual_identity.data.color_palette?.primary_colors?.map((color: any, i: number) => (
                          <div key={i} className="mb-2 p-2 bg-slate-800/50 rounded">
                            {renderEditableField('visual_identity', ['color_palette', 'primary_colors', i.toString(), 'name'], 'Name', color.name)}
                            {renderEditableField('visual_identity', ['color_palette', 'primary_colors', i.toString(), 'hex'], 'Hex', color.hex)}
                            {renderEditableField('visual_identity', ['color_palette', 'primary_colors', i.toString(), 'usage'], 'Usage', color.usage)}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Messaging */}
                {settings.messaging && (
                  <AccordionItem value="messaging" className="border-slate-700">
                    <AccordionTrigger className="text-slate-200">
                      Messaging
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {settings.messaging.confidence_score ? 
                          `${(settings.messaging.confidence_score * 100).toFixed(0)}%` : '—'}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      {renderEditableField('messaging', ['brand_story'], 'Brand Story', settings.messaging.data.brand_story)}
                      {renderEditableField('messaging', ['key_messages'], 'Key Messages', settings.messaging.data.key_messages, 'array')}
                      {renderEditableField('messaging', ['taglines'], 'Taglines', settings.messaging.data.taglines, 'array')}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          )}

          {settings && Object.keys(settings).length === 0 && (
            <Card className="border border-slate-800">
              <CardContent className="py-8 text-center text-slate-400">
                No settings found for this brand. Extract guidelines first.
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

export default function BrandSettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-slate-950 text-slate-100">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="container mx-auto max-w-6xl px-6 lg:px-8 py-10">
            <div className="text-center text-slate-400">Loading...</div>
          </main>
        </div>
      </div>
    }>
      <BrandSettingsContent />
    </Suspense>
  )
}

