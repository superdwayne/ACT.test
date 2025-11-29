# AI Agent Selection Screen - Implementation Guide

## Overview

A playful, gamified AI agent selection interface inspired by character card designs. Features smooth animations, vibrant colors, and an engaging user experience.

## Design Inspiration

The design is inspired by playful game character cards with:
- Bold, uppercase typography
- Vibrant gradient backgrounds
- Rounded corners and soft shadows
- Animated hover states
- Score/stats display
- Category badges
- Icon-based character representation

## Components

### 1. `AgentSelectionCard`
Standard version with clean, modern design.

**Features:**
- Animated hover effects (scale + lift)
- 6 color schemes (blue, green, orange, purple, pink, red)
- Icon-based character display
- Score display with decorative elements
- Category badge
- Responsive design

### 2. `PlayfulAgentCard`
Enhanced version with more playful styling.

**Additional Features:**
- Rotation animation on hover
- Larger card size
- Animated decorative circles
- Corner accents
- Enhanced shadows and borders
- Tabular number display for scores

### 3. `AgentSelectionScreen`
Full-screen container component.

**Features:**
- Purple gradient background
- Responsive grid (1-3 columns)
- Selection state management
- Visual selection indicator (ring)

## File Structure

```
frontend_next/src/
├── components/
│   └── ai-agents/
│       ├── agent-selection-card.tsx      # Standard card component
│       ├── playful-agent-card.tsx        # Enhanced playful version
│       ├── agent-selection-screen.tsx    # Full screen container
│       ├── index.ts                      # Exports
│       └── README.md                     # Component docs
├── app/
│   ├── ai-agent-selection/
│   │   └── page.tsx                      # Basic demo
│   └── ai-agent-selection-demo/
│       └── page.tsx                      # Full demo with both versions
```

## Usage

### Basic Implementation

```tsx
import { AgentSelectionScreen } from "@/components/ai-agents";
import type { AgentData } from "@/components/ai-agents";

export default function Page() {
  const handleSelectAgent = (agent: AgentData) => {
    console.log("Selected:", agent);
    // Add your logic here
  };

  return <AgentSelectionScreen onSelectAgent={handleSelectAgent} />;
}
```

### Custom Implementation with Playful Cards

```tsx
import { PlayfulAgentCard, PlayfulAgentData } from "@/components/ai-agents";

const agents: PlayfulAgentData[] = [
  {
    id: "planner",
    name: "PLANNER",
    category: "STRATEGY",
    score: 4450,
    color: "blue",
    icon: "calendar",
    description: "Account Planning & Budget",
  },
  // ... more agents
];

export default function CustomPage() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {agents.map((agent) => (
        <PlayfulAgentCard
          key={agent.id}
          agent={agent}
          onClick={() => console.log(agent)}
        />
      ))}
    </div>
  );
}
```

## Data Structure

### AgentData Interface

```typescript
interface AgentData {
  id: string;              // Unique identifier
  name: string;            // Display name (uppercase recommended)
  category: string;        // Badge label
  score: number;           // Numeric score/rating
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  description: string;     // Short description
}
```

### PlayfulAgentData Interface

Extends `AgentData` with:
```typescript
interface PlayfulAgentData extends AgentData {
  pattern?: "waves" | "dots" | "stripes" | "blob";  // Future enhancement
}
```

## Default Agents

| Agent | Category | Color | Icon | Description |
|-------|----------|-------|------|-------------|
| Planner | Strategy | Blue | Calendar | Account Planning & Budget |
| Brainstormer | Creative | Green | Lightbulb | Ideation & Creative Sessions |
| Strategist | Strategy | Orange | Target | Strategic Playbook Development |
| Writer | Content | Purple | Pencil | Creative Briefs & Debriefs |
| Analyst | Insights | Pink | Brain | Data Analysis & Insights |
| Innovator | Creative | Red | Sparkles | Innovation & Trend Spotting |

## Color Schemes

Each color includes coordinated:
- Gradient background
- Card background
- Text color
- Badge color
- Border color
- Shadow color

### Available Colors
- **Blue**: Professional, trustworthy
- **Green**: Growth, creativity
- **Orange**: Energy, enthusiasm
- **Purple**: Innovation, luxury
- **Pink**: Empathy, insights
- **Red**: Passion, action

