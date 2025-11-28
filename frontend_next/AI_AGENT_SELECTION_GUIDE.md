# AI Agent Selection Screen - Shadcn Blocks Implementation

This guide documents the AI agent selection screens built using shadcn/ui blocks design patterns.

## 🎨 Design Philosophy

The implementation follows shadcn blocks design principles:
- **Modern & Professional**: Clean, enterprise-ready design
- **Feature-Rich**: Star ratings, trends, stats, and detailed information
- **Responsive**: Mobile-first approach with responsive layouts
- **Accessible**: Built on Radix UI primitives for accessibility
- **Customizable**: Easy to theme and extend

## 📁 Project Structure

```
frontend_next/
├── src/
│   ├── app/
│   │   ├── ai-agents-selection-v2/      # Full-featured selection page
│   │   │   └── page.tsx
│   │   └── ai-agents-showcase-v2/       # Complete showcase with all features
│   │       └── page.tsx
│   └── components/
│       └── ai-agents/
│           ├── shadcn-blocks-agent-card.tsx      # Main agent card component
│           ├── agent-hero-section.tsx            # Hero section with stats
│           ├── agent-grid-section.tsx            # Grid layout for agents
│           ├── agent-comparison-table.tsx        # Table comparison view
│           └── index.ts                          # Exports
```

## 🧩 Components

### 1. ShadcnBlocksAgentCard

The main card component for displaying AI agents with rich features.

**Features:**
- ⭐ Star ratings with review counts
- 📈 Trend indicators (positive/negative)
- 🎯 Score display with icons
- 🏷️ Category badges
- ✨ Feature lists (up to 3 shown)
- 🎨 Color-coded by category
- 🎭 Hover animations and glow effects
- 🏆 Featured badge support

**Usage:**
```tsx
import { ShadcnBlocksAgentCard } from "@/components/ai-agents";

<ShadcnBlocksAgentCard
  agent={{
    id: "strategic-planner",
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
  }}
  onClick={() => console.log("Selected")}
  featured={true}
/>
```

### 2. AgentHeroSection

Hero section with animated stats and call-to-action.

**Features:**
- 🎯 Gradient background with patterns
- 📊 Animated stat cards
- 🎨 Customizable title and subtitle
- 🔘 CTA buttons
- ✨ Motion animations

**Usage:**
```tsx
import { AgentHeroSection } from "@/components/ai-agents";

<AgentHeroSection 
  title="Choose Your AI Agent"
  subtitle="Select from our curated collection..."
  stats={{
    agents: 6,
    rating: 4.7,
    reviews: 2000,
    growth: 18
  }}
  onGetStarted={() => console.log("Get started")}
/>
```

### 3. AgentGridSection

Grid layout for displaying multiple agents with animations.

**Features:**
- 📱 Responsive grid (1-3 columns)
- ✨ Staggered animations
- 🎨 Customizable title/description
- 🔄 Reusable component

**Usage:**
```tsx
import { AgentGridSection } from "@/components/ai-agents";

<AgentGridSection 
  agents={agentsArray}
  onSelectAgent={(agent) => console.log(agent)}
  title="Featured AI Agents"
  description="Discover our most popular agents"
/>
```

### 4. AgentComparisonTable

Table view for comparing agents side-by-side.

**Features:**
- 📊 Sortable columns
- ⭐ Visual ratings
- 📈 Trend indicators
- ✅ Feature comparison
- 📱 Responsive overflow

**Usage:**
```tsx
import { AgentComparisonTable } from "@/components/ai-agents";

<AgentComparisonTable agents={agentsArray} />
```

## 🎯 Complete Pages

### 1. AI Agents Selection V2 (`/ai-agents-selection-v2`)

Full-featured selection page with:
- 🔍 Search functionality
- 🎛️ Category filtering
- 📊 Sort options (popular, rating, trending, score)
- 👁️ Grid/List view toggle
- 📊 Stats dashboard
- 🎨 Feature highlights
- 📞 CTA section

### 2. AI Agents Showcase V2 (`/ai-agents-showcase-v2`)

Complete showcase with all components:
- 🎯 Hero section with stats
- 🌟 Feature cards
- 👁️ Grid/Table view toggle
- 📋 How it works section
- 📞 CTA section
- ✨ Full animations

