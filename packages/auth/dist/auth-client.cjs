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

// src/auth-client.ts
var auth_client_exports = {};
__export(auth_client_exports, {
  AuthClient: () => AuthClient
});
module.exports = __toCommonJS(auth_client_exports);
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
function validateData(schema, data) {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof import_zod.z.ZodError) {
      const firstError = error.issues[0];
      return {
        success: false,
        error: firstError?.message || "Validation failed"
      };
    }
    return {
      success: false,
      error: "Validation failed"
    };
  }
}

// src/auth-client.ts
var AuthClient = class {
  constructor(brandId) {
    this.brand = (0, import_tenant_config2.getBrandConfig)(brandId);
    this.supabase = (0, import_supabase_js.createClient)(
      this.brand.supabaseUrl,
      this.brand.supabaseAnonKey
    );
  }
  async signUp({ email, password, brandId, metadata = {} }) {
    const detectedBrandId = (0, import_tenant_config2.getBrandFromEmail)(email);
    if (!detectedBrandId) {
      return {
        data: null,
        error: {
          message: "Please use your company email address (e.g., user@acme.com or user@globex.com)",
          status: 400,
          name: "InvalidEmailDomain"
        }
      };
    }
    const validation = validateData(signUpSchema, { email, password, brandId: detectedBrandId, metadata });
    if (!validation.success) {
      return {
        data: null,
        error: { message: validation.error, status: 400, name: "ValidationError" }
      };
    }
    const { data, error } = await this.supabase.auth.signUp({
      email: validation.data.email,
      password: validation.data.password,
      options: {
        data: {
          brand_id: detectedBrandId,
          // ← Use detected brand
          ...validation.data.metadata
        }
      }
    });
    if (data.user && !error) {
      console.log("\u2705 User created successfully:", data.user.email, "\u2192 Brand:", detectedBrandId);
    }
    return { data, error };
  }
  async signIn({ email, password }) {
    const validation = validateData(signInSchema, { email, password });
    if (!validation.success) {
      return {
        data: { user: null, session: null },
        error: { message: validation.error, status: 400, name: "ValidationError" }
      };
    }
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password
    });
    if (data.user && !error) {
      const userBrandId = data.user.user_metadata?.brand_id;
      console.log("\u2705 User signed in successfully:", data.user.email, "\u2192 Brand:", userBrandId);
    }
    return { data, error };
  }
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }
  async resetPassword({ email }) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password?brand=${this.brand.id}`
    });
    return { data, error };
  }
  async updatePassword(newPassword) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  }
  getUser() {
    return this.supabase.auth.getUser();
  }
  onAuthStateChange(callback) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  getBrand() {
    return this.brand;
  }
  getSupabaseClient() {
    return this.supabase;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthClient
});
