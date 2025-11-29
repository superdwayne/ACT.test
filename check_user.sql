-- Check if user exists at all (including unconfirmed)
SELECT 
  id,
  email,
  email_confirmed_at,
  raw_user_meta_data->>'brand_id' as brand_id,
  created_at
FROM auth.users
WHERE email = 'testfinal@acme.com';

-- If this returns nothing, user wasn't created
-- If this returns a row with email_confirmed_at = NULL, email confirmation is required
