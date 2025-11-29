-- Verification Script - Run this to check everything is set up correctly

-- 1. Check all tables exist
SELECT 
  tablename,
  schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('brands', 'brand_users', 'brand_uploads', 'brand_settings')
ORDER BY tablename;

-- 2. Check brands data
SELECT * FROM brands;

-- 3. Check brand_settings data
SELECT brand_id, primary_color, features FROM brand_settings;

-- 4. Check RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('brand_users', 'brand_uploads', 'brand_settings');

-- 5. Check trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 6. Check storage bucket exists
SELECT id, name, public FROM storage.buckets WHERE id = 'brand-uploads';