## Icons

Available icons from `lucide-react`:
- `sparkles` - Innovation, magic
- `brain` - Intelligence, analysis
- `lightbulb` - Ideas, creativity
- `target` - Goals, strategy
- `pencil` - Writing, content
- `calendar` - Planning, scheduling

## Animations

### Hover Effects
- **Standard Card**: Scale 1.05, Y-translate -8px
- **Playful Card**: Scale 1.05, Rotate -2deg

### Tap Effects
- **Standard Card**: Scale 0.98
- **Playful Card**: Scale 0.95

### Decorative Elements
- Pulsing circles with staggered delays
- Smooth spring animations
- Duration: 300ms (transitions)

## Customization

### Adding New Colors

```typescript
// In agent-selection-card.tsx or playful-agent-card.tsx
const colorSchemes = {
  // ... existing colors
  teal: {
    bg: "from-teal-400 via-teal-500 to-teal-600",
    card: "bg-teal-50",
    text: "text-teal-700",
    badge: "bg-teal-500",
    border: "border-teal-200",
    shadow: "shadow-teal-200/50",
  },
};
```

### Adding New Icons

```typescript
import { YourIcon } from "lucide-react";

const iconMap = {
  // ... existing icons
  youricon: YourIcon,
};
```

### Modifying Animations

```typescript
<motion.div
  whileHover={{ scale: 1.1, rotate: 5 }}  // Customize values
  transition={{ duration: 0.2, ease: "easeOut" }}
>
```

## Responsive Breakpoints

- **Mobile** (< 768px): 1 column
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 3 columns

## Accessibility

- Proper color contrast ratios
- Keyboard navigation support
- Click/tap targets > 44px
- Screen reader friendly labels
- Focus indicators

## Performance

- Uses CSS transforms for animations (GPU accelerated)
- Lazy loading compatible
- Optimized re-renders with React.memo (if needed)
- Motion library for smooth 60fps animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid support
- Requires CSS Custom Properties
- Motion library compatibility

## Demo Pages

1. **Basic Demo**: `/ai-agent-selection`
   - Simple implementation
   - Standard cards
   - Basic selection handling

2. **Full Demo**: `/ai-agent-selection-demo`
   - Playful cards
   - Reset functionality
   - Enhanced styling
   - Selection indicators

## Integration Examples

### With React Router

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleSelect = (agent: AgentData) => {
  navigate(`/chat/${agent.id}`);
};
```

### With State Management (Zustand)

```tsx
import { useAgentStore } from "@/store/agent-store";

const setSelectedAgent = useAgentStore((state) => state.setAgent);

const handleSelect = (agent: AgentData) => {
  setSelectedAgent(agent);
};
```

### With Next.js App Router

```tsx
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();

const handleSelect = (agent: AgentData) => {
  router.push(`/chat/${agent.id}`);
};
```

## Future Enhancements

- [ ] Pattern overlays (waves, dots, stripes)
- [ ] Sound effects on interaction
- [ ] Agent avatars/illustrations
- [ ] Filtering by category
- [ ] Search functionality
- [ ] Favorite/bookmark agents
- [ ] Agent comparison view
- [ ] Dark mode support
- [ ] Accessibility improvements
- [ ] Loading states
- [ ] Error handling

## Dependencies

- `motion/react` (v12.23.24) - Animation library
- `lucide-react` (v0.548.0) - Icon library
- `@/components/ui/badge` - shadcn/ui Badge component
- `@/components/ui/card` - shadcn/ui Card component
- `@/components/ui/button` - shadcn/ui Button component
- `@/lib/utils` - Utility functions (cn)

## Troubleshooting

### Cards not animating
- Ensure Motion library is installed: `npm install motion`
- Check for conflicting CSS transitions
- Verify `"use client"` directive is present

### Colors not displaying
- Check Tailwind CSS configuration
- Ensure color classes are not purged
- Verify gradient syntax

### Layout issues
- Check container max-width
- Verify grid gap values
- Test responsive breakpoints

## Credits

- Design inspired by playful game character cards
- Built with shadcn/ui components
- Animations powered by Motion
- Icons from Lucide React
