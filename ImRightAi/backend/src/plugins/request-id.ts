/**
 * 모든 요청에 추적 가능한 request id를 부여해 로그와 장애 분석 기준을 통일한다.
 */
import type { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';

/**
 * 클라이언트가 보낸 id를 우선 사용하되, 없으면 서버에서 새 값을 발급한다.
 */
export async function registerRequestIdPlugin(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    const headerValue = request.headers['x-request-id'];
    const requestId = typeof headerValue === 'string' && headerValue.trim() ? headerValue : randomUUID();

    request.headers['x-request-id'] = requestId;
    reply.header('x-request-id', requestId);
  });
}
