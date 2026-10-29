import { Play } from "lucide-react";
import { Button } from "../../ds";

/* 홈 상단: 다음 연습
   1단계 직무 · 세부직무(가장 크게, 그 자리에서 바로 바꿈) → 2단계 조건 한 줄 → 3단계 보조 한 줄 → 화면에서 가장 강한 CTA */
export default function InterviewHero({ jobPicker, career, level, company, ready, onStart, onEdit, onGuide, guideRef, children }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h2 className="hero-label" id="hero-title">다음 연습</h2>
      {jobPicker}
      <p className="hero-cond">
        <span>{career || "신입"}</span>
        <span>난이도 {level || "보통"}</span>
        <span>{company || "회사 지정 안 함"}</span>
      </p>
      <p className="hero-meta">질문 6개 · 약 12~18분</p>
      <div className="hero-actions">
        <Button variant="primary" size="lg" onClick={onStart}><Play size={16} strokeWidth={2} aria-hidden="true" />{ready ? "모의면접 시작" : "조건 고르고 시작하기"}</Button>
        <Button variant="text" onClick={onEdit}>세부 조건 변경</Button>
        <Button variant="text" onClick={onGuide} ref={guideRef}>진행 방법</Button>
      </div>
      {children}
    </section>
  );
}
