import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader } from "./ds";
import { Search, SlidersHorizontal, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE = "cc_jobs_filter";
const SORTS = { match: "추천순", deadline: "마감임박순", recent: "최신순", nope: "채용인원순" };
const GROUPS = [
  { key: "regions", facet: "region", label: "근무 지역", defaults: ["서울", "경기", "인천", "대전", "세종", "충남", "충북", "대전·충청", "부산", "대구", "울산", "광주·전남", "전북", "경북", "경남", "강원", "제주"] },
  { key: "hires", facet: "hire", label: "고용형태", defaults: ["정규직", "무기계약직", "비정규직", "청년인턴"] },
  { key: "ses", facet: "se", label: "신입 / 경력", defaults: ["신입", "경력", "신입+경력"] },
];
const blank = () => ({ jobs: [], subs: [], regions: [], hires: [], ses: [], q: "", closing: "", sort: "match", page: 1 });
function restore(initialJob) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE));
    if (saved && typeof saved === "object") {
      const state = blank();
      for (const key of ["jobs", "subs", "regions", "hires", "ses"]) state[key] = Array.isArray(saved[key]) ? saved[key].filter(v => typeof v === "string") : [];
      state.q = typeof saved.q === "string" ? saved.q : "";
      state.closing = ["3", "7", "14"].includes(String(saved.closing)) ? String(saved.closing) : "";
      state.sort = SORTS[saved.sort] ? saved.sort : "match";
      state.page = Number.isInteger(saved.page) && saved.page > 0 ? saved.page : 1;
      return state;
    }
  } catch { /* 저장소가 막혀도 탐색은 가능 */ }
  return { ...blank(), jobs: initialJob ? [initialJob] : [] };
}
const dateText = value => {
  const raw = String(value || "").replace(/\D/g, "");
  return raw.length >= 8 ? `${raw.slice(0, 4)}.${raw.slice(4, 6)}.${raw.slice(6, 8)}` : "미정";
};
const dayText = day => day == null ? "상시" : day < 0 ? "마감" : day === 0 ? "오늘 마감" : `D-${day}`;
const regionText = region => String(region || "").split(",").length >= 4 ? "전국" : region;
function PostingInfo({ posting }) {
  return <div className="jb-info">
    <span className="jb-tags">{(posting.jobs || []).map(job => <span key={job}>{job}</span>)}</span>
    <span className="jb-meta">{[regionText(posting.region), posting.hire, posting.se, posting.nope != null && `${posting.nope}명 채용`].filter(Boolean).join(" · ")}</span>
    <span className="jb-period">접수 {dateText(posting.start)} ~ {dateText(posting.end)}{posting.acbg ? ` · ${posting.acbg}` : ""}</span>
  </div>;
}
function OriginalLink({ posting }) {
  return posting.url ? <a className="jb-original" href={posting.url} target="_blank" rel="noopener noreferrer">공고 원문<ArrowUpRight size={14} aria-hidden="true" /></a> : null;
}

// 시트가 열릴 때 포커스를 옮기고 키보드 이동을 안에 유지한다.
function useSheetFocus(ref, open, close) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const previous = document.activeElement;
    const panel = ref.current;
    panel.focus();
    const handler = event => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      const nodes = [...panel.querySelectorAll('button:not(:disabled), a[href], input, select, [tabindex="0"]')];
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) { event.preventDefault(); first?.focus(); }
    };
    panel.addEventListener("keydown", handler);
    return () => { panel.removeEventListener("keydown", handler); if (previous?.isConnected) previous.focus(); };
  }, [ref, open, close]);
}

