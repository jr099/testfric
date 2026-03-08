insert into public.users (id, email) values
  ('00000000-0000-0000-0000-000000000001', 'demo@pulseplay.local')
on conflict do nothing;
