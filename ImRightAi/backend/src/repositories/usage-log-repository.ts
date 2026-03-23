/**
 * LLM 호출별 토큰, 지연, 추정 비용을 기록하는 DB 접근 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UsageLogRecord {
  id: string;
  game_id: string | null;
  model: string;
  stage: 'opening' | 'rebuttal' | 'judge' | 'moderation';
  input_tokens: number;
  cached_input_tokens: number;
  output_tokens: number;
  latency_ms: number;
  estimated_cost_usd: string | null;
  created_at: string;
}

/**
 * 각 LLM 호출 직후 사용량을 남겨 일별 비용과 판당 비용을 집계할 수 있게 한다.
 */
export async function createUsageLog(
  supabase: SupabaseClient,
  input: {
    gameId?: string | null;
    model: string;
    stage: 'opening' | 'rebuttal' | 'judge' | 'moderation';
    inputTokens?: number;
    cachedInputTokens?: number;
    outputTokens?: number;
    latencyMs?: number;
    estimatedCostUsd?: number | null;
  }
): Promise<UsageLogRecord> {
  const { data, error } = await supabase
    .from('usage_logs')
    .insert({
      game_id: input.gameId ?? null,
      model: input.model,
      stage: input.stage,
      input_tokens: input.inputTokens ?? 0,
      cached_input_tokens: input.cachedInputTokens ?? 0,
      output_tokens: input.outputTokens ?? 0,
      latency_ms: input.latencyMs ?? 0,
      estimated_cost_usd: input.estimatedCostUsd ?? null
    })
    .select(
      'id, game_id, model, stage, input_tokens, cached_input_tokens, output_tokens, latency_ms, estimated_cost_usd, created_at'
    )
    .single<UsageLogRecord>();

  if (error) {
    throw error;
  }

  return data;
}
