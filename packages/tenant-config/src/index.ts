export type BrandId = 'acme' | 'globex';

type BrandConfig = {
  id: BrandId;
  displayName: string;
  primaryColor: string;
  logoPath: string;
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
    displayName: 'Acme Labs',
    primaryColor: '#2563eb',
    logoPath: '/brands/acme/logo.svg',
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
    displayName: 'Globex Corp',
    primaryColor: '#7c3aed',
    logoPath: '/brands/globex/logo.svg',
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

export function listBrands(): BrandConfig[] {
  return Object.values(brands);
}
