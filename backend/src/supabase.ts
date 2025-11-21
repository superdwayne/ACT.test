import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  // Do not throw at import time in production servers that might not use Supabase routes
  console.warn('Supabase URL or Service Role Key not set; Supabase routes may fail')
}

export const supabase = createClient(url ?? '', serviceKey ?? '')

