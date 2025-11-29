import './auth-client.cjs';
export { useAuth } from './auth-provider.cjs';
import { AuthUser } from './types.cjs';
import '@act/tenant-config';
import '@supabase/auth-js';
import '@supabase/supabase-js';
import 'react/jsx-runtime';
import 'react';

type BrandId = 'acme' | 'globex';
type BrandConfig = {
    id: BrandId;
    name: string;
    displayName: string;
    primaryColor: string;
    logoPath: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    emailDomains: string[];
    features: {
        enableChat: boolean;
        enableAnalytics: boolean;
    };
    supabase: {
        schema: string;
        authRedirectUrl: string;
    };
};

declare function useAuthUser(): AuthUser | null;
declare function useAuthLoading(): boolean;
declare function useBrand(): BrandConfig | null;

export { useAuthLoading, useAuthUser, useBrand };
