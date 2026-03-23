/**
 * 서버 프로세스가 정상 기동했는지 빠르게 확인할 수 있는 헬스체크 엔드포인트를 등록한다.
 */
import type { FastifyInstance } from 'fastify';

/**
 * 외부 로드밸런서나 개발자가 서버 상태를 점검할 수 있도록 최소 응답을 제공한다.
 */
export async function registerHealthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return {
      ok: true,
      service: 'imrightai-backend'
    };
  });
}
