import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "./ds";
import JobPostingCard from "./components/JobPostingCard";
import HomeNotice from "./components/home/HomeNotice";

/* 홈 "지금 열린 공공기관 공고" — 서버 /api/postings (잡알리오 데이터, 2시간 캐시)
   추천 3건을 유지하고 전체 탐색은 전용 채용공고 화면으로 이동 */
const REGION_KEY = "cc_post_region";
function loadRegion() {
  try { return localStorage.getItem(REGION_KEY) || "대전·충청"; } catch { return "대전·충청"; }
}

/* onStatus(실패 여부): 홈이 "여러 요청이 함께 실패했는지" 판단하는 데 쓴다
   reloadKey: 홈 상단 공통 "다시 시도"가 바뀌면 다시 불러온다 (요청 형식은 그대로)
   quiet: 홈 상단 공통 오류가 떠 있으면 섹션 안 오류 문구 없이 비워 둔다 */
export default function JobPostings({ api, job, sub, career, companies, onPractice, onBrowse, onStatus, reloadKey = 0, quiet = false }) {
  const scope = job ? "job" : "region";
  const [region] = useState(loadRegion);
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
  }, [api, job, sub, career, compKey, scope, region, reload, reloadKey]);

  useEffect(() => { if (onStatus) onStatus(err); }, [err, onStatus]);

  if (data && !data.available) return null;

  const items = data ? data.items : [];
  const counts = data ? data.company_counts || {} : {};
  const privateOnly = scope === "company" && companies.length > 0 && Object.values(counts).every((n) => n === 0);

  return (
    <section className="home-sec" aria-labelledby="recommended-jobs-title">
      <SectionHeader id="recommended-jobs-title" title="추천 채용공고" meta={job ? `${job}${sub ? " · " + sub : ""} 기준` : ""} action="전체 공고" onAction={onBrowse} />

      {err ? (
        quiet ? <div className="home-quiet" aria-hidden="true" /> : <HomeNotice text="공고를 불러오지 못했어요" onRetry={() => setReload((n) => n + 1)} />
      ) : !data ? (
        <div className="skel-stack" role="status" aria-label="추천 채용공고 불러오는 중"><span className="skel" /><span className="skel" /><span className="skel" /></div>
      ) : items.length === 0 || (scope === "job" && !job) || (scope === "company" && companies.length === 0) ? (
        <p className="home-empty">
          <span>{scope === "job" && !job
            ? "면접을 한 번 보거나 관심 회사를 추가하면 내 직무에 맞는 공고를 골라드려요."
            : scope === "company" && companies.length === 0
              ? "관심 회사를 추가하면 그 기관의 공고를 모아 보여드려요."
              : privateOnly
                ? "관심 회사의 공고가 없어요. 지금은 공공기관 공고만 연결돼 있어요."
                : "지금 조건에 맞는 진행 중 공고가 없어요."}</span>
          <button type="button" className="btn btn-text btn-sm" onClick={onBrowse}>전체 공고 보기<ChevronRight size={14} aria-hidden="true" /></button>
        </p>
      ) : (
        <ul className="posts">
          {items.slice(0, 4).map(p => <JobPostingCard key={p.id} posting={p} onPractice={() => onPractice({ company: p.inst, job: p.suggest_job || job, sub: p.suggest_sub || sub })} />)}
        </ul>
      )}

      {!err && <p className="t-caption src-note">출처: {data ? data.source : "잡알리오"} · 2시간마다 갱신 · 지원 전 원문 공고를 꼭 확인하세요</p>}
    </section>
  );
}
