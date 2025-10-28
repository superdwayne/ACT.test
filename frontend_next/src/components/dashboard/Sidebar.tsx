import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Bot, LayoutDashboard, MessageSquare, Settings, Shield, Tag, Folder, FileText, Trash2, HelpCircle, Search, Library, ChevronDown, Mail, PlusCircle } from 'lucide-react'

const primary = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lifecycle', label: 'Lifecycle', icon: Folder },
  { href: '/analytics', label: 'Analytics', icon: Shield },
  { href: '/projects', label: 'Projects', icon: FileText },
  { href: '/team', label: 'Team', icon: Bot },
]

const documents = [
  { href: '/docs/beta-library', label: 'Beta library', icon: Library },
  { href: '/docs/reports', label: 'Reports', icon: FileText },
  { href: '/assistant', label: 'Work Assistant', icon: MessageSquare },
  { href: '/trash', label: 'Trash', icon: Trash2 },
  { href: '/help', label: 'Help', icon: HelpCircle },
]

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('hidden md:flex md:w-[260px] md:flex-col border-r bg-card', className)}>
      <div className="px-3 py-2">
        <Link href="/" className="flex items-center gap-1 text-sm font-semibold tracking-tight">
          Acme Inc <ChevronDown className="ml-0.5 size-4 opacity-70" />
        </Link>
      </div>
      <div className="px-2">
        <div className="mb-2 flex items-center gap-2 px-1.5">
          <Link href="#" className="flex h-8 flex-1 items-center gap-2 rounded-md bg-primary px-3 text-sm text-primary-foreground shadow-sm">
            <PlusCircle className="size-4" />
            <span>Quick create</span>
          </Link>
          <Link href="#" className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Mail className="size-4" />
          </Link>
        </div>
      </div>
      <nav className="flex-1 space-y-4 px-2 py-2">
        <div>
          {primary.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} href={item.href} className={cn('group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent')}>
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="pt-2">
          <p className="px-2 pb-1 text-xs text-muted-foreground">Documents</p>
          {documents.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.label} href={item.href} className={cn('group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent')}>
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      <div className="border-t px-2 py-3">
        <div className="space-y-1">
          <Link href="/settings" className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><Settings className="size-4" /> <span>Settings</span></Link>
          <Link href="/help" className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><HelpCircle className="size-4" /> <span>Get help</span></Link>
          <Link href="/search" className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><Search className="size-4" /> <span>Search</span></Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


