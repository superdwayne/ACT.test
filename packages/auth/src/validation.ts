import { z } from 'zod'
import { isEmailDomainAllowed, getBrandFromEmail } from '@act/tenant-config'

// Email validation schema with domain checking
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required')
  .refine(
    (email) => isEmailDomainAllowed(email),
    'Please use your company email address (e.g., user@acme.com)'
  )

// Password validation schema
export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password is too long')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// Sign up data validation
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  brandId: z.string().min(1).optional(),  // Optional - auto-detected from email
  metadata: z.record(z.string(), z.any()).optional()
})

// Sign in data validation
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  brandId: z.string().min(1).optional()  // Optional - auto-detected from email
})

// User data validation from Supabase
export const supabaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
  email_confirmed_at: z.string().nullable(),
  created_at: z.string(),
  last_sign_in_at: z.string().nullable(),
  user_metadata: z.record(z.string(), z.any()).optional(),
  app_metadata: z.record(z.string(), z.any()).optional()
})

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { 
  success: true; 
  data: T 
} | { 
  success: false; 
  error: string 
} {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return { 
        success: false, 
        error: firstError?.message || 'Validation failed'
      }
    }
    return { 
      success: false, 
      error: 'Validation failed' 
    }
  }
}
