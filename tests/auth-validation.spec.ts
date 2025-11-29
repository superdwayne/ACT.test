import { test, expect } from '@playwright/test';

/**
 * Authentication Validation Tests
 * Tests password strength, email format, and validation error messages
 */

test.describe('Authentication Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Click Sign Up tab
    await page.click('button:has-text("Sign Up")');
  });

  test('should reject weak password (too short)', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    // Fill in form with weak password
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', '12345'); // Only 5 characters
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see error about password length
    await expect(page.locator('text=/at least 6 characters/i')).toBeVisible({ timeout: 5000 });
  });

  test('should reject password without letter', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    // Fill in form with numbers-only password
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', '123456789');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see error about letter requirement
    await expect(page.locator('text=/at least one letter/i')).toBeVisible({ timeout: 5000 });
  });

  test('should reject password without number', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    // Fill in form with letters-only password
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'password');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see error about number requirement
    await expect(page.locator('text=/at least one number/i')).toBeVisible({ timeout: 5000 });
  });

  test('should reject invalid email format', async ({ page }) => {
    // Fill in form with invalid email
    await page.fill('input[id="signup-email"]', 'notanemail');
    await page.fill('input[id="signup-password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see error about email format
    await expect(page.locator('text=/invalid email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should accept strong password', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@acme.com`;
    
    // Fill in form with strong password
    await page.fill('input[id="signup-email"]', email);
    await page.fill('input[id="signup-password"]', 'SecurePass123!');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should see success message
    await expect(page.locator('text=/check your email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show password hint', async ({ page }) => {
    // Check that password hint is visible
    await expect(page.locator('text=/at least 6 characters/i')).toBeVisible();
  });

  test('should have proper input types', async ({ page }) => {
    // Email input should be type="email"
    const emailInput = page.locator('input[id="signup-email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
    
    // Password input should be type="password"
    const passwordInput = page.locator('input[id="signup-password"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have placeholders', async ({ page }) => {
    // Email should have placeholder
    const emailInput = page.locator('input[id="signup-email"]');
    await expect(emailInput).toHaveAttribute('placeholder', 'name@example.com');
    
    // Password should have placeholder
    const passwordInput = page.locator('input[id="signup-password"]');
    await expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
  });
});
