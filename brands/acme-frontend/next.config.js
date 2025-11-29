/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable transpiling of monorepo packages
  transpilePackages: ['@act/ui', '@act/auth', '@act/utils', '@act/tenant-config'],
  env: {
    BRAND_ID: process.env.BRAND_ID || 'acme',
  },
}

module.exports = nextConfig
