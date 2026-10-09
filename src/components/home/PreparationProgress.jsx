import { ArrowRight, Check } from "lucide-react";

export default function PreparationProgress({ savedResume, selectedJob, companies, count, loading, unknown, onSelectJob, onResume, onInterview }) {
  // 표시용 집계만 수행한다. 완료 근거가 없는 약점 재연습은 항목에 포함하지 않는다.
  const milestones = [
    { label: "관심 직무 선택", done: !!selectedJob, next: "관심 직무를 선택해보세요", action: "직무 선택", go: onSelectJob },
    { label: "자기소개서 등록", done: !!savedResume?.text?.trim(), next: "자기소개서를 저장해보세요", action: "자기소개서 작성", go: onResume },
    { label: "관심 회사 등록", done: companies.length > 0, next: "관심 있는 회사를 추가해보세요", action: "관심 회사 추가", anchor: "#favorite-companies" },
    { label: "첫 모의면접 완료", done: count > 0, next: "첫 모의면접을 완료해보세요", action: "면접 준비", go: onInterview },
    { label: "3회 이상 연습", done: count >= 3, next: "3회 연습으로 답변을 다듬어보세요", action: "다시 연습", go: onInterview },
  ];
  const complete = milestones.filter(item => item.done).length;
  const next = milestones.find(item => !item.done);
  const percent = Math.round(complete / milestones.length * 100);
  return <section className="preparation-progress" aria-labelledby="preparation-title">
    <h2 id="preparation-title">면접 준비도</h2>
    {loading ? <div className="preparation-skeleton" aria-label="준비 상태 불러오는 중"><span /><span /><span /></div> : unknown ? <p className="preparation-unavailable">기록을 불러온 뒤 준비도를 확인할 수 있어요.</p> : <>
      <div className="preparation-value"><b>{percent}<small>%</small></b><span>{complete} / {milestones.length} 완료</span></div>
      <div className="preparation-track" role="progressbar" aria-label="면접 준비도" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
      <div className="preparation-next"><span>{next ? "다음 단계" : "준비 완료"}</span><p>{next ? next.next : "꾸준한 연습으로 자신감을 쌓아보세요"}</p>
        {next?.anchor ? <a className="text-action" href={next.anchor}>{next.action}<ArrowRight size={16} aria-hidden="true" /></a> : <button type="button" className="text-action" onClick={next?.go || onInterview}>{next?.action || "면접 연습"}<ArrowRight size={16} aria-hidden="true" /></button>}
      </div>
      <details className="preparation-details"><summary>준비 항목 보기</summary><ul>{milestones.map(item => <li key={item.label}><Check size={15} aria-hidden="true" className={item.done ? "complete" : "incomplete"} />{item.label}<span>{item.done ? "완료" : "미완료"}</span></li>)}</ul></details>
    </>}
  </section>;
}
