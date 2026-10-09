# 코치코치 UI 재설계 완료 보고서

확정 브리프 `.codex-brief.md`에 맞춰 Home의 정보 구조, 공용 내비게이션, 전체 화면의 디자인 토큰을 구현했습니다. 신규 사용자는 첫 면접 시작과 다음 준비 단계를, 기존 사용자는 최근 점수와 피드백 확인을 먼저 볼 수 있습니다.

## 진행 및 결정

설치된 `product-design` 플러그인의 `get-context → audit → ideate → 구현(image-to-code 원칙) → design-qa` 순서로 진행했습니다. 브리프를 확정본으로 사용했고 추가 질문은 하지 않았습니다. 이미지 생성으로 한 방향을 만들고 선택했습니다. 생성 이미지는 레이아웃 참고용이며 서비스에 장식 이미지로 삽입하지 않았습니다.

- 선택 방향: **매일의 면접 준비**. 인사 → 면접 시작 / 준비도 → 최근 면접 / 오늘의 준비 → 추천 공고 → 관심 회사.
- 원본 감사에서 확인한 문제: 비슷한 카드의 반복으로 CTA와 피드백의 중요도 차이가 약함, 큰 빈 상태와 분산된 보조 정보, 넓은 화면의 낮은 정보 밀도, 모바일 메뉴 과밀.
- 구현: 전체 셸 최대 1440px 중앙 정렬, 데스크톱 사이드바 232px, 본문 패딩 32px. 태블릿은 80px 아이콘 사이드바, 모바일은 상단 앱바와 홈·면접·피드백·기록 4개 탭.
- Home에서 파란 Primary CTA는 면접 시작 하나로 제한했습니다. 준비도와 오늘의 준비는 별도 큰 카드 대신 보조 영역으로 배치했습니다.
- 준비도는 기존 직무, 저장된 자소서, 관심 회사, 기록 수로 계산하는 5개 항목입니다. 신규 0%, 테스트 기존 상태 60%이며, 완료 여부를 증명할 데이터가 없는 약점 재연습은 제외했습니다.
- 최근 면접은 실제 종합점수·내용점수·코멘트를 표시합니다. 원본 기록에 없는 자세·표정 및 내용 세부 점수는 `—`로 표시합니다.
- 추천 공고는 홈에 실제 데이터 최대 3개를 표시합니다. `전체보기`에서 기존 내 직무·지역·관심 회사 탭과 지역 선택, 추가 공고를 사용할 수 있습니다.
- 관심 회사는 기존 최대 3개 제한과 추가·수정·삭제·모바일 바텀시트를 유지했습니다.
- Pretendard, 파랑 `#2563EB`, 배경 `#F7F8FA`, 텍스트 `#111827`, 경계 `#E5E7EB`, 12~16px radius를 전체 화면에 적용했습니다. 작은 상태 문구에는 대비가 높은 진한 색을 사용했습니다.

## 변경 파일

| 파일 | 변경 내용 |
| --- | --- |
| `src/App.jsx` | Home 구성, 공용 셸 연결, Lucide 아이콘 적용. 기존 처리 함수와 면접 흐름 유지 |
| `src/Auth.jsx` | 간결한 로그인·회원가입 레이아웃, 표시되는 입력 라벨, 공용 소개 컴포넌트 |
| `src/DreamCompanies.jsx` | 관심 회사 섹션·빈 상태·재사용 카드 구성 |
| `src/JobPostings.jsx` | 홈 3개 카드와 전체보기, 기존 필터·동작 유지 |
| `src/ui.jsx` | 공용 아이콘을 Lucide로 통일 |
| `src/index.css` | 토큰, 반응형 셸, Home, 다른 화면의 공용 스타일·포커스·최소 버튼 높이·모션 감소 |
| `package.json`, `package-lock.json` | 허용된 `lucide-react@1.47.0`만 정확한 버전으로 추가 |
| `.gitignore` | `.codex-shots/` 검증 산출물 제외 |
| `design-report.md`, `design-qa.md` | 완료 보고 및 시각 QA 근거 |

새 컴포넌트는 다음 11개 파일입니다.

- `src/components/AppShell.jsx`: `AppShell`, `Sidebar`, 내부 메뉴 항목
- `src/components/AuthIntro.jsx`: 로그인 소개
- `src/components/FavoriteCompanyCard.jsx`: 관심 회사 카드
- `src/components/JobPostingCard.jsx`: 공고 카드
- `src/components/home/HomeHeader.jsx`: 인사·이번 주 연습
- `src/components/home/InterviewHero.jsx`: 직무·면접 시작·보조 링크
- `src/components/home/PreparationProgress.jsx`: 준비도·다음 단계
- `src/components/home/RecentInterviewCard.jsx`: 최근 면접·점수·피드백 이동
- `src/components/home/TodayPreparation.jsx`: 팁·기존 시작 전 체크
- `src/components/home/EmptyState.jsx`: 공용 빈 상태
- `src/components/home/SectionHeading.jsx`: 섹션 제목·보조 동작

