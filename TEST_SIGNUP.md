# Test Signup - Get Exact Error

## Quick Test Steps

1. **Open the app:** http://localhost:3000

2. **Open Browser Console:**
   - Press F12
   - Go to Console tab

3. **Click "Sign Up" tab**

4. **Fill in the form:**
   - Email: `test@acme.com`
   - Password: `password123`

5. **Click "Create Account"**

6. **Copy the error message** from the alert or console

---

## What I Need From You

Please copy and paste:

1. **The alert message** (if any appears)
2. **Console errors** (red text in console)
3. **Network tab** - Any failed requests (red)

---

## Common Issues & Quick Fixes

### Issue 1: "Please use your company email address"
**This means:** Email domain validation is working
**Fix:** Make sure you're using `@acme.com` or `@globex.com`

### Issue 2: "Database error saving new user"  
**This means:** Trigger failed
**Fix:** Already fixed - trigger exists in database

### Issue 3: "User already registered"
**This means:** Email already exists
**Fix:** Try a different email like `test2@acme.com`

### Issue 4: "Password must be at least 6 characters"
**This means:** Password validation working
**Fix:** Use longer password

### Issue 5: Network error or timeout
**This means:** Can't reach Supabase
**Fix:** Check internet connection

### Issue 6: "Email confirmation required"
**This means:** Supabase requires email verification
**Fix:** Check email for verification link

---

## Debug in Console

You can also test the signup directly in browser console:

```javascript
// Open console (F12) and paste this:
const testSignup = async () => {
  try {
    const response = await fetch('https://xlakgtzjsjlswvgjicrs.supabase.co/auth/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q'
      },
      body: JSON.stringify({
        email: 'test@acme.com',
        password: 'password123',
        data: {
          brand_id: 'acme'
        }
      })
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ SUCCESS! User created:', data);
    } else {
      console.error('❌ ERROR:', data);
    }
  } catch (error) {
    console.error('❌ NETWORK ERROR:', error);
  }
};

testSignup();
```

This will show you the exact Supabase response!

---

## What to Share

Please share:
1. ✅ Alert message (if any)
2. ✅ Console errors
3. ✅ Result from the test script above

This will tell me exactly what's wrong! 🔍
