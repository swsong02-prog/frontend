import { IconCheck } from "../../ui";

/* 홈 '다음 연습' 아래 연습 현황 한 줄: 이번 주 · 최근 점수(화면에서 파랑을 쓰는 유일한 숫자) · 총 연습 · 준비 항목
   quiet: 페이지 상단 공통 오류가 떠 있을 때 — 숫자 자리만 비워 둔다 */
export default function PreparationProgress({ savedResume, selectedJob, companies, count, weeklyCount, weekGoal = 3, lastScore, lastDate, loading, unknown, onSelectJob, onResume, onInterview }) {
  const milestones = [
    { label: "관심 직무 선택", done: !!selectedJob, action: "직무 선택", go: onSelectJob },
    { label: "자기소개서 등록", done: !!savedResume?.text?.trim(), action: "자기소개서 쓰기", go: onResume },
    { label: "관심 회사 등록", done: companies.length > 0, action: "관심 회사 추가", anchor: "#favorite-companies" },
    { label: "첫 모의면접 완료", done: count > 0, action: "면접 시작", go: onInterview },
    { label: "3회 이상 연습", done: count >= 3, action: "다시 연습", go: onInterview },
  ];
  const complete = milestones.filter((m) => m.done).length;
  const next = milestones.find((m) => !m.done);
  const dash = "—";
  const blank = loading || unknown;
  return (
    <div className="prep" aria-label="연습 현황" aria-busy={loading || undefined}>
      <dl className="prep-stats">
        <div className="is-key">
          <dt>최근 점수</dt>
          <dd>{blank || lastScore == null ? <b className="num muted">{dash}</b> : <><b className="num">{lastScore}</b><span>점</span></>}</dd>
          {lastDate && !blank && <dd className="prep-note">{lastDate}</dd>}
        </div>
        <div>
          <dt>이번 주</dt>
          <dd><b className="num">{blank ? dash : weeklyCount}</b><span> / {weekGoal}회</span></dd>
        </div>
        <div>
          <dt>총 연습</dt>
          <dd><b className="num">{blank ? dash : count}</b><span>회</span></dd>
        </div>
        <div className="prep-ms">
          <dt>준비 항목</dt>
          <dd><b className="num">{complete}</b><span> / {milestones.length}</span></dd>
        </div>
      </dl>
      <details className="prep-details">
        <summary>{next ? <>다음 할 일 · {next.label}</> : "모든 준비 항목을 마쳤어요"}</summary>
        <ul>
          {milestones.map((m) => (
            <li key={m.label} className={m.done ? "done" : ""}>
              <span className="tick" aria-hidden="true">{m.done && <IconCheck size={11} />}</span>
              <span>{m.label}</span>
              {!m.done && (m.anchor
                ? <a className="btn btn-text btn-sm" href={m.anchor}>{m.action}</a>
                : <button type="button" className="btn btn-text btn-sm" onClick={m.go}>{m.action}</button>)}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
