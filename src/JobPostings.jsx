import { useEffect, useState } from "react";

/* 홈 "지금 열린 공공기관 공고" — 서버 /api/postings (잡알리오 데이터, 2시간 캐시)
   탭: 내 직무 / 대전·충청 / 관심 회사. 공고 원문은 새 창, "면접 연습"은 그 기관 조건으로 설정 화면 이동 */
const TABS = [
  { key: "job", label: "내 직무" },
  { key: "region", label: "지역" },
  { key: "company", label: "관심 회사" },
];
const REGION_KEY = "cc_post_region";
const DEFAULT_REGIONS = ["전체", "서울", "경기", "인천", "대전", "세종", "충남", "충북", "대전·충청", "부산", "대구", "울산",
  "광주·전남", "전북", "경북", "경남", "강원", "제주"];
function loadRegion() {
  try { return localStorage.getItem(REGION_KEY) || "대전·충청"; } catch (e) { return "대전·충청"; }
}

function ddayText(d) {
  if (d == null) return "상시";
  if (d < 0) return "마감";
  if (d === 0) return "오늘 마감";
  return `D-${d}`;
}

export default function JobPostings({ api, job, sub, career, companies, onPractice }) {
  const [scope, setScope] = useState(job ? "job" : "region");
  const [region, setRegion] = useState(loadRegion);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [reload, setReload] = useState(0);
  const compKey = companies.join(",");

  useEffect(() => {
    let alive = true;
    const q = new URLSearchParams({ job: job || "", sub: sub || "", career: career || "", companies: compKey, scope, region, limit: "6" });
    fetch(`${api}/api/postings?${q}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (alive) { setData(d); setErr(false); } })
      .catch(() => { if (alive) setErr(true); });
    return () => { alive = false; };
  }, [api, job, sub, career, compKey, scope, region, reload]);

  const pickRegion = (r) => {
    setRegion(r);
    try { localStorage.setItem(REGION_KEY, r); } catch (e) { /* 기억 못 해도 동작엔 지장 없음 */ }
  };

  // 서버에 인증키가 없거나 공고를 아직 못 받았으면 카드 자체를 숨긴다 (죽은 UI 금지)
  if (data && !data.available) return null;

  const items = data ? data.items : [];
  const counts = data ? data.company_counts || {} : {};
  const privateOnly = scope === "company" && companies.length > 0 && Object.values(counts).every((n) => n === 0);

  return (
    <section className="dcard post-card rise" style={{ "--ri": 2 }}>
      <div className="dcard-head">
        <div className="dcard-t">지금 열린 공공기관 공고</div>
        {data && <span className="dist-total">진행 중 {data.total_open}건</span>}
      </div>

      <div className="post-tabs" role="tablist" aria-label="공고 보기 기준">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={scope === t.key}
            className={"post-tab" + (scope === t.key ? " on" : "")}
            onClick={() => setScope(t.key)}
          >
            {t.label}
            {t.key === "job" && job ? <small>{sub || job}</small> : null}
            {t.key === "region" ? <small>{region}</small> : null}
          </button>
        ))}
      </div>

      {(scope === "region" || scope === "job") && (
        <div className="post-region">
          <label htmlFor="post-region-sel">근무 지역</label>
          <select id="post-region-sel" value={region} onChange={(e) => pickRegion(e.target.value)}>
            {["전체", ...((data && data.regions) || DEFAULT_REGIONS.slice(1))].map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {scope === "job" && region !== "전체" && <span className="post-region-hint">이 지역 공고를 먼저 보여드려요</span>}
        </div>
      )}

      {err ? (
        <div className="dist-empty">
          공고를 불러오지 못했어요. <button type="button" className="link-btn" onClick={() => setReload((n) => n + 1)}>다시 시도</button>
        </div>
      ) : !data ? (
        <div className="post-skel" aria-hidden="true"><span /><span /><span /></div>
      ) : scope === "job" && !job ? (
        <div className="dist-empty">면접을 한 번 보거나 관심 회사를 추가하면 내 직무에 맞는 공고를 골라드려요.</div>
      ) : scope === "company" && companies.length === 0 ? (
        <div className="dist-empty">위에서 관심 회사를 추가하면 그 기관의 공고를 모아 보여드려요.</div>
      ) : items.length === 0 ? (
        <div className="dist-empty">
          {privateOnly
            ? "관심 회사의 공고가 없어요. 지금은 공공기관 공고만 연결돼 있어서 민간기업(KT클라우드 등)은 아직 나오지 않아요."
            : "조건에 맞는 진행 중 공고가 없어요."}
        </div>
      ) : (
        <ul className="post-list">
          {items.map((p) => (
            <li key={p.id} className="post-row">
              <div className="post-main">
                <div className="post-top">
                  <span className="post-inst">{p.inst}</span>
                  <span className={"post-dday" + (p.dday != null && p.dday <= 3 ? " soon" : "")}>{ddayText(p.dday)}</span>
                </div>
                <a className="post-title" href={p.url} target="_blank" rel="noopener noreferrer">{p.title}</a>
                <div className="post-meta">
                  {[p.region && p.region.split(",").length > 3 ? "전국" : p.region, p.hire, p.se, p.nope ? `${p.nope}명` : ""]
                    .filter(Boolean).join(" · ")}
                </div>
              </div>
              <div className="post-acts">
                <button type="button" className="dream-go" onClick={() => onPractice({ company: p.inst, job: p.suggest_job || job, sub: p.suggest_sub || sub })}>면접 연습</button>
                {p.url && <a className="dream-more" href={p.url} target="_blank" rel="noopener noreferrer">공고</a>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="post-src">출처: {data ? data.source : "잡알리오"} · 2시간마다 갱신 · 지원 전 원문 공고를 꼭 확인하세요</p>
    </section>
  );
}
