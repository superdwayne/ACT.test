# Brands Workspace

Each directory under `brands/` should contain assets and code that tailor the shared applications for a specific tenant. The example `acme-frontend` package shows how to read the shared tenant configuration and can be expanded into a full Next.js app that imports components from `frontend_next`.

## Creating a New Brand

1. Duplicate the `acme-frontend` folder and rename it.
2. Update the scripts so `BRAND_ID` matches the new tenant id.
3. Add overrides (theme tokens, routes, feature toggles) that consume helpers from `@act/tenant-config`.
4. Register the brand in `packages/tenant-config/src/index.ts` so both frontend and backend code can discover it.
