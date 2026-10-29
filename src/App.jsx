import * as Lucide from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AppShell from "./components/AppShell";
import HomeHeader from "./components/home/HomeHeader";
import JobSelector from "./components/home/JobSelector";
import InterviewHero from "./components/home/InterviewHero";
import PreparationProgress from "./components/home/PreparationProgress";
import RecentInterviewCard from "./components/home/RecentInterviewCard";
import TodayPreparation from "./components/home/TodayPreparation";
import HomeNotice from "./components/home/HomeNotice";
import Auth from "./Auth";
import Growth from "./Growth";
import { searchCompanies } from "./companies";
import DreamCompanies, { loadDreams } from "./DreamCompanies";
import JobPostings from "./JobPostings";
import JobsBrowse from "./JobsBrowse";
import { DEPARTMENTS, COLLEGES, searchDepartments } from "./departments";
import { Button, PageHeader, SectionHeader, EmptyState, Segmented, Stat, Meter, Field, ComboList } from "./ds";
import {
  prefersReducedMotion, CountUp,
  scoreGrade, fmtDate, fmtDateDot, LineChart, sessionTitle,
  IconCheck, IconChevron,
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
/* 학과 검색칸을 비운 채 열면 단과대학 순서대로 전체 학과를 보여준다 (표시 순서만) */
const DEPT_BROWSE = COLLEGE_ORDER.flatMap((c) => DEPARTMENTS.filter((d) => d.college === c));

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

/* 질문 준비 화면: 기다리는 동안 4초마다 면접 팁을 돌려 보여준다 */
function RotatingTip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setI((n) => (n + 1) % TIPS.length), 4000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="load-tip" aria-live="off">
      <span className="lt-k">면접 팁</span>
      <span key={i} className="lt-v">{TIPS[i]}</span>
    </div>
  );
}

