import * as _supabase_auth_js from '@supabase/auth-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { BrandId, BrandConfig } from '@act/tenant-config';
import { SignUpData, SignInData, ResetPasswordData } from './types.cjs';

declare class AuthClient {
    private supabase;
    private brand;
    constructor(brandId: BrandId);
    signUp({ email, password, brandId, metadata }: SignUpData): Promise<{
        data: null;
        error: any;
    } | {
        data: {
            user: _supabase_auth_js.User | null;
            session: _supabase_auth_js.Session | null;
        } | {
            user: null;
            session: null;
        };
        error: _supabase_auth_js.AuthError | null;
    }>;
    signIn({ email, password }: SignInData): Promise<{
        data: {
            user: null;
            session: null;
        };
        error: any;
    } | {
        data: {
            user: _supabase_auth_js.User;
            session: _supabase_auth_js.Session;
            weakPassword?: _supabase_auth_js.WeakPassword;
        } | {
            user: null;
            session: null;
            weakPassword?: null | undefined;
        };
        error: _supabase_auth_js.AuthError | null;
    }>;
    signOut(): Promise<{
        error: _supabase_auth_js.AuthError | null;
    }>;
    resetPassword({ email }: ResetPasswordData): Promise<{
        data: {} | null;
        error: _supabase_auth_js.AuthError | null;
    }>;
    updatePassword(newPassword: string): Promise<{
        data: {
            user: _supabase_auth_js.User;
        } | {
            user: null;
        };
        error: _supabase_auth_js.AuthError | null;
    }>;
    getUser(): Promise<_supabase_auth_js.UserResponse>;
    onAuthStateChange(callback: (event: string, session: any) => void): {
        data: {
            subscription: _supabase_auth_js.Subscription;
        };
    };
    getBrand(): BrandConfig;
    getSupabaseClient(): SupabaseClient<any, "public", "public", any, any>;
}

export { AuthClient };
