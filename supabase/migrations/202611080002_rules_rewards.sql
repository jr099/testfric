create or replace function public.get_wallet_statement(p_user_id uuid)
returns table(currency text, available bigint, locked bigint)
language sql security definer as $$
  select w.currency, w.available, w.locked
  from public.wallets w
  where w.user_id = p_user_id;
$$;

create or replace function public.precheck_withdrawal(p_user_id uuid, p_amount bigint)
returns table(is_allowed boolean, reason text)
language sql security definer as $$
  select
    case when p_amount > 0 then true else false end as is_allowed,
    case when p_amount > 0 then 'ok' else 'amount_must_be_positive' end as reason;
$$;

create or replace function public.check_reward_eligibility(p_user_id uuid, p_reward_id uuid)
returns table(is_eligible boolean, reason text)
language sql security definer as $$
  select true as is_eligible, 'policy_check_placeholder' as reason;
$$;

revoke all on function public.get_wallet_statement(uuid) from public;
grant execute on function public.get_wallet_statement(uuid) to authenticated;

revoke all on function public.precheck_withdrawal(uuid,bigint) from public;
grant execute on function public.precheck_withdrawal(uuid,bigint) to authenticated;

revoke all on function public.check_reward_eligibility(uuid,uuid) from public;
grant execute on function public.check_reward_eligibility(uuid,uuid) to authenticated;
