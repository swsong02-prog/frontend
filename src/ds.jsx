/* ============================================================
   코치코치 디자인 시스템 — 공통 UI 컴포넌트 (표시 전용, 상태·API 없음)
   스타일: src/styles/tokens.css + components.css
   - Button: primary(주요 CTA 1개) / secondary(외곽선) / text(글자)
   - PageHeader, SectionHeader, EmptyState, Segmented, Stat, Meter, Card, Field, ComboList
   ============================================================ */

export function Button({ variant = "secondary", size, block = false, className = "", type = "button", children, ...rest }) {
  const cls = ["btn", `btn-${variant}`, size ? `btn-${size}` : "", block ? "btn-block" : "", className].filter(Boolean).join(" ");
  return <button type={type} className={cls} {...rest}>{children}</button>;
}

/* 페이지 제목 줄: 제목 + (선택) 한 줄 설명 + 오른쪽 보조 행동 */
export function PageHeader({ title, desc, actions, id }) {
  return (
    <header className="page-head">
      <div className="page-head-text">
        <h1 className="t-page" id={id}>{title}</h1>
        {desc && <p className="t-sub">{desc}</p>}
      </div>
      {actions && <div className="page-head-actions">{actions}</div>}
    </header>
  );
}

/* 섹션 제목 줄: 제목 + 보조 수치(meta) + 오른쪽 텍스트 행동 */
export function SectionHeader({ title, meta, action, onAction, id, children }) {
  return (
    <div className="sec-head">
      <h2 className="t-section" id={id}>{title}</h2>
      {meta != null && meta !== "" && <span className="t-caption sec-meta">{meta}</span>}
      <div className="sec-head-end">
        {children}
        {action && <button type="button" className="btn btn-text btn-sm" onClick={onAction}>{action}</button>}
      </div>
    </div>
  );
}

/* 빈 상태: 짧은 제목 + 설명 1줄 + 행동 1개 */
export function EmptyState({ title, desc, action, onAction, secondary, compact = false }) {
  return (
    <div className={"empty" + (compact ? " empty-compact" : "")}>
      <p className="empty-title">{title}</p>
      {desc && <p className="empty-desc">{desc}</p>}
      {(action || secondary) && (
        <div className="empty-actions">
          {action && <button type="button" className={"btn " + (compact ? "btn-secondary btn-sm" : "btn-primary")} onClick={onAction}>{action}</button>}
          {secondary}
        </div>
      )}
    </div>
  );
}

/* 세그먼트 컨트롤: 2~3개 중 하나 선택 */
export function Segmented({ options, value, onChange, label, block = false }) {
  return (
    <div className={"seg" + (block ? " seg-block" : "")} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          className={"seg-item" + (value === o.value ? " on" : "")}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.icon}{o.label}
        </button>
      ))}
    </div>
  );
}

/* 핵심 수치: 라벨 → 숫자 → 보조 설명 */
export function Stat({ label, value, unit, note, tone }) {
  return (
    <div className="stat">
      <div className="t-caption">{label}</div>
      <div className={"t-metric" + (tone ? " tone-" + tone : "")}>{value}{unit && <small>{unit}</small>}</div>
      {note && <div className="stat-note">{note}</div>}
    </div>
  );
}

/* 가로 진행 막대 */
export function Meter({ value, max = 100, label, tone }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className={"meter" + (tone ? " tone-" + tone : "")} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <span style={{ width: pct + "%" }} />
    </div>
  );
}

export function Card({ as: Tag = "section", className = "", children, ...rest }) {
  return <Tag className={"card " + className} {...rest}>{children}</Tag>;
}

/* 입력 칸 라벨 묶음 */
export function Field({ label, htmlFor, hint, children, optional }) {
  return (
    <div className="field">
      {label && <label className="field-label" htmlFor={htmlFor}>{label}{optional && <span className="field-opt">선택</span>}</label>}
      {children}
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}

/* 검색 드롭다운 목록 (combobox의 listbox 부분). 키보드 처리는 입력칸 쪽에서 한다 */
export function ComboList({ id, label, items, activeIdx, getKey, renderItem, onPick, onHover, empty, groupOf }) {
  return (
    <div className="combo-list" role="listbox" id={id} aria-label={label}>
      {items.length === 0 ? (
        <div className="combo-empty">{empty}</div>
      ) : items.map((it, i) => {
        const group = groupOf ? groupOf(it) : null;
        const prevGroup = groupOf && i > 0 ? groupOf(items[i - 1]) : null;
        return (
          <div key={getKey(it)} role="presentation">
            {group && group !== prevGroup && <div className="combo-group" role="presentation">{group}</div>}
            <div
              id={`${id}-opt-${i}`}
              className={"combo-opt" + (i === activeIdx ? " active" : "")}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(it)}
              onMouseEnter={() => onHover && onHover(i)}
            >
              {renderItem(it)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
