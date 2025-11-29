# Playwright E2E Tests for ACT Monorepo

## 🎯 What We Test

### **1. Email Domain Matching** (`auth-email-domain.spec.ts`)
- ✅ ACME emails (`@acme.com`, `@acmelabs.com`) are accepted
- ✅ Globex emails (`@globex.com`) are accepted
- ❌ Non-company emails (`@gmail.com`) are rejected
- ✅ Case insensitive domain matching

### **2. Authentication Validation** (`auth-validation.spec.ts`)
- ✅ Password strength requirements (6+ chars, letter + number)
- ✅ Email format validation
- ✅ Clear error messages for validation failures
- ✅ Strong passwords are accepted

### **3. UI Components** (`ui-components.spec.ts`)
- ✅ Brand name displayed correctly
- ✅ Tab switching works (Sign In ↔ Sign Up)
- ✅ Proper styling (gradient, shadows, etc.)
- ✅ Accessible labels and inputs
- ✅ Loading states

## 🚀 Running Tests

### **Run All Tests (Headless)**
```bash
npm test
```

### **Run Tests with UI (Interactive)**
```bash
npm run test:ui
```
This opens Playwright's interactive UI where you can:
- See tests running in real-time
- Debug failures
- Inspect DOM
- Time travel through test steps

### **Run Tests in Headed Mode (See Browser)**
```bash
npm run test:headed
```

### **Run Specific Test File**
```bash
npx playwright test tests/auth-email-domain.spec.ts
```

### **Run Tests in Debug Mode**
```bash
npx playwright test --debug
```

### **View Test Report**
```bash
npm run test:report
```

## 📊 Test Results

After running tests, you'll see:
```
Running 20 tests using 1 worker

  ✓ Email Domain Matching › should reject non-company email (gmail.com)
  ✓ Email Domain Matching › should accept ACME email (acme.com)
  ✓ Email Domain Matching › should accept Globex email (globex.com)
  ✓ Authentication Validation › should reject weak password
  ✓ UI Components › should switch between tabs
  
  20 passed (30s)
```

## 🔍 Test Coverage

### **What's Tested:**
- ✅ Email domain validation
- ✅ Password strength validation
- ✅ Email format validation
- ✅ UI component rendering
- ✅ Tab navigation
- ✅ Form submission
- ✅ Error messages
- ✅ Loading states

### **What's NOT Tested (Yet):**
- ⏳ Email verification flow (requires email access)
- ⏳ Login after signup
- ⏳ Brand isolation in database
- ⏳ Password reset flow
- ⏳ Multi-brand data isolation

## 🛠️ Test Structure

```
tests/
├── auth-email-domain.spec.ts    # Email domain matching tests
├── auth-validation.spec.ts      # Password & email validation
└── ui-components.spec.ts        # UI rendering & interaction
```

## 📝 Writing New Tests

### **Basic Test Template:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    await page.click('button:has-text("Sign Up")');
    
    // Act
    await page.fill('input[id="signup-email"]', 'test@acme.com');
    await page.click('button:has-text("Create Account")');
    
    // Assert
    await expect(page.locator('text=/success/i')).toBeVisible();
  });
});
```

## 🎓 Best Practices

### **1. Use Unique Emails**
```typescript
const timestamp = Date.now();
const email = `test${timestamp}@acme.com`;
```

### **2. Use Proper Selectors**
```typescript
// ✅ Good - specific IDs
await page.fill('input[id="signup-email"]', email);

// ❌ Bad - generic selectors
await page.fill('input[type="email"]', email);
```

### **3. Wait for Elements**
```typescript
await expect(page.locator('text=/success/i')).toBeVisible({ timeout: 5000 });
```

### **4. Test User Flows, Not Implementation**
```typescript
// ✅ Good - tests user behavior
test('user can sign up with company email', async ({ page }) => {
  await page.click('button:has-text("Sign Up")');
  await page.fill('input[id="signup-email"]', 'user@acme.com');
  await page.click('button:has-text("Create Account")');
  await expect(page.locator('text=/check your email/i')).toBeVisible();
});

// ❌ Bad - tests implementation details
test('AuthClient.signUp is called', async ({ page }) => {
  // Don't test internal functions
});
```

## 🐛 Debugging Failed Tests

### **1. View Screenshots**
Failed tests automatically capture screenshots:
```
test-results/
└── auth-email-domain-should-reject-non-company-email/
    └── test-failed-1.png
```

### **2. View Traces**
```bash
npx playwright show-trace test-results/trace.zip
```

### **3. Run in Debug Mode**
```bash
npx playwright test --debug tests/auth-email-domain.spec.ts
```

### **4. Use Console Logs**
```typescript
test('debug test', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));
  await page.goto('/');
});
```

## 🚀 CI/CD Integration

### **GitHub Actions Example:**
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Selectors Guide](https://playwright.dev/docs/selectors)
