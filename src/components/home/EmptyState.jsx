import { EmptyState as DsEmpty } from "../../ds";

/* 기존 호출부 호환용: 공통 EmptyState(작은 형태)로 위임. icon 인자는 더 이상 그리지 않는다 */
export default function EmptyState({ title, description, action, onAction, children }) {
  return <DsEmpty compact title={title} desc={description} action={action} onAction={onAction} secondary={children} />;
}
