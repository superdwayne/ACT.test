'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type IllustrationCardProps = {
  title: string
  description: string
  ctaText?: string
  theme?: 'primary' | 'muted'
}

export function IllustrationCard({ title, description, ctaText = 'Explore guidelines', theme = 'primary' }: IllustrationCardProps) {
  return (
    <Card className={cn('overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 text-slate-100')}>
      <div className="grid grid-cols-2 gap-1">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative h-32 w-full">
            <Image
              src="https://cdn.dribbble.com/userupload/33137741/file/original-57f226f7404452d919df3aa3e7445b84.jpg"
              alt="Brand voice illustration"
              fill
              sizes="(max-width: 1024px) 50vw, 320px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
          </div>
        ))}
      </div>
      <CardContent className="space-y-3 px-5 py-5">
        <CardHeader className="gap-1 p-0">
          <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
          <CardDescription className="text-sm text-slate-400">{description}</CardDescription>
        </CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-slate-500">Inspired by ShadCN</p>
          <Button size="sm" variant={theme === 'primary' ? 'default' : 'outline'}>
            {ctaText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
