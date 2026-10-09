import { Lightbulb, ArrowRight } from "lucide-react";
import { IconCheck } from "../../ui";
import SectionHeading from "./SectionHeading";

export default function TodayPreparation({ hasHistory, tips, checklist, checks, onToggleCheck, onFeedback }) {
  return <section className="today-preparation" aria-labelledby="today-preparation-title">
    <SectionHeading id="today-preparation-title" title="오늘의 준비" />
    <div className="today-tip"><Lightbulb size={20} aria-hidden="true" /><div><h3>{hasHistory ? "지난 면접에서 한 단계 더" : "답변은 결론부터 말해보세요"}</h3><p>{tips[0]}</p></div></div>
    {hasHistory && <button type="button" className="text-action" onClick={onFeedback}>개선 포인트 확인<ArrowRight size={16} aria-hidden="true" /></button>}
    <details className="today-checklist"><summary>시작 전 체크<span>{checks.length} / {checklist.length}</span></summary><ul className="check-list">{checklist.map((label, index) => <li key={label}><button type="button" className={"check-item" + (checks.includes(index) ? " on" : "")} aria-pressed={checks.includes(index)} onClick={() => onToggleCheck(index)}><span className="cbox"><IconCheck size={12} /></span><span className="clabel">{label}</span></button></li>)}</ul></details>
  </section>;
}
