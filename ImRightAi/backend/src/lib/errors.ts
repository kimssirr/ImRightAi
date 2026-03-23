/**
 * DB 함수나 외부 의존성 오류를 더 이해하기 쉬운 메시지로 변환한다.
 * 마이그레이션 누락처럼 자주 헷갈리는 배포 문제를 빠르게 식별하는 데 사용한다.
 */
export function toRepositoryError(error: unknown, rpcName: string): Error {
  const message = error instanceof Error ? error.message : String(error);
  const indicatesMissingRpc =
    message.includes(rpcName) ||
    message.includes('PGRST202') ||
    message.includes('Could not find the function');

  if (indicatesMissingRpc) {
    return new Error(
      `Required RPC "${rpcName}" is unavailable. Apply backend/migrations/002_atomic_helpers.sql before using this repository.`
    );
  }

  return error instanceof Error ? error : new Error(message);
}
