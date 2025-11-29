# Brand Configuration Exploration

## Overview
This document captures the exploration and implementation work done on the brand configuration system for the ACT 2.0 multi-tenant platform.

## System Architecture

### Database Schema
The brand configuration system is built on a multi-tenant architecture with the following key tables:

#### Core Tables
- **`tenants`** - Main tenant/organization records
- **`brands`** - Brand entities linked to tenants
- **`brand_settings`** - JSON-based configuration storage for brand customization

#### Configuration Structure
```sql
CREATE TABLE brand_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Brand Settings Schema
The `settings` JSONB column supports flexible configuration including:

```json
{
  "theme": {
    "primaryColor": "#FF6B35",
    "secondaryColor": "#004E89",
    "accentColor": "#F77F00",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1A1A1A"
  },
  "typography": {
    "fontFamily": "Inter",
    "headingFont": "Poppins",
    "fontSize": {
      "base": "16px",
      "heading": "32px"
    }
  },
  "logo": {
    "url": "https://example.com/logo.png",
    "width": 200,
    "height": 60
  },
  "features": {
    "aiChat": true,
    "analytics": true,
    "customDomain": false
  }
}
```

## Implementation Components

### Backend Services

#### Brand Extraction Service
Location: `/backend/src/brandExtraction.ts`

**Purpose**: Extract brand identity from documents (PDFs, images) using AI

**Key Features**:
- PDF text extraction
- Image analysis via AI vision models
- Brand element identification (colors, fonts, logos, tone)
- Structured JSON output

**Usage**:
```typescript
import { extractBrandFromDocument } from './brandExtraction';

const brandData = await extractBrandFromDocument(
  filePath,
  'application/pdf'
);
```

#### Supabase Integration
Location: `/backend/src/supabase.ts`

**Purpose**: Database operations for brand configuration

**Key Functions**:
- `getBrandSettings(brandId)` - Retrieve brand configuration
- `updateBrandSettings(brandId, settings)` - Update configuration
- `createBrand(tenantId, brandData)` - Create new brand

### Frontend Components

#### Brand Context Provider
Planned location: `/frontend_next/src/contexts/BrandContext.tsx`

**Purpose**: Provide brand configuration throughout the application

**Features**:
- Global brand state management
- Theme application
- Dynamic styling based on brand settings

#### AI Chat Integration
Location: `/frontend_next/src/app/ai-chat/page.tsx`

**Current Status**: Basic chat interface implemented
**Planned Enhancement**: Brand-aware responses and styling

## Configuration Flow

### 1. Brand Onboarding
```
User uploads brand document (PDF/Image)
    ↓
Backend extracts brand elements
    ↓
AI analyzes and structures data
    ↓
Brand settings stored in database
    ↓
Frontend applies brand theme
```

### 2. Runtime Configuration
```
User logs in
    ↓
Tenant/Brand identified
    ↓
Brand settings fetched
    ↓
Theme applied to UI
    ↓
Brand-specific features enabled
```

## Environment Configuration

### Backend Environment Variables
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
PORT=3001
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Testing Strategy

### Unit Tests
- Brand extraction accuracy
- Settings validation
- Database operations

### Integration Tests
- End-to-end brand onboarding
- Theme application
- Multi-tenant isolation

### Playwright E2E Tests
Location: `/tests/`

**Existing Tests**:
- `auth-email-domain.spec.ts` - Email domain validation
- `auth-validation.spec.ts` - Authentication flows
- `signup-test.spec.ts` - User registration

**Planned Tests**:
- Brand configuration upload
- Theme switching
- Brand-specific feature access

## Key Discoveries

### 1. Multi-Tenant Isolation
- Row Level Security (RLS) policies ensure tenant data isolation
- Brand settings are scoped to specific brands
- Users can only access brands within their tenant

### 2. Flexible Configuration
- JSONB storage allows schema-less brand configuration
- Easy to extend with new properties
- Supports nested configuration objects

### 3. AI-Powered Extraction
- OpenAI Vision API can extract brand elements from images
- PDF parsing provides text-based brand information
- Structured prompts ensure consistent output format

### 4. Performance Considerations
- Brand settings cached on frontend
- Lazy loading of brand assets
- Optimistic UI updates for settings changes

## Migration History

### Initial Schema
- `20241124000000_multi_tenant_setup.sql` - Base multi-tenant structure
- `20251106104033_init-schema.sql` - Core tables and RLS policies

### Brand Configuration
- `20251118190000_create_brand_settings.sql` - Brand settings table
- Added JSONB column for flexible configuration
- Created indexes for performance

## Next Steps

### Immediate Priorities
1. **Brand Context Implementation**
   - Create React context for brand state
   - Implement theme provider
   - Add brand-aware components

2. **UI Enhancement**
   - Apply brand colors to components
   - Dynamic logo rendering
   - Custom typography application

3. **Testing Coverage**
   - Add brand configuration tests
   - Test theme switching
   - Validate multi-tenant isolation

### Future Enhancements
1. **Advanced Extraction**
   - Support more document formats
   - Improve AI accuracy
   - Batch processing

2. **Configuration UI**
   - Visual brand editor
   - Live preview
   - Template library

3. **Performance Optimization**
   - CDN integration for assets
   - Service worker caching
   - Progressive loading

## Resources

### Documentation
- [Multi-Tenant Architecture](./MONOREPO_ARCHITECTURE.md)
- [Testing Strategy](./TESTING_STRATEGY.md)
- [MCP Servers Guide](./MCP_SERVERS_GUIDE.md)

### External References
- [Supabase Multi-Tenancy](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Theming](https://nextjs.org/docs/app/building-your-application/styling)
- [OpenAI Vision API](https://platform.openai.com/docs/guides/vision)

## Troubleshooting

### Common Issues

#### Brand Settings Not Loading
- Verify RLS policies allow access
- Check brand_id is correct
- Ensure user has tenant access

#### Theme Not Applying
- Clear browser cache
- Verify CSS variables are set
- Check brand context provider wraps app

#### Extraction Failures
- Validate file format
- Check API keys are set
- Review error logs for details

## Contributors
- Development team working on ACT 2.0 platform
- AI assistance via Windsurf Cascade

---

**Last Updated**: November 29, 2024
**Status**: Active Development
