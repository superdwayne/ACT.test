# QA Process Guide

Complete module-level QA setup for the ACT 2.0 frontend.

## 🛠️ Tools Configured

### 1. **ESLint** - Code Quality & Linting
- **Config**: `eslint.config.mjs`
- **Purpose**: Enforce code quality, catch bugs, maintain consistency
- **Rules**: TypeScript strict mode, React hooks, Next.js best practices

### 2. **Prettier** - Code Formatting
- **Config**: `.prettierrc`
- **Purpose**: Automatic code formatting
- **Features**: Tailwind CSS class sorting via plugin

### 3. **TypeScript** - Type Checking
- **Config**: `tsconfig.json`
- **Purpose**: Static type checking, catch type errors

### 4. **Vitest** - Unit & Integration Testing
- **Config**: `vitest.config.ts`
- **Purpose**: Fast unit and integration tests
- **Features**: React Testing Library, JSdom, coverage reports

### 5. **Playwright** - E2E Testing
- **Config**: `playwright.config.ts` (root)
- **Purpose**: End-to-end browser testing
- **Already configured**: ✅

### 6. **Husky + lint-staged** - Pre-commit Hooks
- **Config**: `.husky/pre-commit`, `.lintstagedrc.json`
- **Purpose**: Run checks before commits
- **Runs**: ESLint + Prettier on staged files

---

## 📝 Available Scripts

### Development
```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
```

### Linting
```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Auto-fix linting errors
```

### Formatting
```bash
npm run format           # Format all files
npm run format:check     # Check formatting without fixing
```

### Type Checking
```bash
npm run type-check       # Run TypeScript compiler check
```

### Unit/Integration Testing
```bash
npm run test             # Run tests in watch mode
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage report
npm run test:watch       # Run tests in watch mode (explicit)
```

### E2E Testing
```bash
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Run Playwright with UI
```

### Complete QA Check
```bash
npm run qa               # Run all checks (type-check + lint + format + test)
npm run qa:fix           # Run all checks and auto-fix issues
```

---

## 🔄 Workflow

### Before Committing
Pre-commit hooks automatically run:
1. ESLint on staged `.ts`, `.tsx`, `.js`, `.jsx` files
2. Prettier on all staged files

### Manual QA Check
```bash
npm run qa
```
This runs:
1. TypeScript type checking
2. ESLint linting
3. Prettier format checking
4. Vitest unit tests

### Fix Issues Automatically
```bash
npm run qa:fix
```
This runs:
1. TypeScript type checking
2. ESLint with auto-fix
3. Prettier with auto-format

---

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── setup.ts                    # Test setup & global config
│   ├── components/
│   │   └── ui/
│   │       └── card.test.tsx       # Component tests
│   ├── lib/
│   │   └── utils.test.ts           # Utility function tests
│   └── example.integration.test.tsx # Integration tests
```

### Writing Tests

#### Component Test Example
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

#### Utility Test Example
```ts
import { describe, it, expect } from "vitest";
import { myFunction } from "@/lib/utils";

describe("myFunction", () => {
  it("returns expected value", () => {
    expect(myFunction(1, 2)).toBe(3);
  });
});
```

---

## 🎯 Best Practices

### 1. **Run QA Before Push**
```bash
npm run qa
```

### 2. **Write Tests for New Features**
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for feature flows
- E2E tests for critical user journeys

### 3. **Follow ESLint Rules**
- No unused variables (prefix with `_` if intentional)
- Avoid `any` type (use specific types)
- Follow React hooks rules
- Use `===` instead of `==`

### 4. **Keep Code Formatted**
- Run `npm run format` before committing
- Or let pre-commit hooks handle it

### 5. **Type Safety**
- Run `npm run type-check` regularly
- Fix TypeScript errors before committing

---

## 🚨 CI/CD Integration

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Run QA checks
  run: npm run qa

- name: Run E2E tests
  run: npm run test:e2e
```

---

## 📊 Coverage Reports

Generate coverage report:
```bash
npm run test:coverage
```

View coverage in:
- Terminal output
- `coverage/index.html` (open in browser)

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.mjs` | ESLint rules and settings |
| `.prettierrc` | Prettier formatting rules |
| `.prettierignore` | Files to exclude from formatting |
| `vitest.config.ts` | Vitest test configuration |
| `.lintstagedrc.json` | Pre-commit hook configuration |
| `.husky/pre-commit` | Git pre-commit hook script |
| `tsconfig.json` | TypeScript configuration |

---

## 🎓 Learning Resources

- **Vitest**: https://vitest.dev/
- **React Testing Library**: https://testing-library.com/react
- **Playwright**: https://playwright.dev/
- **ESLint**: https://eslint.org/
- **Prettier**: https://prettier.io/

---

## 🐛 Troubleshooting

### Tests Failing?
```bash
npm run test:ui  # Debug with UI
```

### Linting Errors?
```bash
npm run lint:fix  # Auto-fix
```

### Type Errors?
```bash
npm run type-check  # See all type errors
```

### Pre-commit Hook Not Running?
```bash
npm run prepare  # Reinstall Husky
```

---

## ✅ Quick Start Checklist

- [x] ESLint configured
- [x] Prettier configured
- [x] TypeScript configured
- [x] Vitest configured
- [x] Playwright configured (already present)
- [x] Husky pre-commit hooks configured
- [x] Example tests created
- [x] QA scripts added to package.json

**You're all set! Start writing tests and maintaining code quality.** 🚀
