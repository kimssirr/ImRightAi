/**
 * 환경변수를 로드한 뒤 Fastify 앱을 실행하는 백엔드 프로세스 진입점이다.
 */
import { env } from './config/env.js';
import { buildApp } from './app.js';

/**
 * 서버 시작 실패를 즉시 드러내고 종료 코드를 명확히 남긴다.
 */
async function startServer() {
  const app = buildApp();

  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT
    });
  } catch (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
}

void startServer();
