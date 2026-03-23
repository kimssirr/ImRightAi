/**
 * 광고 보상 중복 지급을 막기 위한 idempotency claim 저장 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface RewardClaimRecord {
  id: string;
  user_id: string;
  idempotency_key: string;
  ad_provider_event_id: string | null;
  type: 'retry';
  created_at: string;
}

/**
 * 같은 광고 완료 이벤트가 여러 번 들어와도 한 번만 저장되도록 unique key를 사용한다.
 */
export async function insertUniqueClaim(
  supabase: SupabaseClient,
  input: {
    userId: string;
    idempotencyKey: string;
    adProviderEventId?: string;
  }
): Promise<RewardClaimRecord | null> {
  const { data, error } = await supabase
    .from('reward_claims')
    .insert({
      user_id: input.userId,
      idempotency_key: input.idempotencyKey,
      ad_provider_event_id: input.adProviderEventId ?? null,
      type: 'retry'
    })
    .select('id, user_id, idempotency_key, ad_provider_event_id, type, created_at')
    .maybeSingle<RewardClaimRecord>();

  if (error) {
    const isDuplicate = error.code === '23505';

    if (isDuplicate) {
      return null;
    }

    throw error;
  }

  return data;
}
