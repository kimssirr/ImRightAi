/**
 * 백엔드 실행에 필요한 환경변수를 로드하고,
 * 누락되거나 잘못된 설정을 서버 시작 전에 차단한다.
 */
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  HOST: z.string().min(1).default('0.0.0.0'),
  JWT_SECRET: z.string().min(16),
  GEMINI_API_KEY: z.string().min(1).optional(),
  SUPABASE_URL: z.url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  GENERATION_MODEL: z.string().min(1).default('gemini-2.5-flash-lite'),
  JUDGE_MODEL: z.string().min(1).default('gemini-2.5-flash-lite'),
  ADS_RETRY_ENABLED: z
    .string()
    .default('true')
    .transform((value) => value === 'true'),
  MAX_RETRY_PER_DAY: z.coerce.number().int().min(0).default(0),
  MAX_OUTPUT_TOKENS_OPENING: z.coerce.number().int().min(1).default(140),
  MAX_OUTPUT_TOKENS_REBUTTAL: z.coerce.number().int().min(1).default(140),
  MAX_OUTPUT_TOKENS_JUDGE: z.coerce.number().int().min(1).default(120),
  REQUEST_TIMEOUT_MS: z.coerce.number().int().min(1000).default(12000),
  KST_TIMEZONE: z.string().min(1).default('Asia/Seoul')
});

/**
 * 애플리케이션 전역에서 재사용할 정규화된 환경변수 객체를 제공한다.
 */
export const env = envSchema.parse(process.env);
