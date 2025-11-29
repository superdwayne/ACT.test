# 🔧 Troubleshooting Guide

## Current Issue: "Database error saving new user"

### **Step 1: Verify Database Setup**

1. **Open Supabase SQL Editor:**
   https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/sql/new

2. **Copy and run this verification script:**
   Open file: `verify-db.sql` in the project root
   Copy all contents and paste into SQL Editor
   Click "Run"

3. **Check the results:**
   - ✅ Should see 4 tables: brands, brand_users, brand_uploads, brand_settings
   - ✅ Should see 2 brands: ACME, Globex
   - ✅ Should see trigger: on_auth_user_created
   - ✅ Should see function: handle_new_user

---

### **Step 2: Check What's Missing**

If any of these are missing, run the full migration:

**Copy this entire migration and run it in SQL Editor:**

```sql
-- ============================================
-- Complete Migration - Run this if anything is missing
-- ============================================

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert brands
INSERT INTO brands (id, name, display_name) VALUES 
  ('acme', 'acme', 'Acme Labs'),
  ('globex', 'globex', 'Globex Corp')
ON CONFLICT (id) DO NOTHING;

-- Create brand_users table
CREATE TABLE IF NOT EXISTS brand_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, brand_id)
);

-- Enable RLS
ALTER TABLE brand_users ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view their own brand associations" ON brand_users;
CREATE POLICY "Users can view their own brand associations" ON brand_users
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own brand associations" ON brand_users;
CREATE POLICY "Users can insert their own brand associations" ON brand_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger function
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

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verify
SELECT 'Migration complete!' as status;
```

---

### **Step 3: Check Frontend Error**

**Open browser console (F12) and look for errors:**

Common errors and fixes:

#### **Error: "Invalid email domain"**
```
❌ Please use your company email address (e.g., user@acme.com)
```
**Fix:** Use `@acme.com` or `@globex.com` email

#### **Error: "Database error saving new user"**
```
❌ Database error saving new user
```
**Fix:** Run the migration above in SQL Editor

#### **Error: "User already registered"**
```
❌ User already registered
```
**Fix:** Use a different email or delete the user from Supabase

---

### **Step 4: Test Signup Flow**

1. **Clear browser cache and cookies**
2. **Go to:** http://localhost:3000
3. **Try signing up:**
   ```
   Email: test123@acme.com
   Password: password123
   ```

4. **Check browser console (F12)** for any errors

5. **Check Supabase logs:**
   https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/logs/explorer

---

### **Step 5: Verify User Was Created**

After signup, run this in SQL Editor:

```sql
-- Check if user was created
SELECT 
  u.id,
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_id_in_metadata,
  bu.brand_id as brand_id_in_table,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
WHERE u.email LIKE '%@acme.com%'
ORDER BY u.created_at DESC
LIMIT 5;
```

**Expected result:**
```
id          | email              | brand_id_in_metadata | brand_id_in_table | created_at
------------|--------------------|--------------------- |-------------------|------------
uuid-123... | test123@acme.com   | acme                 | acme              | 2025-11-25...
```

---

### **Common Issues & Fixes**

#### **Issue 1: Trigger not firing**
**Symptom:** User in `auth.users` but not in `brand_users`

**Fix:**
```sql
-- Manually backfill existing users
INSERT INTO brand_users (user_id, brand_id)
SELECT 
  id as user_id,
  raw_user_meta_data->>'brand_id' as brand_id
FROM auth.users
WHERE raw_user_meta_data->>'brand_id' IS NOT NULL
ON CONFLICT (user_id, brand_id) DO NOTHING;
```

#### **Issue 2: Brand not in metadata**
**Symptom:** `brand_id_in_metadata` is NULL

**Fix:** The frontend isn't sending brand_id. Check `AuthClient.signUp()` method.

#### **Issue 3: Email domain not recognized**
**Symptom:** "Invalid email domain" error

**Fix:** Check `packages/tenant-config/src/index.ts` has correct email domains:
```typescript
emailDomains: ['acme.com', 'globex.com']
```

---

### **Step 6: Enable Supabase Email Confirmations (Optional)**

If you want to test email verification:

1. **Go to:** https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/auth/users
2. **Click Settings**
3. **Enable "Confirm email"**
4. **Set redirect URL:** http://localhost:3000/auth/callback

---

### **Quick Debug Commands**

**Check everything at once:**
```sql
-- Run this to see full status
SELECT 'Tables' as type, COUNT(*) as count FROM information_schema.tables WHERE table_name IN ('brands', 'brand_users')
UNION ALL SELECT 'Brands', COUNT(*) FROM brands
UNION ALL SELECT 'Auth Users', COUNT(*) FROM auth.users
UNION ALL SELECT 'Brand Users', COUNT(*) FROM brand_users
UNION ALL SELECT 'Trigger', COUNT(*) FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
```

**Expected:**
```
type         | count
-------------|-------
Tables       | 2
Brands       | 2
Auth Users   | 0+
Brand Users  | 0+
Trigger      | 1
```

---

### **Still Having Issues?**

1. **Check browser console (F12)** - Copy the exact error message
2. **Check Supabase logs** - https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/logs/explorer
3. **Run verification script** - `verify-db.sql`
4. **Share the error message** - I can help debug further

---

## **Next Steps After Fix:**

Once everything works:

1. ✅ Sign up with `test@acme.com`
2. ✅ Verify user in `brand_users` table
3. ✅ Sign up with `test@globex.com`
4. ✅ Verify brand isolation works
5. ✅ Run Playwright tests: `npm run test:ui`

**The dynamic brand architecture is ready - just need to complete the database setup!** 🚀
