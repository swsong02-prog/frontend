/* ============================================================
   긴장 풀기 루틴 (면접 준비 화면, 녹화 전)
   근거: Desktop/08_취업_자소서_포트폴리오/면접긴장_대처법_연구보고서.md (2026-11-06)
     1) 사전 체크  2) 각성 재평가  3) 날숨을 길게 하는 호흡(4초 들이쉬고 6초 내쉬기)
     4) 이름을 부르는 자기대화  5) 오늘의 큐  6) 사후 체크
   - 루틴 동안 카메라 화면(셀프뷰)은 가린다: 관찰자 시점이 불안을 키운다는 국내 연구 근거
   - "안 떨리게" 같은 효과 약속 문구는 쓰지 않는다. 숨 참기 없음, 모든 단계 건너뛰기 가능
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const STEPS = ["긴장 체크", "생각 바꾸기", "호흡", "자기대화", "오늘의 큐", "마무리"];

export const CUE_OPTIONS = [
  "결론 먼저, 그다음 예시",
  "지금보다 조금 천천히",
  "경험은 숫자 하나와 함께",
  "답이 끝나면 렌즈를 보며 마무리",
];

function Scale({ value, onChange, min = 0, max = 10, left, right, label }) {
  const nums = [];
  for (let i = min; i <= max; i++) nums.push(i);
  return (
    <div className="cr-scale" role="radiogroup" aria-label={label}>
      <div className="cr-scale-row">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            className={"cr-scale-n" + (value === n ? " on" : "")}
            onClick={() => onChange(n)}
          >{n}</button>
        ))}
      </div>
      <div className="cr-scale-ends"><span>{left}</span><span>{right}</span></div>
    </div>
  );
}

/* 4초 들이쉬고 6초 내쉬기. 숨을 참는 구간은 없다 */
function Breathing({ seconds, inhale, exhale, onEnd }) {
  const [left, setLeft] = useState(seconds);
  const [t, setT] = useState(0); // 시작 후 경과 초
  const endRef = useRef(onEnd);
  endRef.current = onEnd;

  useEffect(() => {
    setLeft(seconds);
    setT(0);
    const start = performance.now();
    const id = setInterval(() => {
      const el = Math.floor((performance.now() - start) / 1000);
      setT(el);
      setLeft(Math.max(0, seconds - el));
      if (el >= seconds) { clearInterval(id); endRef.current(); }
    }, 250);
    return () => clearInterval(id);
  }, [seconds]);

  const cycle = inhale + exhale;
  const pos = t % cycle;
  const isIn = pos < inhale;
  const count = isIn ? inhale - pos : cycle - pos;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="cr-breath">
      <div
        className={"cr-circle" + (isIn ? " in" : " out")}
        style={{ transitionDuration: `${isIn ? inhale : exhale}s` }}
        aria-hidden="true"
      />
      <div className="cr-breath-label" aria-live="polite">
        <b>{isIn ? "들이쉬기" : "천천히 내쉬기"}</b>
        <span>{count}</span>
      </div>
      <div className="cr-breath-left">남은 시간 {mm}:{ss}</div>
    </div>
  );
}

