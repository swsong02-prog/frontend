import { ArrowUpRight } from "lucide-react";

function ddayText(day) {
  if (day == null) return "상시";
  if (day < 0) return "마감";
  if (day === 0) return "오늘 마감";
  return `D-${day}`;
}
/* "20261110" → "11.10" (형식이 다르면 빈 값) */
function endText(end) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(end || "").trim());
  return m ? `${Number(m[2])}.${m[3]}` : "";
}

/* 추천 채용공고 한 줄: 회사 · 직무(공고 제목) · 지역 · 마감일 · [면접 연습](외곽선) · 공고 보기(글자 링크) */
export default function JobPostingCard({ posting, onPractice }) {
  const soon = posting.dday != null && posting.dday >= 0 && posting.dday <= 3;
  const region = posting.region && posting.region.split(",").length > 3 ? "전국" : posting.region;
  const end = endText(posting.end);
  return (
    <li className="post">
      <span className="post-inst">{posting.inst}</span>
      <div className="post-main">
        <span className="post-title">{posting.title}</span>
        <span className="post-meta">{[posting.hire, posting.se].filter(Boolean).join(" · ")}</span>
      </div>
      <span className="post-region">{region || "—"}</span>
      <span className="post-dday">
        <b className={"num" + (soon ? " soon" : "")}>{ddayText(posting.dday)}</b>
        {end && posting.dday != null && <span className="num">{end} 마감</span>}
      </span>
      <div className="post-acts">
        <button type="button" className="btn btn-secondary btn-sm" onClick={onPractice}>면접 연습</button>
        {posting.url && <a className="post-link" href={posting.url} target="_blank" rel="noopener noreferrer" aria-label={`${posting.inst} ${posting.title} 공고 보기 (새 창)`}>공고 보기<ArrowUpRight size={13} aria-hidden="true" /></a>}
      </div>
    </li>
  );
}
