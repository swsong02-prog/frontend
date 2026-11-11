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
      <div className="lc-head">
        <div>
          <h2 id="local-title">대전, 충청 지역인재 대상 공고{d && <span className="num">{total}건</span>}</h2>
          <p>대전대 졸업생과 졸업예정자는 아래 기관의 신규 채용에서 지역인재로 인정돼요. {st.byJob ? `${job} 직무에 맞는 공고부터 보여 드려요.` : "마감이 가까운 순서예요."}</p>
        </div>
        <button type="button" className="lnk" onClick={onBrowse}>{d ? `${total}건 모두 보기` : "공고 모두 보기"}</button>
      </div>
      {st.err ? (
        quiet ? <div className="home-quiet" aria-hidden="true" />
          : <p className="loop-err" role="alert"><span>공고를 불러오지 못했어요.</span><button type="button" className="btn btn-text btn-sm" onClick={() => setReload((n) => n + 1)}>다시 시도</button></p>
      ) : !d ? (
        <div className="loop-skel" aria-hidden="true"><span className="skel" /><span className="skel" /><span className="skel" /></div>
      ) : items.length === 0 ? (
        <p className="lc-empty">지금은 마감 전인 지역인재 공고가 없어요. <button type="button" className="lnk" onClick={onBrowse}>다른 공고 둘러보기</button></p>
      ) : (
        <ul className="lc-list">
          {items.slice(0, 5).map((p) => {
            const dd = typeof p.dday === "number" ? (p.dday === 0 ? "오늘 마감" : `D-${p.dday}`) : "상시";
            const go = () => onPractice && onPractice({ company: p.inst, job: p.suggest_job || job, sub: p.suggest_sub || "" });
            return (
              <li key={p.id}>
                <b className="lc-inst">{p.inst}</b>
                <span className="lc-title">{p.title}</span>
                <span className={"dd num" + (typeof p.dday === "number" && p.dday <= 7 ? " hot" : "")}>{dd}</span>
                <button type="button" className="lc-try" onClick={go}>이 공고로 연습</button>
              </li>
            );
          })}
        </ul>
      )}
      {d && !st.err && <p className="lc-src">출처 {d.source || "잡알리오"}, 지역인재 기준은 대전광역시 공고를 따랐어요.</p>}
    </section>
  );
}
