-- Verify the two new users created by the test
SELECT 
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_in_metadata,
  bu.brand_id as brand_in_table,
  bu.role,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
WHERE u.email IN (
  'test1764074787598@acme.com',
  'test1764074787979@globex.com'
)
ORDER BY u.created_at DESC;

-- Check all recent users
SELECT 
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_id,
  bu.brand_id as brand_in_table,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
ORDER BY u.created_at DESC
LIMIT 10;
