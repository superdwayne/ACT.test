-- ============================================
-- Database Verification Script
-- Copy and paste this into Supabase SQL Editor
-- ============================================

-- 1. Check if tables exist
SELECT 
  'Tables Check' as check_type,
  table_name,
  'EXISTS' as status
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('brands', 'brand_users', 'brand_uploads', 'brand_settings')
ORDER BY table_name;

-- 2. Check brands data
SELECT 
  'Brands Data' as check_type,
  id,
  display_name,
  'OK' as status
FROM brands;

-- 3. Check if trigger exists
SELECT 
  'Trigger Check' as check_type,
  trigger_name,
  event_object_table,
  'EXISTS' as status
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 4. Check if function exists
SELECT 
  'Function Check' as check_type,
  routine_name,
  routine_type,
  'EXISTS' as status
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'handle_new_user';

-- 5. Check users in auth.users
SELECT 
  'Auth Users' as check_type,
  COUNT(*) as user_count,
  'COUNT' as status
FROM auth.users;

-- 6. Check users in brand_users
SELECT 
  'Brand Users' as check_type,
  COUNT(*) as user_count,
  'COUNT' as status
FROM brand_users;

-- 7. Check if any users have brand_id in metadata
SELECT 
  'User Metadata Check' as check_type,
  email,
  raw_user_meta_data->>'brand_id' as brand_id,
  CASE 
    WHEN raw_user_meta_data->>'brand_id' IS NOT NULL THEN 'HAS_BRAND'
    ELSE 'MISSING_BRAND'
  END as status
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;
