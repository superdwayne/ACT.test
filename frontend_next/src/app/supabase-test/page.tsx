'use client'

import { useState } from 'react'
import { supabase } from '@/src/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function SupabaseTestPage() {
  const [status, setStatus] = useState<string>('idle')
  const [email, setEmail] = useState('test@example.com')
  const brandId = process.env.NEXT_PUBLIC_BRAND_ID || 'acme'

  async function testAnonSignIn() {
    setStatus('Signing in anonymously…')
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) {
      setStatus(`Anon sign-in failed: ${error.message} (is anonymous sign-in enabled?)`)
      return
    }
    setStatus(`Anon sign-in ok. user=${data.user?.id}`)
  }

  async function checkSession() {
    const { data } = await supabase.auth.getSession()
    setStatus(`Session: ${data.session ? 'active' : 'none'}`)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setStatus('Signed out')
  }

  async function createProfileViaBackend() {
    setStatus('Creating profile via backend…')
    try {
      const res = await fetch('http://localhost:4000/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, brand_id: brandId })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed')
      setStatus(`Created: ${json.profile?.id || 'ok'}`)
    } catch (e: any) {
      setStatus(`Backend create failed: ${e.message}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            URL: {process.env.NEXT_PUBLIC_SUPABASE_URL} | BRAND: {brandId}
          </div>
          <div className="flex gap-2">
            <Button onClick={testAnonSignIn}>Anon Sign-In</Button>
            <Button variant="secondary" onClick={checkSession}>Check Session</Button>
            <Button variant="ghost" onClick={signOut}>Sign Out</Button>
          </div>
          <div className="flex items-center gap-2">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@brand.com" />
            <Button onClick={createProfileViaBackend}>Create Profile (backend)</Button>
          </div>
          <div className="text-sm">Status: {status}</div>
        </CardContent>
      </Card>
    </div>
  )
}

