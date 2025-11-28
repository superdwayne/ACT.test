# AI Agent Selection Components

Playful, interactive AI agent selection screen inspired by gamified card designs.

## Components

### `AgentSelectionCard`
Individual agent card with:
- Animated hover effects (scale, lift)
- Color-coded design schemes (blue, green, orange, purple, pink, red)
- Icon-based character representation
- Score display with decorative elements
- Category badge
- Responsive design

### `AgentSelectionScreen`
Full-screen agent selection interface with:
- Gradient purple background
- Responsive grid layout (1-3 columns)
- Selection state management
- Click handlers for agent selection

## Usage

```tsx
import { AgentSelectionScreen } from "@/components/ai-agents";
import type { AgentData } from "@/components/ai-agents";

export default function Page() {
  const handleSelectAgent = (agent: AgentData) => {
    console.log("Selected:", agent);
    // Navigate or update state
  };

  return <AgentSelectionScreen onSelectAgent={handleSelectAgent} />;
}
```

## Agent Data Structure

```typescript
interface AgentData {
  id: string;
  name: string;
  category: string;
  score: number;
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  description: string;
}
```

## Default Agents

1. **Planner** - Account Planning & Budget Management (Blue, Calendar)
2. **Brainstormer** - Ideation & Creative Sessions (Green, Lightbulb)
3. **Strategist** - Strategic Playbook Development (Orange, Target)
4. **Writer** - Creative Briefs & Debriefs (Purple, Pencil)
5. **Analyst** - Data Analysis & Insights (Pink, Brain)
6. **Innovator** - Innovation & Trend Spotting (Red, Sparkles)

## Design Features

- **Playful Aesthetics**: Inspired by game character cards
- **Motion**: Smooth animations using Motion library
- **Accessibility**: Proper contrast ratios and interactive states
- **Responsive**: Mobile-first design with breakpoints
- **Customizable**: Easy to modify colors, icons, and content

## Color Schemes

Each color includes:
- Gradient background
- Card background
- Text color
- Badge color
- Accent gradient

## Demo Page

Visit `/ai-agent-selection` to see the component in action.

## Dependencies

- `motion/react` - Animation library
- `lucide-react` - Icon library
- `@/components/ui/badge` - shadcn/ui Badge
- `@/components/ui/card` - shadcn/ui Card
