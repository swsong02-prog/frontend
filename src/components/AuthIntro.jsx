import { useState } from "react";

/* 로그인 화면 왼쪽 (v6, 11/10): 로그인 전에 제품 화면을 먼저 보여 준다
   - 미리 보기 3개(면접 화면, 결과표, 지역인재 공고)는 예시 화면이다. 실제 기록이 아니다
   - 후기, 이용자 수, 기업 로고는 넣지 않는다 (CLAUDE.md: 실사용 기록 과장 금지) */
const TABS = [
  { key: "q", label: "면접 화면" },
  { key: "r", label: "결과표" },
  { key: "j", label: "지역인재 공고" },
];

function Demo({ tab }) {
  if (tab === "q") {
    return (
      <>
        <p className="ad-from">면접관 질문, 5 / 6</p>
        <p className="ad-q">입사하면 가장 먼저 해 보고 싶은 일은 무엇인가요?</p>
        <div className="ad-draft">
          <p className="ad-l"><b>첫 문장만</b> 보여 드려요. 나머지는 직접 이어서 말해 보세요.</p>
          <p className="ad-t">화폐와 신분증처럼 <mark>멈추면 안 되는 시스템</mark>의 운영 절차부터 익히고 싶습니다.</p>
        </div>
      </>
    );
  }
  if (tab === "r") {
    const rows = [["답변 내용", "72점", "적당", true], ["평균 답변 길이", "42초", "적당", true], ["첫 마디까지", "2.8초", "적당", true], ["자세와 표정", "65점", "낮음", false], ["“음, 어” 같은 습관어", "3회", "적당", true]];
    return (
      <table className="ad-table">
        <tbody>{rows.map(([n, v, j, ok]) => <tr key={n}><td>{n}</td><td className="num r">{v}</td><td className={"r " + (ok ? "ok" : "warn")}>{j}</td></tr>)}</tbody>
      </table>
    );
  }
  const jobs = [["한국수자원공사", "2026 하반기 신입 (전산)", "D-1", true], ["국가철도공단", "신입사원 공개채용 (전산)", "D-3", true], ["한국조폐공사", "일반직 6급 신입 (IT)", "D-4", true], ["한국철도공사", "IT 직렬 신입사원", "D-13", false]];
  return (
    <table className="ad-table">
      <tbody>{jobs.map(([i, t, d, hot]) => <tr key={i}><td><b>{i}</b></td><td>{t}</td><td className={"num r" + (hot ? " hot" : "")}>{d}</td></tr>)}</tbody>
    </table>
  );
}

export default function AuthIntro() {
  const [tab, setTab] = useState("q");
  return (
    <div className="auth-intro">
      <div className="auth-brand" translate="no">코치코치<small>대전대학교</small></div>
      <h1 className="auth-headline">대전대 학생을 위한 모의면접 연습</h1>
      <p className="auth-lead">카메라 앞에서 질문 6개에 답하면 말 속도와 시선, 답변 길이를 재서 결과표로 돌려드려요.</p>

      <div className="auth-demo">
        <div className="ad-tabs" role="group" aria-label="미리 보기">
          {TABS.map((t) => (
            <button key={t.key} type="button" aria-pressed={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div className="ad-body" aria-live="polite"><Demo tab={tab} /></div>
        <p className="ad-note">미리 보기는 예시 화면이에요.</p>
      </div>

      <ul className="auth-facts">
        <li><b>무료, 한 번에 12분</b>질문 6개를 녹화하고 바로 결과를 봐요.</li>
        <li><b>지역인재 53개 기관</b>대전, 충청 공공기관 공고로 바로 연습해요.</li>
        <li><b>영상은 밖으로 안 나가요</b>외부 AI 회사 서버로 보내지 않아요.</li>
      </ul>
    </div>
  );
}
