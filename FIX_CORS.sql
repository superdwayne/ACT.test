-- Check current auth configuration
SELECT 
  name,
  value
FROM auth.config
WHERE name IN ('site_url', 'additional_redirect_urls', 'uri_allow_list');

-- If you need to update them, use Supabase Dashboard instead
-- Go to: Authentication > URL Configuration
-- Add: http://localhost:3000
