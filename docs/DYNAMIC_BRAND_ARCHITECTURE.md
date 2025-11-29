# ✅ Dynamic Brand Architecture - Complete!

## 🎯 What Changed

### **Before (Hardcoded Brand):**
```typescript
// App knew its brand at build time
<AuthProvider brandId="acme">  // ❌ Hardcoded
  {children}
</AuthProvider>

// Problem: Each brand needed separate app
```

### **After (Dynamic Brand):**
```typescript
// App detects brand from user's email
<AuthProvider>  // ✅ No brandId needed!
  {children}
</AuthProvider>

// Solution: One app serves all brands
```

---

## 🔄 How It Works Now

### **1. User Signs Up**
```typescript
User enters: john@nike.com + password

↓

System detects: nike.com → brandId="nike"

↓

Supabase creates user with metadata:
{
  email: "john@nike.com",
  user_metadata: {
    brand_id: "nike"  // ← Stored here!
  }
}

↓

Database trigger creates brand_users record:
{
  user_id: "uuid-123",
  brand_id: "nike"
}
```

### **2. User Logs In**
```typescript
User enters: john@nike.com + password

↓

Supabase authenticates user

↓

AuthProvider reads user.user_metadata.brand_id

↓

AuthProvider initializes with Nike brand:
{
  user: { email: "john@nike.com", ... },
  brand: { id: "nike", name: "Nike", ... },
  loading: false
}

↓

User sees Nike-branded content throughout app
```

### **3. Brand Follows User Everywhere**
```typescript
// Anywhere in the app:
const { brand, user } = useAuth()

console.log(brand.id)           // "nike"
console.log(brand.displayName)  // "Nike"
console.log(brand.primaryColor) // "#FF6B35"

// Use brand context for:
- Filtering data (RLS does this automatically)
- Showing brand logo
- Applying brand colors
- Enabling brand-specific features
```

---

## 🏗️ Architecture Flow

```
┌─────────────────────────────────────────────────────────┐
│                    One Next.js App                      │
│                 (app.yourcompany.com)                   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    AuthProvider                         │
│  • No hardcoded brandId                                 │
│  • Reads brand from user.user_metadata.brand_id         │
│  • Provides brand context to entire app                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   User Signs Up                         │
│  Email: john@nike.com                                   │
│  System: Detects nike.com → brand_id="nike"             │
│  Supabase: Stores brand_id in user_metadata             │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   User Logs In                          │
│  Email: john@nike.com                                   │
│  Supabase: Returns user with brand_id="nike"            │
│  AuthProvider: Loads Nike brand config                  │
│  App: Shows Nike content only                           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Brand Context Available                    │
│  const { brand } = useAuth()                            │
│  • brand.id = "nike"                                    │
│  • brand.displayName = "Nike"                           │
│  • brand.primaryColor = "#FF6B35"                       │
│  • brand.emailDomains = ["nike.com"]                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 What's Stored Where

### **Supabase (auth.users table):**
```json
{
  "id": "uuid-123",
  "email": "john@nike.com",
  "user_metadata": {
    "brand_id": "nike"  // ← Brand stored here
  }
}
```

### **Supabase (brand_users table):**
```sql
user_id     | brand_id | created_at
------------|----------|------------
uuid-123    | nike     | 2025-01-01
```

### **React Context (AuthProvider):**
```typescript
{
  user: {
    id: "uuid-123",
    email: "john@nike.com",
    user_metadata: { brand_id: "nike" }
  },
  brand: {
    id: "nike",
    name: "nike",
    displayName: "Nike",
    primaryColor: "#FF6B35",
    emailDomains: ["nike.com"],
    features: { ... }
  },
  loading: false
}
```

---

## 🎨 Using Brand Context in Components

### **Example 1: Show Brand Name**
```typescript
'use client'
import { useAuth } from '@act/auth'

export function Header() {
  const { brand, user } = useAuth()
  
  if (!brand) return <div>Loading...</div>
  
  return (
    <header>
      <h1>Welcome to {brand.displayName}</h1>
      <p>Logged in as: {user?.email}</p>
    </header>
  )
}
```

### **Example 2: Apply Brand Colors**
```typescript
'use client'
import { useAuth } from '@act/auth'

export function Dashboard() {
  const { brand } = useAuth()
  
  return (
    <div style={{ backgroundColor: brand?.primaryColor }}>
      <h1>{brand?.displayName} Dashboard</h1>
    </div>
  )
}
```

### **Example 3: Brand-Specific Features**
```typescript
'use client'
import { useAuth } from '@act/auth'

export function ChatWidget() {
  const { brand } = useAuth()
  
  // Only show chat for brands with chat enabled
  if (!brand?.features.enableChat) return null
  
  return <div>Chat Widget</div>
}
```

### **Example 4: Filter Data by Brand**
```typescript
'use client'
import { useAuth } from '@act/auth'

