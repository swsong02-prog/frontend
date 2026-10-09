import { ArrowRight, BriefcaseBusiness, ChevronRight } from "lucide-react";

export default function InterviewHero({ job, sub, lastSession, onStart, onContinue, onSelectJob, onGuide, guideRef }) {
  return <section className="interview-hero" aria-labelledby="interview-hero-title">
    <h2 id="interview-hero-title">AI 모의면접</h2><p>실제 면접처럼 연습하고 답변별 AI 피드백을 받아보세요.</p>
    <button type="button" className="hero-job" onClick={onSelectJob}><BriefcaseBusiness size={18} aria-hidden="true" /><span><small>연습할 직무</small><b>{[job, sub].filter(Boolean).join(" · ") || "직무를 선택해보세요"}</b></span><ChevronRight size={18} aria-hidden="true" /></button>
    <div className="hero-actions"><button type="button" className="btn-primary" onClick={onStart}>모의면접 시작하기<ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="text-action hero-guide" ref={guideRef} onClick={onGuide}>면접 진행 방법</button>
      {lastSession && <button type="button" className="hero-continue text-action" onClick={onContinue}>지난 조건으로 이어서<ArrowRight size={16} aria-hidden="true" /></button>}
    </div>
  </section>;
}
