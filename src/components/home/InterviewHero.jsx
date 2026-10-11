import { ArrowRight, BriefcaseBusiness, ChevronRight, Video } from "lucide-react";

export default function InterviewHero({ job, sub, lastSession, onStart, onContinue, onSelectJob, onGuide, guideRef }) {
  return <section className="interview-hero" aria-labelledby="interview-hero-title">
    <svg className="hero-decoration" viewBox="0 0 168 168" fill="none" aria-hidden="true">
      <circle cx="87" cy="81" r="65" fill="#C4DCFF" />
      <rect x="25" y="36" width="97" height="70" rx="20" fill="#FFFFFF" />
      <path d="M47 101v18l22-16" fill="#FFFFFF" />
      <rect x="43" y="55" width="44" height="7" rx="3.5" fill="#1D4ED8" />
      <rect x="43" y="73" width="60" height="7" rx="3.5" fill="#AAC8F4" />
      <circle cx="121" cy="116" r="27" fill="#BFE8D2" />
      <path d="m110 116 8 8 15-17" stroke="#196045" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="135" cy="29" r="13" fill="#FAD8C0" />
      <circle cx="24" cy="131" r="10" fill="#D8C9EF" />
    </svg>
    <h2 id="interview-hero-title"><span className="heading-icon sky"><Video size={18} aria-hidden="true" /></span>AI 모의면접</h2><p>실제 면접처럼 연습하고 답변별 AI 피드백을 받아보세요.</p>
    <button type="button" className="hero-job" onClick={onSelectJob}><BriefcaseBusiness size={18} aria-hidden="true" /><span><small>연습할 직무</small><b>{[job, sub].filter(Boolean).join(" · ") || "직무를 선택해보세요"}</b></span><ChevronRight size={18} aria-hidden="true" /></button>
    <div className="hero-actions"><button type="button" className="btn-primary" onClick={onStart}>모의면접 시작하기<ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="text-action hero-guide" ref={guideRef} onClick={onGuide}>면접 진행 방법</button>
      {lastSession && <button type="button" className="hero-continue text-action" onClick={onContinue}>지난 조건으로 이어서<ArrowRight size={16} aria-hidden="true" /></button>}
    </div>
  </section>;
}
