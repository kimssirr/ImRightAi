-- 경제 상태와 일일 제한을 원자적으로 갱신하는 DB 함수를 추가한다.
-- read-modify-write 경쟁 상태를 막기 위해 ticket/daily_limits 업데이트를 SQL에 캡슐화한다.

create or replace function increment_retry_ticket(p_user_id uuid)
returns table (
  id uuid,
  user_id uuid,
  type text,
  balance integer,
  updated_at timestamptz
)
language sql
as $$
  insert into tickets (user_id, type, balance, updated_at)
  values (p_user_id, 'retry', 1, now())
  on conflict (user_id, type)
  do update
    set balance = tickets.balance + 1,
        updated_at = now()
  returning tickets.id, tickets.user_id, tickets.type, tickets.balance, tickets.updated_at;
$$;

create or replace function decrement_retry_ticket(p_user_id uuid)
returns table (
  id uuid,
  user_id uuid,
  type text,
  balance integer,
  updated_at timestamptz
)
language sql
as $$
  update tickets
     set balance = balance - 1,
         updated_at = now()
   where user_id = p_user_id
     and type = 'retry'
     and balance > 0
  returning tickets.id, tickets.user_id, tickets.type, tickets.balance, tickets.updated_at;
$$;

create or replace function mark_free_play_used(
  p_user_id uuid,
  p_date date
)
returns table (
  user_id uuid,
  date date,
  free_play_used boolean,
  rewarded_retry_count integer,
  updated_at timestamptz
)
language sql
as $$
  insert into daily_limits (user_id, date, free_play_used, rewarded_retry_count, updated_at)
  values (p_user_id, p_date, true, 0, now())
  on conflict (user_id, date)
  do update
    set free_play_used = true,
        updated_at = now()
  returning
    daily_limits.user_id,
    daily_limits.date,
    daily_limits.free_play_used,
    daily_limits.rewarded_retry_count,
    daily_limits.updated_at;
$$;

create or replace function rollback_aborted_free_play(
  p_user_id uuid,
  p_date date
)
returns table (
  user_id uuid,
  date date,
  free_play_used boolean,
  rewarded_retry_count integer,
  updated_at timestamptz
)
language sql
as $$
  update daily_limits
     set free_play_used = false,
        updated_at = now()
   where user_id = p_user_id
     and date = p_date
     and free_play_used = true
  returning
    daily_limits.user_id,
    daily_limits.date,
    daily_limits.free_play_used,
    daily_limits.rewarded_retry_count,
    daily_limits.updated_at;
$$;

create or replace function increment_rewarded_retry_count(
  p_user_id uuid,
  p_date date
)
returns table (
  user_id uuid,
  date date,
  free_play_used boolean,
  rewarded_retry_count integer,
  updated_at timestamptz
)
language sql
as $$
  insert into daily_limits (user_id, date, free_play_used, rewarded_retry_count, updated_at)
  values (p_user_id, p_date, false, 1, now())
  on conflict (user_id, date)
  do update
    set rewarded_retry_count = daily_limits.rewarded_retry_count + 1,
        updated_at = now()
  returning
    daily_limits.user_id,
    daily_limits.date,
    daily_limits.free_play_used,
    daily_limits.rewarded_retry_count,
    daily_limits.updated_at;
$$;
