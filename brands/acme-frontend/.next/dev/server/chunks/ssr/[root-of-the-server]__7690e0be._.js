module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/Playground/ACT.test/packages/tenant-config/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/index.ts
__turbopack_context__.s([
    "getAllowedEmailDomains",
    ()=>getAllowedEmailDomains,
    "getBrandConfig",
    ()=>getBrandConfig,
    "getBrandFromEmail",
    ()=>getBrandFromEmail,
    "isEmailDomainAllowed",
    ()=>isEmailDomainAllowed,
    "listBrands",
    ()=>listBrands
]);
var brands = {
    acme: {
        id: "acme",
        name: "acme",
        displayName: "Acme Labs",
        primaryColor: "#2563eb",
        logoPath: "/brands/acme/logo.svg",
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xlakgtzjsjlswvgjicrs.supabase.co",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q",
        emailDomains: [
            "acme.com",
            "acmelabs.com"
        ],
        features: {
            enableChat: true,
            enableAnalytics: true
        },
        supabase: {
            schema: "public",
            authRedirectUrl: "https://acme.example.com/auth/callback"
        }
    },
    globex: {
        id: "globex",
        name: "globex",
        displayName: "Globex Corp",
        primaryColor: "#7c3aed",
        logoPath: "/brands/globex/logo.svg",
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xlakgtzjsjlswvgjicrs.supabase.co",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWtndHpqc2psc3d2Z2ppY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc5NjYsImV4cCI6MjA3Nzk3Mzk2Nn0.5i0jONNrnxm6KMUJoD7wS9ql5qvaHuxrXVIqwAz-H9Q",
        emailDomains: [
            "globex.com",
            "globexcorp.com"
        ],
        features: {
            enableChat: false,
            enableAnalytics: true
        },
        supabase: {
            schema: "globex",
            authRedirectUrl: "https://globex.example.com/auth/callback"
        }
    }
};
function getBrandConfig(id) {
    return brands[id];
}
function listBrands() {
    return Object.keys(brands);
}
function getBrandFromEmail(email) {
    var _a;
    const domain = (_a = email.split("@")[1]) == null ? void 0 : _a.toLowerCase();
    if (!domain) return null;
    for (const [brandId, config] of Object.entries(brands)){
        if (config.emailDomains.includes(domain)) {
            return brandId;
        }
    }
    return null;
}
function isEmailDomainAllowed(email) {
    return getBrandFromEmail(email) !== null;
}
function getAllowedEmailDomains() {
    return Object.values(brands).flatMap((brand)=>brand.emailDomains);
}
;
}),
"[project]/Documents/Playground/ACT.test/packages/auth/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthClient",
    ()=>AuthClient,
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth,
    "useAuthLoading",
    ()=>useAuthLoading,
    "useAuthUser",
    ()=>useAuthUser,
    "useBrand",
    ()=>useBrand
]);
// src/auth-client.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/tenant-config/dist/index.js [app-ssr] (ecmascript)");
// src/validation.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
// src/auth-provider.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
var emailSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email address").min(1, "Email is required").refine((email)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmailDomainAllowed"])(email), "Please use your company email address (e.g., user@acme.com)");
var passwordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, "Password must be at least 6 characters").max(100, "Password is too long").regex(/[A-Za-z]/, "Password must contain at least one letter").regex(/[0-9]/, "Password must contain at least one number");
var signUpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: emailSchema,
    password: passwordSchema,
    brandId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
var signInSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: emailSchema,
    password: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required"),
    brandId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Brand ID is required")
});
var supabaseUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().nullable(),
    email_confirmed_at: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    created_at: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    last_sign_in_at: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    user_metadata: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    app_metadata: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
