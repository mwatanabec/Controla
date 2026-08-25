-- RLS: o negócio vem do vínculo autenticado, nunca do navegador.
create or replace function public.can_read_business(p_business_id uuid) returns boolean language sql stable security definer set search_path=public,auth as $$ select exists(select 1 from public.business_memberships m where m.business_id=p_business_id and m.user_id=auth.uid() and m.status='active') $$;
do $$ declare t text; begin foreach t in array array['businesses','business_memberships','licenses','registered_devices','categories','products','suppliers','partner_points','stock_locations','partner_product_prices','inventory_thresholds','purchases','purchase_items','stock_transfers','stock_transfer_items','sales','sale_items','inventory_events','inventory_event_items','stock_movements','stock_balances','settlements','settlement_items','settlement_item_adjustments','settlement_credits','settlement_payments','sync_commands','sync_conflicts','change_log'] loop execute format('alter table public.%I enable row level security',t); execute format('revoke insert,update,delete on public.%I from anon, authenticated',t); execute format('create policy read_own_business on public.%I for select to authenticated using (public.can_read_business(business_id))',t); end loop; end $$;
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
revoke insert,update,delete,select on public.plans from anon, authenticated;
create policy read_own_profile on public.profiles for select to authenticated using(user_id=auth.uid());
revoke all on function public.apply_stock_movement(uuid,uuid,uuid,uuid,integer,text,text,uuid,uuid,timestamptz,uuid,uuid,boolean) from public;
revoke all on function public.create_settlement(uuid,uuid,uuid,timestamptz,bigint,jsonb,uuid,uuid) from public;
revoke all on function public.add_settlement_adjustment(uuid,uuid,integer,text,text,uuid,timestamptz,text) from public;
grant execute on function public.create_settlement(uuid,uuid,uuid,timestamptz,bigint,jsonb,uuid,uuid), public.add_settlement_adjustment(uuid,uuid,integer,text,text,uuid,timestamptz,text) to authenticated;
