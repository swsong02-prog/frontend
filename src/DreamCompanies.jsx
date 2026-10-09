import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchCompanies } from "./companies";
import { RecordLogo } from "./ui";

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
    <section className="dcard dream-card rise" style={{ "--ri": 1 }}>
      <div className="dcard-head">
        <div className="dcard-t">관심 회사</div>
        <span className="check-cnt">{list.length}/{MAX}</span>
      </div>
      <div className="dream-grid">
        {list.map((d, i) => (
          <div className="dream-item" key={d.company + i}>
            <RecordLogo company={d.company} job={d.job} idx={i} />
            <div className="dream-info">
              <div className="dream-co">{d.company}</div>
              <div className="dream-job">{[d.job, d.sub].filter(Boolean).join(" · ") || "직무 미정"}</div>
            </div>
            <div className="dream-acts">
              <button type="button" className="dream-go" onClick={() => onStart({ company: d.company, job: d.job, sub: d.sub })}>
                면접
              </button>
              <button type="button" className="dream-more" aria-label={`${d.company} 수정`} onClick={() => setEditing({ idx: i })}>
                수정
              </button>
            </div>
          </div>
        ))}
        {list.length < MAX && (
          <button type="button" className="dream-add" onClick={() => setEditing({ idx: -1 })}>
            <span className="dream-plus" aria-hidden="true">+</span>
            <span>
              <b>{list.length === 0 ? "가고 싶은 회사를 추가해보세요" : "관심 회사 추가"}</b>
              <small>회사와 직무를 저장해두면 그 조건으로 바로 연습할 수 있어요</small>
            </span>
          </button>
        )}
      </div>

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
    <div className="modal-overlay sheet" onClick={onCancel}>
      <form
        className="dcard dream-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dream-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); if (canSave) onSave({ company: company.trim(), job, sub }); }}
      >
        <div className="dcard-head">
          <h2 className="dcard-t" id="dream-title">{initial ? "관심 회사 수정" : "관심 회사 추가"}</h2>
          <button type="button" className="gm-close" onClick={onCancel}>닫기</button>
        </div>

        <label className="ds-label" htmlFor="dream-company">회사</label>
        <div className="ds-co">
          <input
            id="dream-company"
            ref={inputRef}
            className="auth-input"
            placeholder="회사명 (예: 삼성전자, 대전시청)"
            value={company}
            autoComplete="off"
            onChange={(e) => { setCompany(e.target.value); setSugOpen(true); }}
            onBlur={() => setTimeout(() => setSugOpen(false), 120)}
          />
          {suggestions.length > 0 && (
            <div className="co-suggest" role="listbox" aria-label="회사 검색 결과">
              {suggestions.map((c) => (
                <div
                  key={c.name}
                  role="option"
                  aria-selected={false}
                  className="co-sug-row"
                  onMouseDown={(e) => { e.preventDefault(); setCompany(c.name); setSugOpen(false); }}
                >
                  <span className="co-sug-mark" style={{ color: c.color, background: c.bg }}>{c.mark}</span>
                  <span className="co-sug-name">{c.name}</span>
                  <span className="co-sug-ind">{c.industry}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <label className="ds-label">직무</label>
        {jobs.length === 0 ? (
          <p className="ds-hint">직무 목록을 불러오는 중이에요…</p>
        ) : (
          <div className="ds-chips">
            {jobs.map((j) => (
              <button type="button" key={j} className={"ds-chip" + (job === j ? " on" : "")} aria-pressed={job === j} onClick={() => pickJob(j)}>
                {j}
              </button>
            ))}
          </div>
        )}

        {subs.length > 0 && (
          <>
            <label className="ds-label">세부 직무</label>
            <div className="ds-chips">
              {subs.map((s) => (
                <button type="button" key={s} className={"ds-chip" + (sub === s ? " on" : "")} aria-pressed={sub === s} onClick={() => setSub(s)}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="ds-actions">
          {onDelete && <button type="button" className="ds-del" onClick={onDelete}>삭제</button>}
          <button type="submit" className="btn-primary" disabled={!canSave}>저장</button>
        </div>
      </form>
    </div>,
    document.body
  );
}
