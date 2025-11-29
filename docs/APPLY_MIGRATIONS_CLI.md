# Applying Migrations via Supabase CLI

## ✅ What We Fixed

Updated all migration files to be **idempotent** (safe to run multiple times) by adding:
- `DROP POLICY IF EXISTS` before creating policies
- `CREATE OR REPLACE FUNCTION` for functions
- `CREATE TABLE IF NOT EXISTS` for tables
- `ON CONFLICT DO NOTHING` for inserts

## 🚀 Apply Migrations

### **Option 1: Supabase CLI (Recommended)**

```bash
# Navigate to project root
cd /Users/dwayne/Documents/Playground/ACT.test

# Push all migrations
supabase db push --include-all
```

When prompted:
```
Do you want to push these migrations to the remote database?
 • 20241124000000_multi_tenant_setup.sql
 • 20251118190000_create_brand_settings.sql
 • 20251125000000_safe_migration.sql

 [Y/n]
```

Type `y` and press Enter.

### **Option 2: Supabase Dashboard (Alternative)**

If CLI doesn't work:

1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/sql
2. Copy contents of: `supabase/migrations/20251125000000_safe_migration.sql`
3. Paste in SQL Editor
4. Click "Run"

## 📋 What Gets Created

### **Tables:**
- ✅ `brands` - ACME, Globex configurations
- ✅ `brand_users` - User-brand associations
- ✅ `brand_uploads` - File uploads per brand
- ✅ `brand_settings` - Brand-specific settings

### **RLS Policies:**
- ✅ Users can only see their own brand data
- ✅ Users can only upload to their brand
- ✅ Automatic filtering by brand_id

### **Trigger:**
- ✅ `on_auth_user_created` - Auto-assigns users to brands
- ✅ Reads `brand_id` from `user_metadata`
- ✅ Creates `brand_users` record

### **Storage:**
- ✅ `brand-uploads` bucket
- ✅ Brand-isolated file access

## 🔍 Verify Migration Success

After running migrations, verify in Supabase Dashboard:

### **Check Tables:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('brands', 'brand_users', 'brand_uploads', 'brand_settings');
```

Should return 4 rows.

### **Check Data:**
```sql
SELECT * FROM brands;
```

Should show:
```
id     | name   | display_name
-------|--------|-------------
acme   | acme   | Acme Labs
globex | globex | Globex Corp
```

### **Check Trigger:**
```sql
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

Should return the trigger on `auth.users` table.

### **Check RLS Policies:**
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('brand_users', 'brand_uploads', 'brand_settings');
```

Should show all policies.

## 🧪 Test the Migration

### **1. Sign Up a Test User:**

```bash
# Start the app
npm run dev:acme

# Open browser
http://localhost:3000

# Sign up
Email: test@acme.com
Password: password123
```

### **2. Check Database:**

```sql
-- Check user was created
SELECT id, email, raw_user_meta_data->>'brand_id' as brand_id
FROM auth.users
WHERE email = 'test@acme.com';

-- Check brand_users record was created
SELECT user_id, brand_id
FROM brand_users
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'test@acme.com');
```

Should show:
- User with `brand_id = 'acme'` in metadata
- `brand_users` record linking user to ACME

## 🐛 Troubleshooting

### **Error: "policy already exists"**

This means migrations were partially applied. The fixed migrations now use `DROP POLICY IF EXISTS`, so rerun:

```bash
supabase db push --include-all
```

### **Error: "Cannot connect to Docker daemon"**

This is for local development only. For remote database, Docker is not needed. Just use:

```bash
supabase db push --include-all
```

### **Error: "relation already exists"**

This is fine! The migrations use `CREATE TABLE IF NOT EXISTS`, so they skip existing tables.

### **Want to Start Fresh?**

**⚠️ WARNING: This deletes all data!**

```sql
-- In Supabase SQL Editor
DROP TABLE IF EXISTS brand_settings CASCADE;
DROP TABLE IF EXISTS brand_uploads CASCADE;
DROP TABLE IF EXISTS brand_users CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
```

Then rerun migrations.

## ✅ Success Checklist

After migrations complete:

- [ ] Tables created (`brands`, `brand_users`, `brand_uploads`, `brand_settings`)
- [ ] Default brands inserted (ACME, Globex)
- [ ] RLS policies active
- [ ] Trigger `on_auth_user_created` exists
- [ ] Storage bucket `brand-uploads` created
- [ ] Test signup works
- [ ] User assigned to correct brand
- [ ] Brand data isolated

## 🎯 Next Steps

Once migrations are applied:

1. ✅ **Test signup flow**
   ```bash
   npm run dev:acme
   # Sign up with test@acme.com
   ```

2. ✅ **Verify brand assignment**
   ```sql
   SELECT * FROM brand_users;
   ```

3. ✅ **Test brand isolation**
   - Sign up ACME user
   - Sign up Globex user
   - Verify they see different data

4. ✅ **Run Playwright tests**
   ```bash
   npm run test:ui
   ```

## 📚 Migration Files

### **Current Migrations:**
1. `20241124000000_multi_tenant_setup.sql` - Main setup (fixed)
2. `20251118190000_create_brand_settings.sql` - Brand settings
3. `20251125000000_safe_migration.sql` - Safe idempotent version

All three are now safe to run multiple times!

## 🚀 Ready to Test!

Once migrations are applied, your dynamic brand architecture is live:

- ✅ Users sign up with company email
- ✅ Brand auto-detected from email domain
- ✅ Brand stored in user metadata
- ✅ Trigger creates brand_users record
- ✅ RLS filters data by brand
- ✅ Brand context available in app

**Run the migrations and test!** 🎉
