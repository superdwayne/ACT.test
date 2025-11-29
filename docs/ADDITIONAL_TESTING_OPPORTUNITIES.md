# Additional Testing Opportunities for ACT Monorepo

## 🎯 What Else Can We Test?

### **1. Authentication Flow (End-to-End)**

#### **Email Verification Flow**
```typescript
test('complete signup with email verification', async ({ page }) => {
  // 1. Sign up
  // 2. Check email inbox (using Mailinator API or Supabase local)
  // 3. Extract verification link
  // 4. Click verification link
  // 5. Verify user can now log in
  // 6. Check user is in correct brand
});
```

**Why Test This:**
- ✅ Ensures email delivery works
- ✅ Verifies verification links are valid
- ✅ Confirms users can't login before verification

#### **Login Flow**
```typescript
test('user can login after verification', async ({ page }) => {
  // 1. Use pre-verified test account
  // 2. Enter credentials
  // 3. Submit login form
  // 4. Verify redirect to dashboard
  // 5. Check user data displays correctly
});
```

#### **Logout Flow**
```typescript
test('user can logout', async ({ page }) => {
  // 1. Login
  // 2. Click logout button
  // 3. Verify redirect to login page
  // 4. Verify can't access protected routes
});
```

#### **Password Reset Flow**
```typescript
test('user can reset password', async ({ page }) => {
  // 1. Click "Forgot Password"
  // 2. Enter email
  // 3. Check email for reset link
  // 4. Click reset link
  // 5. Enter new password
  // 6. Login with new password
});
```

---

### **2. Brand Isolation Testing**

#### **Database-Level Isolation**
```typescript
test('ACME user cannot see Globex data', async ({ page, context }) => {
  // 1. Create ACME user and login
  // 2. Try to query Globex data via API
  // 3. Verify 403 Forbidden or empty results
  // 4. Check RLS policies are enforced
});

test('Globex user cannot see ACME data', async ({ page, context }) => {
  // Similar test for Globex user
});
```

**Why Test This:**
- ✅ Critical security requirement
- ✅ Ensures RLS policies work
- ✅ Prevents data leaks between brands

#### **Cross-Brand Login Prevention**
```typescript
test('ACME user cannot login to Globex app', async ({ page }) => {
  // 1. Create ACME user
  // 2. Try to login on Globex subdomain
  // 3. Verify rejection with brand mismatch error
});
```

#### **Storage Bucket Isolation**
```typescript
test('ACME uploads not visible to Globex', async ({ page }) => {
  // 1. Upload file as ACME user
  // 2. Login as Globex user
  // 3. Try to access ACME file URL
  // 4. Verify 403 Forbidden
});
```

---

### **3. API Testing**

#### **Supabase API Endpoints**
```typescript
test('API respects brand isolation', async ({ request }) => {
  // 1. Get ACME user token
  // 2. Query brand_uploads table
  // 3. Verify only ACME uploads returned
  // 4. Try to query with Globex brand_id
  // 5. Verify empty results or error
});
```

#### **Rate Limiting**
```typescript
test('API rate limiting works', async ({ request }) => {
  // 1. Make 100 rapid requests
  // 2. Verify rate limit kicks in
  // 3. Check 429 Too Many Requests response
});
```

#### **Authentication Headers**
```typescript
test('API requires valid auth token', async ({ request }) => {
  // 1. Call API without token
  // 2. Verify 401 Unauthorized
  // 3. Call with invalid token
  // 4. Verify 401 Unauthorized
  // 5. Call with valid token
  // 6. Verify 200 OK
});
```

---

### **4. Multi-Brand Testing**

#### **Parallel Brand Testing**
```typescript
test('ACME and Globex apps work simultaneously', async ({ browser }) => {
  // 1. Open ACME app in context 1
  // 2. Open Globex app in context 2
  // 3. Login to both
  // 4. Verify data isolation
  // 5. Verify no cross-contamination
});
```

#### **Brand-Specific Features**
```typescript
test('ACME has chat enabled, Globex does not', async ({ page }) => {
  // 1. Login to ACME
  // 2. Verify chat widget visible
  // 3. Login to Globex
  // 4. Verify chat widget hidden
});
```

