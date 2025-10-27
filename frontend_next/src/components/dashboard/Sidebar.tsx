import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Bot, LayoutDashboard, MessageSquare, Settings, Shield, Tag } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/brands', label: 'Brands', icon: Tag },
  { href: '/admin', label: 'Admin', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('hidden md:flex md:w-64 md:flex-col border-r bg-card', className)}>
      <div className="px-4 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          ACT 2.0
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
     
    </aside>
  )
}

export default Sidebar


