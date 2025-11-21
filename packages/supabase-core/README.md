# Supabase Core Package

Store reusable database helpers, generated types, and SQL migrations here. The folder currently contains a `migrations/` directory that mirrors the migrations created by the Supabase CLI.

Recommended structure:

```
packages/supabase-core/
  migrations/       # SQL files generated via `supabase migration new`
  src/
    client.ts       # createSupabaseClient helpers for backend/frontends
    auth.ts         # tenant-aware auth utilities
  package.json
```

Generate API types after each migration:

```
supabase gen types typescript --schema public > packages/supabase-core/src/types.ts
```

Import shared helpers from other workspaces to keep brand-specific packages slim.
