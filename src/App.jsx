import { useState, useRef, useEffect } from "react";
import Auth from "./Auth";
import Growth from "./Growth";
import { COMPANIES, searchCompanies } from "./companies";
import { DEPARTMENTS, COLLEGES, searchDepartments } from "./departments";

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

/* companies.js 데이터셋 기반 워드마크 조회 (이름·별칭 정확 일치, 공백 무시·대소문자 무시) */
const BRAND_LOOKUP = (() => {
  const norm = (s) => String(s).toLowerCase().replace(/\s+/g, "");
  const map = new Map();
  for (const c of COMPANIES) for (const a of c.aliases) map.set(norm(a), c); // 별칭 (예: "토스" → 비바리퍼블리카)
  for (const c of COMPANIES) map.set(norm(c.name), c); // 정식 이름이 별칭보다 우선
  return map;
})();

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

/* 기록 리스트/상세용 로고 칩: 브랜드 워드마크 → 회사 이니셜 → 직무 이니셜 순 폴백 */
function RecordLogo({ company, job, idx = 0 }) {
  const name = company != null ? String(company).trim() : "";
  const brand = name ? BRAND_LOOKUP.get(name.toLowerCase().replace(/\s+/g, "")) : null;
  if (brand) {
    return (
      <span
        className="rlogo brand"
        style={{ background: brand.bg || "#FFFFFF", color: brand.color }}
        title={name}
      >
        {brand.mark}
      </span>
    );
  }
  const base = name || job || "면";
  return <span className={"rlogo c" + (idx % 4)}>{base.charAt(0)}</span>;
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

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* ===== 인라인 SVG 아이콘 (stroke 기반, 라이브러리 미사용) ===== */
function IconCheck({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
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
function IconChevron({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
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
function IconArrowR({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
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

/* 점수 뱃지: 80↑ 우수(민트) / 60↑ 보통(블루) / 미만 개선 필요(피치) */
function ScoreBadge({ score }) {
  if (typeof score !== "number") return null;
  const grade = score >= 80
    ? { cls: "good", label: "우수" }
    : score >= 60
      ? { cls: "mid", label: "보통" }
      : { cls: "low", label: "개선 필요" };
  return (
    <span className={"score-badge " + grade.cls}>{grade.label}</span>
  );
}

/* ===== 모션 환경 감지 (prefers-reduced-motion이면 JS 애니메이션도 건너뜀) ===== */
function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* 숫자 카운트업: 결과 게이지·대시보드 도넛 중앙 숫자 (0 → 목표치, ease-out) */
function CountUp({ value, duration = 800, suffix = "" }) {
  const [disp, setDisp] = useState(() => (prefersReducedMotion() ? value : 0));
  useEffect(() => {
    if (typeof value !== "number") return;
    if (prefersReducedMotion()) { setDisp(value); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisp(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  if (typeof value !== "number") return "-";
  return <>{disp}{suffix}</>;
}

/* 원형 게이지 진행 호: 마운트 후 0 → 목표치로 차오름 (stroke-dashoffset transition) */
function ArcProgress({ value, max = 100, r, strokeWidth, size, rotated = false, track = "var(--lav)", color = "var(--primary)" }) {
  const [on, setOn] = useState(prefersReducedMotion);
  useEffect(() => {
    if (on) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(raf);
  }, [on]);
  const CIRC = 2 * Math.PI * r;
  const frac = typeof value === "number" ? Math.max(0, Math.min(1, value / max)) : 0;
  const offset = on ? CIRC * (1 - frac) : CIRC;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={c} cy={c} r={r} fill="none" stroke={track} strokeWidth={strokeWidth} />
      {typeof value === "number" && value > 0 && (
        <circle
          cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={offset}
          className="arc-anim"
          {...(rotated ? { transform: `rotate(-90 ${c} ${c})` } : {})}
        />
      )}
    </svg>
  );
}

/* 가로 미니 바: 마운트 후 0 → 목표 width (기존 width transition 활용) */
function AnimatedBar({ pct, className, style }) {
  const [on, setOn] = useState(prefersReducedMotion);
  useEffect(() => {
    if (on) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(raf);
  }, [on]);
  const w = Math.max(0, Math.min(100, pct || 0));
  return <div className={className} style={{ ...style, width: (on ? w : 0) + "%" }} />;
}

/* 키보드 접근성: 클릭형 div를 Enter/Space로도 조작 */
const keyActivate = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
};

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

function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* 최근 기록 리스트용 YYYY.MM.DD */
function fmtDateDot(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
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
  const [showGuide, setShowGuide] = useState(false); // 정적 가이드 모달

  // 토스트 알림 스택 (alert 대체) + 대시보드 첫 로드 완료 플래그 (스켈레톤 표시 판단 전용)
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);
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
    setToken(tk);
    setUserEmail(em);
    setScreen("home");
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
    setScreen("home");
  }

  useEffect(() => {
    fetch(`${API}/api/jobs`)
      .then((r) => r.json())
      .then((data) => {
        setJobData(data);
        const first = Object.keys(data)[0];
        setJob(first);
        setSub(data[first].subs[0]);
      })
      .catch(() => showToast("error", "일시적으로 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요."));
  }, []);

  // 홈 대시보드용 데이터 로드 (기록/성장)
  useEffect(() => {
    if (!token || screen !== "home") return;
    let cancelled = false;
    const headers = { "Authorization": "Bearer " + token };

    fetch(`${API}/growth`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!cancelled) setGrowthData(d); })
      .catch(() => {});

    fetch(`${API}/history`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then(async (list) => {
        if (cancelled) return;
        setHistoryData(Array.isArray(list) ? list : null);
        // 최근 면접의 피드백 한 줄 (상세 API에서 feedback 필드 사용)
        if (Array.isArray(list) && list.length > 0 && list[0].session_id != null) {
          try {
            const res = await fetch(`${API}/history/${list[0].session_id}`, { headers });
            if (res.ok) {
              const det = await res.json();
              const fb = det && Array.isArray(det.results)
                ? det.results.map((x) => x && x.feedback).find((f) => f && String(f).trim())
                : null;
              if (!cancelled && fb) setCoachLine(String(fb).trim());
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

  function selectJob(name) {
    setJob(name);
    setSub(jobData[name].subs[0]);
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
      const res = await fetch(`${API}/api/parse-resume`, {
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
      const res = await fetch(`${API}/history/${sessionId}`, {
        headers: { "Authorization": "Bearer " + token },
      });
      const data = await res.json();
      if (res.ok) {
        setDetailData(data);
      } else {
        setDetailErr(data.detail || "면접 기록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      setDetailErr("일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  async function startInterview() {
    setScreen("loading");
    try {
      const res = await fetch(`${API}/api/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, sub, level, career, resume_text: resumeText }),
      });
      const data = await res.json();
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

  // 결과 화면을 떠날 때 답변 영상 objectURL 정리
  useEffect(() => {
    if (screen !== "result") return;
    const urls = results.map((r) => r && r.videoUrl).filter(Boolean);
    return () => {
      urls.forEach((u) => { try { URL.revokeObjectURL(u); } catch (e) {} });
    };
  }, [screen]);

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
        startRecording();
        startTimer();
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
          const res = await fetch(`${API}/api/analysis-result/${jobId}`, {
            headers: { "Authorization": "Bearer " + token },
          });
          data = await res.json();
        } catch (e) {
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
    const res = await fetch(`${API}/api/analyze-answer`, { method: "POST", body: form });
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
      const res = await fetch(`${API}/interview/finish`, {
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
        startRecording();
        startTimer();
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
  const emailName = userEmail ? userEmail.split("@")[0] : "회원";
  const initial = emailName ? emailName.charAt(0).toUpperCase() : "C";

  // 사이드바 이동 핸들러 (기능 카드에서도 재사용)
  const goHomeNav = () => { setNavHint(""); setScreen("home"); };
  const goMock = () => { setNavHint("mock"); setScreen("start"); };
  const goResume = () => { setNavHint("resume"); setResumeTab("text"); setScreen("start"); };
  const goRecords = () => { setNavHint(""); setScreen("growth"); };
  const goFeedback = () => {
    setNavHint("feedback");
    const latest =
      Array.isArray(historyData) && historyData.length > 0 && historyData[0].session_id != null
        ? historyData[0].session_id
        : null;
    if (latest != null) openHistoryDetail(latest);
    else setScreen("growth");
  };
  const goSettings = () => { setNavHint(""); setScreen("settings"); };

  const navActive =
    screen === "settings" ? "settings"
      : screen === "growth" ? (navHint === "feedback" ? "feedback" : "records")
        : screen === "historyDetail" ? (navHint === "feedback" ? "feedback" : "home")
          : screen === "home" ? "home"
            : navHint === "resume" ? "resume"
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
      <Growth token={token} onBack={() => setScreen("home")} />
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
          <button className="btn-secondary" onClick={() => setScreen("home")}>돌아가기</button>
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
                <div className="card-t"><IconDoc size={15} />이번 면접 구성</div>
                <div className="ready-facts">
                  <div className="rf"><span className="k">질문 수</span><span className="v">{total}개</span></div>
                  <div className="rf"><span className="k">예상 소요 시간</span><span className="v">약 {total * 2}~{total * 3}분</span></div>
                  <div className="rf"><span className="k">직무</span><span className="v">{jobRole}</span></div>
                  <div className="rf"><span className="k">난이도</span><span className="v">{LEVEL_LABEL[level] || level} · {career}</span></div>
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
          <div className="q-fixed">
            <span className="qb">Q{qIndex + 1}. {jobRole} · 난이도 {LEVEL_LABEL[level] || level} · {career}</span>
            <div className="qt">{questions[qIndex]}</div>
          </div>

          <div className="cam-area">
            {camError ? (
              <div className="cam-error">{camError}</div>
            ) : (
              <>
                <video ref={videoRef} autoPlay muted playsInline></video>
                <div className="cam-rec"><span className="d"></span>REC</div>
                <div className="cam-msg">답변이 끝나면 아래 '답변 완료'를 눌러주세요</div>
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
              <div className="rec-state"><span className="d"></span>답변을 녹화하고 있어요</div>
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
              <button className="btn-redo" onClick={handleRedo} disabled={busy}>다시 답변</button>
              <button className="btn-done" onClick={handleDone} disabled={busy}>
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
                <span className={"shc" + (job ? "" : " empty")}>{job || "직무"}</span>
                <span className={"shc" + (sub ? "" : " empty")}>{sub || "세부 직무"}</span>
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
                <div
                  key={job}
                  className="setup-subjob"
                  style={{ "--jc": `var(--${selMeta.tone})`, "--jc-ink": `var(--${selMeta.tone}-ink)` }}
                >
                  <div className="ss-label">세부 직무를 선택하면 더 정확한 질문이 나와요</div>
                  <div className="ss-tags">
                    {jobData[job].subs.map((s, i) => (
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
                <span><IconChatDots size={15} />질문 6개 내외</span>
                <span><IconClock size={15} />예상 10~15분</span>
                <span><IconVideo size={15} />카메라·마이크 필요</span>
              </div>
              <button className="rail-start" onClick={startInterview}>면접 시작하기 <IconArrowR size={15} /></button>
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
              {company.trim() ? company.trim() + " · " : ""}{job || "직무 선택"}{sub ? " · " + sub : ""} · {career} · {LEVEL_LABEL[level] || level}
            </div>
            <button className="sb-start" onClick={startInterview}>면접 시작하기 <IconArrowR size={14} /></button>
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
                    <div className="rjob">{s.company && String(s.company).trim() ? String(s.company).trim() + " " : ""}{s.job || "모의"} 면접</div>
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