export default function CalmRoutine({ userName = "", onDone, onClose }) {
  const [step, setStep] = useState(0);
  const [pre, setPre] = useState(null);
  const [energy, setEnergy] = useState("");
  const [breathLong, setBreathLong] = useState(false);
  const [breathSlow, setBreathSlow] = useState(true); // true: 4초·6초, false: 4초·5초
  const [breathRun, setBreathRun] = useState(false);
  const [talk, setTalk] = useState("");
  const [cues, setCues] = useState(CUE_OPTIONS.slice(0, 2));
  const [post, setPost] = useState(null);
  const [challenge, setChallenge] = useState(null);

  const name = (userName || "").trim();
  // 부르는 이름: 세 글자 한글 이름이면 성을 빼고, 받침 유무로 '아/야'를 붙인다 (경원 → 경원아, 민수 → 민수야)
  const given = /^[가-힣]{3}$/.test(name) ? name.slice(1) : name;
  const lastCode = given ? given.charCodeAt(given.length - 1) - 0xac00 : -1;
  const callName = !given ? "민수야"
    : lastCode >= 0 && lastCode <= 11171 ? `${given}${lastCode % 28 ? "아" : "야"}` : given;
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // 자기대화 안내: '나/저'로 시작하거나 막연한 긍정 문구면 고쳐 쓰도록 권한다
  const usesFirstPerson = /(^|[\s,.])(나|저|내가|제가|나는|저는)(?=[\s,.]|$)/.test(talk);
  const vague = /할\s?수\s?있/.test(talk);

  const toggleCue = (c) => {
    setCues((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : cur.length >= 2 ? [cur[1], c] : [...cur, c]));
  };

  const finish = () => {
    onDone({ pre, post, challenge, cues, energy: energy.trim(), talk: talk.trim() });
  };

  let body;
  if (step === 0) {
    body = (
      <>
        <h3 className="cr-h">면접 전에 6분만 몸과 생각을 정리해요</h3>
        <p className="cr-p">떨림을 없애는 것이 목표가 아닙니다. 떨려도 준비한 내용을 말할 수 있게 돕는 시간이에요. 연구에서 도움이 된 방법들을 면접 상황에 맞게 응용했고, 사람마다 효과는 다를 수 있어요.</p>
        <p className="cr-q">지금 긴장 정도는 몇 점인가요?</p>
        <Scale value={pre} onChange={setPre} left="전혀 긴장 안 됨" right="매우 긴장됨" label="지금 긴장 정도" />
        {pre === 10 && (
          <p className="cr-care">긴장이 너무 커서 일상이나 면접 자체가 어렵다면 학교 학생상담센터 같은 전문가와 이야기해 보세요. 이 루틴은 치료가 아니라 면접 준비를 돕는 도구입니다.</p>
        )}
      </>
    );
  } else if (step === 1) {
    body = (
      <>
        <h3 className="cr-h">긴장은 몸이 준비하고 있다는 신호일 수 있어요</h3>
        <p className="cr-p">면접 전에 긴장하는 것은 대부분의 지원자가 겪는 일이고, 실력이 없다는 뜻이 아닙니다. 지금 심장이 빨리 뛰는 것은 몸이 집중할 준비를 하는 반응일 수 있어요.</p>
        <p className="cr-p">긴장을 없애거나 숨기려고 애쓰기보다, 올라온 에너지를 답변에 써 보세요.</p>
        <label className="cr-field">
          <span>이 에너지를 오늘 답변 어디에 쓸지 한 문장으로 적어 보세요 (건너뛰어도 됩니다)</span>
          <input value={energy} onChange={(e) => setEnergy(e.target.value)} maxLength={80} placeholder="예) 프로젝트 이야기를 할 때 목소리에 힘을 싣겠다" />
        </label>
      </>
    );
  } else if (step === 2) {
    const secs = breathLong ? 240 : 150;
    body = (
      <>
        <h3 className="cr-h">목소리와 몸을 안정시키는 호흡</h3>
        <p className="cr-p">원이 커질 때 코로 들이쉬고, 작아질 때 입으로 길게 내쉬세요. 숨을 참을 필요는 없습니다. 눈은 떠도 괜찮고, 어지럽거나 불편하면 바로 멈추고 평소처럼 숨 쉬세요.</p>
        {breathRun ? (
          <Breathing seconds={secs} inhale={4} exhale={breathSlow ? 6 : 5} onEnd={() => { setBreathRun(false); next(); }} />
        ) : (
          <div className="cr-breath-start">
            <button type="button" className="btn btn-primary" onClick={() => setBreathRun(true)}>호흡 시작 ({breathLong ? "4분" : "2분 30초"})</button>
            <div className="cr-opts">
              <label><input type="checkbox" checked={!breathSlow} onChange={(e) => setBreathSlow(!e.target.checked)} /> 내쉬기가 길면 5초로 줄이기</label>
              {pre !== null && pre >= 8 && (
                <label><input type="checkbox" checked={breathLong} onChange={(e) => setBreathLong(e.target.checked)} /> 4분으로 늘리기</label>
              )}
            </div>
          </div>
        )}
      </>
    );
  } else if (step === 3) {
    body = (
      <>
        <h3 className="cr-h">코치가 말하듯 나에게 두 문장</h3>
        <p className="cr-p">자신을 이름이나 '너'로 부르며 써 주세요. 한 문장은 실제로 해낸 사실, 한 문장은 오늘 할 일입니다.</p>
        <p className="cr-ex">예) {callName}, 너는 그 프로젝트를 끝까지 해냈어. 떨려도 결론부터 말하면 돼.</p>
        <textarea className="cr-talk" rows={3} value={talk} onChange={(e) => setTalk(e.target.value)} maxLength={200} placeholder={`${callName}, 너는 ...`} />
        {usesFirstPerson && <p className="cr-tip">'나', '저' 대신 이름이나 '너'로 바꿔 써 보세요. 한 걸음 떨어져서 보면 더 차분하게 생각할 수 있어요.</p>}
        {vague && <p className="cr-tip">"할 수 있어" 대신 실제로 해낸 일 하나로 바꿔 볼까요?</p>}
      </>
    );
  } else if (step === 4) {
    body = (
      <>
        <h3 className="cr-h">면접 중에 기억할 큐 2개</h3>
        <p className="cr-p">질문과 질문 사이에 오른쪽 칸에 한 줄로 보여 드려요. 두 개까지 고를 수 있습니다.</p>
        <div className="cr-cues">
          {CUE_OPTIONS.map((c) => (
            <button key={c} type="button" className={"cr-cue" + (cues.includes(c) ? " on" : "")} aria-pressed={cues.includes(c)} onClick={() => toggleCue(c)}>{c}</button>
          ))}
        </div>
      </>
    );
  } else {
    body = (
      <>
        <h3 className="cr-h">마지막으로 두 가지만 체크해 주세요</h3>
        <p className="cr-q">지금 긴장 정도는 몇 점인가요?</p>
        <Scale value={post} onChange={setPost} left="전혀 긴장 안 됨" right="매우 긴장됨" label="루틴 후 긴장 정도" />
        <p className="cr-q">이번 면접은 나에게 어느 쪽에 가까운가요?</p>
        <Scale value={challenge} onChange={setChallenge} min={1} max={7} left="부담스러운 위협" right="해볼 만한 도전" label="위협과 도전" />
        <p className="cr-note">면접 중에는 내 모습이 가려진 채로 녹화됩니다. 오른쪽 '내 모습 보기'로 언제든 바꿀 수 있어요.</p>
      </>
    );
  }

  const canNext = step === 0 ? pre !== null : step === 2 ? !breathRun : true;

  return (
    <section className="calm-routine" aria-label="긴장 풀기 루틴">
      <div className="cr-top">
        <ol className="cr-steps" aria-label="루틴 단계">
          {STEPS.map((s, i) => <li key={s} className={i === step ? "on" : i < step ? "done" : ""}>{s}</li>)}
        </ol>
        <button type="button" className="cr-close" onClick={onClose}>루틴 닫기</button>
      </div>
      <div className="cr-body">{body}</div>
      <div className="cr-nav">
        {step > 0 && <button type="button" className="btn btn-secondary" onClick={() => { setBreathRun(false); prev(); }}>이전</button>}
        <span className="cr-spacer" />
        {step === 2 && breathRun && <button type="button" className="btn btn-secondary" onClick={() => { setBreathRun(false); next(); }}>건너뛰기</button>}
        {step === 2 && !breathRun && <button type="button" className="btn btn-secondary" onClick={next}>호흡 건너뛰기</button>}
        {step < STEPS.length - 1 && step !== 2 && (
          <button type="button" className="btn btn-primary" onClick={next} disabled={!canNext}>다음</button>
        )}
        {step === STEPS.length - 1 && (
          <button type="button" className="btn btn-primary" onClick={finish}>루틴 마치기</button>
        )}
      </div>
    </section>
  );
}
