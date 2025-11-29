import { test, expect } from '@playwright/test';

test('debug signup flow and capture errors', async ({ page }) => {
  // Capture console messages
  const consoleMessages: string[] = [];
  const errors: string[] = [];
  
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      errors.push(text);
    }
  });

  // Capture network errors
  page.on('response', response => {
    if (!response.ok()) {
      errors.push(`Network error: ${response.status()} ${response.url()}`);
    }
  });

  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take screenshot of initial state
  await page.screenshot({ path: 'screenshots/01-initial.png', fullPage: true });
  
  // Click on Sign Up tab
  await page.click('button:has-text("Sign Up")');
  await page.waitForTimeout(500);
  
  // Take screenshot of signup form
  await page.screenshot({ path: 'screenshots/02-signup-form.png', fullPage: true });
  
  // Fill in the form
  await page.fill('#signup-email', 'test@acme.com');
  await page.fill('#signup-password', 'password123');
  
  // Take screenshot before submit
  await page.screenshot({ path: 'screenshots/03-before-submit.png', fullPage: true });
  
  // Click Create Account button
  await page.click('button:has-text("Create Account")');
  
  // Wait for response
  await page.waitForTimeout(3000);
  
  // Take screenshot after submit
  await page.screenshot({ path: 'screenshots/04-after-submit.png', fullPage: true });
  
  // Check for alert dialog
  const alertText = await page.evaluate(() => {
    return (window as any).lastAlertMessage || 'No alert';
  });
  
  // Print all captured information
  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));
  
  console.log('\n=== ERRORS ===');
  errors.forEach(err => console.log(err));
  
  console.log('\n=== ALERT ===');
  console.log(alertText);
  
  // Check if there's an error message on the page
  const errorOnPage = await page.textContent('body');
  console.log('\n=== PAGE CONTENT (last 500 chars) ===');
  console.log(errorOnPage?.slice(-500));
  
  // Fail the test to show all output
  expect(errors.length).toBe(0);
});
