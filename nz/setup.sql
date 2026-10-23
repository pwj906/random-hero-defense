-- 신혼여행 일정표 공유 저장소 (Supabase SQL Editor에서 한 번 실행)
create table if not exists public.trip_plan (
  k text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.trip_plan enable row level security;
revoke all on public.trip_plan from anon, authenticated;

create or replace function public.trip_get(p_key text)
returns jsonb language sql security definer set search_path = public as $$
  select t.data from public.trip_plan t where t.k = p_key;
$$;

create or replace function public.trip_patch(p_key text, p_patch jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare d jsonb;
begin
  if p_key is null or length(p_key) < 16 then raise exception 'bad key'; end if;
  if octet_length(p_patch::text) > 50000 then raise exception 'too large'; end if;
  insert into public.trip_plan as t (k, data) values (p_key, '{}'::jsonb)
    on conflict (k) do nothing;
  update public.trip_plan t set
    data = jsonb_build_object(
      'c', coalesce(t.data->'c', '{}'::jsonb) || coalesce(p_patch->'c', '{}'::jsonb),
      'n', coalesce(t.data->'n', '{}'::jsonb) || coalesce(p_patch->'n', '{}'::jsonb),
      'p', coalesce(t.data->'p', '{}'::jsonb) || coalesce(p_patch->'p', '{}'::jsonb)),
    updated_at = now()
  where t.k = p_key
  returning t.data into d;
  return d;
end $$;

grant execute on function public.trip_get(text) to anon;
grant execute on function public.trip_patch(text, jsonb) to anon;
