-- Initial multi-tenant schema
-- Creates a simple profiles table with brand scoping and RLS

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  brand_id text not null,
  email text not null unique,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Scope row access to the brand in the JWT claims
create policy profiles_select_own_brand
  on public.profiles for select
  using ((auth.jwt() ->> 'brand_id') = brand_id);

create policy profiles_insert_own_brand
  on public.profiles for insert
  with check ((auth.jwt() ->> 'brand_id') = brand_id);

create policy profiles_update_own_brand
  on public.profiles for update
  using ((auth.jwt() ->> 'brand_id') = brand_id);
