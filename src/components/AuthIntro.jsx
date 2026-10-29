import { MessageCircle } from "lucide-react";

/* 로그인 화면 왼쪽: 서비스 한 줄 소개 + 무엇을 하는지 3줄 (장식 없음) */
export default function AuthIntro() {
  return (
    <div className="auth-intro">
      <div className="auth-brand"><span className="sb-mark"><MessageCircle size={15} strokeWidth={2} aria-hidden="true" /></span>코치코치</div>
      <h1 className="auth-headline">직무에 맞춘 질문으로<br />실전처럼 연습하는 모의면접</h1>
      <ol className="auth-steps">
        <li><b>직무·회사 선택</b><span>학과나 직무로 고르고, 자기소개서를 붙이면 맞춤 질문이 나와요.</span></li>
        <li><b>웹캠으로 답변</b><span>질문마다 답변을 녹화하면 자세·표정과 답변 내용을 분석해요.</span></li>
        <li><b>기록으로 비교</b><span>회차별 점수와 반복 지적을 모아 다음 연습 과제를 정해요.</span></li>
      </ol>
    </div>
  );
}
