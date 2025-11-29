#!/bin/bash

# Development Setup Script (without Supabase)
set -e

echo "🚀 Setting up ACT Monorepo for development..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build packages in order
echo "🔨 Building packages..."
npm run build --workspace @act/tenant-config
npm run build --workspace @act/utils  
npm run build --workspace @act/ui
npm run build --workspace @act/auth

# Create environment files
echo "📝 Creating environment files..."

# ACME brand environment
cat > brands/acme-frontend/.env.local << EOF
BRAND_ID=acme
NEXT_PUBLIC_BRAND_ID=acme
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EOF

echo "✅ Development setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start Docker Desktop if you want to use Supabase locally"
echo "2. Update Supabase credentials in .env.local files"
echo "3. Run 'npm run dev --workspace brands/acme-frontend' to start ACME brand"
echo "4. Visit http://localhost:3000"
echo ""
echo "📚 Available commands:"
echo "- npm run dev --workspaces          # Start all services"
echo "- npm run build --workspaces        # Build all packages"
echo "- npm run test --workspaces         # Run all tests"