#### **Brand Settings**
```typescript
test('brand settings are applied correctly', async ({ page }) => {
  // 1. Check ACME primary color (#2563eb)
  // 2. Check Globex primary color (#7c3aed)
  // 3. Verify logo paths
  // 4. Verify feature flags
});
```

---

### **5. Performance Testing**

#### **Page Load Times**
```typescript
test('dashboard loads in under 2 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('/dashboard');
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(2000);
});
```

#### **API Response Times**
```typescript
test('API responds in under 500ms', async ({ request }) => {
  const start = Date.now();
  await request.get('/api/users');
  const responseTime = Date.now() - start;
  expect(responseTime).toBeLessThan(500);
});
```

#### **Large Dataset Handling**
```typescript
test('handles 1000+ records efficiently', async ({ page }) => {
  // 1. Seed database with 1000 records
  // 2. Load list page
  // 3. Verify pagination works
  // 4. Verify no performance degradation
});
```

---

### **6. Accessibility Testing**

#### **Keyboard Navigation**
```typescript
test('can navigate form with keyboard only', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab'); // Focus email
  await page.keyboard.type('user@acme.com');
  await page.keyboard.press('Tab'); // Focus password
  await page.keyboard.type('password123');
  await page.keyboard.press('Enter'); // Submit
});
```

#### **Screen Reader Support**
```typescript
test('form has proper ARIA labels', async ({ page }) => {
  await page.goto('/');
  
  // Check for aria-label or aria-labelledby
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toHaveAttribute('aria-label');
  
  const passwordInput = page.locator('input[type="password"]');
  await expect(passwordInput).toHaveAttribute('aria-label');
});
```

#### **Color Contrast**
```typescript
test('meets WCAG AA contrast requirements', async ({ page }) => {
  // Use axe-core or similar tool
  // Check color contrast ratios
  // Verify 4.5:1 for normal text
  // Verify 3:1 for large text
});
```

---

### **7. Security Testing**

#### **XSS Prevention**
```typescript
test('prevents XSS attacks', async ({ page }) => {
  const xssPayload = '<script>alert("XSS")</script>';
  
  await page.fill('input[id="signup-email"]', `test@acme.com`);
  await page.fill('input[id="signup-password"]', xssPayload);
  await page.click('button:has-text("Create Account")');
  
  // Verify script didn't execute
  // Check for escaped HTML
});
```

#### **SQL Injection Prevention**
```typescript
test('prevents SQL injection', async ({ request }) => {
  const sqlPayload = "'; DROP TABLE users; --";
  
  const response = await request.post('/api/login', {
    data: {
      email: sqlPayload,
      password: 'password123'
    }
  });
  
  // Verify error response, not SQL execution
  expect(response.status()).toBe(400);
});
```

#### **CSRF Protection**
```typescript
test('requires CSRF token for state-changing operations', async ({ request }) => {
  // 1. Try POST without CSRF token
  // 2. Verify 403 Forbidden
  // 3. Get CSRF token
  // 4. Retry with token
  // 5. Verify success
});
```

---

### **8. Error Handling**

#### **Network Errors**
```typescript
test('handles network failure gracefully', async ({ page, context }) => {
  // 1. Start signup
  // 2. Simulate network offline
  await context.setOffline(true);
  // 3. Submit form
  // 4. Verify error message
  // 5. Restore network
  await context.setOffline(false);
  // 6. Retry and verify success
});
```

#### **Server Errors**
```typescript
test('handles 500 errors gracefully', async ({ page, route }) => {
  // Mock API to return 500
  await route('**/api/**', route => route.fulfill({
    status: 500,
    body: 'Internal Server Error'
  }));
  
  // Verify user-friendly error message
  await expect(page.locator('text=/something went wrong/i')).toBeVisible();
});
```

#### **Invalid Data**
```typescript
test('handles malformed API responses', async ({ page, route }) => {
  // Mock API to return invalid JSON
  await route('**/api/users', route => route.fulfill({
    status: 200,
    body: 'not valid json'
  }));
  
  // Verify app doesn't crash
  // Verify error handling
});
```

---

### **9. Mobile/Responsive Testing**

