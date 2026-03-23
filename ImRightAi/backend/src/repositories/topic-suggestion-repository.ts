/**
 * 유저가 제안한 토론 주제를 저장하고 운영 검수 상태를 관리하는 DB 접근 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface TopicSuggestionRecord {
  id: string;
  user_id: string;
  title: string;
  option_a: string;
  option_b: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
}

/**
 * 랭킹 화면에서 제출한 새 주제를 pending 상태로 저장한다.
 */
export async function createPendingSuggestion(
  supabase: SupabaseClient,
  input: {
    userId: string;
    title: string;
    optionA: string;
    optionB: string;
  }
): Promise<TopicSuggestionRecord> {
  const { data, error } = await supabase
    .from('topic_suggestions')
    .insert({
      user_id: input.userId,
      title: input.title,
      option_a: input.optionA,
      option_b: input.optionB
    })
    .select('id, user_id, title, option_a, option_b, status, created_at, reviewed_at')
    .single<TopicSuggestionRecord>();

  if (error) {
    throw error;
  }

  return data;
}
