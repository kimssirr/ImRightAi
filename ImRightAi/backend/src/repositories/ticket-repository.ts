/**
 * 광고 보상으로 얻는 retry ticket 잔액을 읽고 갱신하는 DB 접근 함수를 제공한다.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

import { toRepositoryError } from '../lib/errors.js';

export interface TicketRecord {
  id: string;
  user_id: string;
  type: 'retry';
  balance: number;
  updated_at: string;
}

export interface TicketMutationResult {
  ok: boolean;
  ticket: TicketRecord | null;
}

/**
 * 사용자의 retry ticket 잔액을 조회한다.
 * 아직 행이 없으면 0으로 간주할 수 있도록 null을 허용한다.
 */
export async function findRetryTicket(
  supabase: SupabaseClient,
  userId: string
): Promise<TicketRecord | null> {
  const { data, error } = await supabase
    .from('tickets')
    .select('id, user_id, type, balance, updated_at')
    .eq('user_id', userId)
    .eq('type', 'retry')
    .maybeSingle<TicketRecord>();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 광고 보상 지급 후 잔액을 1 증가시킨다.
 * 경쟁 상태를 막기 위해 DB 함수에서 insert-or-increment를 원자적으로 수행한다.
 */
export async function incrementRetryBalance(
  supabase: SupabaseClient,
  userId: string
): Promise<TicketRecord> {
  const { data, error } = await supabase.rpc('increment_retry_ticket', {
    p_user_id: userId
  });

  if (error) {
    throw toRepositoryError(error, 'increment_retry_ticket');
  }

  const ticket = (data as TicketRecord[])[0];

  if (!ticket) {
    throw new Error('increment_retry_ticket returned no row');
  }

  return ticket;
}

/**
 * 추가 플레이 시작 전에 retry ticket 1개를 차감한다.
 * balance > 0 조건을 DB 함수에 넣어 차감 가능 여부를 원자적으로 보장한다.
 */
export async function decrementRetryBalance(
  supabase: SupabaseClient,
  userId: string
): Promise<TicketMutationResult> {
  const { data, error } = await supabase.rpc('decrement_retry_ticket', {
    p_user_id: userId
  });

  if (error) {
    throw toRepositoryError(error, 'decrement_retry_ticket');
  }

  const ticket = (data as TicketRecord[])[0] ?? null;

  return {
    ok: ticket !== null,
    ticket
  };
}

/**
 * 응답 조합에 필요한 현재 잔액 숫자만 빠르게 조회한다.
 */
export async function getRetryBalance(supabase: SupabaseClient, userId: string): Promise<number> {
  const ticket = await findRetryTicket(supabase, userId);
  return ticket?.balance ?? 0;
}
