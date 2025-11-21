# Brand Guideline Extraction System - Implementation Summary

## Overview
This document summarizes the complete implementation of a brand guideline extraction system that uses AI to extract structured brand information from PDF brand books. The system consists of a backend API (Express.js) and a frontend interface (Next.js) that work together to extract, display, and manage brand settings.

## Project Structure

```
ACT.test/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Express server with API endpoints
│   │   ├── brandExtraction.ts     # Core AI extraction logic
│   │   └── supabase.ts            # Supabase client configuration
│   ├── test-pdfs/                 # Test PDF files for extraction
│   └── .env                       # Environment variables
├── frontend_next/
│   ├── src/
│   │   ├── app/
│   │   │   ├── brand-visuals/
│   │   │   │   └── page.tsx       # Main extraction UI
│   │   │   └── brand-settings/
│   │   │       └── page.tsx       # Settings management UI
│   │   └── components/
│   │       └── dashboard/
│   │           └── Sidebar.tsx   # Navigation sidebar
│   └── .env.local                 # Frontend environment variables
└── supabase/
    └── migrations/
        └── 20251118190000_create_brand_settings.sql
```

## Core Features Implemented

### 1. PDF Brand Guideline Extraction
- **Input**: PDF brand book files
- **Output**: Structured JSON with 5 main categories:
  - Voice & Tone
  - Visual Identity
  - Social Media Guidelines
  - Messaging
  - Brand Guidelines

### 2. AI-Powered Extraction
- Uses Anthropic Claude 3 Opus model
- Multi-pass extraction (5 separate AI calls for each category)
- Confidence scoring for each category
- Automatic normalization of confidence scores

### 3. Brand Settings Management
- Save extracted data to Supabase `brand_settings` table
- View and edit settings by brand ID
- Inline editing of individual fields
- Versioning (only one active setting per type per brand)

### 4. Frontend UI
- Upload interface with progress indicators
- Comprehensive extraction summary display
- Accordion-based organization of extracted data
- Settings management page with editing capabilities

## Technical Implementation

### Backend API Endpoints

#### `POST /api/extract-guidelines`
- **Purpose**: Extract brand guidelines from uploaded PDF
- **Input**: 
  - `file`: PDF file (multipart/form-data)
  - `brandName`: Brand name string
  - `brandId`: Optional brand ID for auto-saving
- **Process**:
  1. Parse PDF text using `pdf-parse`
  2. Truncate to 30,000 characters
  3. Run 5 extraction passes (voice, visual, social, messaging, guidelines)
  4. Normalize confidence scores
  5. Optionally save to `brand_settings` table
- **Output**: Complete extraction result with all categories

#### `GET /api/brand-settings/:brandId`
- **Purpose**: Fetch active brand settings
- **Output**: Grouped settings by type

#### `PUT /api/brand-settings/:brandId/:settingType`
- **Purpose**: Update a specific setting type
- **Input**: `setting_data` (JSON), optional `confidence_score`

#### `POST /api/brand-settings/:brandId/save-extraction`
- **Purpose**: Save all extracted settings at once

### Extraction Schema Structure

#### Voice & Tone Schema
```typescript
{
  primary_voice: string (REQUIRED)
  tone_attributes: string[]
  writing_style: string (REQUIRED)
  vocabulary_preferences: string[]
  forbidden_words: string[]
  example_phrases: string[]
  voice_description?: string
  tone_examples?: string[]
  communication_approach?: string
  confidence_score: number (0-1)
}
```

#### Visual Identity Schema
```typescript
{
  color_palette: {
    primary_colors: Array<{name, hex, rgb?, cmyk?, pantone?, usage, usage_context?}>
    secondary_colors: Array<{name, hex?, rgb?, cmyk?, pantone?, usage, usage_context?}>
    color_combinations?: string[]
    color_restrictions?: string[]
  }
  typography: {
    primary_font: {family, weights, usage_context, tracking?, case_rules?}
    secondary_fonts: Array<{family, weights?, usage_context}>
    typography_hierarchy?: string
    typography_rules?: string[]
  }
  logo?: {
    description?, placement_rules?, size_requirements?,
    color_variations?, spacing_requirements?, usage_restrictions?
  }
  imagery_style: {
    photography_guidelines: string
    illustration_style: string
    image_treatments: string[]
    photography_subjects?: string[]
    photography_techniques?: string[]
    image_composition?: string
  }
  layout_guidelines?: string[]
  confidence_score: number (0-1)
}
```

#### Social Media Schema
```typescript
{
  platform_guidelines: Record<string, {
    tone_adjustments: string
    content_types: string[]
    hashtag_strategy: string
    visual_specs?: {image_dimensions?, video_specs?}
  }>
  content_pillars: string[]
  engagement_rules: string
  confidence_score: number (0-1)
}
```

