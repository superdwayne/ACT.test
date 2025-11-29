import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/auth-client.ts',
    'src/auth-provider.tsx',
    'src/hooks.ts',
    'src/types.ts',
    'src/components/index.ts',
    'src/components/login-form.tsx',
    'src/components/signup-form.tsx',
    'src/components/reset-password-form.tsx',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  external: [
    'react', 
    'react-dom', 
    '@supabase/supabase-js', 
    '@act/ui', 
    '@act/tenant-config', 
    '@act/utils',
    '@act/auth',
  ],
  banner: {
    js: "'use client';",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  esbuildOptions(options) {
    options.packages = 'external'
  },
})