export default function JobsBrowse({ api, jobData, jobNames, initialJob, career, onPractice }) {
  const [filters, setFilters] = useState(() => restore(initialJob));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailError, setDetailError] = useState("");
  const filterRef = useRef(null), detailRef = useRef(null), resultsRef = useRef(null);
  const closeDetail = useCallback(() => setSelected(null), []);
  const closeFilters = useCallback(() => setMobileFilters(false), []);
  useSheetFocus(filterRef, mobileFilters, closeFilters);
  useSheetFocus(detailRef, !!selected, closeDetail);

  useEffect(() => {
    if ((!mobileFilters && !selected) || !window.matchMedia("(max-width: 768px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileFilters, selected]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(filters)); } catch { /* 저장 실패는 화면을 막지 않음 */ }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const query = new URLSearchParams({ sort: filters.sort, page: String(filters.page), size: "20", career: career || "" });
      for (const key of ["jobs", "subs", "regions", "hires", "ses"]) if (filters[key].length) query.set(key, filters[key].join(","));
      if (filters.q.trim()) query.set("q", filters.q.trim());
      if (filters.closing) query.set("closing", filters.closing);
      try {
        const response = await fetch(`${api}/api/postings/browse?${query}`, { signal: controller.signal });
        if (!response.ok) throw new Error("http");
        const next = await response.json();
        if (!controller.signal.aborted) { setData(next); setError(false); setLoading(false); }
      } catch (err) { if (err.name !== "AbortError" && !controller.signal.aborted) { setError(true); setLoading(false); } }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [api, filters, career, reload]);

  useEffect(() => {
    if (!selected) return;
    const controller = new AbortController();
    fetch(`${api}/api/postings/${encodeURIComponent(selected.id)}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(response.status === 404 ? "마감됐거나 없는 공고예요" : "상세 공고를 불러오지 못했어요"); return response.json(); })
      .then(value => { if (!controller.signal.aborted) setDetail(value); })
      .catch(err => { if (!controller.signal.aborted) setDetailError(err.message); });
    return () => controller.abort();
  }, [api, selected, reload]);

  const update = patch => { setLoading(true); setFilters(current => ({ ...current, ...patch, page: patch.page || 1 })); };
  const toggle = (key, value) => {
    const values = filters[key].includes(value) ? filters[key].filter(item => item !== value) : [...filters[key], value];
    const patch = { [key]: values };
    if (key === "jobs") patch.subs = filters.subs.filter(sub => values.some(job => jobData?.[job]?.subs?.includes(sub)));
    update(patch);
  };
  const reset = () => { setLoading(true); setFilters(blank()); };
  const openDetail = posting => { setDetail(null); setDetailError(""); setSelected(posting); };
  const practice = posting => onPractice({ company: posting.inst, job: posting.suggest_job || filters.jobs[0], sub: posting.suggest_sub || filters.subs[0] });
  const facets = data?.facets || {};
  const subNames = [...new Set(filters.jobs.flatMap(job => jobData?.[job]?.subs || []))];
  const chips = ["jobs", "subs", "regions", "hires", "ses"].flatMap(key => filters[key].map(value => ({ key, value, label: value })));
  if (filters.closing) chips.push({ key: "closing", label: `${filters.closing}일 이내 마감` });
  if (filters.q) chips.push({ key: "q", label: `검색: ${filters.q}` });
  const currentPage = data?.page || filters.page;
  const pages = data?.pages || 1;
  const pageStart = Math.max(1, Math.min(currentPage - 2, pages - 4));
  const pageNumbers = Array.from({ length: Math.min(5, pages) }, (_, index) => pageStart + index);
  const shown = detail || selected;

  const filterContents = <>
    <div className="jb-filter-heading"><h2>조건 선택</h2><button type="button" className="jb-mobile-close" aria-label="필터 닫기" onClick={closeFilters}><X size={20} /></button></div>
    <label className="jb-search-label" htmlFor="jb-search">공고 검색</label>
    <div className="jb-search"><Search size={16} aria-hidden="true" /><input id="jb-search" value={filters.q} placeholder="기관명·제목·자격요건" onChange={event => update({ q: event.target.value })} /></div>
    {GROUPS.map(group => <fieldset key={group.key}><legend>{group.label}</legend>
      <div className={group.key === "regions" ? "jb-region-options" : ""}>{(data?.options?.[group.key] || group.defaults).map(value => <label className="jb-check" key={value}><input type="checkbox" checked={filters[group.key].includes(value)} onChange={() => toggle(group.key, value)} /><span>{value}</span><small>{facets[group.facet]?.[value] ?? "—"}</small></label>)}</div>
    </fieldset>)}
    <fieldset><legend>마감 임박</legend><div className="jb-closing">{["", "3", "7", "14"].map(value => <label key={value}><input type="radio" name="jb-closing" value={value} checked={filters.closing === value} onChange={() => update({ closing: value })} />{value ? `${value}일` : "전체"}</label>)}</div></fieldset>
    <button type="button" className="btn btn-text btn-sm jb-reset" onClick={reset}>필터 전체 해제</button>
    <button type="button" className="btn btn-primary btn-block jb-apply" onClick={closeFilters}>공고 보기{data ? ` · ${data.total}건` : ""}</button>
  </>;

  return <div className="jobs-browse">
    <PageHeader title="채용공고" desc="공공기관 공고를 직무로 좁혀 보고, 그 공고 조건으로 바로 면접을 연습하세요." actions={<span className="t-sub">진행 중 <b className="num">{data?.total_open?.toLocaleString() ?? "—"}</b>건</span>} />
    <section className="jb-job-section" aria-label="직군과 세부직무 선택">
      <div className="jb-section-label"><span className="field-label">직무</span><span className="t-caption">여러 개 선택할 수 있어요</span></div>
      <div className="chips jb-job-chips"><button type="button" className={"chip" + (!filters.jobs.length ? " on" : "")} aria-pressed={!filters.jobs.length} onClick={() => update({ jobs: [], subs: [] })}>전체</button>{jobNames.map(job => <button type="button" key={job} className={"chip" + (filters.jobs.includes(job) ? " on" : "")} aria-pressed={filters.jobs.includes(job)} onClick={() => toggle("jobs", job)}>{job}<small className="num">{facets.job?.[job] ?? "—"}</small></button>)}</div>
      {!!filters.jobs.length && <div className="chips jb-sub-chips"><span className="field-label">세부직무</span>{subNames.length ? subNames.map(sub => <button type="button" key={sub} disabled={facets.sub?.[sub] === 0 && !filters.subs.includes(sub)} aria-pressed={filters.subs.includes(sub)} className={"chip chip-sm" + (filters.subs.includes(sub) ? " on" : "")} onClick={() => toggle("subs", sub)}>{sub}<small className="num">{facets.sub?.[sub] ?? "—"}</small></button>) : <small>세부직무 정보를 불러오는 중이에요.</small>}</div>}
    </section>
    <div className="jb-selected" aria-label="선택한 필터"><button type="button" className="jb-filter-trigger" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={16} />필터{chips.length ? ` ${chips.length}` : ""}</button>{chips.length ? <>{chips.map(chip => <button type="button" key={`${chip.key}-${chip.label}`} onClick={() => chip.value ? toggle(chip.key, chip.value) : update({ [chip.key]: "" })} aria-label={`${chip.label} 필터 해제`}>{chip.label}<X size={13} /></button>)}<button type="button" className="jb-clear" onClick={reset}>전체 해제</button></> : <span>직무와 조건을 선택해 공고를 좁혀보세요.</span>}</div>
    <div className={`jb-layout${selected ? " has-detail" : ""}`}>
      <aside className={`jb-filter${mobileFilters ? " is-open" : ""}`}>
        <div className="jb-filter-backdrop" onClick={closeFilters} aria-hidden="true" />
        <div className="jb-filter-panel" ref={filterRef} tabIndex={-1} role={mobileFilters ? "dialog" : undefined} aria-modal={mobileFilters ? "true" : undefined} aria-label="채용공고 필터">{filterContents}</div>
      </aside>
      <section className="jb-results" aria-label="채용공고 목록" ref={resultsRef} aria-busy={loading}>
        <div className="jb-results-heading"><h2>총 <strong>{data?.total?.toLocaleString() ?? "—"}</strong>건</h2><label>정렬<select value={filters.sort} onChange={event => update({ sort: event.target.value })}>{Object.entries(SORTS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div>
        <div role="status" className="jb-status">{loading ? "공고를 찾고 있어요…" : error ? "공고 연결을 다시 확인해주세요." : `${data?.total ?? 0}건의 공고를 찾았어요.`}</div>
        {error ? <div className="jb-empty"><h3>공고를 불러오지 못했어요</h3><p>잠시 후 다시 시도해주세요.</p><button type="button" onClick={() => { setLoading(true); setReload(value => value + 1); }}>다시 시도</button></div> : data?.available === false ? <div className="jb-empty"><h3>공고를 아직 불러오지 못했어요</h3><p>공고가 준비되면 이곳에서 확인할 수 있어요.</p></div> : data && !data.items.length ? <div className="jb-empty"><h3>조건에 맞는 공고가 없어요</h3><p>필터를 줄이거나 다른 직무를 선택해보세요.</p><button type="button" onClick={reset}>전체 공고 보기</button></div> : !data ? <div className="jb-empty">공고를 불러오는 중이에요.</div> : <ul className={`jb-list${loading ? " is-loading" : ""}`}>{data.items.map(posting => <li key={posting.id} className={selected?.id === posting.id ? "selected" : ""} onClick={() => openDetail(posting)}>
          <div className="jb-row-top"><span>{posting.inst}</span><span className={`jb-dday${posting.dday != null && posting.dday >= 0 && posting.dday <= 3 ? " soon" : ""}`}>{dayText(posting.dday)}</span></div>
          <h3><button type="button" onClick={event => { event.stopPropagation(); openDetail(posting); }} aria-expanded={selected?.id === posting.id}>{posting.title}</button></h3>
          <PostingInfo posting={posting} />
          <div className="jb-row-actions" onClick={event => event.stopPropagation()}><button type="button" className="btn btn-secondary btn-sm" onClick={() => practice(posting)}>면접 연습</button><OriginalLink posting={posting} /></div>
        </li>)}</ul>}
        {data?.available && !error && data.total > 0 && <nav className="jb-pagination" aria-label="공고 페이지"><button type="button" aria-label="이전 페이지" disabled={currentPage <= 1 || loading} onClick={() => { update({ page: currentPage - 1 }); resultsRef.current?.scrollIntoView({ block: "start" }); }}><ChevronLeft size={16} /></button>{pageNumbers.map(page => <button type="button" key={page} disabled={loading} aria-current={page === currentPage ? "page" : undefined} onClick={() => { update({ page }); resultsRef.current?.scrollIntoView({ block: "start" }); }}>{page}</button>)}<button type="button" aria-label="다음 페이지" disabled={currentPage >= pages || loading} onClick={() => { update({ page: currentPage + 1 }); resultsRef.current?.scrollIntoView({ block: "start" }); }}><ChevronRight size={16} /></button><small>{currentPage} / {pages}</small></nav>}
        <p className="jb-source">출처: {data?.source || "잡알리오"} · 지원 전 원문 공고를 꼭 확인하세요.</p>
      </section>
      {selected && <><div className="jb-detail-backdrop" onClick={closeDetail} aria-hidden="true" /><aside className="jb-detail" ref={detailRef} role="dialog" aria-label="채용공고 상세" tabIndex={-1}>
        <div className="jb-detail-heading"><span>공고 자세히 보기</span><button type="button" aria-label="상세 닫기" onClick={closeDetail}><X size={20} /></button></div>
        <div className="jb-detail-body"><span className="jb-detail-inst">{shown.inst}</span><span className="jb-dday">{dayText(shown.dday)}</span><h2>{shown.title}</h2><PostingInfo posting={shown} />
          {detailError ? <div className="jb-empty" role="alert"><p>{detailError}</p>{!detailError.includes("없는") && <button type="button" onClick={() => { setDetailError(""); setReload(value => value + 1); }}>다시 시도</button>}</div> : !detail ? <p role="status">상세 공고를 불러오는 중이에요.</p> : <>{[["qual", "자격요건"], ["pref", "우대사항"], ["steps", "전형절차"], ["disqual", "결격사유"]].map(([key, label]) => detail[key]?.trim() ? <section className="jb-detail-section" key={key}><h3>{label}</h3><p>{detail[key]}</p></section> : null)}{detail.replmpr != null && detail.replmpr !== "" && <section className="jb-detail-section"><h3>대체인력 여부</h3><p>{detail.replmpr === true || detail.replmpr === "Y" ? "대체인력 채용" : "대체인력 채용 아님"}</p></section>}</>}
        </div>
        <div className="jb-detail-actions"><button type="button" className="btn btn-primary" disabled={!!detailError} onClick={() => practice({ ...shown, suggest_job: selected.suggest_job, suggest_sub: selected.suggest_sub })}>이 공고로 면접 연습</button><OriginalLink posting={shown} /></div>
      </aside></>}
    </div>
  </div>;
}
