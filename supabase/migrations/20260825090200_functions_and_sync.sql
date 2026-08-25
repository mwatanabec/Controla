-- Funções transacionais. Clientes executam RPCs; não gravam fatos diretamente.
create or replace function public.current_membership(p_business_id uuid)
returns public.business_memberships language sql stable security definer set search_path=public,auth as $$
 select m from public.business_memberships m where m.business_id=p_business_id and m.user_id=auth.uid() and m.status='active' limit 1
$$;
create or replace function public.assert_write_access(p_business_id uuid, p_owner_or_admin boolean default false)
returns void language plpgsql security definer set search_path=public,auth as $$
declare r public.membership_role; begin
 select role into r from public.current_membership(p_business_id);
 if r is null then raise exception 'business_access_denied' using errcode='42501'; end if;
 if p_owner_or_admin and r not in ('owner','admin') then raise exception 'owner_or_admin_required' using errcode='42501'; end if;
 if not exists(select 1 from public.licenses l where l.business_id=p_business_id and l.status in ('trial','active','grace') and (l.expires_at is null or l.expires_at>now() or l.grace_until>now())) then raise exception 'license_not_active' using errcode='42501'; end if;
end $$;
create or replace function public.apply_stock_movement(p_business_id uuid,p_product_id uuid,p_source uuid,p_destination uuid,p_quantity integer,p_type text,p_entity_type text,p_entity_id uuid,p_item_id uuid,p_occurred_at timestamptz,p_device_id uuid,p_command_id uuid,p_allow_offline_conflict boolean default false)
returns void language plpgsql security definer set search_path=public,auth as $$
declare q integer; begin
 if p_quantity<=0 or (p_source is null and p_destination is null) or p_source=p_destination then raise exception 'invalid_stock_movement'; end if;
 if p_source is not null then
  insert into public.stock_balances(business_id,product_id,stock_location_id) values(p_business_id,p_product_id,p_source) on conflict do nothing;
  select confirmed_quantity into q from public.stock_balances where business_id=p_business_id and product_id=p_product_id and stock_location_id=p_source for update;
  if exists(select 1 from public.stock_balances where business_id=p_business_id and product_id=p_product_id and stock_location_id=p_source and conflict_open) then raise exception 'stock_conflict_open'; end if;
  if q<p_quantity and not p_allow_offline_conflict then raise exception 'insufficient_stock'; end if;
  update public.stock_balances set confirmed_quantity=q-p_quantity,version=version+1,conflict_open=(q-p_quantity<0),updated_at=now() where business_id=p_business_id and product_id=p_product_id and stock_location_id=p_source;
  if q-p_quantity<0 then insert into public.sync_conflicts(business_id,command_id,conflict_type,entity_type,entity_id,server_summary) values(p_business_id,p_command_id,'negative_stock','stock_balance',p_product_id,jsonb_build_object('location_id',p_source,'quantity',q-p_quantity)); end if;
 end if;
 if p_destination is not null then insert into public.stock_balances(business_id,product_id,stock_location_id,confirmed_quantity) values(p_business_id,p_product_id,p_destination,p_quantity) on conflict(business_id,product_id,stock_location_id) do update set confirmed_quantity=stock_balances.confirmed_quantity+excluded.confirmed_quantity,version=stock_balances.version+1,updated_at=now(); end if;
 insert into public.stock_movements(business_id,product_id,movement_type,source_location_id,destination_location_id,quantity,source_entity_type,source_entity_id,source_item_id,occurred_at,recorded_by,device_id,command_id) values(p_business_id,p_product_id,p_type,p_source,p_destination,p_quantity,p_entity_type,p_entity_id,p_item_id,p_occurred_at,auth.uid(),p_device_id,p_command_id);
