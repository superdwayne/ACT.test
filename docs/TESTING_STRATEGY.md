# Testing Strategy for ACT Monorepo

## 🎯 What We Need to Test

### **1. Email Domain Matching**
- ✅ `user@acme.com` → Assigned to ACME
- ✅ `user@globex.com` → Assigned to Globex
- ❌ `user@gmail.com` → Rejected

### **2. Authentication Flow**
- ✅ Signup with company email
- ✅ Email verification
- ✅ Login with verified email
- ✅ Brand isolation (can't see other brand's data)

### **3. Multi-Brand Isolation**
- ✅ ACME users see only ACME data
- ✅ Globex users see only Globex data
- ✅ RLS policies enforce isolation

## 🛠️ Testing Tools

### **Option 1: Supabase Local (Best for Development)**

#### Setup:
```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Start local Supabase
cd /Users/dwayne/Documents/Playground/ACT.test
supabase init
supabase start
```

#### Benefits:
- ✅ **Local database** - No production data risk
- ✅ **Fast reset** - `supabase db reset` clears everything
- ✅ **Email testing** - Uses Inbucket (local email viewer)
- ✅ **Free** - No API limits

#### Email Testing:
- Local emails appear at: http://localhost:54324
- No real emails sent
- Instant verification links

---

### **Option 2: Playwright E2E Tests (Best for CI/CD)**

#### Setup:
```bash
npm install -D @playwright/test
npx playwright install
```

#### Example Test:
```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test('ACME user signup and login', async ({ page }) => {
  // 1. Go to app
  await page.goto('http://localhost:3000');
  
  // 2. Click Sign Up
  await page.click('text=Sign Up');
  
  // 3. Fill form with ACME email
  await page.fill('input[type="email"]', 'test@acme.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Create Account")');
  
  // 4. Check success message
  await expect(page.locator('text=check your email')).toBeVisible();
  
  // 5. Verify brand assignment in database
  // (would need to query Supabase directly)
});

test('Gmail email rejected', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Sign Up');
  await page.fill('input[type="email"]', 'user@gmail.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Create Account")');
  
  // Should see error
  await expect(page.locator('text=company email')).toBeVisible();
});
```

#### Benefits:
- ✅ **Real browser testing**
- ✅ **Automated CI/CD**
- ✅ **Visual regression testing**
- ✅ **Cross-browser support**

---

### **Option 3: Jest + React Testing Library (Unit Tests)**

#### Setup:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

#### Example Test:
```typescript
// packages/auth/src/__tests__/validation.test.ts
import { getBrandFromEmail, isEmailDomainAllowed } from '@act/tenant-config';

describe('Email Domain Matching', () => {
  test('detects ACME email', () => {
    expect(getBrandFromEmail('user@acme.com')).toBe('acme');
    expect(getBrandFromEmail('user@acmelabs.com')).toBe('acme');
  });

  test('detects Globex email', () => {
    expect(getBrandFromEmail('user@globex.com')).toBe('globex');
  });

  test('rejects non-company email', () => {
    expect(getBrandFromEmail('user@gmail.com')).toBeNull();
    expect(isEmailDomainAllowed('user@gmail.com')).toBe(false);
  });
});
```

#### Benefits:
- ✅ **Fast** - No browser needed
- ✅ **Isolated** - Test individual functions
- ✅ **Coverage reports**
- ✅ **Easy to debug**

---

### **Option 4: Manual Testing with Temp Email Services**

For quick end-to-end testing without local setup:

#### Services:
- **Mailinator** - https://www.mailinator.com
- **Temp Mail** - https://temp-mail.org
- **10 Minute Mail** - https://10minutemail.com

#### How to Use:
1. Get temp email: `test123@mailinator.com`
2. Add domain to your config temporarily:
   ```typescript
   emailDomains: ['acme.com', 'mailinator.com']  // ← Add for testing
   ```
3. Sign up with temp email
4. Check inbox at mailinator.com
5. Click verification link
6. Test login

#### Benefits:
- ✅ **No setup** - Just use the service
- ✅ **Real emails** - Tests actual Supabase flow
- ✅ **Quick** - For one-off testing

---

## 🎯 Recommended Testing Strategy

### **For Development:**
```
1. Supabase Local → Test database + emails locally
2. Jest → Unit test email domain logic
3. Manual → Quick verification in browser
```

### **For CI/CD:**
```
1. Jest → Unit tests (fast)
2. Playwright → E2E tests (comprehensive)
3. Supabase Local → Isolated test database
```

### **For Production Verification:**
```
1. Temp email service → Test real Supabase
2. Manual testing → Verify UI/UX
3. Monitor logs → Check for errors
```

---

## 📝 Quick Test Checklist

### **Email Domain Matching:**
- [ ] `user@acme.com` → ACME brand
- [ ] `user@globex.com` → Globex brand
- [ ] `user@gmail.com` → Error message
- [ ] Case insensitive (`User@ACME.com` works)

### **Signup Flow:**
- [ ] Valid email + password → Success
- [ ] Weak password → Error
- [ ] Invalid email format → Error
- [ ] Email sent to inbox
- [ ] Verification link works

### **Login Flow:**
- [ ] Unverified user → Can't login
- [ ] Verified user → Can login
- [ ] Wrong password → Error
- [ ] Wrong brand → Error (if cross-brand login attempted)

### **Brand Isolation:**
- [ ] ACME user sees ACME dashboard
- [ ] ACME user can't query Globex data
- [ ] Database policies enforce isolation
- [ ] Storage buckets are brand-specific

---

## 🚀 Quick Start: Local Testing

### **1. Start Local Supabase:**
```bash
supabase start
# Note the API URL and anon key
```

### **2. Update .env.local:**
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
```

### **3. Run Migrations:**
```bash
supabase db reset
# Applies all migrations from supabase/migrations/
```

### **4. View Local Emails:**
Open: http://localhost:54324

### **5. Test Signup:**
- Use any email (no verification needed locally)
- Check Inbucket for verification email
- Click link to verify

---

## 🎓 What `supabase-test` Package Does

The `supabase-test` package is for:
- ✅ Testing Supabase Edge Functions
- ✅ Mocking Supabase client
- ✅ Unit testing database queries

**NOT for:**
- ❌ E2E authentication testing
- ❌ Email verification testing
- ❌ Multi-brand isolation testing

---

## 💡 Best Practice

**Use a combination:**
1. **Jest** - Fast unit tests for logic
2. **Supabase Local** - Test database + auth locally
3. **Playwright** - E2E tests for critical flows
4. **Manual** - Final verification before deploy

This gives you:
- ✅ Fast feedback (Jest)
- ✅ Confidence (E2E tests)
- ✅ Safety (Local testing)
- ✅ Quality (Manual checks)
