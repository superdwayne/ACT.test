# AI Agents Components

Responsive React components generated from Figma designs using shadcn/ui and Next.js best practices.

## Components

### AIAgentsHeaderV2
Main component that combines navigation and agents section.

```tsx
import { AIAgentsHeaderV2 } from "@/components/figma";

export default function Page() {
  return <AIAgentsHeaderV2 />;
}
```

### AIAgentsNavigation
Responsive navigation bar with dropdown menus using shadcn/ui NavigationMenu.

**Features:**
- Responsive design (mobile/desktop)
- Dropdown menus for "AI Tools" and "Create"
- shadcn/ui Button and NavigationMenu components
- Customizable navigation items

```tsx
import { AIAgentsNavigation } from "@/components/figma";

<AIAgentsNavigation />
```

### AgentCard
Reusable card component for displaying individual AI agents.

**Props:**
- `title` (string, required) - Agent name
- `description` (string, optional) - Single description
- `descriptions` (string[], optional) - Multiple descriptions
- `align` ("left" | "center" | "right", default: "center") - Text alignment
- `className` (string, optional) - Additional CSS classes

```tsx
import { AgentCard } from "@/components/figma";

<AgentCard
  title="Planner"
  description="Account Planning & Budget"
  align="right"
/>

<AgentCard
  title="Writer"
  descriptions={["Write Debrief", "Write Creative Brief"]}
  align="left"
/>
```

### AgentsSection
Complete section displaying AI agents with center illustration.

**Props:**
- `title` (string, default: "AI Agents") - Section heading
- `leftAgents` (Agent[], optional) - Left side agent cards
- `rightAgents` (Agent[], optional) - Right side agent cards
- `centerContent` (ReactNode, optional) - Custom center content
- `className` (string, optional) - Additional CSS classes

```tsx
import { AgentsSection } from "@/components/figma";

// With defaults
<AgentsSection />

// Custom agents
<AgentsSection
  title="Our AI Team"
  leftAgents={[
    { title: "Analyzer", description: "Data Analysis" },
  ]}
  rightAgents={[
    { title: "Designer", description: "Creative Design" },
  ]}
/>

// Custom center content
<AgentsSection
  centerContent={
    <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
  }
/>
```

## TypeScript Types

```typescript
interface AgentCardProps {
  title: string;
  description?: string;
  descriptions?: string[];
  className?: string;
  align?: "left" | "center" | "right";
}

interface Agent {
  title: string;
  description?: string;
  descriptions?: string[];
}

interface AgentsSectionProps {
  className?: string;
  title?: string;
  leftAgents?: Agent[];
  rightAgents?: Agent[];
  centerContent?: React.ReactNode;
}
```

## Demo Pages

- `/ai-agents-demo` - Original version
- `/ai-agents-v2` - Enhanced version with shadcn/ui NavigationMenu

## Styling

All components use:
- **Tailwind CSS** for styling
- **shadcn/ui** design tokens (colors, spacing, typography)
- **Responsive breakpoints** (mobile-first approach)
- **CSS variables** for theming support

## Dependencies

- `@radix-ui/react-navigation-menu` - Navigation menu primitives
- `@radix-ui/react-slot` - Button composition
- `lucide-react` - Icons
- `class-variance-authority` - Variant styling
- `tailwind-merge` - Class merging utility

## Design Tokens

The components use your project's design tokens:
- Colors: `background`, `foreground`, `primary`, `accent`, `muted-foreground`
- Spacing: Tailwind spacing scale
- Typography: Geist font family
- Border radius: `rounded-xl`, `rounded-full`
- Shadows: `shadow-sm`, `shadow-lg`

## Responsive Behavior

### Mobile (< 768px)
- Navigation menu hidden, only logo and CTA buttons visible
- Agent cards stacked vertically
- Center illustration smaller (w-40 h-40)

### Tablet (768px - 1024px)
- Partial navigation visible
- Agent cards begin horizontal layout

### Desktop (≥ 1024px)
- Full navigation menu with dropdowns
- Complete horizontal layout
- Larger center illustration (w-48 h-48)

## Customization Examples

### Custom Navigation Items

Edit the `navigationItems` array in `ai-agents-navigation.tsx`:

```tsx
const navigationItems: NavigationItem[] = [
  {
    title: "Products",
    hasDropdown: true,
    items: [
      { title: "Product 1", href: "/products/1", description: "Description" },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
];
```

### Custom Styling

```tsx
<AgentsSection
  className="bg-gradient-to-b from-blue-50 to-white py-24"
  title="Meet Our AI Team"
/>

<AgentCard
  title="Custom Agent"
  description="Custom description"
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
/>
```

## Best Practices

1. **Server Components by Default**: Navigation and static content are server components
2. **Client Components for Interactivity**: Only interactive parts (navigation menu) use `"use client"`
3. **Type Safety**: Full TypeScript support with exported types
4. **Accessibility**: Semantic HTML and ARIA attributes via Radix UI
5. **Performance**: Optimized bundle size with selective client components

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled for interactive features
