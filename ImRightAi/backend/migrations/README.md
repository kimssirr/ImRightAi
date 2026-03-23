# 백엔드 migration 파일의 역할과 적용 순서를 정리한다.

- `001_init.sql`: MVP에 필요한 핵심 테이블, 인덱스, 리더보드 뷰를 생성한다.
- `002_atomic_helpers.sql`: ticket과 daily limit을 원자적으로 갱신하는 DB 함수를 추가한다.
- Supabase SQL Editor 또는 `psql`로 순서대로 실행한다.
- 런타임 repository는 `002_atomic_helpers.sql`의 RPC 함수에 의존하므로, `001`만 적용한 상태로 서버를 실행하면 안 된다.
- 이후 스키마 변경은 기존 파일 수정 대신 새 migration 파일을 추가한다.
