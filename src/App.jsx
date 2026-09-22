import { useState, useRef, useEffect } from "react";
import Auth from "./Auth";
import Growth from "./Growth";
import { searchCompanies } from "./companies";
import { DEPARTMENTS, COLLEGES, searchDepartments } from "./departments";
import {
  prefersReducedMotion, CountUp, ArcProgress, AnimatedBar, keyActivate,
  ScoreBadge, RecordLogo, fmtDate, fmtDateDot, LineChart, sessionTitle,
  IconCheck, IconChevron, IconArrowR, IconTarget,
  authFetch, setAuthExpiredHandler, isAuthExpired,
} from "./ui";

/* 마지막으로 고른 직무·세부직무 (면접 설정 ↔ 자기소개서 화면 공유, localStorage) */
const LAST_JOB_KEY = "cc_last_job";
function loadLastJob(jobData) {
  try {
    const raw = localStorage.getItem(LAST_JOB_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || typeof o.job !== "string" || !jobData || !jobData[o.job]) return null;
    const subs = Array.isArray(jobData[o.job].subs) ? jobData[o.job].subs : [];
    return { job: o.job, sub: typeof o.sub === "string" && subs.includes(o.sub) ? o.sub : (subs[0] || "") };
  } catch (e) { return null; }
}
function saveLastJob(job, sub) {
  try { localStorage.setItem(LAST_JOB_KEY, JSON.stringify({ job, sub })); } catch (e) {}
}

/* 예상 소요 시간: 문항수 × 2~3분 (레일·준비 화면 공통 계산식) */
const EXPECT_Q = 6;
function estDuration(n) {
  const q = Number.isFinite(n) && n > 0 ? n : EXPECT_Q;
  return `약 ${q * 2}~${q * 3}분`;
}

/* 인사말 표시 이름: 이메일 로컬파트에서 "sim_" 접두·숫자 접미 제거, 12자 초과 시 말줄임 */
function displayNameFromEmail(email) {
  const local = email ? String(email).split("@")[0].trim() : "";
  if (!local) return "회원";
  let name = local.replace(/^sim[_.-]?/i, "").replace(/[\d_.-]+$/, "");
  if (!name) name = local;
  return name.length > 12 ? name.slice(0, 12) + "…" : name;
}

/* 면접 설정 화면 표시용 상수 (상태 key는 기존 그대로: 하/중/상, 신입/경력) */
const SETUP_LEVELS = [
  { key: "하", name: "쉬움", tone: "mint", bars: 1, desc: "꼬리질문 거의 없음 · 첫 연습 추천" },
  { key: "중", name: "보통", tone: "lav", bars: 2, desc: "꼬리질문 1~2회 · 실전 대비 표준", ribbon: "가장 많이 선택" },
  { key: "상", name: "어려움", tone: "peach", bars: 3, desc: "집요한 꼬리질문 · 최종면접 수준" },
];

const SETUP_CAREERS = [
  { key: "신입", tone: "mint", desc: "기본기·직무 이해·성장 가능성 질문 위주", badge: "성장 가능성 중심" },
  { key: "경력", tone: "sky", desc: "실무 프로젝트·성과·리더십 질문 위주", badge: "성과 중심" },
];

const LEVEL_LABEL = { "하": "쉬움", "중": "보통", "상": "어려움" };

/* 지원 회사: 빠른 선택 칩 8개 */
const COMPANY_QUICK = ["삼성전자", "네이버", "카카오", "LG전자", "현대자동차", "SK하이닉스", "쿠팡", "토스"];

/* 대전대 학과로 찾기: 단과대학 표시 순서 (관심 단과대 우선, 나머지는 departments.js 데이터 순) */
const COLLEGE_PRIORITY = ["SW융합대학", "공과대학", "디자인·아트대학"];
const COLLEGE_ORDER = [
  ...COLLEGE_PRIORITY.filter((c) => COLLEGES.includes(c)),
  ...COLLEGES.filter((c) => !COLLEGE_PRIORITY.includes(c)),
];

/* 검색어와 일치하는 부분을 굵게 표시 (자동완성 행 회사명용) */
function markMatch(name, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return name;
  const idx = name.toLowerCase().indexOf(q);
  if (idx < 0) return name;
  return (
    <>
      {name.slice(0, idx)}<b>{name.slice(idx, idx + q.length)}</b>{name.slice(idx + q.length)}
    </>
  );
}

const TIPS = [
  "결론부터 말하고, 근거가 되는 경험을 덧붙여보세요.",
  "카메라 렌즈를 면접관의 눈이라고 생각하고 바라보세요.",
  "답변 앞에 1초의 여유를 두면 훨씬 안정적으로 들려요.",
  "숫자와 구체적인 결과로 성과를 이야기해보세요.",
  "모르는 질문은 솔직하게, 배우려는 태도를 함께 보여주세요.",
  "어깨를 펴고 미소를 유지하면 자신감이 전달돼요.",
];

/* AI 코치 카드: 최근 세션에 개선점 데이터가 없을 때 보여줄 정직한 정적 팁 */
const COACH_STATIC_TIPS = [
  "답변 첫 문장에 결론부터 말해보세요.",
  "시선은 카메라 렌즈에 두면 안정적으로 보여요.",
];
const COACH_DEFAULT_LINE = "결론부터 말하고, 구체적인 경험을 근거로 덧붙여보세요. 오늘 한 문항 연습이면 충분해요.";

/* 가이드 카드: 4단계 학습 로드맵 (정적 안내) */
const GUIDE_STEPS = [
  { t: "직무·자소서 설정", d: "직무를 고르고 자기소개서를 붙여넣어요" },
  { t: "모의면접 응시", d: "웹캠 앞에서 실전처럼 답변해요" },
  { t: "AI 피드백 확인", d: "자세·내용 점수와 개선점을 받아요" },
  { t: "성장 곡선 추적", d: "회차별 점수 변화를 확인해요" },
];

/* 면접 전 체크리스트 (정적 실용 체크, 체크 상태만 localStorage에 저장) */
const CHECKLIST_ITEMS = [
  "카메라를 눈높이에 맞추기",
  "조명은 얼굴 앞에서 비추기",
  "결론부터 말하기 (두괄식)",
  "성과는 숫자로 이야기하기",
  "답변은 60~90초 안에 마치기",
  "마지막 역질문 준비하기",
];
const CHECKLIST_KEY = "cc_checklist";

/* 저장된 자기소개서 (localStorage, { text, updatedAt }) */
const RESUME_KEY = "cc_resume";
function loadSavedResume() {
  try {
    const raw = localStorage.getItem(RESUME_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (o && typeof o.text === "string" && o.text.trim()) {
      return { text: o.text, updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : null };
    }
    return null;
  } catch (e) { return null; }
}

/* 피드백 분석: 저장된 feedback 텍스트("라벨: 내용" 줄 단위)를 파싱 */
function parseFeedbackLines(fb) {
  if (!fb || typeof fb !== "string") return [];
  return fb
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^([^:：]{1,24})[:：]\s*(.+)$/);
      return m ? { label: m[1].trim(), text: m[2].trim() } : { label: "", text: l };
    });
}
const FB_STRENGTH_LABEL = /잘한|강점|좋은/;
const FB_IMPROVE_LABEL = /아쉬|개선|보완|주의|부족/;
/* 라벨이 평가축(논리성·구체성 등)인 실저장 형식 대응: 문장 내용으로 강점/개선 판별 */
const FB_IMPROVE_TEXT = /하면 |이면 |좋겠|아쉽|보완|부족|필요합|필요해|추가하|권장|주의|해보세요|해 보세요|줄이|연결하면|덧붙이|낫습니다|나았을|다소 |미흡|약합니다|약한 편|떨어집|않았습니다|모호|불분명|장황|산만/;
/* 긍정 어미("잘 ~되어 있습니다", "좋습니다", "적절합니다" 등)를 강점으로 인식 */
const FB_STRENGTH_TEXT = /좋습니다|좋았습니다|좋아요|훌륭|완벽|뛰어나|강점|증명|명확|안정적|우수|모범|신뢰|완성형|돋보|인상적|흠잡을|가치가 큽|시야가 넓|보여줍니다|보여주었습니다|적절합니다|적절하게|적절히|충분합니다|충분히|구체적입니다|구체적으로|잘 [가-힣 ]{0,12}(되어|돼|되어져) ?있|잘 [가-힣 ]{0,12}(했|하였|드러|전달|설명|정리|구성|제시|연결|표현|활용)|설득력|논리적입니다|논리적으로|체계적|일관성 있|긍정적|자연스럽|풍부/;
/* feedback 한 줄을 strength / improve / null 로 분류 (라벨 우선, 없으면 문장 단서) */
function classifyFeedbackLine(ln) {
  if (FB_IMPROVE_LABEL.test(ln.label)) return "improve";
  if (FB_STRENGTH_LABEL.test(ln.label)) return "strength";
  const text = ln.text || "";
  const imp = FB_IMPROVE_TEXT.test(text);
  const str = FB_STRENGTH_TEXT.test(text);
  if (imp && str) {
    // 두 단서가 함께 있으면 문장 뒷부분(결론)에 가까운 쪽을 우선
    const li = Math.max(...[...text.matchAll(new RegExp(FB_IMPROVE_TEXT.source, "g"))].map((m) => m.index), -1);
    const ls = Math.max(...[...text.matchAll(new RegExp(FB_STRENGTH_TEXT.source, "g"))].map((m) => m.index), -1);
    return ls > li ? "strength" : "improve";
  }
  if (imp) return "improve";
  if (str) return "strength";
  return null;
}

/* 피드백 분석: 개선 피드백 텍스트에서 세는 이슈 키워드 버킷 (실텍스트 집계, 가짜 수치 없음)
   tip = 다음 연습에서 바로 해볼 한 줄 코칭 (정적 문구) */
const FB_ISSUE_BUCKETS = [
  { key: "시선 처리", words: ["시선", "눈맞춤", "카메라를"], tip: "답변의 첫 문장과 마지막 문장은 카메라 렌즈를 보며 말해보세요." },
  { key: "표정·미소", words: ["표정", "미소"], tip: "질문을 듣는 동안 입꼬리를 살짝 올린 표정을 유지해보세요." },
  { key: "자세", words: ["자세", "어깨", "몸이"], tip: "어깨를 펴고 등받이에서 한 뼘 떨어져 앉으면 화면에서 안정적으로 보여요." },
  { key: "말 속도·전달력", words: ["속도", "빠르게", "천천히", "발음", "전달력"], tip: "문장 끝에서 반 박자 쉬어가면 말 속도와 전달력이 함께 좋아져요." },
  { key: "필러워드(음·어)", words: ["필러", "군더더기", "추임새"], tip: "'음·어'가 나올 자리에 1초 침묵을 넣어보세요. 침묵이 더 자신 있어 보여요." },
  { key: "두괄식·논리 구조", words: ["두괄", "결론부터", "논리", "구조", "연결"], tip: "첫 문장에 결론, 이어서 근거 두 가지 순서로 답해보세요." },
  { key: "구체성·수치 제시", words: ["구체", "수치", "숫자", "정량", "근거", "예시"], tip: "경험마다 숫자 하나(기간·성과·규모)를 붙여 말해보세요." },
  { key: "직무 연결", words: ["직무", "적합", "회사"], tip: "마지막 문장은 지원 직무·회사에서 하고 싶은 일로 마무리해보세요." },
  { key: "답변 길이·시간", words: ["시간 안", "길이", "간결", "장황"], tip: "핵심 답변은 60~90초 안에 마치고, 덧붙일 말은 질문을 기다려보세요." },
];
const FB_FOCUS_KEY = "cc_fb_focus";

/* 피드백 분석: 3축(논리성·구체성·직무적합도) 라벨 매칭 + 게이지 색 */
const FB_AXES = [
  { key: "논리성", match: /논리/, color: "var(--primary)", track: "var(--lav)" },
  { key: "구체성", match: /구체/, color: "var(--peach-ink)", track: "var(--peach)" },
  { key: "직무적합도", match: /직무|적합/, color: "var(--mint-ink)", track: "var(--mint)" },
];

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* ===== 인라인 SVG 아이콘 (stroke 기반, 라이브러리 미사용) ===== */
function IconMark({ size = 16 }) {
  // 로고 마크: 대화(코칭)를 상징하는 말풍선 + 체크
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <polyline points="8.5 11.5 11 14 15.5 9.5" />
    </svg>
  );
}
function IconHome({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}
function IconChart({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" />
    </svg>
  );
}
function IconLogout({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconSettings({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" /><circle cx="9" cy="7" r="2" fill="var(--surface)" />
      <line x1="4" y1="17" x2="20" y2="17" /><circle cx="15" cy="17" r="2" fill="var(--surface)" />
    </svg>
  );
}
function IconTip({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" /><path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}
function IconMic({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" /><line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}
function IconClip({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
function IconEdit({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconSpark({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" />
      <path d="M5.6 5.6l2.8 2.8" /><path d="M15.6 15.6l2.8 2.8" />
      <path d="M18.4 5.6l-2.8 2.8" /><path d="M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}
function IconCalendar({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconVideo({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="13" height="12" rx="3" />
      <path d="M15.5 10.5 21 7.5v9l-5.5-3" />
    </svg>
  );
}
function IconChatDots({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <circle cx="8.5" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12.2" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15.9" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconDoc({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}
function IconClock({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}
function IconGear({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
/* ===== 직무 아이콘 13종 + 폴백 (24×24, stroke 1.9, round) ===== */
function IconJobDev({ size = 18 }) {
  // 개발: 코드 브래킷 </>
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="8 7 3.5 12 8 17" />
      <polyline points="16 7 20.5 12 16 17" />
      <line x1="13.5" y1="5" x2="10.5" y2="19" />
    </svg>
  );
}
function IconJobData({ size = 18 }) {
  // 데이터·AI: CPU 칩 + 핀
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10.4" y="10.4" width="3.2" height="3.2" rx="0.8" />
      <path d="M9.5 7V3.5 M14.5 7V3.5 M9.5 20.5V17 M14.5 20.5V17 M7 9.5H3.5 M7 14.5H3.5 M20.5 9.5H17 M20.5 14.5H17" />
    </svg>
  );
}
function IconJobDesign({ size = 18 }) {
  // 디자인: 펜툴 닙 + 베지어 곡선
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l4.2 5.2L12 15 7.8 8.2 12 3z" />
      <circle cx="12" cy="8.8" r="1.5" />
      <path d="M4 20.5q8-6 16 0" />
    </svg>
  );
}
function IconJobMkt({ size = 18 }) {
  // 마케팅: 확성기 + 전파
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4.5 4.5 9v6L16 19.5V4.5z" />
      <line x1="8" y1="16.4" x2="8" y2="20" />
      <path d="M19.5 9.5q2 2.5 0 5" />
    </svg>
  );
}
function IconJobSales({ size = 18 }) {
  // 영업: 우상향 꺾은선 + 화살촉
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3.5 17.5 9.5 11.5 13.5 15 20.5 7.5" />
      <polyline points="14.5 7.5 20.5 7.5 20.5 13.5" />
    </svg>
  );
}
function IconJobOffice({ size = 18 }) {
  // 경영사무: 클립보드 + 체크
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="17" rx="2.5" />
      <rect x="9" y="2.5" width="6" height="4" rx="1.5" />
      <polyline points="8.5 13.5 11 16 15.5 11" />
    </svg>
  );
}
function IconJobFin({ size = 18 }) {
  // 금융: 동전 스택
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  );
}
function IconJobLab({ size = 18 }) {
  // 연구·엔지니어링: 플라스크 + 기포
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2.5h5" />
      <path d="M10.5 2.5v6L5.2 17.6a2.6 2.6 0 0 0 2.4 3.9h8.8a2.6 2.6 0 0 0 2.4-3.9L13.5 8.5v-6" />
      <circle cx="10.3" cy="16.5" r="1.1" />
      <circle cx="13.9" cy="14" r="0.7" />
    </svg>
  );
}
function IconJobGov({ size = 18 }) {
  // 공공·행정: 관청 기둥 건물
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 9.5 12 3.5l8.5 6" />
      <line x1="5" y1="12.5" x2="19" y2="12.5" />
      <path d="M7 12.5v5.5 M12 12.5v5.5 M17 12.5v5.5" />
      <line x1="4" y1="20.5" x2="20" y2="20.5" />
    </svg>
  );
}
function IconJobEdu({ size = 18 }) {
  // 교육: 학사모 + 태슬
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5z" />
      <path d="M6.5 11.7v4.1c0 1.4 2.46 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4.1" />
      <path d="M21.5 9.5v5" />
      <circle cx="21.5" cy="16.2" r="0.9" />
    </svg>
  );
}
function IconJobMed({ size = 18 }) {
  // 의료·보건: 십자 + 심전도
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.3 3.5h5.4v5.8h5.8v5.4h-5.8v5.8H9.3v-5.8H3.5V9.3h5.8V3.5z" />
      <polyline points="7.6 12 10.2 12 11.5 9.7 12.8 14.3 14.1 12 16.4 12" strokeWidth="1.6" />
    </svg>
  );
}
function IconJobSvc({ size = 18 }) {
  // 서비스·유통: 쇼핑백 + 반짝임
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 8h13l-1.1 11.6a2 2 0 0 1-2 1.9H8.6a2 2 0 0 1-2-1.9L5.5 8z" />
      <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
      <path d="M12 12.6v4.2 M9.9 14.7h4.2" />
    </svg>
  );
}
function IconJobMedia({ size = 18 }) {
  // 미디어·콘텐츠: 클래퍼보드 + 재생 삼각
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="14" rx="2.5" />
      <line x1="3.5" y1="10.2" x2="20.5" y2="10.2" />
      <path d="M8 6l2.2 4.2 M13 6l2.2 4.2 M17.6 6l1.9 3.6" />
      <path d="M10.6 13.2v4.4l3.8-2.2-3.8-2.2z" />
    </svg>
  );
}
function IconJobEtc({ size = 18 }) {
  // 폴백: 서류가방
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="13" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <line x1="3.5" y1="13" x2="20.5" y2="13" />
    </svg>
  );
}
/* ===== 단과대학 아이콘 10종 (24×24, stroke 1.9, round — 직무 아이콘 문법 재활용) ===== */
function IconColSw({ size = 16 }) {
  // SW융합대학: 코드 브래킷 + 칩
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <path d="M9 2.5V5 M15 2.5V5 M9 19v2.5 M15 19v2.5 M2.5 9H5 M2.5 15H5 M19 9h2.5 M19 15h2.5" />
      <polyline points="10.6 9.6 8.6 12 10.6 14.4" />
      <polyline points="13.4 9.6 15.4 12 13.4 14.4" />
    </svg>
  );
}
function IconColEng({ size = 16 }) {
  // 공과대학: 기어
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.2 2.2 M16.2 16.2l2.2 2.2 M18.4 5.6l-2.2 2.2 M7.8 16.2l-2.2 2.2" />
    </svg>
  );
}
function IconColArt({ size = 16 }) {
  // 디자인·아트대학: 팔레트 + 붓
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.5a9.5 9.5 0 1 1 9.5-9.9c.1 1.9-1.3 3.4-3.2 3.4h-2c-1.2 0-1.9 1.2-1.4 2.3.5 1.2-.3 4.2-2.9 4.2z" />
      <circle cx="7.8" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.2" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconColHealth({ size = 16 }) {
  // 보건의료과학대학: 라운드 십자
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 3.5h5a1 1 0 0 1 1 1v3h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3h-3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3v-3a1 1 0 0 1 1-1z" />
    </svg>
  );
}
function IconColKmed({ size = 16 }) {
  // 한의과대학: 잎(약초)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 3.5c-8.5 0-14.5 4-14.5 11 0 3.3 2.2 5.5 5.5 5.5 7 0 9-8.5 9-16.5z" />
      <path d="M4 21c3-6.5 7.5-10.5 13-13.5" />
    </svg>
  );
}
function IconColSoc({ size = 16 }) {
  // 사회과학대학: 저울
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="4" x2="12" y2="20" />
      <path d="M8.5 20.5h7" />
      <line x1="5.3" y1="7" x2="18.7" y2="7" />
      <path d="m5.3 7-2.8 6.8a4.3 4.3 0 0 0 5.6 0L5.3 7z" />
      <path d="m18.7 7-2.8 6.8a4.3 4.3 0 0 0 5.6 0L18.7 7z" />
    </svg>
  );
}
function IconColBiz({ size = 16 }) {
  // 경영대학: 상승 막대 차트
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 3.5v17h17" />
      <line x1="8" y1="20.5" x2="8" y2="15" />
      <line x1="12.5" y1="20.5" x2="12.5" y2="11" />
      <line x1="17" y1="20.5" x2="17" y2="7" />
    </svg>
  );
}
function IconColLib({ size = 16 }) {
  // 혜화리버럴아츠칼리지: 펼친 책
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6C10.5 4.4 8 3.8 5.5 3.8c-1 0-2 .1-3 .4v14.6c1-.3 2-.4 3-.4 2.5 0 5 .6 6.5 2.1 1.5-1.5 4-2.1 6.5-2.1 1 0 2 .1 3 .4V4.2c-1-.3-2-.4-3-.4-2.5 0-5 .6-6.5 2.2z" />
      <line x1="12" y1="6" x2="12" y2="20.5" />
    </svg>
  );
}
function IconColFuture({ size = 16 }) {
  // 미래인재융합대학: 로켓
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5c2.9 2.3 4.3 5.6 4.3 9.4 0 1.5-.3 2.9-.9 4.1H8.6a10.6 10.6 0 0 1-.9-4.1c0-3.8 1.4-7.1 4.3-9.4z" />
      <circle cx="12" cy="9.8" r="1.9" />
      <path d="M8.6 13.5 6 17h3.2 M15.4 13.5 18 17h-3.2" />
      <path d="M12 18.5v3" />
    </svg>
  );
}
function IconColComm({ size = 16 }) {
  // 혜화커뮤니티칼리지: 사람 2명
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M15.8 5.6a3.2 3.2 0 0 1 0 5.8" />
      <path d="M17.6 14.3a6.5 6.5 0 0 1 3.9 5.7" />
    </svg>
  );
}
function IconUser({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}
/* 난이도 게이지: 막대 1~3개 */
function IconGauge({ bars = 1, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <line x1="6.5" y1="18" x2="6.5" y2="13.5" opacity={bars >= 1 ? 1 : 0.25} />
      <line x1="12" y1="18" x2="12" y2="9.5" opacity={bars >= 2 ? 1 : 0.25} />
      <line x1="17.5" y1="18" x2="17.5" y2="5.5" opacity={bars >= 3 ? 1 : 0.25} />
    </svg>
  );
}

/* 단과대학명(departments.js college 문자열) → 칩 아이콘 매핑. 미등록 단과대는 학사모 폴백 */
const COLLEGE_ICON = {
  "SW융합대학": <IconColSw />,
  "공과대학": <IconColEng />,
  "디자인·아트대학": <IconColArt />,
  "보건의료과학대학": <IconColHealth />,
  "한의과대학": <IconColKmed />,
  "사회과학대학": <IconColSoc />,
  "경영대학": <IconColBiz />,
  "혜화리버럴아츠칼리지": <IconColLib />,
  "미래인재융합대학": <IconColFuture />,
  "혜화커뮤니티칼리지": <IconColComm />,
};
const COLLEGE_ICON_FALLBACK = <IconJobEdu size={16} />;

/* 직무명(/api/jobs 응답 키) → 아이콘/파스텔 톤/태그라인 매핑. 미등록 직무는 폴백 사용 */
const JOB_META = {
  "개발":            { tone: "lav",   tag: "웹·앱·서버 개발",  icon: <IconJobDev /> },
  "데이터·AI":       { tone: "mint",  tag: "분석·머신러닝",    icon: <IconJobData /> },
  "디자인":          { tone: "peach", tag: "UI·UX·그래픽",     icon: <IconJobDesign /> },
  "마케팅":          { tone: "sky",   tag: "브랜드·퍼포먼스",  icon: <IconJobMkt /> },
  "영업":            { tone: "rose",  tag: "B2B·B2C 세일즈",   icon: <IconJobSales /> },
  "경영사무":        { tone: "lilac", tag: "인사·재무·기획",   icon: <IconJobOffice /> },
  "금융":            { tone: "aqua",  tag: "은행·증권·보험",   icon: <IconJobFin /> },
  "연구·엔지니어링": { tone: "lav",   tag: "R&D·설계·소재",    icon: <IconJobLab /> },
  "공공·행정":       { tone: "mint",  tag: "공무원·공기업",    icon: <IconJobGov /> },
  "교육":            { tone: "peach", tag: "교사·강사·기획",   icon: <IconJobEdu /> },
  "의료·보건":       { tone: "sky",   tag: "간호·약무·보건",   icon: <IconJobMed /> },
  "서비스·유통":     { tone: "rose",  tag: "호텔·판매·MD",     icon: <IconJobSvc /> },
  "미디어·콘텐츠":   { tone: "lilac", tag: "방송·기자·PD",     icon: <IconJobMedia /> },
};
const JOB_FALLBACK = { tone: "lav", tag: "직무 맞춤 질문", icon: <IconJobEtc /> };
const jobMeta = (name) => JOB_META[name] || JOB_FALLBACK;

/* 사이드바 로고: 흰 말풍선 (블루 그라데이션 사각 위에 놓임) */
function BubbleLogoIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3C6.9 3 3 6.4 3 10.7c0 2.5 1.3 4.7 3.4 6.1l-.9 3.5c-.1.5.4.9.8.6l3.9-2.2c.6.1 1.2.2 1.8.2 5.1 0 9-3.4 9-7.7S17.1 3 12 3z" fill="#FFFFFF" />
      <circle cx="8.6" cy="10.9" r="1.15" fill="#5A6CF3" />
      <circle cx="12" cy="10.9" r="1.15" fill="#5A6CF3" />
      <circle cx="15.4" cy="10.9" r="1.15" fill="#5A6CF3" />
    </svg>
  );
}

