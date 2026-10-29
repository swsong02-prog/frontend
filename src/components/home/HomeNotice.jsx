import { AlertTriangle } from "lucide-react";

/* 홈 오류 한 줄: 여러 요청이 함께 실패하면 페이지 상단(공통), 하나만 실패하면 그 섹션 안에서 쓴다 */
export default function HomeNotice({ text = "데이터를 불러오지 못했습니다", onRetry, global = false }) {
  return (
    <p className={"home-notice" + (global ? " is-global" : "")} role="alert">
      <AlertTriangle size={14} strokeWidth={2} aria-hidden="true" />
      <span>{text}</span>
      {onRetry && <button type="button" className="btn btn-text btn-sm" onClick={onRetry}>다시 시도</button>}
    </p>
  );
}
