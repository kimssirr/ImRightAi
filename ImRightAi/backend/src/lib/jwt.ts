/**
 * 세션 토큰에 담기는 JWT payload 구조를 한곳에서 정의한다.
 * 인증 관련 타입이 route와 service 전반에서 일관되게 사용되도록 유지한다.
 */
export interface SessionJwtPayload {
  userId: string;
  guestSessionId: string;
}
