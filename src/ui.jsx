import * as Lucide from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { COMPANIES } from "./companies";

/* ============================================================
   공용 표시 프리미티브 (App.jsx / Growth.jsx 공유)
   - 모션·게이지·카운트업, 기록 로고 칩, 등급 뱃지, 날짜 포맷, 라인 차트
   - 라이브러리 미사용, 인라인 SVG
   ============================================================ */

/* ===== 인증 만료 공용 처리 (App.jsx / Growth.jsx 공유) =====
   - authFetch: fetch 래퍼. 응답이 401이면 등록된 핸들러(자동 로그아웃·토스트)를 부르고 AuthExpiredError를 던진다
   - 호출부 catch에서는 isAuthExpired(e)면 조용히 빠져나온다 (중복 오류 문구 방지)
   - 로그인/회원가입(/login, /signup)은 401이 "자격 증명 오류"이므로 이 래퍼를 쓰지 않는다 */
let authExpiredHandler = null;
export function setAuthExpiredHandler(fn) { authExpiredHandler = typeof fn === "function" ? fn : null; }
export class AuthExpiredError extends Error {
  constructor() { super("auth"); this.name = "AuthExpiredError"; }
}
export function isAuthExpired(e) { return !!e && (e instanceof AuthExpiredError || e.message === "auth"); }
export async function authFetch(url, opts) {
  const res = await fetch(url, opts);
  if (res.status === 401) {
    // 요청에 실린 토큰을 넘겨, 이미 다른 계정으로 바뀐 뒤의 옛 요청 401이 현재 로그인을 끊지 않게 한다
    let reqToken = null;
    try {
      const h = opts && opts.headers;
      const auth = h ? (typeof h.get === "function" ? h.get("Authorization") : h.Authorization || h.authorization) : null;
      if (auth && auth.startsWith("Bearer ")) reqToken = auth.slice(7);
    } catch (e) {}
    try { if (authExpiredHandler) authExpiredHandler(reqToken); } catch (e) {}
    throw new AuthExpiredError();
  }
  return res;
}

