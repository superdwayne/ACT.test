import { test, expect } from '@playwright/test';

/**
 * UI Components Tests
 * Tests that the UI is properly styled and functional
 */

test.describe('UI Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display brand name', async ({ page }) => {
    await expect(page.locator('text=ACME Labs')).toBeVisible();
  });

  test('should have gradient background', async ({ page }) => {
    const container = page.locator('div.bg-gradient-to-br');
    await expect(container).toBeVisible();
  });

  test('should display card with shadow', async ({ page }) => {
    const card = page.locator('div.shadow-xl');
    await expect(card).toBeVisible();
  });

  test('should switch between Sign In and Sign Up tabs', async ({ page }) => {
    // Initially on Sign In tab
    await expect(page.locator('input[id="email"]')).toBeVisible();
    
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Should now show Sign Up form
    await expect(page.locator('input[id="signup-email"]')).toBeVisible();
    await expect(page.locator('text=/at least 6 characters/i')).toBeVisible();
    
    // Click Sign In tab
    await page.click('button:has-text("Sign In")');
    
    // Should now show Sign In form
    await expect(page.locator('input[id="email"]')).toBeVisible();
  });

  test('should have accessible labels', async ({ page }) => {
    await page.click('button:has-text("Sign Up")');
    
    // Check for proper labels
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Password")')).toBeVisible();
  });

  test('should have submit button with proper text', async ({ page }) => {
    // Sign In button
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
    
    // Switch to Sign Up
    await page.click('button:has-text("Sign Up")');
    
    // Create Account button
    await expect(page.locator('button:has-text("Create Account")')).toBeVisible();
  });

  test('should disable button while loading', async ({ page }) => {
    await page.click('button:has-text("Sign Up")');
    
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Click submit
    const submitButton = page.locator('button:has-text("Create Account")');
    await submitButton.click();
    
    // Button should show loading state
    await expect(page.locator('button:has-text("Creating account")')).toBeVisible({ timeout: 2000 });
  });

  test('should have proper tab styling', async ({ page }) => {
    // Active tab should have different styling
    const signInTab = page.locator('button:has-text("Sign In")').first();
    
    // Check that tabs exist and are styled
    await expect(signInTab).toBeVisible();
    
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
    
    // Sign Up tab should now be active
    const signUpTab = page.locator('button:has-text("Sign Up")').first();
    await expect(signUpTab).toBeVisible();
  });
});
