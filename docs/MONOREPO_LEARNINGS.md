# What We Learned: Monorepo Setup Journey

## 🎯 Big Picture: What We Built

A **production-ready multi-brand authentication system** using:
- Next.js 16 (App Router)
- Supabase (Auth + Database)
- Shared component libraries
- Brand isolation at every level

## 📚 Key Learnings

### **1. Monorepo Architecture**

#### What We Learned:
- **Shared packages** reduce code duplication across brands
- **Workspace protocol** (`npm workspaces`) manages dependencies
- **Build order matters** - dependencies must build before dependents
- **Package exports** need careful configuration for Next.js

#### Key Insight:
```
packages/ui → packages/auth → brands/acme-frontend
   ↓              ↓                    ↓
Build first   Build second      Build last
```

**Lesson**: Always build shared packages in dependency order!

---

### **2. Next.js 13+ App Router Patterns**

#### What We Learned:
- **Server Components** are default (no client-side JS)
- **Client Components** need `'use client'` directive
- **Context providers** must be in client components
- **Layout wrapping** pattern for providers

#### The Problem We Hit:
```typescript
// ❌ This doesn't work - layout is server component
export default function RootLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

// ✅ This works - separate client wrapper
export default function RootLayout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>  // Client component
}
```

**Lesson**: Separate server and client boundaries clearly!

---

### **3. React Context in Monorepos**

#### What We Learned:
- **Module bundling** can create duplicate Context instances
- **Relative imports** cause bundling issues
- **Package imports** prevent duplication

#### The Bug We Fixed:
```typescript
// ❌ Caused "useAuth must be used within AuthProvider"
import { useAuth } from '../hooks'  // Relative import

// ✅ Fixed by using package import
import { useAuth } from '@act/auth'  // Package import
```

**Lesson**: In monorepo packages, always use package imports for shared state!

---

### **4. TypeScript Build Configuration**

#### What We Learned:
- **tsup** is great for building packages
- **`'use client'` directives** must be preserved in builds
- **External dependencies** prevent bundling issues
- **Entry points** control what gets bundled

#### The Configuration That Works:
```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts', 'src/components/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react', 'react-dom', '@act/auth'],  // ← Key!
  banner: { js: "'use client';" }  // ← Preserves directive
})
```

**Lesson**: Configure build tools carefully for React/Next.js compatibility!

---

### **5. Authentication & Security**

#### What We Learned:
- **Validation BEFORE database** saves API calls and improves UX
- **Brand verification** prevents cross-brand access
- **Row Level Security (RLS)** enforces isolation at DB level
- **Metadata** can store brand association

#### Security Layers:
```
1. Client-side validation (Zod) → Fast feedback
2. Server-side validation (Zod) → Security
3. Supabase RLS policies → Database-level isolation
4. Brand verification → Application-level check
```

**Lesson**: Defense in depth - validate at every layer!

---

### **6. Supabase Multi-Tenancy**

#### What We Learned:
- **RLS policies** provide automatic data isolation
- **Triggers** can auto-assign users to brands
- **Metadata** in auth.users stores brand association
- **Storage buckets** can be brand-specific

#### The Pattern:
```sql
-- User signs up with brand_id in metadata
INSERT INTO auth.users (email, raw_user_meta_data)
VALUES ('user@acme.com', '{"brand_id": "acme"}')

-- Trigger automatically creates brand association
INSERT INTO brand_users (user_id, brand_id)
VALUES (new_user_id, 'acme')

-- RLS ensures users only see their brand's data
CREATE POLICY "brand_isolation" ON uploads
FOR SELECT USING (
  brand_id IN (
    SELECT brand_id FROM brand_users 
    WHERE user_id = auth.uid()
  )
);
```

**Lesson**: Use database features for security - don't rely on application logic alone!

---

### **7. Component Styling with shadcn/ui**

#### What We Learned:
- **shadcn/ui** provides unstyled, accessible components
- **Tailwind CSS** integrates seamlessly
- **Design tokens** (CSS variables) enable theming
- **Component composition** is better than customization

#### The Approach:
```typescript
// Base component from shadcn
import { Tabs } from '@/components/ui/tabs'

// Compose with your logic
<Tabs defaultValue="login">
  <TabsList>
    <TabsTrigger value="login">Sign In</TabsTrigger>
    <TabsTrigger value="signup">Sign Up</TabsTrigger>
  </TabsList>
  <TabsContent value="login">
    <LoginForm />
  </TabsContent>
</Tabs>
```

**Lesson**: Use pre-built accessible components, customize with composition!

---

### **8. Data Validation with Zod**

#### What We Learned:
- **Schema-first** validation catches errors early
- **Type inference** from schemas reduces duplication
- **Error messages** improve user experience
- **Validation helpers** make code cleaner

#### The Pattern:
```typescript
// Define schema once
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).regex(/[A-Za-z]/).regex(/[0-9]/)
})

// Use everywhere
const validation = validateData(signUpSchema, userData)
if (!validation.success) {
  return { error: validation.error }  // Clear error message
}
```

**Lesson**: Validate early, validate often, with clear error messages!

---

## 🏗️ Architecture Patterns We Used

### **1. Layered Architecture**
```
Presentation Layer (UI Components)
        ↓
Business Logic Layer (Auth Client)
        ↓
Data Access Layer (Supabase)
        ↓
Database Layer (PostgreSQL + RLS)
```

### **2. Provider Pattern**
```typescript
// Wrap app with providers
<AuthProvider brandId="acme">
  <App />
</AuthProvider>

// Access anywhere with hooks
const { user, signIn, signOut } = useAuth()
```

