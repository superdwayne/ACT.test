import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex flex-1 items-center justify-center gap-2 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search projects, brands, agents..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[380px] max-w-[90vw]">
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>Latest updates from your agents and posts</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-3">
              {[
                { id: 'n1', title: 'Workflow completed', detail: 'Social campaign auto-posted', time: '2m ago' },
                { id: 'n2', title: 'New comment', detail: 'Client replied on brief', time: '18m ago' },
                { id: 'n3', title: 'Agent alert', detail: 'High token usage detected', time: '1h ago' }
              ].map((n) => (
                <div key={n.id} className="rounded-lg border bg-muted/40 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{n.detail}</p>
                </div>
              ))}
              <div className="pt-2">
                <Button className="w-full" variant="outline">View all</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Avatar className="size-8 border">
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header


