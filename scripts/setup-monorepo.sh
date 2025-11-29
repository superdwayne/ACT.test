#!/bin/bash

# ACT Monorepo Setup Script
set -e

echo "🚀 Setting up ACT Monorepo..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Build shared packages in dependency order
echo "🔨 Building shared packages..."

# Build tenant-config first (no dependencies)
echo "Building @act/tenant-config..."
npm run build --workspace @act/tenant-config

# Build utils (no dependencies)
echo "Building @act/utils..."
npm run build --workspace @act/utils

# Build UI components (depends on utils)
echo "Building @act/ui..."
npm run build --workspace @act/ui

# Build auth (depends on tenant-config and ui)
echo "Building @act/auth..."
npm run build --workspace @act/auth

# Set up Supabase
echo "🗄️ Setting up Supabase..."
if command -v supabase &> /dev/null; then
    echo "Starting Supabase..."
    supabase start
    
    echo "Running migrations..."
    supabase db push
    
    echo "✅ Supabase setup complete"
else
    echo "⚠️ Supabase CLI not found. Please install it:"
    echo "npm install -g supabase"
fi

# Create environment files for brands
echo "📝 Creating environment files..."

# ACME brand environment
cat > brands/acme-frontend/.env.local << EOF
BRAND_ID=acme
NEXT_PUBLIC_BRAND_ID=acme
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EOF

# Globex brand environment (if exists)
if [ -d "brands/globex-frontend" ]; then
    cat > brands/globex-frontend/.env.local << EOF
BRAND_ID=globex
NEXT_PUBLIC_BRAND_ID=globex
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EOF
fi

echo "✅ Monorepo setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update Supabase keys in .env.local files"
echo "2. Run 'npm run dev' to start all services"
echo "3. Visit http://localhost:3000 for ACME brand"
echo "4. Run tests with 'npm run test --workspaces'"