/* ===== 모션 환경 감지 (prefers-reduced-motion이면 JS 애니메이션도 건너뜀) ===== */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* 숫자 카운트업: 결과 게이지·대시보드 도넛 중앙 숫자 (0 → 목표치, ease-out) */
export function CountUp({ value, duration = 800, suffix = "" }) {
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
export function ArcProgress({ value, max = 100, r, strokeWidth, size, rotated = false, track = "var(--lav)", color = "var(--primary)" }) {
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
export function AnimatedBar({ pct, className, style }) {
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
export const keyActivate = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
};

/* 점수 뱃지: 80↑ 우수(민트) / 60↑ 보통(블루) / 미만 개선 필요(피치) */
export function scoreGrade(score) {
  if (typeof score !== "number") return null;
  return score >= 80
    ? { cls: "good", label: "우수" }
    : score >= 60
      ? { cls: "mid", label: "보통" }
      : { cls: "low", label: "개선 필요" };
}
export function ScoreBadge({ score }) {
  const grade = scoreGrade(score);
  if (!grade) return null;
  return <span className={"score-badge " + grade.cls}>{grade.label}</span>;
}

/* companies.js 데이터셋 기반 워드마크 조회 (이름·별칭 정확 일치, 공백 무시·대소문자 무시) */
export const BRAND_LOOKUP = (() => {
  const norm = (s) => String(s).toLowerCase().replace(/\s+/g, "");
  const map = new Map();
  for (const c of COMPANIES) for (const a of c.aliases) map.set(norm(a), c); // 별칭 (예: "토스" → 비바리퍼블리카)
  for (const c of COMPANIES) map.set(norm(c.name), c); // 정식 이름이 별칭보다 우선
  return map;
})();

/* 기록 리스트/상세용 로고 칩: 브랜드 워드마크 → 회사 이니셜 → 직무 이니셜 순 폴백 */
export function RecordLogo({ company, job, idx = 0 }) {
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

/* 세션 명칭 통일 규칙: "{회사} {직무} 면접" / 회사 없으면 "{직무} 면접" (직무 없으면 "모의면접") */
export function sessionTitle(s) {
  const company = s && s.company != null ? String(s.company).trim() : "";
  const job = s && s.job != null ? String(s.job).trim() : "";
  if (!job) return company ? `${company} 모의면접` : "모의면접";
  return company ? `${company} ${job} 면접` : `${job} 면접`;
}

export function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* 최근 기록 리스트용 YYYY.MM.DD */
export function fmtDateDot(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/* 차트 x축 보조 라벨용 M/D */
export function fmtMD(s) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/* 이번 주(월요일 00:00) 시작 시각 */
export function weekStartDate(base = new Date()) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

/* ===== 공용 소형 아이콘 ===== */
export function IconCheck({ size = 11 }) {
  return <Lucide.Check size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconChevron({ size = 14 }) {
  return <Lucide.ChevronRight size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconArrowR({ size = 15 }) {
  return <Lucide.ArrowRight size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconTrendUp({ size = 14 }) {
  return <Lucide.TrendingUp size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconTrendDown({ size = 14 }) {
  return <Lucide.TrendingDown size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconTrendFlat({ size = 14 }) {
  return <Lucide.MoveRight size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconTrophy({ size = 15 }) {
  return <Lucide.Trophy size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconCalendarSm({ size = 14 }) {
  return <Lucide.CalendarDays size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconTarget({ size = 15 }) {
  return <Lucide.Target size={size} strokeWidth={1.8} aria-hidden="true" />;
}
export function IconPlay({ size = 14 }) {
  return <Lucide.Play size={size} strokeWidth={1.8} aria-hidden="true" />;
}

/* ============================================================
   라인 차트 (회차별 점수) — 인라인 SVG
   points: [{ round, created_at?, [seriesKey]: number }]
   series: [{ key, label, color, area? }]  (첫 계열이 주계열: 값 라벨·면 채움)
   goal:   기준선 값 (예: 80 = "우수")
   ============================================================ */
export function LineChart({ points, series, goal = 80, goalLabel = "우수 80", ariaLabel = "회차별 점수 추이", height = 280, valueLabels = true }) {
  const W = 760, H = height;
  const PL = 44, PR = 22, PT = 26, PB = 44;
  const iw = W - PL - PR, ih = H - PT - PB;
  const n = points.length;
  const x = (i) => (n === 1 ? PL + iw / 2 : PL + (i / (n - 1)) * iw);
  const y = (v) => PT + ih - (Math.max(0, Math.min(100, typeof v === "number" ? v : 0)) / 100) * ih;

  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);
  const [drawn, setDrawn] = useState(prefersReducedMotion);
  useEffect(() => {
    if (drawn) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => cancelAnimationFrame(raf);
  }, [drawn]);

  // 측정 못 한 회차(null)는 0점으로 떨어뜨리지 않고 선을 끊는다
  const pathOf = (key) => {
    let pen = "M";
    return points.map((p, i) => {
      if (typeof p[key] !== "number") { pen = "M"; return ""; }
      const seg = `${pen} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`;
      pen = "L";
      return seg;
    }).filter(Boolean).join(" ");
  };
  const primary = series[0];
  const primaryComplete = !!primary && points.every((p) => typeof p[primary.key] === "number");
  const areaPath = n > 1 && primaryComplete
    ? `${pathOf(primary.key)} L ${x(n - 1).toFixed(1)} ${(PT + ih).toFixed(1)} L ${x(0).toFixed(1)} ${(PT + ih).toFixed(1)} Z`
    : "";

  // 방향키로 회차 이동 (키보드 사용자도 툴팁 값 확인)
  const onKey = (e) => {
    if (n === 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setHover((h) => {
        const cur = h == null ? n - 1 : h;
        if (e.key === "Home") return 0;
        if (e.key === "End") return n - 1;
        return e.key === "ArrowRight" ? Math.min(n - 1, cur + 1) : Math.max(0, cur - 1);
      });
    } else if (e.key === "Escape") {
      setHover(null);
    }
  };
  const onTouch = (e) => { if (e.touches && e.touches[0]) onMove(e.touches[0]); };

  const onMove = (e) => {
    const svg = svgRef.current;
    if (!svg || n === 0) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0, bd = Infinity;
    for (let i = 0; i < n; i++) {
      const d = Math.abs(x(i) - px);
      if (d < bd) { bd = d; best = i; }
    }
    setHover(best);
  };

  const showLabels = valueLabels && n <= 12;
  const gridVals = [0, 20, 40, 60, 80, 100];
  const gradId = "lc-area-" + (primary ? primary.key : "p");

  // 툴팁 박스
  let tip = null;
  if (hover != null && points[hover]) {
    const p = points[hover];
    const rows = series.filter((s) => typeof p[s.key] === "number");
    const tw = 132, th = 16 + rows.length * 18 + 8;
    let tx = x(hover) + 14;
    if (tx + tw > W - PR) tx = x(hover) - tw - 14;
    const anchorY = y(p[primary.key]);
    let ty = anchorY - th / 2;
    ty = Math.max(PT - 10, Math.min(ty, PT + ih - th));
    tip = (
      <g className="lc-tip" pointerEvents="none">
        <line x1={x(hover)} y1={PT} x2={x(hover)} y2={PT + ih} stroke="var(--primary)" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="3 3" />
        <rect x={tx} y={ty} width={tw} height={th} rx="10" fill="#FFFFFF" stroke="var(--border)" />
        <text x={tx + 12} y={ty + 16} fontSize="11.5" fontWeight="700" fill="var(--muted)">
          {p.round}회차{p.created_at ? ` · ${fmtMD(p.created_at)}` : ""}
        </text>
        {rows.map((s, i) => (
          <g key={s.key}>
            <circle cx={tx + 16} cy={ty + 30 + i * 18} r="3.5" fill={s.color} />
            <text x={tx + 26} y={ty + 34 + i * 18} fontSize="12" fill="var(--text)">{s.label}</text>
            <text x={tx + tw - 12} y={ty + 34 + i * 18} fontSize="12.5" fontWeight="800" fill={s.color} textAnchor="end">{p[s.key]}</text>
          </g>
        ))}
      </g>
    );
  }

  return (
    <div className="chart-wrap lc-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${ariaLabel} (방향키로 회차별 점수 확인)`}
        tabIndex={n > 0 ? 0 : undefined}
        onMouseMove={onMove} onMouseLeave={() => setHover(null)}
        onTouchStart={onTouch} onTouchMove={onTouch}
        onFocus={() => setHover((h) => (h == null && n > 0 ? n - 1 : h))} onBlur={() => setHover(null)}
        onKeyDown={onKey}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={primary ? primary.color : "var(--primary)"} stopOpacity="0.22" />
            <stop offset="1" stopColor={primary ? primary.color : "var(--primary)"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 격자 + y축 */}
        {gridVals.map((v) => (
          <g key={v}>
            <line x1={PL} y1={y(v)} x2={W - PR} y2={y(v)}
              stroke="var(--border)" strokeWidth={v === 0 ? 1.5 : 1}
              strokeDasharray={v === 0 ? "none" : "3 4"} />
            <text x={PL - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{v}</text>
          </g>
        ))}

        {/* 목표선 */}
        {typeof goal === "number" && (
          <g>
            <line x1={PL} y1={y(goal)} x2={W - PR} y2={y(goal)} stroke="var(--mint-deep)" strokeWidth="1.6" strokeDasharray="6 5" />
            <rect x={PL + 4} y={y(goal) - 20} width="62" height="18" rx="9" fill="var(--mint)" />
            <text x={PL + 35} y={y(goal) - 7.5} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--mint-ink)">{goalLabel}</text>
          </g>
        )}

        {/* 면 채움 (주계열) */}
        {areaPath && <path d={areaPath} fill={`url(#${gradId})`} className={"lc-area" + (drawn ? " on" : "")} />}

        {/* 라인 */}
        {n > 1 && series.map((s, si) => (
          <path key={s.key} d={pathOf(s.key)} fill="none" stroke={s.color}
            strokeWidth={si === 0 ? 3 : 2.2} strokeLinecap="round" strokeLinejoin="round"
            pathLength="1" strokeDasharray="1" strokeDashoffset={drawn ? 0 : 1}
            className="lc-line" style={{ transitionDelay: `${si * 120}ms` }}
            opacity={si === 0 ? 1 : 0.9} />
        ))}

        {/* 점 + 라벨 */}
        {points.map((p, i) => {
          const last = i === n - 1;
          return (
            <g key={p.round ?? i}>
              {series.map((s, si) => (
                typeof p[s.key] === "number" && (
                  <g key={s.key}>
                    {last && si === 0 && <circle cx={x(i)} cy={y(p[s.key])} r="11" fill={s.color} opacity="0.16" className="lc-halo" />}
                    <circle cx={x(i)} cy={y(p[s.key])}
                      r={last && si === 0 ? 5.5 : hover === i ? 5 : 4}
                      fill={last && si === 0 ? s.color : "#FFFFFF"} stroke={s.color} strokeWidth="2.4">
                      <title>{`${p.round}회차 ${s.label} ${p[s.key]}점`}</title>
                    </circle>
                  </g>
                )
              ))}
              {showLabels && primary && typeof p[primary.key] === "number" && (
                <text x={x(i)} y={y(p[primary.key]) - 13} textAnchor="middle" fontSize="12" fontWeight="800"
                  fill={last ? primary.color : "var(--text)"}>{p[primary.key]}</text>
              )}
              <text x={x(i)} y={H - 22} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={last ? "var(--text)" : "var(--muted)"}>{p.round}회</text>
              {p.created_at && n <= 12 && (
                <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmtMD(p.created_at)}</text>
              )}
            </g>
          );
        })}

        {tip}
      </svg>
      {/* 스크린리더용: 차트와 같은 값을 표로 제공 */}
      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr><th scope="col">회차</th>{series.map((s) => <th scope="col" key={s.key}>{s.label}</th>)}</tr>
        </thead>
        <tbody>
          {points.map((p, i) => (
            <tr key={p.round ?? i}>
              <th scope="row">{p.round}회차{p.created_at ? ` (${fmtMD(p.created_at)})` : ""}</th>
              {series.map((s) => <td key={s.key}>{typeof p[s.key] === "number" ? `${p[s.key]}점` : "-"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
