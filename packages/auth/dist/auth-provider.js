'use client';
"use client";

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
function validateData(schema, data) {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
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
    this.brand = getBrandConfig(brandId);
    this.supabase = createClient(
      this.brand.supabaseUrl,
      this.brand.supabaseAnonKey
    );
  }
  async signUp({ email, password, brandId, metadata = {} }) {
    const detectedBrandId = getBrandFromEmail2(email);
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

// src/auth-provider.tsx
import { getBrandConfig as getBrandConfig2 } from "@act/tenant-config";
import { jsx } from "react/jsx-runtime";
var AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    brand: null
  });
  const [authClient, setAuthClient] = useState(null);
  useEffect(() => {
    const defaultBrandId = "acme";
    const client = new AuthClient(defaultBrandId);
    setAuthClient(client);
    client.getUser().then(({ data: { user } }) => {
      if (user) {
        const userBrandId = user.user_metadata?.brand_id;
        if (userBrandId) {
          const userClient = new AuthClient(userBrandId);
          setAuthClient(userClient);
          setAuthState({
            user,
            loading: false,
            brand: getBrandConfig2(userBrandId)
          });
        } else {
          setAuthState({
            user,
            loading: false,
            brand: getBrandConfig2(defaultBrandId)
          });
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          brand: null
        });
      }
    }).catch((error) => {
      console.error("Auth initialization error:", error);
      setAuthState({
        user: null,
        loading: false,
        brand: null
      });
    });
    const { data: { subscription } } = client.onAuthStateChange((event, session) => {
      if (session?.user) {
        const userBrandId = session.user.user_metadata?.brand_id;
        if (userBrandId) {
          const userClient = new AuthClient(userBrandId);
          setAuthClient(userClient);
          setAuthState({
            user: session.user,
            loading: false,
            brand: getBrandConfig2(userBrandId)
          });
        } else {
          setAuthState({
            user: session.user,
            loading: false,
            brand: getBrandConfig2(defaultBrandId)
          });
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          brand: null
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const signUp = async (email, password, metadata) => {
    if (!authClient) throw new Error("Auth client not initialized");
    return authClient.signUp({ email, password, metadata });
  };
  const signIn = async (email, password) => {
    if (!authClient) throw new Error("Auth client not initialized");
    return authClient.signIn({ email, password });
  };
  const signOut = async () => {
    if (!authClient) throw new Error("Auth client not initialized");
    return authClient.signOut();
  };
  const resetPassword = async (email) => {
    if (!authClient) throw new Error("Auth client not initialized");
    return authClient.resetPassword({ email });
  };
  const value = {
    ...authState,
    authClient,
    signUp,
    signIn,
    signOut,
    resetPassword
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
