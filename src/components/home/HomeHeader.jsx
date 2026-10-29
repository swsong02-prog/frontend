/* 홈 맨 위: 인사말은 작은 한 줄로 낮춘다 (무엇을 준비하는지가 먼저 보이게). 페이지 제목(h1)은 화면 읽기용 */
export default function HomeHeader({ name, date }) {
  return (
    <header className="home-greet">
      <h1 className="sr-only">홈</h1>
      <p className="t-sub">{name}님, 오늘은 {date}이에요</p>
    </header>
  );
}
