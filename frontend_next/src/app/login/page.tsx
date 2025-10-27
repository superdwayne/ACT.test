'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      // TODO: hook up to real auth endpoint (Supabase/NextAuth/etc.)
      await new Promise((r) => setTimeout(r, 600))
      // redirect placeholder
      window.location.href = '/dashboard'
    } catch (err) {
      setError('Unable to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <aside className="hidden md:flex flex-col justify-between border-r bg-card p-8">
        <div>
          

        </div>
        <img src="https://iqyffnahgizvrwkpdcxk.supabase.co/storage/v1/object/public/brand-logos/0.08844084661176699.png" alt="ACT 2.0"  />
        
        <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} ACT. All rights reserved.</p>
      </aside>

      <main className="flex items-center justify-center px-6 py-10">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Access your ACT 2.0 dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">Forgot your password?</Link>
            </div>
            <div className="mt-6 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="text-primary hover:underline">Create one</Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}


