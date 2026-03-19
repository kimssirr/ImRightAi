# ImRight AI
## Figma UI Blueprint

> 목적: [11-frontend-ui-spec.md](/Users/kimssirr/Documents/Playground/ImRightAi/11-frontend-ui-spec.md)를 기반으로 실제 Figma 프레임 제작에 바로 사용할 수 있는 시각 설계 기준을 정리한다.
> 상태: Draft v0.1

---

## 1. 디자인 컨셉

- 키워드: `논리 게임`, `가벼운 경쟁`, `집중형 토론`, `모바일 퍼스트`
- 인상:
  - 지나치게 장난감 같지 않다
  - AI 서비스처럼 차갑기만 하지 않다
  - 점수와 랭킹에서 경쟁의 긴장감을 준다
- 시각 방향:
  - 배경은 아주 밝은 웜 그레이 기반
  - 핵심 카드는 화이트 또는 소프트 틴트
  - CTA와 점수 강조에는 선명한 오렌지-레드 계열 사용
  - AI/유저 입장 구분에는 네이비와 앰버 계열을 사용

---

## 2. 컬러 시스템

### Core

- `Primary / 600`: `#F05A28`
- `Primary / 500`: `#FF6B3D`
- `Primary / 100`: `#FFE4D9`
- `Ink / 900`: `#18181B`
- `Ink / 700`: `#3F3F46`
- `Ink / 500`: `#71717A`
- `Line / 200`: `#E4E4E7`
- `Surface / Base`: `#F7F4EF`
- `Surface / Card`: `#FFFFFF`

### Semantic

- `AI`: `#243B53`
- `AI Soft`: `#EAF1F8`
- `User`: `#A04A00`
- `User Soft`: `#FFF1E2`
- `Success`: `#18794E`
- `Success Soft`: `#E7F6ED`
- `Warning`: `#B7791F`
- `Warning Soft`: `#FFF7E0`
- `Error`: `#C53030`
- `Error Soft`: `#FEEBEC`

### Usage Rules

- 메인 CTA, 점수 하이라이트, 선택 상태는 `Primary`
- 정보 텍스트와 일반 헤더는 `Ink`
- 토론 버블은 `AI Soft`, `User Soft`로 명확히 구분
- 에러/제한 상태는 채도 높은 빨강 대신 소프트 배경 + 진한 텍스트 조합

---

## 3. 타이포그래피

- 제목 계열:
  - `Pretendard SemiBold` 또는 `SUIT SemiBold`
- 숫자/점수 강조:
  - `Montserrat Bold` 또는 `Space Grotesk Bold`
- 본문:
  - `Pretendard Regular`

### Scale

- `Display`: 32/38
- `H1`: 26/32
- `H2`: 22/28
- `H3`: 18/24
- `Body`: 15/22
- `Body Small`: 13/18
- `Caption`: 12/16

### Rules

- 홈의 `오늘의 주제`와 결과 점수는 강한 대비를 준다
- 토론 화면 본문은 15px 이상 유지해 읽기 피로를 줄인다
- 랭킹 숫자와 점수는 숫자 전용 서체로 차별화한다

---

## 4. 레이아웃 기준

### Frame

- `Mobile M`: `390x844`
- `Tablet`: `768x1024`
- `Desktop`: `1440x1024`

### Grid

- 모바일:
  - 좌우 마진 `16`
  - 기본 간격 `8, 12, 16, 24`
  - 하단 탭 포함 safe area 확보
- 태블릿:
  - 좌우 마진 `24`
  - 8컬럼 기반
- 데스크톱:
  - 좌우 마진 `80`
  - 12컬럼 기반
  - 메인 콘텐츠 최대 폭 `1200`

### Radius / Shadow

- 카드 라운드: `20`
- 버튼 라운드: `16`
- 입력창 라운드: `14`
- 모달 라운드: `24`
- 기본 그림자:
  - `0 10 30 rgba(24,24,27,0.08)`

---

## 5. 핵심 컴포넌트 가이드

### BottomTabBar

- 높이 `72-80`
- 활성 탭은 아이콘 배경 칩 + 라벨 강조
- 토론 화면에서는 숨김

### TopicCard

- 구조:
  - 날짜
  - 타이틀
  - A/B 옵션 2개
- 옵션은 대립 구도가 보이도록 상하 배치보다 좌우 또는 카드 내부 분할 우선

### StatusCard

- 한 카드 안에 `무료 플레이`, `retry`, `닉네임 상태`를 요약
- 상태별로 배경 틴트만 약하게 다르게 준다

### ChoiceCard

- 선택 전은 얇은 보더
- 선택 시 `Primary 500` 보더 + 소프트 배경 + 체크 아이콘

### DebateBubble

- AI:
  - 좌측 정렬
  - 네이비 라벨 또는 `AI`
- User:
  - 우측 정렬
  - 앰버 라벨 또는 `나`
- 최대 폭:
  - 모바일 `82%`
  - 데스크톱 `720px` 대화 축 안에서 유지

### ScoreCard

- 점수 숫자는 가장 강하게
- 세부 breakdown은 3개 정도의 pill 또는 row로 요약

### QuoteCard

- 큰 따옴표 장식보다 핵심 문장을 또렷하게 보여주는 카드 중심

