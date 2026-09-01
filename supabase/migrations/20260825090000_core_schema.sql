-- Maria Controla V1: fundamento, cadastros e isolamento por negócio.
create extension if not exists pgcrypto;

create type public.membership_role as enum ('owner','admin','operator');
create type public.record_status as enum ('active','archived','blocked','inactive');
create type public.location_type as enum ('own','partner');
create type public.license_status as enum ('trial','active','grace','blocked','cancelled');

create table public.businesses (
  id uuid primary key default gen_random_uuid(), name text not null check (length(trim(name)) > 0),
  login_code text not null unique check (login_code = lower(trim(login_code)) and login_code ~ '^[a-z0-9][a-z0-9.-]{2,31}$'),
  support_code text not null unique, status public.record_status not null default 'active',
  timezone text not null default 'America/Sao_Paulo', version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), archived_at timestamptz
);
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade, full_name text not null,
  phone_whatsapp text,
  status public.record_status not null default 'active', version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.plans (
  id uuid primary key default gen_random_uuid(), name text not null unique, status public.record_status not null default 'active',
  max_users integer, max_devices integer, max_partner_points integer, features jsonb not null default '{}'::jsonb,
  version bigint not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.business_memberships (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id),
  user_id uuid not null references auth.users(id), username text not null,
  username_normalized text generated always as (lower(trim(username))) stored,
  role public.membership_role not null, status public.record_status not null default 'active',
  joined_at timestamptz, version bigint not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (char_length(trim(username)) between 3 and 64),
  unique (business_id,user_id), unique (business_id,username_normalized), unique (id,business_id)
);
create index business_memberships_user_business_idx on public.business_memberships(user_id,business_id) where status = 'active';
create table public.licenses (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), plan_id uuid references public.plans(id),
  status public.license_status not null, starts_at timestamptz not null default now(), expires_at timestamptz, grace_until timestamptz,
  limit_overrides jsonb not null default '{}'::jsonb, notes text, version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index licenses_current_idx on public.licenses(business_id,status,expires_at);
create table public.registered_devices (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id),
  membership_id uuid not null, installation_id uuid not null, friendly_name text, device_summary jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'active', first_seen_at timestamptz not null default now(), last_seen_at timestamptz not null default now(), released_at timestamptz,
  version bigint not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(business_id,installation_id), foreign key(membership_id,business_id) references public.business_memberships(id,business_id), unique(id,business_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), name text not null, normalized_name text not null,
  origin text not null default 'custom' check(origin in ('template','custom')), active boolean not null default true, display_order integer not null default 0,
  version bigint not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), archived_at timestamptz,
  unique(business_id,normalized_name), unique(id,business_id)
);
create table public.products (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), category_id uuid,
  name text not null, normalized_name text not null, unit text not null default 'unidade', default_sale_price_cents bigint check(default_sale_price_cents >= 0),
  photo_path text, notes text, active boolean not null default true, version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), archived_at timestamptz,
  unique(id,business_id), foreign key(category_id,business_id) references public.categories(id,business_id)
);
create index products_business_name_idx on public.products(business_id,normalized_name) where active;
create table public.suppliers (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), name text not null, normalized_name text not null,
  phone_whatsapp text, location_text text, notes text, active boolean not null default true, version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), archived_at timestamptz, unique(id,business_id)
);
create table public.partner_points (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), name text not null, normalized_name text not null,
  contact_name text, phone_whatsapp text, notes text, status public.record_status not null default 'active', version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), archived_at timestamptz, unique(id,business_id)
);
create table public.stock_locations (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), type public.location_type not null, name text not null,
  partner_point_id uuid, active boolean not null default true, version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(id,business_id), foreign key(partner_point_id,business_id) references public.partner_points(id,business_id),
  check ((type = 'own' and partner_point_id is null) or (type = 'partner' and partner_point_id is not null))
);
create unique index one_own_location_per_business on public.stock_locations(business_id) where type='own' and active;
create unique index one_location_per_partner on public.stock_locations(partner_point_id) where type='partner' and active;
create table public.partner_product_prices (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), partner_point_id uuid not null, product_id uuid not null,
  sale_price_cents bigint not null check(sale_price_cents >= 0), active boolean not null default true, version bigint not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  foreign key(partner_point_id,business_id) references public.partner_points(id,business_id), foreign key(product_id,business_id) references public.products(id,business_id)
);
create unique index active_partner_product_price_idx on public.partner_product_prices(business_id,partner_point_id,product_id) where active;
create table public.inventory_thresholds (
  id uuid primary key default gen_random_uuid(), business_id uuid not null references public.businesses(id), product_id uuid not null, stock_location_id uuid not null,
  minimum_quantity integer not null check(minimum_quantity >= 0), version bigint not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(business_id,product_id,stock_location_id), foreign key(product_id,business_id) references public.products(id,business_id), foreign key(stock_location_id,business_id) references public.stock_locations(id,business_id)
);
