# Email Domain-Based Brand Matching

## 🎯 Concept

Instead of manually selecting a brand, users are **automatically assigned** to their brand based on their email domain:

- `user@acme.com` → ACME brand
- `user@nike.com` → Nike brand  
- `user@globex.com` → Globex brand

## 🔧 Implementation Strategy

### **1. Email Domain Configuration**

Map email domains to brands:
```typescript
const brandDomains = {
  'acme.com': 'acme',
  'acmelabs.com': 'acme',
  'nike.com': 'nike',
  'globex.com': 'globex'
}
```

### **2. Auto-Detect Brand from Email**

```typescript
function getBrandFromEmail(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase()
  return brandDomains[domain] || null
}

// Examples:
getBrandFromEmail('john@nike.com')  // → 'nike'
getBrandFromEmail('jane@acme.com')  // → 'acme'
getBrandFromEmail('user@gmail.com') // → null (not allowed)
```

### **3. Validation**

Only allow signups from approved domains:
```typescript
if (!getBrandFromEmail(email)) {
  return error: "Please use your company email address"
}
```

## 🔒 Security Benefits

1. **No manual brand selection** - Can't fake brand membership
2. **Email verification required** - Must have access to company email
3. **Domain whitelist** - Only approved companies can sign up
4. **Automatic assignment** - No user error possible

## 📧 End-to-End Flow

```
1. User visits: acme-app.com (or nike-app.com)
   ↓
2. User enters: john@nike.com
   ↓
3. System detects: nike.com → Nike brand
   ↓
4. Supabase sends: Verification email to john@nike.com
   ↓
5. User clicks: Confirmation link in email
   ↓
6. User confirmed: Automatically assigned to Nike brand
   ↓
7. User logs in: Sees only Nike data
```

## ✅ Advantages

- ✅ **Secure**: Must have company email access
- ✅ **Automatic**: No manual brand selection
- ✅ **Scalable**: Easy to add new brands
- ✅ **User-friendly**: Just enter email, system handles rest
- ✅ **Verifiable**: Email confirmation proves ownership
