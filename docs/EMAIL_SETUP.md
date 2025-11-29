# Email Configuration for Supabase

## 🚀 Quick Setup (Development)

### Disable Email Confirmation
**Best for testing and development:**

1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/auth/users
2. Click **"Configuration"** → **"Email Auth"**
3. **Uncheck**: "Enable email confirmations"
4. Click **"Save"**

✅ Users can now sign up and log in immediately!

## 📧 Production Email Setup

### Option 1: Use Supabase's Built-in Email (Limited)
- Free tier: 4 emails per hour
- Good for testing, not production
- Already configured by default

### Option 2: Custom SMTP (Recommended)

#### Using SendGrid (Free 100 emails/day)
1. Sign up at: https://sendgrid.com
2. Create an API key
3. In Supabase:
   - Go to **Settings** → **Auth** → **SMTP Settings**
   - Enable custom SMTP
   - Configure:
     ```
     Host: smtp.sendgrid.net
     Port: 587
     Username: apikey
     Password: [Your SendGrid API Key]
     Sender email: noreply@yourdomain.com
     Sender name: ACME Labs
     ```

#### Using Resend (Modern, Developer-Friendly)
1. Sign up at: https://resend.com
2. Get your API key
3. In Supabase:
   - Go to **Settings** → **Auth** → **SMTP Settings**
   - Configure with Resend SMTP details

## 🧪 Test Email Delivery

### Check if Emails Are Being Sent
1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/logs/edge-logs
2. Filter by "auth"
3. Look for email sending logs

### Manual Email Confirmation (Development)
If you need to manually confirm a user:

```sql
-- Run this in Supabase SQL Editor
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'test@acme.com';
```

## 🎯 Current Behavior

### With Email Confirmation ENABLED:
1. User signs up
2. User receives email with confirmation link
3. User clicks link
4. User can now log in

### With Email Confirmation DISABLED:
1. User signs up
2. User can log in immediately
3. No email sent

## 🔒 Security Considerations

### Development:
- ✅ Disable email confirmation
- ✅ Use test emails
- ✅ Fast iteration

### Production:
- ✅ Enable email confirmation
- ✅ Use custom SMTP provider
- ✅ Prevent fake signups
- ✅ Verify user emails

## 📝 Email Templates

Customize your email templates:
1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/auth/templates
2. Edit templates for:
   - Confirmation email
   - Password reset
   - Magic link
   - Email change

## ⚡ Quick Commands

### Check User Status
```sql
SELECT 
  email, 
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;
```

### Manually Confirm All Users (Development Only!)
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;
```

### Delete Test Users
```sql
DELETE FROM auth.users 
WHERE email LIKE '%test%';
```
