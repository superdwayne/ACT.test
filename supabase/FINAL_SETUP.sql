-- ============================================
-- FINAL COMPLETE SETUP - Run this in Supabase SQL Editor
-- This is the minimal setup needed for dynamic brand architecture
-- ============================================

-- 1. Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert ACME and Globex brands
INSERT INTO brands (id, name, display_name) VALUES 
  ('acme', 'acme', 'Acme Labs'),
  ('globex', 'globex', 'Globex Corp')
ON CONFLICT (id) DO NOTHING;

-- 3. Create brand_users table (links users to brands)
CREATE TABLE IF NOT EXISTS brand_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, brand_id)
);

-- 4. Enable Row Level Security
ALTER TABLE brand_users ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
DROP POLICY IF EXISTS "Users can view their own brand associations" ON brand_users;
CREATE POLICY "Users can view their own brand associations" ON brand_users
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own brand associations" ON brand_users;
CREATE POLICY "Users can insert their own brand associations" ON brand_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Create function to auto-assign users to brands
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_brand_id TEXT;
BEGIN
  -- Extract brand_id from user metadata
  user_brand_id := NEW.raw_user_meta_data->>'brand_id';
  
  -- Only insert if brand_id exists
  IF user_brand_id IS NOT NULL THEN
    INSERT INTO brand_users (user_id, brand_id)
    VALUES (NEW.id, user_brand_id)
    ON CONFLICT (user_id, brand_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brand_users_user_id ON brand_users(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_users_brand_id ON brand_users(brand_id);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check tables exist
SELECT 'Tables created' as status, COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('brands', 'brand_users');

-- Check brands inserted
SELECT 'Brands inserted' as status, id, display_name
FROM brands;

-- Check trigger exists
SELECT 'Trigger created' as status, trigger_name
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Check function exists
SELECT 'Function created' as status, routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'handle_new_user';

-- Final status
SELECT '✅ Setup complete! Ready to test signup.' as final_status;