/* AI 코치 카드: 최근 세션에 개선점 데이터가 없을 때 보여줄 정직한 정적 팁 */
const COACH_STATIC_TIPS = [
  "답변 첫 문장에 결론부터 말해보세요.",
  "시선은 카메라 렌즈에 두면 안정적으로 보여요.",
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

/* 저장된 자기소개서 (localStorage, { text, updatedAt }) + 작성 중 초안 — 계정(이메일)별 키로 분리 */
const RESUME_KEY = "cc_resume";
const RESUME_DRAFT_KEY = "cc_resume_draft";
function userKey(base, email) {
  return `${base}:${String(email || "").trim().toLowerCase()}`;
}
/* 계정 구분 전 버전의 공용 저장본(cc_resume)은 그때 로그인해 있던 계정으로 한 번만 옮기고 지운다
   (공용 PC에서 다음 사용자에게 이전 사용자의 자소서가 보이지 않게) */
function migrateLegacyResume(email) {
  try {
    const legacy = localStorage.getItem(RESUME_KEY);
    if (legacy == null) return;
    if (!email) return; // 주인을 알 수 없으면 지우지도, 불러오지도 않고 그대로 둔다
    if (localStorage.getItem(userKey(RESUME_KEY, email)) == null) {
      localStorage.setItem(userKey(RESUME_KEY, email), legacy);
    }
    localStorage.removeItem(RESUME_KEY);
  } catch (e) {}
}
function loadResumeDraft(email) {
  if (!email) return "";
  try { return localStorage.getItem(userKey(RESUME_DRAFT_KEY, email)) || ""; } catch (e) { return ""; }
}
function saveResumeDraft(email, text) {
  if (!email) return;
  try {
    if (text && text.trim()) localStorage.setItem(userKey(RESUME_DRAFT_KEY, email), text);
    else localStorage.removeItem(userKey(RESUME_DRAFT_KEY, email));
  } catch (e) {}
}
function loadSavedResume(email) {
  if (!email) return null;
  try {
    const raw = localStorage.getItem(userKey(RESUME_KEY, email));
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
  { key: "논리성", match: /논리/, color: "var(--lilac-ink)", track: "var(--lilac-soft)" },
  { key: "구체성", match: /구체/, color: "var(--peach-ink)", track: "var(--peach)" },
  { key: "직무적합도", match: /직무|적합/, color: "var(--mint-ink)", track: "var(--mint)" },
];

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function IconHome({ size = 17 }) {
  return <Lucide.House size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconLogout({ size = 17 }) {
  return <Lucide.LogOut size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconTip({ size = 15 }) {
  return <Lucide.Lightbulb size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconMic({ size = 15 }) {
  return <Lucide.Mic size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconClip({ size = 14 }) {
  return <Lucide.Paperclip size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconEdit({ size = 14 }) {
  return <Lucide.Pencil size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconSpark({ size = 15 }) {
  return <Lucide.ChartNoAxesCombined size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconVideo({ size = 17 }) {
  return <Lucide.Video size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconChatDots({ size = 17 }) {
  return <Lucide.MessageSquareText size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconDoc({ size = 17 }) {
  return <Lucide.FileText size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconClock({ size = 17 }) {
  return <Lucide.History size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconGear({ size = 17 }) {
  return <Lucide.Settings size={size} strokeWidth={1.8} aria-hidden="true" />;
}
/* ===== 직무 아이콘 15종 + 폴백 (24×24, stroke 1.9, round) ===== */
function IconJobDev({ size = 18 }) {
  return <Lucide.CodeXml size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobData({ size = 18 }) {
  return <Lucide.Database size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobDesign({ size = 18 }) {
  return <Lucide.Palette size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobMkt({ size = 18 }) {
  return <Lucide.Megaphone size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobSales({ size = 18 }) {
  return <Lucide.Handshake size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobOffice({ size = 18 }) {
  return <Lucide.BriefcaseBusiness size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobFin({ size = 18 }) {
  return <Lucide.Landmark size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobLab({ size = 18 }) {
  return <Lucide.FlaskConical size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobGov({ size = 18 }) {
  return <Lucide.Building2 size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobEdu({ size = 18 }) {
  return <Lucide.GraduationCap size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobMed({ size = 18 }) {
  return <Lucide.Stethoscope size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobSvc({ size = 18 }) {
  return <Lucide.ShoppingBag size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobMedia({ size = 18 }) {
  return <Lucide.Clapperboard size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobCloud({ size = 18 }) {
  return <Lucide.Cloud size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobSec({ size = 18 }) {
  return <Lucide.ShieldCheck size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconJobEtc({ size = 18 }) {
  return <Lucide.BriefcaseBusiness size={size} strokeWidth={1.8} aria-hidden="true" />;
}
/* 직무명(/api/jobs 응답 키) → 아이콘/파스텔 톤/태그라인 매핑. 미등록 직무는 폴백 사용 */
const JOB_META = {
  "개발":            { tone: "lav",   tag: "웹·앱·서버 개발",  icon: <IconJobDev /> },
  "클라우드·인프라": { tone: "sky",   tag: "클라우드·DevOps·네트워크", icon: <IconJobCloud /> },
  "정보보안":        { tone: "rose",  tag: "관제·모의해킹·정보보호", icon: <IconJobSec /> },
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

/* ===== 소프트 3D 일러스트 (그라데이션 볼륨 + 하이라이트 + 바닥 그림자) ===== */

/* ===== AI 면접관 아바타 ===== */
/* 음성 안내용 스피커/다시 듣기 아이콘 (기존 stroke 아이콘 문법) */
function IconSoundOn({ size = 14 }) {
  return <Lucide.Volume2 size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconSoundOff({ size = 14 }) {
  return <Lucide.VolumeX size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconReplay({ size = 14 }) {
  return <Lucide.RotateCcw size={size} strokeWidth={1.8} aria-hidden="true" />;
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
            <stop offset="0" stopColor="#4C93F7" /><stop offset="1" stopColor="#4453D6" />
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

/* (ScoreBadge / CountUp / ArcProgress / AnimatedBar / keyActivate 는 ui.jsx 공용 모듈로 이동) */

/* ===== 토스트 알림 (alert 대체: 성공=민트 / 오류=danger / 정보=블루) ===== */
function IconToastOk({ size = 14 }) {
  return <Lucide.CircleCheck size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconToastErr({ size = 14 }) {
  return <Lucide.CircleAlert size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconToastInfo({ size = 14 }) {
  return <Lucide.Info size={size} strokeWidth={1.8} aria-hidden="true" />;
}
function IconX({ size = 13 }) {
  return <Lucide.X size={size} strokeWidth={1.8} aria-hidden="true" />;
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

function SetupSkeleton() {
  return (
    <div className="page setup" aria-label="직무 목록을 불러오는 중">
      <div className="skel-stack lg"><span className="skel" /><span className="skel" /><span className="skel" /><span className="skel" /></div>
    </div>
  );
}
function DetailSkeleton() {
  return (
    <div className="skel-stack lg" aria-label="면접 기록을 불러오는 중">
      <span className="skel" /><span className="skel" /><span className="skel" /><span className="skel" />
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

/* 분석 결과가 쓸 만한지: 자세(영상) 측정이 안 돼도 답변 내용 점수가 있으면 살린다 */
const isNum = (v) => typeof v === "number" && isFinite(v);
function hasAnalysis(r) {
  return !!r && !r.failed && !r.error && (isNum(r.posture_score) || isNum(r.content_score));
}

/* 비동기 분석 폴링 status → 사용자 문구 */
const ANALYSIS_STATUS_TEXT = {
  pending: "분석 대기 중",
  processing: "AI 분석 중",
};

/* 답변 분석 대기 오버레이: 업로드 → 대기 → AI 분석 단계를 카메라 위에 크게 보여준다 */
const ANALYSIS_STEPS = ["답변 업로드", "분석 대기", "AI 분석 중"];
function AnalysisOverlay({ note, seconds, canFinish, onFinish, workerOnline }) {
  const stage = note === ANALYSIS_STATUS_TEXT.processing ? 2 : note === ANALYSIS_STATUS_TEXT.pending ? 1 : 0;
  const slow = seconds >= 90;
  return (
    <div className="analysis-overlay" role="status" aria-live="polite">
      <div className="ao-card">
        <InterviewerAvatar state="idle" size={88} />
        <div className="ao-title">답변을 분석하고 있어요</div>
        <ol className="ao-steps">
          {ANALYSIS_STEPS.map((label, i) => (
            <li key={label} className={i < stage ? "done" : i === stage ? "cur" : ""}>
              <span className="ao-dot">{i < stage ? "✓" : i + 1}</span>{label}
            </li>
          ))}
        </ol>
        <div className="ao-time">{seconds}초 경과 · 보통 20~60초 걸려요</div>
        {workerOnline === false && !slow && (
          <div className="ao-hint">AI 분석 서버가 대기 상태라 평소보다 늦을 수 있어요.</div>
        )}
        {slow && (
          <div className="ao-hint">
            분석이 평소보다 오래 걸리고 있어요. 계속 기다리거나{canFinish ? " 지금까지의 답변만 저장하고 끝낼 수 있어요." : " 잠시만 더 기다려주세요."}
            {canFinish && <button className="btn-redo ao-finish" onClick={onFinish}>여기까지 저장하고 끝내기</button>}
          </div>
        )}
        <div className="ao-sub">화면을 닫지 마세요 · 지금 말하는 내용은 녹음되지 않아요</div>
      </div>
    </div>
  );
}

/* 카메라·마이크 오류 + 새로고침 없이 다시 연결 */
function CamErrorPanel({ message, onRetry, after }) {
  return (
    <div className="cam-error" role="alert">
      <div>
        <p>{message}</p>
        {after && <p className="cam-error-sub">{after}</p>}
        <button type="button" className="btn btn-primary cam-retry" onClick={onRetry}>카메라·마이크 다시 연결</button>
      </div>
    </div>
  );
}

/* 실제 마이크 입력 음량 막대 (App의 rAF 루프가 barRef의 transform을 직접 갱신) */
function MicMeter({ barRef }) {
  return (
    <div className="mic-meter" aria-hidden="true">
      <span ref={barRef} className="mic-meter-fill" />
    </div>
  );
}

export default function App() {
  // 새로고침해도 유지되도록 localStorage에서 초기값을 읽어온다
  const [token, setToken] = useState(() => localStorage.getItem("cc_token") || null);
  const [userEmail, setUserEmail] = useState(() => {
    const em = localStorage.getItem("cc_email") || "";
    migrateLegacyResume(em);
    return em;
  });
  // 표시 이름 (회원가입 때 입력한 실명). 예전 회원은 비어 있어 설정에서 입력하게 한다
  const [userName, setUserName] = useState(() => localStorage.getItem("cc_name") || "");
  const [nameDraft, setNameDraft] = useState(null); // 설정 화면 이름 편집값 (null = 편집 전)
  const [nameSaving, setNameSaving] = useState(false);

  const [screen, setScreen] = useState("home"); // home | start | loading | interview | result | growth | settings | historyDetail
  const [navHint, setNavHint] = useState(""); // 사이드바에서 어떤 항목으로 진입했는지 (start 계열 구분용)

  const [jobData, setJobData] = useState(null);
  const [jobsErr, setJobsErr] = useState(false); // 직무 목록 로딩 실패 (재시도 버튼 표시)
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
  const [, setDeptCollege] = useState(COLLEGE_ORDER[0]); // 단과대학 탐색: 선택된 단과대 (기본 SW융합대학)
  const [setupStep, setSetupStep] = useState(0); // 면접 설정 단계 표시 (0~4 = 01~05). 순수 UI 상태
  const [resumeTab, setResumeTab] = useState("text");
  const [resumeText, setResumeText] = useState(() => loadResumeDraft(localStorage.getItem("cc_email") || ""));
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
  const [camState, setCamState] = useState("idle"); // 카메라·마이크 연결: idle | connecting | ready | error
  const [devices, setDevices] = useState({ cams: [], mics: [] }); // 선택 가능한 입력 장치
  const [camId, setCamId] = useState("");
  const [micId, setMicId] = useState("");
  const [micSilent, setMicSilent] = useState(false); // 6초 넘게 마이크 입력이 없음
  const [recError, setRecError] = useState(""); // MediaRecorder 생성·녹화 오류
  const [replaying, setReplaying] = useState(false); // 질문 다시 듣는 중 (녹화 일시정지)
  const [failedAnswer, setFailedAnswer] = useState(null); // 분석 실패한 답변: { index, blob, jobId, reason }
  const [saveState, setSaveState] = useState("idle"); // 결과 저장: idle | saving | saved | error | skipped

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
  const [, setDreamVer] = useState(0); // 관심 회사 변경 시 홈(공고 카드) 다시 그리기용

  // 토스트 알림 스택 (alert 대체) + 대시보드 첫 로드 완료 플래그 (스켈레톤 표시 판단 전용)
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);
  const authExpiredRef = useRef(false); // 401 자동 로그아웃 토스트 1회 보장 (동시 다발 401 대비)
  const [dashLoaded, setDashLoaded] = useState(false);
  const [dashErr, setDashErr] = useState(false); // 기록 조회 실패 (빈 기록과 구분)
  const [dashReload, setDashReload] = useState(0);
  const [postErr, setPostErr] = useState(false); // 홈 추천 공고 조회 실패 (공통 오류 한 줄 판단용, 표시 상태만)
  const [postReload, setPostReload] = useState(0); // 홈 공통 "다시 시도"로 추천 공고 다시 불러오기

  function dismissToast(id) {
    // 퇴장 애니메이션(closing) 후 제거. 자동/수동 중복 호출에도 안전
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, closing: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 240);
  }
  function showToast(type, message) {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev.slice(-3), { id, type, message, closing: false }]);
    setTimeout(() => dismissToast(id), type === "error" ? 7000 : 3500); // 오류는 읽을 시간을 더 준다
  }

  // 면접 기록 상세보기
  const [detailData, setDetailData] = useState(null);
  const [detailErr, setDetailErr] = useState("");

  // 대시보드 데이터 (기존 /growth, /history API 재사용)
  const [growthData, setGrowthData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [, setCoachLine] = useState(""); // 최근 강점 인용 (현재 화면에는 표시하지 않음)
  const [coachPoints, setCoachPoints] = useState([]); // 최근 세션의 개선 포인트 (있을 때만)

  // 자기소개서 전용 화면: 저장본 + 예상 질문 미리보기
  const [rsSaved, setRsSaved] = useState(() => loadSavedResume(localStorage.getItem("cc_email") || ""));
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
  const [fbReload, setFbReload] = useState(0); // 피드백 분석 '다시 시도'
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
  const recChunksRef = useRef(new WeakMap()); // recorder별 청크 배열 (재녹화 시 이전 녹화가 섞이지 않게)
  const camGenRef = useRef(0); // 장치 연결 세대 (화면 이탈·재연결 시 늦게 끝난 연결 폐기)
  const levelRef = useRef(null); // 마이크 입력 막대 (매 프레임 DOM 직접 갱신)
  const runIdRef = useRef(0); // 면접 실행 세대: 화면을 떠난 뒤 도착한 질문·분석 응답을 버린다
  const authHandlerRef = useRef(() => {}); // 항상 최신 렌더의 만료 핸들러를 부른다 (초기 클로저 고정 방지)
  const detailReqRef = useRef(0); // 기록 상세 요청 세대
  const lastDetailIdRef = useRef(null); // 상세 '다시 시도'용
  const accountGenRef = useRef(0); // 로그인 계정 세대: 계정이 바뀐 뒤 도착한 응답을 버린다
  const replayResumeRef = useRef(null); // 질문 다시 듣기 중 녹화 재개 함수 (음소거 시 즉시 호출)
  const savingRef = useRef(false); // 결과 중복 저장 방지
  const guideBtnRef = useRef(null);
  const guideCloseRef = useRef(null);
  const firstScreenRef = useRef(true);
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
  const deptResults = !deptOpen ? [] : deptQ ? searchDepartments(deptQ) : DEPT_BROWSE;
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
    if (!deptOpen) {
      if (e.key === "ArrowDown") {
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
      } else if (deptQ && deptResults.length > 0) {
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
  function handleLogin(tk, em, nm) {
    accountGenRef.current += 1;
    localStorage.setItem("cc_token", tk);
    localStorage.setItem("cc_email", em);
    if (nm) localStorage.setItem("cc_name", nm); else localStorage.removeItem("cc_name");
    setUserName(nm || "");
    setNameDraft(null);
    authExpiredRef.current = false;
    setToken(tk);
    setUserEmail(em);
    // 계정별 자기소개서 저장본·초안을 불러온다 (이전 계정 내용은 handleLogout에서 비움)
    setRsSaved(loadSavedResume(em));
    setResumeText(loadResumeDraft(em));
    setScreen("home");
  }
  // 전역 401 처리: 토큰 삭제 → 로그인 화면 → 토스트 1회 (authFetch에서 호출)
  function handleAuthExpired(reqToken) {
    // 이미 로그아웃·다른 계정으로 바뀐 뒤 도착한 옛 요청의 401은 무시한다
    const active = localStorage.getItem("cc_token");
    if (reqToken && active && reqToken !== active) return;
    if (!active && reqToken) return;
    if (authExpiredRef.current) return;
    authExpiredRef.current = true;
    handleLogout();
    showToast("info", "로그인이 만료되어 다시 로그인해주세요");
  }
  authHandlerRef.current = handleAuthExpired;
  function handleLogout() {
    runIdRef.current += 1; // 진행 중이던 질문 생성·분석 응답 폐기
    accountGenRef.current += 1;
    saveResumeDraft(userEmail, resumeText); // 디바운스 대기 중이던 초안까지 보관
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_email");
    localStorage.removeItem("cc_name");
    setToken(null);
    setUserEmail("");
    setUserName("");
    setNameDraft(null);
    setGrowthData(null);
    setHistoryData(null);
    setCoachLine("");
    setCoachPoints([]);
    setDetailData(null);
    setDetailErr("");
    setFbData(null);
    setFbErr("");
    setRsQuestions([]);
    // 공용 PC 대비: 화면에 남은 이전 계정의 자소서·면접 상태를 모두 비운다
    setResumeText("");
    setRsSaved(null);
    setResumeFileMsg("");
    setCompany("");
    setQuestions([]);
    setResults([]);
    setFailedAnswer(null);
    setSaveMsg("");
    setSaveState("idle");
    setScreen("home");
  }

  // 작성 중인 자기소개서는 계정별로 자동 보관 (새로고침·실수로 이동해도 유지)
  useEffect(() => {
    if (!userEmail) return;
    const t = setTimeout(() => saveResumeDraft(userEmail, resumeText), 400);
    return () => clearTimeout(t);
  }, [resumeText, userEmail]);

  function loadJobs() {
    setJobsErr(false);
    fetch(`${API}/api/jobs`)
      .then((r) => { if (!r.ok) throw new Error("http"); return r.json(); })
      .then((data) => {
        if (!data || typeof data !== "object" || Object.keys(data).length === 0) throw new Error("empty");
        // 항목별 검증: subs가 문자열 배열이 아닌 직군은 버린다 (렌더링 중 크래시 방지)
        data = Object.fromEntries(Object.entries(data).filter(([, v]) =>
          v && typeof v === "object" && Array.isArray(v.subs) && v.subs.every((x) => typeof x === "string")));
        if (Object.keys(data).length === 0) throw new Error("empty");
        setJobData(data);
        // 첫 항목 자동 선택 금지: 마지막으로 고른 직무(cc_last_job)가 있을 때만 복원, 없으면 "선택 전"
        const last = loadLastJob(data);
        if (last) { setJob(last.job); setSub(last.sub); }
      })
      .catch(() => setJobsErr(true));
  }
  useEffect(() => { loadJobs(); }, []);

  // 전역 401 핸들러 등록 + 앱 시작 시 저장된 토큰 유효성 확인 (/me 1회)
  // 죽은 토큰으로 대시보드에 들어가지 않도록, 401이면 즉시 로그인 화면으로 보낸다
  useEffect(() => {
    setAuthExpiredHandler((reqToken) => authHandlerRef.current(reqToken));
    const saved = localStorage.getItem("cc_token");
    if (saved) {
      authFetch(`${API}/me`, { headers: { "Authorization": "Bearer " + saved } })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d && typeof d.name === "string" && d.name.trim()) {
            setUserName(d.name.trim());
            localStorage.setItem("cc_name", d.name.trim());
          }
        })
        .catch(() => {});
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
    const failed = (e) => { if (!cancelled && !isAuthExpired(e)) setDashErr(true); };
    setDashErr(false);

    authFetch(`${API}/growth`, { headers })
      .then((r) => { if (!r.ok) throw new Error("http"); return r.json(); })
      .then((d) => { if (!cancelled) setGrowthData(d); })
      .catch(failed);

    authFetch(`${API}/history`, { headers })
      .then((r) => { if (!r.ok) throw new Error("http"); return r.json(); })
      .then(async (list) => {
        if (cancelled) return;
        // 깨진 항목(null 등)은 걸러서 저장 → 대시보드·피드백 집계가 죽지 않게
        if (Array.isArray(list)) list = list.filter((x) => x && typeof x === "object");
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
      .catch(failed)
      .finally(() => { if (!cancelled) setDashLoaded(true); });

    return () => { cancelled = true; };
  }, [token, screen, dashReload]);

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
  }, [token, screen, fbReload]);

  // 자기소개서 저장/삭제 (localStorage cc_resume)
  function saveResume() {
    if (!resumeText.trim()) {
      showToast("info", "저장할 자기소개서 내용을 먼저 입력해주세요.");
      return;
    }
    const obj = { text: resumeText, updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(userKey(RESUME_KEY, userEmail), JSON.stringify(obj));
    } catch (e) {
      showToast("error", "브라우저 저장 공간 문제로 자기소개서를 저장하지 못했어요.");
      return;
    }
    setRsSaved(obj);
    showToast("success", `자기소개서를 저장했어요. (${resumeText.length.toLocaleString()}자)`);
  }
  function deleteSavedResume() {
    try { localStorage.removeItem(userKey(RESUME_KEY, userEmail)); } catch (e) {}
    setRsSaved(null);
    showToast("info", "저장된 자기소개서를 삭제했어요.");
  }

  // 작성 중인 내용이 있을 때 다른 내용으로 바꾸기 전에 한 번 확인 (실수로 덮어쓰기 방지)
  function confirmReplaceResume(next) {
    if (!resumeText.trim() || resumeText === next) return true;
    return window.confirm("작성 중인 자기소개서를 불러온 내용으로 바꿀까요?\n지금 편집기에 있는 내용은 사라져요.");
  }

  // 질문 생성 공용 헬퍼 (면접 시작·자소서 미리보기 공용)
  // - 동기 응답 { questions } → 그대로 { ok, data } 반환 (기존 경로 동작 변화 없음)
  // - 비동기 응답 { job_id, status: "pending" } → 2초 간격, 최대 60초 폴링 후 done이면 questions 병합
  // - failed/타임아웃 → QuestionJobError throw (호출부에서 자소서 없이 재요청해 질문은행으로 폴백)
  async function requestQuestions(payload) {
    const res = await authFetch(`${API}/api/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify(payload),
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* 본문 없는 오류 응답 */ }
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
    const gen = accountGenRef.current;
    setRsQLoading(true);
    try {
      const { ok, data } = await requestQuestionsWithFallback({ job, sub, level, career, resume_text: resumeText });
      if (accountGenRef.current !== gen) return; // 그 사이 로그아웃·계정 변경됨
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

  // 자기소개서 화면 → 면접 설정으로 이동
  // text를 넘기면(저장본 카드) 그 내용으로, 안 넘기면 편집기의 현재 내용으로 시작한다
  function startWithResume(text) {
    if (typeof text === "string") {
      if (!confirmReplaceResume(text)) return;
      setResumeText(text);
    } else if (!resumeText.trim() && rsSaved) {
      setResumeText(rsSaved.text);
    }
    setResumeTab("text");
    setNavHint("mock");
    setSetupStep(job && sub ? 4 : 0); // 자소서 화면에서 직무를 이미 골랐으면 마지막 확인 단계로
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
    const gen = accountGenRef.current;
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
      if (accountGenRef.current !== gen) return; // 그 사이 로그아웃·계정 변경됨
      if (res.ok) {
        if (!confirmReplaceResume(data.text || "")) {
          setResumeFileMsg("파일 내용을 불러오지 않았어요. 편집기 내용은 그대로예요.");
          return;
        }
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
    // 기록 A를 열고 바로 B를 열면 A의 늦은 응답이 B를 덮지 않도록 요청 세대 확인
    const reqId = ++detailReqRef.current;
    lastDetailIdRef.current = sessionId;
    const gen = accountGenRef.current;
    const stale = () => detailReqRef.current !== reqId || accountGenRef.current !== gen;
    setDetailData(null);
    setDetailErr("");
    setScreen("historyDetail");
    try {
      const res = await authFetch(`${API}/history/${sessionId}`, {
        headers: { "Authorization": "Bearer " + token },
      });
      const data = await res.json();
      if (stale()) return;
      if (res.ok) {
        setDetailData(data);
      } else {
        setDetailErr(data.detail || "면접 기록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      if (isAuthExpired(e) || stale()) return; // 자동 로그아웃 처리됨 / 이미 다른 기록을 연 경우
      setDetailErr("일시적으로 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  async function startInterview() {
    if (!job || !sub) {
      showToast("info", "직무를 먼저 골라주세요.");
      return;
    }
    const runId = ++runIdRef.current;
    setScreen("loading");
    try {
      const { ok, data } = await requestQuestionsWithFallback({ job, sub, level, career, resume_text: resumeText });
      if (runIdRef.current !== runId) return; // 기다리는 동안 다른 화면으로 이동함 → 면접 화면으로 끌고 가지 않는다
      const qs = ok && data && Array.isArray(data.questions)
        ? data.questions.map((q) => (typeof q === "string" ? q.trim() : "")).filter(Boolean)
        : [];
      if (qs.length === 0) {
        showToast("error", (data && typeof data.detail === "string" && data.detail) || "질문을 불러오지 못했어요. 설정은 그대로 두었으니 다시 시도해주세요.");
        setScreen("start");
        return;
      }
      setQuestions(qs);
      setJobRole(data.job_role || `${job} ${sub}`.trim());
      setResults([]);
      setBusy(false);
      setFailedAnswer(null);
      setRecError("");
      setSaveState("idle");
      savingRef.current = false;
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
      if (runIdRef.current !== runId) return;
      showToast("error", "질문을 불러오지 못했어요. 설정은 그대로 두었으니 다시 시도해주세요.");
      setScreen("start");
    }
  }

  // 질문 생성 대기 취소 → 설정 화면으로 (늦게 도착한 응답은 runId로 무시)
  function cancelLoading() {
    runIdRef.current += 1;
    setScreen("start");
  }

  // 카메라·마이크 연결. 실패해도 새로고침 없이 '다시 연결'로 복구할 수 있다 (설정·자소서 유지)
  async function connectDevices(opts = {}) {
    const gen = ++camGenRef.current;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => { t.onended = null; t.stop(); });
      streamRef.current = null;
    }
    setCamError("");
    setCamState("connecting");
    const vId = opts.camId !== undefined ? opts.camId : camId;
    const aId = opts.micId !== undefined ? opts.micId : micId;
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw Object.assign(new Error("unsupported"), { name: "NotSupportedError" });
      }
      if (!window.MediaRecorder) {
        throw Object.assign(new Error("no recorder"), { name: "NoRecorderError" });
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: vId ? { deviceId: { exact: vId } } : true,
        audio: aId ? { deviceId: { exact: aId } } : true,
      });
      if (camGenRef.current !== gen) { stream.getTracks().forEach((t) => t.stop()); return; }
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      // 장치가 뽑히거나 다른 앱이 가져가면 즉시 알린다
      stream.getTracks().forEach((t) => {
        t.onended = () => {
          if (streamRef.current !== stream) return;
          setCamState("error");
          setCamError("카메라 또는 마이크 연결이 끊겼어요. 장치를 확인한 뒤 '다시 연결'을 눌러주세요.");
        };
      });
      setCamState("ready");
      // 권한을 받은 뒤에야 장치 이름이 보이므로 여기서 목록을 갱신한다
      try {
        const list = await navigator.mediaDevices.enumerateDevices();
        if (camGenRef.current !== gen) return;
        setDevices({
          cams: list.filter((d) => d.kind === "videoinput"),
          mics: list.filter((d) => d.kind === "audioinput"),
        });
      } catch (e) {}
    } catch (e) {
      if (camGenRef.current !== gen) return;
      const name = e && e.name;
      let msg;
      if (name === "NotAllowedError" || name === "SecurityError") {
        msg = "카메라·마이크 권한이 차단되어 있어요. 주소창 왼쪽 아이콘 → 카메라·마이크를 '허용'으로 바꾼 뒤 '다시 연결'을 눌러주세요.";
      } else if (name === "NotFoundError" || name === "OverconstrainedError") {
        msg = "카메라 또는 마이크 장치를 찾을 수 없어요. 웹캠·마이크 연결을 확인한 뒤 '다시 연결'을 눌러주세요.";
      } else if (name === "NotReadableError" || name === "AbortError") {
        msg = "다른 프로그램(줌·디스코드·OBS 등)이 카메라를 사용 중이에요. 그 프로그램을 끈 뒤 '다시 연결'을 눌러주세요.";
      } else if (name === "NotSupportedError" || name === "NoRecorderError") {
        msg = "이 브라우저는 영상 녹화를 지원하지 않아요. 최신 크롬이나 엣지에서 다시 열어주세요.";
      } else {
        msg = `카메라/마이크를 켤 수 없어요. (원인: ${name || "알 수 없음"}) 권한과 장치 연결을 확인한 뒤 '다시 연결'을 눌러주세요.`;
      }
      setCamError(msg);
      setCamState("error");
    }
  }

  useEffect(() => {
    if (screen !== "interview") return;
    connectDevices();
    return () => {
      camGenRef.current += 1; // 연결 중이던 요청 폐기
      stopTimer();
      stopTtsAudio(); // 화면 이탈 시 재생 중 뉴럴 오디오 정리 (objectURL revoke 포함)
      ttsCacheRef.current.clear(); // 질문별 mp3 캐시 해제 (세션마다 질문이 달라짐)
      if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.onstop = null;
        try { recorderRef.current.stop(); } catch (e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => { t.onended = null; t.stop(); });
        streamRef.current = null;
      }
      setCamState("idle");
      setReplaying(false);
      setBusy(false); // 분석 대기 중 이탈해도 다음 면접 버튼이 막히지 않게
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  // 마이크 입력 막대: 실제 음량을 보여주고, 6초 넘게 소리가 없으면 안내한다
  useEffect(() => {
    if (screen !== "interview" || camState !== "ready" || !streamRef.current) return;
    const stream = streamRef.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || stream.getAudioTracks().length === 0) return;
    let ctx, raf = 0;
    try {
      ctx = new AC();
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      src.connect(an);
      const buf = new Uint8Array(an.fftSize);
      let silentSince = performance.now();
      let silentShown = false;
      const tick = () => {
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        const lvl = Math.min(1, Math.sqrt(sum / buf.length) * 6);
        if (levelRef.current) levelRef.current.style.transform = `scaleX(${lvl.toFixed(3)})`;
        const now = performance.now();
        if (lvl > 0.04) silentSince = now;
        const silent = now - silentSince > 6000;
        if (silent !== silentShown) { silentShown = silent; setMicSilent(silent); }
        raf = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) { return; }
    return () => {
      cancelAnimationFrame(raf);
      try { ctx.close(); } catch (e) {}
      setMicSilent(false);
    };
  }, [screen, camState]);

  // ready ↔ live 전환 시 video 요소가 리마운트되므로 스트림을 다시 붙인다
  useEffect(() => {
    if (screen === "interview" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [screen, phase]);

  // 이탈 보호: 녹화를 시작했거나 분석·저장 중이거나 저장 못 한 결과가 있으면 새로고침/탭 닫기 경고
  const interviewInProgress = screen === "interview" && (phase !== "ready" || busy || results.length > 0 || !!failedAnswer);
  const resultUnsaved = screen === "result" && (saveState === "saving" || saveState === "error");
  useEffect(() => {
    if (!(interviewInProgress || resultUnsaved)) return;
    const onBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [interviewInProgress, resultUnsaved]);

  // 화면이 바뀌면 맨 위로 + 제목에 포커스 (스크린리더·키보드 사용자가 새 화면을 바로 알 수 있게)
  useEffect(() => {
    if (firstScreenRef.current) { firstScreenRef.current = false; return; }
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      const h = document.querySelector(".smain h1, .smain h2");
      if (h) {
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
        try { h.focus({ preventScroll: true }); } catch (e) {}
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [screen]);

  // 가이드 모달: Esc로 닫기 + 열릴 때 닫기 버튼에 포커스 + 닫으면 원래 버튼으로 포커스 복귀
  useEffect(() => {
    if (!showGuide) return;
    const opener = document.activeElement;
    const t = setTimeout(() => { if (guideCloseRef.current) guideCloseRef.current.focus(); }, 0);
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); setShowGuide(false); }
      else if (e.key === "Tab") { e.preventDefault(); if (guideCloseRef.current) guideCloseRef.current.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, [showGuide]);

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
    if (screen !== "resume" && screen !== "start" && screen !== "interview") return;
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
    cancelSpeech(); // 이전 오디오·발화 정리 (세대 토큰도 올라감)
    const seq = ++speakSeqRef.current;
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
    speakSeqRef.current += 1; // fetch 진행 중인 낭독도 폐기 (화면 이탈 후 뒤늦게 재생 방지)
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
        if (replayResumeRef.current) replayResumeRef.current(); // 다시 듣기 중 → 즉시 녹화 재개
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
    resumeTimer();
  }
  function resumeTimer() {
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

  // 녹화 시작. 실패하면 false (답변 완료를 막고 '다시 답변'/재연결로 복구하게 한다)
  function startRecording() {
    if (!streamRef.current) return false;
    const chunks = [];
    let rec;
    try {
      const mime = pickMime();
      rec = new MediaRecorder(streamRef.current, mime ? { mimeType: mime } : undefined);
      rec.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
      rec.onerror = () => {
        if (recorderRef.current !== rec) return;
        stopTimer();
        setRecError("녹화 중 문제가 생겼어요. '다시 답변'을 눌러 이 질문을 다시 녹화해주세요.");
      };
      rec.start();
    } catch (e) {
      recorderRef.current = null;
      stopTimer();
      setRecError("녹화를 시작하지 못했어요. '다시 연결'로 카메라·마이크를 다시 켠 뒤 '다시 답변'을 눌러주세요.");
      return false;
    }
    recChunksRef.current.set(rec, chunks);
    recorderRef.current = rec;
    setRecError("");
    return true;
  }

  function stopRecording(cb) {
    const rec = recorderRef.current;
    if (!rec || rec.state === "inactive") { cb && cb(null); return; }
    rec.onstop = () => {
      const chunks = recChunksRef.current.get(rec) || [];
      const blob = new Blob(chunks, { type: rec.mimeType || "video/webm" });
      cb && cb(blob);
    };
    rec.stop();
  }

  // 질문 다시 듣기: 낭독이 답변 녹음에 섞이지 않도록 그동안 녹화·타이머를 멈춘다
  function replayQuestion() {
    const rec = recorderRef.current;
    const wasRecording = !!rec && rec.state === "recording";
    if (wasRecording) { try { rec.pause(); } catch (e) {} stopTimer(); }
    setReplaying(true);
    let done = false;
    const resume = () => {
      if (done) return;
      done = true;
      clearTimeout(guard);
      if (replayResumeRef.current === resume) replayResumeRef.current = null;
      if (wasRecording && rec.state === "paused" && recorderRef.current === rec) {
        try { rec.resume(); } catch (e) {}
        resumeTimer();
      }
      setReplaying(false);
    };
    const guard = setTimeout(resume, 45000); // 낭독이 끝났다는 신호가 안 와도 녹화는 다시 이어간다
    replayResumeRef.current = resume;
    speakQuestion(questions[qIndex], (status) => { if (status !== "started") resume(); });
  }

  // 배포 서버의 비동기 분석 잡 폴링: 3초 간격, 최대 10분 (워커 1대가 순서대로 처리)
  // done → result 반환(동기 응답과 동일 구조), failed → { error }, 타임아웃 → { error, jobId } (같은 작업을 다시 조회 가능)
  async function pollAnalysisResult(jobId) {
    const deadline = Date.now() + 10 * 60 * 1000;
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
          if (isAuthExpired(e)) throw e; // 자동 로그아웃 처리됨
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
      return { error: "분석이 생각보다 오래 걸리고 있어요. '다시 분석'을 누르면 같은 답변의 결과를 이어서 기다려요.", jobId };
    } finally {
      setAnalysisNote("");
    }
  }

  async function sendForAnalysis(blob, index) {
    setAnalysisNote("");
    const form = new FormData();
    form.append("video", blob, "answer.webm");
    form.append("question", questions[index] || "");
    form.append("job_role", jobRole);
    form.append("career", career); // 백엔드 계약: 경력 구분 전달 (미수신이어도 무해)
    const res = await authFetch(`${API}/api/analyze-answer`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token },
      body: form,
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* 본문 없는 오류 응답 */ }
    if (!res.ok) {
      // 503(분석 서버 꺼짐)·413(영상 큼)·429(대기 많음) 등 서버가 알려준 이유를 그대로 보여준다
      const detail = data && typeof data.detail === "string" ? data.detail : "";
      return { question: questions[index], error: detail || "답변을 업로드하지 못했어요. 잠시 후 다시 시도해주세요." };
    }
    // 배포 서버: 즉시 결과 대신 job_id가 오면 완료까지 폴링
    if (data && data.job_id != null && data.posture_score == null) {
      data = await pollAnalysisResult(data.job_id);
    }
    return { question: questions[index], ...data };
  }

  async function saveSession(finalResults) {
    if (savingRef.current) return; // 저장 중 중복 요청 방지
    // 분석에 실패한 문항은 저장에서 제외한다 (가짜 점수를 만들지 않는다)
    const valid = finalResults.filter(hasAnalysis);
    if (valid.length === 0) {
      setSaveErr(true);
      setSaveState("skipped");
      setSaveMsg("분석에 성공한 답변이 없어 이번 면접은 기록에 저장되지 않았습니다.");
      showToast("error", "분석에 성공한 답변이 없어 이번 면접은 기록에 저장되지 않았습니다.");
      return;
    }
    // 측정하지 못한 점수는 0점이 아니라 null로 보낸다 (결과 화면과 같은 기준으로 평균)
    const score = (v) => (typeof v === "number" && isFinite(v) ? Math.max(0, Math.min(100, Math.round(v))) : null);
    savingRef.current = true;
    setSaveState("saving");
    setSaveErr(false);
    setSaveMsg("면접 기록을 저장하고 있어요...");
    try {
      const payload = {
        job, sub_job: sub, level, career,
        ...(company.trim() ? { company: company.trim() } : {}),
        results: valid.map((r) => ({
          question: r.question || "",
          answer_stt: r.answer_text || "",
          posture_score: score(r.posture_score),
          content_score: score(r.content_score),
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
      let data = null;
      try { data = await res.json(); } catch (e) { /* 본문 없는 오류 응답 */ }
      if (res.ok) {
        setSaveState("saved");
        setSaveErr(false);
        const t = data && typeof data.total_score === "number" ? ` (종합 ${data.total_score}점)` : "";
        setSaveMsg(`면접 기록이 저장되었습니다.${t}`);
        showToast("success", `면접 기록이 저장되었습니다.${t}`);
      } else {
        const detail = data && typeof data.detail === "string" ? data.detail : "잠시 후 다시 시도해주세요.";
        setSaveState("error");
        setSaveErr(true);
        setSaveMsg("기록 저장에 실패했어요. " + detail);
        showToast("error", "기록 저장에 실패했어요. " + detail);
      }
    } catch (e) {
      setSaveState("error");
      setSaveErr(true);
      if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
      setSaveMsg("일시적인 문제로 기록을 저장하지 못했어요. 아래 '다시 저장'을 눌러주세요.");
      showToast("error", "일시적인 문제로 기록을 저장하지 못했어요.");
    } finally {
      savingRef.current = false;
    }
  }

  // 답변 1개를 결과에 넣고 다음 질문(또는 결과 화면)으로 넘어간다
  function finishAnswer(result, blob, answeredIndex, prevResults = results) {
    // 세션 내 다시보기용 답변 영상 URL 보관 (결과 화면 이탈 시 revoke)
    if (blob) {
      try { result.videoUrl = URL.createObjectURL(blob); } catch (e) {}
    }
    const newResults = [...prevResults, result];
    setResults(newResults);
    setFailedAnswer(null);
    setBusy(false);

    const next = answeredIndex + 1;
    if (next < questions.length) {
      setQIndex(next);
      qIndexRef.current = next;
      // 다음 질문 녹화·타이머는 낭독 종료 후 useEffect에서 시작한다 (STT 오염 방지)
    } else {
      endInterview(newResults);
    }
  }

  function endInterview(finalResults) {
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    setScreen("result");
    saveSession(finalResults);
  }

  // 답변 분석 (jobId가 있으면 업로드 없이 기존 작업 결과를 이어서 기다린다)
  async function runAnalysis(blob, index, jobId) {
    const runId = runIdRef.current;
    setFailedAnswer(null);
    setBusy(true);
    let result;
    try {
      if (jobId != null) {
        result = { question: questions[index], ...(await pollAnalysisResult(jobId)) };
      } else {
        result = await sendForAnalysis(blob, index);
      }
    } catch (e) {
      if (isAuthExpired(e)) return; // 자동 로그아웃 처리됨
      result = { question: questions[index], error: "일시적으로 분석 서버에 연결할 수 없어요." };
    }
    if (runIdRef.current !== runId) return; // 면접 화면을 떠난 뒤 도착한 응답은 버린다

    // 분석 실패: 가짜 점수를 만들지 않고, 같은 답변을 다시 분석·다시 답변·건너뛰기 중에서 고르게 한다
    if (!hasAnalysis(result)) {
      setBusy(false);
      setFailedAnswer({
        index,
        blob,
        jobId: result && result.jobId != null ? result.jobId : null,
        reason: (result && result.error) || "답변을 분석하지 못했어요.",
      });
      return;
    }
    finishAnswer(result, blob, index);
  }

  function handleDone() {
    if (camError || busy || recError || replaying) return;
    setBusy(true);
    stopTimer();
    const answeredIndex = qIndexRef.current;
    stopRecording((blob) => {
      if (!blob || blob.size === 0) {
        setBusy(false);
        setFailedAnswer({ index: answeredIndex, blob: null, jobId: null, reason: "녹화된 영상이 없어요. '다시 답변'을 눌러 다시 녹화해주세요." });
        return;
      }
      runAnalysis(blob, answeredIndex, null);
    });
  }

  function retryAnalysis() {
    const f = failedAnswer;
    if (!f || (!f.blob && f.jobId == null)) return;
    runAnalysis(f.blob, f.index, f.jobId);
  }
  function redoFailed() {
    setFailedAnswer(null);
    if (startRecording()) startTimer();
  }
  function skipFailed() {
    const f = failedAnswer;
    if (!f) return;
    finishAnswer({ question: questions[f.index], failed: true, failReason: f.reason }, f.blob, f.index);
  }

  // 지금까지 분석된 답변만으로 면접을 끝내고 기록에 저장
  // force: 분석 대기 중(busy)에도 진행 중인 분석을 버리고 끝낸다 (오래 걸릴 때 오버레이에서 호출)
  function finishEarly(force = false) {
    if (busy && force !== true) return;
    if (!window.confirm("지금까지 분석된 답변만 저장하고 면접을 마칠까요?\n진행 중인 질문의 녹화는 저장되지 않아요.")) return;
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") { rec.onstop = null; try { rec.stop(); } catch (e) {} }
    stopTimer();
    cancelSpeech();
    runIdRef.current += 1;
    setFailedAnswer(null);
    setBusy(false);
    endInterview(results);
  }

  function handleRedo() {
    if (camError || busy) return;
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") { rec.onstop = null; try { rec.stop(); } catch (e) {} }
    if (startRecording()) startTimer();
  }

  function goHome() {
    runIdRef.current += 1;
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
  const emailName = userName || displayNameFromEmail(userEmail);

  async function saveName() {
    const nm = (nameDraft || "").trim().replace(/\s+/g, " ");
    if (!nm) { showToast("error", "이름을 입력해주세요."); return; }
    setNameSaving(true);
    try {
      const res = await authFetch(`${API}/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ name: nm }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.detail || "이름을 저장하지 못했어요.");
      setUserName(d.name || nm);
      localStorage.setItem("cc_name", d.name || nm);
      setNameDraft(null);
      showToast("success", "이름을 저장했어요.");
    } catch (e) {
      if (!isAuthExpired(e)) showToast("error", e.message || "이름을 저장하지 못했어요.");
    } finally {
      setNameSaving(false);
    }
  }
  const initial = emailName && emailName !== "회원" ? emailName.charAt(0).toUpperCase() : "C";

  // 사이드바 이동 핸들러 (기능 카드에서도 재사용)
  const goHomeNav = () => { setNavHint(""); setScreen("home"); };
  const goMock = () => {
    setNavHint("mock");
    // 저장된 자소서가 있으면 면접 설정의 자소서 탭에 자동 채움 (입력 중이던 내용은 유지)
    if (!resumeText.trim()) {
      const s = loadSavedResume(userEmail);
      if (s) setResumeText(s.text);
    }
    setSetupStep(0);
    setScreen("start");
  };
  const goResume = () => {
    setNavHint("resume");
    if (!resumeText.trim()) {
      const s = loadSavedResume(userEmail);
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
      if (preset.career === "신입" || preset.career === "경력") setCareer(preset.career);
      setCompany(preset.company ? String(preset.company).trim() : "");
    }
    goMock();
  };
  const goSettings = () => { setNavHint(""); setScreen("settings"); };
  const goJobs = () => { setNavHint(""); setScreen("jobs"); };

  const navActive =
    screen === "jobs" ? "jobs" : screen === "settings" ? "settings"
      : screen === "feedback" ? "feedback"
        : screen === "resume" ? "resume"
          : screen === "growth" ? "records"
            : screen === "historyDetail" ? (navHint === "feedback" ? "feedback" : "records")
              : screen === "home" ? "home"
                : "mock"; // start / loading / interview / result

  const NAV_ITEMS = [
    { key: "home", label: "홈", short: "홈", icon: <IconHome />, go: goHomeNav },
    { key: "mock", label: "모의면접", short: "면접", icon: <IconVideo />, go: goMock },
    { key: "feedback", label: "피드백 분석", short: "피드백", icon: <IconSpark size={17} />, go: goFeedback },
    { key: "records", label: "나의 기록", short: "기록", icon: <IconClock />, go: goRecords },
    { key: "resume", label: "자기소개서", short: "자소서", icon: <IconDoc />, go: goResume },
    { key: "jobs", label: "채용공고", short: "공고", go: goJobs },
    { key: "settings", label: "설정", short: "설정", icon: <IconGear />, go: goSettings },
  ];

  const appbarTitle =
    screen === "interview" ? "면접 진행"
      : screen === "loading" ? "질문 준비"
        : screen === "result" ? "면접 결과"
          : screen === "historyDetail" ? "기록 상세"
            : (NAV_ITEMS.find((it) => it.key === navActive) || {}).label || "코치코치";
  const greetDate = (() => {
    const d = new Date();
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${"일월화수목금토"[d.getDay()]}요일`;
  })();

  // 면접 진행 중(녹화 시작·분석 중·답변 있음)이거나 결과를 아직 저장하지 못했으면 이동 전에 확인
  // 이동하면 진행 중이던 질문 생성·분석 응답은 runId로 폐기한다
  const confirmLeaveInterview = () => {
    if (interviewInProgress) {
      if (!window.confirm("면접이 진행 중이에요. 지금 나가면 이번 면접 내용이 저장되지 않아요. 정말 나갈까요?")) return false;
    } else if (resultUnsaved) {
      if (!window.confirm("면접 기록을 아직 저장하지 못했어요. 그래도 나갈까요?")) return false;
    }
    runIdRef.current += 1;
    return true;
  };

  // 주의: 컴포넌트가 아니라 일반 함수로 호출한다.
  // (렌더마다 새 컴포넌트 타입이 되면 서브트리가 리마운트되어
  //  textarea 포커스/카메라 video가 깨지기 때문)
  function renderShell(children) {
    return <AppShell screen={screen} title={appbarTitle} items={NAV_ITEMS} active={navActive}
      onHome={goHomeNav} confirmLeave={confirmLeaveInterview} name={emailName} initial={initial}
      footer={<ToastHost toasts={toasts} onClose={dismissToast} />}>{children}</AppShell>;
  }

  /* ===== 설정 화면 ===== */
  if (screen === "jobs") {
    const latest = Array.isArray(historyData) ? historyData[0] : null;
    const dreams = loadDreams(userEmail);
    const recentJob = latest?.job || dreams[0]?.job || "";
    return renderShell(<JobsBrowse api={API} jobData={jobData} jobMeta={jobMeta} jobNames={Object.keys(JOB_META)}
      initialJob={recentJob} career={latest?.career || ""} onPractice={startWithPreset} />);
  }

  if (screen === "settings") {
    return renderShell(
      <div className="page settings">
        <PageHeader title="설정" />
        <section className="block" aria-labelledby="set-account-title">
          <SectionHeader id="set-account-title" title="계정" />
          <div className="set-rows">
            <div className="set-row">
              <span className="set-k">로그인 계정</span>
              <span className="set-v"><span className="avatar" aria-hidden="true">{initial}</span>{userEmail || "-"}</span>
            </div>
            <form className="set-row" onSubmit={(e) => { e.preventDefault(); if (!nameSaving) saveName(); }}>
              <label className="set-k" htmlFor="set-name-input">이름</label>
              <div className="set-v set-name">
                <input
                  id="set-name-input"
                  className="input"
                  maxLength={20}
                  placeholder="이름 (예: 송경원)"
                  value={nameDraft !== null ? nameDraft : userName}
                  onChange={(e) => setNameDraft(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={nameSaving || nameDraft === null || nameDraft.trim() === userName}>
                  {nameSaving ? "저장 중..." : "저장"}
                </Button>
                {!userName && nameDraft === null && <p className="field-hint">이름을 등록하면 이메일 아이디 대신 이름으로 불러드려요.</p>}
              </div>
            </form>
            <div className="set-row">
              <span className="set-k">로그아웃</span>
              <span className="set-v"><Button variant="secondary" onClick={handleLogout}><IconLogout size={15} />로그아웃</Button></span>
            </div>
          </div>
        </section>
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
    const savedSame = !!(rsSaved && rsSaved.text === resumeText);
    const dirty = !!resumeText.trim() && !savedSame;
    // 지금 해야 할 일 하나만 Primary: 저장 → 질문 만들기 → 모의면접 시작
    const rsStage = !savedSame ? 0 : rsQuestions.length === 0 ? 1 : 2;
    const canGen = !rsQLoading && !!resumeText.trim() && !!job && !!sub;
    return renderShell(
      <div className="page resume">
        <PageHeader title="자기소개서" desc="저장하면 면접 설정에 자동으로 채워지고, 내용으로 예상 질문을 만들 수 있어요." />

        <div className="doc-layout">
          <section className="doc-main" aria-label="자기소개서 편집">
            <div className="doc-toolbar">
              <Segmented label="자기소개서 입력 방법" value={resumeTab} onChange={setResumeTab}
                options={[{ value: "file", label: "파일 업로드", icon: <IconClip /> }, { value: "text", label: "직접 붙여넣기", icon: <IconEdit /> }]} />
              <span className="t-caption num">{resumeText.length.toLocaleString()}자</span>
            </div>

            {resumeTab === "file" ? (
              <div className="dropzone dropzone-lg">
                <input ref={resumeFileRef} type="file" accept=".txt,.docx,.pdf" style={{ display: "none" }} onChange={handleResumeFile} />
                <Button variant="secondary" disabled={resumeUploading} onClick={() => resumeFileRef.current && resumeFileRef.current.click()}>
                  {resumeUploading ? <BtnSpinner /> : <IconClip />}{resumeUploading ? "불러오는 중..." : "파일 선택"}
                </Button>
                <p className="t-caption">.txt · .docx · .pdf, 5MB 이하. 불러온 내용은 '직접 붙여넣기'에서 고칠 수 있어요.</p>
                {resumeFileMsg && <p className={"inline-note" + (resumeFileErr ? " err" : " ok")}>{resumeFileMsg}</p>}
              </div>
            ) : (
              <textarea
                className="textarea doc-editor"
                aria-label="자기소개서 내용"
                placeholder="자기소개서 내용을 붙여넣으세요. 작성 중인 내용은 이 브라우저에 자동 보관돼요."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            )}

            <div className="doc-actions">
              <Button variant={rsStage === 0 ? "primary" : "secondary"} onClick={saveResume} disabled={!resumeText.trim()}>
                자기소개서 저장
              </Button>
              <span className={"t-sub doc-state" + (dirty ? " dirty" : "")} role="status">
                {savedSame ? <><IconCheck size={12} /> 저장된 버전과 같아요</> : dirty ? "저장하지 않은 변경이 있어요" : "내용을 입력하면 저장할 수 있어요"}
              </span>
            </div>
          </section>

          <aside className="doc-side" aria-label="저장 상태">
            <div className="side-block">
              <h2 className="t-label">저장 상태</h2>
              {rsSaved ? (
                <>
                  <dl className="kv">
                    <div><dt>저장본</dt><dd className="num">{rsSaved.text.length.toLocaleString()}자</dd></div>
                    {savedDate && <div><dt>마지막 저장</dt><dd>{savedDate}</dd></div>}
                  </dl>
                  <p className="side-preview">{rsSaved.text.slice(0, 120)}{rsSaved.text.length > 120 ? "…" : ""}</p>
                  <div className="side-actions">
                    <button type="button" className="btn btn-text btn-sm" onClick={() => { if (!confirmReplaceResume(rsSaved.text)) return; setResumeTab("text"); setResumeText(rsSaved.text); }}>편집기로 불러오기</button>
                    <button type="button" className="btn btn-text btn-sm btn-danger" onClick={deleteSavedResume}>삭제</button>
                  </div>
                </>
              ) : (
                <p className="t-sub">아직 저장한 자기소개서가 없어요.</p>
              )}
            </div>
            <div className="side-block">
              <h2 className="t-label">면접 설정 연동</h2>
              <p className="t-sub">저장본은 모의면접 설정 04단계에 자동으로 채워져요.</p>
              <button type="button" className="btn btn-text btn-sm" onClick={() => { if (rsSaved) startWithResume(rsSaved.text); }} disabled={!rsSaved}
                title={!rsSaved ? "자기소개서를 먼저 저장해주세요" : undefined}>
                저장본으로 면접 설정 열기
              </button>
            </div>
            <div className="side-block">
              <h2 className="t-label">작성 팁</h2>
              <p className="t-sub">경험·수치가 구체적일수록 예상 질문도 구체적으로 나와요.</p>
            </div>
          </aside>
        </div>

        <section className="flow" aria-labelledby="flow-title">
          <SectionHeader id="flow-title" title="저장 후 이어서 할 일" />
          <ol className="flow-list">
            <li className={rsSaved ? "done" : "cur"}>
              <span className="flow-no num" aria-hidden="true">{rsSaved ? <IconCheck size={12} /> : 1}</span>
              <div className="flow-body">
                <p className="flow-title">자기소개서 저장</p>
                <p className="t-sub">{rsSaved ? `저장됨${savedDate ? " · " + savedDate : ""}` : "위 편집기에서 내용을 입력하고 저장하세요."}</p>
              </div>
            </li>

            <li className={rsQuestions.length ? "done" : rsSaved ? "cur" : ""}>
              <span className="flow-no num" aria-hidden="true">{rsQuestions.length ? <IconCheck size={12} /> : 2}</span>
              <div className="flow-body">
                <p className="flow-title">AI 예상 질문 생성</p>
                <div className="flow-job" data-testid="rs-job">
                  <label className="select-wrap">
                    <span className="field-label">직무</span>
                    <select className="select" value={job || ""} disabled={!jobData} onChange={(e) => selectJob(e.target.value)} aria-label="직무 선택">
                      <option value="">{jobData ? "직무 선택" : jobsErr ? "직무 목록을 불러오지 못했어요" : "직무 불러오는 중..."}</option>
                      {jobData && Object.keys(jobData).map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                  </label>
                  <label className="select-wrap">
                    <span className="field-label">세부 직무</span>
                    <select className="select" value={sub || ""} disabled={!job || !jobData || !jobData[job]} onChange={(e) => setSub(e.target.value)} aria-label="세부 직무 선택">
                      {!job && <option value="">직무를 먼저 골라주세요</option>}
                      {job && jobData && jobData[job] && (jobData[job].subs || []).map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                  </label>
                  <Button variant={rsStage === 1 ? "primary" : "secondary"} disabled={!canGen} onClick={previewQuestions}>
                    {rsQLoading ? <><BtnSpinner />만드는 중...</> : rsQuestions.length ? "질문 다시 만들기" : "예상 질문 만들기"}
                  </Button>
                </div>
                {jobsErr && !jobData && (
                  <p className="inline-note err" role="alert">직무 목록을 불러오지 못했어요. <button type="button" className="btn btn-text btn-sm" onClick={loadJobs}>다시 불러오기</button></p>
                )}
                {qGenActive && (
                  <p className="status-line" data-testid="qgen-note"><span className="dot pulse" aria-hidden="true" />자소서를 읽고 맞춤 질문을 만들고 있어요 · {qGenSeconds}초</p>
                )}
                {workerStatus && !qGenActive && (
                  <p className={"status-line " + (workerStatus.online ? "ok" : "warn")} data-testid="worker-chip">
                    <span className="dot" aria-hidden="true" />
                    {workerStatus.online ? "AI 맞춤 질문을 만들 수 있어요" : "지금은 기본 질문으로 만들어져요 (분석 서버 대기 중)"}
                  </p>
                )}
                {!resumeText.trim() ? <p className="t-caption">자기소개서를 먼저 입력해주세요.</p> : !job || !sub ? <p className="t-caption">직무와 세부 직무를 골라주세요. 면접 설정에도 그대로 적용돼요.</p> : null}
              </div>
            </li>

            <li className={rsQuestions.length ? "done" : ""}>
              <span className="flow-no num" aria-hidden="true">{rsQuestions.length ? <IconCheck size={12} /> : 3}</span>
              <div className="flow-body">
                <p className="flow-title">예상 질문 확인{rsQuestions.length ? ` · ${rsQuestions.length}개` : ""}</p>
                {rsQuestions.length ? (
                  <ol className="q-list">
                    {rsQuestions.map((q, i) => (
                      <li key={i}><span className="q-no num">Q{i + 1}</span><span>{q}</span></li>
                    ))}
                  </ol>
                ) : (
                  <p className="t-sub">{job ? `${job}${sub ? " · " + sub : ""} 직무 기준으로` : "선택한 직무 기준으로"} 질문 6개가 여기에 표시돼요.</p>
                )}
              </div>
            </li>

            <li className={rsStage === 2 ? "cur" : ""}>
              <span className="flow-no num" aria-hidden="true">4</span>
              <div className="flow-body">
                <p className="flow-title">이 자기소개서로 모의면접 시작</p>
                <p className="t-sub">면접 설정 마지막 단계로 이동해요. 면접 질문은 같은 자기소개서로 새로 만들어져요.</p>
                <div className="flow-cta">
                  <Button variant={rsStage === 2 ? "primary" : "secondary"} onClick={() => startWithResume()} disabled={!resumeText.trim()}
                    title={!resumeText.trim() ? "자기소개서를 먼저 입력해주세요" : undefined}>
                    모의면접 시작
                  </Button>
                </div>
              </div>
            </li>
          </ol>
        </section>
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
    const improveAll = []; // 빈도 집계용 원본 (같은 지적이 여러 문항에 반복되면 그만큼 센다)
    const pushAll = (arr, v) => {
      const t = String(v).trim();
      if (t && !t.includes("[object Object]")) arr.push(t);
    };
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
      if (structI) structI.forEach((s) => { pushUniq(improveSet, s); pushAll(improveAll, s); });
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
        else if (kind === "improve") { pushUniq(improveSet, withLabel); pushAll(improveAll, withLabel); }
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
      count: improveAll.reduce(
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

    // 최근 평균 종합 점수 (최신 5회)
    const recentTotals = (fbList || []).filter((s) => s && typeof s.total_score === "number").slice(0, 5).map((s) => s.total_score);
    const recentAvg = avg(recentTotals);
    // 연습이 필요한 질문: 답변 내용 점수가 낮은 문항 (같은 질문은 한 번만)
    const weakQs = [];
    allResults
      .filter((r) => r && r.question && typeof r.content_score === "number")
      .sort((a, b) => a.content_score - b.content_score)
      .forEach((r) => { if (weakQs.length < 5 && !weakQs.some((w) => w.question === r.question)) weakQs.push(r); });

    return renderShell(
      <div className="page feedback">
        <PageHeader title="피드백 분석"
          desc={rounds.length > 0 ? `면접 ${rounds.length}회 · 문항 ${allResults.length}개${fbRange ? " · " + fbRange : ""}${analyzedSessions < rounds.length ? ` · 상세 분석은 최근 ${analyzedSessions}회 기준` : ""}` : null}
          actions={<Button variant="text" onClick={goRecords}>나의 기록</Button>} />

        {fbErr ? (
          <EmptyState title="분석 데이터를 불러오지 못했어요" desc={fbErr} action="다시 시도" onAction={() => setFbReload((n) => n + 1)} />
        ) : fbLoading || !fbData ? (
          <div className="skel-stack lg" aria-label="분석 데이터를 불러오는 중"><span className="skel" /><span className="skel" /><span className="skel" /><span className="skel" /></div>
        ) : rounds.length === 0 ? (
          <EmptyState title="아직 분석할 면접이 없습니다."
            desc="첫 면접을 완료하면 답변 속도, 내용, 반복 표현, 점수 변화를 분석해드립니다."
            action="첫 모의면접 시작" onAction={goMock} />
        ) : (
          <>
            <div className="kpis">
              <Stat label="최근 평균 점수" value={recentAvg != null ? <CountUp value={recentAvg} /> : "—"} unit={recentAvg != null ? "점" : ""} tone="accent"
                note={recentTotals.length ? `최근 ${recentTotals.length}회 종합` : "종합 점수 없음"} />
              <Stat label="답변 내용 평균" value={avgContent != null ? avgContent : "—"} unit={avgContent != null ? "점" : ""} note={`${cScores.length}회 기준`} />
              <Stat label="자세·표정 평균" value={avgPosture != null ? avgPosture : "—"} unit={avgPosture != null ? "점" : ""} note={`${pScores.length}회 기준`} />
              <Stat label="강점 / 개선점" value={fbClassified === 0 && fbLineCount > 0 ? "—" : `${strengthSet.length} / ${improveSet.length}`}
                note={fbLineCount > 0 ? `피드백 ${fbLineCount}줄에서 추출` : "저장된 문항 피드백 없음"} />
            </div>

            <div className="split">
              <div className="split-main">
                <section className="block" aria-labelledby="fb-axis-title">
                  <SectionHeader id="fb-axis-title" title="답변 구조" meta="논리성 · 구체성 · 직무적합도" />
                  {axisCards.length > 0 ? (
                    <ul className="bars">
                      {axisCards.map((a) => (
                        <li key={a.key} className={a.weak ? "weak" : ""}>
                          <span className="bars-label">{a.key}</span>
                          <Meter value={a.value == null ? 0 : a.value} max={100} label={`${a.key} ${a.value ?? "기록 없음"}`} />
                          <span className="bars-value num">{a.value == null ? "—" : <>{a.value}<small>{a.unit}</small></>}</span>
                          <span className="bars-note">{a.sub}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="t-sub">축별 피드백이 저장되면 여기에 표시돼요.</p>
                  )}
                </section>

                <section className="block" aria-labelledby="fb-issue-title">
                  <SectionHeader id="fb-issue-title" title="반복적으로 지적된 문제" meta={issueCounts.length > 0 ? `개선 피드백 ${improveSet.length}건 기준` : ""} />
                  {issueCounts.length > 0 ? (
                    <ol className="rank">
                      {issueCounts.map((b, i) => (
                        <li key={b.key}>
                          <span className="rank-no num">{i + 1}</span>
                          <div className="rank-body">
                            <div className="rank-top"><b>{b.key}</b><span className="num">{b.count}회</span></div>
                            <Meter value={b.count} max={issueMax} label={`${b.key} ${b.count}회`} tone={i === 0 ? "" : "muted"} />
                            <p className="t-sub">{b.tip}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : improveSet.length > 0 ? (
                    <>
                      <p className="t-sub">반복 패턴은 아직 뚜렷하지 않아요. 최근 받은 개선 피드백이에요.</p>
                      <ul className="bullets">{improveSet.slice(0, 3).map((t, i) => <li key={i}>{t}</li>)}</ul>
                    </>
                  ) : (
                    <p className="t-sub">저장된 피드백 텍스트가 아직 없어요. 다음 면접을 마치면 집계돼요.</p>
                  )}
                </section>

                <section className="block" aria-labelledby="fb-chart-title">
                  <SectionHeader id="fb-chart-title" title="점수 변화">
                    <span className="legend"><span className="lg-dot accent" />답변 내용</span>
                    <span className="legend"><span className="lg-dot" />자세·표정</span>
                  </SectionHeader>
                  {chartPts.length > 0 ? (
                    <>
                      <LineChart
                        points={chartPts}
                        series={[
                          { key: "content", label: "답변 내용", color: "var(--c-accent)" },
                          { key: "posture", label: "자세·표정", color: "var(--c-ink-3)" },
                        ]}
                        goal={80} valueLabels={false} height={220}
                        ariaLabel="회차별 자세·내용 점수 비교"
                      />
                      {chartPts.length === 1 && <p className="t-caption">기록이 1회뿐이라 점으로만 표시돼요. 2회차부터 선이 그려져요.</p>}
                    </>
                  ) : (
                    <p className="t-sub">점수가 기록된 회차가 아직 없어요.</p>
                  )}
                </section>

                {weakQs.length > 0 && (
                  <section className="block" aria-labelledby="fb-weak-title">
                    <SectionHeader id="fb-weak-title" title="연습이 필요한 질문" meta="답변 내용 점수 낮은 순" />
                    <ul className="rows">
                      {weakQs.map((r, i) => (
                        <li key={i} className="row">
                          <span className="row-main"><span className="row-title wrap">{r.question}</span></span>
                          <span className="row-score"><b className="num">{r.content_score}</b><span className="t-caption">점</span></span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {(strengthSet.length > 0 || improveSet.length > 0) && (
                  <section className="block" aria-labelledby="fb-sw-title">
                    <SectionHeader id="fb-sw-title" title="강점과 개선점" />
                    <div className="two-col">
                      <div>
                        <h3 className="t-label">강점 <span className="num">{strengthSet.length}</span></h3>
                        {strengthSet.length > 0 ? <ul className="bullets">{strengthSet.slice(0, 6).map((t, i) => <li key={i}>{t}</li>)}</ul> : <p className="t-sub">추출된 강점이 아직 없어요.</p>}
                      </div>
                      <div>
                        <h3 className="t-label">개선점 <span className="num">{improveSet.length}</span></h3>
                        {improveSet.length > 0 ? <ul className="bullets">{improveSet.slice(0, 6).map((t, i) => <li key={i}>{t}</li>)}</ul> : <p className="t-sub">추출된 개선점이 아직 없어요.</p>}
                      </div>
                    </div>
                  </section>
                )}

                {trendRows.length > 0 && (
                  <section className="block" aria-labelledby="fb-trend-title">
                    <SectionHeader id="fb-trend-title" title="답변 시간 · 필러워드"
                      meta={`최근 ${trendRows.length}회${fillFirst != null && fillFirst !== 0 ? ` · 필러워드 ${fillFirst > 0 ? `${fillFirst}회 감소` : `${Math.abs(fillFirst)}회 증가`}` : ""}`} />
                    <table className="table">
                      <thead><tr><th scope="col">회차</th><th scope="col">평균 답변 시간</th><th scope="col">필러워드 합계</th></tr></thead>
                      <tbody>
                        {trendRows.map((t) => (
                          <tr key={t.round}>
                            <td className="num">{t.round}회차</td>
                            <td>{t.avgDur != null ? <span className="cell-bar"><Meter value={t.avgDur} max={trendDurMax} label={`평균 ${t.avgDur}초`} tone="muted" /><span className="num">{t.avgDur}초</span></span> : <span className="muted">기록 없음</span>}</td>
                            <td>{t.filler != null ? <span className="cell-bar"><Meter value={t.filler} max={trendFillMax} label={`필러워드 ${t.filler}회`} tone="muted" /><span className="num">{t.filler}회</span></span> : <span className="muted">기록 없음</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}
              </div>

              <aside className="split-side">
                <section className="side-block" aria-labelledby="fb-focus-title">
                  <div className="side-head">
                    <h2 className="t-label" id="fb-focus-title">다음 연습에서 집중할 것</h2>
                    {issueCounts.length > 0 && <span className="t-caption num">{focusDone}/{issueCounts.length}</span>}
                  </div>
                  {issueCounts.length > 0 ? (
                    <ul className="checklist">
                      {issueCounts.map((b) => {
                        const on = fbFocus.includes(b.key);
                        return (
                          <li key={b.key}>
                            <button type="button" className={"check" + (on ? " on" : "")} onClick={() => toggleFbFocus(b.key)} aria-pressed={on}>
                              <span className="check-box" aria-hidden="true">{on && <IconCheck size={12} />}</span>
                              <span>{b.key}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="t-sub">개선 피드백이 쌓이면 다음 연습 과제가 정리돼요.</p>
                  )}
                  <Button variant="primary" block onClick={goMock}>다음 모의면접 시작</Button>
                </section>

                {relatedList.length > 0 && (
                  <section className="side-block" aria-labelledby="fb-rel-title">
                    <div className="side-head">
                      <h2 className="t-label" id="fb-rel-title">분석에 쓰인 기록</h2>
                      <button type="button" className="btn btn-text btn-sm" onClick={goRecords}>전체</button>
                    </div>
                    <ul className="mini-rows">
                      {relatedList.map((s) => (
                        <li key={s.session_id}>
                          <button type="button" onClick={() => openHistoryDetail(s.session_id)}>
                            <span className="mini-title">{sessionTitle(s)}</span>
                            <span className="t-caption num">{fmtDateDot(s.created_at)}</span>
                            <span className="num mini-score">{typeof s.total_score === "number" ? s.total_score : "—"}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
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
    const dGrade = scoreGrade(dTotal);
    const backToList = () => { if (navHint === "feedback") goFeedback(); else if (navHint === "records") goRecords(); else setScreen("home"); };
    const backLabel = navHint === "feedback" ? "피드백 분석으로" : navHint === "records" ? "나의 기록으로" : "돌아가기";

    return renderShell(
      <div className="page detail">
        <PageHeader
          title={sess ? sessionTitle(sess) : "면접 기록 상세"}
          desc={sess ? [sess.sub_job, sess.career, sess.level ? `난이도 ${LEVEL_LABEL[sess.level] || sess.level}` : "", sess.created_at ? fmtDate(sess.created_at) : ""].filter(Boolean).join(" · ") : null}
          actions={<Button variant="text" onClick={backToList}>{backLabel}</Button>} />

        {detailErr ? (
          <EmptyState title="기록을 불러오지 못했어요" desc={detailErr}
            action={lastDetailIdRef.current != null ? "다시 시도" : null} onAction={() => openHistoryDetail(lastDetailIdRef.current)} />
        ) : !sess ? (
          <DetailSkeleton />
        ) : (
          <>
            <div className="kpis">
              <Stat label="종합 점수" value={dTotal != null ? <CountUp value={dTotal} /> : "—"} unit={dTotal != null ? "점" : ""} tone="accent"
                note={dGrade ? <span className={"grade grade-" + dGrade.cls}>{dGrade.label}</span> : null} />
              <Stat label="자세·표정" value={sess.posture_score ?? "—"} unit={sess.posture_score != null ? "점" : ""} />
              <Stat label="답변 내용" value={sess.content_score ?? "—"} unit={sess.content_score != null ? "점" : ""} />
              <Stat label="답변 문항" value={dResults.length} unit="개" />
            </div>

            <section className="block" aria-labelledby="qa-title">
              <SectionHeader id="qa-title" title="문항별 답변" meta={`${dResults.length}개`} />
              <ol className="qa-list">
                {dResults.map((r, i) => (
                  <li className="qa" key={r.result_id ?? i}>
                    <div className="qa-head">
                      <span className="q-no num">Q{i + 1}</span>
                      <p className="qa-q">{r.question}</p>
                      <span className="qa-scores num">자세 {r.posture_score ?? "—"} · 내용 {r.content_score ?? "—"}</span>
                    </div>
                    <div className="qa-block">
                      <span className="t-label">내 답변</span>
                      <p>{r.answer_stt || "(음성 인식 내용 없음)"}</p>
                    </div>
                    {r.feedback && (
                      <details className="disclosure">
                        <summary><IconChevron />피드백 보기</summary>
                        <div className="disclosure-body">{r.feedback}</div>
                      </details>
                    )}
                    {r.model_answer && (
                      <details className="disclosure">
                        <summary><IconChevron />모범 답변 보기</summary>
                        <div className="disclosure-body">{r.model_answer}</div>
                      </details>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}

        <div className="page-foot">
          <Button variant="secondary" onClick={backToList}>
            {navHint === "feedback" ? "피드백 분석으로 돌아가기" : navHint === "records" ? "나의 기록으로 돌아가기" : "돌아가기"}
          </Button>
        </div>
      </div>
    );
  }

  /* ===== 로딩 화면 ===== */
  if (screen === "loading") {
    return renderShell(
      <div className="loading" role="status">
        <InterviewerAvatar state="speaking" size={104} />
        <h1 className="t-section">면접 질문을 준비하고 있어요</h1>
        <p className="t-sub">{[company.trim(), job, sub, career, LEVEL_LABEL[level] || level].filter(Boolean).join(" · ")}</p>
        <p className="t-sub">{resumeText.trim() ? "직무와 자기소개서를 읽고 맞춤 질문을 만들고 있어요" : "직무에 맞는 질문을 고르고 있어요"}</p>
        {qGenActive && (
          <p className="status-line" data-testid="qgen-note"><span className="dot pulse" aria-hidden="true" />자소서를 읽고 맞춤 질문을 만들고 있어요 · {qGenSeconds}초</p>
        )}
        <RotatingTip />
        <Button variant="secondary" onClick={cancelLoading}>취소하고 설정으로 돌아가기</Button>
      </div>
    );
  }

  /* ===== 결과 화면 ===== */
  if (screen === "result") {
    const valid = results.filter(hasAnalysis);
    const failedCount = results.length - valid.length;
    const pVals = valid.filter((r) => isNum(r.posture_score)); // 자세 측정 못 한 문항은 평균에서 제외
    const pAvg = pVals.length
      ? Math.round(pVals.reduce((a, r) => a + r.posture_score, 0) / pVals.length)
      : null;
    const cVals = valid.filter((r) => typeof r.content_score === "number");
    const cAvg = cVals.length
      ? Math.round(cVals.reduce((a, r) => a + r.content_score, 0) / cVals.length)
      : null;
    // 문항별 개선점을 모아 중복 없이 상위 3개 (결과 레일 "다음에 고칠 것")
    const topFixes = [];
    valid.forEach((r) => {
      const imp = r.content && Array.isArray(r.content.improvements) ? r.content.improvements : [];
      imp.forEach((t) => {
        const v = typeof t === "string" ? t.trim() : "";
        if (v && !topFixes.includes(v) && topFixes.length < 3) topFixes.push(v);
      });
    });
    const totalParts = [pAvg, cAvg].filter((v) => v != null);
    const total = totalParts.length
      ? Math.round(totalParts.reduce((a, v) => a + v, 0) / totalParts.length)
      : null;
    const tGrade = scoreGrade(total);

    return renderShell(
      <div className="page result">
        <PageHeader title="모의면접 결과"
          desc={[company.trim(), jobRole, LEVEL_LABEL[level] || level, career, new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric" })].filter(Boolean).join(" · ")} />

        <div className="split">
          <div className="split-main">
            <div className="kpis">
              <Stat label="종합 점수" value={total != null ? <CountUp value={total} /> : "—"} unit={total != null ? "점" : ""} tone="accent"
                note={tGrade ? <span className={"grade grade-" + tGrade.cls}>{tGrade.label}</span> : null} />
              <Stat label="자세·표정" value={pAvg ?? "—"} unit={pAvg != null ? "점" : ""} />
              <Stat label="답변 내용" value={cAvg ?? "—"} unit={cAvg != null ? "점" : ""} />
              {failedCount > 0 && <Stat label="분석 실패" value={failedCount} unit="문항" note="집계에서 제외" />}
            </div>

            <section className="block" aria-labelledby="res-qa-title">
              <SectionHeader id="res-qa-title" title="문항별 피드백" meta={`${results.length}개`} />
              <ol className="qa-list">
                {results.map((r, i) => (
                  <li className="qa" key={i}>
                    <div className="qa-head">
                      <span className="q-no num">Q{i + 1}</span>
                      <p className="qa-q">{r.question}</p>
                      {hasAnalysis(r) && (
                        <span className="qa-scores num">
                          자세 {r.posture_score ?? "—"}
                          {r.score_formula && <span className="ps-formula" title={String(r.score_formula)} aria-label={"자세 점수 계산: " + String(r.score_formula)}>?</span>}
                          {" · "}내용 {typeof r.content_score === "number" ? r.content_score : "—"}
                          {r.content && r.content.grade && <span className="tag">{String(r.content.grade)}</span>}
                        </span>
                      )}
                    </div>

                    {!hasAnalysis(r) ? (
                      <p className="inline-note err">분석 실패 · {r.failReason || "이 답변은 분석하지 못했습니다."} 이 문항은 점수 집계와 기록 저장에서 제외됩니다.</p>
                    ) : (
                      <>
                        {(r.duration_sec != null || r.filler_count != null || r.speech_rate_wpm != null) && (
                          <p className="qa-meta t-caption">
                            {[r.duration_sec != null ? `답변 길이 ${Math.round(r.duration_sec)}초` : "", r.filler_count != null ? `필러워드 ${r.filler_count}회 (참고 지표)` : "", r.speech_rate_wpm != null ? `분당 ${Math.round(r.speech_rate_wpm)}어절` : ""].filter(Boolean).join(" · ")}
                          </p>
                        )}

                        {r.content && r.content.scores && typeof r.content.scores === "object" && !Array.isArray(r.content.scores) && (
                          <ul className="bars compact">
                            {Object.entries(r.content.scores)
                              .filter(([, v]) => typeof v === "number")
                              .map(([k, v]) => (
                                <li key={k}>
                                  <span className="bars-label">{k}</span>
                                  <Meter value={Math.max(0, Math.min(100, v))} max={100} label={`${k} ${v}`} />
                                  <span className="bars-value num">{v}</span>
                                </li>
                              ))}
                          </ul>
                        )}

                        <div className="qa-block">
                          <span className="t-label">내 답변</span>
                          <p>{r.answer_text || "(음성 인식 내용 없음)"}</p>
                        </div>

                        {((r.content && Array.isArray(r.content.strengths) && r.content.strengths.length > 0) || (r.content && Array.isArray(r.content.improvements) && r.content.improvements.length > 0)) && (
                          <div className="two-col">
                            {r.content.strengths && r.content.strengths.length > 0 && (
                              <div>
                                <h3 className="t-label">강점</h3>
                                <ul className="bullets">{r.content.strengths.map((x, k) => <li key={k}>{String(x)}</li>)}</ul>
                              </div>
                            )}
                            {r.content.improvements && r.content.improvements.length > 0 && (
                              <div>
                                <h3 className="t-label">개선점</h3>
                                <ul className="bullets">{r.content.improvements.map((x, k) => <li key={k}>{String(x)}</li>)}</ul>
                              </div>
                            )}
                          </div>
                        )}

                        {r.content && r.content.reasons && (
                          <div className="qa-block">
                            <span className="t-label">점수 이유</span>
                            <p className="pre">{formatReasons(r.content.reasons)}</p>
                          </div>
                        )}

                        {r.content && r.content.model_answer && (
                          <details className="disclosure">
                            <summary><IconChevron />모범 답변 보기</summary>
                            <div className="disclosure-body">{r.content.model_answer}</div>
                          </details>
                        )}
                      </>
                    )}

                    {r.videoUrl && (
                      <details className="disclosure">
                        <summary><IconChevron />내 답변 영상 보기</summary>
                        <div className="disclosure-body">
                          <video className="replay-video" src={r.videoUrl} controls playsInline></video>
                        </div>
                      </details>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="split-side">
            <section className="side-block" aria-label="저장과 다음 행동">
              {saveMsg && (
                <p className={"inline-note" + (saveErr ? " err" : "")} role={saveErr ? "alert" : "status"}>
                  {saveState === "saving" && <BtnSpinner />}{saveMsg}
                </p>
              )}
              {saveState === "error" && (
                <Button variant="secondary" block onClick={() => saveSession(results)}>기록 다시 저장</Button>
              )}
              {topFixes.length > 0 && (
                <>
                  <h2 className="t-label">다음 연습에서 고칠 것</h2>
                  <ol className="bullets numbered">{topFixes.map((t, i) => <li key={i}>{t}</li>)}</ol>
                </>
              )}
              <Button variant="primary" block onClick={() => startWithPreset({ job, sub, level, career, company })} disabled={saveState === "saving"}>같은 조건으로 다시 연습</Button>
              <Button variant="secondary" block onClick={goRecords} disabled={saveState === "saving"}>나의 기록 보기</Button>
              <Button variant="text" block onClick={() => { if (confirmLeaveInterview()) goHome(); }}>홈으로</Button>
            </section>
          </aside>
        </div>
      </div>
    );
  }

  /* ===== 면접 진행 화면 ===== */
  if (screen === "interview") {
    const total = questions.length;
    const isLast = qIndex + 1 >= total;
    // 지금 실제로 녹화 중인지 + 단계별 안내 문구 (낭독·녹화·다시 듣기·분석·실패를 구분)
    const liveRecording = phase === "live" && !recPending && !replaying && !busy && !failedAnswer && !recError && !camError;
    const liveStatus = recPending
      ? { badge: "질문 듣는 중", msg: "낭독이 끝나면 녹화가 시작돼요 · 답변을 준비하세요", state: "질문을 듣고 있어요..." }
      : replaying
        ? { badge: "녹화 일시정지", msg: "질문을 다시 읽는 중이에요 · 끝나면 녹화가 이어져요", state: "질문을 다시 듣는 동안 녹화를 멈췄어요" }
        : busy
          ? { badge: "녹화 완료 · 분석 중", msg: "녹화를 마쳤어요 · 지금 말하는 내용은 녹음되지 않아요", state: "녹화를 마쳤어요 — 답변을 분석하고 있어요" }
          : failedAnswer
            ? { badge: "녹화 멈춤", msg: "오른쪽에서 다시 분석하거나 다시 답변할 수 있어요", state: "녹화가 멈춰 있어요" }
            : recError
              ? { badge: "녹화 오류", msg: "'다시 답변'을 눌러 다시 녹화해주세요", state: "녹화가 멈춰 있어요" }
              : { badge: "REC", msg: "답변이 끝나면 '답변 완료'를 눌러주세요", state: "답변을 녹화하고 있어요" };

    /* 녹화 전 준비 화면 (카메라 미리보기 + 안내) → 3-2-1 카운트다운 → 녹화 개시 */
    if (phase !== "live") {
      return renderShell(
        <div className="page interview-ready">
          <PageHeader title="면접 준비" desc="카메라 속 내 모습과 마이크를 확인하고, 준비되면 면접을 시작하세요. 아직 녹화 전이에요." />
          <div className="imain ready-main">
            <div className="cam-area">
              {camError ? (
                <CamErrorPanel message={camError} onRetry={() => connectDevices()} />
              ) : (
                <>
                  <video ref={videoRef} autoPlay muted playsInline></video>
                  {camState === "connecting" && (
                    <div className="count-overlay connecting" role="status"><span>카메라·마이크를 연결하고 있어요...<br />브라우저 권한 요청이 뜨면 '허용'을 눌러주세요</span></div>
                  )}
                  {phase === "countdown" && (
                    <div className="count-overlay" role="status" aria-live="assertive"><b>{countdown}</b><span>곧 녹화가 시작됩니다</span></div>
                  )}
                  <div className="cam-msg">아직 녹화 전이에요 · 자세와 조명을 점검해보세요</div>
                </>
              )}
            </div>
            <div className="iside">
              <div className="card">
                <div className="card-t"><IconMic />마이크 확인</div>
                <div className="hint-line">말해보세요. 막대가 움직이면 마이크가 정상이에요.</div>
                <MicMeter barRef={levelRef} />
                {micSilent && camState === "ready" && (
                  <div className="mic-warn" role="alert">마이크 소리가 들어오지 않아요. 음소거나 입력 장치를 확인해주세요.</div>
                )}
                {(devices.cams.length > 1 || devices.mics.length > 1) && (
                  <div className="dev-select">
                    {devices.cams.length > 1 && (
                      <label className="rs-sel">
                        <span className="rs-sel-k">카메라</span>
                        <select value={camId} onChange={(e) => { setCamId(e.target.value); connectDevices({ camId: e.target.value }); }} disabled={phase === "countdown"}>
                          <option value="">기본 카메라</option>
                          {devices.cams.map((d, i) => <option key={d.deviceId || i} value={d.deviceId}>{d.label || `카메라 ${i + 1}`}</option>)}
                        </select>
                      </label>
                    )}
                    {devices.mics.length > 1 && (
                      <label className="rs-sel">
                        <span className="rs-sel-k">마이크</span>
                        <select value={micId} onChange={(e) => { setMicId(e.target.value); connectDevices({ micId: e.target.value }); }} disabled={phase === "countdown"}>
                          <option value="">기본 마이크</option>
                          {devices.mics.map((d, i) => <option key={d.deviceId || i} value={d.deviceId}>{d.label || `마이크 ${i + 1}`}</option>)}
                        </select>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary btn-lg btn-block ready-start"
                onClick={beginInterview}
                disabled={!!camError || camState !== "ready" || phase === "countdown"}
              >
                {phase === "countdown" ? `${countdown}초 후 시작...` : camState === "connecting" ? "카메라 연결 중..." : "면접 시작"}
              </button>
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
                {workerStatus && workerStatus.online === false && (
                  <div className="ready-warn">AI 분석 서버가 대기 상태예요. 답변 결과가 평소보다 늦게 나올 수 있어요.</div>
                )}
                <div className="hint-line ready-guide">
                  · 질문마다 답변을 녹화하고 '답변 완료'를 누르면 다음 질문으로 넘어가요<br />
                  · 답변 영상은 분석 직후 삭제되며, 답변 텍스트와 점수만 기록에 저장됩니다
                </div>
              </div>
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
          <div className="ibar-right">
            {results.length > 0 && !busy && (
              <button className="ibar-end" onClick={() => finishEarly()}>여기까지 저장하고 끝내기</button>
            )}
            <div className="timer" aria-hidden="true">
              <span className={"rec" + (liveRecording ? "" : " off")}></span>{mm}:{ss}
            </div>
          </div>
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
                  onClick={replayQuestion}
                  disabled={ttsMuted || recPending || replaying || busy || !!failedAnswer}
                >
                  <IconReplay />
                  <span>{replaying ? "다시 읽는 중..." : "질문 다시 듣기"}</span>
                </button>
                <span className="av-hint">다시 듣는 동안 녹화는 잠시 멈춰요</span>
              </div>
            </div>
          </div>

          <div className="cam-area">
            {camError ? (
              <CamErrorPanel message={camError} onRetry={() => connectDevices()} after="다시 연결되면 '다시 답변'을 눌러 이 질문부터 이어가세요." />
            ) : (
              <>
                <video ref={videoRef} autoPlay muted playsInline></video>
                <div className={"cam-rec" + (liveRecording ? "" : " listening")}><span className="d"></span>{liveStatus.badge}</div>
                <div className="cam-msg">{liveStatus.msg}</div>
                {busy && <AnalysisOverlay note={analysisNote} seconds={analysisSeconds} canFinish={results.length > 0} onFinish={() => finishEarly(true)} workerOnline={workerStatus ? workerStatus.online : null} />}
              </>
            )}
          </div>

          <div className="iside">
            {recError && <div className="mic-warn" role="alert">{recError}</div>}
            {failedAnswer ? (
              <div className="card fail-card" role="alert">
                <div className="card-t">이 답변을 분석하지 못했어요</div>
                <div className="hint-line">{failedAnswer.reason}</div>
                <div className="fail-actions">
                  {(failedAnswer.blob || failedAnswer.jobId != null) && (
                    <button className="btn-done" onClick={retryAnalysis}>다시 분석</button>
                  )}
                  <button className="btn-redo" onClick={redoFailed} disabled={!!camError}>다시 답변</button>
                  <button className="btn-redo" onClick={skipFailed}>건너뛰기</button>
                </div>
              </div>
            ) : (
              <div className="ictrl">
                <button className="btn-redo" onClick={handleRedo} disabled={busy || recPending || replaying || !!camError}>다시 답변</button>
                <button className="btn-done" onClick={handleDone} disabled={busy || recPending || replaying || !!recError || !!camError}>
                  {busy ? <><BtnSpinner />분석 중...</> : isLast ? "면접 마치기" : "답변 완료"}
                </button>
              </div>
            )}
            {busy && (
              <div className="analysis-note" role="status">
                <span className="d"></span>
                {(analysisNote || "답변을 분석하고 있어요")} · {analysisSeconds}초 경과
              </div>
            )}
            <div className="card">
              <div className="card-t"><IconMic />녹화 상태</div>
              <div className={"rec-state" + (liveRecording ? "" : " listen")} role="status"><span className="d"></span>{liveStatus.state}</div>
              <MicMeter barRef={levelRef} />
              {micSilent && liveRecording && (
                <div className="mic-warn" role="alert">마이크 소리가 들어오지 않아요. 음소거나 입력 장치를 확인해주세요.</div>
              )}
            </div>
            <div className="card tips-card">
              <div className="card-t"><IconTip />면접 팁</div>
              <div className="hint-line">
                · 카메라(렌즈)를 면접관이라 생각하고 바라보세요<br />
                · 어깨를 펴고 바른 자세를 유지하세요<br />
                · 결론부터 말하고 구체적 경험을 덧붙이면 좋아요
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ===== 면접 설정 화면 ===== */
  if (screen === "start") {
    if (!jobData) {
      if (jobsErr) {
        return renderShell(
          <div className="page">
            <PageHeader title="모의면접 설정" />
            <EmptyState title="직무 목록을 불러오지 못했어요" desc="인터넷 연결을 확인한 뒤 다시 시도해주세요." action="직무 목록 다시 불러오기" onAction={loadJobs} />
          </div>
        );
      }
      return renderShell(<SetupSkeleton />);
    }
    const jobNames = Object.keys(jobData);
    const lvMeta = SETUP_LEVELS.find((l) => l.key === level);
    const crMeta = SETUP_CAREERS.find((c) => c.key === career);
    const canStart = !!(job && sub);
    const resumeOn = !!resumeText.trim();
    const STEPS = [
      { key: "job", label: "직무 선택", value: job ? `${job}${sub ? " · " + sub : ""}` : "" },
      { key: "company", label: "회사 선택", value: company.trim() || "지정 안 함", optional: true },
      { key: "level", label: "경력·난이도", value: `${career} · ${LEVEL_LABEL[level] || level}` },
      { key: "resume", label: "자기소개서 적용", value: resumeOn ? `${resumeText.length.toLocaleString()}자 적용` : "적용 안 함", optional: true },
      { key: "start", label: "면접 시작", value: "" },
    ];
    const stepNo = (i) => String(i + 1).padStart(2, "0");
    const go = (i) => setSetupStep(Math.max(0, Math.min(STEPS.length - 1, i)));
    const cur = STEPS[setupStep] || STEPS[0];
    const stepDone = (i) => (i === 0 ? canStart : i === 1 ? !!company.trim() : i === 3 ? resumeOn : false);

    return renderShell(
      <div className="page setup">
        <PageHeader title="모의면접 설정" actions={<Button variant="text" onClick={goJobs}>채용공고에서 고르기</Button>} />

        <nav className="stepper" aria-label="면접 설정 단계">
          <ol>
            {STEPS.map((st, i) => (
              <li key={st.key}>
                <button type="button" className={"stepper-item" + (i === setupStep ? " on" : "") + (stepDone(i) && i !== setupStep ? " done" : "")}
                  aria-current={i === setupStep ? "step" : undefined} onClick={() => go(i)}>
                  <span className="stepper-no num">{stepNo(i)}</span>
                  <span className="stepper-label">{st.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="setup-layout">
          <section className="setup-main" aria-labelledby="setup-step-title">
            <header className="step-head">
              <span className="step-no num">{stepNo(setupStep)}</span>
              <h2 className="t-section" id="setup-step-title">{cur.label}</h2>
              {cur.optional && <span className="tag">선택</span>}
            </header>

            {setupStep === 0 && (
              <div className="step-body">
                <Segmented label="직무 찾는 방법" value={jobTab} onChange={setJobTab}
                  options={[{ value: "dept", label: "학과로 찾기" }, { value: "job", label: "직무로 찾기" }]} />

                {jobTab === "dept" ? (
                  <>
                    <Field label="학과" htmlFor="dept-input" hint={deptPick ? null : "대전대학교 학과를 검색하거나 목록에서 고르세요. 선배들의 주요 진로가 나와요."}>
                      <div className="combo" ref={deptBoxRef}>
                        <Lucide.Search size={16} className="combo-ic" aria-hidden="true" />
                        <input
                          id="dept-input"
                          className="input input-search"
                          type="text"
                          value={deptQuery}
                          maxLength={30}
                          placeholder={deptPick ? deptPick.dept.name : "학과명 검색 (예: 정보통신공학과)"}
                          onChange={(e) => { setDeptQuery(e.target.value); setDeptOpen(true); setDeptIdx(-1); }}
                          onFocus={() => setDeptOpen(true)}
                          onClick={() => setDeptOpen(true)}
                          onKeyDown={handleDeptKey}
                          role="combobox"
                          autoComplete="off"
                          aria-expanded={deptOpen}
                          aria-autocomplete="list"
                          aria-controls="dept-listbox"
                          aria-activedescendant={deptOpen && deptIdx >= 0 && deptResults[deptIdx] ? `dept-listbox-opt-${deptIdx}` : undefined}
                        />
                        {deptQuery.trim() !== "" && (
                          <button type="button" className="btn btn-text btn-sm combo-clear" onClick={() => { setDeptQuery(""); setDeptIdx(-1); }}>지우기</button>
                        )}
                        {deptOpen && (
                          <ComboList id="dept-listbox" label="학과 목록" items={deptResults} activeIdx={deptIdx}
                            getKey={(d) => d.name}
                            groupOf={deptQ ? null : (d) => d.college}
                            renderItem={(d) => <><span className="combo-name">{markMatch(d.name, deptQ)}</span>{deptQ && <span className="combo-meta">{d.college}</span>}{deptPick && deptPick.dept.name === d.name && <IconCheck size={13} />}</>}
                            onPick={pickDept} onHover={setDeptIdx}
                            empty={`'${deptQ}'와 일치하는 학과가 없어요. '직무로 찾기'를 이용해보세요`} />
                        )}
                      </div>
                    </Field>

                    {deptPick && (
                      <fieldset className="opt-group" key={deptPick.dept.name}>
                        <legend className="field-label">{deptPick.dept.name} 선배들의 주요 진로</legend>
                        <div className="opt-grid cols-2">
                          {deptPick.dept.careers.map((c) => {
                            const active = deptPick.careerLabel === c.label && job === c.job && sub === c.sub;
                            return (
                              <button type="button" key={c.label + c.job + c.sub} className={"opt" + (active ? " on" : "")}
                                aria-pressed={active} onClick={() => pickCareer(c)}>
                                <span className="opt-radio" aria-hidden="true" />
                                <span className="opt-name">{c.label}</span>
                                <span className="opt-meta">{c.job} · {c.sub}</span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}
                  </>
                ) : (
                  <>
                    <fieldset className="opt-group">
                      <legend className="field-label">직무</legend>
                      <div className="opt-grid">
                        {jobNames.map((name) => (
                          <button type="button" key={name} className={"opt" + (job === name ? " on" : "")}
                            aria-pressed={job === name} onClick={() => selectJob(name)}>
                            <span className="opt-radio" aria-hidden="true" />
                            <span className="opt-name">{name}</span>
                            <span className="opt-meta">{jobMeta(name).tag}</span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    {job && jobData[job] && (
                      <fieldset className="opt-group" key={job}>
                        <legend className="field-label">{job} 세부 직무</legend>
                        <div className="chips">
                          {(jobData[job].subs || []).map((sb) => (
                            <button type="button" key={sb} className={"chip" + (sub === sb ? " on" : "")} aria-pressed={sub === sb} onClick={() => setSub(sb)}>
                              {sub === sb && <IconCheck size={12} />}{sb}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    )}
                  </>
                )}
              </div>
            )}

            {setupStep === 1 && (
              <div className="step-body">
                <Field label="지원 회사" htmlFor="company-input" hint="입력하면 기록에 회사 이름이 함께 남아요. 비워두면 직무 공통 질문으로 진행해요.">
                  <div className="combo" ref={companyBoxRef}>
                    <Lucide.Search size={16} className="combo-ic" aria-hidden="true" />
                    <input
                      id="company-input"
                      className="input input-search"
                      type="text"
                      value={company}
                      maxLength={40}
                      placeholder="회사명 검색 또는 직접 입력 (예: 한화시스템)"
                      onChange={(e) => { setCompany(e.target.value); setCoOpen(true); setCoIdx(-1); }}
                      onFocus={() => setCoOpen(true)}
                      onKeyDown={handleCompanyKey}
                      role="combobox"
                      autoComplete="off"
                      aria-expanded={coOpen && coQuery !== ""}
                      aria-autocomplete="list"
                      aria-controls="company-listbox"
                      aria-activedescendant={coOpen && coIdx >= 0 && coResults[coIdx] ? `company-listbox-opt-${coIdx}` : undefined}
                    />
                    {company.trim() !== "" && (
                      <button type="button" className="btn btn-text btn-sm combo-clear" onClick={() => { setCompany(""); setCoOpen(false); setCoIdx(-1); }}>지우기</button>
                    )}
                    {coOpen && coQuery !== "" && (
                      <ComboList id="company-listbox" label="회사 검색 결과" items={coResults} activeIdx={coIdx}
                        getKey={(c) => c.name}
                        renderItem={(c) => <><span className="combo-name">{markMatch(c.name, coQuery)}</span><span className="combo-meta">{c.industry}</span></>}
                        onPick={(c) => pickCompany(c.name)} onHover={setCoIdx}
                        empty={`'${coQuery}' 그대로 사용돼요`} />
                    )}
                  </div>
                </Field>
                <div className="opt-group">
                  <span className="field-label">자주 찾는 회사</span>
                  <div className="chips">
                    {COMPANY_QUICK.map((name) => (
                      <button type="button" key={name} className={"chip" + (company.trim() === name ? " on" : "")}
                        aria-pressed={company.trim() === name} onClick={() => setCompany(company.trim() === name ? "" : name)}>
                        {company.trim() === name && <IconCheck size={12} />}{name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {setupStep === 2 && (
              <div className="step-body">
                <div className="opt-group">
                  <span className="field-label">경력</span>
                  <Segmented label="경력 구분" value={career} onChange={setCareer}
                    options={SETUP_CAREERS.map((c) => ({ value: c.key, label: c.key }))} />
                  {crMeta && <p className="field-hint">{crMeta.desc}</p>}
                </div>
                <div className="opt-group">
                  <span className="field-label">난이도</span>
                  <Segmented label="난이도" value={level} onChange={setLevel}
                    options={SETUP_LEVELS.map((l) => ({ value: l.key, label: l.name }))} />
                  {lvMeta && <p className="field-hint">{lvMeta.desc}</p>}
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div className="step-body">
                {workerStatus && (
                  <p className={"status-line " + (workerStatus.online ? "ok" : "warn")} data-testid="worker-chip">
                    <span className="dot" aria-hidden="true" />
                    {workerStatus.online ? "AI 맞춤 질문을 만들 수 있어요" : "지금은 기본 질문으로 진행돼요 (분석 서버 대기 중)"}
                  </p>
                )}
                <Segmented label="자기소개서 입력 방법" value={resumeTab} onChange={setResumeTab}
                  options={[{ value: "file", label: "파일 업로드", icon: <IconClip /> }, { value: "text", label: "직접 붙여넣기", icon: <IconEdit /> }]} />
                {resumeTab === "file" ? (
                  <div className="dropzone">
                    <input ref={resumeFileRef} type="file" accept=".txt,.docx,.pdf" style={{ display: "none" }} onChange={handleResumeFile} />
                    <Button variant="secondary" disabled={resumeUploading} onClick={() => resumeFileRef.current && resumeFileRef.current.click()}>
                      {resumeUploading ? <BtnSpinner /> : <IconClip />}{resumeUploading ? "불러오는 중..." : "파일 선택"}
                    </Button>
                    <p className="t-caption">.txt · .docx · .pdf, 5MB 이하. 내용을 읽어 붙여넣기 칸에 채워요.</p>
                    {resumeFileMsg && <p className={"inline-note" + (resumeFileErr ? " err" : " ok")}>{resumeFileMsg}</p>}
                  </div>
                ) : (
                  <div className="textarea-wrap">
                    <textarea className="textarea" aria-label="자기소개서 내용" placeholder="자기소개서 내용을 붙여넣으세요" value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
                    <div className="textarea-foot">
                      <span>이 브라우저에 자동 보관돼요</span>
                      <span className="num">{resumeText.length.toLocaleString()}자</span>
                    </div>
                  </div>
                )}
                <p className="field-hint">붙이지 않아도 면접은 진행돼요. 붙이면 내용 기반 질문이 추가돼요.</p>
              </div>
            )}

            {setupStep === 4 && (
              <div className="step-body">
                <dl className="review">
                  {STEPS.slice(0, 4).map((st, i) => (
                    <div key={st.key}>
                      <dt>{st.label}</dt>
                      <dd className={i === 0 && !canStart ? "unset" : ""}>{i === 0 && !canStart ? "선택 전" : st.value}</dd>
                      <button type="button" className="btn btn-text btn-sm" onClick={() => go(i)}>변경</button>
                    </div>
                  ))}
                </dl>
                <p className="t-sub">질문 {EXPECT_Q}개 내외 · 예상 {estDuration(EXPECT_Q)} · 다음 화면에서 카메라와 마이크를 확인해요.</p>
                <div className="step-cta">
                  <Button variant="primary" size="lg" onClick={startInterview} disabled={!canStart}>면접 시작</Button>
                  {!canStart && <span className="inline-note err">01 직무 선택에서 세부 직무까지 골라주세요.</span>}
                </div>
              </div>
            )}

            {setupStep < 4 && (
              <footer className="step-nav">
                {setupStep > 0 ? <Button variant="text" onClick={() => go(setupStep - 1)}>이전</Button> : <span />}
                <Button variant="primary" onClick={() => go(setupStep + 1)}>
                  {cur.optional && !stepDone(setupStep) ? "건너뛰기" : "다음"}: {STEPS[setupStep + 1].label}
                </Button>
              </footer>
            )}
          </section>

          <aside className="setup-summary" aria-labelledby="setup-sum-title">
            <h2 className="t-section" id="setup-sum-title">선택한 조건</h2>
            <dl className="sum-list">
              {deptPick && (
                <div><dt>학과</dt><dd>{deptPick.dept.name}</dd></div>
              )}
              <div><dt>직무</dt><dd className={job ? "" : "unset"} data-testid="hero-job">{job || "선택 전"}</dd></div>
              <div><dt>세부 직무</dt><dd className={sub ? "" : "unset"} data-testid="hero-sub">{sub || "선택 전"}</dd></div>
              <div><dt>회사</dt><dd className={company.trim() ? "" : "unset"}>{company.trim() || "지정 안 함"}</dd></div>
              <div><dt>경력</dt><dd>{career}</dd></div>
              <div><dt>난이도</dt><dd>{LEVEL_LABEL[level] || level}</dd></div>
              <div><dt>자기소개서</dt><dd className={resumeOn ? "" : "unset"}>{resumeOn ? `${resumeText.length.toLocaleString()}자` : "적용 안 함"}</dd></div>
            </dl>
            <p className="t-caption">질문 {EXPECT_Q}개 내외 · 예상 {estDuration(EXPECT_Q)} · 카메라·마이크 필요</p>
            {setupStep < 4 && (
              <Button variant="secondary" block onClick={startInterview} disabled={!canStart} data-testid="rail-start"
                title={!canStart ? "직무를 먼저 골라주세요" : undefined}>
                이 조건으로 바로 시작
              </Button>
            )}
            {!canStart && <p className="t-caption">직무와 세부 직무를 고르면 시작할 수 있어요.</p>}
          </aside>
        </div>

        {/* 좁은 화면(≤1100px): 하단 고정 요약 바 */}
        <div className="setup-bar">
          <div className="setup-bar-sum">{[company.trim(), job || "직무 선택 전", sub, career, LEVEL_LABEL[level] || level].filter(Boolean).join(" · ")}</div>
          <Button variant="primary" size="sm" onClick={startInterview} disabled={!canStart}>면접 시작</Button>
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
  const statUnknown = dashErr && historyData == null; // 조회 실패: "0회"가 아니라 "-"로 표시
  const lastScore =
    Array.isArray(historyData) && historyData.length > 0 && typeof historyData[0].total_score === "number"
      ? historyData[0].total_score
      : null;

  const WEEK_GOAL = 3; // 성장 화면 '주 3회 연습' 목표와 동일
  const recentList = Array.isArray(historyData) ? historyData.slice(0, 5) : [];

  const lastSess = Array.isArray(historyData) && historyData.length > 0 ? historyData[0] : null;
  // 공고 추천 기준 직무: 최근 면접 → 없으면 첫 관심 회사의 직무
  const dreamList = loadDreams(userEmail);
  const postJob = lastSess && lastSess.job
    ? { job: lastSess.job, sub: lastSess.sub_job || "", career: lastSess.career || "" }
    : dreamList[0] ? { job: dreamList[0].job || "", sub: dreamList[0].sub || "", career: "" } : { job: "", sub: "", career: "" };
  const lastPreset = lastSess
    ? { job: lastSess.job, sub: lastSess.sub_job, company: lastSess.company, level: lastSess.level, career: lastSess.career }
    : null;

  // 최근 피드백이 비었거나 "[object Object]"가 섞인 깨진 문자열이면 기본 코칭 문구로 대체
  const hasHistory = Array.isArray(historyData) && historyData.length > 0;
  const coachTips = coachPoints.length > 0 ? coachPoints.slice(0, 2) : COACH_STATIC_TIPS;

  const dispJob = job || lastSess?.job || "";
  const dispSub = job ? sub : (lastSess?.sub_job || "");
  const pickHomeSub = (v) => { if (!job && dispJob) selectJob(dispJob); setSub(v); };
  const homeLoading = !dashLoaded && historyData == null;
  // "조건 갖춰짐" = 면접 설정의 canStart(직무 && 세부직무)와 같은 기준 + 직무 목록에 실제로 있는 값
  const homeReady = !!(jobData && dispJob && jobData[dispJob] && dispSub && (jobData[dispJob].subs || []).includes(dispSub));
  // 홈 데이터 요청 3묶음(직무 목록 / 면접 기록 / 추천 공고) 중 2개 이상 실패 → 페이지 상단 공통 오류 한 줄
  const jobsFail = jobsErr && !jobData;
  const homeFails = [jobsFail, statUnknown, postErr].filter(Boolean).length;
  const homeQuiet = homeFails >= 2;
  const retryHome = () => {
    if (jobsFail) loadJobs();
    if (dashErr) setDashReload((n) => n + 1);
    if (postErr) setPostReload((n) => n + 1);
  };
  // 조건이 갖춰졌으면 설정의 마지막 단계(05 면접 시작)로, 아니면 01 직무 선택부터
  const startFromHome = () => {
    if (!job && lastSess && homeReady) startWithPreset(lastPreset); else goMock();
    if (homeReady) setSetupStep(4);
  };

  return renderShell(
    <div className="page home">
      <HomeHeader name={emailName} date={greetDate} />
      {homeQuiet && <HomeNotice global onRetry={retryHome} />}

      <div className="home-grid">
        <div className="home-lead">
          <InterviewHero
            jobPicker={<JobSelector data={jobData} value={dispJob} subValue={dispSub} onSelect={selectJob} onSub={pickHomeSub}
              error={jobsErr} quiet={homeQuiet} errorSlot={<HomeNotice text="직무 목록을 불러오지 못했어요" onRetry={loadJobs} />} />}
            career={!job && lastSess ? lastSess.career : career} level={LEVEL_LABEL[!job && lastSess ? lastSess.level : level]}
            company={!job && lastSess ? lastSess.company : company}
            ready={homeReady}
            onStart={startFromHome} onEdit={goMock}
            onGuide={() => setShowGuide(true)} guideRef={guideBtnRef}>
            <PreparationProgress savedResume={rsSaved} selectedJob={dispJob} companies={dreamList}
              count={totalCount || 0} weeklyCount={weeklyCount} weekGoal={WEEK_GOAL}
              lastScore={lastScore} lastDate={lastSess ? fmtDateDot(lastSess.created_at) : ""}
              loading={homeLoading} unknown={statUnknown}
              onSelectJob={goMock} onResume={goResume} onInterview={goMock} />
          </InterviewHero>
        </div>

        <aside className="home-side" aria-label="개인 준비">
          <TodayPreparation hasHistory={hasHistory} tips={coachTips} checklist={CHECKLIST_ITEMS} checks={checks}
            onToggleCheck={toggleCheck} onFeedback={goFeedback} />
          <div className="home-dreams">
            <DreamCompanies key={userEmail} email={userEmail} jobData={jobData} onStart={startWithPreset}
              onChange={() => setDreamVer((n) => n + 1)} />
          </div>
        </aside>

        <div className="home-recent">
          <RecentInterviewCard session={lastSess} sessions={recentList} loading={homeLoading}
            unknown={statUnknown} quiet={homeQuiet} onRetry={() => setDashReload((n) => n + 1)} onStart={goMock}
            onRecords={goRecords} onDetail={openHistoryDetail} />
        </div>

        <div className="home-posts">
          <JobPostings api={API} job={job || postJob.job} sub={sub || postJob.sub} career={career || postJob.career}
            companies={dreamList.map((d) => d.company)} onPractice={startWithPreset} onBrowse={goJobs}
            onStatus={setPostErr} reloadKey={postReload} quiet={homeQuiet} />
        </div>
      </div>

      {/* 면접 이용 가이드 모달 */}
      {showGuide && (
        <div className="modal-overlay" onClick={() => setShowGuide(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="t-section" id="guide-title">모의면접 진행 방법</h2>
              <button className="btn btn-text btn-sm" ref={guideCloseRef} onClick={() => setShowGuide(false)}>닫기</button>
            </div>
            <ol className="steps-list">
              <li><b>면접 설정</b><p>직무·회사·경력·난이도를 고르고, 자기소개서를 붙이면 맞춤 질문이 만들어져요.</p></li>
              <li><b>카메라 확인 후 시작</b><p>준비 화면에서 카메라를 확인하고 [면접 시작]을 누르면 3초 뒤 녹화가 시작돼요.</p></li>
              <li><b>질문별 답변</b><p>질문마다 답변을 녹화하고 '답변 완료'를 누르면 자세·표정과 답변 내용을 분석해요.</p></li>
              <li><b>결과·기록 확인</b><p>점수와 피드백, 모범 답변을 확인하고 '나의 기록'에서 지난 면접을 다시 볼 수 있어요.</p></li>
            </ol>
            <p className="t-sub modal-foot">결론부터 말하고 경험과 숫자를 덧붙이면 좋은 평가를 받아요. 카메라 렌즈를 면접관의 눈이라 생각하고 바라보세요.</p>
          </div>
        </div>
      )}
    </div>
  );
}
