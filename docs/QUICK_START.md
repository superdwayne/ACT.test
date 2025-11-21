# Brand Extraction System - Quick Start Guide

## What Was Built

A complete brand guideline extraction system that:
1. **Extracts** structured brand information from PDF brand books using AI
2. **Displays** extracted data in a comprehensive UI
3. **Saves** extracted settings to Supabase database
4. **Allows editing** of saved brand settings

## Architecture

```
PDF Upload → Backend API → AI Extraction (5 passes) → Database → Frontend Display
```

## Key Files

### Backend
- `backend/src/server.ts` - Express API server
- `backend/src/brandExtraction.ts` - AI extraction logic with 5 schemas
- `backend/src/supabase.ts` - Database client

### Frontend
- `frontend_next/src/app/brand-visuals/page.tsx` - Upload & extraction UI
- `frontend_next/src/app/brand-settings/page.tsx` - Settings management UI

### Database
- `supabase/migrations/20251118190000_create_brand_settings.sql` - Settings table

## Setup Steps

1. **Backend**:
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Add ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend_next
   npm install
   # Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:4000
   npm run dev
   ```

3. **Database**:
   - Run migration in Supabase dashboard
   - Creates `brand_settings` table with RLS policies

## API Endpoints

- `POST /api/extract-guidelines` - Extract from PDF
- `GET /api/brand-settings/:brandId` - Get settings
- `PUT /api/brand-settings/:brandId/:settingType` - Update setting
- `POST /api/brand-settings/:brandId/save-extraction` - Save all at once

## Extraction Categories

1. **Voice & Tone** - Primary voice, tone attributes, writing style, vocabulary
2. **Visual Identity** - Colors, typography, logo, imagery, layout
3. **Social Media** - Platform guidelines, content pillars, engagement rules
4. **Messaging** - Brand story, mission, values, taglines, positioning
5. **Guidelines** - Dos, don'ts, personality, usage rules, quality standards

## Key Features

- ✅ Multi-pass AI extraction (5 separate calls)
- ✅ Confidence scoring with normalization
- ✅ Automatic error recovery (fixes arrays, missing fields)
- ✅ Post-processing (infers missing primary_voice)
- ✅ Inline editing of settings
- ✅ Comprehensive UI with accordion display

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `<UNKNOWN>` voice | Post-processing infers from other fields |
| Low confidence | Normalization boosts scores (90-100% if data found) |
| Array validation errors | Automatic parsing of XML-like strings |
| Missing fields | Defaults provided, required fields inferred |
| 404 on brand-settings | Use Suspense wrapper, clear .next cache |

## Testing

```bash
# Test extraction
curl -X POST http://localhost:4000/api/extract-guidelines \
  -F "file=@test-pdfs/Brandbook.pdf" \
  -F "brandName=ACT"
```

## Environment Variables

**Backend**:
- `ANTHROPIC_API_KEY` - Required
- `SUPABASE_URL` - Required
- `SUPABASE_SERVICE_ROLE_KEY` - Required

**Frontend**:
- `NEXT_PUBLIC_API_URL` - Defaults to http://localhost:4000

## Next Steps for New LLM

1. Read `docs/BRAND_EXTRACTION_SYSTEM.md` for full details
2. Review code in `backend/src/brandExtraction.ts` for extraction logic
3. Check `frontend_next/src/app/brand-visuals/page.tsx` for UI implementation
4. Understand the 5 extraction schemas and their requirements
5. Review error handling and post-processing logic

