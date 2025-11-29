"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  getAllowedEmailDomains: () => getAllowedEmailDomains,
  getBrandConfig: () => getBrandConfig,
  getBrandFromEmail: () => getBrandFromEmail,
  isEmailDomainAllowed: () => isEmailDomainAllowed,
  listBrands: () => listBrands
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllowedEmailDomains,
  getBrandConfig,
  getBrandFromEmail,
  isEmailDomainAllowed,
  listBrands
});
