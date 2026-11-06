/* ============================================================
   말문 트기 도움판 (면접 진행 화면, 질문 말풍선 아래)
   단계는 질문 번호(qIndex)로 정한다.
     0~1번: 전체 답안 / 2~3번: 핵심 단어 / 4번: 첫 문장 / 5번 이후: 없음(혼자 말하기)
   answer: {text, src} | null  (null = 자소서에 근거가 없음)
   ============================================================ */

/* 조사·어미를 떼고 명사 위주로 핵심 단어를 고른다 (형태소 분석기 없이 단순 규칙) */
const STOP = new Set([
  "저는", "제가", "저의", "그리고", "그래서", "하지만", "또한", "이를", "통해", "위해", "있습니다", "했습니다", "합니다",
  "되었습니다", "생각합니다", "경험이", "경험을", "때문에", "가장", "정말", "많은", "이런", "그런", "어떤", "것을", "것이",
  "있었습니다", "하였습니다", "그때", "당시", "이후", "먼저", "다음", "바탕으로", "있는", "하는", "했던", "되는", "같은",
]);
const JOSA = /(으로써|으로서|에서는|에게서|으로는|이라는|라는|에서|에게|으로|부터|까지|처럼|보다|와의|과의|하며|하고|해서|하여|했고|이고|이며|입니다|였습니다|이었습니다|은|는|이|가|을|를|의|에|와|과|도|로|만)$/;

export function keywordsOf(text, max = 6) {
  if (!text) return [];
  const out = [];
  String(text)
    .replace(/[.,!?'"“”‘’()[\]·:;]/g, " ")
    .split(/\s+/)
    .forEach((raw) => {
      if (!raw || STOP.has(raw)) return;
      if (/(습니다|했다|한다|었다|겠다|니다|어요|아요|해요|었고|였고|지만|면서|도록|려고|는데)$/.test(raw)) return; // 서술어는 뺀다
      let w = raw.replace(JOSA, "");
      if (w.length < 2 || STOP.has(w)) return;
      if (!out.includes(w)) out.push(w);
    });
  // 숫자·영문이 섞인 단어(구체적 사실)를 앞에 둔다
  out.sort((a, b) => Number(/[0-9A-Za-z]/.test(b)) - Number(/[0-9A-Za-z]/.test(a)));
  return out.slice(0, max);
}

export function firstSentence(text) {
  if (!text) return "";
  const m = String(text).trim().match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : String(text)).trim();
}

export function warmupStage(qIndex) {
  if (qIndex <= 1) return { key: "full", label: "전체 답안" };
  if (qIndex <= 3) return { key: "keywords", label: "핵심 단어" };
  if (qIndex === 4) return { key: "first", label: "첫 문장" };
  return { key: "none", label: "혼자 말하기" };
}

export default function WarmupPanel({ qIndex, answer, hasResume, noneGenerated = false }) {
  const stage = warmupStage(qIndex);
  const steps = ["전체 답안", "핵심 단어", "첫 문장", "혼자 말하기"];
  const curStep = steps.indexOf(stage.label);

  let body;
  if (stage.key === "none") {
    body = <p className="wu-note">도움 없이 말하는 단계입니다. 앞에서 연습한 흐름대로 답해 보세요.</p>;
  } else if (!answer || !answer.text) {
    // 답안이 하나도 없으면 생성 실패(워커 꺼짐, 옛 워커 등), 일부만 없으면 근거 부족으로 구분
    const msg = !hasResume ? "자소서 없이 시작해 답안 틀이 없습니다"
      : noneGenerated ? "이번 면접은 모범답안을 만들지 못했습니다. 분석 서버 상태를 확인한 뒤 다시 시작해 보세요."
      : "자소서에 이 질문에 쓸 경험이 없습니다";
    body = <p className="wu-note">{msg}</p>;
  } else if (stage.key === "full") {
    body = <p className="wu-text">{answer.text}</p>;
  } else if (stage.key === "keywords") {
    const kw = keywordsOf(answer.text);
    body = kw.length ? <ul className="wu-kw">{kw.map((k) => <li key={k}>{k}</li>)}</ul> : <p className="wu-text">{firstSentence(answer.text)}</p>;
  } else {
    body = <p className="wu-text">{firstSentence(answer.text)} <span className="c4">…</span></p>;
  }

  return (
    <section className="warmup" aria-label="말문 트기 도움">
      <div className="wu-h">
        <span className="tag tag-a">말문 트기</span>
        <ol className="wu-steps" aria-label="도움 단계">
          {steps.map((s, i) => <li key={s} className={i === curStep ? "on" : i < curStep ? "done" : ""}>{s}</li>)}
        </ol>
      </div>
      {body}
      {answer && answer.src && stage.key !== "none" && (
        <p className="wu-src"><span className="c3">자소서 근거</span> {answer.src}</p>
      )}
      {answer && answer.text && stage.key !== "none" && (
        <p className="wu-src c3">AI가 자소서를 바탕으로 만든 참고 초안입니다. 사실과 다른 부분은 내 경험대로 고쳐 말하세요.</p>
      )}
    </section>
  );
}
