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
declare function getBrandConfig(id: BrandId): BrandConfig;
declare function listBrands(): BrandId[];
/**
 * Get brand ID from email domain
 * @param email - User's email address
 * @returns BrandId if domain matches, null otherwise
 */
declare function getBrandFromEmail(email: string): BrandId | null;
/**
 * Check if email domain is allowed for any brand
 * @param email - User's email address
 * @returns true if email domain is whitelisted
 */
declare function isEmailDomainAllowed(email: string): boolean;
/**
 * Get all allowed email domains across all brands
 * @returns Array of allowed email domains
 */
declare function getAllowedEmailDomains(): string[];

export { type BrandConfig, type BrandId, getAllowedEmailDomains, getBrandConfig, getBrandFromEmail, isEmailDomainAllowed, listBrands };
