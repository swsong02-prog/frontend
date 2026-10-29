import { ChevronRight } from "lucide-react";
import { fmtDateDot, scoreGrade } from "../../ui";
import { SectionHeader } from "../../ds";
import HomeNotice from "./HomeNotice";

const hasNum = (v) => typeof v === "number" && Number.isFinite(v);
const LV = { "하": "쉬움", "중": "보통", "상": "어려움" };

/* 홈: 최근 면접 목록 — 날짜 | 직무 | 회사 | 점수 | 상세보기
   회사는 기록 데이터의 company 필드를 그대로 쓴다 (없으면 "—")
   quiet: 페이지 상단 공통 오류가 떠 있을 때 — 섹션 안에서는 오류를 반복하지 않고 비워 둔다 */
export default function RecentInterviewCard({ session, sessions = [], loading, unknown, quiet, onRetry, onStart, onRecords, onDetail }) {
  const list = sessions.length ? sessions : session ? [session] : [];
  return (
    <section className="home-sec" aria-labelledby="recent-title">
      <SectionHeader id="recent-title" title="최근 면접" action={list.length ? "전체 기록" : null} onAction={onRecords} />
      {loading ? (
        <div className="skel-stack" aria-label="최근 면접 불러오는 중"><span className="skel" /><span className="skel" /><span className="skel" /></div>
      ) : unknown ? (
        quiet ? <div className="home-quiet" aria-hidden="true" /> : <HomeNotice text="면접 기록을 불러오지 못했어요" onRetry={onRetry} />
      ) : !list.length ? (
        <p className="home-empty">
          <span>아직 완료한 면접이 없어요. 첫 면접을 마치면 점수와 피드백이 여기에 쌓여요.</span>
          <button type="button" className="btn btn-text btn-sm" onClick={onStart}>첫 모의면접 시작<ChevronRight size={14} aria-hidden="true" /></button>
        </p>
      ) : (
        <div className="hl" role="table" aria-label="최근 면접">
          <div className="hl-head" role="row">
            <span role="columnheader">날짜</span>
            <span role="columnheader">직무</span>
            <span role="columnheader">회사</span>
            <span role="columnheader" className="hl-r">점수</span>
            <span role="columnheader"><span className="sr-only">상세</span></span>
          </div>
          {list.map((item, i) => {
            const g = scoreGrade(item.total_score);
            const open = item.session_id != null ? () => onDetail(item.session_id) : null;
            const company = item.company != null ? String(item.company).trim() : "";
            const cond = [item.career, item.level ? LV[item.level] || item.level : ""].filter(Boolean).join(" · ");
            return (
              <div key={item.session_id ?? i} className="hl-row" role="row">
                <span className="hl-date num" role="cell">{fmtDateDot(item.created_at)}</span>
                <span className="hl-job" role="cell">
                  <span className="hl-title">{[item.job, item.sub_job].filter(Boolean).join(" · ") || "모의면접"}</span>
                  {cond && <span className="hl-sub">{cond}</span>}
                </span>
                <span className={"hl-company" + (company ? "" : " none")} role="cell">{company || "회사 지정 안 함"}</span>
                <span className="hl-score" role="cell">
                  <b className="num">{hasNum(item.total_score) ? item.total_score : "—"}</b>
                  {g && <span className={"grade grade-" + g.cls}>{g.label}</span>}
                </span>
                <span className="hl-act" role="cell">
                  {open && <button type="button" className="btn btn-text btn-sm" onClick={open} aria-label={`${fmtDateDot(item.created_at)} ${item.job || ""} 면접 상세보기`}>상세보기<ChevronRight size={14} aria-hidden="true" /></button>}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
