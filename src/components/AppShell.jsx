import { MessageCircle, ChevronDown, FileText, Settings, House, Video, ChartNoAxesCombined, History, BriefcaseBusiness } from "lucide-react";

const icons = { home: House, mock: Video, feedback: ChartNoAxesCombined, records: History, resume: FileText, settings: Settings, jobs: BriefcaseBusiness };

function NavigationItem({ item, active, navigate, mobile = false }) {
  const Icon = icons[item.key];
  return (
    <button type="button" className={mobile ? `tab${active ? " on" : ""}` : `nav-item${active ? " on" : ""}`}
      aria-label={mobile ? item.label : undefined} aria-current={active ? "page" : undefined} onClick={() => navigate(item.go)}>
      <Icon size={mobile ? 22 : 18} strokeWidth={1.7} aria-hidden="true" />
      <span>{mobile ? item.short : item.label}</span>
    </button>
  );
}

/* 좌측 사이드바: 연습(홈·모의면접) / 분석(피드백·기록) / 준비 자료(자소서·공고) 세 묶음 + 하단 설정·계정 */
const GROUPS = [
  { label: "연습", keys: ["home", "mock"] },
  { label: "분석", keys: ["feedback", "records"] },
  { label: "준비 자료", keys: ["resume", "jobs"] },
];

export function Sidebar({ items, active, navigate, onHome, name, initial }) {
  const byKey = (k) => items.find((it) => it.key === k);
  return (
    <aside className="sidebar">
      <button type="button" className="sb-brand" aria-label="코치코치 홈으로" onClick={() => navigate(onHome)}>
        <span className="sb-mark"><MessageCircle size={15} strokeWidth={2} aria-hidden="true" /></span>코치코치
      </button>
      <nav className="sb-nav" aria-label="주요 메뉴">
        {GROUPS.map((g) => (
          <div className="sb-group" key={g.label}>
            <div className="sb-group-label">{g.label}</div>
            {g.keys.map(byKey).filter(Boolean).map((item) => (
              <NavigationItem key={item.key} item={item} active={active === item.key} navigate={navigate} />
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <NavigationItem item={byKey("settings")} active={active === "settings"} navigate={navigate} />
        <div className="sb-account">
          <span className="avatar" aria-hidden="true">{initial}</span>
          <span className="sb-account-name">{name}</span>
        </div>
      </div>
    </aside>
  );
}

export default function AppShell({ screen, title, items, active, onHome, confirmLeave, name, initial, children, footer }) {
  const navigate = (go) => { if (confirmLeave()) go(); };
  return (
    <div className={"shell scr-" + screen}>
      <header className="appbar">
        {screen === "home" ? <button type="button" className="appbar-brand" aria-label="코치코치 홈" onClick={() => navigate(onHome)}>
          <span className="sb-mark"><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /></span>코치코치
        </button> : <h2 className="appbar-title">{title}</h2>}
        <details className="profile-menu" key={screen}>
          <summary aria-label="프로필 메뉴"><span className="avatar">{initial}</span><ChevronDown size={14} aria-hidden="true" /></summary>
          <div className="profile-menu-panel">
            <p>{name}님</p>
            {items.filter(item => ["resume", "jobs", "settings"].includes(item.key)).map(item => {
              const Icon = icons[item.key];
              return <button type="button" key={item.key} onClick={(event) => {
                if (confirmLeave()) { event.currentTarget.closest("details").open = false; item.go(); }
              }}><Icon size={18} aria-hidden="true" />{item.label}</button>;
            })}
          </div>
        </details>
      </header>
      <Sidebar items={items} active={active} navigate={navigate} onHome={onHome} name={name} initial={initial} />
      <main className="smain">{children}</main>
      <nav className="tabbar" aria-label="하단 메뉴">
        {items.slice(0, 4).map(item => <NavigationItem key={item.key} item={item} active={active === item.key} navigate={navigate} mobile />)}
      </nav>
      {footer}
    </div>
  );
}