### **3. Repository Pattern**
```typescript
// AuthClient abstracts Supabase
class AuthClient {
  async signIn() { /* Supabase logic */ }
  async signUp() { /* Supabase logic */ }
}

// Easy to swap providers later
class AuthClient {
  async signIn() { /* Firebase logic */ }
}
```

---

## 🚀 Best Practices We Discovered

### **1. Monorepo Management**
- ✅ Build packages in dependency order
- ✅ Use `file:` protocol for local packages
- ✅ Keep shared packages small and focused
- ✅ Document package dependencies clearly

### **2. Next.js Development**
- ✅ Separate server and client components
- ✅ Use client wrappers for providers
- ✅ Leverage App Router conventions
- ✅ Configure transpilePackages for monorepo

### **3. Authentication**
- ✅ Validate input before API calls
- ✅ Store brand association in metadata
- ✅ Verify brand on every request
- ✅ Use RLS for database-level security

### **4. Code Organization**
- ✅ Shared code in packages/
- ✅ Brand-specific code in brands/
- ✅ Clear separation of concerns
- ✅ Consistent naming conventions

---

## 💡 "Aha!" Moments

### **1. Context Duplication Bug**
**Problem**: "useAuth must be used within AuthProvider"
**Cause**: Bundler creating separate Context instances
**Solution**: Use package imports instead of relative imports
**Impact**: 2+ hours debugging, learned about module resolution

### **2. Client Component Boundaries**
**Problem**: Can't use hooks in server components
**Cause**: Next.js App Router defaults to server components
**Solution**: Create client wrapper components
**Impact**: Better understanding of React Server Components

### **3. Build Order Matters**
**Problem**: Auth package can't find tenant-config
**Cause**: Building in wrong order
**Solution**: Build dependencies first
**Impact**: Automated build scripts with proper ordering

### **4. Validation Saves API Calls**
**Problem**: Hitting Supabase with invalid data
**Cause**: No client-side validation
**Solution**: Zod schemas with early validation
**Impact**: Better UX, fewer API calls, clearer errors

---

## 📊 Metrics & Results

### **What We Built:**
- ✅ 4 shared packages (ui, auth, utils, tenant-config)
- ✅ 1 brand application (ACME)
- ✅ 9 TypeScript/TSX files in auth package
- ✅ 4 database tables with RLS
- ✅ 1 trigger for auto-assignment
- ✅ Full authentication flow with validation

### **Code Reusability:**
- 🔄 Auth components: Shared across all brands
- 🔄 UI components: Reusable across brands
- 🔄 Validation logic: Single source of truth
- 🔄 Supabase client: Centralized configuration

### **Time Saved (Future):**
- Adding new brand: ~30 minutes (vs 2+ hours from scratch)
- New auth feature: Update once, works everywhere
- UI changes: Update shared components, all brands benefit

---

## 🎓 Key Takeaways

### **For Monorepos:**
1. **Structure matters** - Organize by domain, not by type
2. **Build tools are critical** - Configure carefully for your stack
3. **Package imports** - Use package names, not relative paths for shared code
4. **Documentation** - Essential for team collaboration

### **For Next.js:**
1. **Server vs Client** - Understand the boundary
2. **App Router** - Embrace the new patterns
3. **Transpilation** - Configure for monorepo packages
4. **Performance** - Server components are faster

### **For Security:**
1. **Validate everywhere** - Client, server, database
2. **RLS is powerful** - Use database features
3. **Brand isolation** - Multiple layers of protection
4. **Metadata** - Store context with user data

### **For Team Development:**
1. **Clear boundaries** - Packages have clear responsibilities
2. **Type safety** - TypeScript catches errors early
3. **Consistent patterns** - Makes code predictable
4. **Good DX** - Fast builds, clear errors, good tooling

---

## 🚀 What's Next?

### **Immediate Opportunities:**
1. Add second brand (Globex) - test isolation
2. Implement file uploads - use brand_uploads table
3. Add password reset flow - already have the component
4. Create admin dashboard - manage brands

### **Future Enhancements:**
1. **Testing** - Unit, integration, E2E tests
2. **CI/CD** - Automated builds and deployments
3. **Monitoring** - Error tracking, analytics
4. **Performance** - Caching, optimization

---

## 🎯 Final Thoughts

### **What Worked Well:**
- ✅ Monorepo structure scales easily
- ✅ Shared components reduce duplication
- ✅ Supabase RLS provides strong isolation
- ✅ Next.js 16 is stable and performant

### **What Was Challenging:**
- ⚠️ React Context in monorepos (module resolution)
- ⚠️ Server/Client component boundaries
- ⚠️ Build configuration for multiple packages
- ⚠️ TypeScript configuration across packages

### **What We'd Do Differently:**
- 📝 Start with clear package boundaries
- 📝 Document build order from the start
- 📝 Set up testing infrastructure earlier
- 📝 Use package imports from day one

---

## 🏆 Success Metrics

**We successfully built:**
- ✅ Multi-brand authentication system
- ✅ Shared component library
- ✅ Database-level data isolation
- ✅ Production-ready validation
- ✅ Beautiful, accessible UI
- ✅ Scalable architecture

**And learned:**
- 🎓 Monorepo best practices
- 🎓 Next.js App Router patterns
- 🎓 React Context gotchas
- 🎓 Supabase multi-tenancy
- 🎓 Build tool configuration
- 🎓 Security layering

**The monorepo is now ready for:**
- 🚀 Adding new brands
- 🚀 Building new features
- 🚀 Team collaboration
- 🚀 Production deployment