#### Messaging Schema
```typescript
{
  brand_story: string (REQUIRED)
  brand_mission?: string
  brand_vision?: string
  core_values?: string[]
  value_propositions?: string[]
  key_messages?: string[]
  taglines?: string[]
  elevator_pitch: string (REQUIRED)
  brand_positioning?: string
  target_audience?: string
  messaging_tone?: string
  confidence_score: number (0-1)
}
```

#### Guidelines Schema
```typescript
{
  dos: string[]
  donts: string[]
  brand_personality: string[]
  usage_rules?: string[]
  quality_standards?: string[]
  consistency_requirements?: string[]
  confidence_score: number (0-1)
}
```

## Key Implementation Details

### 1. AI Extraction Logic (`brandExtraction.ts`)

#### Model Configuration
- **Provider**: Anthropic Claude 3 Opus (`claude-3-opus-20240229`)
- **SDK**: `@ai-sdk/anthropic` with `generateObject`
- **API Key**: `ANTHROPIC_API_KEY` environment variable

#### Extraction Process
1. **Text Truncation**: PDF text limited to 30,000 characters
2. **Multi-Pass Extraction**: 5 separate AI calls, one per category
3. **Prompt Engineering**: 
   - Explicit instructions for array fields (must be JSON arrays, not strings)
   - Confidence scoring guidance (default to 100% if extracted everything available)
   - Field-specific requirements (e.g., primary_voice is REQUIRED)
4. **Error Handling**:
   - Catches validation errors
   - Parses XML-like strings into arrays
   - Provides defaults for missing required fields
   - Logs detailed error information

#### Post-Processing
- **Confidence Normalization**: Boosts low scores if substantial data extracted
  - 3+ fields → automatically set to 100%
  - 2 fields with low score → boost by 30%
- **Primary Voice Inference**: If missing or invalid, infers from:
  - Tone attributes
  - Writing style
  - Example phrases
  - Fallback: "Brand Voice"

### 2. Database Schema (`brand_settings` table)

```sql
CREATE TABLE brand_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id TEXT NOT NULL,
  setting_type TEXT NOT NULL, -- 'voice_tone', 'visual_identity', 'social_media', 'messaging', 'guidelines'
  setting_data JSONB NOT NULL,
  confidence_score NUMERIC(3, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT,
  
  -- Ensure one active setting per type per brand
  CONSTRAINT unique_active_brand_setting UNIQUE (brand_id, setting_type) 
    WHERE (is_active = TRUE)
);
```

**Indexes**:
- `brand_id`
- `setting_type`
- `is_active`

**RLS Policies**: Users can view/edit settings for brands in their organization

### 3. Frontend Implementation

#### Brand Visuals Page (`brand-visuals/page.tsx`)
- **File Upload**: PDF file input with validation
- **Progress Indicators**: Shows extraction stages (uploading, extracting_voice, extracting_visual, etc.)
- **Extraction Summary**: 
  - Quick stats (confidence, voice, colors)
  - Detailed accordion view with all extracted fields
  - Organized by category (Voice & Tone, Visual Identity, Messaging, Social Media, Guidelines)
- **Save Functionality**: 
  - Auto-save if brandId provided
  - Manual save button
  - View Settings button

#### Brand Settings Page (`brand-settings/page.tsx`)
- **Load Settings**: Fetch by brandId from URL params
- **Inline Editing**: 
  - Click "Edit" on any field
  - Textarea for editing
  - Save/Cancel buttons
- **Accordion Display**: Organized by setting type
- **Error Handling**: Shows helpful error messages

### 4. Error Handling & Validation

#### Backend Error Handling
- **PDF Parsing**: Validates PDF can be read
- **AI API Errors**: Detailed logging with error stack traces
- **Schema Validation**: Catches and fixes common issues:
  - String arrays converted to proper arrays
  - Missing required fields provided with defaults
  - XML-like strings parsed into arrays

#### Frontend Error Handling
- **API Errors**: Displays user-friendly error messages
- **Missing Data**: Fallbacks for missing fields
- **Invalid Values**: Filters out "<UNKNOWN>" and similar invalid values

## Configuration Required

### Backend Environment Variables (`.env`)
```env
ANTHROPIC_API_KEY=your_anthropic_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=4000
```

### Frontend Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Supabase Setup
1. Run migration: `20251118190000_create_brand_settings.sql`
2. Configure RLS policies (already in migration)
3. Create storage bucket: `brand-guidelines` (optional, for file storage)

## Dependencies