#### **Mobile Viewport**
```typescript
test('works on mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  await page.goto('/');
  
  // Verify layout adapts
  // Verify buttons are tappable
  // Verify text is readable
});
```

#### **Tablet Viewport**
```typescript
test('works on tablet viewport', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 }); // iPad
  await page.goto('/');
  
  // Verify responsive design
});
```

#### **Touch Gestures**
```typescript
test('supports touch gestures', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Test swipe, tap, pinch-to-zoom
  // Verify touch targets are 44x44px minimum
});
```

---

### **10. Integration Testing**

#### **Supabase Integration**
```typescript
test('Supabase connection works', async ({ request }) => {
  // 1. Query Supabase directly
  // 2. Verify connection
  // 3. Check RLS policies
  // 4. Verify triggers fire
});
```

#### **Email Service Integration**
```typescript
test('emails are sent correctly', async () => {
  // 1. Trigger email (signup, reset, etc.)
  // 2. Check email service logs
  // 3. Verify email content
  // 4. Verify links work
});
```

#### **Storage Integration**
```typescript
test('file uploads work', async ({ page }) => {
  // 1. Login
  // 2. Upload file
  // 3. Verify file in Supabase Storage
  // 4. Verify file accessible
  // 5. Verify brand isolation
});
```

---

### **11. Regression Testing**

#### **Critical User Flows**
```typescript
test('complete user journey works', async ({ page }) => {
  // 1. Visit homepage
  // 2. Sign up
  // 3. Verify email
  // 4. Login
  // 5. Upload file
  // 6. View dashboard
  // 7. Update profile
  // 8. Logout
});
```

#### **Bug Prevention**
```typescript
test('previous bug #123 does not reoccur', async ({ page }) => {
  // Test specific bug that was fixed
  // Ensure it doesn't come back
});
```

---

### **12. Visual Regression Testing**

#### **Screenshot Comparison**
```typescript
test('homepage matches design', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

#### **Component Snapshots**
```typescript
test('button styles are consistent', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('button:has-text("Sign In")');
  await expect(button).toHaveScreenshot('sign-in-button.png');
});
```

---

## 🎯 Priority Recommendations

### **High Priority (Do Next):**
1. ✅ **Login flow** - Critical user path
2. ✅ **Brand isolation** - Security requirement
3. ✅ **Email verification** - Complete auth flow
4. ✅ **API authentication** - Backend security

### **Medium Priority:**
1. ⚠️ **Password reset** - Common user need
2. ⚠️ **Error handling** - Better UX
3. ⚠️ **Mobile responsive** - User experience
4. ⚠️ **Performance** - Load times

### **Low Priority (Nice to Have):**
1. 📝 **Accessibility** - WCAG compliance
2. 📝 **Visual regression** - Design consistency
3. 📝 **Security scanning** - XSS, SQL injection
4. 📝 **Load testing** - Scalability

---

## 🛠️ Testing Tools to Consider

### **For API Testing:**
- **Supertest** - HTTP assertions
- **Postman/Newman** - API testing
- **Artillery** - Load testing

### **For Accessibility:**
- **axe-core** - Automated a11y testing
- **Pa11y** - Accessibility checker
- **Lighthouse** - Performance + a11y

### **For Visual Regression:**
- **Percy** - Visual testing platform
- **Chromatic** - Storybook visual testing
- **BackstopJS** - Screenshot comparison

### **For Security:**
- **OWASP ZAP** - Security scanner
- **Snyk** - Dependency vulnerabilities
- **npm audit** - Package security

---

## 📊 Test Coverage Goals

### **Current Coverage:**
- ✅ Email domain validation
- ✅ Password strength
- ✅ UI components
- ✅ Form validation

### **Target Coverage:**
- 🎯 80%+ code coverage
- 🎯 100% critical paths
- 🎯 All user-facing features
- 🎯 All API endpoints
- 🎯 All security boundaries

---

## 🚀 Next Steps

1. **Choose priority tests** from the list above
2. **Implement 3-5 high-priority tests**
3. **Run tests in CI/CD**
4. **Monitor test results**
5. **Iterate and improve**

Would you like me to implement any of these specific tests?
