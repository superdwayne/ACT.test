module.exports = [
"[project]/Documents/Playground/ACT.test/packages/tenant-config/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/index.ts
__turbopack_context__.s([
    "getBrandConfig",
    ()=>getBrandConfig,
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
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
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
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
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
    return Object.values(brands);
}
;
}),
"[project]/Documents/Playground/ACT.test/packages/auth/dist/chunk-6CKV4W3Y.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/auth-client.ts
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/tenant-config/dist/index.js [app-rsc] (ecmascript)");
// src/auth-provider.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
;
;
var AuthClient = class {
    constructor(brandId){
        this.brand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$tenant$2d$config$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBrandConfig"])(brandId);
        this.supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(this.brand.supabaseUrl, this.brand.supabaseAnonKey);
    }
    async signUp({ email, password, brandId, metadata = {} }) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    brand_id: brandId,
                    ...metadata
                }
            }
        });
        return {
            data,
            error
        };
    }
    async signIn({ email, password }) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
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
var AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function AuthProvider({ children, brandId }) {
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        loading: true,
        brand: null
    });
    const [authClient, setAuthClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(AuthContext.Provider, {
        value,
        children
    });
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
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
"[project]/Documents/Playground/ACT.test/packages/auth/dist/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$chunk$2d$6CKV4W3Y$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/auth/dist/chunk-6CKV4W3Y.js [app-rsc] (ecmascript)");
;
;
}),
"[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/auth/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$chunk$2d$6CKV4W3Y$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Playground/ACT.test/packages/auth/dist/chunk-6CKV4W3Y.js [app-rsc] (ecmascript)");
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Playground$2f$ACT$2e$test$2f$packages$2f$auth$2f$dist$2f$chunk$2d$6CKV4W3Y$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthProvider"], {
                brandId: "acme",
                children: children
            }, void 0, false, {
                fileName: "[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/layout.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/layout.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Playground/ACT.test/brands/acme-frontend/src/app/layout.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_Playground_ACT_test_9a2b6cb1._.js.map