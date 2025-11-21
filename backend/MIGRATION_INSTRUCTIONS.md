# Brand Settings Migration Instructions

## Quick Setup

The `brand_settings` table migration needs to be run in your Supabase database.

## Option 1: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the SQL from: `supabase/migrations/20251118190000_create_brand_settings.sql`
5. Click **Run** (or press Cmd/Ctrl + Enter)

## Option 2: Supabase CLI

If you have the Supabase CLI linked to your project:

```bash
cd supabase
supabase db push
```

If not linked:
```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## Option 3: Direct psql

If you have direct database access:

```bash
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/20251118190000_create_brand_settings.sql
```

## What This Migration Creates

- `brand_settings` table to store extracted brand guidelines
- Separate settings for: voice_tone, visual_identity, social_media, messaging, guidelines
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-update timestamp trigger

## Verify Migration

After running, verify the table exists:

```sql
SELECT * FROM public.brand_settings LIMIT 1;
```

You should see the table structure without errors.

