/**
 * 서버 전역에서 재사용할 Supabase admin client를 등록한다.
 * 백엔드만 DB에 접근하는 구조를 유지하기 위해 service role key를 사용한다.
 */
import type { FastifyInstance } from 'fastify';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { env } from '../config/env.js';

declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

/**
 * 애플리케이션 시작 시 단일 Supabase client를 생성해 데코레이터로 노출한다.
 */
export async function registerSupabasePlugin(app: FastifyInstance) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  app.decorate('supabase', supabase);
}
