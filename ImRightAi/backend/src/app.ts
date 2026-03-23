/**
 * Fastify 인스턴스를 생성하고 공통 설정과 라우트를 조립한다.
 * 현재 단계에서는 서버 기동과 헬스체크 검증에 필요한 최소 구성을 제공한다.
 */
import Fastify from 'fastify';

import { registerAuthPlugin } from './plugins/auth.js';
import { registerRateLimitPlugin } from './plugins/rate-limit.js';
import { registerRequestIdPlugin } from './plugins/request-id.js';
import { registerSupabasePlugin } from './plugins/supabase.js';
import { registerHealthRoutes } from './routes/health.js';

/**
 * 이후 인증, DB, 비즈니스 라우트를 확장할 수 있도록 앱 초기화 진입점을 분리한다.
 */
export function buildApp() {
  const app = Fastify({
    logger: true
  });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    void reply.status(500).send({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    });
  });

  void app.register(registerRequestIdPlugin);
  void app.register(registerSupabasePlugin);
  void app.register(registerAuthPlugin);
  void app.register(registerRateLimitPlugin);
  void app.register(registerHealthRoutes, { prefix: '/v1' });

  return app;
}
