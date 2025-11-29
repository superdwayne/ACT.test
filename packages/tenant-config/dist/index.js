// src/index.ts
var brands = {
  acme: {
    id: "acme",
    name: "acme",
    displayName: "Acme Labs",
    primaryColor: "#2563eb",
    logoPath: "/brands/acme/logo.svg",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xlakgtzjsjlswvgjicrs.supabase.co",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q",
    emailDomains: ["acme.com", "acmelabs.com"],
    features: {
      enableChat: true,
      enableAnalytics: true
    },
    supabase: {
      schema: "public",
      authRedirectUrl: "https://acme.example.com/auth/callback"
    }
  },
  globex: {
    id: "globex",
    name: "globex",
    displayName: "Globex Corp",
    primaryColor: "#7c3aed",
    logoPath: "/brands/globex/logo.svg",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xlakgtzjsjlswvgjicrs.supabase.co",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q",
    emailDomains: ["globex.com", "globexcorp.com"],
    features: {
      enableChat: false,
      enableAnalytics: true
    },
    supabase: {
      schema: "globex",
      authRedirectUrl: "https://globex.example.com/auth/callback"
    }
  }
};
function getBrandConfig(id) {
  return brands[id];
}
function listBrands() {
  return Object.keys(brands);
}
function getBrandFromEmail(email) {
  var _a;
  const domain = (_a = email.split("@")[1]) == null ? void 0 : _a.toLowerCase();
  if (!domain) return null;
  for (const [brandId, config] of Object.entries(brands)) {
    if (config.emailDomains.includes(domain)) {
      return brandId;
    }
  }
  return null;
}
function isEmailDomainAllowed(email) {
  return getBrandFromEmail(email) !== null;
}
function getAllowedEmailDomains() {
  return Object.values(brands).flatMap((brand) => brand.emailDomains);
}
export {
  getAllowedEmailDomains,
  getBrandConfig,
  getBrandFromEmail,
  isEmailDomainAllowed,
  listBrands
};
