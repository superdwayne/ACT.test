import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { getBrandConfig, getBrandFromEmail, type BrandId } from '@act/tenant-config'
import type { BrandConfig, SignUpData, SignInData, ResetPasswordData } from './types'
import { validateData, signUpSchema, signInSchema } from './validation'

export class AuthClient {
  private supabase: SupabaseClient
  private brand: BrandConfig

  constructor(brandId: BrandId) {
    this.brand = getBrandConfig(brandId)
    this.supabase = createClient(
      this.brand.supabaseUrl,
      this.brand.supabaseAnonKey
    )
  }

  async signUp({ email, password, brandId, metadata = {} }: SignUpData) {
    // Auto-detect brand from email domain
    const detectedBrandId = getBrandFromEmail(email);
    if (!detectedBrandId) {
      return {
        data: null,
        error: { 
          message: 'Please use your company email address (e.g., user@acme.com or user@globex.com)', 
          status: 400, 
          name: 'InvalidEmailDomain' 
        } as any
      }
    }

    // Validate input data
    const validation = validateData(signUpSchema, { email, password, brandId: detectedBrandId, metadata })
    if (!validation.success) {
      return { 
        data: null, 
        error: { message: validation.error, status: 400, name: 'ValidationError' } as any
      }
    }

    // Proceed with Supabase signup using detected brand
    const { data, error } = await this.supabase.auth.signUp({
      email: validation.data.email,
      password: validation.data.password,
      options: {
        data: {
          brand_id: detectedBrandId,  // ← Use detected brand
          ...validation.data.metadata
        }
      }
    })

    // Validate response data if successful
    if (data.user && !error) {
      console.log('✅ User created successfully:', data.user.email, '→ Brand:', detectedBrandId)
    }

    return { data, error }
  }

  async signIn({ email, password }: SignInData) {
    // Validate input data
    const validation = validateData(signInSchema, { email, password })
    if (!validation.success) {
      return { 
        data: { user: null, session: null }, 
        error: { message: validation.error, status: 400, name: 'ValidationError' } as any
      }
    }

    // Proceed with Supabase signin
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password
    })

    // Log success with user's brand
    if (data.user && !error) {
      const userBrandId = data.user.user_metadata?.brand_id
      console.log('✅ User signed in successfully:', data.user.email, '→ Brand:', userBrandId)
    }

    return { data, error }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    return { error }
  }

  async resetPassword({ email }: ResetPasswordData) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password?brand=${this.brand.id}`
    })

    return { data, error }
  }

  async updatePassword(newPassword: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    })

    return { data, error }
  }

  getUser() {
    return this.supabase.auth.getUser()
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  getBrand() {
    return this.brand
  }

  getSupabaseClient() {
    return this.supabase
  }
}
