import { test, expect } from '@playwright/test';

test('sign up with ACME email and verify', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Click on Sign Up tab
  await page.click('button:has-text("Sign Up")');
  
  // Wait a moment for tab to switch
  await page.waitForTimeout(500);
  
  // Fill in the signup form
  const timestamp = Date.now();
  const email = `test${timestamp}@acme.com`;
  const password = 'password123';
  
  await page.fill('#signup-email', email);
  await page.fill('#signup-password', password);
  
  console.log(`\n🔵 Signing up with: ${email}\n`);
  
  // Click Create Account button
  await page.click('button:has-text("Create Account")');
  
  // Wait for response
  await page.waitForTimeout(3000);
  
  // Check for success or error
  const pageContent = await page.content();
  
  if (pageContent.includes('check your email') || pageContent.includes('Account created')) {
    console.log('✅ SUCCESS! Account created');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n📋 Now run this SQL query to verify:');
    console.log(`
SELECT 
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_in_metadata,
  bu.brand_id as brand_in_table,
  bu.role,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
WHERE u.email = '${email}';
    `);
  } else {
    console.log('⚠️ Check the page for status');
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'screenshots/signup-result.png', fullPage: true });
  console.log('\n📸 Screenshot saved to: screenshots/signup-result.png\n');
});

test('sign up with Globex email and verify', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Click on Sign Up tab
  await page.click('button:has-text("Sign Up")');
  
  // Wait a moment for tab to switch
  await page.waitForTimeout(500);
  
  // Fill in the signup form
  const timestamp = Date.now();
  const email = `test${timestamp}@globex.com`;
  const password = 'password123';
  
  await page.fill('#signup-email', email);
  await page.fill('#signup-password', password);
  
  console.log(`\n🔵 Signing up with: ${email}\n`);
  
  // Click Create Account button
  await page.click('button:has-text("Create Account")');
  
  // Wait for response
  await page.waitForTimeout(3000);
  
  // Check for success or error
  const pageContent = await page.content();
  
  if (pageContent.includes('check your email') || pageContent.includes('Account created')) {
    console.log('✅ SUCCESS! Account created');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n📋 Now run this SQL query to verify:');
    console.log(`
SELECT 
  u.email,
  u.raw_user_meta_data->>'brand_id' as brand_in_metadata,
  bu.brand_id as brand_in_table,
  bu.role,
  u.created_at
FROM auth.users u
LEFT JOIN brand_users bu ON u.id = bu.user_id
WHERE u.email = '${email}';
    `);
  } else {
    console.log('⚠️ Check the page for status');
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'screenshots/signup-globex-result.png', fullPage: true });
  console.log('\n📸 Screenshot saved to: screenshots/signup-globex-result.png\n');
});
