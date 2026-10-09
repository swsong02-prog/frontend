import { CalendarDays } from "lucide-react";

export default function HomeHeader({ name, hasHistory, weeklyCount, unknown }) {
  return <header className="home-header"><div><h1>안녕하세요, {name}님</h1><p>{hasHistory ? "오늘도 면접 준비를 이어가볼까요?" : "오늘은 첫 번째 모의면접에 도전해보세요."}</p></div>
    <div className="home-weekly"><CalendarDays size={18} aria-hidden="true" /><span>이번 주 연습 <b>{unknown ? "—" : weeklyCount}<span> / 3회</span></b></span></div>
  </header>;
}