/* 오늘의 Tip 전구 (소프트 필 아이콘) */
function BulbIllust({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ccBulb" cx="0.38" cy="0.32" r="1">
          <stop offset="0" stopColor="#FFEDB0" /><stop offset="1" stopColor="#FFC53D" />
        </radialGradient>
      </defs>
      <path d="M5 10 l-2.4-1.2 M19 10 l2.4-1.2 M12 2.6 V.9" stroke="#FFC53D" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="10.5" r="6.6" fill="url(#ccBulb)" />
      <ellipse cx="9.6" cy="8.4" rx="1.9" ry="1.2" fill="#FFF7DC" opacity="0.95" transform="rotate(-24 9.6 8.4)" />
      <rect x="9.4" y="16.4" width="5.2" height="3" rx="1.5" fill="#E5A93C" />
      <rect x="10" y="19.9" width="4" height="1.9" rx="0.95" fill="#C9922F" />
    </svg>
  );
}

/* ===== 소프트 3D 일러스트 (그라데이션 볼륨 + 하이라이트 + 바닥 그림자) ===== */

/* 1. 히어로: 정장 입은 면접자 (태블릿 + 말풍선) */
function HeroIllust() {
  return (
    <svg viewBox="0 0 250 210" fill="none" aria-hidden="true" className="hero-illust">
      <defs>
        <linearGradient id="ccSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B486C" /><stop offset="1" stopColor="#212B4B" />
        </linearGradient>
        <linearGradient id="ccSuitArm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5680" /><stop offset="1" stopColor="#2C3757" />
        </linearGradient>
        <radialGradient id="ccFace" cx="0.38" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFE7D3" /><stop offset="1" stopColor="#F4C09B" />
        </radialGradient>
        <linearGradient id="ccHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D455F" /><stop offset="1" stopColor="#1F2539" />
        </linearGradient>
        <linearGradient id="ccShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E4E9F7" />
        </linearGradient>
        <linearGradient id="ccTab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EEF2FF" /><stop offset="1" stopColor="#C0CCFA" />
        </linearGradient>
        <linearGradient id="ccTie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
      </defs>

      {/* 배경 데코 */}
      <circle cx="226" cy="118" r="12" fill="rgba(255,255,255,.10)" />
      <circle cx="16" cy="96" r="8" fill="rgba(255,255,255,.10)" />
      <circle cx="36" cy="24" r="5" fill="rgba(255,255,255,.16)" />

      {/* 바닥 그림자 */}
      <ellipse cx="122" cy="197" rx="76" ry="10" fill="rgba(20,28,64,.22)" />

      {/* 말풍선 (점 3개) */}
      <g>
        <rect x="168" y="26" width="68" height="42" rx="15" fill="#FFFFFF" />
        <path d="M178 66 L170 82 L192 69 Z" fill="#FFFFFF" />
        <circle cx="188" cy="47" r="4" fill="#98A5FF" />
        <circle cx="202" cy="47" r="4" fill="#6B7CFF" />
        <circle cx="216" cy="47" r="4" fill="#4757D8" />
      </g>

      {/* 목 */}
      <rect x="115" y="114" width="20" height="18" rx="8" fill="#EFB58E" />
      {/* 몸통(정장) */}
      <path d="M76 197 C76 151 95 130 125 130 C155 130 174 151 174 197 Z" fill="url(#ccSuit)" />
      <ellipse cx="102" cy="146" rx="14" ry="7" fill="#FFFFFF" opacity="0.08" transform="rotate(-24 102 146)" />
      {/* 셔츠 */}
      <path d="M110 133 L125 168 L140 133 Q125 126 110 133 Z" fill="url(#ccShirt)" />
      {/* 라펠 */}
      <path d="M110 132 L125 152 L102 149 Z" fill="#182140" />
      <path d="M140 132 L125 152 L148 149 Z" fill="#182140" />
      {/* 넥타이 */}
      <path d="M125 149 L131 158 L125 186 L119 158 Z" fill="url(#ccTie)" />
      <ellipse cx="123" cy="154" rx="2" ry="3" fill="#FFFFFF" opacity="0.35" />

      {/* 팔(태블릿 든 팔) */}
      <path d="M86 158 Q102 178 128 177" stroke="url(#ccSuitArm)" strokeWidth="16" strokeLinecap="round" fill="none" />
      {/* 태블릿 */}
      <g transform="rotate(-7 122 174)">
        <rect x="96" y="158" width="56" height="36" rx="7" fill="url(#ccTab)" />
        <rect x="96" y="158" width="56" height="36" rx="7" fill="none" stroke="#A9B6F2" strokeWidth="1.4" />
        <line x1="105" y1="169" x2="139" y2="169" stroke="#7B8CFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="105" y1="178" x2="129" y2="178" stroke="#A9B6F2" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="106" cy="163" rx="6" ry="2.4" fill="#FFFFFF" opacity="0.7" transform="rotate(-14 106 163)" />
      </g>
      {/* 손 */}
      <circle cx="150" cy="176" r="8" fill="url(#ccFace)" />

      {/* 귀 */}
      <circle cx="90" cy="92" r="6.5" fill="#F2BA92" />
      <circle cx="160" cy="92" r="6.5" fill="#F2BA92" />
      {/* 얼굴 */}
      <circle cx="125" cy="88" r="36" fill="url(#ccFace)" />
      {/* 머리카락 */}
      <path d="M89 90 C88 60 104 48 125 48 C146 48 162 60 161 90 C160 74 151 64 125 64 C99 64 90 74 89 90 Z" fill="url(#ccHair)" />
      <ellipse cx="108" cy="56" rx="9" ry="3.6" fill="#FFFFFF" opacity="0.16" transform="rotate(-16 108 56)" />
      {/* 눈썹/눈 */}
      <path d="M104 79 q5 -3 10 -1" stroke="#2A3148" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M136 78 q5 -2 10 1" stroke="#2A3148" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="111" cy="89" r="3.4" fill="#2A3148" />
      <circle cx="139" cy="89" r="3.4" fill="#2A3148" />
      <circle cx="112.2" cy="87.8" r="1" fill="#FFFFFF" />
      <circle cx="140.2" cy="87.8" r="1" fill="#FFFFFF" />
      {/* 미소 */}
      <path d="M115 101 Q125 110 135 101" stroke="#C96F4A" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* 뺨 홍조 */}
      <ellipse cx="103" cy="99" rx="5.5" ry="3.6" fill="#FFB9A0" opacity="0.8" />
      <ellipse cx="147" cy="99" rx="5.5" ry="3.6" fill="#FFB9A0" opacity="0.8" />
      {/* 얼굴 하이라이트 */}
      <ellipse cx="107" cy="72" rx="7" ry="3.6" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 107 72)" />
    </svg>
  );
}

/* 2. 사이드바 마스코트: 정장 면접자 (히어로와 동일 인물, 한 손 인사) */
function MascotIllust() {
  return (
    <svg viewBox="0 0 150 140" fill="none" aria-hidden="true" className="mascot-illust">
      <defs>
        <linearGradient id="ccMiSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B486C" /><stop offset="1" stopColor="#212B4B" />
        </linearGradient>
        <linearGradient id="ccMiArm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5680" /><stop offset="1" stopColor="#2C3757" />
        </linearGradient>
        <radialGradient id="ccMiFace" cx="0.38" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFE7D3" /><stop offset="1" stopColor="#F4C09B" />
        </radialGradient>
        <linearGradient id="ccMiHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D455F" /><stop offset="1" stopColor="#1F2539" />
        </linearGradient>
        <linearGradient id="ccMiShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E4E9F7" />
        </linearGradient>
        <linearGradient id="ccMiTie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="75" cy="131" rx="42" ry="7" fill="rgba(90,108,243,.16)" />
      {/* 흔드는 팔(뒤) */}
      <path d="M108 92 Q127 78 127 52" stroke="url(#ccMiArm)" strokeWidth="14" strokeLinecap="round" fill="none" />
      <circle cx="128" cy="46" r="9" fill="url(#ccMiFace)" />
      {/* 목 */}
      <rect x="67" y="72" width="16" height="16" rx="7" fill="#EFB58E" />
      {/* 몸통(정장) */}
      <path d="M40 131 C40 98 54 85 75 85 C96 85 110 98 110 131 Z" fill="url(#ccMiSuit)" />
      <ellipse cx="58" cy="97" rx="10" ry="5" fill="#FFFFFF" opacity="0.08" transform="rotate(-26 58 97)" />
      {/* 셔츠 */}
      <path d="M64 88 L75 113 L86 88 Q75 82 64 88 Z" fill="url(#ccMiShirt)" />
      {/* 라펠 */}
      <path d="M64 87 L75 101 L58 99 Z" fill="#182140" />
      <path d="M86 87 L75 101 L92 99 Z" fill="#182140" />
      {/* 넥타이 */}
      <path d="M75 99 L79.5 106 L75 126 L70.5 106 Z" fill="url(#ccMiTie)" />
      <ellipse cx="73.5" cy="103" rx="1.5" ry="2.2" fill="#FFFFFF" opacity="0.35" />
      {/* 내린 팔 */}
      <path d="M45 100 Q37 111 43 120" stroke="url(#ccMiArm)" strokeWidth="13" strokeLinecap="round" fill="none" />
      <circle cx="44" cy="123" r="8" fill="url(#ccMiFace)" />
      {/* 귀 */}
      <circle cx="46" cy="56" r="5.5" fill="#F2BA92" />
      <circle cx="104" cy="56" r="5.5" fill="#F2BA92" />
      {/* 얼굴 */}
      <circle cx="75" cy="52" r="30" fill="url(#ccMiFace)" />
      {/* 머리카락 */}
      <path d="M45 54 C44.4 29 57.5 19 75 19 C92.5 19 105.6 29 105 54 C104 40.5 96.7 32 75 32 C53.3 32 46 40.5 45 54 Z" fill="url(#ccMiHair)" />
      <ellipse cx="61" cy="26" rx="7.5" ry="3" fill="#FFFFFF" opacity="0.16" transform="rotate(-16 61 26)" />
      {/* 눈썹/눈 */}
      <path d="M58 45 q4 -2.5 8 -1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M84 44 q4 -1.5 8 1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="63" cy="53" r="3" fill="#2A3148" />
      <circle cx="87" cy="53" r="3" fill="#2A3148" />
      <circle cx="64" cy="52" r="0.9" fill="#FFFFFF" />
      <circle cx="88" cy="52" r="0.9" fill="#FFFFFF" />
      {/* 미소 */}
      <path d="M66 63 Q75 70.5 84 63" stroke="#C96F4A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* 뺨 홍조 */}
      <ellipse cx="56" cy="61" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
      <ellipse cx="94" cy="61" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
      {/* 얼굴 하이라이트 */}
      <ellipse cx="60" cy="39" rx="6" ry="3" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 60 39)" />
    </svg>
  );
}

/* 3. AI 코치 로봇 (흰 몸통 + 블루 스크린 얼굴, 인사) */
function RobotIllust() {
  return (
    <svg viewBox="0 0 130 140" fill="none" aria-hidden="true" className="robot-illust">
      <defs>
        <radialGradient id="ccRBody" cx="0.36" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#DFE5F4" />
        </radialGradient>
        <linearGradient id="ccRScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333D6E" /><stop offset="1" stopColor="#1C2340" />
        </linearGradient>
        <linearGradient id="ccRBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="65" cy="132" rx="38" ry="6" fill="rgba(90,108,243,.16)" />
      {/* 흔드는 팔 */}
      <path d="M96 92 Q113 84 115 66" stroke="#E9EDF8" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="116" cy="62" r="7" fill="url(#ccRBody)" />
      {/* 내린 팔 */}
      <path d="M35 94 Q28 102 31 111" stroke="#E9EDF8" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="113" r="6" fill="url(#ccRBody)" />
      {/* 발 */}
      <rect x="46" y="119" width="16" height="10" rx="5" fill="#CBD3EA" />
      <rect x="68" y="119" width="16" height="10" rx="5" fill="#CBD3EA" />
      {/* 몸통 */}
      <rect x="38" y="80" width="54" height="44" rx="20" fill="url(#ccRBody)" />
      <circle cx="65" cy="101" r="11" fill="url(#ccRBlue)" />
      <circle cx="61" cy="97" r="2.6" fill="#FFFFFF" opacity="0.55" />
      {/* 안테나 */}
      <line x1="65" y1="20" x2="65" y2="30" stroke="#A9B3D6" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="65" cy="15" r="5" fill="url(#ccRBlue)" />
      <circle cx="63.4" cy="13.4" r="1.4" fill="#FFFFFF" opacity="0.7" />
      {/* 이어캡 */}
      <circle cx="28" cy="53" r="7" fill="url(#ccRBlue)" />
      <circle cx="102" cy="53" r="7" fill="url(#ccRBlue)" />
      {/* 머리 */}
      <rect x="30" y="28" width="70" height="50" rx="22" fill="url(#ccRBody)" />
      <ellipse cx="46" cy="36" rx="9" ry="4" fill="#FFFFFF" opacity="0.75" transform="rotate(-14 46 36)" />
      {/* 스크린 얼굴 */}
      <rect x="40" y="38" width="50" height="32" rx="14" fill="url(#ccRScreen)" />
      <circle cx="56" cy="52" r="3.4" fill="#9FE8FF" />
      <circle cx="74" cy="52" r="3.4" fill="#9FE8FF" />
      <path d="M58 60 Q65 65 72 60" stroke="#9FE8FF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* 뺨 홍조(스크린 위) */}
      <ellipse cx="49" cy="58" rx="3.4" ry="2.2" fill="#FF9FB0" opacity="0.65" />
      <ellipse cx="81" cy="58" rx="3.4" ry="2.2" fill="#FF9FB0" opacity="0.65" />
    </svg>
  );
}

