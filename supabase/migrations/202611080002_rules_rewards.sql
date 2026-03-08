create table if not exists public.rule_versions (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  version text not null,
  payload jsonb not null,
  effective_from timestamptz not null,
  effective_to timestamptz,
  created_at timestamptz not null default now(),
  unique(domain, version)
);

create table if not exists public.reward_catalog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  reward_type text not null,
  credit_cost bigint not null,
  stock integer,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.reward_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  reward_id uuid not null references public.reward_catalog(id),
  credits_spent bigint not null,
  status text not null,
  review_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
