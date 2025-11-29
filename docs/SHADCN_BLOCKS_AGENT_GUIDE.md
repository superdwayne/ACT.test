# Shadcn Blocks AI Agent Selection - Implementation Guide

## Overview

A professional AI agent selection screen built using patterns from [shadcn-ui-blocks](https://github.com/shadcnblocks/shadcn-ui-blocks). Features enterprise-grade design with ratings, trends, and rich feature lists.

## Design Inspiration

Based on shadcn-ui-blocks patterns:
- **Product Cards** - E-commerce style with ratings and reviews
- **Analytics Cards** - Trend indicators and stats
- **Pricing Cards** - Feature lists and CTAs
- **Article Cards** - Rich content with metadata

## Components

### `ShadcnBlocksAgentCard`

Professional card component with enterprise features.

**Key Features:**
- ⭐ Star ratings (1-5 stars)
- 📈 Trend indicators (+/- percentages)
- 📋 Feature lists (bullet points)
- 🏆 Featured badge support
- 📊 Stats display (score + trend)
- ✨ Hover glow effect
- 🎨 Gradient buttons
- 💼 Professional styling

### `ShadcnBlocksSelectionScreen`

Full-featured selection interface with advanced functionality.

**Key Features:**
- 🔍 Search functionality
- 🏷️ Category filtering (tabs)
- 📱 View mode toggle (grid/compact)
- 📊 Stats footer
- 🎯 Selection state management
- 🔔 Floating selection indicator
- 📈 Real-time filtering

## File Structure

```
frontend_next/src/
├── components/
│   └── ai-agents/
│       ├── shadcn-blocks-agent-card.tsx
│       ├── shadcn-blocks-selection-screen.tsx
│       └── index.ts
└── app/
    ├── ai-agents-shadcn-blocks/
    │   └── page.tsx
    └── ai-agents-all-versions/
        └── page.tsx
```

## Usage

### Basic Implementation

```tsx
import { ShadcnBlocksSelectionScreen } from "@/components/ai-agents";

export default function Page() {
  return (
    <ShadcnBlocksSelectionScreen 
      onSelectAgent={(agent) => console.log(agent)} 
    />
  );
}
```

### Custom Card Usage

```tsx
import { ShadcnBlocksAgentCard } from "@/components/ai-agents";

const agent = {
  id: "planner",
  name: "Strategic Planner",
  tagline: "Master of Planning & Budgets",
  description: "Expert in account planning...",
  category: "STRATEGY",
  rating: 4.8,
  reviews: 342,
  score: 4450,
  trend: 15.3,
  color: "blue",
  icon: "calendar",
  features: [
    "Budget optimization",
    "Resource allocation",
    "Timeline tracking"
  ],
  badge: "Most Popular"
};

<ShadcnBlocksAgentCard 
  agent={agent}
  featured={true}
  onClick={() => console.log("Clicked")}
/>
```

## Data Structure

### ShadcnBlocksAgentData Interface

```typescript
interface ShadcnBlocksAgentData {
  id: string;              // Unique identifier
  name: string;            // Agent name
  tagline: string;         // Short tagline
  description: string;     // Detailed description
  category: string;        // Category label
  rating: number;          // Star rating (0-5)
  reviews: number;         // Number of reviews
  score: number;           // Performance score
  trend: number;           // Trend percentage (+/-)
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  features: string[];      // Feature list (3+ items)
  badge?: string;          // Optional featured badge text
}
```

## Default Agents

| Agent | Rating | Reviews | Score | Trend | Features |
|-------|--------|---------|-------|-------|----------|
| Strategic Planner | 4.8 | 342 | 4450 | +15.3% | Budget, Resources, Timeline |
| Creative Brainstormer | 4.9 | 428 | 4650 | +22.7% | Ideation, Innovation, Concepts |
| Business Strategist | 4.7 | 289 | 4320 | +18.5% | Strategy, Analysis, Positioning |
| Content Writer | 4.6 | 512 | 4280 | +12.4% | Briefs, Debriefs, Content |
| Data Analyst | 4.8 | 376 | 4520 | +20.1% | Analysis, Trends, Insights |
| Innovation Catalyst | 4.9 | 445 | 4720 | +25.8% | Forecasting, Innovation, Disruption |

## Features

### Search & Filter
- Real-time search across name and description
- Category filtering with tabs
- No results state

### View Modes
- **Grid**: 3 columns on desktop (larger cards)
- **Compact**: 4 columns on desktop (smaller cards)

### Selection State
- Visual ring indicator on selected card
- Floating bottom notification
- Clear selection button

### Stats Display
Each card shows:
- Star rating (visual stars)
- Review count
- Performance score
- Trend indicator (with +/- and color)

### Feature Lists
- Up to 3 features displayed
- Bullet point style
- Color-coded dots

## Customization

### Add New Agent

```tsx
const newAgent: ShadcnBlocksAgentData = {
  id: "designer",
  name: "UI/UX Designer",
  tagline: "Design Excellence",
  description: "Creates beautiful, user-friendly interfaces",
  category: "CREATIVE",
  rating: 4.9,
  reviews: 256,
  score: 4580,
  trend: 19.2,
  color: "purple",
  icon: "sparkles",
  features: [
    "UI/UX design",
    "Prototyping",
    "User research"
  ],
  badge: "Top Rated"
};
```

### Modify Color Scheme

Edit `colorSchemes` in `shadcn-blocks-agent-card.tsx`:

```typescript
const colorSchemes = {
  teal: {
    gradient: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
    text: "text-teal-700",
    badge: "bg-teal-500",
    border: "border-teal-200",
    hover: "hover:border-teal-400",
    icon: "text-teal-600",
    chart: "#14b8a6",
  },
};
```

### Change Categories

Edit categories array in `shadcn-blocks-selection-screen.tsx`:

```typescript
const categories = ["all", "strategy", "creative", "content", "insights", "technical"];
```

## Responsive Design

### Breakpoints
- **Mobile** (< 768px): 1 column, stacked layout
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 3-4 columns (based on view mode)

### Mobile Optimizations
- Search bar full width
- Tabs scrollable
- Cards stack vertically
- Stats footer 2x2 grid

## Animations

### Card Hover
```typescript
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### Button Hover
- Arrow slides right on hover
- Gradient button with shadow lift

### Glow Effect
- Gradient glow appears on card hover
- Opacity transition from 0 to 0.1

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)
- ✅ Screen reader support
- ✅ Semantic HTML

## Performance

- CSS transforms (GPU accelerated)
- Debounced search (if needed)
- Lazy loading compatible
- Optimized re-renders
- Motion library (60fps)

## Integration Examples

### With Router Navigation

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

<ShadcnBlocksSelectionScreen 
  onSelectAgent={(agent) => router.push(`/chat/${agent.id}`)} 
/>
```

### With State Management

```tsx
import { useAgentStore } from "@/store";

const setAgent = useAgentStore((state) => state.setAgent);

<ShadcnBlocksSelectionScreen 
  onSelectAgent={(agent) => setAgent(agent)} 
/>
```

### With Analytics

```tsx
import { trackEvent } from "@/lib/analytics";

<ShadcnBlocksSelectionScreen 
  onSelectAgent={(agent) => {
    trackEvent("agent_selected", {
      agent_id: agent.id,
      agent_name: agent.name,
      category: agent.category
    });
  }} 
/>
```

## Comparison with Other Versions

### vs Standard Card
- ✅ More features (ratings, trends, lists)
- ✅ Professional appearance
- ✅ Better for enterprise/SaaS
- ❌ More complex data structure

### vs Playful Card
- ✅ More informative
- ✅ Professional styling
- ❌ Less playful/fun
- ❌ No animated decorations

## Demo Pages

1. **Main Demo**: `/ai-agents-shadcn-blocks`
   - Full selection screen
   - Search and filter
   - All features enabled

2. **Comparison**: `/ai-agents-all-versions`
   - Side-by-side comparison
   - Feature table
   - Quick links to all demos

## Best Practices

1. **Use meaningful ratings** - Base on real metrics
2. **Keep features concise** - 3-5 bullet points max
3. **Update trends regularly** - Show real growth data
4. **Optimize images** - Use Next.js Image component
5. **Test responsiveness** - Check all breakpoints
6. **Monitor performance** - Keep animations smooth

## Troubleshooting

### Cards not displaying correctly
- Check data structure matches interface
- Verify all required fields present
- Ensure color values are valid

### Search not working
- Check searchQuery state
- Verify filter logic
- Test with different queries

### Animations laggy
- Reduce number of cards
- Check for conflicting CSS
- Verify Motion library installed

## Future Enhancements

- [ ] Sorting options (rating, score, trend)
- [ ] Advanced filters (rating range, score range)
- [ ] Comparison mode (select multiple)
- [ ] Export/share functionality
- [ ] Agent details modal
- [ ] Bookmark/favorite agents
- [ ] Recent selections history
- [ ] Dark mode support

## Dependencies

- `motion/react` (v12.23.24)
- `lucide-react` (v0.548.0)
- `@/components/ui/*` (shadcn/ui)
- `@/lib/utils` (cn utility)

## Credits

- Design patterns from [shadcn-ui-blocks](https://github.com/shadcnblocks/shadcn-ui-blocks)
- Built with shadcn/ui components
- Animations by Motion
- Icons by Lucide React
