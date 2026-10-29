import { SectionHeader } from "../../ds";

/* 홈 섹션 제목 (공통 SectionHeader 래퍼, 기존 호출부 호환) */
export default function SectionHeading({ id, title, action, onAction, children, meta }) {
  return <SectionHeader id={id} title={title} meta={meta} action={action} onAction={onAction}>{children}</SectionHeader>;
}
