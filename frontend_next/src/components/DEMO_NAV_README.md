# Demo Navigation Component

A sticky navigation bar to easily switch between all demo pages.

## Usage

### Wrap your page with DemoLayout

```tsx
import { DemoLayout } from "@/components/demo-layout";

export default function MyPage() {
  return (
    <DemoLayout>
      {/* Your page content */}
    </DemoLayout>
  );
}
```

### Or use DemoNav directly

```tsx
import { DemoNav } from "@/components/demo-nav";

export default function MyPage() {
  return (
    <>
      <DemoNav />
      {/* Your page content */}
    </>
  );
}
```

## Features

- ✅ **Sticky navigation** - Stays at top while scrolling
- ✅ **Organized dropdowns** - Pages grouped by category
- ✅ **Active page highlighting** - Shows current page
- ✅ **Mobile responsive** - Dropdown select on mobile
- ✅ **Theme toggle** - Built-in dark/light mode switch
- ✅ **Icons** - Visual category indicators

## Page Categories

### Figma Components
- AI Agents Demo
- AI Agents V2
- AI Agents Showcase

### Mainline Template
- Mainline Demo (full landing page)
- Mainline Blocks (individual blocks)

### Square UI
- Square Chat (AI chat interface)

### Other Pages
- Dashboard
- Chat
- Brand Settings
- File Manager

## Customization

### Add New Pages

Edit `/src/components/demo-nav.tsx`:

```tsx
const demoPages = {
  figma: [
    { name: "AI Agents Demo", href: "/ai-agents-demo" },
    { name: "Your New Page", href: "/your-page" }, // Add here
  ],
  // ... other categories
};
```

### Add New Category

```tsx
const demoPages = {
  // ... existing categories
  myCategory: [
    { name: "My Page", href: "/my-page" },
  ],
};

// Then add to the NavigationMenu:
<NavigationMenuItem>
  <NavigationMenuTrigger className="h-9">
    <YourIcon className="mr-2 h-4 w-4" />
    My Category
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[400px] gap-3 p-4">
      {demoPages.myCategory.map((page) => (
        // ... menu items
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>
```

### Change Styling

The nav uses Tailwind classes and shadcn/ui components:

```tsx
// Change background
<nav className="bg-primary/95"> {/* Instead of bg-background/95 */}

// Change height
<div className="h-16"> {/* Instead of h-14 */}

// Remove sticky
<nav className="w-full"> {/* Remove 'sticky top-0' */}
```

## Pages with DemoNav

Currently added to:
- ✅ `/mainline-demo`
- ✅ `/mainline-blocks`
- ✅ `/ai-agents-demo`
- ✅ `/ai-agents-v2`

## Mobile Behavior

On mobile (< 768px):
- Navigation menu collapses to dropdown select
- Theme toggle hidden
- Home link shows icon only

## Desktop Behavior

On desktop (≥ 768px):
- Full navigation menu with dropdowns
- Theme toggle visible
- Home link shows icon + text
