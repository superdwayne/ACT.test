import { test, expect } from '@playwright/test';

/**
 * Email Domain Matching Tests
 * Tests that users are automatically assigned to brands based on email domain
 */

test.describe('Email Domain Matching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show sign up tab by default', async ({ page }) => {
    // Check that the page loads
    await expect(page.locator('text=Welcome to ACME Labs')).toBeVisible();
    
    // Check that Sign In and Sign Up tabs are visible
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible();
  });

  test('should reject non-company email (gmail.com)', async ({ page }) => {
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Fill in form with Gmail address
    await page.fill('input[id="signup-email"]', 'testuser@gmail.com');
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see error message about company email
    await expect(page.locator('text=/company email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should accept ACME email (acme.com)', async ({ page }) => {
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Generate unique email for this test
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    // Fill in form with ACME address
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see success message about checking email
    await expect(page.locator('text=/check your email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should accept alternate ACME domain (acmelabs.com)', async ({ page }) => {
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Generate unique email for this test
    const timestamp = Date.now();
    const email = `test${timestamp}@acmelabs.com`;
    
    // Fill in form with alternate ACME domain
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see success message
    await expect(page.locator('text=/check your email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should accept Globex email (globex.com)', async ({ page }) => {
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Generate unique email for this test
    const timestamp = Date.now();
    const email = `test${timestamp}@globex.com`;
    
    // Fill in form with Globex address
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see success message
    await expect(page.locator('text=/check your email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should be case insensitive (ACME.COM)', async ({ page }) => {
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Generate unique email with uppercase domain
    const timestamp = Date.now();
    const email = `test${timestamp}@ACME.COM`;
    
    // Fill in form
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see success message (domain should be normalized to lowercase)
    await expect(page.locator('text=/check your email/i')).toBeVisible({ timeout: 5000 });
  });
});
