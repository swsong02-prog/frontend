import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchCompanies } from "./companies";
import FavoriteCompanyCard from "./components/FavoriteCompanyCard";
import { SectionHeader } from "./ds";

/* 홈 "관심 회사" — 가고 싶은 회사 최대 3곳을 직무와 함께 저장해두고 한 번에 그 조건으로 면접 설정
   저장 위치: localStorage (계정 이메일별 키), [{ company, job, sub }] */
const DREAM_KEY = "cc_dream";
const MAX = 3;

function storageKey(email) {
  return `${DREAM_KEY}:${String(email || "").trim().toLowerCase()}`;
}
export function loadDreams(email) {
  try {
    const arr = JSON.parse(localStorage.getItem(storageKey(email)) || "[]");
    return Array.isArray(arr)
      ? arr.filter((d) => d && typeof d.company === "string" && d.company.trim()).slice(0, MAX)
      : [];
  } catch (e) { return []; }
}
function saveDreams(email, list) {
  try { localStorage.setItem(storageKey(email), JSON.stringify(list)); } catch (e) { /* 저장 실패 시 화면 상태만 유지 */ }
}

export default function DreamCompanies({ email, jobData, onStart, onChange }) {
  const [list, setList] = useState(() => loadDreams(email));
  const [editing, setEditing] = useState(null); // null | { idx: number | -1 }

  const update = (next) => { setList(next); saveDreams(email, next); if (onChange) onChange(next); };
  const remove = (i) => update(list.filter((_, k) => k !== i));
  const commit = (item) => {
    if (editing && editing.idx >= 0) update(list.map((d, k) => (k === editing.idx ? item : d)));
    else update([...list, item].slice(0, MAX));
    setEditing(null);
  };

  return (
    <section className="home-sec" id="favorite-companies" aria-labelledby="favorite-companies-title">
      <SectionHeader id="favorite-companies-title" title="관심 회사" meta={`${list.length} / ${MAX}`} action={list.length > 0 && list.length < MAX ? "추가" : null} onAction={() => setEditing({ idx: -1 })} />
      {list.length === 0 ? <p className="home-empty">
        <span>회사와 직무를 저장해두면 그 조건으로 바로 연습할 수 있어요.</span>
        <button type="button" className="btn btn-text btn-sm" onClick={() => setEditing({ idx: -1 })}>관심 회사 추가</button>
      </p> :
      <ul className="rows">
        {list.map((d, i) => <FavoriteCompanyCard key={d.company + i} company={d} index={i}
          onStart={() => onStart({ company: d.company, job: d.job, sub: d.sub })} onEdit={() => setEditing({ idx: i })} />)}
      </ul>}

      {editing && (
        <DreamEditor
          initial={editing.idx >= 0 ? list[editing.idx] : null}
          jobData={jobData}
          onCancel={() => setEditing(null)}
          onSave={commit}
          onDelete={editing.idx >= 0 ? () => { remove(editing.idx); setEditing(null); } : null}
        />
      )}
    </section>
  );
}

function DreamEditor({ initial, jobData, onCancel, onSave, onDelete }) {
  const [company, setCompany] = useState(initial ? initial.company : "");
  const [job, setJob] = useState(initial ? initial.job || "" : "");
  const [sub, setSub] = useState(initial ? initial.sub || "" : "");
  const [sugOpen, setSugOpen] = useState(false);
  const inputRef = useRef(null);

  const jobs = jobData ? Object.keys(jobData) : [];
  const subs = job && jobData && jobData[job] && Array.isArray(jobData[job].subs) ? jobData[job].subs : [];
  const suggestions = sugOpen && company.trim() ? searchCompanies(company, 6) : [];
  const canSave = company.trim().length > 0 && job;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const pickJob = (j) => {
    setJob(j);
    const s = jobData && jobData[j] && Array.isArray(jobData[j].subs) ? jobData[j].subs : [];
    setSub(s[0] || "");
  };

  // 카드의 등장 애니메이션(transform) 안에 갇히지 않도록 body로 포털
  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dream-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); if (canSave) onSave({ company: company.trim(), job, sub }); }}
      >
        <div className="modal-head">
          <h2 className="t-section" id="dream-title">{initial ? "관심 회사 수정" : "관심 회사 추가"}</h2>
          <button type="button" className="btn btn-text btn-sm" onClick={onCancel}>닫기</button>
        </div>

        <label className="field-label" htmlFor="dream-company">회사</label>
        <div className="combo">
          <input
            id="dream-company"
            ref={inputRef}
            className="input"
            placeholder="회사명 (예: 삼성전자, 대전시청)"
            value={company}
            autoComplete="off"
            onChange={(e) => { setCompany(e.target.value); setSugOpen(true); }}
            onBlur={() => setTimeout(() => setSugOpen(false), 120)}
          />
          {suggestions.length > 0 && (
            <div className="combo-list" role="listbox" aria-label="회사 검색 결과">
              {suggestions.map((c) => (
                <div
                  key={c.name}
                  role="option"
                  aria-selected={false}
                  className="combo-opt"
                  onMouseDown={(e) => { e.preventDefault(); setCompany(c.name); setSugOpen(false); }}
                >
                  <span className="combo-name">{c.name}</span>
                  <span className="combo-meta">{c.industry}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="field-label">직무</span>
        {jobs.length === 0 ? (
          <p className="t-sub">직무 목록을 불러오는 중이에요…</p>
        ) : (
          <div className="chips">
            {jobs.map((j) => (
              <button type="button" key={j} className={"chip" + (job === j ? " on" : "")} aria-pressed={job === j} onClick={() => pickJob(j)}>
                {j}
              </button>
            ))}
          </div>
        )}

        {subs.length > 0 && (
          <>
            <span className="field-label">세부 직무</span>
            <div className="chips">
              {subs.map((s) => (
                <button type="button" key={s} className={"chip" + (sub === s ? " on" : "")} aria-pressed={sub === s} onClick={() => setSub(s)}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="modal-actions">
          {onDelete && <button type="button" className="btn btn-text btn-danger" onClick={onDelete}>삭제</button>}
          <button type="submit" className="btn btn-primary" disabled={!canSave}>저장</button>
        </div>
      </form>
    </div>,
    document.body
  );
}
