/**
 * 오늘의 토론 주제와 주제 메타데이터를 조회하는 DB 접근 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface TopicRecord {
  id: string;
  date: string;
  title: string;
  option_a: string;
  option_b: string;
  created_at: string;
}

/**
 * 한국 시간 기준 특정 날짜의 토론 주제를 조회한다.
 */
export async function findTopicByDate(
  supabase: SupabaseClient,
  date: string
): Promise<TopicRecord | null> {
  const { data, error } = await supabase
    .from('topics')
    .select('id, date, title, option_a, option_b, created_at')
    .eq('date', date)
    .maybeSingle<TopicRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 게임 시작 시 topic id의 유효성을 확인할 때 사용한다.
 */
export async function findTopicById(supabase: SupabaseClient, topicId: string): Promise<TopicRecord | null> {
  const { data, error } = await supabase
    .from('topics')
    .select('id, date, title, option_a, option_b, created_at')
    .eq('id', topicId)
    .maybeSingle<TopicRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 개발/운영 시 테스트 토픽을 넣거나 배치 생성 결과를 저장할 때 사용한다.
 */
export async function createTopic(
  supabase: SupabaseClient,
  input: {
    date: string;
    title: string;
    optionA: string;
    optionB: string;
  }
): Promise<TopicRecord> {
  const { data, error } = await supabase
    .from('topics')
    .insert({
      date: input.date,
      title: input.title,
      option_a: input.optionA,
      option_b: input.optionB
    })
    .select('id, date, title, option_a, option_b, created_at')
    .single<TopicRecord>();

  if (error) {
    throw error;
  }

  return data;
}
