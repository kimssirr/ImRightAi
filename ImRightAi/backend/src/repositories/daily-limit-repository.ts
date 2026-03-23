/**
 * 일일 무료 플레이와 광고 재도전 횟수를 관리하는 DB 접근 함수를 제공한다.
 * 서버는 이 저장소를 기반으로 한국 시간 기준 제한 상태를 판단한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

import { toRepositoryError } from '../lib/errors.js';

export interface DailyLimitRecord {
  user_id: string;
  date: string;
  free_play_used: boolean;
  rewarded_retry_count: number;
  updated_at: string;
}

/**
 * 특정 사용자의 당일 제한 상태를 조회한다.
 */
export async function findDailyLimitByUserAndDate(
  supabase: SupabaseClient,
  userId: string,
  date: string
): Promise<DailyLimitRecord | null> {
  const { data, error } = await supabase
    .from('daily_limits')
    .select('user_id, date, free_play_used, rewarded_retry_count, updated_at')
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle<DailyLimitRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 무료 플레이 사용을 확정한다.
 * 이미 사용한 상태를 다시 false로 되돌리는 일반 목적 함수로 쓰이지 않도록 mark 전용 RPC만 호출한다.
 */
export async function markFreePlayUsed(
  supabase: SupabaseClient,
  input: {
    userId: string;
    date: string;
  }
): Promise<DailyLimitRecord> {
  const { data, error } = await supabase.rpc('mark_free_play_used', {
    p_user_id: input.userId,
    p_date: input.date
  });

  if (error) {
    throw toRepositoryError(error, 'mark_free_play_used');
  }

  const dailyLimit = (data as DailyLimitRecord[])[0];

  if (!dailyLimit) {
    throw new Error('mark_free_play_used returned no row');
  }

  return dailyLimit;
}

/**
 * 무료로 시작한 게임이 aborted 되었을 때만 하루 무료 사용 상태를 롤백한다.
 * 일반 상태 동기화와 분리해 잘못된 재개방을 막는다.
 */
export async function rollbackAbortedFreePlay(
  supabase: SupabaseClient,
  input: {
    userId: string;
    date: string;
  }
): Promise<DailyLimitRecord | null> {
  const { data, error } = await supabase.rpc('rollback_aborted_free_play', {
    p_user_id: input.userId,
    p_date: input.date
  });

  if (error) {
    throw toRepositoryError(error, 'rollback_aborted_free_play');
  }

  return ((data as DailyLimitRecord[])[0] ?? null);
}

/**
 * 광고 보상 지급이 확정된 뒤 당일 광고 재도전 횟수를 증가시킨다.
 * free_play_used는 유지하고 rewarded_retry_count만 DB에서 원자 증가시킨다.
 */
export async function incrementRewardedRetryCount(
  supabase: SupabaseClient,
  input: {
    userId: string;
    date: string;
  }
): Promise<DailyLimitRecord> {
  const { data, error } = await supabase.rpc('increment_rewarded_retry_count', {
    p_user_id: input.userId,
    p_date: input.date
  });

  if (error) {
    throw toRepositoryError(error, 'increment_rewarded_retry_count');
  }

  const dailyLimit = (data as DailyLimitRecord[])[0];

  if (!dailyLimit) {
    throw new Error('increment_rewarded_retry_count returned no row');
  }

  return dailyLimit;
}
