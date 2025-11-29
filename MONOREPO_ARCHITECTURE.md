# ACT Monorepo Architecture

## Overview
This monorepo supports multiple brands with shared components, brand-specific authentication, and dedicated Supabase areas for each brand.

## Directory Structure

```
act-monorepo/
├── packages/                    # Shared libraries
│   ├── ui/                     # Shared UI components (shadcn/ui based)
│   ├── auth/                   # Shared authentication logic
│   ├── supabase-core/          # Core Supabase utilities
│   ├── tenant-config/          # Brand configuration
│   └── utils/                  # Shared utilities
├── brands/                     # Brand-specific applications
│   ├── acme-frontend/          # ACME brand app
│   ├── tesla-frontend/         # Tesla brand app (example)
│   └── [brand]-frontend/       # Template for new brands
├── backend/                    # Shared backend services
├── supabase/                   # Database migrations & functions
└── tools/                      # Development tools & scripts
```

## Key Features

### 1. **Shared Component Library** (`packages/ui/`)
- Built on shadcn/ui foundation
- Brand-agnostic components that can be themed
- Consistent design system across all brands

### 2. **Brand-Specific Authentication** (`packages/auth/`)
- Shared authentication logic
- Brand-specific login/signup flows
- Forgot password functionality per brand
- Supabase RLS (Row Level Security) for brand isolation

### 3. **Multi-Tenant Supabase Setup**
- Single Supabase instance with brand isolation
- RLS policies for data separation
- Brand-specific upload areas
- Shared schemas with tenant-specific data

### 4. **Brand Configuration** (`packages/tenant-config/`)
- Theme customization per brand
- Feature flags per brand
- Brand-specific routing
- Environment-specific configurations

## Benefits

1. **Code Reusability**: Shared components reduce duplication
2. **Brand Isolation**: Each brand has its own data space
3. **Scalability**: Easy to add new brands
4. **Maintainability**: Centralized shared logic
5. **Testing**: Isolated testing per brand and shared components

## Development Workflow

1. **Shared Components**: Develop in `packages/ui/`
2. **Brand-Specific Features**: Implement in `brands/[brand]-frontend/`
3. **Authentication**: Configure in `packages/auth/` with brand context
4. **Database**: Use RLS policies for brand data separation

## Testing Strategy

- **Unit Tests**: Per package and brand
- **Integration Tests**: Cross-package functionality
- **E2E Tests**: Brand-specific user journeys
- **Component Tests**: Shared UI components
