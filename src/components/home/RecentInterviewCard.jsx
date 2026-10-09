import { History, ArrowRight } from "lucide-react";
import { fmtDateDot, sessionTitle } from "../../ui";
import EmptyState from "./EmptyState";
import SectionHeading from "./SectionHeading";

const hasNum = value => typeof value === "number" && Number.isFinite(value);
const score = value => hasNum(value) ? value : "—";
const AXES = ["논리성", "구체성", "직무적합도"]; // 기록 목록 응답에 없으면 줄 자체를 숨긴다

export default function RecentInterviewCard({ session, comment, loading, unknown, onRetry, onStart, onRecords, onDetail }) {
  const axes = session?.content?.scores || session?.content_scores || {};
  return <section className="recent-interview-section" aria-labelledby="recent-interview-title">
    <SectionHeading id="recent-interview-title" title="최근 면접" action="전체보기" onAction={onRecords} />
    {loading ? <div className="recent-interview-card home-loading" aria-label="최근 면접 불러오는 중"><span /><span /></div> : unknown ? <div className="recent-interview-card"><EmptyState icon={History} title="기록을 불러오지 못했어요" description="잠시 후 다시 확인해주세요." action="다시 불러오기" onAction={onRetry} /></div> : !session ? <div className="recent-interview-card"><EmptyState icon={History} title="첫 면접을 시작해보세요" description="면접을 완료하면 답변별 점수와 AI 피드백이 여기에 쌓여요." action="첫 모의면접 시작" onAction={onStart} /></div> :
      <article className="recent-interview-card">
        <div className="recent-summary"><div><h3>{sessionTitle(session)}</h3><p>{[session.sub_job, fmtDateDot(session.created_at)].filter(Boolean).join(" · ")}</p></div><div className="recent-total"><span>종합 점수</span><b>{score(session.total_score)}<small>점</small></b></div></div>
        <dl className="recent-scores"><div><dt>자세·표정</dt><dd>{hasNum(session.posture_score) ? session.posture_score : <span className="recent-na">측정 안 됨</span>}</dd></div><div><dt>답변 내용</dt><dd>{score(session.content_score)}</dd></div>{AXES.some(key => hasNum(axes[key])) && <div className="recent-content-axes"><dt>논리성 · 구체성 · 직무적합도</dt><dd>{AXES.map(key => score(axes[key])).join(" / ")}</dd></div>}</dl>
        <div className="recent-comment"><p>{comment || "지난 답변을 확인하고 다음 연습에 적용해보세요."}</p>{session.session_id != null && <button type="button" className="text-action" onClick={() => onDetail(session.session_id)}>피드백 다시 보기<ArrowRight size={16} aria-hidden="true" /></button>}</div>
      </article>}
  </section>;
}
