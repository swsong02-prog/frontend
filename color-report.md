# 코치코치 색 체계 적용 보고서 — 2026-10-11

기존 흰 카드·회색 바탕·중앙 max-width 1440 구조에 기능별 파스텔을 적용했다. 색은 아이콘 칩, 선택 상태, 3px 카드 상단 띠, 짧은 요약/코치 영역과 그래프에 배치했다. 화면별 메인 CTA는 기존 블루로 유지한다. 문구·라우팅·API·데이터 흐름은 수정하지 않았다.

## 새 팔레트와 대비비

HEX는 배경 / 잉크 순서다. 대비는 WCAG 상대 휘도 공식으로 계산했다. 잉크는 아이콘뿐 아니라 작은 본문에도 사용할 수 있도록 전부 AA 4.5:1 이상이다.

| 토큰 | HEX (배경 / 잉크) | 용도 | 지정 soft 위 대비 | 흰색 위 잉크 대비 |
| --- | --- | --- | --- | --- |
| `--sky-soft` / `--sky-ink` | #EFF6FF / #1D4ED8 | 면접·자세·보통 점수 | 6.16:1 | 6.70:1 |
| `--mint-soft` / `--mint-ink` | #EAF7F0 / #196045 | 피드백·강점·우수·성장 증가 | 6.81:1 | 7.50:1 |
| `--lilac-soft` / `--lilac-ink` | #F1EDFA / #6643A1 | 기록·성장·논리성·일부 직무 | 6.33:1 | 7.29:1 |
| `--peach-soft` / `--peach-ink` | #FFF0E6 / #994A24 | 자소서·답변 내용·개선 필요 | 5.61:1 | 6.25:1 |
| `--aqua-soft` / `--aqua-ink` | #E9F7F8 / #176571 | 공고·관심 회사·금융 직무 | 6.10:1 | 6.70:1 |
| `--rose-soft` / `--rose-ink` | #FBEFF3 / #A1355D | 임박한 마감·영업/서비스 직무 | 5.89:1 | 6.60:1 |
| `--cream-soft` / `--cream-ink` | #F7F1E5 / #806019 | 오늘의 팁·코치 안내 | 5.18:1 | 5.83:1 |

| 공통 토큰 | HEX | 용도 | 대비비 |
| --- | --- | --- | --- |
| `--bg`, `--bg-2` | #F7F8FA | 기존 밝은 앱 바탕 | `--text` 16.69:1 |
| `--surface` | #FFFFFF | 카드 | `--text` 17.74:1 |
| `--text` | #111827 | 제목·본문 | 흰색 17.74:1 |
| `--muted`, `--faint` | #596575 | 보조 설명·날짜·축·placeholder | 흰색 5.93:1, 7개 soft 중 최소 5.15:1 |
| `--primary`, `--primary-2` | #2563EB | 기존 주요 버튼·면접 CTA | 흰 글자 5.17:1 |
| `--primary-deep`, `--sky-ink` | #1D4ED8 | 버튼 hover·면접 잉크 | 흰색 6.70:1 |
| `--danger` / `--danger-soft` | #B91C1C / #FEEDEE | 오류 | 5.72:1 |

기능별 별칭: `--interview-*` → sky, `--feedback-*` → mint, `--growth-*` → lilac, `--resume-*` → peach, `--postings-*` → aqua. 각 기능에 `-soft`/`-ink`가 있다. 기존 `--mint`, `--peach`, `--sky`, `--lilac`, `--aqua`, `--rose`, `--cream`은 해당 `-soft` 별칭이다. `--lav`/`--lav-ink`는 실제 라일락에 연결했다. `--mint-text`/`--peach-text`/`--sky-text`, `--accent*`, `--success`, `--warning`도 같은 잉크/soft에 연결해 중복 색 정의를 정리했다.

3px 띠와 차트 트랙의 연한 색은 장식/보조 구분선이다. 정보는 제목·수치·등급 문구·선택 체크·테두리로 함께 전달한다. 점수 등급은 기존 80↑ 우수(민트), 60↑ 보통(스카이), 60 미만 개선 필요(피치) 기준을 그대로 사용한다. 집계 불가능한 값은 새로 추정하지 않는다.

