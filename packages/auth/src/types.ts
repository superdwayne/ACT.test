import { User } from '@supabase/supabase-js'
import type { BrandConfig, BrandId } from '@act/tenant-config'

export { type BrandConfig, type BrandId } from '@act/tenant-config'

export interface AuthUser extends User {
  brand_id?: BrandId
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  brand: BrandConfig | null
}

export interface SignUpData {
  email: string
  password: string
  brandId?: BrandId  // Optional - auto-detected from email domain
  metadata?: Record<string, any>
}

export interface SignInData {
  email: string
  password: string
  brandId?: BrandId  // Optional - auto-detected from email domain
}

export interface ResetPasswordData {
  email: string
  brandId?: BrandId  // Optional - auto-detected from email domain
}
