---
trigger: manual
---

# Figma to Code Integration Rules

## Component Generation from Figma
- Use Figma MCP to fetch exact component specifications before implementation
- Generate shadcn/ui compatible components in components/ui/
- Use arbitrary Tailwind values [px] for pixel-perfect measurements
- Ensure Next.js 15 App Router compatibility
- Add "use client" directive when components use interactivity

## Design Fidelity Standards
- Match Figma specs exactly - no approximations
- Extract exact hex colors from Figma
- Use precise spacing values from Figma measurements
- Implement responsive breakpoints as defined in Figma

## ACT 2.0 Brand Consistency
- All components must align with brand guidelines
- Typography must match brand font specifications
- Colors must use exact brand palette values
- Spacing must follow brand system grid
```

### 5. Your Next.js Project Structure (ACT 2.0)
```
act-2.0/
├── .windsurfrules          # Windsurf AI rules
├── app/                    # Next.js App Router
│   ├── (dashboard)/
│   ├── (auth)/
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn/ui from Figma MCP
│   ├── brand/              # Custom brand components
│   └── chat/               # Chat interface components
├── lib/
│   ├── utils.ts
│   └── supabase/
└── styles/
    └── globals.css
```

### 6. Usage in Windsurf

Once configured, you can use Cascade (Windsurf's AI) with the Figma MCP:
```
You: "Extract the primary button component from this Figma file: 
[your-figma-url]"

Cascade: [Uses MCP to fetch exact specs]
- Height: 44px
- Padding: 24px horizontal, 12px vertical
- Border radius: 8px
- Background: #FF6B35
- Typography: Inter, 16px, semibold

[Generates component]