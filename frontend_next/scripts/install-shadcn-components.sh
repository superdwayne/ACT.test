#!/bin/bash

# Shadcn Component Installation Script for ACT 2.0
# This script installs all recommended components for the Monday.com board integration

echo "🚀 Installing Shadcn Components for ACT 2.0..."

# High Priority Components
echo "📦 Installing high-priority components..."
npx shadcn@latest add accordion --yes
npx shadcn@latest add calendar --yes
npx shadcn@latest add popover --yes
npx shadcn@latest add progress --yes
npx shadcn@latest add checkbox --yes
npx shadcn@latest add alert-dialog --yes

# Medium Priority Components
echo "📦 Installing medium-priority components..."
npx shadcn@latest add command --yes
npx shadcn@latest add tooltip --yes
npx shadcn@latest add table --yes
npx shadcn@latest add collapsible --yes

# Optional Enhancements
echo "📦 Installing optional enhancement components..."
npx shadcn@latest add hover-card --yes
npx shadcn@latest add separator --yes
npx shadcn@latest add skeleton --yes

echo "✅ Component installation complete!"
echo ""
echo "Note: Combobox functionality can be built using Command + Popover components"
echo "See docs/shadcn-component-mapping.md for usage examples"

