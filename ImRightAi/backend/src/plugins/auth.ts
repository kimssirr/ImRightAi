/**
 * JWT 발급과 인증 검증을 Fastify 전역 기능으로 등록한다.
 * 이후 보호된 API는 request.user와 authenticate preHandler를 공통으로 사용한다.
 */
import fastifyJwt from '@fastify/jwt';
import type { FastifyInstance, FastifyRequest } from 'fastify';

import { env } from '../config/env.js';
import type { SessionJwtPayload } from '../lib/jwt.js';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: SessionJwtPayload;
    user: SessionJwtPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}

/**
 * 토큰 서명과 검증 규칙을 등록하고, route에서 재사용할 인증 함수를 데코레이트한다.
 */
export async function registerAuthPlugin(app: FastifyInstance) {
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  });

  app.decorate('authenticate', async (request: FastifyRequest) => {
    await request.jwtVerify<SessionJwtPayload>();
  });
}
