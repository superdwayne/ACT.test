-- ============================================
-- Verify Users and Brand Assignment
-- ============================================

-- 1. Check ALL users in auth.users
SELECT 
  'All Users' as check_type,
  id,
  email,
  raw_user_meta_data->>'brand_id' as brand_id,
  created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 2. Check ALL users in brand_users
SELECT 
  'Brand Users' as check_type,
  bu.user_id,
  bu.brand_id,
  u.email,
  bu.created_at
FROM brand_users bu
LEFT JOIN auth.users u ON bu.user_id = u.id
ORDER BY bu.created_at DESC
LIMIT 10;

-- 3. Check for users with ACME email
SELECT 
  'ACME Users' as check_type,
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_in_metadata,
  bu.brand_id as brand_in_table,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
WHERE u.email ILIKE '%acme%'
ORDER BY u.created_at DESC;

-- 4. Check if trigger is working
SELECT 
  'Trigger Status' as check_type,
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 5. Count everything
SELECT 
  'Summary' as check_type,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM brand_users) as total_brand_users,
  (SELECT COUNT(*) FROM brands) as total_brands;