function validateData(schema, data) {
    try {
        const validated = schema.parse(data);
        return {
            success: true,
            data: validated
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
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
    constructor(brandId){
        this.brand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBrandConfig"])(brandId);
        this.supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(this.brand.supabaseUrl, this.brand.supabaseAnonKey);
    }
    async signUp({ email, password, brandId, metadata = {} }) {
        const detectedBrandId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBrandFromEmail"])(email);
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
        const validation = validateData(signUpSchema, {
            email,
            password,
            brandId: detectedBrandId,
            metadata
        });
        if (!validation.success) {
            return {
                data: null,
                error: {
                    message: validation.error,
                    status: 400,
                    name: "ValidationError"
                }
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
        return {
            data,
            error
        };
    }
    async signIn({ email, password, brandId }) {
        const validation = validateData(signInSchema, {
            email,
            password,
            brandId
        });
        if (!validation.success) {
            return {
                data: {
                    user: null,
                    session: null
                },
                error: {
                    message: validation.error,
                    status: 400,
                    name: "ValidationError"
                }
            };
        }
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: validation.data.email,
            password: validation.data.password
        });
        if (data.user && !error) {
            const userBrandId = data.user.user_metadata?.brand_id;
            if (userBrandId !== validation.data.brandId) {
                console.error("\u274C Brand mismatch:", {
                    userBrandId,
                    expectedBrandId: validation.data.brandId
                });
                return {
                    data: {
                        user: null,
                        session: null
                    },
                    error: {
                        message: "Invalid credentials for this brand",
                        status: 401,
                        name: "BrandMismatchError"
                    }
                };
            }
            console.log("\u2705 User signed in successfully:", data.user.email);
        }
        return {
            data,
            error
        };
    }
    async signOut() {
        const { error } = await this.supabase.auth.signOut();
        return {
            error
        };
    }
    async resetPassword({ email }) {
        const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password?brand=${this.brand.id}`
        });
        return {
            data,
            error
        };
    }
    async updatePassword(newPassword) {
        const { data, error } = await this.supabase.auth.updateUser({
            password: newPassword
        });
        return {
            data,
            error
        };
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
;
;
var AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function AuthProvider({ children, brandId }) {
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        loading: true,
        brand: null
    });
    const [authClient, setAuthClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const client = new AuthClient(brandId);
        setAuthClient(client);
        setAuthState((prev)=>({
                ...prev,
                brand: client.getBrand()
            }));
        client.getUser().then(({ data: { user } })=>{
            setAuthState((prev)=>({
                    ...prev,
                    user,
                    loading: false
                }));
        }).catch((error)=>{
            console.error("Auth initialization error:", error);
            setAuthState((prev)=>({
                    ...prev,
                    user: null,
                    loading: false
                }));
        });
        const { data: { subscription } } = client.onAuthStateChange((event, session)=>{
            setAuthState((prev)=>({
                    ...prev,
                    user: session?.user || null,
                    loading: false
                }));
        });
        return ()=>subscription.unsubscribe();
    }, [
        brandId
    ]);
    const signUp = async (email, password, metadata)=>{
        if (!authClient) throw new Error("Auth client not initialized");
        return authClient.signUp({
            email,
            password,
            brandId,
            metadata
        });
    };
    const signIn = async (email, password)=>{
        if (!authClient) throw new Error("Auth client not initialized");
        return authClient.signIn({
            email,
            password,
            brandId
        });
    };
    const signOut = async ()=>{
        if (!authClient) throw new Error("Auth client not initialized");
        return authClient.signOut();
    };
    const resetPassword = async (email)=>{
        if (!authClient) throw new Error("Auth client not initialized");
        return authClient.resetPassword({
            email,
            brandId
        });
    };
    const value = {
        ...authState,
        authClient,
        signUp,
        signIn,
        signOut,
        resetPassword
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(AuthContext.Provider, {
        value,
        children
    });
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === void 0) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
// src/hooks.ts
function useAuthUser() {
    const { user } = useAuth();
    return user;
}
function useAuthLoading() {
    const { loading } = useAuth();
    return loading;
}
function useBrand() {
    const { brand } = useAuth();
    return brand;
}
;
}),
"[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/auth-wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthWrapper",
    ()=>AuthWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/auth/dist/index.js [app-ssr] (ecmascript)");
'use client';
;
;
function AuthWrapper({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        brandId: "acme",
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/auth-wrapper.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7690e0be._.js.map