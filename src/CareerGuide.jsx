import { useEffect, useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { PageHeader, EmptyState } from "./ds";
import { DEPARTMENTS, COLLEGES, searchDepartments } from "./departments";
import { RESUME_FORMS } from "./resumeForms";

/* 진로 안내 데이터(181개, 약 570KB)는 이 화면에 들어올 때만 불러온다 */
let careerInfoCache = null;

/* 진로 탐색: 학과 → 진로 → 직무 안내(하는 일, 역량, 자격증, 준비 체크리스트, 자소서 양식) → 면접 연습 */
const STORAGE = "cc_career_pick";
const CHECK_STORAGE = "cc_career_checks";
const DEFAULT_DEPT = "정보통신공학과";

function loadJson(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v && typeof v === "object" ? v : fallback; } catch { return fallback; }
}
function saveJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 저장이 막혀도 화면은 동작 */ }
}

/* "[ ]" 로 감싼 부분을 빈칸 표시로 바꿔 보여 준다 */
function FrameText({ text }) {
  const parts = String(text).split(/(\[[^\]]+\])/g);
  return <>{parts.map((p, i) => p.startsWith("[") ? <span key={i} className="cg-blank">{p.slice(1, -1)}</span> : p)}</>;
}

export default function CareerGuide({ onPractice }) {
  const saved = loadJson(STORAGE, {});
  const [deptName, setDeptName] = useState(DEPARTMENTS.some(d => d.name === saved.dept) ? saved.dept : DEFAULT_DEPT);
  const [careerLabel, setCareerLabel] = useState(saved.career || "");
  const [query, setQuery] = useState("");
  const [checks, setChecks] = useState(() => loadJson(CHECK_STORAGE, {}));
  const [CAREER_INFO, setCareerInfo] = useState(careerInfoCache);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (CAREER_INFO) return;
    let alive = true;
    import("./careerInfo").then(m => { careerInfoCache = m.CAREER_INFO; if (alive) setCareerInfo(m.CAREER_INFO); }).catch(() => { if (alive) setLoadFailed(true); });
    return () => { alive = false; };
  }, [CAREER_INFO]);

  const dept = DEPARTMENTS.find(d => d.name === deptName) || DEPARTMENTS[0];
  const career = dept.careers.find(c => c.label === careerLabel) || dept.careers[0];
  const info = CAREER_INFO?.[career?.label];
  const results = useMemo(() => (query.trim() ? searchDepartments(query.trim(), 8) : []), [query]);

  useEffect(() => { saveJson(STORAGE, { dept: deptName, career: career?.label || "" }); }, [deptName, career]);

  const pickDept = name => { setDeptName(name); setCareerLabel(""); setQuery(""); };
  const checkKey = (kind, i) => `${career.label}|${kind}|${i}`;
  const toggleCheck = key => setChecks(prev => { const next = { ...prev, [key]: !prev[key] }; saveJson(CHECK_STORAGE, next); return next; });
  const practice = () => onPractice({ job: career.job, sub: career.sub });

  const checklist = (kind, title, items) => {
    const done = items.filter((_, i) => checks[checkKey(kind, i)]).length;
    return (
      <div className="cg-check">
        <h3 className="cg-h3">{title}<span className="t-caption num">{done} / {items.length}</span></h3>
        <ul>{items.map((item, i) => {
          const key = checkKey(kind, i);
          return <li key={key}><label><input type="checkbox" checked={!!checks[key]} onChange={() => toggleCheck(key)} /><span>{item}</span></label></li>;
        })}</ul>
      </div>
    );
  };

  return (
    <div className="career-guide">
      <PageHeader title="진로 탐색" desc="학과를 고르면 갈 수 있는 직무와 준비할 것을 보여 드려요. 마음에 드는 직무로 바로 면접을 연습해 보세요." />

      <section className="cg-pick" aria-label="학과와 진로 선택">
        <div className="cg-dept">
          <span className="field-label">학과</span>
          <div className="cg-dept-row">
            <select className="select cg-dept-select" aria-label="학과 선택" value={dept.name} onChange={e => pickDept(e.target.value)}>
              {COLLEGES.map(col => <optgroup key={col} label={col}>{DEPARTMENTS.filter(d => d.college === col).map(d => <option key={d.name} value={d.name}>{d.name}</option>)}</optgroup>)}
            </select>
            <span className="t-caption">{dept.college} · 62개 학과</span>
            <div className="cg-search">
              <Search size={16} aria-hidden="true" />
              <input value={query} placeholder="학과 이름으로 검색" aria-label="학과 검색" onChange={e => setQuery(e.target.value)} />
              {results.length > 0 && <ul className="cg-search-list" role="listbox" aria-label="학과 검색 결과">
                {results.map(d => <li key={d.name} role="option" aria-selected={false} onMouseDown={e => e.preventDefault()} onClick={() => pickDept(d.name)}>{d.name}<small>{d.college}</small></li>)}
              </ul>}
            </div>
          </div>
        </div>
        <div className="cg-careers">
          <span className="field-label">{dept.name} 선배들의 주요 진로</span>
          <div className="chips">{dept.careers.map(c => (
            <button type="button" key={c.label} className={"chip" + (c.label === career.label ? " on" : "")} aria-pressed={c.label === career.label} onClick={() => setCareerLabel(c.label)}>
              {c.label}{CAREER_INFO && !CAREER_INFO[c.label] && <small>준비 중</small>}
            </button>
          ))}</div>
        </div>
      </section>

      {!CAREER_INFO ? (
        <div className="cg-empty"><p className="t-sub" role="status">{loadFailed ? "진로 안내를 불러오지 못했어요. 새로고침해 주세요." : "진로 안내를 불러오는 중이에요."}</p></div>
      ) : !info ? (
        <div className="cg-empty">
          <EmptyState title={`${career.label} 안내는 준비 중이에요`} desc="이 직무로 면접 연습은 바로 할 수 있어요." action="이 직무로 면접 연습" onAction={practice} />
        </div>
      ) : (
        <div className="cg-layout">
          <article className="cg-main">
            <header className="cg-title">
              <h2 className="t-page">{career.label}</h2>
              {info.ncs && <p className="t-sub">NCS 분류: {info.ncs}</p>}
            </header>

            <section className="cg-sec">
              <h3 className="cg-h3">하는 일</h3>
              <ul className="cg-list">{info.does.map(t => <li key={t}>{t}</li>)}</ul>
            </section>

            <section className="cg-sec">
              <h3 className="cg-h3">필요한 역량</h3>
              <div className="chips">{info.skills.map(t => <span key={t} className="chip chip-static">{t}</span>)}</div>
            </section>

            <section className="cg-sec">
              <h3 className="cg-h3">추천 자격증</h3>
              {info.certs.length ? <table className="cg-table">
                <thead><tr><th>자격증</th><th>발급 기관</th><th>구분</th></tr></thead>
                <tbody>{info.certs.map(c => <tr key={c.name}><td><b>{c.name}</b>{c.note && <small>{c.note}</small>}</td><td>{c.issuer}</td><td>{c.type}</td></tr>)}</tbody>
              </table> : <p className="t-sub">이 직무는 꼭 필요한 자격이 없어요. 자격증보다 아래 체크리스트의 경험과 결과물이 더 중요해요.</p>}
            </section>

            {info.recruitNotes?.length > 0 && <section className="cg-sec">
              <h3 className="cg-h3">채용 전형, 이렇게 봐요</h3>
              <ul className="cg-list">{info.recruitNotes.map(t => <li key={t}>{t}</li>)}</ul>
              <p className="t-caption">기관마다 과목과 가점이 달라요. 위 숫자는 해당 공고에만 해당하는 예시예요.</p>
            </section>}

            <section className="cg-sec">
              <h3 className="cg-h3">공모전, 팀 프로젝트에서 맡으면 좋은 역할</h3>
              <ul className="cg-list">{info.projectRole.map(t => <li key={t}>{t}</li>)}</ul>
            </section>

            <section className="cg-sec">
              <h3 className="cg-h3">준비 체크리스트</h3>
              <div className="cg-checks">
                {checklist("quant", "정량 준비 (숫자로 보이는 것)", info.quant)}
                {checklist("qual", "정성 준비 (경험으로 보이는 것)", info.qual)}
              </div>
            </section>

            <section className="cg-sec">
              <h3 className="cg-h3">자기소개서, 이렇게 써 보세요</h3>
              <p className="t-sub cg-lead">완성된 예문 대신 양식을 드려요. 빈칸에 내 경험을 넣어 보면서 순서를 잡으면 돼요.</p>
              <div className="cg-points">
                <span className="field-label">이 직무에서 평가자가 보는 것</span>
                <ol>{info.resumePoints.map(t => <li key={t}>{t}</li>)}</ol>
              </div>
              <div className="cg-forms">
                {RESUME_FORMS.map((f, i) => (
                  <details key={f.title} className="cg-form" open={i === 0}>
                    <summary><span className="num">{String(i + 1).padStart(2, "0")}</span>{f.title}</summary>
                    <ol className="cg-steps">{f.steps.map(s => <li key={s.label}><b>{s.label}</b><p><FrameText text={s.frame} /></p></li>)}</ol>
                    {f.tip && <p className="cg-tip">{f.tip}</p>}
                    {i === 1 && info.projectRole?.length > 0 && <p className="cg-tip">{career.label}라면 이런 경험이 잘 맞아요: {info.projectRole.join(", ")}</p>}
                  </details>
                ))}
              </div>
            </section>

            {info.sources?.length > 0 && <section className="cg-sources">
              <span className="field-label">출처</span>
              <ul>{info.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}<ArrowUpRight size={13} aria-hidden="true" /></a></li>)}</ul>
              <p className="t-caption">공식 자료를 바탕으로 정리했어요. 자격증 시험 일정과 채용 조건은 지원 전에 원문에서 꼭 확인하세요.</p>
            </section>}
          </article>

          <aside className="cg-side">
            <div className="cg-side-box">
              <span className="t-caption">이 직무로 연습하기</span>
              <strong>{career.job} · {career.sub}</strong>
              <p className="t-sub">이 직무에 맞는 질문으로 모의면접을 바로 시작해요.</p>
              <button type="button" className="btn btn-primary btn-block" onClick={practice}>이 직무로 면접 연습</button>
            </div>
            <div className="cg-side-box">
              <span className="t-caption">준비 현황</span>
              {(() => {
                const all = [...info.quant.map((_, i) => checkKey("quant", i)), ...info.qual.map((_, i) => checkKey("qual", i))];
                const done = all.filter(k => checks[k]).length;
                return <><strong className="num">{done} / {all.length}</strong><div className="meter"><span style={{ width: (all.length ? done / all.length * 100 : 0) + "%" }} /></div><p className="t-caption">체크한 내용은 이 기기에만 저장돼요.</p></>;
              })()}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