end $$;
create or replace function public.create_settlement(p_business_id uuid,p_settlement_id uuid,p_partner_id uuid,p_occurred_at timestamptz,p_agreed bigint,p_items jsonb,p_device_id uuid default null,p_command_id uuid default null)
returns uuid language plpgsql security definer set search_path=public,auth as $$
declare x jsonb; calc bigint:=0; allocated integer; price bigint; item_id uuid; qty integer; item_calc bigint; n integer:=0; total_calc bigint:=0; running bigint:=0; begin
 perform public.assert_write_access(p_business_id); if p_agreed<0 or jsonb_typeof(p_items)<>'array' then raise exception 'invalid_settlement'; end if;
 for x in select value from jsonb_array_elements(p_items) loop
  item_id=(x->>'sale_item_id')::uuid; qty=(x->>'quantity_considered')::integer;
  select si.unit_price_cents into price from public.sale_items si join public.sales s on s.id=si.sale_id where si.id=item_id and si.business_id=p_business_id and s.partner_point_id=p_partner_id and s.status='confirmed' for share;
  if price is null or qty<=0 then raise exception 'invalid_settlement_item'; end if;
  select coalesce(sum(quantity_considered),0) into allocated from public.settlement_items where sale_item_id=item_id;
  if allocated+qty>(select quantity from public.sale_items where id=item_id) then raise exception 'exceeded_allocation'; end if;
  total_calc:=total_calc+qty*price;
 end loop;
 insert into public.settlements(id,business_id,partner_point_id,calculated_amount_cents,agreed_amount_cents,difference_amount_cents,occurred_at,recorded_by,device_id,command_id) values(p_settlement_id,p_business_id,p_partner_id,total_calc,p_agreed,p_agreed-total_calc,p_occurred_at,auth.uid(),p_device_id,p_command_id);
 for x in select value from jsonb_array_elements(p_items) loop n:=n+1; item_id=(x->>'sale_item_id')::uuid; qty=(x->>'quantity_considered')::integer; select unit_price_cents into price from public.sale_items where id=item_id; item_calc:=qty*price; running:=running+item_calc; insert into public.settlement_items(id,business_id,settlement_id,sale_item_id,quantity_considered,calculated_amount_cents,agreed_amount_cents) values(gen_random_uuid(),p_business_id,p_settlement_id,item_id,qty,item_calc,case when n=jsonb_array_length(p_items) then p_agreed-coalesce((select sum(agreed_amount_cents) from public.settlement_items where settlement_id=p_settlement_id),0) else floor(p_agreed*item_calc::numeric/total_calc) end); end loop;
 return p_settlement_id; end $$;
create or replace function public.add_settlement_adjustment(p_business_id uuid,p_settlement_item_id uuid,p_quantity integer,p_type text,p_source_type text,p_source_id uuid,p_occurred_at timestamptz,p_reason text default null)
returns uuid language plpgsql security definer set search_path=public,auth as $$
declare si public.settlement_items; st public.settlements; q integer; aid uuid:=gen_random_uuid(); amount bigint; begin
 perform public.assert_write_access(p_business_id); select * into si from public.settlement_items where id=p_settlement_item_id and business_id=p_business_id for update; select * into st from public.settlements where id=si.settlement_id for update; select coalesce(sum(quantity),0) into q from public.settlement_item_adjustments where settlement_item_id=si.id; if si.id is null or p_quantity<=0 or q+p_quantity>si.quantity_considered then raise exception 'invalid_adjustment'; end if; amount:=round(si.agreed_amount_cents::numeric*p_quantity/si.quantity_considered); insert into public.settlement_item_adjustments(id,business_id,settlement_item_id,sale_item_id,adjustment_type,quantity,calculated_amount_cents,agreed_amount_cents,source_entity_type,source_entity_id,reason,occurred_at,recorded_by) values(aid,p_business_id,si.id,si.sale_item_id,p_type,p_quantity,round(si.calculated_amount_cents::numeric*p_quantity/si.quantity_considered),amount,p_source_type,p_source_id,p_reason,p_occurred_at,auth.uid()); if st.status='paid' then insert into public.settlement_credits(business_id,partner_point_id,adjustment_id,amount_cents) values(p_business_id,st.partner_point_id,aid,amount); else update public.settlements set agreed_amount_cents=greatest(0,agreed_amount_cents-amount),difference_amount_cents=agreed_amount_cents-calculated_amount_cents,status=case when paid_amount_cents=0 then 'open' else 'partially_paid' end where id=st.id; end if; return aid; end $$;
create or replace function public.recover_expired_sync_commands() returns integer language plpgsql security definer set search_path=public as $$ declare n integer; begin update public.sync_commands set status='retry_wait',processing_started_at=null,next_attempt_at=now(),last_error_code='processing_interrupted' where status='processing' and processing_expires_at<now(); get diagnostics n=row_count; return n; end $$;
create or replace function public.sync_cursor_mode(p_business_id uuid,p_cursor bigint) returns text language sql stable security definer set search_path=public,auth as $$ select case when p_cursor is null or p_cursor < coalesce((select min(sequence) from public.change_log where business_id=p_business_id and changed_at>=now()-interval '180 days'),0) then 'snapshot_required' else 'incremental' end $$;
create or replace function public.prune_change_log() returns integer language plpgsql security definer set search_path=public as $$ declare n integer; begin delete from public.change_log where changed_at < now()-interval '180 days'; get diagnostics n=row_count; return n; end $$;