### Backend (`backend/package.json`)
```json
{
  "dependencies": {
    "express": "^4.x",
    "cors": "^2.x",
    "multer": "^1.x",
    "pdf-parse": "^1.x",
    "@ai-sdk/anthropic": "^0.x",
    "ai": "^3.x",
    "zod": "^3.x",
    "@supabase/supabase-js": "^2.x",
    "dotenv": "^16.x"
  },
  "devDependencies": {
    "ts-node-dev": "^2.x",
    "@types/express": "^4.x",
    "@types/multer": "^1.x",
    "typescript": "^5.x"
  }
}
```

### Frontend (`frontend_next/package.json`)
```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.x",
    "lucide-react": "^0.x"
  }
}
```

## Key Challenges Solved

### 1. PDF Parsing
- **Issue**: `pdf-parse` CommonJS module compatibility
- **Solution**: Used `require()` for CommonJS import, `new PDFParse({ data: buffer })`

### 2. AI Model API
- **Issue**: Model name errors (404 Not Found)
- **Solution**: Used `claude-3-opus-20240229`, explicitly initialized Anthropic client with API key

### 3. Schema Validation
- **Issue**: AI returning strings instead of arrays
- **Solution**: 
  - Enhanced prompts with explicit array format examples
  - Post-processing to parse XML-like strings into arrays
  - Error recovery to fix validation errors

### 4. Confidence Scoring
- **Issue**: AI being too conservative (low confidence scores)
- **Solution**:
  - Updated prompts to emphasize confidence should reflect extraction quality, not brand book completeness
  - Post-processing normalization that boosts scores when substantial data is found
  - Default to 100% if extracted everything available

### 5. Missing Required Fields
- **Issue**: `primary_voice` sometimes missing or showing "<UNKNOWN>"
- **Solution**:
  - Made prompts more explicit about inferring from other fields
  - Post-processing to infer `primary_voice` from tone attributes, writing style, or example phrases
  - Frontend filtering to handle invalid values

### 6. Frontend Route Issues
- **Issue**: `/brand-settings` page not loading (404)
- **Solution**: 
  - Used `Suspense` wrapper for `useSearchParams`
  - Cleared Next.js cache
  - Added fallback backend URL

## Usage Flow

1. **Upload PDF**:
   - User selects PDF file
   - Enters brand name (optional: brand ID)
   - Clicks "Upload PDF"
   - Progress indicators show extraction stages

2. **Extraction Process**:
   - Backend parses PDF text
   - Runs 5 AI extraction passes
   - Normalizes confidence scores
   - Returns structured JSON

3. **View Results**:
   - Frontend displays extraction summary
   - Organized in accordion sections
   - Shows all extracted fields

4. **Save Settings** (optional):
   - If brandId provided, auto-saves
   - Or click "Save Settings" button
   - Data saved to `brand_settings` table

5. **Manage Settings**:
   - Navigate to `/brand-settings?brandId=xxx`
   - View all settings
   - Edit individual fields inline
   - Changes saved to database

## Testing

### Test Endpoint
```bash
cd backend
curl -X POST http://localhost:4000/api/extract-guidelines \
  -F "file=@test-pdfs/Brandbook.pdf" \
  -F "brandName=ACT" \
  -F "brandId=act"
```

### Expected Output
- JSON response with all 5 categories
- Confidence scores (should be 90%+)
- All required fields populated
- Arrays properly formatted

## Future Enhancements

1. **Vector Search**: Add pgvector for semantic search of extracted guidelines
2. **Version History**: Track changes to brand settings over time
3. **Bulk Operations**: Extract from multiple PDFs at once
4. **Export**: Export settings to JSON/CSV
5. **Validation**: Client-side validation before saving
6. **Preview**: Preview extracted data before saving
7. **Comparison**: Compare different brand settings versions

## Important Notes

1. **Confidence Scores**: System normalizes scores to be more optimistic (90-100% if substantial data found)
2. **Array Fields**: All array fields must be proper JSON arrays, not strings
3. **Required Fields**: `primary_voice` and `writing_style` are always required (inferred if missing)
4. **Error Recovery**: System automatically fixes common validation errors
5. **Post-Processing**: Always runs after extraction to ensure data quality

## Code Quality

- **Type Safety**: TypeScript throughout
- **Error Handling**: Comprehensive error logging and user-friendly messages
- **Validation**: Zod schemas for all data structures
- **Modularity**: Separation of concerns (extraction logic, API routes, UI components)
- **Documentation**: Inline comments for complex logic

## Deployment Considerations

1. **Environment Variables**: Must be set in production
2. **API Keys**: Secure storage for Anthropic API key
3. **Database**: Supabase migration must be run
4. **CORS**: Configured for localhost, update for production domains
5. **File Upload Limits**: Consider size limits for PDF files
6. **Rate Limiting**: May need rate limiting for AI API calls

