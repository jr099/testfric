insert into public.games (slug, title, status) values
  ('pulse-tap', 'Pulse Tap', 'active'),
  ('memory-grid', 'Memory Grid', 'active')
on conflict (slug) do nothing;

insert into public.reward_catalog (title, reward_type, credit_cost, stock, status) values
  ('Avatar Neon Pack', 'digital', 150, null, 'active'),
  ('Gift Card 10', 'external', 1000, 100, 'active')
on conflict do nothing;
