# How to Apply Migrations to Supabase

## 🎯 Quick Steps

### **Step 1: Open Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/sql
2. Click **"New Query"**

### **Step 2: Copy the Migration Script**
1. Open the file: `supabase/apply-migrations.sql`
2. Copy ALL the contents (Cmd+A, Cmd+C)

### **Step 3: Run the Migration**
1. Paste the SQL into the Supabase SQL Editor
2. Click **"Run"** button (or press Cmd+Enter)
3. Wait for it to complete (should take ~2 seconds)

### **Step 4: Verify Success**
You should see a result table showing:
```
table_name      | row_count
----------------|----------
brands          | 2
brand_users     | 0
brand_uploads   | 0
brand_settings  | 2
```

## ✅ What Gets Created

### **Tables:**
- ✅ `brands` - ACME and Globex brands
- ✅ `brand_users` - User-brand associations
- ✅ `brand_uploads` - File uploads per brand
- ✅ `brand_settings` - Brand-specific settings

### **Security:**
- ✅ Row Level Security (RLS) enabled
- ✅ Policies for brand isolation
- ✅ Automatic user-brand linking on signup
- ✅ Storage bucket for uploads

### **Triggers:**
- ✅ `handle_new_user()` - Auto-assigns users to brands on signup

## 🧪 Test It Works

After running the migration, try signing up in your app:

1. Go to http://localhost:3000
2. Click "Sign Up" tab
3. Create an account with:
   - Email: `test@acme.com`
   - Password: `password123`
4. Check your Supabase dashboard:
   - Go to **Table Editor** → **brand_users**
   - You should see your new user linked to "acme" brand!

## 🔍 Verify in Supabase Dashboard

### Check Tables:
1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/editor
2. You should see these tables:
   - `brands`
   - `brand_users`
   - `brand_uploads`
   - `brand_settings`

### Check Data:
Click on `brands` table - you should see:
```
id     | name   | display_name
-------|--------|-------------
acme   | acme   | Acme Labs
globex | globex | Globex Corp
```

## ⚠️ Troubleshooting

### Error: "relation already exists"
- This is OK! It means the table was already created
- The migration uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times

### Error: "permission denied"
- Make sure you're logged into the correct Supabase project
- Check you have admin access to the project

### No tables showing up
- Refresh the page
- Check you're in the correct schema (should be `public`)
- Try running the query again

## 🎉 Success!

Once migrations are applied, your app will:
- ✅ Automatically link new users to their brand
- ✅ Enforce brand isolation at the database level
- ✅ Support file uploads per brand
- ✅ Store brand-specific settings

Your monorepo is now fully connected to Supabase with proper multi-tenant setup!
