# Supabase Setup Guide

This project expects Supabase to manage authentication, brand-specific data, and multi-tenant policies. Follow the steps below to provision Supabase and connect it to the monorepo.

## 1. Create the Supabase Project

1. Sign in to [Supabase](https://supabase.com/) and create a new project.
2. Choose a region close to your users and generate a **strong** database password.
3. Once the project is live, note the following keys from the dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (keep this secret – backend only)

## 2. Configure Environment Variables

Add the new keys to environment files inside the monorepo:

```
# frontend_next/.env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_BRAND_ID=acme

# backend/.env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
PORT=4000

# brand overrides (optional)
brands/acme-frontend/.env.local
NEXT_PUBLIC_BRAND_ID=acme
```

> Tip: For local development you can duplicate the `.example` files and commit only the templates. Keep real values out of git.

## 3. Connect the Project Locally (CLI)

Install the Supabase CLI (requires Go 1.19+):

```
npm install -g supabase
```

Log in and link the project:

```
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

This enables you to run migrations from the repo.

## 4. Define the Schema and Tenants

1. Create a new schema per brand or reuse `public` with a `brand_id` column. Example SQL:

   ```sql
   create schema if not exists acme;

   create table if not exists public.profiles (
     id uuid primary key default gen_random_uuid(),
     brand_id text not null,
     email text not null,
     created_at timestamptz default now()
   );
   ```

2. Add the same brand identifiers to `packages/tenant-config/src/index.ts` so frontends and backends resolve the tenant metadata.

## 5. Enable Row Level Security

1. Enable RLS on multi-tenant tables:

   ```sql
   alter table public.profiles enable row level security;
   ```

2. Create policies that scope rows to the authenticated brand. One approach is to store the `brand_id` in JWT custom claims (set in Supabase Auth > Policies) and reference it in policies:

   ```sql
   create policy "Brand access" on public.profiles
     for select using (auth.jwt() ->> 'brand_id' = brand_id);
   ```

3. For service-role actions (backend jobs) you can bypass RLS or use the service key.

## 6. Store SQL Migrations in the Repo

1. Create `packages/supabase-core/migrations` (or reuse an existing folder) and export SQL files:

   ```bash
   supabase migration new init-schema
   ```

   This generates a timestamped migration under `supabase/migrations`. Move or mirror it into `packages/supabase-core/migrations` so it stays versioned with the monorepo.

2. Apply migrations locally or remotely:

   ```bash
   supabase db push          # local Docker stack
   supabase db remote commit # remote project
   ```

## 7. Wire Up the Backend

Inside `backend/src/server.ts`:

- Import the Supabase client:

  ```ts
  import { createClient } from '@supabase/supabase-js';
  import { getBrandConfig } from '@act/tenant-config';

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  ```

- For each request, resolve the brand (via subdomain, header, or JWT) and route to the correct schema.
- Use the service client for privileged operations; for user-facing routes, prefer using the `supabase.auth` helpers with the user's JWT.

## 8. Wire Up the Frontend

In `frontend_next` (or a brand-specific app):

```ts
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

- Read the `NEXT_PUBLIC_BRAND_ID` at runtime and pull styling / behavior from `@act/tenant-config`.
- Use Supabase Auth UI or custom forms that call `supabase.auth.signInWithOAuth` / `signInWithPassword`.

## 9. Deployments

- During CI, inject Supabase env vars via secrets. Only the backend should receive the service-role key.
- Run `npm run build --workspace backend` and `npm run build --workspace frontend_next` after migrations succeed.
- Optionally add scripts (`npm run supabase:migrate`) that call the CLI to keep migrations automated.

## 10. Ongoing Maintenance

- When adding a new brand: update the tenant config, create matching schema/roles in Supabase, seed defaults (logo, feature flags), and add env files for the new frontend/backend packages.
- Monitor Supabase auth hooks to ensure JWTs include `brand_id`. This keeps RLS policies simple and consistent.
- Rotate keys periodically and update environment stores (Vercel, Fly.io, etc.).

With these steps the monorepo can spin up isolated brand experiences while sharing infrastructure, data, and deployment workflows.
