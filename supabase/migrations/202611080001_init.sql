create extension if not exists pgcrypto;

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  country text,
  dob date,
  kyc_level text not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  currency text not null,
  available bigint not null default 0,
  locked bigint not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, currency)
);

create table if not exists public.wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete restrict,
  tx_type text not null,
  reason_code text not null,
  amount bigint not null check (amount <> 0),
  balance_after bigint not null,
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'active',
  rules_version_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id uuid not null references public.games(id),
  mode text not null,
  ticket_cost integer not null default 1,
  status text not null default 'started',
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.game_outcomes (
  session_id uuid primary key references public.game_sessions(id) on delete cascade,
  score integer not null,
  coins_delta bigint not null default 0,
  xp_delta bigint not null default 0,
  reward_credit_delta bigint not null default 0,
  rng_ref_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.seasons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'draft',
  start_at timestamptz not null,
  end_at timestamptz not null,
  rules_version_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null,
  score bigint not null default 0,
  rank integer,
  tie_break_payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(season_id, user_id, mode)
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
  user_id uuid not null references auth.users(id) on delete cascade,
  reward_id uuid not null references public.reward_catalog(id),
  credits_spent bigint not null,
  status text not null,
  review_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.withdrawals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  channel text not null,
  amount bigint not null,
  status text not null default 'requested',
  risk_score numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  amount bigint not null,
  currency text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_order_id uuid not null references public.payment_orders(id) on delete cascade,
  provider_event_id text not null unique,
  event_type text not null,
  payload_hash text not null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  channel text not null,
  template text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.support_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  status text not null default 'open',
  priority text not null default 'normal',
  created_at timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.support_threads(id) on delete cascade,
  sender_type text not null,
  sender_user_id uuid,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.legal_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null,
  policy_version text not null,
  granted boolean not null,
  ip inet,
  created_at timestamptz not null default now()
);

create table if not exists public.anti_fraud_flags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  flag_type text not null,
  severity text not null,
  status text not null default 'open',
  evidence_ref text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

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

create index if not exists idx_wallet_ledger_wallet_created on public.wallet_ledger(wallet_id, created_at desc);
create index if not exists idx_game_sessions_user_started on public.game_sessions(user_id, started_at desc);
create index if not exists idx_reward_orders_user_created on public.reward_orders(user_id, created_at desc);
create index if not exists idx_withdrawals_user_created on public.withdrawals(user_id, created_at desc);
create index if not exists idx_notifications_user_status on public.notifications(user_id, status);
create index if not exists idx_support_threads_user_status on public.support_threads(user_id, status);
create index if not exists idx_legal_consents_user_type on public.legal_consents(user_id, consent_type);
create index if not exists idx_audit_logs_entity_created on public.audit_logs(entity_type, entity_id, created_at desc);

create or replace function public.prevent_update_delete_wallet_ledger()
returns trigger language plpgsql as $$
begin
  raise exception 'wallet_ledger is append-only';
end;
$$;

drop trigger if exists trg_wallet_ledger_no_mutation on public.wallet_ledger;
create trigger trg_wallet_ledger_no_mutation
before update or delete on public.wallet_ledger
for each row execute function public.prevent_update_delete_wallet_ledger();

create or replace function public.prevent_mutation_audit_logs()
returns trigger language plpgsql as $$
begin
  raise exception 'audit_logs is immutable';
end;
$$;

drop trigger if exists trg_audit_logs_no_mutation on public.audit_logs;
create trigger trg_audit_logs_no_mutation
before update or delete on public.audit_logs
for each row execute function public.prevent_mutation_audit_logs();

alter table public.user_profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_ledger enable row level security;
alter table public.reward_orders enable row level security;
alter table public.withdrawals enable row level security;
alter table public.notifications enable row level security;
alter table public.support_threads enable row level security;
alter table public.support_messages enable row level security;
alter table public.legal_consents enable row level security;

create policy user_profiles_owner_select on public.user_profiles for select using (auth.uid() = user_id);
create policy user_profiles_owner_upsert on public.user_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy wallets_owner_select on public.wallets for select using (auth.uid() = user_id);
create policy wallets_owner_insert on public.wallets for insert with check (auth.uid() = user_id);

create policy wallet_ledger_owner_select on public.wallet_ledger
for select using (
  exists (select 1 from public.wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

create policy reward_orders_owner_select on public.reward_orders for select using (auth.uid() = user_id);
create policy reward_orders_owner_insert on public.reward_orders for insert with check (auth.uid() = user_id);

create policy withdrawals_owner_select on public.withdrawals for select using (auth.uid() = user_id);
create policy withdrawals_owner_insert on public.withdrawals for insert with check (auth.uid() = user_id);

create policy notifications_owner_select on public.notifications for select using (auth.uid() = user_id);
create policy notifications_owner_update on public.notifications for update using (auth.uid() = user_id);

create policy support_threads_owner_all on public.support_threads
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy support_messages_owner_select on public.support_messages
for select using (
  exists (select 1 from public.support_threads t where t.id = thread_id and t.user_id = auth.uid())
);
create policy support_messages_owner_insert on public.support_messages
for insert with check (
  sender_user_id = auth.uid()
  and exists (select 1 from public.support_threads t where t.id = thread_id and t.user_id = auth.uid())
);

create policy legal_consents_owner_select on public.legal_consents for select using (auth.uid() = user_id);
create policy legal_consents_owner_insert on public.legal_consents for insert with check (auth.uid() = user_id);
