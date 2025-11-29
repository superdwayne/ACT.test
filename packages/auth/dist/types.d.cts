import { User } from '@supabase/supabase-js';
import { BrandId, BrandConfig } from '@act/tenant-config';
export { BrandConfig, BrandId } from '@act/tenant-config';

interface AuthUser extends User {
    brand_id?: BrandId;
}
interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    brand: BrandConfig | null;
}
interface SignUpData {
    email: string;
    password: string;
    brandId?: BrandId;
    metadata?: Record<string, any>;
}
interface SignInData {
    email: string;
    password: string;
    brandId?: BrandId;
}
interface ResetPasswordData {
    email: string;
    brandId?: BrandId;
}

export type { AuthState, AuthUser, ResetPasswordData, SignInData, SignUpData };
