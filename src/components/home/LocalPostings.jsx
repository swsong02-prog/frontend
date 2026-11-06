import { useEffect, useState } from "react";

/* ============================================================
   홈 "대전, 충청 지역인재 대상 공고" (목업 v3 홈 .local 블록)
   - /api/postings/browse?local=1 : 지역인재 의무채용 기관 공고만, 마감 임박순
   - 내 직무로 먼저 찾고, 0건이면 직무 조건 없이 다시 찾는다
   - onStatus(실패 여부): 홈 공통 오류 판단용 (기존 JobPostings와 같은 약속)
   ============================================================ */
const AREAS = "대전, 세종, 충북, 충남";

async function fetchLocal(api, job) {
  const q = new URLSearchParams({ local: "1", sort: "deadline", size: "5" });
  if (job) q.set("jobs", job);
  const r = await fetch(`${api}/api/postings/browse?${q}`);
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

export default function LocalPostings({ api, job, onBrowse, onPractice, onStatus, reloadKey = 0, quiet = false }) {
  const [st, setSt] = useState({ data: null, err: false, byJob: false });
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let d = await fetchLocal(api, job);
        let byJob = !!job;
        if (job && (!d || !Array.isArray(d.items) || d.items.length === 0)) { d = await fetchLocal(api, ""); byJob = false; }
        if (alive) setSt({ data: d, err: false, byJob });
      } catch {
        if (alive) setSt({ data: null, err: true, byJob: false });
      }
    })();
    return () => { alive = false; };
  }, [api, job, reload, reloadKey]);

  useEffect(() => { if (onStatus) onStatus(st.err); }, [st.err, onStatus]);

  const d = st.data;
  if (d && d.available === false && !st.err) return null; // 공고 키가 없는 서버: 블록 자체를 숨김
  const items = d && Array.isArray(d.items) ? d.items : [];
  const total = d && typeof d.total === "number" ? d.total : items.length;

  return (
    <section className="local-sec" aria-labelledby="local-title">
      <div className="sec-h">
        <h2 id="local-title">대전, 충청 지역인재 대상 공고 <small>{st.byJob ? `${job} 기준` : "전체 직무"}</small></h2>
        <button type="button" className="btn btn-text btn-sm" onClick={onBrowse}>{d ? `전체 ${total}건` : "전체 공고"}</button>
      </div>
      {st.err ? (
        quiet ? <div className="home-quiet" aria-hidden="true" />
          : <p className="loop-err" role="alert"><span>공고를 불러오지 못했습니다.</span><button type="button" className="btn btn-text btn-sm" onClick={() => setReload((n) => n + 1)}>다시 시도</button></p>
      ) : !d ? (
        <div className="loop-skel" aria-hidden="true"><span className="skel" /><span className="skel" /><span className="skel" /></div>
      ) : (
        <div className="local">
          <div className="local-l">
            <b>지역인재 전형</b>
            <div className="big num">{total}<span> 건</span></div>
            <p className="xs c2">{AREAS} 대학 졸업(예정)자는 이전 공공기관 신규 채용에서 지역인재로 인정됩니다.</p>
          </div>
          {items.length === 0 ? (
            <p className="local-empty">지금 마감 전인 지역인재 대상 공고 없음 <button type="button" className="btn btn-text btn-sm" onClick={onBrowse}>공고 둘러보기</button></p>
          ) : (
            <ul className="local-r">
              {items.slice(0, 4).map((p) => {
                const dd = typeof p.dday === "number" ? (p.dday === 0 ? "D-day" : `D-${p.dday}`) : "상시";
                return (
                  <li key={p.id}>
                    <b className="sm local-inst">{p.inst}</b>
                    <button type="button" className="sm local-title" title="이 기관으로 면접 연습"
                      onClick={() => onPractice && onPractice({ company: p.inst, job: p.suggest_job || job, sub: p.suggest_sub || "" })}>{p.title}</button>
                    <span className={"dd num" + (typeof p.dday === "number" && p.dday <= 7 ? " hot" : "")}>{dd}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      {d && !st.err && <p className="xs c3 local-src">출처 {d.source || "잡알리오"}, 지역인재 기준 대전광역시</p>}
    </section>
  );
}
