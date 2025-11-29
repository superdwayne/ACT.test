-- ============================================
-- ACT Monorepo - Complete Migration Script
-- Run this in Supabase SQL Editor
-- ============================================

-- Migration 1: Multi-tenant setup for brand isolation
-- ============================================

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default brands
INSERT INTO brands (id, name, display_name) VALUES 
  ('acme', 'acme', 'Acme Labs'),
  ('globex', 'globex', 'Globex Corp')
ON CONFLICT (id) DO NOTHING;

-- Create brand_users table to link users to brands
CREATE TABLE IF NOT EXISTS brand_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, brand_id)
);

-- Enable RLS on brand_users
ALTER TABLE brand_users ENABLE ROW LEVEL SECURITY;

-- Create policy for brand_users - users can only see their own brand associations
DROP POLICY IF EXISTS "Users can view their own brand associations" ON brand_users;
CREATE POLICY "Users can view their own brand associations" ON brand_users
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own brand associations" ON brand_users;
CREATE POLICY "Users can insert their own brand associations" ON brand_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create brand_uploads table for file uploads per brand
CREATE TABLE IF NOT EXISTS brand_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on brand_uploads
ALTER TABLE brand_uploads ENABLE ROW LEVEL SECURITY;

-- Create policy for brand_uploads - users can only access uploads from their brand
DROP POLICY IF EXISTS "Users can view uploads from their brand" ON brand_uploads;
CREATE POLICY "Users can view uploads from their brand" ON brand_uploads
  FOR SELECT USING (
    brand_id IN (
      SELECT bu.brand_id 
      FROM brand_users bu 
      WHERE bu.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert uploads to their brand" ON brand_uploads;
CREATE POLICY "Users can insert uploads to their brand" ON brand_uploads
  FOR INSERT WITH CHECK (
    brand_id IN (
      SELECT bu.brand_id 
      FROM brand_users bu 
      WHERE bu.user_id = auth.uid()
    )
  );

-- Create function to automatically assign user to brand on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_brand_id TEXT;
BEGIN
  -- Extract brand_id from user metadata
  user_brand_id := NEW.raw_user_meta_data->>'brand_id';
  
  IF user_brand_id IS NOT NULL THEN
    -- Insert user into brand_users table
    INSERT INTO brand_users (user_id, brand_id)
    VALUES (NEW.id, user_brand_id)
    ON CONFLICT (user_id, brand_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create storage bucket for brand uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brand-uploads', 'brand-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for brand uploads
DROP POLICY IF EXISTS "Brand upload access" ON storage.objects;
CREATE POLICY "Brand upload access" ON storage.objects
  FOR ALL USING (
    bucket_id = 'brand-uploads' AND
    (storage.foldername(name))[1] IN (
      SELECT bu.brand_id 
      FROM brand_users bu 
      WHERE bu.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brand_users_user_id ON brand_users(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_users_brand_id ON brand_users(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_uploads_brand_id ON brand_uploads(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_uploads_user_id ON brand_uploads(user_id);

-- Migration 2: Brand settings
-- ============================================

CREATE TABLE IF NOT EXISTS brand_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE UNIQUE,
  primary_color TEXT DEFAULT '#2563eb',
  logo_url TEXT,
  features JSONB DEFAULT '{"enableChat": true, "enableAnalytics": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on brand_settings
ALTER TABLE brand_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for brand_settings
DROP POLICY IF EXISTS "Users can view their brand settings" ON brand_settings;
CREATE POLICY "Users can view their brand settings" ON brand_settings
  FOR SELECT USING (
    brand_id IN (
      SELECT bu.brand_id 
      FROM brand_users bu 
      WHERE bu.user_id = auth.uid()
    )
  );

-- Insert default settings for brands
INSERT INTO brand_settings (brand_id, primary_color, features) VALUES 
  ('acme', '#2563eb', '{"enableChat": true, "enableAnalytics": true}'::jsonb),
  ('globex', '#7c3aed', '{"enableChat": false, "enableAnalytics": true}'::jsonb)
ON CONFLICT (brand_id) DO NOTHING;

-- ============================================
-- Migration Complete!
-- ============================================

-- Verify tables were created
SELECT 'brands' as table_name, COUNT(*) as row_count FROM brands
UNION ALL
SELECT 'brand_users', COUNT(*) FROM brand_users
UNION ALL
SELECT 'brand_uploads', COUNT(*) FROM brand_uploads
UNION ALL
SELECT 'brand_settings', COUNT(*) FROM brand_settings;