## 화면별 변경

- 공통 메뉴: 데스크톱 사이드바와 모바일 하단 탭에 기능색 아이콘 배경과 활성 색을 연결했다. 모바일 활성 아이콘에 얇은 외곽선을 추가했다. 사이드바 행 높이는 기존 수준을 유지했다.
- 홈: 면접 시작 카드에 연한 스카이, 준비도 수치/진행 바에 라일락, 최근 면접 제목/상단 띠에 라일락을 적용했다. 최근 종합 점수는 기존 등급에 따른 의미색을 쓴다. 오늘의 준비 제목은 민트, 팁 아이콘은 크림이다.
- 면접 설정: 기존 직무별 tone 매핑을 아이콘/선택 카드/체크에 살렸다. 신입·쉬움은 민트, 경력은 스카이, 보통 난이도는 라일락, 어려움은 피치다. 자기소개서 문서 칩은 피치로 맞췄다.
- 기록·성장: 제목·주계열 그래프·활동 점·회차 칩·카드 띠를 라일락으로 연결했다. 코치 요약은 기존 코멘트 tone에 따른 연한 틴트다. 증가/감소 의미색은 유지했다.
- 결과 상세: 종합 게이지와 개별 점수에 기존 등급별 의미색을 적용했다. 답변 문항 개수에는 본문색을 사용한다. 자세/내용 칩은 스카이/피치, 펼친 피드백은 민트다. 완료 직후 결과 컴포넌트에도 같은 표현을 적용했다.
- 피드백: 분석 범위/요약 상단 띠는 민트, 논리성/구체성/직무적합도 게이지는 라일락/피치/민트다. TOP 순위 칩과 막대도 같은 색을 쓴다. 강점 모음은 민트, 개선점 모음은 피치 틴트다. 자세 계열은 스카이, 답변 내용은 피치로 그래프와 범례를 맞췄다.
- 자기소개서: 메뉴·제목·문서 칩·카드 상단 띠·선택된 입력 방식은 피치다. 입력 본문은 흰색/중립색으로 읽기 편하게 유지했다.
- 공고·관심 회사: 제목 칩·카드 띠·필터·마감 배지는 아쿠아, 3일 이하 마감은 로즈다. 실제 공고 데이터 검증에는 아래 환경 제약이 있다.
- 로그인: 소개 영역은 매우 연한 스카이(#F5F9FF), 서비스 소개 아이콘은 면접/피드백/기록의 세 기능색이다. 큰 진한 면·그라데이션·그림자·호버 점프를 추가하지 않았다.
- 대비: 보조 본문 토큰을 진하게 조정하고 placeholder opacity를 1로 맞췄다.

## 캡처와 검증

전체 위치: `.codex-shots/color_1011/`. 전후 48개 원본 PNG. 데스크톱은 1440×900 및 1920×1080, 모바일은 390×844, density=1, full-page 캡처다. 프레임 높이는 페이지 내용에 따라 다르다. `prefers-reduced-motion: reduce`로 촬영해 등장 애니메이션 중간 프레임을 제외했다.

| 화면 | 변경 전 | 변경 후 |
| --- | --- | --- |
| 홈 | `before_home_{1440,1920,390}.png` | `after_home_{1440,1920,390}.png` |
| 면접 설정 | `before_setup_{1440,1920,390}.png` | `after_setup_{1440,1920,390}.png` |
| 직무 선택 상태 | `before_setup_jobs_{1440,1920,390}.png` | `after_setup_jobs_{1440,1920,390}.png` |
| 기록·성장 | `before_growth_{1440,1920,390}.png` | `after_growth_{1440,1920,390}.png` |
| 저장된 결과 상세 | `before_result_saved_{1440,1920,390}.png` | `after_result_saved_{1440,1920,390}.png` |
| 피드백 | `before_feedback_{1440,1920,390}.png` | `after_feedback_{1440,1920,390}.png` |
| 자소서 | `before_resume_{1440,1920,390}.png` | `after_resume_{1440,1920,390}.png` |
| 로그인 | `before_login_{1440,1920,390}.png` | `after_login_{1440,1920,390}.png` |

같은 입력에 나란히 놓은 비교 이미지는 `compare_{화면}_{너비}.png`(첫 뷰포트) 및 `compare_{화면}_{너비}_full.png`(전체)다. `capture.py`, `review.py`, `report.py`와 `before-preview.html`은 로컬 QA 재현용이며 제품 코드에 포함되지 않는다. 마지막 변경 전 재촬영은 원본 백업을 별도 HTML에서 불러와 동일 API·데이터·density로 비교했다.

- 백업: `_backup_before_color_1011/`의 24개 파일은 작업 전 HEAD의 src와 일치한다(텍스트 줄바꿈만 정규화해 비교).
- `npm run build`: 통과(exit 0). 실행에는 PowerShell 정책 때문에 `npm.cmd`를 사용했다. 로그: `build-result.txt`.
- `npm run lint`: exit 1. 작업 전/후 동일한 기존 오류 110개·경고 2개, 새 진단 0개. 근거: `lint-baseline.json`, `lint-after.json`, `lint-comparison.json`. 백업 사본만 eslint global ignore에 추가했다. 기존 코드 오류를 색 작업 범위 밖에서 고치지 않았다.
- 가로 overflow 없음. 1440·1920에서 shell 1440px 중앙 배치, 390에서 shell 390px. 비교 대상 본문 문구 차이 0건.
- 최종 24개 화면의 DOM 본문/SVG 텍스트 노드 2480개 관찰에서 대비 기준 미달 0건. 크기/굵기에 따라 본문 4.5:1·큰 제목 3:1을 적용했다. 실제 브랜드 워드마크는 WCAG 로고 예외로 별도 기록했고 브랜드 색을 보존했다. 자동 검사는 모든 모달/오류/hover 상태를 보증하지 않는다.
- 키보드 난이도 선택, 차트 계열 토글, 모바일 프로필→자소서, 하단 탭 4개, 준비 항목 펼치기 확인. 브라우저 런타임 오류 0건. 근거: `after_checks.json`, `after_contrast.json`, `verification-summary.json`.
- Product Design의 get-context/design-qa 기준을 참고해 전후 화면을 함께 보고 검토했다. 검토 기록은 `design-qa.md`에 10/11 항목으로 추가했다.

## 환경과 남은 고민

- in-app Browser가 `sandboxPolicy` 연결 오류로 실행되지 않아 기존 Python Playwright + Microsoft Edge 방식으로 캡처했다.
- 로컬 백엔드는 시스템 Python `python -m uvicorn main:app`, `SECRET_KEY=local-uxtest-key`로 실행했다. user id 5 Demo JWT는 캡처 프로세스 메모리에서만 발급·사용했다. 새로운 면접이나 계정을 만들지 않았다. 실제 API에 저장된 5회 기록/피드백을 사용했다.
- CORS가 허용하는 5173 포트와 로컬 API를 실행 환경에서 지정했다. `.env.local`, `.vercel`, 백엔드/worker 소스는 수정하지 않았다.
- 로컬 백엔드의 `/api/postings`가 404이므로 실제 공고 카드는 촬영하지 못했고 기존 오류/재시도 화면만 비교했다. 공고의 정상/임박 마감 색은 실제 공고 API가 연결된 환경에서 추가로 확인할 수 있다.
- 결과 캡처는 기존 저장 기록 상세다. 녹화→실시간 분석→완료 직후 결과 흐름은 새 인터뷰를 생성하지 않기 위해 실행하지 않았다. 해당 결과 UI의 같은 게이지/점수/피드백 스타일은 적용했으나 이 흐름 전체가 검증됐다고 보지는 않는다.
- 원래의 빈 상태 표현에는 민트/라일락 틴트를 연결했지만 이번 Demo 계정의 실제 기록 기반 검증에는 빈 계정/모든 오류 상태가 포함되지 않았다.
- `--lav`는 구형 컴포넌트 호환을 위해 남겨두었다. 새 사용처는 `--lilac-*` 또는 기능 별칭을 권장한다.
- git commit/push/배포는 수행하지 않았다. 모든 백업·캡처·보고서는 요청한 frontend 폴더에 저장됐다.

## 바뀐 파일

`src/index.css`, `src/App.jsx`, `src/Growth.jsx`, `src/JobPostings.jsx`, `src/DreamCompanies.jsx`, `src/components/AppShell.jsx`, `src/components/home/InterviewHero.jsx`, `src/components/home/PreparationProgress.jsx`, `src/components/home/RecentInterviewCard.jsx`, `src/components/home/SectionHeading.jsx`, `src/components/home/TodayPreparation.jsx`, `eslint.config.js`.

추가/갱신 산출물: `_backup_before_color_1011/`, `.codex-shots/color_1011/`, `color-report.md`, `design-qa.md`의 10/11 검증 항목.

## 2차 — 색 면 확대 (2026-10-11)

1차 미커밋 변경분을 유지한 채 작업했다. 검수 의견인 “멀리서 보면 거의 같다”를 기준으로, 홈의 큰 면과 선택 상태를 한 단계 진하게 만들었다. Product Design의 get-context·design-qa 기준으로 기존 화면과 수정 화면을 같은 크기에서 비교했다.

### 화면별 변경

- 홈 히어로: 배경을 `#DCEBFF`로 확대하고 오른쪽에 평면 SVG 말풍선·체크·색 원을 추가했다. 모바일은 작은 장식으로 줄여 제목·버튼과 겹치지 않게 했다.
- 홈 카드: 준비도·최근 면접은 라일락, 오늘의 준비는 민트, 추천 공고·관심 회사는 아쿠아 면으로 묶었다. 최근 면접 본문과 공고·회사 내용은 흰색 내부 면으로 읽기 쉽게 유지했다.
- 메뉴: 선택된 사이드바와 하단 탭 전체에 기능색 배경을 적용했다. 비선택 아이콘도 기능색을 유지한다.
- 기록 상세·결과: 자세·표정/답변 내용/답변 문항을 블루·피치·민트 카드로 구분했다. 모바일에서는 점수 링 아래로 세 카드를 배치했다. 질문 번호는 라일락 원형 배지로 표시한다. 피드백 6개는 민트, 모범답변 6개는 피치로 구분했다.
- 면접 설정: 단과대학·학과 선택은 진한 라일락 채움과 테두리, 세부 직무는 해당 직무색 채움으로 표시한다. 섹션 헤더는 블루 면, 아이콘은 더 진한 파스텔 원으로 바꿨다. 기존 직무별 색·선택 체크는 유지했다.
- 피드백·성장: 요약 카드, 축별 게이지 카드, 차트 헤더와 막대 트랙에 기능색 면을 넓혔다. 계열은 종합 라일락/자세 블루/내용 피치, 피드백 순위는 피치/라일락/민트로 구분한다. 기본 표시 계열과 토글 동작은 유지했다.
- 로그인: 소개 영역을 히어로와 같은 `#DCEBFF` 면으로 바꿨다.

### 2차 색 토큰

진한 잉크는 1차 그대로 유지했다. `soft`는 넓은 면, `pastel`은 아이콘·축별 게이지·선택 칩에 사용한다. 이 표는 1차 토큰 표의 배경 값을 갱신한다.

| 기능색 | soft | pastel | 잉크 |
| --- | --- | --- | --- |
| 블루 | #E8F1FF | #CFE2FF | #1D4ED8 |
| 민트 | #E3F5EA | #CDEBDB | #196045 |
| 라일락 | #EDE5FA | #DDD0F2 | #6643A1 |
| 피치 | #FFEDDE | #FAD8C0 | #994A24 |
| 아쿠아 | #DFF3F5 | #BFE4E9 | #176571 |

넓은 짙은 색 면·보라/파랑 그라데이션·큰 그림자·호버 점프는 추가하지 않았다. 새 SVG는 사용자 지시에 허용된 단순 평면 도형이다. 기능·문구·API는 바꾸지 않았다. 동일 화면의 본문을 공백 정규화해 비교한 결과 문구 변경 0건이다.

### 캡처

경로: `frontend/.codex-shots/color_1011/`. 기본 캡처는 1440×900·390×844, density=1, reduced-motion 설정이다. 각 전체페이지 캡처와 같은 이름의 `_viewport.png`도 저장해 실제 고정 사이드바·탭바를 확인했다. 전체페이지 중간에 나타나는 고정 메뉴는 캡처 착시로 구분했다.

| 화면 | 1440 | 390 |
| --- | --- | --- |
| 홈 | `v2_home_1440.png` | `v2_home_390.png` |
| 면접 설정 | `v2_setup_1440.png` | `v2_setup_390.png` |
| 저장된 결과 상세 | `v2_result_saved_1440.png` | `v2_result_saved_390.png` |
| 피드백 | `v2_feedback_1440.png` | `v2_feedback_390.png` |
| 성장·기록 | `v2_growth_1440.png` | `v2_growth_390.png` |
| 로그인 | `v2_login_1440.png` | `v2_login_390.png` |

홈 비교: **`compare_v2_home_1440.png`** (왼쪽 1차, 오른쪽 2차). 1차의 현재 화면을 같은 환경에서 재촬영한 `v1_*`를 사용했다. 다른 다섯 화면·모바일 비교와 홈/결과 전체페이지 비교도 `compare_v2_*`로 저장했다.

추가 증거: `v2_setup_jobs_*`, `v2_setup_selected_*`(직무·칩 선택), `v2_growth_series_*`(세 계열 동시 표시), `v2_result_accordion_*_viewport.png`(스크롤·모범답변 펼침), `v2_home_1920_viewport.png`(중앙 배치), `v2_resume_*`(공통 토큰 변경 회귀 확인).

### 검증 결과

- ✅ `npm run build` 통과(exit 0). PowerShell에서 `npm.cmd` 사용. 로그: `build-v2.txt`.
- ✅ lint 새 오류/경고 0개. 1차와 동일한 오류 110개·경고 2개. 로그: `lint-v2.json`, `lint-v2-comparison.json`.
- ✅ 16개 기본 화면 상태에서 가로 넘침 0건·브라우저 pageerror 0건. 1920에서는 셸 너비 1440px, 왼쪽 여백 240px로 중앙 배치 확인.
- ✅ 기본 화면의 DOM/SVG 글자 1,622개 관찰에서 대비 미달 0건. 본문 4.5:1, 큰 글자 3:1 적용. 더 진한 피드백 카드 위의 보조 글자는 해당 기능 잉크로 수정했다. 선택 칩의 CSS Color 4 색은 실제 픽셀 RGB로 변환해 검사했다. 추가 선택 상태도 미달 0건. 실제 브랜드 워드마크는 기존 WCAG 로고 예외로 구분했다.
- ✅ 키보드 난이도 선택·차트 토글·모바일 프로필 이동·하단 메뉴 4개·준비 항목 펼치기·모범답변 아코디언 펼치기 확인.
- ✅ `.gitignore`의 기존 `.codex-shots/`를 유지하고 `_backup_*/`를 추가했다. ESLint에도 백업·QA 산출물을 제외했다. 두 백업 폴더와 캡처가 git ignore되는 것을 확인했다.
- ❌ lint 전체 통과는 아님: 기존 오류 110개가 남아 있다.
- ⛔ in-app Browser가 환경 연결 오류(`sandboxPolicy`)로 실행되지 않아 1차와 같은 Python Playwright + Edge를 사용했다. 기존 로컬 공고 API 404로 실제 채용공고 내용 상태는 검수하지 못했다.
- ⬜ 새 면접 녹화·채점·저장과 실서버 검증은 수행하지 않았다. 결과는 기존 Demo 계정의 저장된 기록으로 확인했다. 백엔드·워커 소스 수정, commit/push/배포는 하지 않았다.

종합 근거: `verification-v2.json`, `extra-v2-checks.json`, `v2_checks.json`, `v2_contrast.json`. 백업: `_backup_before_color_v2_1011/` (수정 전 1차 파일).

### 2차에서 바뀐 파일

`src/index.css`, `src/App.jsx`, `src/components/home/InterviewHero.jsx`, `.gitignore`, `eslint.config.js`, `color-report.md`, `design-qa.md`.

1차의 나머지 변경 파일은 그대로 이어서 보존했다. 로컬 검수 스크립트와 PNG/JSON은 git에서 제외된 `.codex-shots/color_1011/`에만 추가했다.