### Modal

- 모바일은 바텀시트
- 데스크톱은 중앙 모달
- CTA는 2개 이하로 유지

---

## 6. 화면별 제작 지침

### 6.1 Home / Default

- 첫 화면에서 순서:
  - 서비스 타이틀
  - 오늘의 주제 카드
  - 메인 CTA
  - 상태 카드
  - 보조 CTA
  - 광고 슬롯
- 메인 CTA는 viewport 첫 화면 안에 노출
- 주제 카드가 가장 크고 시선을 먼저 가져가야 한다

### 6.2 Home / Free Used

- 상태 카드의 무료 소진 상태를 더 강하게 표시
- `한 판 더 하기`는 직접 노출하지 않고 기본 CTA는 유지

### 6.3 Play Entry / Choice

- 상단 설명은 짧게
- A/B 카드 높이는 동일
- 선택 전 CTA 비활성화 상태가 명확해야 한다

### 6.4 Debate / Round 1

- 상단 바는 최소 높이
- 대화 축은 중앙 정렬
- 입력창은 하단 고정
- 보조 정보는 작은 톤으로만 제공

### 6.5 Debate / AI Thinking

- 마지막 AI 버블 아래 `thinking indicator` 노출
- 지나치게 화려한 로딩 모션보다 점 3개 또는 skeleton line 사용

### 6.6 Debate / Moderation Error

- 입력창 위 또는 내부 하단에 인라인 에러
- 전체 모달 차단보다 즉시 수정 가능한 형태 우선

### 6.7 Result / Unsaved

- 점수 카드가 최상단
- 그 아래 대표 문구 카드
- 저장 CTA를 가장 강하게
- `한 판 더 하기`는 secondary

### 6.8 Result / Saved

- 저장 완료 배지를 점수 카드 내부 또는 상단에 표시
- 다음 행동은 `랭킹 보기`, `한 판 더 하기`

### 6.9 Modal / Nickname

- 가입 플로우처럼 보이지 않게 텍스트를 최대한 짧게
- 입력창, 안내, CTA만 남긴다

### 6.10 Modal / Retry Ad

- 선택형 보상 구조로 보여야 한다
- 광고 자체보다 `1회 추가 도전` 보상을 강조

### 6.11 Leaderboard / Default

- 상위 3명은 카드형, 나머지는 리스트형
- 내 순위 카드는 스크롤 중에도 시야에 잘 들어오게 상단 배치

### 6.12 Leaderboard / Empty

- 빈 상태에서도 `오늘의 주제 플레이` CTA 제공 가능

### 6.13 My Page / No Nickname

- 닉네임 유도 카드 먼저
- 기록 영역은 빈 상태 메시지와 함께 간결하게

### 6.14 My Page / History

- 요약 카드 후 기록 리스트
- 각 row에서 점수와 대표 문구가 빠르게 읽혀야 한다

### 6.15 Desktop Variants

- `Desktop / Home`:
  - 좌측에 주제 카드 + CTA
  - 우측에 상태 카드 + 랭킹 프리뷰
- `Desktop / Leaderboard`:
  - 상위권 카드와 순위 리스트를 2영역 구성 가능
- `Desktop / Debate`:
  - 중앙 대화축 유지
  - 좌우 여백은 넓게 두고 실제 읽기 폭은 제한

---

## 7. 프로토타이핑 흐름

- `Home / Default -> Play Entry / Choice`
- `Play Entry / Choice -> Debate / Round 1`
- `Debate / Round 1 -> Debate / AI Thinking`
- `Debate / Round 1 -> Debate / Moderation Error`
- `Debate / Round 1 -> Result / Unsaved`
- `Result / Unsaved -> Modal / Nickname`
- `Result / Unsaved -> Modal / Retry Ad`
- `Result / Unsaved -> Leaderboard / Default`
- `Leaderboard / Default -> Play Entry / Choice`
- `My Page / No Nickname -> Modal / Nickname`

---

## 8. Figma 구성 방식

### Page 추천

1. `00 Foundations`
2. `01 Components`
3. `02 Mobile`
4. `03 Tablet`
5. `04 Desktop`
6. `05 Prototype`

### Variable 추천

- Color
- Spacing
- Radius
- Elevation
- Text Styles

### Component Set 추천

- `Button / Primary | Secondary | Ghost | Disabled`
- `Card / Topic | Status | Score | Quote`
- `Bubble / AI | User`
- `Modal / Nickname | Retry`
- `Tab / Default | Active`
- `List Row / Leaderboard | History`

---

## 9. 우선 제작 순서

1. `Home / Default`
2. `Play Entry / Choice`
3. `Debate / Round 1`
4. `Result / Unsaved`
5. `Modal / Nickname`
6. `Leaderboard / Default`
7. `My Page / History`
8. 데스크톱 3종 확장

---

## 10. 작업 메모

- MVP 기준으로는 아이콘 종류를 최소화한다
- 광고 영역은 실제 광고 비주얼 대신 neutral placeholder로만 표현한다
- 토론 화면은 장식보다 가독성과 입력 안정성이 우선이다
- 홈과 결과 화면만 상대적으로 강한 시각 리듬을 준다
