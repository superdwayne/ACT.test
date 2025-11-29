'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from './auth-client'
import { getBrandConfig } from '@act/tenant-config'
import type { AuthState, AuthUser, BrandConfig, BrandId } from './types'

interface AuthContextType extends AuthState {
  authClient: AuthClient | null
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  resetPassword: (email: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    brand: null
  })
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)

  useEffect(() => {
    // Start with default brand (ACME) for initial Supabase connection
    // This will be updated when user logs in with their brand
    const defaultBrandId: BrandId = 'acme'
    const client = new AuthClient(defaultBrandId)
    setAuthClient(client)

    // Get initial user
    client.getUser()
      .then(({ data: { user } }) => {
        if (user) {
          // User is logged in - get their brand from metadata
          const userBrandId = user.user_metadata?.brand_id as BrandId
          
          if (userBrandId) {
            // Reinitialize client with user's brand
            const userClient = new AuthClient(userBrandId)
            setAuthClient(userClient)
            setAuthState({
              user: user as AuthUser,
              loading: false,
              brand: getBrandConfig(userBrandId)
            })
          } else {
            // No brand in metadata (shouldn't happen, but handle gracefully)
            setAuthState({
              user: user as AuthUser,
              loading: false,
              brand: getBrandConfig(defaultBrandId)
            })
          }
        } else {
          // No user logged in
          setAuthState({
            user: null,
            loading: false,
            brand: null
          })
        }
      })
      .catch((error) => {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          loading: false,
          brand: null
        })
      })

    // Listen for auth changes
    const { data: { subscription } } = client.onAuthStateChange((event, session) => {
      if (session?.user) {
        const userBrandId = session.user.user_metadata?.brand_id as BrandId
        
        if (userBrandId) {
          // Update client with user's brand
          const userClient = new AuthClient(userBrandId)
          setAuthClient(userClient)
          setAuthState({
            user: session.user as AuthUser,
            loading: false,
            brand: getBrandConfig(userBrandId)
          })
        } else {
          setAuthState({
            user: session.user as AuthUser,
            loading: false,
            brand: getBrandConfig(defaultBrandId)
          })
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          brand: null
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    if (!authClient) throw new Error('Auth client not initialized')
    // Brand is auto-detected from email domain in AuthClient
    return authClient.signUp({ email, password, metadata })
  }

  const signIn = async (email: string, password: string) => {
    if (!authClient) throw new Error('Auth client not initialized')
    // Brand is auto-detected from email domain in AuthClient
    return authClient.signIn({ email, password })
  }

  const signOut = async () => {
    if (!authClient) throw new Error('Auth client not initialized')
    return authClient.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!authClient) throw new Error('Auth client not initialized')
    // Brand is auto-detected from email domain in AuthClient
    return authClient.resetPassword({ email })
  }

  const value: AuthContextType = {
    ...authState,
    authClient,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