## Home 스크린샷

모든 파일은 `C:\Users\user\Desktop\coachcoach\frontend\.codex-shots\` 아래에 저장했습니다. 아래 링크는 해당 파일의 절대 경로입니다. 1440은 1440×900, 1920은 1920×1080, 모바일은 390×844이며 `deviceScaleFactor=1`입니다.

| 상태 | 1440 | 1920 | 390 |
| --- | --- | --- | --- |
| 신규 사용자 | [after-home-new-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-new-1440.png) | [after-home-new-1920.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-new-1920.png) | [after-home-new-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-new-390.png) |
| 기존 사용자 | [after-home-existing-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-existing-1440.png) | [after-home-existing-1920.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-existing-1920.png) | [after-home-existing-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-home-existing-390.png) |

각 Home 파일에 대응하는 `-full.png`도 저장했습니다. 전체 페이지 캡처에는 고정 탭바가 최초 뷰포트 위치에 보이므로 실제 모바일 화면 판단에는 390×844 파일을 우선 사용합니다. 기존 사용자의 관심 회사 2개는 원래 브라우저 로컬 저장 기능을 통해 등록한 상태입니다. 신규 계정은 이름을 입력해 회원가입하고 자동 로그인된 빈 상태입니다.

## 다른 화면 스크린샷

| 화면 | 데스크톱 1440 | 모바일 390 |
| --- | --- | --- |
| 면접 설정 | [after-setup-existing-1440-viewport.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-setup-existing-1440-viewport.png) | [after-setup-existing-390-viewport.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-setup-existing-390-viewport.png) |
| 나의 기록 | [after-records-existing-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-records-existing-1440.png) | [after-records-existing-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-records-existing-390.png) |
| 기록 상세 | [after-history-detail-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-history-detail-1440.png) | [after-history-detail-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-history-detail-390.png) |
| 피드백 분석 | [after-feedback-existing-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-feedback-existing-1440.png) | [after-feedback-existing-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-feedback-existing-390.png) |
| 자기소개서 | [after-resume-existing-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-resume-existing-1440.png) | [after-resume-existing-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-resume-existing-390.png) |
| 설정 | [after-settings-existing-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-settings-existing-1440.png) | [after-settings-existing-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-settings-existing-390.png) |
| 로그인 | [after-login-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-login-1440.png) | [after-login-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-login-390.png) |
| 면접 준비·카메라 | [after-interview-ready-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-interview-ready-1440.png) | [after-interview-ready-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-interview-ready-390.png) |
| 녹화 | [after-recording-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-recording-1440.png) | [after-recording-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-recording-390.png) |
| 분석 대기 오버레이 | [after-analysis-overlay-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-analysis-overlay-1440.png) | [after-analysis-overlay-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-analysis-overlay-390.png) |
| 결과: 분석 실패 복구 상태 | [after-result-1440.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-result-1440.png) | [after-result-390.png](C:/Users/user/Desktop/coachcoach/frontend/.codex-shots/after-result-390.png) |

설정·기록·피드백·자소서·설정의 신규 사용자 전체 캡처도 `after-{setup|records|feedback|resume|settings}-new-{1440|390}.png`로 저장했습니다. 위 기존 사용자 화면도 설정을 포함해 전체 캡처가 있습니다.

추가 상호작용 근거:

- 공고 전체보기·지역 선택: `after-postings-explorer-existing-1440.png`
- 공고 빈 상태: `after-postings-empty-new-1440.png`
- 관심 회사 바텀시트: `after-favorite-sheet-390.png`
- 준비 항목 키보드 펼치기: `after-preparation-expanded-390.png`
- 프로필 메뉴: `after-profile-menu-existing-390.png`
- 이름 없는 회원가입 검증: `after-signup-validation-390.png`
- 저장된 자소서: `after-resume-saved-390.png`
- 분석 오류·재시도·건너뛰기: `after-analysis-unavailable-390.png`
- 접힌 태블릿 사이드바: `after-home-new-1024.png`, `after-home-new-820.png`, `after-home-new-780.png`

변경 전 감사 파일:

`before-01-login-1440.png`, `before-02-home-existing-1440.png`, `before-03-home-existing-390.png`, `before-04-setup-1440.png`, `before-05-records-1440.png`, `before-06-history-detail-1440.png`, `before-07-feedback-1440.png`, `before-08-resume-1440.png`, `before-09-settings-1440.png`, `before-10-home-new-1440.png`, `before-11-home-new-390.png`, `before-12-interview-ready-1440.png`, `before-13-recording-1440.png`, `before-14-analysis-unavailable-1440.png`, `before-15-result-1440.png`.

## 검증 결과

- Python Playwright의 `p.chromium.launch(channel="msedge")`로 기존 실행 서버를 사용했습니다.
- 신규·기존 사용자 시각/인터랙션 검사 **72/72 통과**: Home의 3개 폭, 가로 넘침, 4탭, 가이드, 공고 탭·지역 선택, 기존 체크리스트, 관심 회사 CRUD·3개 제한, 지난 조건 유지, 기록 상세 펼치기, 각 화면 이동, 프로필 메뉴, 이름 필수 검증. `qa-checks.json`에 저장했습니다.
- 별도 기능 검사: 실제 로그인, 설정 이름 저장 및 복원, 자소서 저장, 준비도 20% 반영, 공고에서 면접 설정 및 기관 조건 전달, 모바일 회사 편집기, 준비 항목 키보드 펼치기, Pretendard 로딩. `action-checks.json`에 저장했습니다.
- 면접 검사 **8/8 통과**: 가상 카메라 트랙, 진행 중 탭 숨김, 질문 생성·준비, 녹화, 다시 답변, 분석 대기, 실패 복구, 성공 답변이 없을 때 저장 성공으로 오표시하지 않음. `flow-checks.json`에 저장했습니다.
- 오버레이 캡처는 Playwright에서 **실제 분석 응답의 전달만 3초 지연**했습니다. 응답 내용·상태 코드를 교체하지 않았으며 앱이나 백엔드에 테스트 코드가 들어가지 않았습니다.
- 태블릿 1024·820·780px에서 80px 사이드바 및 가로 넘침 없음. 모션 감소 설정 반영. 일반 화면의 브라우저 콘솔 오류 0건, 전체 화면 검사와 녹화 검사에서 미처리 JavaScript 오류 0건.
- 원본과 현재 코드의 API 호출, 기존 상태 훅, 기존 처리 함수 구조 비교 **120/120 통과**. `preserved-logic.json`에 저장했습니다. 새 준비도는 전달받은 기존 데이터의 표시용 계산입니다.
- `npx.cmd eslint src/components` 통과. 전체 저장소 린트는 기존 파일의 unused catch 변수 및 react-refresh 규칙 오류가 남아 있어 통과를 주장하지 않습니다.
- **`npx vite build` 통과, exit 0**. PowerShell 실행 정책 때문에 동일 명령의 Windows shim인 `npx.cmd vite build`를 사용했습니다. Vite 8.0.16, 1896 모듈, 483ms. CSS 126.49kB / gzip 23.11kB, JS 463.33kB / gzip 131.95kB. 로그: `.codex-shots/build-result.txt`.
- 시각 QA 최종 결과: **passed**. 비교 과정과 수정 근거는 `design-qa.md`에 기록했습니다.

## 위험 및 확인 범위

1. **분석 성공→신규 결과 저장은 미검증입니다.** 실행 중인 분석 워커가 OFF이며 분석 요청은 503을 반환합니다. 실제 녹화·대기·재녹화·실패 복구는 확인했고 기존 저장 기록의 점수 79 및 상세·피드백 화면을 확인했습니다. 워커가 켜진 환경에서 실제 카메라·마이크를 이용한 성공 분석과 최종 저장을 한 번 확인해야 합니다.
2. **Home의 일부 세부 점수는 원본 데이터가 없습니다.** 테스트 기록의 자세·표정 및 논리성·구체성·직무적합도 숫자를 임의 생성하지 않았습니다. 원래 응답에 제공되면 표시됩니다.
3. **관심 회사·자소서의 브라우저 로컬 저장 특성을 유지했습니다.** 다른 브라우저에서 같은 계정으로 로그인해도 로컬 데이터가 자동 공유되는 것으로 표시하지 않습니다.
4. **Pretendard는 기존 CDN 로딩 방식을 유지했습니다.** 테스트에서는 정상 로딩됐고 CDN 이용이 불가능하면 기존 시스템 글꼴 fallback을 사용합니다.

백엔드 파일을 수정하지 않았습니다. 프론트·백엔드 서버는 종료하지 않았고, git commit/push는 하지 않았습니다. 스크린샷과 검증 스크립트는 `.codex-shots/`에 남겼으며 임시 로그인 토큰이 들어 있는 브라우저 저장 상태 파일은 검증 후 제거했습니다.
