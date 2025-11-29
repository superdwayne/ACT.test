import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { AuthClient } from './auth-client.cjs';
import { AuthState } from './types.cjs';
import '@supabase/auth-js';
import '@supabase/supabase-js';
import '@act/tenant-config';

interface AuthContextType extends AuthState {
    authClient: AuthClient | null;
    signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    resetPassword: (email: string) => Promise<any>;
}
interface AuthProviderProps {
    children: React.ReactNode;
}
declare function AuthProvider({ children }: AuthProviderProps): react_jsx_runtime.JSX.Element;
declare function useAuth(): AuthContextType;

export { AuthProvider, useAuth };
