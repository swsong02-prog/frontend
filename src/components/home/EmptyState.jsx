import { ArrowRight } from "lucide-react";

export default function EmptyState({ icon: Icon, title, description, action, onAction, children }) {
  return <div className="home-empty"><span className="neutral-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
    <div className="home-empty-copy"><h3>{title}</h3><p>{description}</p>{action && <button type="button" className="text-action" onClick={onAction}>{action}<ArrowRight size={16} aria-hidden="true" /></button>}{children}</div>
  </div>;
}
