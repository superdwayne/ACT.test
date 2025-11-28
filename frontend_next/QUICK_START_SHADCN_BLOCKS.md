# 🚀 Quick Start - Shadcn Blocks AI Agent Selection

## 📍 Demo URLs

Visit these pages to see the implementations:

```
http://localhost:3000/ai-agents-selection-v2      # Full selection interface
http://localhost:3000/ai-agents-showcase-v2       # Complete showcase
http://localhost:3000/ai-agents-shadcn-blocks     # Original demo
http://localhost:3000/ai-agents-all-versions      # Compare all versions
```

## 🎯 What to Use When

### Use `/ai-agents-selection-v2` for:
- ✅ Search + filter + sort functionality
- ✅ Grid/List view toggle
- ✅ Production-ready selection interface
- ✅ E-commerce/marketplace style

### Use `/ai-agents-showcase-v2` for:
- ✅ Marketing/landing page style
- ✅ Hero section with stats
- ✅ Feature highlights
- ✅ Complete user journey

### Use components individually for:
- ✅ Custom layouts
- ✅ Specific sections
- ✅ Maximum flexibility

## 📦 Available Components

```tsx
// Import what you need
import {
  // Cards
  ShadcnBlocksAgentCard,
  
  // Sections
  AgentHeroSection,
  AgentGridSection,
  AgentComparisonTable,
  
  // Full screens
  ShadcnBlocksSelectionScreen,
  
  // Types
  type ShadcnBlocksAgentData
} from "@/components/ai-agents";
```

## 💡 Quick Examples

### 1. Simple Card

```tsx
<ShadcnBlocksAgentCard
  agent={{
    id: "planner",
    name: "Strategic Planner",
    tagline: "Master of Planning",
    description: "Expert in planning...",
    category: "STRATEGY",
    rating: 4.8,
    reviews: 342,
    score: 4450,
    trend: 15.3,
    color: "blue",
    icon: "calendar",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    badge: "Most Popular"
  }}
  onClick={() => console.log("Selected")}
  featured={true}
/>
```

### 2. Hero Section

```tsx
<AgentHeroSection 
  title="Choose Your AI Agent"
  subtitle="Select from our curated collection"
  stats={{ agents: 6, rating: 4.7, reviews: 2000, growth: 18 }}
  onGetStarted={() => console.log("Get started")}
/>
```

### 3. Grid Section

```tsx
<AgentGridSection 
  agents={agentsArray}
  onSelectAgent={(agent) => console.log(agent)}
  title="Featured Agents"
  description="Our most popular agents"
/>
```

### 4. Comparison Table

```tsx
<AgentComparisonTable agents={agentsArray} />
```

### 5. Full Selection Screen

```tsx
<ShadcnBlocksSelectionScreen 
  onSelectAgent={(agent) => router.push(`/chat/${agent.id}`)} 
/>
```

## 🎨 Customization

### Colors
- `blue` - Strategy & Planning
- `green` - Analytics & Data
- `orange` - Content & Creative
- `purple` - Innovation & Design
- `pink` - Automation & Process
- `red` - Marketing & Growth

### Icons
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
  features: string[];
  badge?: string;
}
```

## 🔧 Common Tasks

### Add a new agent
```tsx
const newAgent: ShadcnBlocksAgentData = {
  id: "my-agent",
  name: "My Agent",
  tagline: "Does amazing things",
  description: "Full description here",
  category: "CUSTOM",
  rating: 4.5,
  reviews: 100,
  score: 4000,
  trend: 10.5,
  color: "blue",
  icon: "sparkles",
  features: ["Feature 1", "Feature 2", "Feature 3"]
};
```

### Handle selection
```tsx
const handleSelect = (agent: ShadcnBlocksAgentData) => {
  // Navigate
  router.push(`/chat/${agent.id}`);
  
  // Or track analytics
  trackEvent("agent_selected", { agent_id: agent.id });
  
  // Or update state
  setSelectedAgent(agent);
};
```

### Filter agents
```tsx
const filtered = agents.filter(agent => 
  agent.category === "STRATEGY" && agent.rating >= 4.5
);
```

### Sort agents
```tsx
const sorted = [...agents].sort((a, b) => b.rating - a.rating);
```

## 📚 Full Documentation

- **Complete Guide**: `AI_AGENT_SELECTION_GUIDE.md`
- **Summary**: `SHADCN_BLOCKS_SUMMARY.md`
- **Component Guide**: `docs/SHADCN_BLOCKS_AGENT_GUIDE.md`

## 🎯 Next Steps

1. **Visit the demos** - See all implementations
2. **Choose your style** - Selection vs Showcase
3. **Copy the code** - Use what fits your needs
4. **Customize** - Adjust colors, data, features
5. **Deploy** - Ship to production

## ⚡ Pro Tips

- Use `featured={true}` for popular agents
- Add `badge="Most Popular"` for highlights
- Keep features list to 3-5 items
- Use consistent color schemes
- Test on mobile, tablet, desktop
- Add loading states for better UX
- Handle empty states gracefully

---

**Ready to build?** Start with `/ai-agents-showcase-v2` to see everything in action! 🚀
