import 'dotenv/config'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  const migrationFile = join(__dirname, '../../supabase/migrations/20251118190000_create_brand_settings.sql')
  const sql = readFileSync(migrationFile, 'utf-8')

  console.log('🚀 Running migration: create_brand_settings\n')
  console.log('📄 SQL file:', migrationFile)
  console.log('📊 SQL length:', sql.length, 'characters\n')

  // Execute SQL using Supabase REST API via rpc
  // Note: Supabase JS client doesn't support raw SQL, so we need to use the REST API
  try {
    // Split into individual statements (simplified - handles basic cases)
    const statements = sql
      .split(/;\s*(?=\n|$)/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'))

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

    // Use the REST API directly
    const response = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      },
      body: JSON.stringify({ sql_query: sql })
    })

    if (!response.ok) {
      // If exec_sql doesn't exist, we'll need to execute via psql or dashboard
      console.log('⚠️  Direct SQL execution not available via REST API')
      console.log('\n📋 Please run this migration manually:\n')
      console.log('Option 1: Supabase Dashboard')
      console.log('  1. Go to your Supabase project dashboard')
      console.log('  2. Navigate to SQL Editor')
      console.log('  3. Copy and paste the SQL below')
      console.log('  4. Click "Run"\n')
      console.log('Option 2: Supabase CLI')
      console.log('  supabase link --project-ref YOUR_PROJECT_REF')
      console.log('  supabase db push\n')
      console.log('SQL to execute:')
      console.log('─'.repeat(60))
      console.log(sql)
      console.log('─'.repeat(60))
      return
    }

    const result = await response.json()
    console.log('✅ Migration executed successfully!')
    console.log('Result:', result)
  } catch (error: any) {
    console.error('❌ Error executing migration:', error.message)
    console.log('\n📋 Please run this migration manually in Supabase Dashboard:\n')
    console.log('1. Go to your Supabase project dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy and paste the SQL from:')
    console.log('   supabase/migrations/20251118190000_create_brand_settings.sql')
    console.log('4. Click "Run"\n')
    
    // Output the SQL for easy copy-paste
    console.log('SQL Content:')
    console.log('─'.repeat(60))
    console.log(sql)
    console.log('─'.repeat(60))
  }
}

runMigration()

