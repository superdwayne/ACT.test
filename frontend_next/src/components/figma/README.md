# Figma-to-Code Components

This directory contains components generated from Figma designs using shadcn/ui and best practices.

## AI Agents Section

A responsive marketing section showcasing AI agent capabilities with a modern design.

### Components

#### `AIAgentsSection`
Main component that includes navigation and agent showcase.

**Features:**
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Built with shadcn/ui components (Button, Card)
- ✅ Proper TypeScript types
- ✅ Accessible navigation
- ✅ Modern design with Tailwind CSS
- ✅ Modular sub-components

**Usage:**
```tsx
import { AIAgentsSection } from "@/components/figma/ai-agents-section";

export default function Page() {
  return <AIAgentsSection />;
}
```

### Sub-components

#### `AgentBadge`
Displays agent name in a pill-shaped badge.

```tsx
<AgentBadge title="Planner" />
```

#### `AgentCard`
Card component for displaying agent information with optional descriptions.

```tsx
<AgentCard
  title="Strategist"
  description="Strategy Playbook"
  align="center"
/>

<AgentCard
  title="Writer"
  descriptions={["Write Debrief", "Write Creative Brief"]}
  align="left"
/>
```

#### `NavigationItem`
Navigation menu item with optional dropdown indicator.

```tsx
<NavigationItem label="AI Tools" hasDropdown />
<NavigationItem label="Check" />
```

### Styling

The component uses:
- **shadcn/ui** design tokens (background, foreground, primary, muted-foreground, border, accent)
- **Tailwind CSS** for responsive design
- **CSS variables** for theming support
- **lucide-react** for icons

### Responsive Breakpoints

- **Mobile** (< 640px): Stacked layout, simplified navigation
- **Tablet** (640px - 1024px): Adjusted spacing
- **Desktop** (> 1024px): Full horizontal layout with center navigation

### Demo

View the component at: `/ai-agents-demo`

### Dependencies

- `@/components/ui/button` - shadcn/ui Button component
- `@/components/ui/card` - shadcn/ui Card component
- `lucide-react` - Icon library
- `@/lib/utils` - cn utility for class merging
