import { MessageCircle, ChevronDown, FileText, Settings, House, Video, ChartNoAxesCombined, History } from "lucide-react";

const icons = { home: House, mock: Video, feedback: ChartNoAxesCombined, records: History, resume: FileText, settings: Settings };

function NavigationItem({ item, active, navigate, mobile = false }) {
  const Icon = icons[item.key];
  return (
    <button type="button" className={mobile ? `tab${active ? " on" : ""}` : `snav-item${active ? " active" : ""}`}
      aria-label={item.label} aria-current={active ? "page" : undefined} title={item.label} onClick={() => navigate(item.go)}>
      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      <span className={mobile ? undefined : "lb"}>{mobile ? item.short : item.label}</span>
    </button>
  );
}

export function Sidebar({ items, active, navigate, onHome, name, initial }) {
  return (
    <aside className="sidebar">
      <button type="button" className="logo" aria-label="코치코치 홈으로" onClick={() => navigate(onHome)}>
        <span className="mark"><MessageCircle size={21} aria-hidden="true" /></span><span className="brand-word">코치코치</span>
      </button>
      <nav className="snav" aria-label="주요 메뉴">
        {[items.slice(0, 2), items.slice(2, 4), items.slice(4, 5)].map((group, i) => (
          <div className="snav-group" key={i}>{group.map(item => <NavigationItem key={item.key} item={item} active={active === item.key} navigate={navigate} />)}</div>
        ))}
      </nav>
      <div className="side-bottom">
        <NavigationItem item={items.find(item => item.key === "settings")} active={active === "settings"} navigate={navigate} />
        <div className="sidebar-account"><span className="profile-initial">{initial}</span><span>{name}<small>나의 면접 준비 공간</small></span></div>
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
          <span className="mark"><MessageCircle size={18} aria-hidden="true" /></span>코치코치
        </button> : <h2 className="appbar-title">{title}</h2>}
        <details className="profile-menu" key={screen}>
          <summary aria-label="프로필 메뉴"><span className="profile-initial">{initial}</span><ChevronDown size={14} aria-hidden="true" /></summary>
          <div className="profile-menu-panel">
            <p>{name}님</p>
            {items.filter(item => ["resume", "settings"].includes(item.key)).map(item => {
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
