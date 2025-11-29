'use client';
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

// src/hooks.ts
var hooks_exports = {};
__export(hooks_exports, {
  useAuth: () => useAuth,
  useAuthLoading: () => useAuthLoading,
  useAuthUser: () => useAuthUser,
  useBrand: () => useBrand
});
module.exports = __toCommonJS(hooks_exports);

// src/auth-provider.tsx
var import_react = require("react");

// src/auth-client.ts
var import_supabase_js = require("@supabase/supabase-js");
var import_tenant_config2 = require("@act/tenant-config");

// src/validation.ts
var import_zod = require("zod");
var import_tenant_config = require("@act/tenant-config");
var emailSchema = import_zod.z.string().email("Invalid email address").min(1, "Email is required").refine(
  (email) => (0, import_tenant_config.isEmailDomainAllowed)(email),
  "Please use your company email address (e.g., user@acme.com)"
);
var passwordSchema = import_zod.z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long").regex(/[A-Za-z]/, "Password must contain at least one letter").regex(/[0-9]/, "Password must contain at least one number");
var signUpSchema = import_zod.z.object({
  email: emailSchema,
  password: passwordSchema,
  brandId: import_zod.z.string().min(1).optional(),
  // Optional - auto-detected from email
  metadata: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional()
});
var signInSchema = import_zod.z.object({
  email: emailSchema,
  password: import_zod.z.string().min(1, "Password is required"),
  brandId: import_zod.z.string().min(1).optional()
  // Optional - auto-detected from email
});
var supabaseUserSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  email: import_zod.z.string().email().nullable(),
  email_confirmed_at: import_zod.z.string().nullable(),
  created_at: import_zod.z.string(),
  last_sign_in_at: import_zod.z.string().nullable(),
  user_metadata: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional(),
  app_metadata: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional()
});

// src/auth-provider.tsx
var import_tenant_config3 = require("@act/tenant-config");
var import_jsx_runtime = require("react/jsx-runtime");
var AuthContext = (0, import_react.createContext)(void 0);
function useAuth() {
  const context = (0, import_react.useContext)(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// src/hooks.ts
function useAuthUser() {
  const { user } = useAuth();
  return user;
}
function useAuthLoading() {
  const { loading } = useAuth();
  return loading;
}
function useBrand() {
  const { brand } = useAuth();
  return brand;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAuth,
  useAuthLoading,
  useAuthUser,
  useBrand
});
