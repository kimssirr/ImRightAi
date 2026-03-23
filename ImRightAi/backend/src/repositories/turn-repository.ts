/**
 * 게임 내 발화 기록을 저장하고 순서대로 조회하는 DB 접근 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface TurnRecord {
  id: string;
  game_id: string;
  round: number;
  speaker: 'ai' | 'user';
  text: string;
  created_at: string;
}

/**
 * opening, rebuttal, user 입력을 모두 동일한 구조로 저장한다.
 */
export async function createTurn(
  supabase: SupabaseClient,
  input: {
    gameId: string;
    round: number;
    speaker: 'ai' | 'user';
    text: string;
  }
): Promise<TurnRecord> {
  const { data, error } = await supabase
    .from('turns')
    .insert({
      game_id: input.gameId,
      round: input.round,
      speaker: input.speaker,
      text: input.text
    })
    .select('id, game_id, round, speaker, text, created_at')
    .single<TurnRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 판정이나 복구 로직에서 전체 턴 로그를 다시 읽어야 할 때 사용한다.
 */
export async function listTurnsByGameId(
  supabase: SupabaseClient,
  gameId: string
): Promise<TurnRecord[]> {
  const { data, error } = await supabase
    .from('turns')
    .select('id, game_id, round, speaker, text, created_at')
    .eq('game_id', gameId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
