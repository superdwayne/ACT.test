export type BrandId = 'acme' | 'globex';

export type BrandConfig = {
  id: BrandId;
  name: string;
  displayName: string;
  primaryColor: string;
  logoPath: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  emailDomains: string[];  // ← New: Allowed email domains
  features: {
    enableChat: boolean;
    enableAnalytics: boolean;
  };
  supabase: {
    schema: string;
    authRedirectUrl: string;
  };
};

const brands: Record<BrandId, BrandConfig> = {
  acme: {
    id: 'acme',
    name: 'acme',
    displayName: 'Acme Labs',
    primaryColor: '#2563eb',
    logoPath: '/brands/acme/logo.svg',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xlakgtzjsjlswvgjicrs.supabase.co',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q',
    emailDomains: ['acme.com', 'acmelabs.com'],
    features: {
      enableChat: true,
      enableAnalytics: true,
    },
    supabase: {
      schema: 'public',
      authRedirectUrl: 'https://acme.example.com/auth/callback',
    },
  },
  globex: {
    id: 'globex',
    name: 'globex',
    displayName: 'Globex Corp',
    primaryColor: '#7c3aed',
    logoPath: '/brands/globex/logo.svg',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xlakgtzjsjlswvgjicrs.supabase.co',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q',
    emailDomains: ['globex.com', 'globexcorp.com'],
    features: {
      enableChat: false,
      enableAnalytics: true,
    },
    supabase: {
      schema: 'globex',
      authRedirectUrl: 'https://globex.example.com/auth/callback',
    },
  },
};

export function getBrandConfig(id: BrandId): BrandConfig {
  return brands[id];
}

export function listBrands(): BrandId[] {
  return Object.keys(brands) as BrandId[];
}

/**
 * Get brand ID from email domain
 * @param email - User's email address
 * @returns BrandId if domain matches, null otherwise
 */
export function getBrandFromEmail(email: string): BrandId | null {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;

  // Find brand that has this email domain
  for (const [brandId, config] of Object.entries(brands)) {
    if (config.emailDomains.includes(domain)) {
      return brandId as BrandId;
    }
  }

  return null;
}

/**
 * Check if email domain is allowed for any brand
 * @param email - User's email address
 * @returns true if email domain is whitelisted
 */
export function isEmailDomainAllowed(email: string): boolean {
  return getBrandFromEmail(email) !== null;
}

/**
 * Get all allowed email domains across all brands
 * @returns Array of allowed email domains
 */
export function getAllowedEmailDomains(): string[] {
  return Object.values(brands).flatMap(brand => brand.emailDomains);
}