export function FileList() {
  const { brand, authClient } = useAuth()
  
  const loadFiles = async () => {
    const supabase = authClient?.getSupabaseClient()
    
    // RLS automatically filters by brand!
    const { data } = await supabase
      .from('brand_uploads')
      .select('*')
    
    // Only returns files for user's brand
    return data
  }
  
  // ...
}
```

---

## 🔒 Security: How Brand Isolation Works

### **1. Email Domain Validation**
```typescript
// Only company emails allowed
user@nike.com    ✅ Allowed
user@acme.com    ✅ Allowed
user@gmail.com   ❌ Rejected
```

### **2. Brand Stored in User Metadata**
```typescript
// Supabase stores brand with user
{
  email: "john@nike.com",
  user_metadata: {
    brand_id: "nike"  // ← Can't be changed by user!
  }
}
```

### **3. Database RLS Policies**
```sql
-- Users can only see their brand's data
CREATE POLICY "brand_isolation" ON brand_uploads
FOR SELECT USING (
  brand_id IN (
    SELECT brand_id FROM brand_users 
    WHERE user_id = auth.uid()
  )
);
```

### **4. Automatic Filtering**
```typescript
// User queries uploads
const { data } = await supabase
  .from('brand_uploads')
  .select('*')

// RLS automatically adds:
// WHERE brand_id = 'nike'

// User only sees Nike files!
```

---

## 🚀 Benefits of This Architecture

### **✅ Single App, Multiple Brands**
- One codebase to maintain
- One deployment
- Shared components
- Easy to add new brands

### **✅ Dynamic Brand Detection**
- No hardcoded brandId
- Brand from user email
- Stored in user metadata
- Follows user everywhere

### **✅ Secure Isolation**
- Email domain validation
- Database-level RLS
- Can't access other brands' data
- Automatic filtering

### **✅ Easy to Use**
```typescript
// Just use the hook!
const { brand, user } = useAuth()

// Brand is always available
console.log(brand.id)           // "nike"
console.log(brand.displayName)  // "Nike"
```

---

## 📝 Example User Flows

### **Nike Employee Signs Up:**
```
1. Visits: app.yourcompany.com
2. Clicks: Sign Up
3. Enters: john@nike.com + password
4. System: Detects nike.com → brand_id="nike"
5. Supabase: Creates user with brand_id="nike"
6. Email: Verification sent to john@nike.com
7. User: Clicks verification link
8. User: Logs in
9. App: Shows Nike dashboard
10. User: Sees only Nike data
```

### **ACME Employee Signs Up:**
```
1. Visits: app.yourcompany.com (same URL!)
2. Clicks: Sign Up
3. Enters: jane@acme.com + password
4. System: Detects acme.com → brand_id="acme"
5. Supabase: Creates user with brand_id="acme"
6. Email: Verification sent to jane@acme.com
7. User: Clicks verification link
8. User: Logs in
9. App: Shows ACME dashboard
10. User: Sees only ACME data
```

### **Gmail User Tries to Sign Up:**
```
1. Visits: app.yourcompany.com
2. Clicks: Sign Up
3. Enters: user@gmail.com + password
4. System: gmail.com not in allowed domains
5. Error: "Please use your company email address"
6. User: Cannot sign up ❌
```

---

## 🔧 How to Add a New Brand

### **1. Add Brand Config**
```typescript
// packages/tenant-config/src/index.ts
const brands = {
  acme: { ... },
  globex: { ... },
  nike: {  // ← Add new brand
    id: 'nike',
    name: 'nike',
    displayName: 'Nike',
    primaryColor: '#FF6B35',
    emailDomains: ['nike.com'],
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    features: {
      enableChat: true,
      enableAnalytics: true
    },
    supabase: {
      schema: 'public',
      authRedirectUrl: 'https://app.yourcompany.com/auth/callback'
    }
  }
}
```

### **2. Add Brand to Database**
```sql
-- Insert into brands table
INSERT INTO brands (id, name, settings)
VALUES ('nike', 'Nike', '{"primaryColor": "#FF6B35"}');
```

### **3. Rebuild Packages**
```bash
npm run build:packages
```

### **4. Test**
```bash
# Start app
npm run dev:acme

# Sign up with Nike email
Email: test@nike.com
Password: password123

# User is automatically assigned to Nike brand!
```

**That's it! No code changes needed in the app.** ✅

---

## 🎯 Summary

### **What We Built:**
- ✅ One app serves all brands
- ✅ Brand auto-detected from email
- ✅ Brand stored in user metadata
- ✅ Brand context available everywhere
- ✅ Secure database-level isolation

### **How It Works:**
1. User signs up with company email
2. System detects brand from email domain
3. Brand stored in user metadata
4. User logs in
5. AuthProvider reads brand from metadata
6. Brand context available throughout app
7. RLS filters data by brand automatically

### **Benefits:**
- ✅ One codebase, multiple brands
- ✅ Easy to add new brands
- ✅ Secure isolation
- ✅ Dynamic brand detection
- ✅ Shared components

**Your monorepo now supports unlimited brands with zero code changes!** 🚀