## 🎨 Color Schemes

The cards support 6 color schemes:
- `blue` - Strategy & Planning
- `green` - Analytics & Data
- `orange` - Content & Creative
- `purple` - Innovation & Design
- `pink` - Automation & Process
- `red` - Marketing & Growth

## 🎭 Icons

Supported icons (from Lucide):
- `sparkles` - Automation/Magic
- `brain` - Analytics/Intelligence
- `lightbulb` - Ideas/Innovation
- `target` - Goals/Strategy
- `pencil` - Content/Writing
- `calendar` - Planning/Scheduling

## 📊 Data Structure

```typescript
interface ShadcnBlocksAgentData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  rating: number;          // 0-5
  reviews: number;
  score: number;
  trend: number;           // Percentage (can be negative)
  color: "blue" | "green" | "orange" | "purple" | "pink" | "red";
  icon: "sparkles" | "brain" | "lightbulb" | "target" | "pencil" | "calendar";
  features: string[];      // Array of feature descriptions
  badge?: string;          // Optional badge text (e.g., "Most Popular")
}
```

## 🚀 Getting Started

1. **Navigate to a demo page:**
   ```bash
   # Development server should be running
   npm run dev
   
   # Visit:
   http://localhost:3000/ai-agents-selection-v2
   # or
   http://localhost:3000/ai-agents-showcase-v2
   ```

2. **Use components in your own pages:**
   ```tsx
   import { 
     ShadcnBlocksAgentCard,
     AgentHeroSection,
     AgentGridSection,
     AgentComparisonTable,
     type ShadcnBlocksAgentData 
   } from "@/components/ai-agents";
   ```

3. **Customize the data:**
   - Modify the `agents` array in the page files
   - Add your own agent data
   - Adjust colors, icons, and features

## 🎨 Customization

### Changing Colors

Edit the `colorSchemes` object in `shadcn-blocks-agent-card.tsx`:

```tsx
const colorSchemes = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    // ... more properties
  },
  // Add your own color scheme
};
```

### Adding New Icons

1. Import from Lucide:
   ```tsx
   import { YourIcon } from "lucide-react";
   ```

2. Add to iconMap:
   ```tsx
   const iconMap = {
     // ... existing icons
     youricon: YourIcon,
   };
   ```

### Modifying Animations

Animations use Framer Motion. Adjust in component files:

```tsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

## 📱 Responsive Design

All components are fully responsive:
- **Mobile**: Single column, stacked layout
- **Tablet**: 2 columns
- **Desktop**: 3 columns

Breakpoints:
- `md:` - 768px
- `lg:` - 1024px

## ♿ Accessibility

Built on shadcn/ui which uses Radix UI primitives:
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus management
- ✅ Screen reader support

## 🔧 Dependencies

Required packages:
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons
- `framer-motion` (motion/react) - Animations
- `tailwindcss` - Styling
- `class-variance-authority` - Variant management
- `clsx` - Class name utilities

## 📚 Related Documentation

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn Blocks](https://shadcnblocks.com)
- [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)

## 🎯 Best Practices

1. **Keep agent data consistent** - Use the same structure across all agents
2. **Limit features to 3-5** - Too many features clutter the card
3. **Use meaningful badges** - "Most Popular", "Trending", "Top Rated"
4. **Maintain color consistency** - Use colors that match your brand
5. **Test responsiveness** - Check on mobile, tablet, and desktop
6. **Optimize images** - If adding agent avatars, use Next.js Image
7. **Add loading states** - Show skeletons while data loads
8. **Handle empty states** - Show helpful messages when no agents match filters

## 🐛 Troubleshooting

### Cards not displaying correctly
- Check that all required shadcn/ui components are installed
- Verify Tailwind CSS is configured properly
- Ensure motion/react is installed

### Animations not working
- Install framer-motion: `npm install framer-motion`
- Check that you're using "use client" directive

### Icons not showing
- Install lucide-react: `npm install lucide-react`
- Verify icon names match the iconMap

## 🎉 Examples

Check these pages for complete examples:
- `/ai-agents-selection-v2` - Full selection interface
- `/ai-agents-showcase-v2` - Complete showcase
- `/ai-agents-all-versions` - Comparison of all card styles

## 📝 License

This implementation follows the same license as your project.
