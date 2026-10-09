import { ArrowUpRight, MapPin } from "lucide-react";

function ddayText(day) {
  if (day == null) return "상시";
  if (day < 0) return "마감";
  if (day === 0) return "오늘 마감";
  return `D-${day}`;
}

export default function JobPostingCard({ posting, onPractice }) {
  return <li className="post-row"><div className="post-main"><div className="post-top"><span className="post-inst">{posting.inst}</span><span className={"post-dday" + (posting.dday != null && posting.dday <= 3 ? " soon" : "")}>{ddayText(posting.dday)}</span></div>
    <a className="post-title" href={posting.url} target="_blank" rel="noopener noreferrer">{posting.title}</a>
    <div className="post-meta"><MapPin size={14} aria-hidden="true" /><span>{[posting.region && posting.region.split(",").length > 3 ? "전국" : posting.region, posting.hire, posting.se, posting.nope ? `${posting.nope}명` : ""].filter(Boolean).join(" · ")}</span></div></div>
    <div className="post-acts"><button type="button" className="dream-go" onClick={onPractice}>면접 연습</button>{posting.url && <a className="dream-more" href={posting.url} target="_blank" rel="noopener noreferrer">공고 보기<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
  </li>;
}
