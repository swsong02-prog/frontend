import { useEffect, useState } from "react";
import { ChevronRight, X } from "lucide-react";

/* ============================================================
   셸 (목업 v3): PC 상단 2단 메뉴(TopNav) / 모바일 상단 제목 줄 + 하단 탭 5개
   - 1단: 로고, 계정, 설정
   - 2단: 홈, 모의면접, 목표·플래너, 면접 기록, 채용공고, 진로 탐색, 자기소개서
   - 모바일 탭: 홈, 면접, 플래너, 기록, 더보기(공고, 진로, 자소서, 설정)
   App은 NAV 항목(key, label, short, go)만 넘긴다.
   ============================================================ */

const GNB_KEYS = ["home", "mock", "planner", "records", "jobs", "career", "resume"];
const TAB_KEYS = ["home", "mock", "planner", "records"];
const MORE_KEYS = ["jobs", "career", "resume", "settings"];

/* 모바일 탭 아이콘: 선 굵기 1.6의 단순 도형 (lucide 대신 고정 SVG, 크기 20) */
function TabIcon({ k }) {
  const p = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (k === "home") return <svg {...p}><path d="M3 9l7-5.5L17 9v7.5a1 1 0 0 1-1 1h-3.5v-5h-5v5H4a1 1 0 0 1-1-1z" /></svg>;
  if (k === "mock") return <svg {...p}><rect x="2.5" y="5" width="11" height="10" rx="1.5" /><path d="M13.5 9l4-2.5v7l-4-2.5" /></svg>;
  if (k === "planner") return <svg {...p}><rect x="3" y="4" width="14" height="13" rx="1.5" /><path d="M3 8h14M7 2.5v3M13 2.5v3M7 12l2 2 4-4" /></svg>;
  if (k === "records") return <svg {...p}><path d="M4 16V9M8.5 16V5M13 16v-5M17 16H3" /></svg>;
  return <svg {...p}><circle cx="5" cy="10" r="1.2" /><circle cx="10" cy="10" r="1.2" /><circle cx="15" cy="10" r="1.2" /></svg>;
}

export function TopNav({ items, active, navigate, onHome, name, initial }) {
  const byKey = (k) => items.find((it) => it.key === k);
  const settings = byKey("settings");
  return (
    <header className="topnav">
      <div className="hd1">
        <button type="button" className="logo" aria-label="코치코치 홈으로" onClick={() => navigate(onHome)}>
          코치코치<small>대전대학교</small>
        </button>
        <div className="util">
          {settings && <button type="button" className={"util-link" + (active === "settings" ? " on" : "")} onClick={() => navigate(settings.go)}>설정</button>}
          <span className="me"><span className="av" aria-hidden="true">{initial}</span><span className="me-name">{name}</span></span>
        </div>
      </div>
      <nav className="hd2" aria-label="주요 메뉴">
        <div className="gnb">
          {GNB_KEYS.map(byKey).filter(Boolean).map((it) => (
            <button type="button" key={it.key} className={active === it.key ? "on" : ""}
              aria-current={active === it.key ? "page" : undefined} onClick={() => navigate(it.go)}>{it.label}</button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default function AppShell({ screen, title, items, active, onHome, confirmLeave, name, initial, children, footer }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = (go) => { if (confirmLeave()) { setMoreOpen(false); go(); } };
  const byKey = (k) => items.find((it) => it.key === k);
  const moreActive = MORE_KEYS.includes(active);

  useEffect(() => { setMoreOpen(false); }, [screen]);
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMoreOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  return (
    <div className={"shell scr-" + screen}>
      <TopNav items={items} active={active} navigate={navigate} onHome={onHome} name={name} initial={initial} />

      <header className="appbar">
        {screen === "home"
          ? <button type="button" className="appbar-brand" aria-label="코치코치 홈" onClick={() => navigate(onHome)}>코치코치</button>
          : <h2 className="appbar-title">{title}</h2>}
        <span className="av" aria-label={name + " 계정"}>{initial}</span>
      </header>

      <main className="smain">{children}</main>

      <footer className="foot"><div>코치코치 | 대전대학교 정보통신공학과 캡스톤디자인 | 공고 출처 ALIO 공공기관 경영정보 공개시스템</div></footer>

      <nav className="tabbar" aria-label="하단 메뉴">
        {TAB_KEYS.map(byKey).filter(Boolean).map((it) => (
          <button type="button" key={it.key} className={"tab" + (active === it.key ? " on" : "")}
            aria-current={active === it.key ? "page" : undefined} onClick={() => navigate(it.go)}>
            <TabIcon k={it.key} /><span>{it.short}</span>
          </button>
        ))}
        <button type="button" className={"tab" + (moreActive || moreOpen ? " on" : "")} aria-expanded={moreOpen} onClick={() => setMoreOpen((v) => !v)}>
          <TabIcon k="more" /><span>더보기</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="more-sheet" role="dialog" aria-modal="true" aria-label="더보기 메뉴">
          <button type="button" className="more-backdrop" aria-label="닫기" onClick={() => setMoreOpen(false)} />
          <div className="more-panel">
            <div className="more-head">
              <span className="b">{name}</span>
              <button type="button" className="btn btn-text btn-sm" onClick={() => setMoreOpen(false)} aria-label="더보기 닫기"><X size={18} aria-hidden="true" /></button>
            </div>
            <ul>
              {MORE_KEYS.map(byKey).filter(Boolean).map((it) => (
                <li key={it.key}>
                  <button type="button" className={active === it.key ? "on" : ""} onClick={() => navigate(it.go)}>
                    {it.label}<ChevronRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {footer}
    </div>
  );
}
