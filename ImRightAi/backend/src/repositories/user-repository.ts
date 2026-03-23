/**
 * 사용자 세션 엔터티를 조회하고 갱신하는 DB 접근 함수를 제공한다.
 * 닉네임 변경, 세션 복구, 기본 통계 조회에 필요한 쿼리만 담당한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UserRecord {
  id: string;
  guest_session_key: string;
  nickname: string | null;
  created_at: string;
  last_seen_at: string;
}

export interface UserProfileStats {
  totalFinishedGames: number;
  bestScore: number;
}

/**
 * guest session key로 기존 사용자를 복구할 때 사용한다.
 */
export async function findByGuestSessionKey(
  supabase: SupabaseClient,
  guestSessionKey: string
): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, guest_session_key, nickname, created_at, last_seen_at')
    .eq('guest_session_key', guestSessionKey)
    .maybeSingle<UserRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 인증된 사용자 id로 현재 프로필을 조회할 때 사용한다.
 */
export async function findById(supabase: SupabaseClient, userId: string): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, guest_session_key, nickname, created_at, last_seen_at')
    .eq('id', userId)
    .maybeSingle<UserRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 최초 방문 사용자를 생성한다.
 * 닉네임은 선택값이며 세션 생성 시점에 함께 저장할 수 있다.
 */
export async function createGuestUser(
  supabase: SupabaseClient,
  input: {
    guestSessionKey: string;
    nickname?: string;
  }
): Promise<UserRecord> {
  const { data, error } = await supabase
    .from('users')
    .insert({
      guest_session_key: input.guestSessionKey,
      nickname: input.nickname ?? null
    })
    .select('id, guest_session_key, nickname, created_at, last_seen_at')
    .single<UserRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 세션 복구 시 마지막 접속 시각을 갱신한다.
 */
export async function touchLastSeen(
  supabase: SupabaseClient,
  userId: string,
  lastSeenAt: string
): Promise<void> {
  const { error } = await supabase.from('users').update({ last_seen_at: lastSeenAt }).eq('id', userId);

  if (error) {
    throw error;
  }
}

/**
 * 결과 저장 전에 닉네임을 설정하거나 변경할 때 사용한다.
 */
export async function updateNickname(
  supabase: SupabaseClient,
  userId: string,
  nickname: string
): Promise<UserRecord> {
  const { data, error } = await supabase
    .from('users')
    .update({ nickname })
    .eq('id', userId)
    .select('id, guest_session_key, nickname, created_at, last_seen_at')
    .single<UserRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 내 기록 화면과 프로필 요약에서 사용할 완료 게임 수와 최고 점수를 계산한다.
 */
export async function getProfileStats(
  supabase: SupabaseClient,
  userId: string
): Promise<UserProfileStats> {
  const { data, error } = await supabase
    .from('games')
    .select('score')
    .eq('user_id', userId)
    .eq('status', 'finished')
    .not('saved_at', 'is', null);

  if (error) {
    throw error;
  }

  const totalFinishedGames = data.length;
  const bestScore = data.reduce<number>((maxScore, row) => {
    const score = typeof row.score === 'number' ? row.score : 0;
    return Math.max(maxScore, score);
  }, 0);

  return {
    totalFinishedGames,
    bestScore
  };
}