/* 4. 가이드 카드: 큐브 계단 + 깃발 */
function StairsIllust() {
  const cube = (cx, topY, h, top, left, right, key) => {
    const w = 26, dy = 13;
    return (
      <g key={key}>
        <polygon points={`${cx - w},${topY} ${cx},${topY - dy} ${cx + w},${topY} ${cx},${topY + dy}`} fill={top} />
        <polygon points={`${cx - w},${topY} ${cx},${topY + dy} ${cx},${topY + dy + h} ${cx - w},${topY + h}`} fill={left} />
        <polygon points={`${cx + w},${topY} ${cx},${topY + dy} ${cx},${topY + dy + h} ${cx + w},${topY + h}`} fill={right} />
        <polyline points={`${cx - w},${topY} ${cx},${topY - dy} ${cx + w},${topY}`} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.5" strokeLinejoin="round" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 210 150" fill="none" aria-hidden="true" className="stairs-illust">
      <defs>
        <linearGradient id="ccFlag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB25E" /><stop offset="1" stopColor="#F58A2E" />
        </linearGradient>
      </defs>
      {/* 구름 */}
      <g fill="#FFFFFF" opacity="0.9">
        <ellipse cx="30" cy="42" rx="14" ry="7" /><ellipse cx="42" cy="38" rx="9" ry="6" />
      </g>
      <g fill="#FFFFFF" opacity="0.75">
        <ellipse cx="112" cy="20" rx="12" ry="6" /><ellipse cx="122" cy="17" rx="8" ry="5" />
      </g>
      {/* 나무 점경 */}
      <rect x="16" y="116" width="5" height="14" rx="2" fill="#B98A5E" />
      <circle cx="18.5" cy="108" r="10" fill="#86D9AC" />
      <circle cx="12" cy="112" r="6.5" fill="#5FC493" />
      {/* 바닥 그림자 */}
      <ellipse cx="112" cy="144" rx="86" ry="6" fill="rgba(110,96,235,.14)" />
      {/* 큐브 계단 3단 */}
      {cube(56, 104, 32, "#DFE3FF", "#A4ADFA", "#7883EE", "s1")}
      {cube(108, 78, 58, "#D3D8FF", "#96A0F7", "#6A76E9", "s2")}
      {cube(160, 52, 84, "#C8CEFF", "#8A94F4", "#5D69E5", "s3")}
      {/* 깃발 */}
      <line x1="160" y1="42" x2="160" y2="8" stroke="#8B93B8" strokeWidth="3" strokeLinecap="round" />
      <path d="M161 9 L190 16.5 L161 24 Z" fill="url(#ccFlag)" />
      {/* 반짝임 */}
      <path d="M188 66 v8 M184 70 h8" stroke="#B9C0FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M74 24 v6 M71 27 h6" stroke="#C9CFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* 5. 하단 배너: 과녁 + 다트 */
function TargetIllust() {
  return (
    <svg viewBox="0 0 130 120" fill="none" aria-hidden="true" className="target-illust">
      <defs>
        <radialGradient id="ccTRed" cx="0.38" cy="0.32" r="1">
          <stop offset="0" stopColor="#FF7B72" /><stop offset="1" stopColor="#DE4747" />
        </radialGradient>
        <linearGradient id="ccDart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="65" cy="110" rx="42" ry="7" fill="rgba(90,108,243,.14)" />
      {/* 스탠드 */}
      <path d="M52 106 L60 88 M78 106 L70 88" stroke="#C2C9E2" strokeWidth="5" strokeLinecap="round" />
      {/* 과녁판 (뒤 림 + 앞판) */}
      <circle cx="66" cy="57" r="40" fill="#B93A40" />
      <circle cx="64" cy="54" r="40" fill="url(#ccTRed)" />
      <circle cx="64" cy="54" r="30" fill="#FFF6F4" />
      <circle cx="64" cy="54" r="20.5" fill="#EF5A55" />
      <circle cx="64" cy="54" r="11.5" fill="#FFF6F4" />
      <circle cx="64" cy="54" r="5" fill="#E04848" />
      {/* 하이라이트 아크 */}
      <path d="M34 40 A 36 36 0 0 1 56 20" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" fill="none" />
      {/* 다트 */}
      <line x1="64" y1="54" x2="94" y2="27" stroke="#33406B" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M92 29 L108 13 L111 26 L98 36 Z" fill="url(#ccDart)" />
      <path d="M92 29 L104 33 L96 40 Z" fill="#38449E" />
      <circle cx="64" cy="54" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}

/* 6. 설정 히어로: 클립보드를 든 정장 면접자 + 물음표 말풍선 (히어로와 동일 인물) */
function SetupBearIllust() {
  return (
    <svg viewBox="0 0 150 148" fill="none" aria-hidden="true" className="setup-bear">
      <defs>
        <linearGradient id="ccSiSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B486C" /><stop offset="1" stopColor="#212B4B" />
        </linearGradient>
        <linearGradient id="ccSiArm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5680" /><stop offset="1" stopColor="#2C3757" />
        </linearGradient>
        <radialGradient id="ccSiFace" cx="0.38" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFE7D3" /><stop offset="1" stopColor="#F4C09B" />
        </radialGradient>
        <linearGradient id="ccSiHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D455F" /><stop offset="1" stopColor="#1F2539" />
        </linearGradient>
        <linearGradient id="ccSiShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E4E9F7" />
        </linearGradient>
        <linearGradient id="ccSiTie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
        <linearGradient id="ccSiBoard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E9EDFC" />
        </linearGradient>
      </defs>
      {/* 배경 데코 */}
      <circle cx="16" cy="34" r="4" fill="rgba(255,255,255,.25)" />
      <circle cx="138" cy="96" r="5" fill="rgba(255,255,255,.16)" />
      {/* 물음표 말풍선 */}
      <g>
        <circle cx="128" cy="42" r="13" fill="#FFFFFF" />
        <path d="M120 52 L114 61 L126 55 Z" fill="#FFFFFF" />
        <path d="M124.5 38.5a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1-1.5 2.1" stroke="#5A6CF3" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="128" cy="47.6" r="1.3" fill="#5A6CF3" />
      </g>
      {/* 귀 */}
      <circle cx="46" cy="58" r="5.5" fill="#F2BA92" />
      <circle cx="104" cy="58" r="5.5" fill="#F2BA92" />
      {/* 얼굴 */}
      <circle cx="75" cy="54" r="30" fill="url(#ccSiFace)" />
      {/* 머리카락 */}
      <path d="M45 56 C44.4 31 57.5 21 75 21 C92.5 21 105.6 31 105 56 C104 42.5 96.7 34 75 34 C53.3 34 46 42.5 45 56 Z" fill="url(#ccSiHair)" />
      <ellipse cx="61" cy="28" rx="7.5" ry="3" fill="#FFFFFF" opacity="0.16" transform="rotate(-16 61 28)" />
      {/* 눈썹/눈 */}
      <path d="M58 47 q4 -2.5 8 -1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M84 46 q4 -1.5 8 1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="63" cy="55" r="3" fill="#2A3148" />
      <circle cx="87" cy="55" r="3" fill="#2A3148" />
      <circle cx="64" cy="54" r="0.9" fill="#FFFFFF" />
      <circle cx="88" cy="54" r="0.9" fill="#FFFFFF" />
      {/* 미소 */}
      <path d="M66 65 Q75 72.5 84 65" stroke="#C96F4A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* 뺨 홍조 */}
      <ellipse cx="56" cy="63" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
      <ellipse cx="94" cy="63" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
      {/* 얼굴 하이라이트 */}
      <ellipse cx="60" cy="41" rx="6" ry="3" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 60 41)" />
      {/* 목 */}
      <rect x="67" y="76" width="16" height="14" rx="7" fill="#EFB58E" />
      {/* 몸통(정장) */}
      <path d="M40 148 C40 108 54 88 75 88 C96 88 110 108 110 148 Z" fill="url(#ccSiSuit)" />
      <ellipse cx="58" cy="100" rx="10" ry="5" fill="#FFFFFF" opacity="0.08" transform="rotate(-26 58 100)" />
      {/* 셔츠 */}
      <path d="M64 91 L75 114 L86 91 Q75 85 64 91 Z" fill="url(#ccSiShirt)" />
      {/* 라펠 */}
      <path d="M64 90 L75 103 L58 101 Z" fill="#182140" />
      <path d="M86 90 L75 103 L92 101 Z" fill="#182140" />
      {/* 넥타이 (클립보드 뒤로 내려감) */}
      <path d="M75 101 L79.5 108 L75 124 L70.5 108 Z" fill="url(#ccSiTie)" />
      <ellipse cx="73.5" cy="105" rx="1.5" ry="2.2" fill="#FFFFFF" opacity="0.35" />
      {/* 팔 (클립보드 뒤) */}
      <path d="M46 104 Q52 120 64 124" stroke="url(#ccSiArm)" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M104 104 Q98 120 86 124" stroke="url(#ccSiArm)" strokeWidth="13" strokeLinecap="round" fill="none" />
      {/* 클립보드 */}
      <g transform="rotate(-4 75 120)">
        <rect x="51" y="100" width="48" height="40" rx="7" fill="url(#ccSiBoard)" />
        <rect x="51" y="100" width="48" height="40" rx="7" stroke="#C6D0F2" strokeWidth="1.4" fill="none" />
        <rect x="67" y="95" width="16" height="9" rx="4" fill="#98A5FF" />
        <polyline points="59 111 63 115 70 107" stroke="#35C08E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="76" y1="111" x2="91" y2="111" stroke="#C3CCF2" strokeWidth="3" strokeLinecap="round" />
        <line x1="59" y1="123" x2="91" y2="123" stroke="#7B8CFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="59" y1="131" x2="83" y2="131" stroke="#C3CCF2" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* 손 */}
      <circle cx="63" cy="126" r="8" fill="url(#ccSiFace)" />
      <circle cx="87" cy="126" r="8" fill="url(#ccSiFace)" />
    </svg>
  );
}

/* ===== AI 면접관 아바타 ===== */
/* 음성 안내용 스피커/다시 듣기 아이콘 (기존 stroke 아이콘 문법) */
function IconSoundOn({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 8.5H3v7h3.5L11 19V5z" />
      <path d="M15 9.3a4.2 4.2 0 0 1 0 5.4" />
      <path d="M18 7a8 8 0 0 1 0 10" />
    </svg>
  );
}
function IconSoundOff({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 8.5H3v7h3.5L11 19V5z" />
      <line x1="15.5" y1="9.5" x2="20.5" y2="14.5" />
      <line x1="20.5" y1="9.5" x2="15.5" y2="14.5" />
    </svg>
  );
}
function IconReplay({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
      <polyline points="3 3 3 8 8 8" />
    </svg>
  );
}

/* 면접관 아바타: 히어로/마스코트와 동일 인물(동일 팔레트)의 정면 상반신.
   state: idle(미소+깜빡임) | speaking(입 3단계 랜덤 전환+리듬) | done(미소 복귀) */
function InterviewerAvatar({ state = "idle", size = 132 }) {
  const [mouth, setMouth] = useState("smile"); // smile(다뭄) | half(반열림) | open(열림)
  const [blink, setBlink] = useState(false);
  const [reduced] = useState(prefersReducedMotion);

  // 자연 깜빡임: 3~5초 랜덤 간격, 140ms 감음 (reduced-motion이면 생략)
  useEffect(() => {
    if (reduced) return;
    let alive = true;
    let t1 = null, t2 = null;
    const loop = () => {
      t1 = setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        t2 = setTimeout(() => {
          if (!alive) return;
          setBlink(false);
          loop();
        }, 140);
      }, 3000 + Math.random() * 2000);
    };
    loop();
    return () => { alive = false; if (t1) clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, [reduced]);

  // 말하기: 입 모양 3단계를 80~120ms 랜덤 간격으로 전환 (reduced-motion이면 반열림 고정)
  useEffect(() => {
    if (state !== "speaking") { setMouth("smile"); return; }
    if (reduced) {
      setMouth("half");
      return () => setMouth("smile");
    }
    let alive = true;
    let t = null;
    const shapes = ["smile", "half", "open"];
    const loop = () => {
      t = setTimeout(() => {
        if (!alive) return;
        setMouth((prev) => {
          let next = prev;
          while (next === prev) next = shapes[Math.floor(Math.random() * shapes.length)];
          return next;
        });
        loop();
      }, 80 + Math.random() * 40);
    };
    loop();
    return () => { alive = false; if (t) clearTimeout(t); setMouth("smile"); };
  }, [state, reduced]);

  return (
    <span className={"avatar-box" + (state === "speaking" && !reduced ? " talking" : "")}>
      <svg width={size} height={size} viewBox="0 0 150 150" fill="none" aria-hidden="true" className="iv-avatar">
        <defs>
          <linearGradient id="ccAvSuit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3B486C" /><stop offset="1" stopColor="#212B4B" />
          </linearGradient>
          <radialGradient id="ccAvFace" cx="0.38" cy="0.3" r="1">
            <stop offset="0" stopColor="#FFE7D3" /><stop offset="1" stopColor="#F4C09B" />
          </radialGradient>
          <linearGradient id="ccAvHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3D455F" /><stop offset="1" stopColor="#1F2539" />
          </linearGradient>
          <linearGradient id="ccAvShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E4E9F7" />
          </linearGradient>
          <linearGradient id="ccAvTie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7B8CFF" /><stop offset="1" stopColor="#4453D6" />
          </linearGradient>
        </defs>
        {/* 목 */}
        <rect x="67" y="78" width="16" height="16" rx="7" fill="#EFB58E" />
        {/* 몸통(정장, 정면 상반신) */}
        <path d="M20 150 C20 112 42 96 75 96 C108 96 130 112 130 150 Z" fill="url(#ccAvSuit)" />
        <ellipse cx="45" cy="110" rx="11" ry="5.5" fill="#FFFFFF" opacity="0.08" transform="rotate(-26 45 110)" />
        {/* 셔츠 */}
        <path d="M63 99 L75 126 L87 99 Q75 92 63 99 Z" fill="url(#ccAvShirt)" />
        {/* 라펠 */}
        <path d="M63 98 L75 113 L56 111 Z" fill="#182140" />
        <path d="M87 98 L75 113 L94 111 Z" fill="#182140" />
        {/* 넥타이 */}
        <path d="M75 111 L80 118.5 L75 142 L70 118.5 Z" fill="url(#ccAvTie)" />
        <ellipse cx="73.4" cy="115.5" rx="1.6" ry="2.3" fill="#FFFFFF" opacity="0.35" />
        {/* 귀 */}
        <circle cx="46" cy="58" r="5.5" fill="#F2BA92" />
        <circle cx="104" cy="58" r="5.5" fill="#F2BA92" />
        {/* 얼굴 */}
        <circle cx="75" cy="54" r="30" fill="url(#ccAvFace)" />
        {/* 머리카락 */}
        <path d="M45 56 C44.4 31 57.5 21 75 21 C92.5 21 105.6 31 105 56 C104 42.5 96.7 34 75 34 C53.3 34 46 42.5 45 56 Z" fill="url(#ccAvHair)" />
        <ellipse cx="61" cy="28" rx="7.5" ry="3" fill="#FFFFFF" opacity="0.16" transform="rotate(-16 61 28)" />
        {/* 눈썹 */}
        <path d="M58 47 q4 -2.5 8 -1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M84 46 q4 -1.5 8 1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 눈 (깜빡임: 감은 곡선으로 교체) */}
        {blink ? (
          <>
            <path d="M60 55.5 q3 2.2 6 0" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M84 55.5 q3 2.2 6 0" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="63" cy="55" r="3" fill="#2A3148" />
            <circle cx="87" cy="55" r="3" fill="#2A3148" />
            <circle cx="64" cy="54" r="0.9" fill="#FFFFFF" />
            <circle cx="88" cy="54" r="0.9" fill="#FFFFFF" />
          </>
        )}
        {/* 입: 3단계 (다뭄 미소 / 반열림 / 열림) */}
        {mouth === "smile" && (
          <path d="M66 65 Q75 72.5 84 65" stroke="#C96F4A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        )}
        {mouth === "half" && (
          <ellipse cx="75" cy="67.5" rx="4.6" ry="2.7" fill="#B0573B" />
        )}
        {mouth === "open" && (
          <g>
            <ellipse cx="75" cy="68" rx="5.8" ry="4.8" fill="#8E4530" />
            <ellipse cx="75" cy="70.4" rx="3.4" ry="1.9" fill="#E58A70" />
          </g>
        )}
        {/* 뺨 홍조 */}
        <ellipse cx="56" cy="63" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
        <ellipse cx="94" cy="63" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
        {/* 얼굴 하이라이트 */}
        <ellipse cx="60" cy="41" rx="6" ry="3" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 60 41)" />
      </svg>
    </span>
  );
}

/* 7. 경력 카드: 신입 새싹 (그라데이션 + 스파클) */
function SproutIllust() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="career2-svg">
      <defs>
        <linearGradient id="ccSprL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FE9C6" /><stop offset="1" stopColor="#35C08E" />
        </linearGradient>
        <linearGradient id="ccSprR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FE3BC" /><stop offset="1" stopColor="#2CA97C" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="40" cy="70" rx="24" ry="5" fill="rgba(29,158,119,.16)" />
      {/* 흙 언덕 */}
      <path d="M20 70 Q40 57 60 70 Z" fill="#D9F0E4" />
      {/* 줄기 */}
      <path d="M40 68 C40 58 39 50 40 42" stroke="#2CA97C" strokeWidth="3.6" strokeLinecap="round" fill="none" />
      {/* 잎 */}
      <path d="M39 52 C26 52 20 40 22 31 C33 31 40 40 39 52 Z" fill="url(#ccSprL)" />
      <path d="M41 44 C54 44 60 31 58 22 C46 22 40 32 41 44 Z" fill="url(#ccSprR)" />
      <ellipse cx="30" cy="38" rx="4" ry="2" fill="#FFFFFF" opacity="0.45" transform="rotate(-38 30 38)" />
      <ellipse cx="51" cy="29" rx="4" ry="2" fill="#FFFFFF" opacity="0.45" transform="rotate(35 51 29)" />
      {/* 스파클 */}
      <path d="M63 46v6 M60 49h6" stroke="#7BD8AC" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 16v5 M14.5 18.5h5" stroke="#A5E8CB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* 8. 경력 카드: 서류가방 + 메달 */
function CareerIllust() {
  return (
    <svg viewBox="0 0 90 80" fill="none" aria-hidden="true" className="career2-svg">
      <defs>
        <linearGradient id="ccCbrCase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#63ACF4" /><stop offset="1" stopColor="#3579C9" />
        </linearGradient>
        <radialGradient id="ccCbrMedal" cx="0.38" cy="0.32" r="1">
          <stop offset="0" stopColor="#FFE1A0" /><stop offset="1" stopColor="#F2A93B" />
        </radialGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="45" cy="72" rx="28" ry="5" fill="rgba(59,141,224,.16)" />
      {/* 손잡이 */}
      <path d="M32 28v-4a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v4" stroke="#2E6DB8" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 가방 몸통 */}
      <rect x="12" y="28" width="60" height="38" rx="9" fill="url(#ccCbrCase)" />
      <line x1="12" y1="45" x2="72" y2="45" stroke="#FFFFFF" strokeWidth="2" opacity="0.35" />
      <rect x="37" y="41" width="10" height="9" rx="2.5" fill="#FFFFFF" opacity="0.92" />
      <ellipse cx="24" cy="36" rx="7" ry="3" fill="#FFFFFF" opacity="0.3" transform="rotate(-18 24 36)" />
      {/* 메달 리본 */}
      <path d="M63 46l5 9 5-9-3-5h-4z" fill="#5A6CF3" />
      {/* 메달 */}
      <circle cx="68" cy="58" r="11" fill="url(#ccCbrMedal)" />
      <circle cx="68" cy="58" r="6.5" fill="#FFF3D6" />
      <polyline points="65 58 67.2 60.4 71.2 55.8" stroke="#E29A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="64.5" cy="53" rx="2.6" ry="1.5" fill="#FFFFFF" opacity="0.6" transform="rotate(-28 64.5 53)" />
    </svg>
  );
}

/* 9. 자소서 업로드: 문서 + 연필 */
function DocPencilIllust() {
  return (
    <svg viewBox="0 0 96 84" fill="none" aria-hidden="true" className="setup-doc">
      <defs>
        <linearGradient id="ccDocpP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E6EBFA" />
        </linearGradient>
        <linearGradient id="ccDocpPen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB25E" /><stop offset="1" stopColor="#F58A2E" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="48" cy="76" rx="30" ry="5" fill="rgba(90,108,243,.13)" />
      {/* 문서 */}
      <g transform="rotate(-3 46 40)">
        <rect x="24" y="8" width="44" height="58" rx="8" fill="url(#ccDocpP)" />
        <rect x="24" y="8" width="44" height="58" rx="8" stroke="#CBD5F2" strokeWidth="1.4" fill="none" />
        <line x1="33" y1="24" x2="59" y2="24" stroke="#7B8CFF" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="33" y1="34" x2="55" y2="34" stroke="#C7D0F1" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="33" y1="44" x2="59" y2="44" stroke="#C7D0F1" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="33" y1="54" x2="49" y2="54" stroke="#C7D0F1" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="33" cy="14.5" rx="6" ry="2.2" fill="#FFFFFF" opacity="0.8" transform="rotate(-10 33 14.5)" />
      </g>
      {/* 연필 */}
      <g transform="rotate(38 70 46)">
        <rect x="63" y="22" width="13" height="34" rx="2.5" fill="url(#ccDocpPen)" />
        <rect x="63" y="16" width="13" height="7" rx="2.5" fill="#F87F9B" />
        <path d="M63 56 L69.5 68 L76 56 Z" fill="#F6CFA5" />
        <path d="M67.3 60.5 L69.5 68 L71.7 60.5 Z" fill="#5B6270" />
        <line x1="66.5" y1="26" x2="66.5" y2="50" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.4" strokeLinecap="round" />
      </g>
      {/* 스파클 */}
      <path d="M14 30v6 M11 33h6" stroke="#AEB9F5" strokeWidth="2" strokeLinecap="round" />
      <path d="M84 18v5 M81.5 20.5h5" stroke="#C6CEF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* 10. 피드백 분석 빈 상태: 말풍선 리포트 + 돋보기 (소프트 3D) */
function FeedbackEmptyIllust() {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden="true" className="gr-empty-illust">
      <defs>
        <linearGradient id="ccFbCard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E9EDFB" /></linearGradient>
        <linearGradient id="ccFbLens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#DCEBFF" /><stop offset="1" stopColor="#9CC4F5" /></linearGradient>
        <linearGradient id="ccFbHandle" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB25E" /><stop offset="1" stopColor="#F58A2E" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="138" rx="78" ry="7" fill="rgba(90,108,243,.13)" />
      <g fill="#FFFFFF" opacity="0.9"><ellipse cx="160" cy="30" rx="14" ry="7" /><ellipse cx="172" cy="26" rx="9" ry="6" /></g>
      {/* 리포트 카드 */}
      <g transform="rotate(-4 90 80)">
        <rect x="42" y="34" width="96" height="92" rx="12" fill="url(#ccFbCard)" stroke="#CBD5F2" strokeWidth="1.4" />
        <rect x="56" y="50" width="30" height="7" rx="3.5" fill="#7B8CFF" />
        <rect x="56" y="66" width="66" height="6" rx="3" fill="#C7D0F1" />
        <rect x="56" y="78" width="52" height="6" rx="3" fill="#C7D0F1" />
        <rect x="56" y="96" width="18" height="18" rx="6" fill="#EAF8F1" />
        <polyline points="60 105 64 109 70 101" stroke="#1D9E77" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="80" y="96" width="18" height="18" rx="6" fill="#FDF1E7" />
        <path d="M86 101v7 M86 111v0.5" stroke="#E08A3C" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="104" y="96" width="18" height="18" rx="6" fill="#EDF1FE" />
        <path d="M108 109 l4-6 4 4 3-5" stroke="#5A6CF3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* 돋보기 */}
      <circle cx="136" cy="72" r="24" fill="url(#ccFbLens)" opacity="0.92" />
      <circle cx="136" cy="72" r="24" stroke="#5A6CF3" strokeWidth="5" fill="none" />
      <path d="M124 62 A 16 16 0 0 1 134 56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <line x1="154" y1="90" x2="176" y2="112" stroke="url(#ccFbHandle)" strokeWidth="11" strokeLinecap="round" />
      <path d="M22 96v7 M18.5 99.5h7" stroke="#B9C0FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 48v5 M27.5 50.5h5" stroke="#C9CFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* (ScoreBadge / CountUp / ArcProgress / AnimatedBar / keyActivate 는 ui.jsx 공용 모듈로 이동) */

/* ===== 토스트 알림 (alert 대체: 성공=민트 / 오류=danger / 정보=블루) ===== */
function IconToastOk({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" />
    </svg>
  );
}
function IconToastErr({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><line x1="12" y1="7.5" x2="12" y2="13" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconToastInfo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16.5" /><circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconX({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
function ToastHost({ toasts, onClose }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={"toast " + t.type + (t.closing ? " closing" : "")}>
          <span className="t-ic">
            {t.type === "success" ? <IconToastOk /> : t.type === "error" ? <IconToastErr /> : <IconToastInfo />}
          </span>
          <div className="t-msg">{t.message}</div>
          <button type="button" className="t-x" onClick={() => onClose(t.id)} aria-label="알림 닫기"><IconX /></button>
        </div>
      ))}
    </div>
  );
}

/* 버튼 안 인라인 로딩 스피너 (비동기 동작 중 표시) */
function BtnSpinner({ size = 14 }) {
  return (
    <svg className="btn-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 1-6.36 2.64" />
    </svg>
  );
}

/* ===== 시머 스켈레톤 (텍스트 로딩 대체, 300ms 지연 표시로 깜빡임 방지) ===== */
function SkelRecentRows({ n = 3 }) {
  return (
    <div className="skel-wrap" aria-label="불러오는 중">
      {Array.from({ length: n }).map((_, i) => (
        <div className="skel-row" key={i}>
          <span className="skel skel-avatar" />
          <span className="skel-lines">
            <span className="skel skel-line w60" />
            <span className="skel skel-line w40" />
          </span>
          <span className="skel skel-pill" />
        </div>
      ))}
    </div>
  );
}
function SkelStatus() {
  return (
    <div className="skel-wrap skel-status" aria-label="불러오는 중">
      <span className="skel skel-donut" />
      <span className="skel-lines">
        <span className="skel skel-line w70" />
        <span className="skel skel-line w50" />
        <span className="skel skel-line w60" />
      </span>
    </div>
  );
}
function SetupSkeleton() {
  return (
    <div className="page wide setup-page" aria-label="직무 목록을 불러오는 중">
      <div className="skel-wrap">
        <div className="skel skel-hero" />
        <div className="dcard setup-sec">
          <div className="skel-row" style={{ marginBottom: 14 }}>
            <span className="skel skel-avatar sq" />
            <span className="skel skel-line w40" style={{ height: 14 }} />
          </div>
          <div className="skel-grid">
            {Array.from({ length: 8 }).map((_, i) => <span className="skel skel-jobcard" key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
function DetailSkeleton() {
  return (
    <div className="skel-wrap" aria-label="면접 기록을 불러오는 중">
      <div className="result-head skel-head">
        <span className="skel skel-donut lg" />
        <span className="skel-lines">
          <span className="skel skel-line w40" style={{ height: 14 }} />
          <span className="skel skel-line w70" />
          <span className="skel skel-line w50" />
        </span>
      </div>
      {[0, 1].map((i) => (
        <div className="rcard" key={i}>
          <span className="skel skel-line w70" style={{ height: 14, marginBottom: 12 }} />
          <span className="skel skel-block" />
        </div>
      ))}
    </div>
  );
}

/* 점수 이유(reasons) 포매터: 문자열/객체/배열 모두 안전하게 문자열화
   객체면 "논리성: … / 구체성: …" 형태로 줄 단위 표시 ("[object Object]" 방지) */
function formatReasons(reasons) {
  if (reasons == null) return "";
  if (typeof reasons === "string") return reasons.trim();
  if (Array.isArray(reasons)) {
    return reasons.map((v) => formatReasons(v)).filter(Boolean).join("\n");
  }
  if (typeof reasons === "object") {
    return Object.entries(reasons)
      .filter(([, v]) => v != null && String(v).trim() !== "")
      .map(([k, v]) => `${k}: ${String(v).trim()}`)
      .join("\n");
  }
  return String(reasons);
}

/* 자소서 맞춤 질문 비동기 잡 실패/타임아웃 (호출부에서 질문은행 폴백 판단용) */
class QuestionJobError extends Error {
  constructor(msg) { super(msg || "question_job_failed"); this.name = "QuestionJobError"; }
}

/* 비동기 분석 폴링 status → 사용자 문구 */
const ANALYSIS_STATUS_TEXT = {
  pending: "분석 대기 중",
  processing: "AI 분석 중",
};

export default function App() {
  // 새로고침해도 유지되도록 localStorage에서 초기값을 읽어온다
  const [token, setToken] = useState(() => localStorage.getItem("cc_token") || null);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("cc_email") || "");

  const [screen, setScreen] = useState("home"); // home | start | loading | interview | result | growth | settings | historyDetail
  const [navHint, setNavHint] = useState(""); // 사이드바에서 어떤 항목으로 진입했는지 (start 계열 구분용)
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  const [jobData, setJobData] = useState(null);
  const [job, setJob] = useState("");
  const [sub, setSub] = useState("");
  const [level, setLevel] = useState("중");
  const [career, setCareer] = useState("신입");
  const [company, setCompany] = useState(""); // 지원 회사 (선택, 표시용 부가 정보)
  const [coOpen, setCoOpen] = useState(false); // 지원 회사 자동완성 드롭다운 표시 여부
  const [coIdx, setCoIdx] = useState(-1); // 자동완성 키보드 하이라이트 인덱스
  const [jobTab, setJobTab] = useState("dept"); // 직무 선택 탭: dept(학과로 찾기) | job(직무로 찾기)
  const [deptQuery, setDeptQuery] = useState(""); // 학과 검색어
  const [deptOpen, setDeptOpen] = useState(false); // 학과 자동완성 드롭다운 표시 여부
  const [deptIdx, setDeptIdx] = useState(-1); // 학과 자동완성 키보드 하이라이트 인덱스
  const [deptPick, setDeptPick] = useState(null); // 표시용: { dept: 학과 객체, careerLabel: 선택한 진로명 | null } (저장 payload와 무관)
  const [deptCollege, setDeptCollege] = useState(COLLEGE_ORDER[0]); // 단과대학 탐색: 선택된 단과대 (기본 SW융합대학)
  const [resumeTab, setResumeTab] = useState("text");
  const [resumeText, setResumeText] = useState("");
  const [resumeFileMsg, setResumeFileMsg] = useState("");
  const [resumeFileErr, setResumeFileErr] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [jobRole, setJobRole] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [camError, setCamError] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState([]);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState(false);
  const [analysisNote, setAnalysisNote] = useState(""); // 비동기 분석 폴링 상태 문구
  const [analysisSeconds, setAnalysisSeconds] = useState(0); // 분석 경과 시간(초)
  const [phase, setPhase] = useState("ready"); // 면접 화면 단계: ready | countdown | live
  const [countdown, setCountdown] = useState(0); // 3-2-1 카운트다운 숫자

  // AI 면접관 음성(TTS): 지원 여부/음소거/아바타 상태 (표시 레이어 — 녹화·분석 로직과 무관)
  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const [ttsMuted, setTtsMuted] = useState(() => {
    try { return localStorage.getItem("cc_tts_muted") === "1"; } catch (e) { return false; }
  });
  const [avatarState, setAvatarState] = useState("idle"); // idle | speaking | done
  const utterRef = useRef(null); // 현재 발화 utterance (GC로 onend 유실 방지 보관)
  const audioRef = useRef(null); // 현재 재생 중인 뉴럴 TTS Audio 객체
  const audioUrlRef = useRef(null); // 현재 Audio의 objectURL (종료·교체 시 revoke)
  const ttsCacheRef = useRef(new Map()); // 질문 텍스트 → mp3 Blob 캐시 (다시 듣기 즉시 재생)
  const speakSeqRef = useRef(0); // 낭독 세대 토큰 (fetch 중 질문 전환 시 이전 요청 폐기)
  const pendingStartRef = useRef(null); // 낭독 대기 중 강제 녹화 시작 훅 (음소거 토글용)
  const [recPending, setRecPending] = useState(false); // 낭독 종료 대기 중 (녹화 지연 시작)
  const [showGuide, setShowGuide] = useState(false); // 정적 가이드 모달

  // 토스트 알림 스택 (alert 대체) + 대시보드 첫 로드 완료 플래그 (스켈레톤 표시 판단 전용)
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);
  const authExpiredRef = useRef(false); // 401 자동 로그아웃 토스트 1회 보장 (동시 다발 401 대비)
  const [dashLoaded, setDashLoaded] = useState(false);

  function dismissToast(id) {
    // 퇴장 애니메이션(closing) 후 제거. 자동/수동 중복 호출에도 안전
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, closing: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 240);
  }
  function showToast(type, message) {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev.slice(-3), { id, type, message, closing: false }]);
    setTimeout(() => dismissToast(id), 3500);
  }

  // 면접 기록 상세보기
  const [detailData, setDetailData] = useState(null);
  const [detailErr, setDetailErr] = useState("");

  // 대시보드 데이터 (기존 /growth, /history API 재사용)
  const [growthData, setGrowthData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [coachLine, setCoachLine] = useState("");
  const [coachPoints, setCoachPoints] = useState([]); // 최근 세션의 개선 포인트 (있을 때만)

  // 자기소개서 전용 화면: 저장본 + 예상 질문 미리보기
  const [rsSaved, setRsSaved] = useState(loadSavedResume);
  const [rsQuestions, setRsQuestions] = useState([]);
  const [rsQLoading, setRsQLoading] = useState(false);
  // 자소서 맞춤 질문 비동기 생성(워커) 대기 상태: 폴링 중 true + 경과 초
  const [qGenActive, setQGenActive] = useState(false);
  const [qGenSeconds, setQGenSeconds] = useState(0);
  // 분석 워커 상태 칩: null(미확인·API 없음 → 숨김) | { online: bool }
  const [workerStatus, setWorkerStatus] = useState(null);

  // 피드백 분석 화면: /history + /history/{id} 종합 데이터
  const [fbData, setFbData] = useState(null); // { list, details }
  const [fbLoading, setFbLoading] = useState(false);
  const [fbErr, setFbErr] = useState("");
  // 피드백 분석 레일 "다음 연습에서 집중할 것" 체크 상태 (버킷 key 배열, localStorage)
  const [fbFocus, setFbFocus] = useState(() => {
    try {
      const raw = localStorage.getItem(FB_FOCUS_KEY);
      const arr = raw ? JSON.parse(raw) : null;
      return Array.isArray(arr) ? arr.filter((k) => typeof k === "string") : [];
    } catch (e) { return []; }
  });
  function toggleFbFocus(key) {
    setFbFocus((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      try { localStorage.setItem(FB_FOCUS_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }

  // 면접 전 체크리스트: 체크한 항목 인덱스 배열 (localStorage 저장, 실패해도 무해)
  const [checks, setChecks] = useState(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_KEY);
      const arr = raw ? JSON.parse(raw) : null;
      return Array.isArray(arr) ? arr.filter((n) => Number.isInteger(n) && n >= 0 && n < CHECKLIST_ITEMS.length) : [];
    } catch (e) { return []; }
  });
  function toggleCheck(i) {
    setChecks((prev) => {
      const next = prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i];
      try { localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const qIndexRef = useRef(0);
  const resumeFileRef = useRef(null);
  const countdownRef = useRef(null);
  const companyBoxRef = useRef(null); // 지원 회사 입력 + 자동완성 드롭다운 컨테이너
  const deptBoxRef = useRef(null); // 학과 검색 입력 + 자동완성 드롭다운 컨테이너

  // 지원 회사 자동완성: 결과 계산 + 바깥 클릭 시 닫기
  const coQuery = company.trim();
  const coResults = coOpen && coQuery ? searchCompanies(coQuery) : [];
  useEffect(() => {
    if (!coOpen) return;
    function onDocDown(e) {
      if (companyBoxRef.current && !companyBoxRef.current.contains(e.target)) setCoOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [coOpen]);

  function pickCompany(name) {
    setCompany(name);
    setCoOpen(false);
    setCoIdx(-1);
  }

  // 학과 자동완성: 결과 계산 + 바깥 클릭 시 닫기 (지원 회사 자동완성과 동일 패턴)
  const deptQ = deptQuery.trim();
  const deptResults = deptOpen && deptQ ? searchDepartments(deptQ) : [];
  useEffect(() => {
    if (!deptOpen) return;
    function onDocDown(e) {
      if (deptBoxRef.current && !deptBoxRef.current.contains(e.target)) setDeptOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [deptOpen]);

  // 학과 선택: 진로 카드 목록을 펼친다 (표시용 상태만 변경, 직무 저장 로직과 무관)
  function pickDept(dept) {
    setDeptPick({ dept, careerLabel: null });
    setDeptCollege(dept.college); // 검색으로 골라도 해당 단과대 칩이 active 되도록 동기화
    setDeptQuery("");
    setDeptOpen(false);
    setDeptIdx(-1);
  }
  // 진로 카드 선택: 기존 직무 엔진에 연결 (selectJob + 세부직무 설정, 저장 payload는 기존 그대로)
  function pickCareer(c) {
    selectJob(c.job);
    setSub(c.sub);
    setDeptPick((p) => (p ? { ...p, careerLabel: c.label } : p));
  }
  function handleDeptKey(e) {
    if (!deptOpen || !deptQ) {
      if (e.key === "ArrowDown" && deptQ) {
        e.preventDefault();
        setDeptOpen(true);
        setDeptIdx(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDeptIdx((p) => (deptResults.length ? (p + 1) % deptResults.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setDeptIdx((p) => (deptResults.length ? (p <= 0 ? deptResults.length - 1 : p - 1) : -1));
    } else if (e.key === "Enter") {
      if (deptIdx >= 0 && deptResults[deptIdx]) {
        e.preventDefault();
        pickDept(deptResults[deptIdx]);
      } else if (deptResults.length > 0) {
        e.preventDefault();
        pickDept(deptResults[0]);
      } else {
        setDeptOpen(false);
      }
    } else if (e.key === "Escape") {
      setDeptOpen(false);
      setDeptIdx(-1);
    }
  }
  function handleCompanyKey(e) {
    if (!coOpen || !coQuery) {
      if (e.key === "ArrowDown" && coQuery) {
        e.preventDefault();
        setCoOpen(true);
        setCoIdx(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCoIdx((p) => (coResults.length ? (p + 1) % coResults.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCoIdx((p) => (coResults.length ? (p <= 0 ? coResults.length - 1 : p - 1) : -1));
    } else if (e.key === "Enter") {
      if (coIdx >= 0 && coResults[coIdx]) {
        e.preventDefault();
        pickCompany(coResults[coIdx].name);
      } else {
        setCoOpen(false);
      }
    } else if (e.key === "Escape") {
      setCoOpen(false);
      setCoIdx(-1);
    }
  }

  // 로그인/로그아웃 처리 (localStorage에도 같이 저장/삭제)
  function handleLogin(tk, em) {
    localStorage.setItem("cc_token", tk);
    localStorage.setItem("cc_email", em);
    authExpiredRef.current = false;
    setToken(tk);
    setUserEmail(em);
    setScreen("home");
  }
  // 전역 401 처리: 토큰 삭제 → 로그인 화면 → 토스트 1회 (authFetch에서 호출)
  function handleAuthExpired() {
    if (authExpiredRef.current) return;
    authExpiredRef.current = true;
    handleLogout();
    showToast("info", "로그인이 만료되어 다시 로그인해주세요");
  }
  function handleLogout() {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_email");
    setToken(null);
    setUserEmail("");
    setGrowthData(null);
    setHistoryData(null);
    setCoachLine("");
    setCoachPoints([]);
    setDetailData(null);
    setDetailErr("");
    setFbData(null);
    setFbErr("");
    setRsQuestions([]);
    setScreen("home");
  }

  useEffect(() => {
    fetch(`${API}/api/jobs`)
      .then((r) => r.json())
      .then((data) => {
        setJobData(data);
        // 첫 항목 자동 선택 금지: 마지막으로 고른 직무(cc_last_job)가 있을 때만 복원, 없으면 "선택 전"
        const last = loadLastJob(data);
        if (last) { setJob(last.job); setSub(last.sub); }
      })
      .catch(() => showToast("error", "일시적으로 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요."));
  }, []);

  // 전역 401 핸들러 등록 + 앱 시작 시 저장된 토큰 유효성 확인 (/me 1회)
  // 죽은 토큰으로 대시보드에 들어가지 않도록, 401이면 즉시 로그인 화면으로 보낸다
  useEffect(() => {
    setAuthExpiredHandler(handleAuthExpired);
    const saved = localStorage.getItem("cc_token");
    if (saved) {
      authFetch(`${API}/me`, { headers: { "Authorization": "Bearer " + saved } }).catch(() => {});
    }
    return () => setAuthExpiredHandler(null);
  }, []);

  // 직무·세부직무를 고르면 저장 → 면접 설정 / 자기소개서 화면이 같은 값을 공유
  useEffect(() => {
    if (job && sub) saveLastJob(job, sub);
  }, [job, sub]);

  // 홈 대시보드용 데이터 로드 (기록/성장)
  useEffect(() => {
    if (!token || screen !== "home") return;
    let cancelled = false;
    const headers = { "Authorization": "Bearer " + token };

    authFetch(`${API}/growth`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!cancelled) setGrowthData(d); })
      .catch(() => {});

    authFetch(`${API}/history`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then(async (list) => {
        if (cancelled) return;
        setHistoryData(Array.isArray(list) ? list : null);
        // 최근 면접의 피드백 한 줄 (상세 API에서 feedback 필드 사용)
        if (Array.isArray(list) && list.length > 0 && list[0].session_id != null) {
          try {
            const res = await authFetch(`${API}/history/${list[0].session_id}`, { headers });
            if (res.ok) {
              const det = await res.json();
              const fb = det && Array.isArray(det.results)
                ? det.results.map((x) => x && x.feedback).find((f) => f && String(f).trim())
                : null;
              // "논리성:" 같은 라벨 접두를 뗀 문장만 인용 (강점 문장 우선, 없으면 첫 줄)
              if (!cancelled && fb) {
                const lines = parseFeedbackLines(String(fb));
                const pick = lines.find((l) => classifyFeedbackLine(l) === "strength") || lines[0];
                const quote = pick ? pick.text : String(fb).trim();
                if (quote) setCoachLine(quote);
              }
              // 최근 세션의 개선점 리스트 (응답에 있을 때만 사용, 없으면 정적 팁으로 대체)
              const imps = det && Array.isArray(det.results)
                ? det.results
                    .flatMap((x) => {
                      if (!x) return [];
                      if (x.content && Array.isArray(x.content.improvements)) return x.content.improvements;
                      if (Array.isArray(x.improvements)) return x.improvements;
                      return [];
                    })
                    .map((v) => String(v).trim())
                    .filter((v) => v && !v.includes("[object Object]"))
                : [];
              if (!cancelled && imps.length > 0) setCoachPoints(imps.slice(0, 2));
            }
          } catch (e) {}
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setDashLoaded(true); });

    return () => { cancelled = true; };
  }, [token, screen]);

  // 피드백 분석 화면 진입 시: 기록 목록 + 최근 세션 상세(최대 8개)를 모아 종합 집계
  useEffect(() => {
    if (!token || screen !== "feedback") return;
    let cancelled = false;
    (async () => {
      setFbLoading(true);
      setFbErr("");
      try {
        const headers = { "Authorization": "Bearer " + token };
        const res = await authFetch(`${API}/history`, { headers });
        if (!res.ok) throw new Error("server");
        const list = await res.json();
        if (!Array.isArray(list)) throw new Error("format");
        const targets = list.filter((s) => s && s.session_id != null).slice(0, 8);
        const details = await Promise.all(
          targets.map((s) =>
            authFetch(`${API}/history/${s.session_id}`, { headers })
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          )
        );
        if (!cancelled) setFbData({ list, details: details.filter(Boolean) });
      } catch (e) {
        if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
        if (!cancelled) setFbErr("일시적으로 면접 기록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        if (!cancelled) setFbLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token, screen]);

  // 자기소개서 저장/삭제 (localStorage cc_resume)
  function saveResume() {
    if (!resumeText.trim()) {
      showToast("info", "저장할 자기소개서 내용을 먼저 입력해주세요.");
      return;
    }
    const obj = { text: resumeText, updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(RESUME_KEY, JSON.stringify(obj));
    } catch (e) {
      showToast("error", "브라우저 저장 공간 문제로 자기소개서를 저장하지 못했어요.");
      return;
    }
    setRsSaved(obj);
    showToast("success", `자기소개서를 저장했어요. (${resumeText.length.toLocaleString()}자)`);
  }
  function deleteSavedResume() {
    try { localStorage.removeItem(RESUME_KEY); } catch (e) {}
    setRsSaved(null);
    showToast("info", "저장된 자기소개서를 삭제했어요.");
  }

  // 질문 생성 공용 헬퍼 (면접 시작·자소서 미리보기 공용)
  // - 동기 응답 { questions } → 그대로 { ok, data } 반환 (기존 경로 동작 변화 없음)
  // - 비동기 응답 { job_id, status: "pending" } → 2초 간격, 최대 60초 폴링 후 done이면 questions 병합
  // - failed/타임아웃 → QuestionJobError throw (호출부에서 자소서 없이 재요청해 질문은행으로 폴백)
  async function requestQuestions(payload) {
    const res = await authFetch(`${API}/api/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!(res.ok && data && data.job_id != null && !Array.isArray(data.questions))) {
      return { ok: res.ok, data };
    }
    const jobId = data.job_id;
    const deadline = Date.now() + 60 * 1000;
    setQGenActive(true);
    try {
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 2000));
        let r;
        try {
          const rs = await authFetch(`${API}/api/question-result/${jobId}`, {
            headers: token ? { "Authorization": "Bearer " + token } : undefined,
          });
          r = await rs.json();
        } catch (e) {
          if (isAuthExpired(e)) throw e;
          continue; // 일시적 네트워크 오류는 다음 폴링에서 재시도
        }
        if (r && r.status === "done" && Array.isArray(r.questions)) {
          return { ok: true, data: { ...data, ...r, questions: r.questions } };
        }
        if (r && r.status === "failed") throw new QuestionJobError(r.error || "failed");
        // pending / processing → 계속 대기
      }
      throw new QuestionJobError("timeout");
    } finally {
      setQGenActive(false);
    }
  }
  // 워커 실패/지연 시 자소서 없이 재요청 → 질문은행으로 진행 (면접이 막히지 않게)
  async function requestQuestionsWithFallback(payload) {
    try {
      return await requestQuestions(payload);
    } catch (e) {
      if (!(e instanceof QuestionJobError) || !payload.resume_text) throw e;
      showToast("info", "맞춤 질문 생성이 지연되어 기본 질문으로 진행합니다");
      const { resume_text, ...rest } = payload;
      return await requestQuestions(rest);
    }
  }

  // 자소서 기반 예상 질문 미리보기 (기존 /api/questions 재사용, 카메라·면접 없이 질문만)
  async function previewQuestions() {
    if (!resumeText.trim()) {
      showToast("info", "먼저 자기소개서 내용을 입력해주세요.");
      return;
    }
    if (!jobData) {
      showToast("info", "직무 정보를 불러오는 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }
    if (!job || !sub) {
      showToast("info", "직무를 먼저 골라주세요.");
      return;
    }
    setRsQLoading(true);
    try {
      const { ok, data } = await requestQuestionsWithFallback({ job, sub, level, career, resume_text: resumeText });
      if (ok && data && Array.isArray(data.questions) && data.questions.length > 0) {
        setRsQuestions(data.questions.slice(0, 6));
      } else {
        showToast("error", "예상 질문을 만들지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      if (!isAuthExpired(e)) showToast("error", "일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setRsQLoading(false);
    }
  }

  // 자기소개서 화면 → 면접 설정으로 이동 (자소서 자동 채움 상태 유지)
  function startWithResume() {
    if (!resumeText.trim() && rsSaved) setResumeText(rsSaved.text);
    setResumeTab("text");
    setNavHint("mock");
    setScreen("start");
  }

  function selectJob(name) {
    if (!jobData || !jobData[name]) { setJob(""); setSub(""); return; }
    setJob(name);
    const subs = jobData[name].subs || [];
    setSub(subs[0] || "");
  }

  // 자소서 파일 업로드 → 텍스트 추출 후 textarea에 반영
  async function handleResumeFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // 같은 파일 재선택도 가능하도록 초기화
    if (!file) return;
    setResumeUploading(true);
    setResumeFileErr(false);
    setResumeFileMsg("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await authFetch(`${API}/api/parse-resume`, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setResumeText(data.text || "");
        setResumeFileErr(false);
        setResumeFileMsg(`${data.filename} · ${data.chars}자 불러옴`);
        showToast("success", `${data.filename} 내용을 불러왔어요. (${data.chars}자)`);
      } else {
        setResumeFileErr(true);
        setResumeFileMsg(data.detail || "파일을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        showToast("error", data.detail || "파일을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (err) {
      if (isAuthExpired(err)) return; // 자동 로그아웃 처리됨
      setResumeFileErr(true);
      setResumeFileMsg("일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      showToast("error", "일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setResumeUploading(false);
    }
  }

  // 면접 기록 상세 열기
  async function openHistoryDetail(sessionId) {
    setDetailData(null);
    setDetailErr("");
    setScreen("historyDetail");
    try {
      const res = await authFetch(`${API}/history/${sessionId}`, {
        headers: { "Authorization": "Bearer " + token },
      });
      const data = await res.json();
      if (res.ok) {
        setDetailData(data);
      } else {
        setDetailErr(data.detail || "면접 기록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
      setDetailErr("일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  async function startInterview() {
    if (!job || !sub) {
      showToast("info", "직무를 먼저 골라주세요.");
      return;
    }
    setScreen("loading");
    try {
      const { data } = await requestQuestionsWithFallback({ job, sub, level, career, resume_text: resumeText });
      setQuestions(data.questions);
      setJobRole(data.job_role);
      setResults([]);
      setQIndex(0);
      qIndexRef.current = 0;
      setCamError("");
      setSaveMsg("");
      setSaveErr(false);
      setPhase("ready");
      setCountdown(0);
      setScreen("interview");
    } catch (e) {
      if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
      showToast("error", "질문을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setScreen("start");
    }
  }

  useEffect(() => {
    if (screen !== "interview") return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        // 녹화/타이머는 준비 화면에서 [면접 시작] → 카운트다운 이후에 시작한다
      } catch (e) {
        const name = e && e.name;
        let msg;
        if (name === "NotAllowedError" || name === "SecurityError") {
          msg = "카메라·마이크 권한이 차단되어 있어요. 주소창 왼쪽 아이콘 → 카메라·마이크를 '허용'으로 바꾸고 새로고침해주세요.";
        } else if (name === "NotFoundError" || name === "OverconstrainedError") {
          msg = "카메라 또는 마이크 장치를 찾을 수 없어요. 웹캠·마이크가 연결되어 있는지 확인해주세요.";
        } else if (name === "NotReadableError" || name === "AbortError") {
          msg = "다른 프로그램(줌·디스코드·OBS 등)이 카메라를 사용 중이에요. 해당 프로그램을 끄고 새로고침해주세요.";
        } else {
          msg = `카메라/마이크를 켤 수 없습니다. (원인: ${name || "알 수 없음"}) 브라우저 권한과 장치 연결을 확인해주세요.`;
        }
        setCamError(msg);
      }
    })();
    return () => {
      cancelled = true;
      stopTimer();
      stopTtsAudio(); // 화면 이탈 시 재생 중 뉴럴 오디오 정리 (objectURL revoke 포함)
      ttsCacheRef.current.clear(); // 질문별 mp3 캐시 해제 (세션마다 질문이 달라짐)
      if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.onstop = null;
        try { recorderRef.current.stop(); } catch (e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [screen]);

  // ready ↔ live 전환 시 video 요소가 리마운트되므로 스트림을 다시 붙인다
  useEffect(() => {
    if (screen === "interview" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [screen, phase]);

  // 이탈 보호: 면접 진행 중(1문항 이상 답변 완료 & 미저장)에는 새로고침/탭 닫기 경고
  useEffect(() => {
    if (!(screen === "interview" && results.length > 0)) return;
    const onBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [screen, results.length]);

  // 분석 대기 경과 시간(초) 카운터 (동기/비동기 경로 공통)
  useEffect(() => {
    if (!busy) { setAnalysisSeconds(0); return; }
    setAnalysisSeconds(0);
    const iv = setInterval(() => setAnalysisSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [busy]);

  // 자소서 맞춤 질문 생성 대기 경과 시간(초) 카운터
  useEffect(() => {
    if (!qGenActive) { setQGenSeconds(0); return; }
    setQGenSeconds(0);
    const iv = setInterval(() => setQGenSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [qGenActive]);

  // 분석 워커 상태 확인 (자기소개서 화면·면접 설정 진입 시). 로컬 백엔드엔 API가 없을 수 있어 실패 시 칩 숨김
  useEffect(() => {
    if (screen !== "resume" && screen !== "start") return;
    let cancelled = false;
    fetch(`${API}/api/worker-status`, token ? { headers: { "Authorization": "Bearer " + token } } : undefined)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        setWorkerStatus(data && typeof data.online === "boolean" ? { online: data.online } : null);
      })
      .catch(() => { if (!cancelled) setWorkerStatus(null); });
    return () => { cancelled = true; };
  }, [screen, token]);

  // 결과 화면을 떠날 때 답변 영상 objectURL 정리
  useEffect(() => {
    if (screen !== "result") return;
    const urls = results.map((r) => r && r.videoUrl).filter(Boolean);
    return () => {
      urls.forEach((u) => { try { URL.revokeObjectURL(u); } catch (e) {} });
    };
  }, [screen]);

  /* ===== AI 면접관 음성(TTS) — 표시 레이어, 녹화/분석/저장 로직 무변경 ===== */
  // 한국어 보이스 우선 선택 (없으면 null → lang 힌트만으로 발화)
  function pickKoVoice() {
    try {
      const voices = window.speechSynthesis.getVoices() || [];
      return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ko")) || null;
    } catch (e) { return null; }
  }

  // 재생 중인 뉴럴 TTS Audio 정리 (pause + objectURL revoke). 종료·교체·이탈 공통 경로
  function stopTtsAudio() {
    const a = audioRef.current;
    if (a) {
      a.onplay = null; a.onended = null; a.onerror = null;
      try { a.pause(); } catch (e) {}
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      try { URL.revokeObjectURL(audioUrlRef.current); } catch (e) {}
      audioUrlRef.current = null;
    }
  }

  // 백엔드 뉴럴 TTS: POST /api/tts → mp3 Blob (질문 텍스트별 캐시 → 다시 듣기 즉시 재생)
  // 실패(비로그인·503·빈 응답)는 null 반환 → 호출부에서 브라우저 TTS 폴백
  async function fetchTtsBlob(text) {
    const cached = ttsCacheRef.current.get(text);
    if (cached) return cached;
    if (!token) return null;
    const res = await authFetch(`${API}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ text: String(text) }),
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob || blob.size === 0) return null;
    ttsCacheRef.current.set(text, blob);
    return blob;
  }

  // 브라우저 내장 TTS 폴백 (기존 speechSynthesis 경로 유지). finish(status)로 종료 통지
  function speakBrowserTts(text, finish) {
    if (!ttsSupported) { setAvatarState("idle"); finish("skipped"); return; }
    try {
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = "ko-KR";
      u.rate = 1.0;
      const voice = pickKoVoice();
      if (voice) u.voice = voice;
      u.onstart = () => setAvatarState("speaking");
      u.onend = () => { setAvatarState("done"); finish("ended"); };
      u.onerror = () => { setAvatarState("done"); finish("error"); };
      utterRef.current = u;
      window.speechSynthesis.speak(u);
    } catch (e) { setAvatarState("idle"); finish("error"); /* 발화 실패 시 텍스트만 (알림 없음) */ }
  }

  // 질문 낭독: ① 뉴럴 TTS(/api/tts, mp3) 우선 ② 실패 시 speechSynthesis 폴백
  // fetch(생성 1~2초) 동안 아바타는 idle 유지 — 말풍선의 질문 텍스트가 먼저 보인다
  // onEnd(status): "ended" 낭독 정상 종료 | "skipped" 음소거·미지원·빈 텍스트 | "error" 재생 실패
  function speakQuestion(text, onEnd) {
    const finish = typeof onEnd === "function" ? onEnd : () => {};
    const seq = ++speakSeqRef.current;
    cancelSpeech(); // 이전 오디오·발화 정리
    if (ttsMuted || !text) { setAvatarState("idle"); finish("skipped"); return; }
    (async () => {
      let blob = null;
      try { blob = await fetchTtsBlob(text); } catch (e) { blob = null; /* 오프라인 등 → 폴백 */ }
      if (speakSeqRef.current !== seq) return; // 그 사이 질문 전환·재호출됨 → 이 낭독은 폐기
      if (blob) {
        try {
          const url = URL.createObjectURL(blob);
          const a = new Audio(url);
          audioRef.current = a;
          audioUrlRef.current = url;
          a.onplay = () => { setAvatarState("speaking"); finish("started", a); };
          a.onended = () => { stopTtsAudio(); setAvatarState("done"); finish("ended"); };
          a.onerror = () => { stopTtsAudio(); setAvatarState("done"); finish("error"); };
          a.play().catch(() => {
            if (speakSeqRef.current !== seq) return;
            stopTtsAudio();
            speakBrowserTts(text, finish); // 자동재생 차단 등 재생 실패 → 브라우저 TTS 폴백
          });
          return;
        } catch (e) { stopTtsAudio(); }
      }
      speakBrowserTts(text, finish); // /api/tts 실패(비로그인·오프라인·503) → 기존 경로
    })();
  }

  // 낭독 중단 (질문 전환/화면 이탈/면접 종료 시): 뉴럴 Audio + 브라우저 발화 모두 정지
  function cancelSpeech() {
    stopTtsAudio();
    if (ttsSupported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    setAvatarState("idle");
  }

  // 음소거 토글 (localStorage cc_tts_muted 저장). 켜면 즉시 낭독 중단, 녹화 대기 중이면 즉시 녹화 시작
  function toggleTtsMute() {
    setTtsMuted((prev) => {
      const next = !prev;
      try { localStorage.setItem("cc_tts_muted", next ? "1" : "0"); } catch (e) {}
      if (next) {
        speakSeqRef.current += 1; // fetch 진행 중인 낭독도 폐기
        cancelSpeech();
        if (pendingStartRef.current) pendingStartRef.current(); // 낭독 대기 → 즉시 녹화
      }
      return next;
    });
  }

  // 보이스 목록이 비동기 로드되는 브라우저 대응: 미리 한 번 요청해둔다
  useEffect(() => {
    if (!ttsSupported) return;
    try { window.speechSynthesis.getVoices(); } catch (e) {}
  }, [ttsSupported]);

  // 라이브 진입·다음 질문 전환: 자동 낭독 → 낭독 종료 0.4초 뒤 녹화·답변 타이머 시작 (STT 오염 방지)
  // 음소거·TTS 미지원·낭독 실패 시엔 기존처럼 즉시 녹화. 12초 내 낭독이 안 끝나면 강제 시작 (행 방지)
  useEffect(() => {
    if (!(screen === "interview" && phase === "live")) return;
    let started = false;
    let delayT = null;
    const start = () => {
      if (started) return;
      started = true;
      clearTimeout(failT);
      if (delayT) clearTimeout(delayT);
      pendingStartRef.current = null;
      setRecPending(false);
      startRecording();
      startTimer();
    };
    pendingStartRef.current = start;
    setRecPending(true);
    setSeconds(0);
    // 행(멈춤) 방지 가드: 생성·재생 시작 전에는 텍스트 길이 기반, 재생이 시작되면 실제 오디오 길이 기반으로 교체
    // (고정 12초는 2~3문장짜리 맞춤 질문을 중간에 잘랐음)
    const qText = questions[qIndex] || "";
    const abandon = () => { speakSeqRef.current += 1; cancelSpeech(); start(); };
    let failT = setTimeout(abandon, Math.max(15000, qText.length * 400 + 8000));
    speakQuestion(qText, (status, audio) => {
      if (started) return;
      if (status === "started") {
        clearTimeout(failT);
        const dur = audio && isFinite(audio.duration) && audio.duration > 0 ? audio.duration : qText.length * 0.35;
        failT = setTimeout(abandon, (dur + 6) * 1000);
        return;
      }
      clearTimeout(failT);
      if (status === "ended") delayT = setTimeout(start, 400);
      else start(); // skipped(음소거·미지원·빈 텍스트) / error(재생 실패) → 즉시 녹화
    });
    return () => {
      started = true; // 이탈·질문 전환 후 지연 시작 방지
      clearTimeout(failT);
      if (delayT) clearTimeout(delayT);
      pendingStartRef.current = null;
      cancelSpeech();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, phase, qIndex]);

  // 준비 화면 → 3-2-1 카운트다운 → 녹화 개시
  function beginInterview() {
    if (camError || !streamRef.current || phase === "countdown") return;
    setPhase("countdown");
    setCountdown(3);
    if (countdownRef.current) clearInterval(countdownRef.current);
    let n = 3;
    countdownRef.current = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        setPhase("live");
        // 녹화·타이머는 질문 낭독 종료 후 위 useEffect에서 시작한다 (STT 오염 방지)
      } else {
        setCountdown(n);
      }
    }, 1000);
  }

  function startTimer() {
    setSeconds(0);
    stopTimer();
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }
  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  function pickMime() {
    const types = ["video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
    for (const t of types) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  }

  function startRecording() {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const mime = pickMime();
    const rec = new MediaRecorder(streamRef.current, mime ? { mimeType: mime } : undefined);
    rec.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
    recorderRef.current = rec;
    rec.start();
  }

  function stopRecording(cb) {
    const rec = recorderRef.current;
    if (!rec || rec.state === "inactive") { cb && cb(null); return; }
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType || "video/webm" });
      cb && cb(blob);
    };
    rec.stop();
  }

  // 배포 서버의 비동기 분석 잡 폴링: 3초 간격, 최대 5분
  // done → result 반환(동기 응답과 동일 구조), failed/타임아웃 → { error } 반환
  async function pollAnalysisResult(jobId) {
    const deadline = Date.now() + 5 * 60 * 1000;
    setAnalysisNote("분석 대기 중");
    try {
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 3000));
        let data;
        try {
          const res = await authFetch(`${API}/api/analysis-result/${jobId}`, {
            headers: { "Authorization": "Bearer " + token },
          });
          data = await res.json();
        } catch (e) {
          if (isAuthExpired(e)) return { error: "로그인이 만료되어 분석 결과를 받지 못했습니다." };
          continue; // 일시적 네트워크 오류는 다음 폴링에서 재시도
        }
        if (data && data.status === "done" && data.result) return data.result;
        if (data && data.status === "failed") {
          return { error: data.error || "답변 분석에 실패했습니다. 잠시 후 다시 시도해주세요." };
        }
        // pending / processing / (그 외) → 상태별 문구로 갱신 후 계속 대기
        if (data && data.status) {
          setAnalysisNote(ANALYSIS_STATUS_TEXT[data.status] || "피드백 생성 중");
        }
      }
      return { error: "분석 대기 시간이 초과되었습니다. 잠시 후 다시 시도해주세요." };
    } finally {
      setAnalysisNote("");
    }
  }

  async function sendForAnalysis(blob, index) {
    const form = new FormData();
    form.append("video", blob, "answer.webm");
    form.append("question", questions[index] || "");
    form.append("job_role", jobRole);
    form.append("career", career); // 백엔드 계약: 경력 구분 전달 (미수신이어도 무해)
    const res = await authFetch(`${API}/api/analyze-answer`, { method: "POST", body: form });
    let data = await res.json();
    // 배포 서버: 즉시 결과 대신 job_id가 오면 완료까지 폴링
    if (data && data.job_id != null && data.posture_score == null) {
      data = await pollAnalysisResult(data.job_id);
    }
    return { question: questions[index], ...data };
  }

  async function saveSession(finalResults) {
    // 분석에 실패한 문항은 저장에서 제외한다 (가짜 점수를 만들지 않는다)
    const valid = finalResults.filter((r) => !r.failed && !r.error && r.posture_score != null);
    if (valid.length === 0) {
      setSaveErr(true);
      setSaveMsg("분석에 성공한 답변이 없어 이번 면접은 기록에 저장되지 않았습니다.");
      showToast("error", "분석에 성공한 답변이 없어 이번 면접은 기록에 저장되지 않았습니다.");
      return;
    }
    try {
      const payload = {
        job, sub_job: sub, level,
        ...(company.trim() ? { company: company.trim() } : {}),
        results: valid.map((r) => ({
          question: r.question || "",
          answer_stt: r.answer_text || "",
          posture_score: Math.round(r.posture_score || 0),
          content_score: Math.round(r.content_score || 0),
          feedback: (r.content && r.content.reasons) ? formatReasons(r.content.reasons) : "",
          model_answer: (r.content && r.content.model_answer) || "",
          duration_sec: typeof r.duration_sec === "number" ? Math.round(r.duration_sec) : 0,
          filler_count: typeof r.filler_count === "number" ? Math.round(r.filler_count) : 0,
        })),
      };
      const res = await authFetch(`${API}/interview/finish`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveErr(false);
        setSaveMsg(`면접 기록이 저장되었습니다. (종합 ${data.total_score}점)`);
        showToast("success", `면접 기록이 저장되었습니다. (종합 ${data.total_score}점)`);
      } else {
        setSaveErr(true);
        setSaveMsg("기록 저장에 실패했습니다. " + (data.detail || "잠시 후 다시 시도해주세요."));
        showToast("error", "기록 저장에 실패했습니다. " + (data.detail || "잠시 후 다시 시도해주세요."));
      }
    } catch (e) {
      if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
      setSaveErr(true);
      setSaveMsg("일시적인 문제로 기록을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
      showToast("error", "일시적인 문제로 기록을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  function handleDone() {
    if (camError) return;
    setBusy(true);
    stopTimer();
    const answeredIndex = qIndexRef.current;

    stopRecording(async (blob) => {
      let result;
      try {
        result = blob ? await sendForAnalysis(blob, answeredIndex)
                       : { question: questions[answeredIndex], error: "녹화된 영상이 없습니다." };
      } catch (e) {
        result = { question: questions[answeredIndex], error: "일시적으로 분석 서버에 연결할 수 없습니다." };
      }

      // 분석 실패 시 가짜 점수를 만들지 않고, '분석 실패' 상태로 정직하게 기록한다
      if (result.error || result.posture_score == null) {
        result = {
          question: questions[answeredIndex],
          failed: true,
          failReason: result.error || "답변을 분석하지 못했습니다. 잠시 후 다시 시도해주세요.",
        };
      }

      // 세션 내 다시보기용 답변 영상 URL 보관 (결과 화면 이탈 시 revoke)
      if (blob) {
        try { result.videoUrl = URL.createObjectURL(blob); } catch (e) {}
      }

      const newResults = [...results, result];
      setResults(newResults);

      const next = answeredIndex + 1;
      if (next < questions.length) {
        setQIndex(next);
        qIndexRef.current = next;
        // 다음 질문 녹화·타이머는 낭독 종료 후 useEffect에서 시작한다 (STT 오염 방지)
        setBusy(false);
      } else {
        if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
        setBusy(false);
        setScreen("result");
        saveSession(newResults);
      }
    });
  }

  function handleRedo() {
    if (camError) return;
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") { rec.onstop = null; try { rec.stop(); } catch (e) {} }
    startRecording();
    startTimer();
  }

  function goHome() {
    stopTimer();
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.onstop = null;
      try { recorderRef.current.stop(); } catch (e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScreen("home");
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (!token) {
    return (
      <>
        <Auth onLogin={handleLogin} />
        <ToastHost toasts={toasts} onClose={dismissToast} />
      </>
    );
  }

  /* ===== 사이드바 셸 ===== */
  const emailName = displayNameFromEmail(userEmail);
  const initial = emailName && emailName !== "회원" ? emailName.charAt(0).toUpperCase() : "C";

  // 사이드바 이동 핸들러 (기능 카드에서도 재사용)
  const goHomeNav = () => { setNavHint(""); setScreen("home"); };
  const goMock = () => {
    setNavHint("mock");
    // 저장된 자소서가 있으면 면접 설정의 자소서 탭에 자동 채움 (입력 중이던 내용은 유지)
    if (!resumeText.trim()) {
      const s = loadSavedResume();
      if (s) setResumeText(s.text);
    }
    setScreen("start");
  };
  const goResume = () => {
    setNavHint("resume");
    if (!resumeText.trim()) {
      const s = loadSavedResume();
      if (s) setResumeText(s.text);
    }
    setScreen("resume");
  };
  const goRecords = () => { setNavHint(""); setScreen("growth"); };
  const goFeedback = () => { setNavHint("feedback"); setScreen("feedback"); };
  // 기록 화면 "이 직무로 바로 시작": 마지막 기록의 직무·세부·회사·난이도를 설정 화면에 미리 채움 (표시 상태만 변경)
  const startWithPreset = (preset) => {
    if (preset && typeof preset === "object") {
      if (preset.job && jobData && jobData[preset.job]) {
        setJob(preset.job);
        const subs = jobData[preset.job].subs || [];
        setSub(preset.sub && subs.includes(preset.sub) ? preset.sub : (subs[0] || ""));
      }
      if (preset.level && LEVEL_LABEL[preset.level]) setLevel(preset.level);
      setCompany(preset.company ? String(preset.company).trim() : "");
    }
    goMock();
  };
  const goSettings = () => { setNavHint(""); setScreen("settings"); };

  const navActive =
    screen === "settings" ? "settings"
      : screen === "feedback" ? "feedback"
        : screen === "resume" ? "resume"
          : screen === "growth" ? "records"
            : screen === "historyDetail" ? (navHint === "feedback" ? "feedback" : "records")
              : screen === "home" ? "home"
                : "mock"; // start / loading / interview / result

  const NAV_ITEMS = [
    { key: "home", label: "홈", icon: <IconHome />, go: goHomeNav },
    { key: "mock", label: "모의면접", icon: <IconVideo />, go: goMock },
    { key: "feedback", label: "피드백 분석", icon: <IconSpark size={17} />, go: goFeedback },
    { key: "records", label: "나의 기록", icon: <IconClock />, go: goRecords },
    { key: "resume", label: "자기소개서", icon: <IconDoc />, go: goResume },
    { key: "settings", label: "설정", icon: <IconGear />, go: goSettings },
  ];

  // 면접 진행 중(1문항 이상 답변 & 미저장) 사이드바 이동 시 확인 한 번
  const confirmLeaveInterview = () => {
    if (screen === "interview" && results.length > 0) {
      return window.confirm("면접이 진행 중입니다. 지금 나가면 이번 면접 내용이 저장되지 않아요. 정말 나갈까요?");
    }
    return true;
  };

  // 주의: 컴포넌트가 아니라 일반 함수로 호출한다.
  // (렌더마다 새 컴포넌트 타입이 되면 서브트리가 리마운트되어
  //  textarea 포커스/카메라 video가 깨지기 때문)
  function renderShell(children, greeting = false) {
    return (
      <div className="shell">
        <aside className="sidebar">
          <div className="logo" onClick={() => { if (confirmLeaveInterview()) goHomeNav(); }}>
            <span className="mark"><BubbleLogoIcon /></span>
            <span className="word"><span>코치</span><span className="w2">코치</span></span>
          </div>
          <nav className="snav">
            {NAV_ITEMS.map((it) => (
              <button
                key={it.key}
                className={"snav-item" + (navActive === it.key ? " active" : "")}
                onClick={() => { if (confirmLeaveInterview()) it.go(); }}
              >
                {it.icon}<span className="lb">{it.label}</span>
              </button>
            ))}
          </nav>
          <div className="side-bottom">
            <div className="side-tip">
              <div className="tt"><BulbIllust />오늘의 면접 Tip</div>
              <div className="td">{tip}</div>
            </div>
            <MascotIllust />
          </div>
        </aside>

        <main className="smain">
          {greeting && (
            <div className="greet-bar">
              <div className="greet">
                <h1>안녕하세요, {emailName}님! 👋</h1>
                <p>오늘도 좋은 면접을 응원할게요!</p>
              </div>
              <div className="greet-right">
                <div className="avatar" title={userEmail}>{initial}</div>
              </div>
            </div>
          )}
          {children}
        </main>
        <ToastHost toasts={toasts} onClose={dismissToast} />
      </div>
    );
  }

  /* ===== 설정 화면 ===== */
  if (screen === "settings") {
    return renderShell(
      <div className="page">
        <h1 className="page-title">설정</h1>
        <p className="page-sub">계정 정보를 확인하고 관리할 수 있어요.</p>
        <div className="dcard settings-card rise">
          <div className="set-row">
            <div className="avatar big">{initial}</div>
            <div className="set-info">
              <div className="sk">로그인 계정</div>
              <div className="sv">{userEmail || "-"}</div>
            </div>
          </div>
          <div className="set-actions">
            <button className="btn-secondary" onClick={handleLogout}>
              <IconLogout size={15} /> 로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ===== 성장 화면 ===== */
  if (screen === "growth") {
    return renderShell(
      <Growth
        token={token}
        onBack={() => setScreen("home")}
        onOpenDetail={(id) => { setNavHint("records"); openHistoryDetail(id); }}
        onStart={startWithPreset}
        onFeedback={goFeedback}
      />
    );
  }

  /* ===== 자기소개서 전용 화면 ===== */
  if (screen === "resume") {
    const savedDate = rsSaved && rsSaved.updatedAt ? fmtDate(rsSaved.updatedAt) : "";
    return renderShell(
      <div className="page wide resume-page">
        <h1 className="page-title">자기소개서</h1>
        <p className="page-sub">
          자기소개서를 저장해두면 면접 설정에 자동으로 채워지고, 내용 기반 맞춤 예상 질문을 미리 볼 수 있어요.
        </p>
        <div className="resume-cols">
          <div className="resume-main">
            {/* 1. 자소서 입력 (붙여넣기 + 파일 업로드, 기존 컴포넌트 문법 재활용) */}
            <section className="dcard setup-sec rise" style={{ "--ri": 0 }}>
              <div className="sec-head">
                <span className="sec-chip sky"><IconDoc size={16} /></span>
                <div className="sec-tt">자기소개서 입력</div>
                <span className="sec-hint">붙여넣거나 파일로 불러올 수 있어요</span>
              </div>
              <div className="setup-seg">
                <button type="button" className={"segb" + (resumeTab === "file" ? " active" : "")} onClick={() => setResumeTab("file")}>
                  <IconClip />파일 업로드
                </button>
                <button type="button" className={"segb" + (resumeTab === "text" ? " active" : "")} onClick={() => setResumeTab("text")}>
                  <IconEdit />직접 붙여넣기
                </button>
              </div>

              {resumeTab === "file" ? (
                <div className="setup-upload">
                  <DocPencilIllust />
                  <input
                    ref={resumeFileRef}
                    type="file"
                    accept=".txt,.docx,.pdf"
                    style={{ display: "none" }}
                    onChange={handleResumeFile}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    disabled={resumeUploading}
                    onClick={() => resumeFileRef.current && resumeFileRef.current.click()}
                  >
                    {resumeUploading ? <BtnSpinner /> : <IconClip />}{resumeUploading ? "불러오는 중..." : "파일 업로드"}
                  </button>
                  <div className="upload-desc">.txt / .docx / .pdf 파일을 올리면 내용을 자동으로 불러와요 (5MB 이하)</div>
                  {resumeFileMsg && (
                    <div className={"upload-msg" + (resumeFileErr ? " err" : "")}>{resumeFileMsg}</div>
                  )}
                </div>
              ) : (
                <div className="setup-text">
                  <textarea
                    placeholder="여기에 자기소개서 내용을 붙여넣으세요..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                  <div className="setup-text-foot">
                    <span className="hint-l">저장하면 다음 면접 설정에도 자동으로 채워져요</span>
                    <span className={"count" + (resumeText ? " on" : "")}>{resumeText.length.toLocaleString()}자</span>
                  </div>
                </div>
              )}

              <div className="resume-save-row">
                <button className="btn-primary" onClick={saveResume} disabled={!resumeText.trim()}>
                  자기소개서 저장
                </button>
                {rsSaved && rsSaved.text === resumeText && (
                  <span className="resume-saved-hint"><IconCheck size={11} /> 저장된 버전과 같아요</span>
                )}
              </div>
            </section>

            {/* 2. 맞춤 예상 질문 미리보기 (기존 /api/questions 재사용) */}
            <section className="dcard setup-sec rise" style={{ "--ri": 1 }}>
              <div className="sec-head">
                <span className="sec-chip lav"><IconChatDots size={16} /></span>
                <div className="sec-tt">맞춤 예상 질문 미리보기</div>
                <span className="sec-hint">카메라·면접 없이 질문만 미리 연습해보세요</span>
              </div>
              {workerStatus && (
                <span className={"worker-chip " + (workerStatus.online ? "on" : "off")} data-testid="worker-chip">
                  <span className="d"></span>
                  {workerStatus.online ? "AI 맞춤 질문 가능" : "지금은 기본 질문으로 진행돼요(분석 서버 대기 중)"}
                </span>
              )}

              {/* 직무·세부직무 선택 (면접 설정과 cc_last_job으로 공유) */}
              <div className="rs-job" data-testid="rs-job">
                <div className="rs-job-head">
                  <span className="rs-job-t">면접 직무</span>
                  {job && sub ? (
                    <span className="rs-job-cur"><IconCheck size={10} /> {job} · {sub}</span>
                  ) : (
                    <span className="rs-job-cur unset">선택 전</span>
                  )}
                </div>
                <div className="rs-job-row">
                  <label className="rs-sel">
                    <span className="rs-sel-k">직무</span>
                    <select
                      value={job || ""}
                      disabled={!jobData}
                      onChange={(e) => selectJob(e.target.value)}
                      aria-label="직무 선택"
                    >
                      <option value="">{jobData ? "직무를 골라주세요" : "직무 불러오는 중..."}</option>
                      {jobData && Object.keys(jobData).map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="rs-sel">
                    <span className="rs-sel-k">세부 직무</span>
                    <select
                      value={sub || ""}
                      disabled={!job || !jobData || !jobData[job]}
                      onChange={(e) => setSub(e.target.value)}
                      aria-label="세부 직무 선택"
                    >
                      {!job && <option value="">직무를 먼저 골라주세요</option>}
                      {job && jobData && jobData[job] && (jobData[job].subs || []).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {!job && <div className="rs-job-hint">직무를 먼저 골라주세요. 고른 직무는 면접 설정에도 그대로 적용돼요.</div>}
              </div>

              {rsQuestions.length === 0 ? (
                <div className="q-preview-empty">
                  <p>
                    버튼을 누르면 자기소개서 내용을 바탕으로
                    {job ? ` ${job}${sub ? " · " + sub : ""} 직무` : " 선택한 직무"} 예상 질문 6개를 만들어드려요.
                  </p>
                  <button
                    className="btn-primary"
                    disabled={rsQLoading || !resumeText.trim() || !job || !sub}
                    onClick={previewQuestions}
                  >
                    {rsQLoading ? <><BtnSpinner />질문을 만드는 중...</> : "예상 질문 만들기"}
                  </button>
                  {qGenActive && (
                    <div className="analysis-note qgen-note" data-testid="qgen-note">
                      <span className="d"></span>
                      자소서를 읽고 맞춤 질문을 만들고 있어요 · {qGenSeconds}초
                    </div>
                  )}
                  {!job ? (
                    <div className="upload-desc">직무를 먼저 골라주세요</div>
                  ) : !resumeText.trim() ? (
                    <div className="upload-desc">먼저 위에 자기소개서를 입력해주세요</div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="q-list">
                    {rsQuestions.map((q, i) => (
                      <div className="qcard" key={i}>
                        <span className="qnum">Q{i + 1}</span>
                        <span className="qtxt">{q}</span>
                      </div>
                    ))}
                  </div>
                  <div className="q-actions">
                    <button className="btn-secondary" onClick={previewQuestions} disabled={rsQLoading || !job || !sub}>
                      {rsQLoading ? <><BtnSpinner />다시 만드는 중...</> : "질문 다시 만들기"}
                    </button>
                    {qGenActive && (
                      <div className="analysis-note qgen-note" data-testid="qgen-note">
                        <span className="d"></span>
                        자소서를 읽고 맞춤 질문을 만들고 있어요 · {qGenSeconds}초
                      </div>
                    )}
                    <button
                      className="btn-primary"
                      onClick={startWithResume}
                      disabled={!rsSaved && !resumeText.trim()}
                      title={!rsSaved && !resumeText.trim() ? "자기소개서를 먼저 저장해주세요" : undefined}
                    >
                      이 자소서로 모의면접 시작
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>

          {/* 우측 스티키 레일: 저장된 자소서 카드 */}
          <aside className="resume-rail rise" style={{ "--ri": 1 }}>
            <div className="dcard rail-card">
              <div className="rail-t">저장된 자소서</div>
              {rsSaved ? (
                <div className="saved-resume">
                  <div className="sr-meta">
                    <span className="sr-chars">{rsSaved.text.length.toLocaleString()}자</span>
                    {savedDate && <span className="sr-date"><IconCalendar size={12} /> 수정 {savedDate}</span>}
                  </div>
                  <div className="sr-preview">
                    {rsSaved.text.slice(0, 140)}{rsSaved.text.length > 140 ? "…" : ""}
                  </div>
                  <div className="sr-actions">
                    <button className="btn-ghost" onClick={() => { setResumeTab("text"); setResumeText(rsSaved.text); }}>
                      편집기로 불러오기
                    </button>
                    <button className="btn-ghost" onClick={deleteSavedResume}>삭제</button>
                  </div>
                </div>
              ) : (
                <div className="sr-empty">
                  아직 저장된 자기소개서가 없어요. 왼쪽에 입력하고 저장하면 면접 설정에 자동으로 채워져요.
                </div>
              )}
              <button
                className="rail-start"
                onClick={startWithResume}
                disabled={!rsSaved}
                title={!rsSaved ? "자기소개서를 먼저 저장해주세요" : undefined}
              >
                이 자소서로 모의면접 시작 <IconArrowR size={15} />
              </button>
              {!rsSaved && <div className="rail-hint">자기소개서를 저장하면 시작할 수 있어요</div>}
              <div className="rail-tip">
                <div className="tt"><BulbIllust size={15} />자소서 활용 Tip</div>
                <div className="td">자소서 속 경험·수치가 구체적일수록 더 날카로운 맞춤 질문이 만들어져요.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* ===== 피드백 분석 화면 (기록 종합 분석) ===== */
  if (screen === "feedback") {
    const fbList = fbData && Array.isArray(fbData.list) ? fbData.list : null;
    const fbDetails = fbData && Array.isArray(fbData.details) ? fbData.details : [];
    const rounds = fbList ? fbList.slice().reverse() : []; // 오래된 순 = 1회차부터

    // 요약 스탯 (목록의 실제 점수만 집계)
    const pScores = rounds.filter((s) => typeof s.posture_score === "number").map((s) => s.posture_score);
    const cScores = rounds.filter((s) => typeof s.content_score === "number").map((s) => s.content_score);
    const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, v) => a + v, 0) / arr.length) : null);
    const avgPosture = avg(pScores);
    const avgContent = avg(cScores);
    const fbDates = rounds.map((s) => s.created_at).filter(Boolean);
    const fbRange = fbDates.length
      ? (fmtDateDot(fbDates[0]) === fmtDateDot(fbDates[fbDates.length - 1])
          ? fmtDateDot(fbDates[0])
          : `${fmtDateDot(fbDates[0])} ~ ${fmtDateDot(fbDates[fbDates.length - 1])}`)
      : "";

    // 회차별 자세/내용 비교 차트 데이터 (최근 10회)
    const chartPts = rounds
      .map((s, i) => ({ round: i + 1, created_at: s.created_at, posture: s.posture_score, content: s.content_score }))
      .filter((p) => typeof p.posture === "number" && typeof p.content === "number")
      .slice(-10);

    // 상세 응답의 모든 문항 결과
    const allResults = fbDetails.flatMap((d) => (d && Array.isArray(d.results) ? d.results : []));
    const analyzedSessions = fbDetails.length;

    // 강점·개선점 모음: 구조화 배열이 있으면 우선, 없으면 feedback 텍스트의 라벨 줄에서 추출
    // 3축 집계: 축 라벨 줄을 강점/개선으로 분류해 긍정 평가 비율 계산 (수치 점수가 응답에 있으면 그것을 우선)
    const strengthSet = [];
    const improveSet = [];
    let fbLineCount = 0;
    const axisAgg = FB_AXES.map((a) => ({ ...a, pos: 0, neg: 0, total: 0, scores: [] }));
    const pushUniq = (arr, v) => {
      const t = String(v).trim();
      if (t && !t.includes("[object Object]") && !arr.includes(t)) arr.push(t);
    };
    for (const r of allResults) {
      if (!r) continue;
      const structS = r.content && Array.isArray(r.content.strengths) ? r.content.strengths
        : Array.isArray(r.strengths) ? r.strengths : null;
      const structI = r.content && Array.isArray(r.content.improvements) ? r.content.improvements
        : Array.isArray(r.improvements) ? r.improvements : null;
      if (structS) structS.forEach((s) => pushUniq(strengthSet, s));
      if (structI) structI.forEach((s) => pushUniq(improveSet, s));
      const numScores = r.content && r.content.scores && typeof r.content.scores === "object" && !Array.isArray(r.content.scores)
        ? r.content.scores : null;
      if (numScores) {
        for (const [k, v] of Object.entries(numScores)) {
          if (typeof v !== "number") continue;
          const ax = axisAgg.find((a) => a.match.test(String(k)));
          if (ax) ax.scores.push(v);
        }
      }
      for (const ln of parseFeedbackLines(r.feedback)) {
        fbLineCount++;
        const kind = classifyFeedbackLine(ln);
        const withLabel = ln.label && !FB_STRENGTH_LABEL.test(ln.label) && !FB_IMPROVE_LABEL.test(ln.label)
          ? `${ln.label} · ${ln.text}`
          : ln.text;
        if (kind === "strength") pushUniq(strengthSet, withLabel);
        else if (kind === "improve") pushUniq(improveSet, withLabel);
        if (ln.label) {
          const ax = axisAgg.find((a) => a.match.test(ln.label));
          if (ax) {
            ax.total++;
            if (kind === "strength") ax.pos++;
            else if (kind === "improve") ax.neg++;
          }
        }
      }
    }
    // 축 카드: 수치 점수 평균이 있으면 점수, 없으면 긍정 평가율.
    // 피드백 데이터가 있으면 3축 게이지를 항상 표시하고, 분류가 안 된 축은 "분류 근거 부족"으로 표시
    const hasFbData = fbLineCount > 0 || axisAgg.some((a) => a.scores.length > 0);
    const axisCards = hasFbData
      ? axisAgg.map((a) => {
          if (a.scores.length) {
            return { key: a.key, color: a.color, track: a.track, value: avg(a.scores), unit: "점", sub: `${a.scores.length}문항 평균` };
          }
          const n = a.pos + a.neg;
          if (n === 0) {
            return { key: a.key, color: a.color, track: a.track, value: null, unit: "", sub: a.total > 0 ? `분류 근거 부족 (${a.total}줄)` : "분류 근거 부족", weak: true };
          }
          return { key: a.key, color: a.color, track: a.track, value: Math.round((a.pos / n) * 100), unit: "%", sub: `긍정 평가 ${a.pos}/${n}건` };
        })
      : [];
    const fbClassified = strengthSet.length + improveSet.length;

    // 최다 지적 이슈 TOP3: 개선 텍스트에서 키워드 버킷 등장 횟수 집계 (없으면 최근 개선 문장으로 대체)
    const issueCounts = FB_ISSUE_BUCKETS.map((b) => ({
      key: b.key,
      tip: b.tip,
      count: improveSet.reduce(
        (a, t) => a + (b.words.some((w) => t.includes(w)) ? 1 : 0), 0
      ),
    })).filter((b) => b.count > 0).sort((a, b) => b.count - a.count).slice(0, 3);
    const issueMax = issueCounts.length ? issueCounts[0].count : 0;
    const focusDone = issueCounts.filter((b) => fbFocus.includes(b.key)).length;

    // 필러워드·답변시간 추이 (상세 응답의 실제 필드만)
    const detailById = new Map(
      fbDetails.filter((d) => d && d.session && d.session.session_id != null)
        .map((d) => [d.session.session_id, d])
    );
    const trendRows = rounds.map((s, i) => {
      const d = detailById.get(s.session_id);
      if (!d || !Array.isArray(d.results) || d.results.length === 0) return null;
      const durs = d.results.filter((r) => r && typeof r.duration_sec === "number");
      const fills = d.results.filter((r) => r && typeof r.filler_count === "number");
      if (durs.length === 0 && fills.length === 0) return null;
      return {
        round: i + 1,
        avgDur: durs.length ? Math.round(durs.reduce((a, r) => a + r.duration_sec, 0) / durs.length) : null,
        filler: fills.length ? fills.reduce((a, r) => a + r.filler_count, 0) : null,
      };
    }).filter(Boolean);
    const trendDurMax = Math.max(1, ...trendRows.map((t) => t.avgDur || 0));
    const trendFillMax = Math.max(1, ...trendRows.map((t) => t.filler || 0));
    const fillFirst = trendRows.length > 1 && trendRows[0].filler != null && trendRows[trendRows.length - 1].filler != null
      ? trendRows[0].filler - trendRows[trendRows.length - 1].filler : null;

    // 관련 기록 바로가기 (최신 5개)
    const relatedList = fbList ? fbList.filter((s) => s && s.session_id != null).slice(0, 5) : [];

    return renderShell(
      <div className="page wide feedback-page">
        <div className="growth-head">
          <div>
            <h1 className="page-title">피드백 분석</h1>
            <p className="page-sub" style={{ margin: "6px 0 0" }}>지금까지의 면접 기록을 모아 자주 받은 피드백과 점수 흐름을 분석해드려요.</p>
          </div>
          <button className="btn-ghost" onClick={goRecords}>나의 기록 보기</button>
        </div>

        {fbErr ? (
          <div className="growth-empty rise">
            <div className="t">분석 데이터를 불러오지 못했어요</div>
            <div className="d">{fbErr}</div>
            <button onClick={goHomeNav} className="btn-primary">홈으로 돌아가기</button>
          </div>
        ) : fbLoading || !fbData ? (
          <div className="skel-wrap" aria-label="분석 데이터를 불러오는 중">
            <div className="dcard fb-hero"><SkelStatus /></div>
            <div className="fb-cols">
              <div className="fb-main">
                <div className="dcard"><span className="skel skel-line w40" style={{ height: 14, marginBottom: 16 }} /><span className="skel skel-block" /></div>
                <div className="dcard"><span className="skel skel-line w40" style={{ height: 14, marginBottom: 16 }} /><span className="skel gr-skel-chart" /></div>
              </div>
              <aside className="fb-rail">
                <div className="dcard rail-card"><span className="skel skel-line w50" style={{ height: 14, marginBottom: 14 }} /><span className="skel skel-block" /></div>
              </aside>
            </div>
          </div>
        ) : rounds.length === 0 ? (
          <div className="gr-empty rise">
            <FeedbackEmptyIllust />
            <div className="gr-empty-body">
              <div className="t">아직 분석할 면접 기록이 없어요</div>
              <div className="d">모의면접을 마치면 자주 지적받은 포인트, 자세·내용 점수 비교, 강점·개선점 모음이 이곳에 쌓여요.</div>
              <ol className="re-steps">
                <li><span className="re-num">1</span>모의면접을 마치면 문항별 AI 피드백이 저장돼요</li>
                <li><span className="re-num">2</span>피드백을 논리성·구체성·직무적합도로 나눠 집계해요</li>
                <li><span className="re-num">3</span>자주 지적받은 포인트가 다음 연습 과제로 정리돼요</li>
              </ol>
              <button onClick={goMock} className="re-cta">첫 모의면접 시작하기 <IconArrowR size={13} /></button>
            </div>
          </div>
        ) : (
          <>
            {/* 1. 분석 범위 요약 + 3축 게이지 */}
            <section className="dcard fb-hero rise" style={{ "--ri": 0 }}>
              <div className="fb-hero-l">
                <span className="fb-kicker"><IconSpark size={13} />분석 범위</span>
                <h2>면접 {rounds.length}회 · 문항 {allResults.length}개 기준</h2>
                <p>
                  {fbLineCount > 0
                    ? `${fbRange ? `${fbRange} 기록에서 ` : ""}피드백 ${fbLineCount}줄을 읽어 정리했어요.`
                    : `${fbRange ? `${fbRange} 기록에 ` : ""}저장된 문항 피드백이 아직 없어 점수 흐름만 표시해요.`}
                  {analyzedSessions < rounds.length ? ` (상세 분석은 최근 ${analyzedSessions}회 기준)` : ""}
                </p>
                <div className="fb-mini">
                  <div className="fb-ms">
                    <span className="chip lav"><IconVideo size={14} /></span>
                    <span className="mtxt"><span className="mk">평균 자세·표정</span><span className="mv">{avgPosture != null ? `${avgPosture}점` : "-"}</span></span>
                  </div>
                  <div className="fb-ms">
                    <span className="chip peach"><IconChatDots size={14} /></span>
                    <span className="mtxt"><span className="mk">평균 답변 내용</span><span className="mv">{avgContent != null ? `${avgContent}점` : "-"}</span></span>
                  </div>
                  <div className="fb-ms">
                    <span className="chip mint"><IconCheck size={12} /></span>
                    <span className="mtxt">
                      <span className="mk">강점 / 개선점</span>
                      <span className="mv">
                        {fbClassified === 0 && fbLineCount > 0 ? "분류 근거 부족" : `${strengthSet.length} / ${improveSet.length}`}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {axisCards.length > 0 ? (
                <div className="fb-axes">
                  {axisCards.map((a) => (
                    <div className={"fb-axis" + (a.weak ? " weak" : "")} key={a.key}>
                      <div className="fb-axis-g">
                        <ArcProgress value={a.value == null ? 0 : a.value} r={34} strokeWidth={8} size={84} rotated color={a.color} track={a.track} />
                        <div className="num">
                          {a.value == null
                            ? <b style={{ color: "var(--muted)" }}>–</b>
                            : <><b style={{ color: a.color }}><CountUp value={a.value} /></b><small>{a.unit}</small></>}
                        </div>
                      </div>
                      <div className="fb-axis-k">{a.key}</div>
                      <div className="fb-axis-s">{a.sub}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="fb-axes-empty">논리성·구체성·직무적합도 축별 피드백이 저장되면 여기에 게이지로 표시돼요.</div>
              )}
            </section>

            <div className="fb-cols rise" style={{ "--ri": 1 }}>
              <div className="fb-main">
                {/* 2. 자주 지적받은 포인트 TOP3 */}
                <div className="dcard">
                  <div className="dcard-head">
                    <div className="dcard-t">
                      자주 지적받은 포인트{issueCounts.length > 0 ? ` TOP${issueCounts.length}` : ""}
                    </div>
                    {issueCounts.length > 0 && <span className="dist-total">개선 피드백 {improveSet.length}건 기준</span>}
                  </div>
                  {issueCounts.length > 0 ? (
                    <div className="fb-issues">
                      {issueCounts.map((b, i) => (
                        <div className="fb-issue" key={b.key}>
                          <span className={"fb-rank r" + (i + 1)}>{i + 1}</span>
                          <div className="fb-issue-body">
                            <div className="fb-issue-top">
                              <span className="nm">{b.key}</span>
                              <span className="cnt">{b.count}회 언급</span>
                            </div>
                            <div className="dist-bar">
                              <AnimatedBar className="dist-fill" pct={(b.count / issueMax) * 100} style={{ background: i === 0 ? "var(--peach-ink)" : i === 1 ? "var(--primary)" : "var(--mint-ink)" }} />
                            </div>
                            <div className="fb-issue-tip">{b.tip}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : improveSet.length > 0 ? (
                    <>
                      <div className="fb-note">반복 패턴은 아직 뚜렷하지 않아요. 최근 받은 개선 피드백이에요.</div>
                      <ul className="fb-lines">
                        {improveSet.slice(0, 3).map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </>
                  ) : (
                    <div className="fb-empty">
                      저장된 피드백 텍스트가 아직 없어요. 다음 면접을 마치면 자주 지적받은 포인트가 집계돼요.
                    </div>
                  )}
                </div>

                {/* 3. 회차별 자세/내용 점수 비교 */}
                <div className="dcard">
                  <div className="dcard-head gr-chart-head">
                    <div className="dcard-t">회차별 자세 · 내용 점수 비교</div>
                    <div className="gr-legend">
                      <span className="gr-lg on static" style={{ "--c": "var(--sky-ink)" }}><span className="dot" />자세·표정</span>
                      <span className="gr-lg on static" style={{ "--c": "var(--accent)" }}><span className="dot" />답변 내용</span>
                      <span className="gr-goal"><span className="gl" />우수 기준 80점</span>
                    </div>
                  </div>
                  {chartPts.length > 0 ? (
                    <>
                      <LineChart
                        points={chartPts}
                        series={[
                          { key: "posture", label: "자세·표정", color: "var(--sky-ink)" },
                          { key: "content", label: "답변 내용", color: "var(--accent)" },
                        ]}
                        goal={80} valueLabels={false} height={250}
                        ariaLabel="회차별 자세·내용 점수 비교"
                      />
                      {chartPts.length === 1 && (
                        <div className="chart-note">기록이 1회뿐이라 점으로만 표시돼요. 2회차부터 추이 선이 그려집니다.</div>
                      )}
                    </>
                  ) : (
                    <div className="fb-empty">점수가 기록된 회차가 아직 없어요.</div>
                  )}
                </div>

                {/* 4. 강점 · 개선점 모음 (상세 응답에 있을 때만) */}
                {(strengthSet.length > 0 || improveSet.length > 0) && (
                  <div className="fb-sw">
                    <div className="dcard fb-sw-card good">
                      <div className="dcard-head">
                        <div className="dcard-t"><span className="gr-ic mint"><IconCheck size={11} /></span>강점 모음</div>
                        <span className="fb-sw-cnt">{strengthSet.length}건</span>
                      </div>
                      {strengthSet.length > 0 ? (
                        <ul className="fb-sw-list">
                          {strengthSet.slice(0, 6).map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      ) : (
                        <div className="fb-empty">피드백에서 추출된 강점이 아직 없어요.</div>
                      )}
                    </div>
                    <div className="dcard fb-sw-card warn">
                      <div className="dcard-head">
                        <div className="dcard-t"><span className="gr-ic peach"><IconTarget size={13} /></span>개선점 모음</div>
                        <span className="fb-sw-cnt">{improveSet.length}건</span>
                      </div>
                      {improveSet.length > 0 ? (
                        <ul className="fb-sw-list">
                          {improveSet.slice(0, 6).map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      ) : (
                        <div className="fb-empty">피드백에서 추출된 개선점이 아직 없어요.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. 필러워드 · 답변시간 추이 (상세 응답에 필드가 있을 때만) */}
                {trendRows.length > 0 && (
                  <div className="dcard">
                    <div className="dcard-head">
                      <div className="dcard-t">필러워드 · 답변 시간 추이</div>
                      <span className="dist-total">
                        최근 {trendRows.length}회 기준
                        {fillFirst != null && fillFirst !== 0 ? ` · 필러워드 ${fillFirst > 0 ? `${fillFirst}회 감소` : `${Math.abs(fillFirst)}회 증가`}` : ""}
                      </span>
                    </div>
                    <div className="fb-trend-head"><span>회차</span><span>평균 답변 시간</span><span>필러워드 합계</span></div>
                    <div className="fb-trends">
                      {trendRows.map((t) => (
                        <div className="fb-trend" key={t.round}>
                          <span className="tr-round">{t.round}회차</span>
                          <div className="tr-bar-wrap">
                            {t.avgDur != null ? (
                              <>
                                <div className="dist-bar">
                                  <AnimatedBar className="dist-fill" pct={(t.avgDur / trendDurMax) * 100} style={{ background: "var(--sky-ink)" }} />
                                </div>
                                <span className="tr-dur">{t.avgDur}초</span>
                              </>
                            ) : (
                              <span className="tr-dur muted">기록 없음</span>
                            )}
                          </div>
                          <div className="tr-fill-wrap">
                            {t.filler != null ? (
                              <>
                                <div className="dist-bar">
                                  <AnimatedBar className="dist-fill" pct={(t.filler / trendFillMax) * 100} style={{ background: t.filler === 0 ? "var(--mint-ink)" : "var(--peach-ink)" }} />
                                </div>
                                <span className={"tr-filler" + (t.filler === 0 ? " zero" : "")}>{t.filler}회</span>
                              </>
                            ) : (
                              <span className="tr-dur muted">기록 없음</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. 우측 레일 */}
              <aside className="fb-rail">
                <div className="dcard rail-card">
                  <div className="dcard-head">
                    <div className="rail-t" style={{ marginBottom: 0 }}><span className="gr-ic peach"><IconTarget size={15} /></span>다음 연습에서 집중할 것</div>
                    {issueCounts.length > 0 && <span className="check-cnt">{focusDone}/{issueCounts.length}</span>}
                  </div>
                  {issueCounts.length > 0 ? (
                    <>
                      <ul className="check-list fb-focus">
                        {issueCounts.map((b, i) => {
                          const on = fbFocus.includes(b.key);
                          return (
                            <li key={b.key}>
                              <button type="button" className={"check-item" + (on ? " on" : "")} onClick={() => toggleFbFocus(b.key)} aria-pressed={on}>
                                <span className="cbox"><IconCheck size={10} /></span>
                                <span className="clabel"><b>{i + 1}. {b.key}</b><span>{b.tip}</span></span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="gw-note">
                        {focusDone === issueCounts.length
                          ? "모두 체크했어요. 다음 면접에서 실천해보고 점수 변화를 확인해보세요."
                          : "체크한 항목은 이 브라우저에 저장돼요. 다음 면접 전에 다시 확인하세요."}
                      </div>
                    </>
                  ) : (
                    <div className="fb-empty">개선 피드백이 쌓이면 다음 연습 과제 3개가 여기에 정리돼요.</div>
                  )}
                  <button className="rail-start" onClick={goMock}>다음 모의면접 시작하기 <IconArrowR size={15} /></button>
                </div>

                {relatedList.length > 0 && (
                  <div className="dcard rail-card">
                    <div className="dcard-head">
                      <div className="rail-t" style={{ marginBottom: 0 }}><IconClock size={15} />관련 기록 바로가기</div>
                      <button className="dlink" onClick={goRecords}>전체 보기 <IconChevron size={12} /></button>
                    </div>
                    <div className="recent-list fb-related">
                      {relatedList.map((s, i) => (
                        <div
                          className="recent-row clickable" key={s.session_id}
                          role="button" tabIndex={0}
                          onClick={() => openHistoryDetail(s.session_id)}
                          onKeyDown={keyActivate(() => openHistoryDetail(s.session_id))}
                        >
                          <RecordLogo company={s.company} job={s.job} idx={i} />
                          <div className="rinfo">
                            <div className="rjob">{sessionTitle(s)}</div>
                            <div className="rdate">{fmtDateDot(s.created_at)}{typeof s.total_score === "number" ? ` · 종합 ${s.total_score}점` : ""}</div>
                          </div>
                          <ScoreBadge score={typeof s.total_score === "number" ? s.total_score : null} />
                          <span className="rgo"><IconChevron /></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rail-tip">
                  <div className="tt"><BulbIllust size={15} />오늘의 면접 Tip</div>
                  <div className="td">{tip}</div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    );
  }

  /* ===== 면접 기록 상세 화면 ===== */
  if (screen === "historyDetail") {
    const sess = detailData && detailData.session;
    const dResults = detailData && Array.isArray(detailData.results) ? detailData.results : [];
    const dTotal = sess && typeof sess.total_score === "number" ? sess.total_score : null;

    return renderShell(
      <div className="page">
        <h1 className="page-title">면접 기록 상세</h1>

        {detailErr ? (
          <p className="save-msg err" style={{ marginTop: 16 }}>{detailErr}</p>
        ) : !sess ? (
          <DetailSkeleton />
        ) : (
          <>
            {sess.company && String(sess.company).trim() !== "" && (
              <div className="detail-company">
                <RecordLogo company={sess.company} job={sess.job} />
                <span className="dc-name">{String(sess.company).trim()}</span>
              </div>
            )}
            <p className="page-sub">
              {sess.job}{sess.sub_job ? " · " + sess.sub_job : ""}
              {sess.level ? ` · 난이도 ${LEVEL_LABEL[sess.level] || sess.level}` : ""}
              {sess.created_at ? " · " + fmtDate(sess.created_at) : ""}
            </p>

            <div className="result-head rise" style={{ "--ri": 0 }}>
              <div className="score-gauge">
                <ArcProgress value={dTotal} r={54} strokeWidth={10} size={128} />
                <div className="num">
                  <b>{dTotal != null ? <CountUp value={dTotal} /> : "-"}</b>
                  <span>종합 점수</span>
                </div>
              </div>
              <div className="score-split">
                <div className="score-item">
                  <div className="k">자세·표정</div>
                  <div className="v">{sess.posture_score ?? "-"}<small>/ 100</small></div>
                </div>
                <div className="score-item">
                  <div className="k">답변 내용</div>
                  <div className="v">{sess.content_score ?? "-"}<small>/ 100</small></div>
                </div>
                <div className="score-item">
                  <div className="k">답변 문항</div>
                  <div className="v">{dResults.length}<small>개</small></div>
                </div>
              </div>
            </div>

            {dResults.map((r, i) => (
              <div className="rcard rise" style={{ "--ri": Math.min(i + 1, 6) }} key={r.result_id ?? i}>
                <div className="rq">Q{i + 1}. {r.question}</div>
                <div className="rscores">
                  <span className="ps">자세 {r.posture_score != null ? r.posture_score + "점" : "-"}</span>
                  <span className="cs">내용 {r.content_score != null ? r.content_score + "점" : "-"}</span>
                </div>

                <div className="rblock">
                  <span className="bk">내 답변</span>
                  {r.answer_stt || "(음성 인식 내용 없음)"}
                </div>

                {r.feedback && (
                  <details className="model-toggle">
                    <summary>
                      <span className="arrow"><IconChevron /></span>
                      피드백 보기
                    </summary>
                    <div className="model-body">{r.feedback}</div>
                  </details>
                )}

                {r.model_answer && (
                  <details className="model-toggle">
                    <summary>
                      <span className="arrow"><IconChevron /></span>
                      모범 답변 보기
                    </summary>
                    <div className="model-body">{r.model_answer}</div>
                  </details>
                )}
              </div>
            ))}
          </>
        )}

        <div className="result-actions">
          <button
            className="btn-secondary"
            onClick={() => { if (navHint === "feedback") goFeedback(); else if (navHint === "records") goRecords(); else setScreen("home"); }}
          >
            {navHint === "feedback" ? "피드백 분석으로 돌아가기" : navHint === "records" ? "나의 기록으로 돌아가기" : "돌아가기"}
          </button>
        </div>
      </div>
    );
  }

  /* ===== 로딩 화면 ===== */
  if (screen === "loading") {
    return renderShell(
      <div className="loading">
        <div className="spinner"></div>
        <div className="lt">면접을 준비하고 있습니다</div>
        <div className="ls">{job}{sub ? " · " + sub : ""} · {career} 직무에 맞는 질문을 만들고 있어요</div>
        {qGenActive && (
          <div className="analysis-note qgen-note" data-testid="qgen-note">
            <span className="d"></span>
            자소서를 읽고 맞춤 질문을 만들고 있어요 · {qGenSeconds}초
          </div>
        )}
      </div>
    );
  }

  /* ===== 결과 화면 ===== */
  if (screen === "result") {
    const valid = results.filter((r) => !r.failed && !r.error && r.posture_score != null);
    const failedCount = results.length - valid.length;
    const pAvg = valid.length
      ? Math.round(valid.reduce((a, r) => a + (r.posture_score || 0), 0) / valid.length)
      : null;
    const cVals = valid.filter((r) => typeof r.content_score === "number");
    const cAvg = cVals.length
      ? Math.round(cVals.reduce((a, r) => a + r.content_score, 0) / cVals.length)
      : null;
    const totalParts = [pAvg, cAvg].filter((v) => v != null);
    const total = totalParts.length
      ? Math.round(totalParts.reduce((a, v) => a + v, 0) / totalParts.length)
      : null;

    return renderShell(
      <div className="page result-page">
          <h1 className="page-title">모의면접 결과</h1>

          <div className="result-cols">
          <aside className="result-rail rise" style={{ "--ri": 0 }}>
          <div className="result-head">
            <div className="score-gauge">
              <ArcProgress value={total} r={54} strokeWidth={10} size={128} />
              <div className="num">
                <b>{total != null ? <CountUp value={total} /> : "-"}</b>
                <span>종합 점수</span>
              </div>
            </div>
            <div className="score-split">
              <div className="score-item">
                <div className="k">자세·표정</div>
                <div className="v">{pAvg ?? "-"}<small>/ 100</small></div>
              </div>
              <div className="score-item">
                <div className="k">답변 내용</div>
                <div className="v">{cAvg ?? "-"}<small>/ 100</small></div>
              </div>
              {failedCount > 0 && (
                <div className="score-item">
                  <div className="k">분석 실패</div>
                  <div className="v">{failedCount}<small>문항 (집계 제외)</small></div>
                </div>
              )}
            </div>
          </div>

          {saveMsg && <p className={"save-msg" + (saveErr ? " err" : "")}>{saveMsg}</p>}

          <div className="rail-actions">
            <button onClick={goHome} className="btn-primary">홈으로</button>
            <button onClick={() => setScreen("growth")} className="btn-secondary">나의 성장 보기</button>
          </div>
          </aside>

          <div className="result-main">
          {results.map((r, i) => (
            <div className="rcard rise" style={{ "--ri": Math.min(i + 1, 6) }} key={i}>
              <div className="rq">Q{i + 1}. {r.question}</div>

              {(r.failed || r.error || r.posture_score == null) ? (
                <>
                  <div className="rfail">분석 실패</div>
                  <div className="rfail-desc">
                    {r.failReason || "이 답변은 분석하지 못했습니다."} 이 문항은 점수 집계와 기록 저장에서 제외됩니다.
                  </div>
                </>
              ) : (
                <>
                  <div className="rscores">
                    <span className="ps">
                      자세 {r.posture_score ?? "-"}점
                      {r.score_formula && (
                        <span className="ps-formula" title={String(r.score_formula)}>?</span>
                      )}
                    </span>
                    <span className="cs">내용 {typeof r.content_score === "number" ? r.content_score + "점" : "-"}</span>
                    {r.content && r.content.grade && (
                      <span className="grade-chip">{String(r.content.grade)}</span>
                    )}
                  </div>

                  {(r.duration_sec != null || r.filler_count != null || r.speech_rate_wpm != null) && (
                    <div className="rmeta">
                      {r.duration_sec != null && <span>답변 길이 {Math.round(r.duration_sec)}초</span>}
                      {r.filler_count != null && <span>필러워드 {r.filler_count}회 (참고 지표)</span>}
                      {r.speech_rate_wpm != null && <span>분당 {Math.round(r.speech_rate_wpm)}어절</span>}
                    </div>
                  )}

                  {r.content && r.content.scores && typeof r.content.scores === "object" && !Array.isArray(r.content.scores) && (
                    <div className="axis-bars">
                      {Object.entries(r.content.scores)
                        .filter(([, v]) => typeof v === "number")
                        .map(([k, v]) => {
                          const pct = Math.max(0, Math.min(100, v));
                          return (
                            <div className="axis" key={k}>
                              <span className="ak">{k}</span>
                              <div className="abar"><AnimatedBar className="afill" pct={pct} /></div>
                              <span className="av">{v}</span>
                            </div>
                          );
                        })}
                    </div>
                  )}

                  <div className="rblock">
                    <span className="bk">내 답변</span>
                    {r.answer_text || "(음성 인식 내용 없음)"}
                  </div>

                  {r.content && Array.isArray(r.content.strengths) && r.content.strengths.length > 0 && (
                    <div className="rblock swlist good">
                      <span className="bk">강점</span>
                      <ul>
                        {r.content.strengths.map((s, k) => <li key={k}>{String(s)}</li>)}
                      </ul>
                    </div>
                  )}

                  {r.content && Array.isArray(r.content.improvements) && r.content.improvements.length > 0 && (
                    <div className="rblock swlist warn">
                      <span className="bk">개선점</span>
                      <ul>
                        {r.content.improvements.map((s, k) => <li key={k}>{String(s)}</li>)}
                      </ul>
                    </div>
                  )}

                  {r.content && r.content.reasons && (
                    <div className="rblock reason">
                      <span className="bk">점수 이유</span>
                      <div className="reason-body">{formatReasons(r.content.reasons)}</div>
                    </div>
                  )}

                  {r.content && r.content.model_answer && (
                    <details className="model-toggle">
                      <summary>
                        <span className="arrow"><IconChevron /></span>
                        모범 답변 보기
                      </summary>
                      <div className="model-body">{r.content.model_answer}</div>
                    </details>
                  )}
                </>
              )}

              {r.videoUrl && (
                <details className="model-toggle replay-toggle">
                  <summary>
                    <span className="arrow"><IconChevron /></span>
                    내 답변 영상 보기
                  </summary>
                  <div className="model-body">
                    <video className="replay-video" src={r.videoUrl} controls playsInline></video>
                  </div>
                </details>
              )}
            </div>
          ))}

          <div className="result-actions">
            <button onClick={goHome} className="btn-primary">홈으로</button>
            <button onClick={() => setScreen("growth")} className="btn-secondary">나의 성장 보기</button>
          </div>
          </div>
          </div>
      </div>
    );
  }

  /* ===== 면접 진행 화면 ===== */
  if (screen === "interview") {
    const total = questions.length;
    const isLast = qIndex + 1 >= total;

    /* 녹화 전 준비 화면 (카메라 미리보기 + 안내) → 3-2-1 카운트다운 → 녹화 개시 */
    if (phase !== "live") {
      return renderShell(
        <div className="page wide">
          <h1 className="page-title">면접 준비</h1>
          <p className="page-sub">카메라 속 내 모습을 확인하고, 준비가 되면 면접을 시작하세요. 아직 녹화 전이에요.</p>
          <div className="imain ready-main">
            <div className="cam-area">
              {camError ? (
                <div className="cam-error">{camError}</div>
              ) : (
                <>
                  <video ref={videoRef} autoPlay muted playsInline></video>
                  {phase === "countdown" && (
                    <div className="count-overlay"><b>{countdown}</b><span>곧 녹화가 시작됩니다</span></div>
                  )}
                  <div className="cam-msg">아직 녹화 전이에요 · 자세와 조명을 점검해보세요</div>
                </>
              )}
            </div>
            <div className="iside">
              <div className="card">
                <div className="card-t"><IconChatDots size={15} />AI 면접관</div>
                <div className="av-ready-row">
                  <InterviewerAvatar state="idle" size={86} />
                  <div className="av-ready-msg">면접이 시작되면 제가 질문을 읽어드려요</div>
                </div>
              </div>
              <div className="card">
                <div className="card-t"><IconDoc size={15} />이번 면접 구성</div>
                <div className="ready-facts">
                  <div className="rf"><span className="k">질문 수</span><span className="v">{total}개</span></div>
                  <div className="rf"><span className="k">예상 소요 시간</span><span className="v">{estDuration(total)}</span></div>
                  <div className="rf"><span className="k">직무</span><span className="v">{jobRole}</span></div>
                  <div className="rf"><span className="k">난이도</span><span className="v">{LEVEL_LABEL[level] || level}</span></div>
                  <div className="rf"><span className="k">경력</span><span className="v">{career}</span></div>
                </div>
              </div>
              <div className="card">
                <div className="card-t"><IconTip />시작 전 안내</div>
                <div className="hint-line">
                  · 질문마다 답변을 녹화하고 '답변 완료'를 누르면 다음 질문으로 넘어가요<br />
                  · 답변 영상은 분석 직후 삭제되며, 답변 텍스트와 점수만 기록에 저장됩니다
                </div>
              </div>
              <button
                className="btn-done ready-start"
                onClick={beginInterview}
                disabled={!!camError || phase === "countdown"}
              >
                {phase === "countdown" ? `${countdown}초 후 시작...` : "면접 시작"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return renderShell(
      <>
        <div className="ibar">
          <div className="progress-wrap">
            <span className="progress-txt">질문 {qIndex + 1} / {total}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: ((qIndex + 1) / total) * 100 + "%" }}></div>
            </div>
          </div>
          <div className="timer"><span className="rec"></span>{mm}:{ss}</div>
        </div>

        <div className="imain">
          <div className="q-fixed avatar-panel">
            <div className="avp-left">
              <InterviewerAvatar state={avatarState} size={128} />
              <span className="av-label">AI 면접관</span>
            </div>
            <div className="avp-main">
              <span className="qb">Q{qIndex + 1}. {jobRole} · 난이도 {LEVEL_LABEL[level] || level} · {career}</span>
              <div className="q-bubble">
                <div className="qt">{questions[qIndex]}</div>
              </div>
              {/* 뉴럴 TTS(/api/tts)는 speechSynthesis 미지원 브라우저에서도 동작하므로 항상 노출 */}
              <div className="av-ctrl">
                <button
                  className={"av-btn" + (ttsMuted ? " on" : "")}
                  onClick={toggleTtsMute}
                  aria-pressed={ttsMuted}
                  title={ttsMuted ? "음성 안내 켜기" : "음성 안내 끄기"}
                >
                  {ttsMuted ? <IconSoundOff /> : <IconSoundOn />}
                  <span>{ttsMuted ? "음소거 중" : "음성 켜짐"}</span>
                </button>
                <button
                  className="av-btn"
                  onClick={() => speakQuestion(questions[qIndex])}
                  disabled={ttsMuted || recPending}
                  title="현재 질문을 다시 읽어드려요 (녹화는 멈추지 않아요)"
                >
                  <IconReplay />
                  <span>질문 다시 듣기</span>
                </button>
              </div>
            </div>
          </div>

          <div className="cam-area">
            {camError ? (
              <div className="cam-error">{camError}</div>
            ) : (
              <>
                <video ref={videoRef} autoPlay muted playsInline></video>
                {recPending ? (
                  <div className="cam-rec listening"><span className="d"></span>질문 듣는 중</div>
                ) : (
                  <div className="cam-rec"><span className="d"></span>REC</div>
                )}
                <div className="cam-msg">
                  {recPending ? "낭독이 끝나면 녹화가 시작돼요 · 답변을 준비하세요" : "답변이 끝나면 아래 '답변 완료'를 눌러주세요"}
                </div>
              </>
            )}
          </div>

          <div className="iside">
            <div className="card">
              <div className="card-t"><IconTip />면접 팁</div>
              <div className="hint-line">
                · 카메라(렌즈)를 면접관이라 생각하고 바라보세요<br />
                · 어깨를 펴고 바른 자세를 유지하세요<br />
                · 결론부터 말하고 구체적 경험을 덧붙이면 좋아요
              </div>
            </div>
            <div className="card">
              <div className="card-t"><IconMic />녹화 상태</div>
              {recPending ? (
                <div className="rec-state listen"><span className="d"></span>질문을 듣고 있어요...</div>
              ) : (
                <div className="rec-state"><span className="d"></span>답변을 녹화하고 있어요</div>
              )}
              <div className="wave">
                <span style={{ animationDelay: "0s" }}></span>
                <span style={{ animationDelay: ".1s" }}></span>
                <span style={{ animationDelay: ".2s" }}></span>
                <span style={{ animationDelay: ".3s" }}></span>
                <span style={{ animationDelay: ".15s" }}></span>
                <span style={{ animationDelay: ".25s" }}></span>
                <span style={{ animationDelay: ".05s" }}></span>
                <span style={{ animationDelay: ".35s" }}></span>
              </div>
            </div>
            <div className="ictrl">
              <button className="btn-redo" onClick={handleRedo} disabled={busy || recPending}>다시 답변</button>
              <button className="btn-done" onClick={handleDone} disabled={busy || recPending}>
                {busy ? <><BtnSpinner />분석 중...</> : isLast ? "면접 마치기" : "답변 완료"}
              </button>
            </div>
            {busy && (
              <div className="analysis-note">
                <span className="d"></span>
                {(analysisNote || "답변을 분석하고 있어요")} · {analysisSeconds}초 경과
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  /* ===== 면접 설정 화면 ===== */
  if (screen === "start") {
    if (!jobData) {
      return renderShell(<SetupSkeleton />);
    }
    const jobNames = Object.keys(jobData);
    const selMeta = jobMeta(job);
    return renderShell(
      <div className="page wide setup-page">
        <div className="setup-cols">
          <div className="setup-main">
          {/* 0. 미니 히어로 + 실시간 요약 칩 */}
          <section className="setup-hero rise" style={{ "--ri": 0 }}>
            <div className="sh-text">
              <h2>어떤 면접을 준비할까요?</h2>
              <p>{jobTab === "dept" ? "학과를 고르면 우리 과 선배들이 가는 진로로 안내해드려요." : "직무와 난이도를 고르면 맞춤 질문을 만들어드려요."}</p>
              <div className="sh-chips">
                {company.trim() && <span className="shc">{company.trim()}</span>}
                <span className={"shc" + (job ? "" : " empty")} data-testid="hero-job">{job || "직무 선택 전"}</span>
                <span className={"shc" + (sub ? "" : " empty")} data-testid="hero-sub">{sub || "세부 직무 선택 전"}</span>
                <span className={"shc" + (career ? "" : " empty")}>{career || "경력"}</span>
                <span className={"shc" + (level ? "" : " empty")}>{LEVEL_LABEL[level] || "난이도"}</span>
              </div>
            </div>
            <SetupBearIllust />
          </section>

          {/* 1. 직무 선택 + 2. 세부 직무 */}
          <section className="dcard setup-sec rise" style={{ "--ri": 1 }}>
            <div className="sec-head">
              <span className="sec-chip lav"><IconJobEtc size={17} /></span>
              <div className="sec-tt">지원 직무 분야</div>
              <span className="sec-hint">
                {jobTab === "dept" ? "대전대학교 학과를 고르면 진로를 추천해드려요" : "원하는 분야 1개를 골라주세요"}
              </span>
            </div>
            <div className="setup-seg">
              <button type="button" className={"segb" + (jobTab === "dept" ? " active" : "")} onClick={() => setJobTab("dept")}>
                학과로 찾기
              </button>
              <button type="button" className={"segb" + (jobTab === "job" ? " active" : "")} onClick={() => setJobTab("job")}>
                직무로 찾기
              </button>
            </div>

            {jobTab === "dept" ? (
              <>
                {/* 학과 검색 + 자동완성 (지원 회사 자동완성 문법 재활용) */}
                <div className="company-input" ref={deptBoxRef}>
                  <input
                    type="text"
                    value={deptQuery}
                    maxLength={30}
                    placeholder="학과명으로 검색해보세요 (예: 정보통신공학과)"
                    onChange={(e) => { setDeptQuery(e.target.value); setDeptOpen(true); setDeptIdx(-1); }}
                    onFocus={() => setDeptOpen(true)}
                    onKeyDown={handleDeptKey}
                    role="combobox"
                    aria-expanded={deptOpen && deptQ !== ""}
                    aria-autocomplete="list"
                  />
                  {deptQuery.trim() !== "" && (
                    <button type="button" className="co-clear" onClick={() => { setDeptQuery(""); setDeptOpen(false); setDeptIdx(-1); }}>지우기</button>
                  )}
                  {deptOpen && deptQ !== "" && (
                    <div className="co-suggest" role="listbox">
                      {deptResults.length > 0 ? (
                        deptResults.map((d, i) => (
                          <div
                            key={d.name}
                            className={"co-sug-row" + (i === deptIdx ? " active" : "")}
                            role="option"
                            aria-selected={i === deptIdx}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => pickDept(d)}
                            onMouseEnter={() => setDeptIdx(i)}
                          >
                            <span className="co-sug-name">{markMatch(d.name, deptQ)}</span>
                            <span className="co-sug-ind">{d.college}</span>
                          </div>
                        ))
                      ) : (
                        <div className="co-sug-empty">'{deptQ}'와 일치하는 학과가 없어요. 직무로 찾기 탭을 이용해보세요</div>
                      )}
                    </div>
                  )}
                </div>
                {/* 단과대학 → 학과 계층 탐색 (지원 회사 칩 문법 재활용) */}
                <div className="dc-label">단과대학</div>
                <div className="company-chips">
                  {COLLEGE_ORDER.map((c) => {
                    const active = deptCollege === c;
                    return (
                      <button
                        type="button"
                        key={c}
                        className={"co-chip" + (active ? " active" : "")}
                        aria-pressed={active}
                        onClick={() => setDeptCollege(c)}
                      >
                        {active && <IconCheck size={10} />}
                        <span className="co-chip-ic" aria-hidden="true">{COLLEGE_ICON[c] || COLLEGE_ICON_FALLBACK}</span>
                        {c}
                      </button>
                    );
                  })}
                </div>
                <div className="dc-label">{deptCollege} 학과</div>
                <div className="company-chips">
                  {DEPARTMENTS.filter((d) => d.college === deptCollege).map((d) => {
                    const active = deptPick && deptPick.dept.name === d.name;
                    return (
                      <button
                        type="button"
                        key={d.name}
                        className={"co-chip" + (active ? " active" : "")}
                        aria-pressed={!!active}
                        onClick={() => {
                          if (active) { setDeptPick(null); return; }
                          pickDept(d);
                        }}
                      >
                        {active && <IconCheck size={10} />}{d.name}
                      </button>
                    );
                  })}
                </div>
                {/* 선택한 학과의 주요 진로 카드 (기존 파스텔 직무 카드 문법 재활용) */}
                {deptPick ? (
                  <div
                    key={deptPick.dept.name}
                    className="setup-subjob"
                    style={{ "--jc": `var(--${selMeta.tone})`, "--jc-ink": `var(--${selMeta.tone}-ink)` }}
                  >
                    <div className="ss-label">{deptPick.dept.name} 선배들의 주요 진로예요. 진로를 고르면 직무가 설정돼요</div>
                    <div className="job2-grid">
                      {deptPick.dept.careers.map((c) => {
                        const m = jobMeta(c.job);
                        const active = deptPick.careerLabel === c.label && job === c.job && sub === c.sub;
                        return (
                          <div
                            key={c.label + c.job + c.sub}
                            className={"job2" + (active ? " active" : "")}
                            style={{ "--jc": `var(--${m.tone})`, "--jc-ink": `var(--${m.tone}-ink)` }}
                            onClick={() => pickCareer(c)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={active}
                            onKeyDown={keyActivate(() => pickCareer(c))}
                          >
                            <span className="setup-chk"><IconCheck /></span>
                            <span className="job2-ic">{m.icon}</span>
                            <span className="job2-nm">{c.label}</span>
                            <span className="job2-tag">{c.job} · {c.sub}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="upload-desc">학과를 선택하면 우리 과 선배들이 가는 진로가 여기에 표시돼요</div>
                )}
              </>
            ) : (
              <>
                <div className="job2-grid">
                  {jobNames.map((name) => {
                    const m = jobMeta(name);
                    return (
                      <div
                        key={name}
                        className={"job2" + (job === name ? " active" : "")}
                        style={{ "--jc": `var(--${m.tone})`, "--jc-ink": `var(--${m.tone}-ink)` }}
                        onClick={() => selectJob(name)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={job === name}
                        onKeyDown={keyActivate(() => selectJob(name))}
                      >
                        <span className="setup-chk"><IconCheck /></span>
                        <span className="job2-ic">{m.icon}</span>
                        <span className="job2-nm">{name}</span>
                        <span className="job2-tag">{m.tag}</span>
                      </div>
                    );
                  })}
                </div>
                {job && jobData[job] ? (
                <div
                  key={job}
                  className="setup-subjob"
                  style={{ "--jc": `var(--${selMeta.tone})`, "--jc-ink": `var(--${selMeta.tone}-ink)` }}
                >
                  <div className="ss-label">세부 직무를 선택하면 더 정확한 질문이 나와요</div>
                  <div className="ss-tags">
                    {(jobData[job].subs || []).map((s, i) => (
                      <div
                        key={s}
                        className={"ss-tag" + (sub === s ? " active" : "")}
                        style={{ "--i": i }}
                        onClick={() => setSub(s)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={sub === s}
                        onKeyDown={keyActivate(() => setSub(s))}
                      >
                        {sub === s && <IconCheck size={10} />}{s}
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <div className="upload-desc">직무를 고르면 세부 직무가 여기에 표시돼요</div>
                )}
              </>
            )}
          </section>

          {/* 2.5 지원 회사 (선택) */}
          <section className="dcard setup-sec rise" style={{ "--ri": 2 }}>
            <div className="sec-head">
              <span className="sec-chip lilac"><IconJobGov size={16} /></span>
              <div className="sec-tt">지원 회사</div>
              <span className="sec-optional">선택</span>
              <span className="sec-hint">입력하면 기록에 회사 로고가 함께 표시돼요</span>
            </div>
            <div className="company-chips">
              {COMPANY_QUICK.map((name) => (
                <button
                  type="button"
                  key={name}
                  className={"co-chip" + (company.trim() === name ? " active" : "")}
                  onClick={() => setCompany(company.trim() === name ? "" : name)}
                >
                  {company.trim() === name && <IconCheck size={10} />}{name}
                </button>
              ))}
            </div>
            <div className="company-input" ref={companyBoxRef}>
              <input
                type="text"
                value={company}
                maxLength={40}
                placeholder="지원할 회사명을 직접 입력할 수도 있어요 (예: 한화시스템)"
                onChange={(e) => { setCompany(e.target.value); setCoOpen(true); setCoIdx(-1); }}
                onFocus={() => setCoOpen(true)}
                onKeyDown={handleCompanyKey}
                role="combobox"
                aria-expanded={coOpen && coQuery !== ""}
                aria-autocomplete="list"
              />
              {company.trim() !== "" && (
                <button type="button" className="co-clear" onClick={() => { setCompany(""); setCoOpen(false); setCoIdx(-1); }}>지우기</button>
              )}
              {coOpen && coQuery !== "" && (
                <div className="co-suggest" role="listbox">
                  {coResults.length > 0 ? (
                    coResults.map((c, i) => (
                      <div
                        key={c.name}
                        className={"co-sug-row" + (i === coIdx ? " active" : "")}
                        role="option"
                        aria-selected={i === coIdx}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickCompany(c.name)}
                        onMouseEnter={() => setCoIdx(i)}
                      >
                        <span className="co-sug-mark" style={{ background: c.bg || "#FFFFFF", color: c.color }}>{c.mark}</span>
                        <span className="co-sug-name">{markMatch(c.name, coQuery)}</span>
                        <span className="co-sug-ind">{c.industry}</span>
                      </div>
                    ))
                  ) : (
                    <div className="co-sug-empty">'{coQuery}' 직접 입력으로 사용돼요</div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* 3. 경력 구분 */}
          <section className="dcard setup-sec rise" style={{ "--ri": 3 }}>
            <div className="sec-head">
              <span className="sec-chip mint"><IconUser size={16} /></span>
              <div className="sec-tt">경력 구분</div>
              <span className="sec-hint">선택에 따라 질문의 결이 달라져요</span>
            </div>
            <div className="sec-two">
              {SETUP_CAREERS.map((c) => (
                <div
                  key={c.key}
                  className={"career2" + (career === c.key ? " active" : "")}
                  style={{ "--cc": `var(--${c.tone})`, "--cc-ink": `var(--${c.tone}-ink)`, "--cc-deep": `var(--${c.tone}-deep)` }}
                  onClick={() => setCareer(c.key)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={career === c.key}
                  onKeyDown={keyActivate(() => setCareer(c.key))}
                >
                  <span className="setup-chk"><IconCheck /></span>
                  <div className="career2-il">{c.key === "신입" ? <SproutIllust /> : <CareerIllust />}</div>
                  <div className="career2-body">
                    <div className="career2-t">{c.key}</div>
                    <div className="career2-d">{c.desc}</div>
                    <span className="career2-badge">{c.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 난이도 */}
          <section className="dcard setup-sec rise" style={{ "--ri": 4 }}>
            <div className="sec-head">
              <span className="sec-chip peach"><IconGauge bars={3} size={16} /></span>
              <div className="sec-tt">난이도</div>
              <span className="sec-hint">난이도에 따라 꼬리질문 강도가 달라져요</span>
            </div>
            <div className="sec-three">
              {SETUP_LEVELS.map((lv) => (
                <div
                  key={lv.key}
                  className={"lvl2" + (level === lv.key ? " active" : "")}
                  style={{ "--cc": `var(--${lv.tone})`, "--cc-ink": `var(--${lv.tone}-ink)` }}
                  onClick={() => setLevel(lv.key)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={level === lv.key}
                  onKeyDown={keyActivate(() => setLevel(lv.key))}
                >
                  {lv.ribbon && <span className="lvl2-ribbon">{lv.ribbon}</span>}
                  <span className="setup-chk"><IconCheck /></span>
                  <span className="lvl2-chip"><IconGauge bars={lv.bars} /></span>
                  <div className="lvl2-t">{lv.name}</div>
                  <div className="lvl2-d">{lv.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 자기소개서 (선택) */}
          <section className="dcard setup-sec rise" style={{ "--ri": 5 }}>
            <div className="sec-head">
              <span className="sec-chip sky"><IconDoc size={16} /></span>
              <div className="sec-tt">자기소개서</div>
              <span className="sec-optional">선택</span>
              <span className="sec-hint">붙여넣으면 내용 기반 질문이 추가돼요</span>
            </div>
            {workerStatus && (
              <span className={"worker-chip " + (workerStatus.online ? "on" : "off")} data-testid="worker-chip">
                <span className="d"></span>
                {workerStatus.online ? "AI 맞춤 질문 가능" : "지금은 기본 질문으로 진행돼요(분석 서버 대기 중)"}
              </span>
            )}
            <div className="setup-seg">
              <button type="button" className={"segb" + (resumeTab === "file" ? " active" : "")} onClick={() => setResumeTab("file")}>
                <IconClip />파일 업로드
              </button>
              <button type="button" className={"segb" + (resumeTab === "text" ? " active" : "")} onClick={() => setResumeTab("text")}>
                <IconEdit />직접 붙여넣기
              </button>
            </div>

            {resumeTab === "file" ? (
              <div className="setup-upload">
                <DocPencilIllust />
                <input
                  ref={resumeFileRef}
                  type="file"
                  accept=".txt,.docx,.pdf"
                  style={{ display: "none" }}
                  onChange={handleResumeFile}
                />
                <button
                  type="button"
                  className="upload-btn"
                  disabled={resumeUploading}
                  onClick={() => resumeFileRef.current && resumeFileRef.current.click()}
                >
                  {resumeUploading ? <BtnSpinner /> : <IconClip />}{resumeUploading ? "불러오는 중..." : "파일 업로드"}
                </button>
                <div className="upload-desc">.txt / .docx / .pdf 파일을 올리면 내용을 자동으로 불러와요 (5MB 이하)</div>
                {resumeFileMsg && (
                  <div className={"upload-msg" + (resumeFileErr ? " err" : "")}>{resumeFileMsg}</div>
                )}
              </div>
            ) : (
              <div className="setup-text">
                <textarea
                  placeholder="여기에 자기소개서 내용을 붙여넣으세요..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                <div className="setup-text-foot">
                  <span className="hint-l">자기소개서를 붙여넣으면 내용 기반 맞춤 질문을 만들어드려요</span>
                  <span className={"count" + (resumeText ? " on" : "")}>{resumeText.length.toLocaleString()}자</span>
                </div>
              </div>
            )}
          </section>
          </div>

          {/* 우측 스티키 레일: 내 면접 요약 */}
          <aside className="setup-rail rise" style={{ "--ri": 1 }}>
            <div className="dcard rail-card">
              <div className="rail-t">내 면접 요약</div>
              <div className="rail-rows">
                {deptPick && (
                  <div className="rail-row">
                    <span className="rk">학과</span>
                    <span className="rv">{deptPick.dept.name}</span>
                  </div>
                )}
                <div className="rail-row">
                  <span className="rk">직무</span>
                  {job ? (
                    <span className="rv">
                      <span className="rv-ic" style={{ background: `var(--${selMeta.tone})`, color: `var(--${selMeta.tone}-ink)` }}>{selMeta.icon}</span>
                      {job}
                    </span>
                  ) : (
                    <span className="rv unset">선택 전</span>
                  )}
                </div>
                <div className="rail-row">
                  <span className="rk">세부 직무</span>
                  {sub ? <span className="rv">{sub}</span> : <span className="rv unset">선택 전</span>}
                </div>
                <div className="rail-row">
                  <span className="rk">지원 회사</span>
                  {company.trim() ? (
                    <span className="rv"><RecordLogo company={company.trim()} job={job} />{company.trim()}</span>
                  ) : (
                    <span className="rv unset">선택 전</span>
                  )}
                </div>
                <div className="rail-row">
                  <span className="rk">경력</span>
                  {career ? <span className="rv">{career}</span> : <span className="rv unset">선택 전</span>}
                </div>
                <div className="rail-row">
                  <span className="rk">난이도</span>
                  {level ? <span className="rv">{LEVEL_LABEL[level] || level}</span> : <span className="rv unset">선택 전</span>}
                </div>
              </div>
              <div className="rail-facts">
                <span><IconChatDots size={15} />질문 {EXPECT_Q}개 내외</span>
                <span><IconClock size={15} />예상 {estDuration(EXPECT_Q)}</span>
                <span><IconVideo size={15} />카메라·마이크 필요</span>
              </div>
              <button
                className="rail-start"
                onClick={startInterview}
                disabled={!job || !sub}
                title={!job || !sub ? "직무를 먼저 골라주세요" : undefined}
                data-testid="rail-start"
              >
                면접 시작하기 <IconArrowR size={15} />
              </button>
              {(!job || !sub) && <div className="rail-hint">직무를 먼저 골라주세요</div>}
              <div className="rail-tip">
                <div className="tt"><BulbIllust size={15} />오늘의 면접 Tip</div>
                <div className="td">{tip}</div>
              </div>
            </div>
          </aside>
        </div>

          {/* 하단 sticky 요약 바 (1100px 이하에서만 표시) */}
          <div className="setup-bar">
            <span className="sb-ic" style={{ "--jc": `var(--${selMeta.tone})`, "--jc-ink": `var(--${selMeta.tone}-ink)` }}>
              {selMeta.icon}
            </span>
            <div className="sb-sum">
              {company.trim() ? company.trim() + " · " : ""}{job || "직무 선택 전"}{sub ? " · " + sub : ""} · {career} · {LEVEL_LABEL[level] || level}
            </div>
            <button className="sb-start" onClick={startInterview} disabled={!job || !sub} title={!job || !sub ? "직무를 먼저 골라주세요" : undefined}>
              면접 시작하기 <IconArrowR size={14} />
            </button>
          </div>
      </div>
    );
  }

  /* ===== 홈 대시보드 ===== */
  const count = growthData && typeof growthData.count === "number" ? growthData.count : null;

  // 이번 주(월요일 시작) 세션만 프론트에서 필터 → 진짜 주간 데이터로 도넛 계산
  const weekStart = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // 월요일로 이동
    return d;
  })();
  const weeklyCount = Array.isArray(historyData)
    ? historyData.filter((s) => {
        const t = new Date(s && s.created_at);
        return !isNaN(t.getTime()) && t >= weekStart;
      }).length
    : 0;
  const totalCount = count != null ? count : (Array.isArray(historyData) ? historyData.length : null);
  const lastScore =
    Array.isArray(historyData) && historyData.length > 0 && typeof historyData[0].total_score === "number"
      ? historyData[0].total_score
      : null;

  // 주간 학습 도넛: 이번 주 세션 수 기반, 목표 12회 대비 완료율 (상한 100%)
  const WEEK_GOAL = 12;
  const doneCount = Math.min(weeklyCount, WEEK_GOAL);
  const donutPct = Math.min(Math.round((weeklyCount / WEEK_GOAL) * 100), 100);
  const recentList = Array.isArray(historyData) ? historyData.slice(0, 5) : [];

  // 최근 5회 종합 점수 추이 (오래된 → 최신, /history는 최신순이라 뒤집는다). 2회 미만이면 표시 생략
  const sparkScores = Array.isArray(historyData)
    ? historyData
        .filter((s) => s && typeof s.total_score === "number")
        .slice(0, 5)
        .map((s) => s.total_score)
        .reverse()
    : [];
  const sparkPts = (() => {
    if (sparkScores.length < 2) return null;
    const W = 300, H = 56, PX = 12, PY = 12;
    const min = Math.min(...sparkScores);
    const max = Math.max(...sparkScores);
    const span = max - min || 1;
    return sparkScores.map((v, i) => [
      PX + (i * (W - PX * 2)) / (sparkScores.length - 1),
      H - PY - ((v - min) / span) * (H - PY * 2),
    ]);
  })();

  // 직무별 연습 분포: history의 직무별 세션 수 상위 4개 (실데이터)
  const jobDist = (() => {
    if (!Array.isArray(historyData)) return [];
    const m = new Map();
    for (const s of historyData) {
      const j = s && s.job ? String(s.job).trim() : "";
      if (!j) continue;
      m.set(j, (m.get(j) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  })();
  const jobDistMax = jobDist.length > 0 ? jobDist[0][1] : 0;

  const FEATURES = [
    { key: "mock", cls: "lav", icon: <IconVideo size={19} />, title: "모의면접", desc: "실전처럼 연습하기", go: goMock },
    { key: "records", cls: "mint", icon: <IconClock size={19} />, title: "면접 기록", desc: "지난 면접 다시 보기", go: goRecords },
    { key: "feedback", cls: "peach", icon: <IconChart size={19} />, title: "피드백 분석", desc: "AI 피드백 확인하기", go: goFeedback },
    { key: "resume", cls: "sky", icon: <IconDoc size={19} />, title: "자기소개서", desc: "자소서 맞춤 질문 받기", go: goResume },
  ];

  // 최근 피드백이 비었거나 "[object Object]"가 섞인 깨진 문자열이면 기본 코칭 문구로 대체
  const hasHistory = Array.isArray(historyData) && historyData.length > 0;
  const coachRaw = coachLine && !coachLine.includes("[object Object]") ? coachLine.trim() : "";
  const coachText = coachRaw
    ? (coachRaw.length > 110 ? coachRaw.slice(0, 110) + "…" : coachRaw)
    : hasHistory
      ? COACH_DEFAULT_LINE
      : "첫 면접을 시작하면 맞춤 코칭이 여기에 표시돼요. " + COACH_DEFAULT_LINE;
  const coachTips = coachPoints.length > 0 ? coachPoints.slice(0, 2) : COACH_STATIC_TIPS;
  const coachTipsLabel = coachPoints.length > 0 ? "최근 개선 포인트" : "이번 주 연습 포인트";

  return renderShell(
    <>
      {/* 1. 히어로 배너 */}
      <section className="hero-banner rise" style={{ "--ri": 0 }}>
        <div className="hb-text">
          <h2>실전 같은 모의면접으로<br />합격을 준비하세요!</h2>
          <p>AI 면접관과 함께 실전처럼 연습하고,<br />상세한 피드백으로 실력을 향상시켜보세요.</p>
          <button className="hb-cta" onClick={goMock}>모의면접 시작하기 <IconArrowR size={14} /></button>
        </div>
        <HeroIllust />
      </section>

      {/* 2. 기능 카드 4개 */}
      <section className="feature-row rise" style={{ "--ri": 1 }}>
        {FEATURES.map((f) => (
          <button key={f.key} className={"feature-card " + f.cls} onClick={f.go}>
            <span className="fi">{f.icon}</span>
            <span className="ft">{f.title}</span>
            <span className="fd">{f.desc}</span>
          </button>
        ))}
      </section>

      {/* 3. 이번 주 학습 현황 + AI 면접 코치 */}
      <section className="dash-cols rise" style={{ "--ri": 2 }}>
        <div className="dcard">
          <div className="dcard-head">
            <div className="dcard-t">이번 주 학습 현황</div>
            <button className="dlink" onClick={goRecords}>상세 보기 <IconChevron size={12} /></button>
          </div>
          {!dashLoaded && historyData == null ? (
            <SkelStatus />
          ) : (
          <div className="status-body">
            <div className="donut-wrap">
              <div className="donut">
                <ArcProgress value={donutPct} r={52} strokeWidth={14} size={132} rotated />
                <div className="num"><b><CountUp value={donutPct} suffix="%" /></b></div>
              </div>
              <div className="donut-cap">이번 주 목표 {WEEK_GOAL}회 중 {doneCount}회 완료</div>
            </div>
            <div className="mini-stats">
              <div className="ms">
                <span className="chip lav"><IconVideo size={14} /></span>
                <span className="mtxt">
                  <span className="mk">이번 주 면접</span>
                  <span className="mv">{weeklyCount}회</span>
                </span>
              </div>
              <div className="ms">
                <span className="chip mint"><IconClock size={14} /></span>
                <span className="mtxt">
                  <span className="mk">전체 누적</span>
                  <span className="mv">{totalCount != null ? `${totalCount}회` : "0회"}</span>
                </span>
              </div>
              <div className="ms">
                <span className="chip peach"><IconChart size={14} /></span>
                <span className="mtxt">
                  <span className="mk">최근 종합 점수</span>
                  <span className="mv">{lastScore != null ? `${lastScore}점` : "-"}</span>
                </span>
              </div>
            </div>
          </div>
          )}
          {sparkPts && (
            <div className="spark-row">
              <div className="spark-head">
                <span className="spark-cap">최근 {sparkScores.length}회 추이</span>
                <span className="spark-last">최근 {sparkScores[sparkScores.length - 1]}점</span>
              </div>
              <svg className="sparkline" viewBox="0 0 300 56" aria-hidden="true">
                <polyline
                  points={sparkPts.map((p) => p.join(",")).join(" ")}
                  fill="none" stroke="var(--primary)" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round"
                />
                {sparkPts.map(([x, y], i) => (
                  <circle
                    key={i} cx={x} cy={y}
                    r={i === sparkPts.length - 1 ? 4.4 : 2.6}
                    fill={i === sparkPts.length - 1 ? "var(--primary)" : "#FFFFFF"}
                    stroke="var(--primary)" strokeWidth="1.8"
                  />
                ))}
              </svg>
            </div>
          )}
        </div>

        <div className="dcard coach-card">
          <div className="dcard-head">
            <div className="dcard-t">AI 면접 코치</div>
          </div>
          <div className="coach-quote">&ldquo;{coachText}&rdquo;</div>
          <div className="coach-points">
            <div className="cp-t">{coachTipsLabel}</div>
            <ul>
              {coachTips.map((t, i) => (
                <li key={i}><span className="cp-dot"><IconCheck size={9} /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="coach-foot">
            <div className="dots"><span className="on" /><span /><span /></div>
            <RobotIllust />
          </div>
        </div>
      </section>

      {/* 4. 최근 모의면접 기록 + 향상 가이드 */}
      <section className="dash-cols bottom rise" style={{ "--ri": 3 }}>
        <div className="dcard recent-card">
          <div className="dcard-head">
            <div className="dcard-t">최근 모의면접 기록</div>
            <button className="dlink" onClick={goRecords}>전체 보기 <IconChevron size={12} /></button>
          </div>
          {!dashLoaded && historyData == null ? (
            <SkelRecentRows n={3} />
          ) : recentList.length === 0 ? (
            <div className="recent-empty2">
              <div className="re-t">아직 면접 기록이 없어요. 3단계면 시작할 수 있어요!</div>
              <ol className="re-steps">
                <li><span className="re-num">1</span>직무·난이도를 고르고 자기소개서를 붙여넣어요</li>
                <li><span className="re-num">2</span>웹캠 앞에서 실전처럼 답변해요</li>
                <li><span className="re-num">3</span>AI 점수와 피드백이 이곳에 쌓여요</li>
              </ol>
              <button className="re-cta" onClick={goMock}>첫 모의면접 시작하기 <IconArrowR size={13} /></button>
            </div>
          ) : (
            <div className="recent-list">
              {recentList.map((s, i) => (
                <div
                  className={"recent-row" + (s.session_id != null ? " clickable" : "")}
                  key={s.session_id ?? i}
                  onClick={() => { if (s.session_id != null) openHistoryDetail(s.session_id); }}
                  {...(s.session_id != null
                    ? { role: "button", tabIndex: 0, onKeyDown: keyActivate(() => openHistoryDetail(s.session_id)) }
                    : {})}
                >
                  <RecordLogo company={s.company} job={s.job} idx={i} />
                  <div className="rinfo">
                    <div className="rjob">{sessionTitle(s)}</div>
                    <div className="rdate">
                      {fmtDateDot(s.created_at)}
                      {typeof s.posture_score === "number" && typeof s.content_score === "number" && (
                        <span className="rmini"> · 자세 {s.posture_score} · 내용 {s.content_score}</span>
                      )}
                    </div>
                  </div>
                  <ScoreBadge score={typeof s.total_score === "number" ? s.total_score : null} />
                  {s.session_id != null && <span className="rgo"><IconChevron /></span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dcard guide-card">
          <div className="dcard-t">면접 실력 향상 가이드</div>
          <p className="gd">면접 고수가 되는 길, 단계별로 따라해보세요!</p>
          <ol className="guide-steps">
            {GUIDE_STEPS.map((g, i) => (
              <li key={i}>
                <span className="gs-num">{i + 1}</span>
                <div className="gs-body"><b>{g.t}</b><span>{g.d}</span></div>
              </li>
            ))}
          </ol>
          <button className="guide-btn" onClick={() => setShowGuide(true)}>가이드 보기 <IconArrowR size={13} /></button>
          <StairsIllust />
        </div>
      </section>

      {/* 4.5 직무별 연습 분포 + 면접 전 체크리스트 */}
      <section className="dash-cols bottom rise" style={{ "--ri": 4 }}>
        <div className="dcard dist-card">
          <div className="dcard-head">
            <div className="dcard-t">직무별 연습 분포</div>
            {totalCount != null && totalCount > 0 && <span className="dist-total">총 {totalCount}회</span>}
          </div>
          {jobDist.length === 0 ? (
            <div className="dist-empty">
              아직 데이터가 없어요. 모의면접을 시작하면 직무별 연습 횟수가 여기에 쌓여요.
            </div>
          ) : (
            <div className="dist-list">
              {jobDist.map(([name, cnt]) => {
                const m = jobMeta(name);
                return (
                  <div className="dist-row" key={name}>
                    <span className="dist-ic" style={{ background: `var(--${m.tone})`, color: `var(--${m.tone}-ink)` }}>{m.icon}</span>
                    <div className="dist-body">
                      <div className="dist-top">
                        <span className="dist-nm">{name}</span>
                        <span className="dist-cnt">{cnt}회</span>
                      </div>
                      <div className="dist-bar">
                        <AnimatedBar className="dist-fill" pct={(cnt / jobDistMax) * 100} style={{ background: `var(--${m.tone}-ink)` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="dcard check-card">
          <div className="dcard-head">
            <div className="dcard-t">면접 전 체크리스트</div>
            <span className="check-cnt">{checks.length}/{CHECKLIST_ITEMS.length}</span>
          </div>
          <ul className="check-list">
            {CHECKLIST_ITEMS.map((label, i) => {
              const on = checks.includes(i);
              return (
                <li key={i}>
                  <button type="button" className={"check-item" + (on ? " on" : "")} onClick={() => toggleCheck(i)} aria-pressed={on}>
                    <span className="cbox"><IconCheck size={10} /></span>
                    <span className="clabel">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. 최하단 목표 배너 */}
      <section className="goal-banner rise" style={{ "--ri": 5 }}>
        <TargetIllust />
        <div className="gb-text">
          <b>꾸준한 연습이 합격의 지름길입니다!</b>
          <p>매일 조금씩 연습하고, 피드백을 통해 성장해보세요.</p>
        </div>
        <button className="gb-btn" onClick={goMock}>모의면접 시작하기</button>
      </section>

      {/* 면접 이용 가이드 모달 */}
      {showGuide && (
        <div className="modal-overlay" onClick={() => setShowGuide(false)}>
          <div className="dcard guide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dcard-head">
              <div className="dcard-t">면접 이용 가이드</div>
              <button className="gm-close" onClick={() => setShowGuide(false)}>닫기</button>
            </div>
            <ol className="gm-steps">
              <li>
                <span className="gm-num">1</span>
                <div><b>면접 설정</b><p>직무·경력·난이도를 고르고, 자기소개서를 붙여넣으면 맞춤 질문이 만들어져요.</p></div>
              </li>
              <li>
                <span className="gm-num">2</span>
                <div><b>준비 후 시작</b><p>준비 화면에서 카메라를 확인하고 [면접 시작]을 누르면 카운트다운 후 녹화가 시작돼요.</p></div>
              </li>
              <li>
                <span className="gm-num">3</span>
                <div><b>질문별 답변</b><p>질문마다 답변을 녹화하고 '답변 완료'를 누르면 AI가 자세·표정과 답변 내용을 분석해요.</p></div>
              </li>
              <li>
                <span className="gm-num">4</span>
                <div><b>결과·기록 확인</b><p>점수와 피드백, 모범 답변을 확인하고 '나의 기록'에서 지난 면접을 다시 볼 수 있어요.</p></div>
              </li>
            </ol>
            <div className="gm-tips">
              <div className="gm-tip"><IconTip size={14} />결론부터 말하고 구체적인 경험과 숫자를 덧붙이면 좋은 평가를 받아요.</div>
              <div className="gm-tip"><IconTip size={14} />카메라 렌즈를 면접관의 눈이라 생각하고 바라보면 시선 처리가 안정돼요.</div>
            </div>
          </div>
        </div>
      )}
    </>,
    true
  );
}
