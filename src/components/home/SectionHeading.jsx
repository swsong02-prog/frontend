import { ArrowRight } from "lucide-react";

export default function SectionHeading({ id, title, action, onAction, children }) {
  return <div className="home-section-heading"><h2 id={id}>{title}</h2><div>{children}{action && <button type="button" className="text-action" onClick={onAction}>{action}<ArrowRight size={16} aria-hidden="true" /></button>}</div></div>;
}
