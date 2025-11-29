'use client';

// src/auth-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";

// src/auth-client.ts
import { createClient } from "@supabase/supabase-js";
import { getBrandConfig, getBrandFromEmail as getBrandFromEmail2 } from "@act/tenant-config";

// src/validation.ts
import { z } from "zod";
import { isEmailDomainAllowed } from "@act/tenant-config";
var emailSchema = z.string().email("Invalid email address").min(1, "Email is required").refine(
  (email) => isEmailDomainAllowed(email),
  "Please use your company email address (e.g., user@acme.com)"
);
var passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long").regex(/[A-Za-z]/, "Password must contain at least one letter").regex(/[0-9]/, "Password must contain at least one number");
var signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  brandId: z.string().min(1).optional(),
  // Optional - auto-detected from email
  metadata: z.record(z.string(), z.any()).optional()
});
var signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  brandId: z.string().min(1).optional()
  // Optional - auto-detected from email
});
var supabaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
  email_confirmed_at: z.string().nullable(),
  created_at: z.string(),
  last_sign_in_at: z.string().nullable(),
  user_metadata: z.record(z.string(), z.any()).optional(),
  app_metadata: z.record(z.string(), z.any()).optional()
});

// src/auth-provider.tsx
import { getBrandConfig as getBrandConfig2 } from "@act/tenant-config";
import { jsx } from "react/jsx-runtime";
var AuthContext = createContext(void 0);
function useAuth() {
  const context = useContext(AuthContext);
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
export {
  useAuth,
  useAuthLoading,
  useAuthUser,
  useBrand
};
