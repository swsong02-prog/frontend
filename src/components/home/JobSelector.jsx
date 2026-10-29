import { ChevronDown } from "lucide-react";

/* 홈: 연습할 직무·세부직무 (제목처럼 크게 보이는 선택 상자. 고르면 App의 selectJob → cc_last_job 저장)
   quiet: 페이지 상단에 공통 오류가 떠 있을 때 — 섹션 안 오류 문구 없이 비활성 상자만 보여 레이아웃을 유지한다 */
function Pick({ label, value, disabled, onChange, placeholder, options }) {
  return (
    <label className={"hj-pick" + (value ? "" : " is-empty")}>
      <span className="sr-only">{label}</span>
      <select value={value || ""} disabled={disabled} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {placeholder != null && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={18} strokeWidth={2} aria-hidden="true" />
    </label>
  );
}

export default function JobSelector({ data, value, subValue, onSelect, onSub, error, quiet, errorSlot }) {
  if (!data) {
    if (error && !quiet) return errorSlot || null;
    return (
      <div className="home-job" aria-busy={!error}>
        <Pick label="연습할 직무" disabled placeholder={error ? "직무" : "직무 불러오는 중…"} options={[]} onChange={() => {}} />
      </div>
    );
  }
  const subs = value && data[value] ? data[value].subs || [] : [];
  return (
    <div className="home-job">
      <Pick label="연습할 직무" value={value} onChange={onSelect} placeholder="직무 선택" options={Object.keys(data)} />
      <span className="hj-sep" aria-hidden="true">·</span>
      <Pick label="연습할 세부 직무" value={subValue} disabled={!subs.length} onChange={onSub}
        placeholder={!subs.length ? "세부 직무" : subValue && subs.includes(subValue) ? null : "세부 직무 선택"} options={subs} />
    </div>
  );
}
