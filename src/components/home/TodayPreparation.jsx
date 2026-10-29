import { IconCheck } from "../../ui";
import { Meter } from "../../ds";

/* 홈 오른쪽 개인 준비 패널: 오늘의 준비 n/6 → 진행 표시 → 오늘의 핵심 Tip → 체크리스트
   체크 상태는 App이 localStorage(cc_checklist)에 저장한다 (날짜 기준 초기화 없음 — home-polish-report.md 참고) */
export default function TodayPreparation({ hasHistory, tips, checklist, checks, onToggleCheck, onFeedback }) {
  const done = checks.length;
  const all = checklist.length;
  return (
    <section className="today card" aria-labelledby="today-title">
      <div className="today-head">
        <h2 className="t-section" id="today-title">오늘의 준비</h2>
        <span className="today-count num" aria-label={`${all}개 중 ${done}개 완료`}><b>{done}</b> / {all}</span>
      </div>
      <Meter value={done} max={all} label="오늘의 준비 진행" />
      <div className="today-tip">
        <span className="today-tip-label">{hasHistory ? "지난 면접에서 · 오늘의 핵심 Tip" : "오늘의 핵심 Tip"}</span>
        <p>{tips[0]}</p>
        {hasHistory && <button type="button" className="btn btn-text btn-sm" onClick={onFeedback}>개선 포인트 보기</button>}
      </div>
      <ul className="checklist today-list">
        {checklist.map((label, index) => {
          const on = checks.includes(index);
          return (
            <li key={label}>
              <button type="button" className={"check" + (on ? " on" : "")} aria-pressed={on} onClick={() => onToggleCheck(index)}>
                <span className="check-box" aria-hidden="true"><IconCheck size={12} /></span>
                <span className="check-label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
