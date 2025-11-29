# 🔧 CORS Fix - Complete Guide

## The Problem

Your signup is failing with this error:
```
Access to fetch at 'https://xlakgtzjsjlswvgjicrs.supabase.co/auth/v1/signup' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

This means Supabase is rejecting requests from localhost because it's not in the allowed origins list.

---

## ✅ Solution: Update Supabase Auth Configuration

### **Method 1: Supabase Dashboard (Easiest - 2 minutes)**

1. **Open this URL:**
   https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/settings/auth

2. **Scroll to "Site URL"**
   - Change from current value to: `http://localhost:3000`
   - Click Save

3. **Scroll to "Redirect URLs"**
   - Click "Add URL"
   - Add: `http://localhost:3000/**`
   - Click "Add URL" again
   - Add: `http://localhost:3000/auth/callback`
   - Click "Add URL" again
   - Add: `http://127.0.0.1:3000/**`
   - Click Save

4. **Done!** Test signup again.

---

### **Method 2: Via Supabase API (If you prefer automation)**

Run this in your terminal:

```bash
# Set your Supabase access token
export SUPABASE_ACCESS_TOKEN="your-access-token-here"

# Update site URL
curl -X PATCH \
  "https://api.supabase.com/v1/projects/xlakgtzjsjlswvgjicrs/config/auth" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "SITE_URL": "http://localhost:3000",
    "URI_ALLOW_LIST": "http://localhost:3000/**,http://localhost:3000/auth/callback,http://127.0.0.1:3000/**"
  }'
```

To get your access token:
1. Go to: https://supabase.com/dashboard/account/tokens
2. Generate a new token
3. Copy it and use in the command above

---

### **Method 3: Temporary Workaround (For Testing Only)**

If you can't access the dashboard right now, you can temporarily disable CORS checking in your browser for testing:

**Chrome/Edge:**
```bash
# Close all Chrome windows first, then run:
open -na "Google Chrome" --args --disable-web-security --user-data-dir="/tmp/chrome_dev"
```

**⚠️ WARNING:** This is ONLY for testing! Never use this for production.

---

## 🧪 After Fixing CORS

1. **Refresh the app:** http://localhost:3000
2. **Open console (F12)**
3. **Try signing up:**
   - Email: `test@acme.com`
   - Password: `password123`
4. **Should work!** ✅

---

## 🔍 Verify It's Fixed

After updating the settings, you can verify by checking the response headers:

```javascript
// Run this in browser console
fetch('https://xlakgtzjsjlswvgjicrs.supabase.co/auth/v1/health')
  .then(r => {
    console.log('CORS headers:', {
      'access-control-allow-origin': r.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': r.headers.get('access-control-allow-methods')
    });
  });
```

Should show: `access-control-allow-origin: http://localhost:3000`

---

## 📋 Current Settings (What They Should Be)

| Setting | Current (Wrong) | Should Be |
|---------|----------------|-----------|
| Site URL | (unknown) | `http://localhost:3000` |
| Redirect URLs | (unknown) | `http://localhost:3000/**`<br>`http://localhost:3000/auth/callback`<br>`http://127.0.0.1:3000/**` |

---

## 🎯 Why This Happened

When you create a Supabase project, it doesn't automatically allow localhost. You need to explicitly add it to the allowed origins list. This is a security feature to prevent unauthorized domains from accessing your auth endpoints.

---

## ✅ Next Steps After Fix

1. ✅ Fix CORS (use Method 1 above)
2. ✅ Test signup with `test@acme.com`
3. ✅ Verify user created in Supabase
4. ✅ Check `brand_users` table
5. ✅ Test with different brands (`test@globex.com`)
6. ✅ Run Playwright tests: `npm run test:ui`

---

**Go to the dashboard link above and update the settings now!** 🚀
