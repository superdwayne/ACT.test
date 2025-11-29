# Monorepo Testing Strategy

## Overview
Comprehensive testing approach for the ACT monorepo with multi-brand support, shared components, and Supabase integration.

## Testing Levels

### 1. **Unit Tests**
Test individual functions and components in isolation.

#### Package-Level Testing
```bash
# Test specific packages
npm run test --workspace @act/ui
npm run test --workspace @act/auth
npm run test --workspace @act/tenant-config

# Test all packages
npm run test --workspaces
```

#### Test Structure
```
packages/
├── ui/
│   ├── src/
│   │   └── components/
│   │       └── button/
│   │           ├── button.tsx
│   │           └── button.test.tsx
│   └── jest.config.js
├── auth/
│   ├── src/
│   │   ├── auth-client.test.ts
│   │   └── components/
│   │       └── login-form.test.tsx
│   └── jest.config.js
```

### 2. **Integration Tests**
Test interactions between packages and external services.

#### Cross-Package Integration
- Auth package with tenant-config
- UI components with auth state
- Supabase client with brand isolation

#### Database Integration
```bash
# Start local Supabase for testing
supabase start
npm run test:integration
```

### 3. **End-to-End Tests**
Test complete user journeys across brands.

#### Brand-Specific E2E Tests
```bash
# Test ACME brand
BRAND_ID=acme npm run test:e2e

# Test Globex brand  
BRAND_ID=globex npm run test:e2e

# Test all brands
npm run test:e2e:all-brands
```

#### Test Scenarios
- **Authentication Flow**: Sign up → Email verification → Login
- **Brand Isolation**: User can only access their brand's data
- **File Uploads**: Brand-specific upload areas
- **Password Reset**: Brand-specific reset flows

### 4. **Component Testing**
Test shared UI components across different brand themes.

#### Visual Regression Testing
```bash
# Test components with different brand themes
npm run test:visual --workspace @act/ui
```

## Testing Tools

### **Jest Configuration**
```javascript
// jest.config.js (root)
module.exports = {
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/brands/*/jest.config.js'
  ],
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    'brands/*/src/**/*.{ts,tsx}'
  ]
}
```

### **Playwright for E2E**
```javascript
// playwright.config.ts
export default {
  projects: [
    {
      name: 'acme-brand',
      use: { 
        baseURL: 'http://localhost:3000',
        storageState: 'tests/auth/acme-user.json'
      }
    },
    {
      name: 'globex-brand', 
      use: {
        baseURL: 'http://localhost:3001',
        storageState: 'tests/auth/globex-user.json'
      }
    }
  ]
}
```

### **Supabase Testing**
```bash
# Reset test database
supabase db reset --local

# Run migrations
supabase db push --local

# Seed test data
npm run seed:test-data
```

## Test Data Management

### **Brand-Specific Test Users**
```typescript
// tests/fixtures/users.ts
export const testUsers = {
  acme: {
    email: 'test@acme.com',
    password: 'test123',
    brandId: 'acme'
  },
  globex: {
    email: 'test@globex.com', 
    password: 'test123',
    brandId: 'globex'
  }
}
```

### **Test Database Isolation**
- Use separate test database
- Clean state between tests
- Brand-specific data seeding

## Continuous Integration

### **GitHub Actions Workflow**
```yaml
name: Test Monorepo
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      # Install dependencies
      - run: npm ci
      
      # Start Supabase
      - run: npx supabase start
      
      # Run tests
      - run: npm run test --workspaces
      - run: npm run test:integration
      - run: npm run test:e2e
      
      # Upload coverage
      - uses: codecov/codecov-action@v3
```

## Running Tests

### **Development Workflow**
```bash
# 1. Start local services
npm run dev:services  # Starts Supabase, etc.

# 2. Run tests in watch mode
npm run test:watch --workspace @act/auth

# 3. Run integration tests
npm run test:integration

# 4. Run E2E tests for specific brand
BRAND_ID=acme npm run test:e2e
```

### **Pre-deployment Testing**
```bash
# Full test suite
npm run test:all

# Brand-specific deployment test
npm run test:deploy:acme
npm run test:deploy:globex
```

## Test Coverage Goals

- **Unit Tests**: 90%+ coverage for shared packages
- **Integration Tests**: Cover all cross-package interactions
- **E2E Tests**: Cover critical user journeys per brand
- **Visual Tests**: Ensure consistent UI across brands

## Debugging Tests

### **Local Development**
```bash
# Debug specific test
npm run test:debug packages/auth/src/auth-client.test.ts

# Debug E2E test with browser
npm run test:e2e:debug --headed
```

### **CI Debugging**
- Artifact collection for failed tests
- Screenshot capture on E2E failures
- Database state dumps for integration test failures
