/**
 * 게임 세션 상태와 저장 결과를 다루는 DB 접근 함수를 제공한다.
 * 점수 확정, 저장 처리, 내 기록 조회처럼 게임 단위 쿼리를 모은다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface GameRecord {
  id: string;
  user_id: string;
  topic_id: string;
  user_choice: 'A' | 'B';
  status: 'active' | 'finished' | 'aborted';
  score: number | null;
  saved_quote: string | null;
  saved_at: string | null;
  leaderboard_included_at: string | null;
  created_at: string;
  finished_at: string | null;
}

export interface SavedGameListItem {
  gameId: string;
  topicTitle: string;
  userChoice: 'A' | 'B';
  status: 'active' | 'finished' | 'aborted';
  score: number | null;
  savedQuote: string | null;
  createdAt: string;
  finishedAt: string | null;
}

interface SavedGameRow {
  id: string;
  user_choice: 'A' | 'B';
  status: 'active' | 'finished' | 'aborted';
  score: number | null;
  saved_quote: string | null;
  created_at: string;
  finished_at: string | null;
  topics: {
    title: string;
  } | Array<{
    title: string;
  }> | null;
}

/**
 * 게임 시작 시 active 상태의 새 게임 레코드를 생성한다.
 */
export async function createGame(
  supabase: SupabaseClient,
  input: {
    userId: string;
    topicId: string;
    userChoice: 'A' | 'B';
  }
): Promise<GameRecord> {
  const { data, error } = await supabase
    .from('games')
    .insert({
      user_id: input.userId,
      topic_id: input.topicId,
      user_choice: input.userChoice
    })
    .select(
      'id, user_id, topic_id, user_choice, status, score, saved_quote, saved_at, leaderboard_included_at, created_at, finished_at'
    )
    .single<GameRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * game id와 소유 사용자 id를 함께 검사해 다른 사용자의 게임 접근을 막는다.
 */
export async function findGameById(
  supabase: SupabaseClient,
  gameId: string,
  userId?: string
): Promise<GameRecord | null> {
  let query = supabase
    .from('games')
    .select(
      'id, user_id, topic_id, user_choice, status, score, saved_quote, saved_at, leaderboard_included_at, created_at, finished_at'
    )
    .eq('id', gameId);

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query.maybeSingle<GameRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 마지막 유저 발화 제출 후 점수와 대표 문구를 확정하고 finished 상태로 전환한다.
 */
export async function markFinished(
  supabase: SupabaseClient,
  input: {
    gameId: string;
    score: number;
    savedQuote: string;
    finishedAt: string;
  }
): Promise<GameRecord> {
  const { data, error } = await supabase
    .from('games')
    .update({
      status: 'finished',
      score: input.score,
      saved_quote: input.savedQuote,
      finished_at: input.finishedAt
    })
    .eq('id', input.gameId)
    .select(
      'id, user_id, topic_id, user_choice, status, score, saved_quote, saved_at, leaderboard_included_at, created_at, finished_at'
    )
    .single<GameRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 중단된 게임을 aborted로 전환한다.
 * 무료 플레이나 ticket 복구 판단은 service에서 따로 처리한다.
 */
export async function markAborted(
  supabase: SupabaseClient,
  gameId: string
): Promise<GameRecord> {
  const { data, error } = await supabase
    .from('games')
    .update({
      status: 'aborted'
    })
    .eq('id', gameId)
    .select(
      'id, user_id, topic_id, user_choice, status, score, saved_quote, saved_at, leaderboard_included_at, created_at, finished_at'
    )
    .single<GameRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 이미 끝난 게임을 저장 처리하고 필요하면 리더보드 반영 시각도 함께 기록한다.
 */
export async function markSaved(
  supabase: SupabaseClient,
  input: {
    gameId: string;
    savedAt: string;
    leaderboardIncludedAt: string | null;
  }
): Promise<GameRecord> {
  const { data, error } = await supabase
    .from('games')
    .update({
      saved_at: input.savedAt,
      leaderboard_included_at: input.leaderboardIncludedAt
    })
    .eq('id', input.gameId)
    .select(
      'id, user_id, topic_id, user_choice, status, score, saved_quote, saved_at, leaderboard_included_at, created_at, finished_at'
    )
    .single<GameRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 내 기록 화면에서 저장된 게임 목록만 페이지네이션해 조회한다.
 * cursor는 created_at ISO 문자열을 사용해 단순 정렬 기준을 맞춘다.
 */
export async function listSavedGamesByUser(
  supabase: SupabaseClient,
  input: {
    userId: string;
    limit: number;
    cursor?: string;
  }
): Promise<SavedGameListItem[]> {
  let query = supabase
    .from('games')
    .select(
      'id, user_choice, status, score, saved_quote, created_at, finished_at, topics!inner(title)'
    )
    .eq('user_id', input.userId)
    .not('saved_at', 'is', null)
    .order('created_at', { ascending: false })
    .limit(input.limit);

  if (input.cursor) {
    query = query.lt('created_at', input.cursor);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const rows = data as SavedGameRow[];

  return rows.map((row) => ({
    gameId: row.id,
    topicTitle: Array.isArray(row.topics) ? row.topics[0]?.title ?? '' : row.topics?.title ?? '',
    userChoice: row.user_choice,
    status: row.status,
    score: row.score,
    savedQuote: row.saved_quote,
    createdAt: row.created_at,
    finishedAt: row.finished_at
  }));
}
