# Debug Signup Issues

## Step 1: Check Browser Console

1. Open http://localhost:3000
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Try signing up with: test@acme.com / password123
5. Look for error messages in console

## Step 2: Check Network Tab

1. In Developer Tools, go to "Network" tab
2. Try signing up again
3. Look for failed requests (red color)
4. Click on the failed request
5. Check the "Response" tab for error details

## Step 3: Common Errors & Solutions

### Error: "Invalid email domain"
**Cause:** Email domain not recognized
**Solution:** Check `packages/tenant-config/src/index.ts` has:
```typescript
emailDomains: ['acme.com', 'globex.com']
```

### Error: "Database error saving new user"
**Cause:** Trigger or tables missing
**Solution:** Run `supabase/FINAL_SETUP.sql` in Supabase SQL Editor

### Error: "User already registered"
**Cause:** Email already exists
**Solution:** Use different email or delete user from Supabase

### Error: "Password must be at least 6 characters"
**Cause:** Password too short
**Solution:** Use password with 6+ characters

### Error: "Auth client not initialized"
**Cause:** AuthProvider not loaded
**Solution:** Check browser console for initialization errors

## Step 4: Check Supabase Logs

1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/logs/explorer
2. Filter by: "auth"
3. Look for signup attempts and errors

## Step 5: Verify Database

Run this in Supabase SQL Editor:

```sql
-- Check if trigger exists
SELECT trigger_name 
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Check if function exists
SELECT routine_name 
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';

-- Check if brands exist
SELECT * FROM brands;

-- Check if brand_users table exists
SELECT COUNT(*) FROM brand_users;
```

## Step 6: Test Email Domain Detection

Open browser console and run:

```javascript
// This should work in the app
const email = 'test@acme.com'
const domain = email.split('@')[1]
console.log('Domain:', domain) // Should be 'acme.com'
```

## Step 7: Manual Test

Try this in Supabase SQL Editor to test the trigger manually:

```sql
-- Create a test user manually
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'manual-test@acme.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"brand_id": "acme"}'::jsonb,
  NOW(),
  NOW()
);

-- Check if brand_users record was created
SELECT * FROM brand_users WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'manual-test@acme.com'
);
```

## What to Share

If still having issues, please share:

1. **Exact error message** from browser console
2. **Network request details** (status code, response)
3. **Supabase logs** (any auth errors)
4. **Database verification results** (do tables/trigger exist?)

This will help me pinpoint the exact issue!
