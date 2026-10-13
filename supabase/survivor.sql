-- 랜덤 히어로 서바이버: 전진 거리 랭킹 표
-- Supabase 대시보드 → SQL Editor 에 붙여 넣고 Run 한 번.
-- 판마다 한 줄. 누구나 읽기·추가만 가능, 수정·삭제 불가 (디펜스 runs 표와 같은 방식).
create table if not exists public.survivor_runs (
  id bigint generated always as identity primary key,
  pid text not null,
  nick text,
  m integer not null,
  k integer not null default 0,
  t integer not null default 0,
  lv integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists survivor_runs_rank on public.survivor_runs (m desc, k desc, t asc);
alter table public.survivor_runs enable row level security;

drop policy if exists "survivor_runs_read" on public.survivor_runs;
drop policy if exists "survivor_runs_add" on public.survivor_runs;
create policy "survivor_runs_read" on public.survivor_runs for select to anon, authenticated using (true);
create policy "survivor_runs_add" on public.survivor_runs for insert to anon, authenticated
  with check (m between 0 and 1000000 and k between 0 and 100000000 and t between 0 and 86400
              and char_length(pid) <= 40 and char_length(coalesce(nick,'')) <= 24);

grant select, insert on public.survivor_runs to anon, authenticated;
