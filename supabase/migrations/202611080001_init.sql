create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  currency text not null,
  available bigint not null default 0,
  locked bigint not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, currency)
);

create table if not exists public.wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id),
  tx_type text not null,
  reason_code text not null,
  amount bigint not null check (amount <> 0),
  balance_after bigint not null,
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  actor_type text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.wallets enable row level security;
alter table public.wallet_ledger enable row level security;
