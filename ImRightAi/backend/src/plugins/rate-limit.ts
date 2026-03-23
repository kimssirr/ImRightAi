/**
 * 공통 rate limit 정책을 등록해 초기 단계부터 과도한 요청을 방어한다.
 * 세부 정책은 endpoint가 늘어날 때 route별 설정으로 확장한다.
 */
import fastifyRateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';

/**
 * MVP 기본값으로 1분당 요청 횟수를 제한하고, 프록시 환경을 고려해 식별값을 계산한다.
 */
export async function registerRateLimitPlugin(app: FastifyInstance) {
  await app.register(fastifyRateLimit, {
    global: true,
    max: 120,
    timeWindow: '1 minute',
    keyGenerator: (request) => {
      const forwardedFor = request.headers['x-forwarded-for'];
      const forwardedIp = typeof forwardedFor === 'string' ? forwardedFor.split(',')[0]?.trim() : undefined;

      return forwardedIp || request.ip;
    },
    errorResponseBuilder: () => ({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests'
      }
    })
  });
}
