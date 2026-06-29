create extension if not exists pgcrypto;

create table if not exists public.diagnosis_requests (
  id uuid primary key default gen_random_uuid(),
  intake_type text not null default 'free_diagnosis',
  initial_concern text,
  issue_text text,
  industry text,
  flyer_purpose text,
  target_audience text,
  distribution_method text,
  distribution_area text,
  distribution_volume text,
  desired_response text,
  current_response_status text,
  service_price text,
  strengths text,
  competitor_difference text,
  current_offer text,
  contact_flow text,
  reference_url text,
  review_focus text,
  desired_improvement text,
  company_name text,
  customer_name text,
  email text not null,
  phone text,
  flyer_file_name text,
  flyer_file_type text,
  flyer_file_size bigint,
  flyer_file_path text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  intake_type text not null default 'direct_contact',
  source text,
  business_type text,
  company_name text,
  industry text,
  customer_name text,
  name text,
  email text not null,
  phone text,
  topic text,
  message text,
  inquiry_detail text,
  production_item text,
  preferred_timing text,
  budget text,
  current_challenge text,
  promotion_challenge text,
  promotion_channels text,
  consulting_scope text,
  goal text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists diagnosis_requests_created_at_idx
  on public.diagnosis_requests (created_at desc);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

alter table public.diagnosis_requests enable row level security;
alter table public.contact_requests enable row level security;

insert into storage.buckets (id, name, public)
values ('flyer-files', 'flyer-files', false)
on conflict (id) do nothing;
