# AI Agent Selection - Quick Reference

## 🎯 Three Versions Available

### 1. Standard Card (`/ai-agent-selection`)
**Best for**: Professional apps, minimal design
- Clean, modern design
- Scale + lift animation
- Compact size
- Quick implementation

### 2. Playful Card (`/ai-agent-selection-demo`)
**Best for**: Gaming, creative brands, fun apps
- Bold, vibrant design
- Scale + rotate animation
- Animated decorations
- Larger card size

### 3. Shadcn Blocks (`/ai-agents-shadcn-blocks`) ⭐ NEW
**Best for**: Enterprise, SaaS, marketplaces
- Star ratings & reviews
- Trend indicators
- Feature lists
- Search & filter
- Professional styling

## 📄 Demo Pages

| Route | Description |
|-------|-------------|
| `/ai-agents-all-versions` | Compare all 3 versions |
| `/ai-agent-selection` | Standard version demo |
| `/ai-agent-selection-demo` | Playful version demo |
| `/ai-agents-shadcn-blocks` | Shadcn blocks demo |
| `/ai-agent-comparison` | Standard vs Playful |

## 💻 Quick Usage

### Standard
```tsx
import { AgentSelectionScreen } from "@/components/ai-agents";
<AgentSelectionScreen onSelectAgent={(agent) => {...}} />
```

### Playful
```tsx
import { PlayfulAgentCard } from "@/components/ai-agents";
<PlayfulAgentCard agent={data} onClick={() => {...}} />
```

### Shadcn Blocks
```tsx
import { ShadcnBlocksSelectionScreen } from "@/components/ai-agents";
<ShadcnBlocksSelectionScreen onSelectAgent={(agent) => {...}} />
```

## 📊 Feature Matrix

| Feature | Standard | Playful | Shadcn |
|---------|:--------:|:-------:|:------:|
| Animations | ✅ | ✅ | ✅ |
| Star Ratings | ❌ | ❌ | ✅ |
| Trends | ❌ | ❌ | ✅ |
| Features List | ❌ | ❌ | ✅ |
| Search | ❌ | ❌ | ✅ |
| Filtering | ❌ | ❌ | ✅ |
| View Modes | ❌ | ❌ | ✅ |

## 🎨 Available Colors

All versions support: `blue`, `green`, `orange`, `purple`, `pink`, `red`

## 📱 Responsive

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

## 🚀 Start Here

1. Visit `/ai-agents-all-versions` to compare
2. Choose your preferred version
3. Copy the usage code
4. Customize the agent data
5. Add your routing logic

## 📚 Documentation

- `SHADCN_BLOCKS_SUMMARY.md` - Latest version
- `AI_AGENT_SELECTION_SUMMARY.md` - Previous versions
- `docs/SHADCN_BLOCKS_AGENT_GUIDE.md` - Full guide
- `docs/AI_AGENT_SELECTION_GUIDE.md` - Original guide

## ✨ Quick Tips

- Use **Standard** for professional, minimal apps
- Use **Playful** for fun, creative experiences
- Use **Shadcn Blocks** for enterprise/SaaS apps
- All versions are fully responsive
- All versions use Motion for animations
- All versions support TypeScript
