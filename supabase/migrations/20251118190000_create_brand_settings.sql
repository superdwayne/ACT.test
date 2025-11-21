-- Create brand_settings table to store extracted brand guidelines
-- Each brand can have multiple settings (voice, visual, social, messaging, guidelines)

create table if not exists public.brand_settings (
  id uuid primary key default gen_random_uuid(),
  brand_id text not null,
  setting_type text not null, -- 'voice_tone', 'visual_identity', 'social_media', 'messaging', 'guidelines'
  setting_data jsonb not null, -- The actual setting data (flexible JSON structure)
  confidence_score numeric(3, 2), -- 0.00 to 1.00
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by text,
  updated_by text,
  
  -- Ensure one active setting per type per brand
  constraint unique_active_brand_setting unique (brand_id, setting_type) 
    where (is_active = true)
);

-- Index for faster lookups
create index if not exists idx_brand_settings_brand_id on public.brand_settings(brand_id);
create index if not exists idx_brand_settings_type on public.brand_settings(brand_id, setting_type);
create index if not exists idx_brand_settings_active on public.brand_settings(brand_id, is_active) where is_active = true;

-- Enable RLS
alter table public.brand_settings enable row level security;

-- RLS Policies
create policy brand_settings_select_own_brand
  on public.brand_settings for select
  using ((auth.jwt() ->> 'brand_id') = brand_id or brand_id = current_setting('app.brand_id'));

create policy brand_settings_insert_own_brand
  on public.brand_settings for insert
  with check ((auth.jwt() ->> 'brand_id') = brand_id or brand_id = current_setting('app.brand_id', true));

create policy brand_settings_update_own_brand
  on public.brand_settings for update
  using ((auth.jwt() ->> 'brand_id') = brand_id or brand_id = current_setting('app.brand_id', true));

create policy brand_settings_delete_own_brand
  on public.brand_settings for delete
  using ((auth.jwt() ->> 'brand_id') = brand_id or brand_id = current_setting('app.brand_id', true));

-- Function to update updated_at timestamp
create or replace function update_brand_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger update_brand_settings_timestamp
  before update on public.brand_settings
  for each row
  execute function update_brand_settings_updated_at();

