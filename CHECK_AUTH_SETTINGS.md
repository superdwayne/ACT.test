# Check Supabase Auth Settings

## The Issue
Users are not being created in the database even though the signup form is being submitted.

## Most Likely Cause: Email Confirmation Required

Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/auth/providers

Check: **"Enable email confirmations"**

If this is ON, users won't be created until they click the confirmation link in their email.

## Solution: Disable Email Confirmation for Testing

1. Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/auth/providers
2. Scroll to "Email" provider
3. Find "Enable email confirmations"
4. **Turn it OFF** for testing
5. Click Save

## Alternative: Check Supabase Logs

Go to: https://supabase.com/dashboard/project/xlakgtzjsjlswvgjicrs/logs/explorer

Filter by "auth" and look for signup attempts to see what errors are occurring.

## Test Again After Disabling Email Confirmation

Once disabled, try signing up manually at http://localhost:3000 with:
- Email: `manual-test@acme.com`
- Password: `password123`

Then check if user appears in database.
