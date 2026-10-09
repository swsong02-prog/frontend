import { MessageCircle, Video, MessageSquareText, History } from "lucide-react";

export default function AuthIntro() {
  return <div className="auth-brand"><div className="auth-logo"><span className="mark"><MessageCircle size={20} aria-hidden="true" /></span>코치코치</div>
    <h1 className="auth-brand-title">연습이 쌓이면,<br />면접이 달라져요.</h1><p className="auth-tag">실전처럼 답하고, 나에게 필요한 피드백을 확인하세요.</p>
    <ul className="auth-points"><li><Video size={20} aria-hidden="true" /><div><b>내 직무에 맞는 모의면접</b><span>직무와 경험을 바탕으로 질문을 준비해요.</span></div></li><li><MessageSquareText size={20} aria-hidden="true" /><div><b>답변마다 구체적인 피드백</b><span>자세·표정과 답변 내용을 함께 살펴봐요.</span></div></li><li><History size={20} aria-hidden="true" /><div><b>기록으로 확인하는 변화</b><span>지난 답변과 비교하며 다음 면접을 준비해요.</span></div></li></ul>
  </div>;
}
