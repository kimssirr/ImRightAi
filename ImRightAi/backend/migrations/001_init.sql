-- ImRight AI MVP에 필요한 핵심 테이블과 뷰를 초기 생성한다.
-- 세션, 게임, 리더보드, 광고 보상, 사용량 추적의 기준 스키마를 한 번에 맞춘다.

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  guest_session_key text not null unique,
  nickname text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  check (nickname is null or char_length(trim(nickname)) between 1 and 10)
);

create index if not exists users_last_seen_at_idx
  on users (last_seen_at desc);

create table if not exists daily_limits (
  user_id uuid not null references users(id) on delete cascade,
  date date not null,
  free_play_used boolean not null default false,
  rewarded_retry_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, date),
  check (rewarded_retry_count >= 0)
);

create index if not exists daily_limits_date_idx
  on daily_limits (date desc);

create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  title text not null,
  option_a text not null,
  option_b text not null,
  created_at timestamptz not null default now(),
  check (char_length(trim(title)) between 1 and 120),
  check (char_length(trim(option_a)) between 1 and 80),
  check (char_length(trim(option_b)) between 1 and 80),
  check (option_a <> option_b)
);

create table if not exists topic_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  option_a text not null,
  option_b text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  check (char_length(trim(title)) between 10 and 40),
  check (char_length(trim(option_a)) between 2 and 20),
  check (char_length(trim(option_b)) between 2 and 20),
  check (option_a <> option_b),
  check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists topic_suggestions_user_created_idx
  on topic_suggestions (user_id, created_at desc);

create index if not exists topic_suggestions_status_created_idx
  on topic_suggestions (status, created_at desc);

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete restrict,
  user_choice text not null,
  status text not null default 'active',
  score integer,
  saved_quote text,
  saved_at timestamptz,
  leaderboard_included_at timestamptz,
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  check (user_choice in ('A', 'B')),
  check (status in ('active', 'finished', 'aborted')),
  check (score is null or score between 0 and 100),
  check (saved_quote is null or char_length(saved_quote) between 1 and 2000),
  check ((status = 'finished' and finished_at is not null) or status <> 'finished'),
  check (saved_at is null or status = 'finished'),
  check (leaderboard_included_at is null or saved_at is not null)
);

create index if not exists games_user_created_idx
  on games (user_id, created_at desc);

create index if not exists games_topic_created_idx
  on games (topic_id, created_at desc);

create index if not exists games_status_idx
  on games (status);

create index if not exists games_finished_score_idx
  on games (finished_at desc, score desc)
  where status = 'finished';

create index if not exists games_saved_at_idx
  on games (saved_at desc)
  where saved_at is not null;

create table if not exists turns (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete cascade,
  round integer not null,
  speaker text not null,
  text text not null,
  created_at timestamptz not null default now(),
  check (round between 1 and 3),
  check (speaker in ('ai', 'user')),
  check (char_length(text) between 1 and 2000)
);

create index if not exists turns_game_created_idx
  on turns (game_id, created_at asc);

create index if not exists turns_game_round_speaker_idx
  on turns (game_id, round, speaker);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null default 'retry',
  balance integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, type),
  check (type in ('retry')),
  check (balance >= 0)
);

create table if not exists reward_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  idempotency_key text not null unique,
  ad_provider_event_id text,
  type text not null default 'retry',
  created_at timestamptz not null default now(),
  check (type in ('retry'))
);

create index if not exists reward_claims_user_created_idx
  on reward_claims (user_id, created_at desc);

create index if not exists reward_claims_ad_event_idx
  on reward_claims (ad_provider_event_id)
  where ad_provider_event_id is not null;

create table if not exists usage_logs (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete set null,
  model text not null,
  stage text not null,
  input_tokens integer not null default 0,
  cached_input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  latency_ms integer not null default 0,
  estimated_cost_usd numeric(12, 6),
  created_at timestamptz not null default now(),
  check (stage in ('opening', 'rebuttal', 'judge', 'moderation')),
  check (input_tokens >= 0),
  check (cached_input_tokens >= 0),
  check (output_tokens >= 0),
  check (latency_ms >= 0),
  check (estimated_cost_usd is null or estimated_cost_usd >= 0)
);

create index if not exists usage_logs_game_created_idx
  on usage_logs (game_id, created_at desc);

create index if not exists usage_logs_model_stage_created_idx
  on usage_logs (model, stage, created_at desc);

create index if not exists usage_logs_created_idx
  on usage_logs (created_at desc);

create or replace view daily_leaderboard_view as
with ranked_games as (
  select
    g.id as game_id,
    g.user_id,
    u.nickname,
    g.saved_quote,
    t.date,
    g.score,
    g.finished_at,
    row_number() over (
      partition by g.user_id, t.date
      order by g.score desc, g.finished_at asc
    ) as rn
  from games g
  join users u on u.id = g.user_id
  join topics t on t.id = g.topic_id
  where g.status = 'finished'
    and g.saved_at is not null
    and g.leaderboard_included_at is not null
    and u.nickname is not null
)
select
  date,
  user_id,
  nickname,
  saved_quote,
  score as best_score,
  finished_at as best_finished_at
from ranked_games
where rn = 1;
