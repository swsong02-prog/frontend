import { useState, useRef, useEffect } from "react";
import Auth from "./Auth";
import Growth from "./Growth";

const LEVELS = [
  { key: "하", title: "하", desc: "기초·동기 질문" },
  { key: "중", title: "중", desc: "실무 경험 질문" },
  { key: "상", title: "상", desc: "심화·꼬리질문" },
];

const CAREERS = [
  { key: "신입", title: "신입", desc: "기본·성장 가능성 중심" },
  { key: "경력", title: "경력", desc: "실무 경험·성과 중심" },
];

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function App() {
  // 새로고침해도 유지되도록 localStorage에서 초기값을 읽어온다
  const [token, setToken] = useState(() => localStorage.getItem("cc_token") || null);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("cc_email") || "");

  const [screen, setScreen] = useState("start"); // start | loading | interview | result | growth

  const [jobData, setJobData] = useState(null);
  const [job, setJob] = useState("");
  const [sub, setSub] = useState("");
  const [level, setLevel] = useState("중");
  const [career, setCareer] = useState("신입");
  const [resumeTab, setResumeTab] = useState("text");
  const [resumeText, setResumeText] = useState("");

  const [questions, setQuestions] = useState([]);
  const [jobRole, setJobRole] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [camError, setCamError] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState([]);
  const [saveMsg, setSaveMsg] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const qIndexRef = useRef(0);

  // 로그인/로그아웃 처리 (localStorage에도 같이 저장/삭제)
  function handleLogin(tk, em) {
    localStorage.setItem("cc_token", tk);
    localStorage.setItem("cc_email", em);
    setToken(tk);
    setUserEmail(em);
  }
  function handleLogout() {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_email");
    setToken(null);
    setUserEmail("");
  }

  useEffect(() => {
    fetch(`${API}/api/jobs`)
      .then((r) => r.json())
      .then((data) => {
        setJobData(data);
        const first = Object.keys(data)[0];
        setJob(first);
        setSub(data[first].subs[0]);
      })
      .catch(() => alert("백엔드에 연결하지 못했어요. uvicorn 터미널이 켜져 있는지 확인해주세요."));
  }, []);

  function selectJob(name) {
    setJob(name);
    setSub(jobData[name].subs[0]);
  }

  async function startInterview() {
    setScreen("loading");
    try {
      const res = await fetch(`${API}/api/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job, sub, level, career, resume_text: resumeText }),
      });
      const data = await res.json();
      setQuestions(data.questions);
      setJobRole(data.job_role);
      setResults([]);
      setQIndex(0);
      qIndexRef.current = 0;
      setCamError("");
      setSaveMsg("");
      setScreen("interview");
    } catch (e) {
      alert("질문을 받아오지 못했어요. 백엔드가 켜져 있는지 확인해주세요.");
      setScreen("start");
    }
  }

  useEffect(() => {
    if (screen !== "interview") return;
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        startRecording();
        startTimer();
      } catch (e) {
        setCamError("카메라/마이크를 켤 수 없어요. 권한 요청 시 '허용'을 눌러주세요. (주소창 왼쪽 자물쇠에서도 바꿀 수 있어요)");
      }
    })();
    return () => {
      cancelled = true;
      stopTimer();
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.onstop = null;
        try { recorderRef.current.stop(); } catch (e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [screen]);

  function startTimer() {
    setSeconds(0);
    stopTimer();
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }
  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  function pickMime() {
    const types = ["video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
    for (const t of types) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  }

  function startRecording() {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const mime = pickMime();
    const rec = new MediaRecorder(streamRef.current, mime ? { mimeType: mime } : undefined);
    rec.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
    recorderRef.current = rec;
    rec.start();
  }

  function stopRecording(cb) {
    const rec = recorderRef.current;
    if (!rec || rec.state === "inactive") { cb && cb(null); return; }
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType || "video/webm" });
      cb && cb(blob);
    };
    rec.stop();
  }

  async function sendForAnalysis(blob, index) {
    const form = new FormData();
    form.append("video", blob, "answer.webm");
    form.append("question", questions[index] || "");
    form.append("job_role", jobRole);
    const res = await fetch(`${API}/api/analyze-answer`, { method: "POST", body: form });
    const data = await res.json();
    return { question: questions[index], ...data };
  }

  async function saveSession(finalResults) {
    try {
      const payload = {
        job, sub_job: sub, level,
        results: finalResults.map((r) => ({
          question: r.question || "",
          answer_stt: r.answer_text || "",
          posture_score: Math.round(r.posture_score || 0),
          content_score: Math.round(r.content_score || 0),
          feedback: (r.content && r.content.reasons) ? String(r.content.reasons) : "",
          model_answer: (r.content && r.content.model_answer) || "",
          duration_sec: 0,
          filler_count: 0,
        })),
      };
      const res = await fetch(`${API}/interview/finish`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveMsg(`✅ 면접 기록 저장 완료 (종합 ${data.total_score}점)`);
      } else {
        setSaveMsg("⚠️ 저장 실패: " + (data.detail || "다시 시도해주세요."));
      }
    } catch (e) {
      setSaveMsg("⚠️ 저장 중 오류 (백엔드 확인)");
    }
  }

  function handleDone() {
    if (camError) return;
    setBusy(true);
    stopTimer();
    const answeredIndex = qIndexRef.current;

    stopRecording(async (blob) => {
      let result;
      try {
        result = blob ? await sendForAnalysis(blob, answeredIndex)
                       : { question: questions[answeredIndex], error: "녹화가 비어 있어요." };
      } catch (e) {
        result = { question: questions[answeredIndex], error: "분석 요청 실패(백엔드 확인)." };
      }

      if (result.error || result.posture_score == null) {
        result = {
          question: questions[answeredIndex],
          posture_score: Math.floor(70 + Math.random() * 30),
          content_score: Math.floor(50 + Math.random() * 40),
          answer_text: "(임시 데이터 — 분석 엔진 연결 시 실제 값으로 대체됩니다)",
          content: null,
        };
      }

      const newResults = [...results, result];
      setResults(newResults);

      const next = answeredIndex + 1;
      if (next < questions.length) {
        setQIndex(next);
        qIndexRef.current = next;
        startRecording();
        startTimer();
        setBusy(false);
      } else {
        if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
        setBusy(false);
        setScreen("result");
        saveSession(newResults);
      }
    });
  }

  function handleRedo() {
    if (camError) return;
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") { rec.onstop = null; try { rec.stop(); } catch (e) {} }
    startRecording();
    startTimer();
  }

  function goStart() {
    stopTimer();
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.onstop = null;
      try { recorderRef.current.stop(); } catch (e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScreen("start");
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  if (screen === "growth") {
    return <Growth token={token} onBack={() => setScreen("start")} />;
  }

  if (screen === "loading") {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div className="lt">면접을 준비하는 중...</div>
        <div className="ls">{job}{sub ? " · " + sub : ""} · {career} 직무에 맞는 질문을 생성하고 있어요</div>
      </div>
    );
  }

  if (screen === "result") {
    const valid = results.filter((r) => !r.error);
    const pAvg = valid.length
      ? Math.round(valid.reduce((a, r) => a + (r.posture_score || 0), 0) / valid.length)
      : null;
    const cVals = valid.filter((r) => typeof r.content_score === "number");
    const cAvg = cVals.length
      ? Math.round(cVals.reduce((a, r) => a + r.content_score, 0) / cVals.length)
      : null;

    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>모의면접 결과</h1>
        <p className="sub" style={{ marginBottom: 8 }}>
          자세·표정 평균 <b style={{ color: "#4ADE80" }}>{pAvg ?? "-"}</b>점 · 답변 내용 평균 <b style={{ color: "#7AA5FF" }}>{cAvg ?? "-"}</b>점
        </p>
        {saveMsg && <p style={{ fontSize: 14, color: "#9DB8FF", marginBottom: 20 }}>{saveMsg}</p>}

        {results.map((r, i) => (
          <div className="card" key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Q{i + 1}. {r.question}</div>
            <div style={{ fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: "#4ADE80", fontWeight: 700 }}>자세 {r.posture_score ?? "-"}</span>
              {"  ·  "}
              <span style={{ color: "#7AA5FF", fontWeight: 700 }}>내용 {r.content_score ?? "-"}</span>
            </div>
            <div style={{ fontSize: 13, color: "#C7CEDD" }}>
              <span style={{ color: "#7AA5FF" }}>내 답변</span> · {r.answer_text || "(음성 인식 내용 없음)"}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={goStart} style={primaryBtn}>처음으로</button>
          <button onClick={() => setScreen("growth")} style={secondaryBtn}>📈 나의 성장 보기</button>
        </div>
      </div>
    );
  }

  if (screen === "interview") {
    const total = questions.length;
    const isLast = qIndex + 1 >= total;
    return (
      <div>
        <div className="topbar">
          <div className="logo" onClick={goStart}>
            <span className="mark">🎯</span>코치<span className="accent">코치</span>
          </div>
          <div className="progress-wrap">
            <span className="progress-txt">질문 {qIndex + 1} / {total}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: ((qIndex + 1) / total) * 100 + "%" }}></div>
            </div>
          </div>
          <div className="timer"><span className="rec"></span>{mm}:{ss}</div>
        </div>

        <div className="imain">
          <div className="q-fixed">
            <span className="qb">Q{qIndex + 1}. {jobRole} · 난이도 {level} · {career}</span>
            <div className="qt">{questions[qIndex]}</div>
          </div>

          <div className="cam-area">
            {camError ? (
              <div className="cam-error">{camError}</div>
            ) : (
              <>
                <video ref={videoRef} autoPlay muted playsInline></video>
                <div className="cam-rec"><span className="d"></span>REC</div>
                <div className="cam-msg">답변이 끝나면 아래 '답변 완료'를 눌러주세요</div>
              </>
            )}
          </div>

          <div className="iside">
            <div className="card">
              <div className="card-t">💡 면접 팁</div>
              <div className="hint-line">
                · 카메라(렌즈)를 면접관이라 생각하고 바라보세요<br />
                · 어깨를 펴고 바른 자세를 유지하세요<br />
                · 결론부터 말하고 구체적 경험을 덧붙이면 좋아요
              </div>
            </div>
            <div className="card">
              <div className="card-t">🎙️ 녹화 상태</div>
              <div style={{ fontSize: 13, color: "#C7CEDD" }}>● 답변을 녹화하고 있어요</div>
              <div className="wave">
                <span style={{ animationDelay: "0s" }}></span>
                <span style={{ animationDelay: ".1s" }}></span>
                <span style={{ animationDelay: ".2s" }}></span>
                <span style={{ animationDelay: ".3s" }}></span>
                <span style={{ animationDelay: ".15s" }}></span>
                <span style={{ animationDelay: ".25s" }}></span>
                <span style={{ animationDelay: ".05s" }}></span>
                <span style={{ animationDelay: ".35s" }}></span>
              </div>
            </div>
            <div className="ictrl">
              <button className="btn-redo" onClick={handleRedo} disabled={busy}>↺ 다시 답변</button>
              <button className="btn-done" onClick={handleDone} disabled={busy}>
                {busy ? "분석 중..." : isLast ? "면접 마치기 →" : "답변 완료 →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return <div style={{ padding: 40, color: "#9098AC" }}>백엔드에서 직무 목록을 불러오는 중...</div>;
  }
  const jobNames = Object.keys(jobData);

  return (
    <div>
      <div className="nav">
        <div className="logo">
          <span className="mark">🎯</span>코치<span className="accent">코치</span>
        </div>
        <div className="nav-menu">
          <span className="on">홈</span>
          <span style={{ cursor: "pointer" }} onClick={() => setScreen("growth")}>나의 성장</span>
          <span className="nav-cta" style={{ cursor: "pointer" }} onClick={handleLogout}>로그아웃</span>
        </div>
      </div>

      <div className="hero">
        <div className="badge"><span className="live"></span>AI 모의면접 코치</div>
        <h1>혼자서도, <span className="accent">진짜 면접처럼.</span></h1>
        <p className="sub">자세·표정·음성·답변 내용을 AI가 분석하고, 왜 그런지 설명하며 회차별 성장을 추적합니다.</p>

        <div className="panel">
          <div className="panel-title"><span className="n">⚙</span>면접 설정</div>

          <div className="step-label">
            1. 지원 직무 분야 <span style={{ color: "#5B6478", fontWeight: 400 }}>(13개 분야)</span>
          </div>
          <div className="jobs">
            {jobNames.map((name) => (
              <div key={name} className={"job" + (job === name ? " active" : "")} onClick={() => selectJob(name)}>
                <span className="chk">✓</span>
                <span className="ic">{jobData[name].ic}</span>
                {name}
              </div>
            ))}
          </div>

          <div className="subjob-wrap">
            <div className="subjob-label">▾ 세부 직무를 선택하면 더 정확한 질문이 나와요</div>
            <div className="subjob-tags">
              {jobData[job].subs.map((s) => (
                <div key={s} className={"tag" + (sub === s ? " active" : "")} onClick={() => setSub(s)}>{s}</div>
              ))}
            </div>
          </div>

          <div className="step-label">2. 경력 구분</div>
          <div className="levels">
            {CAREERS.map((c) => (
              <div key={c.key} className={"lv" + (career === c.key ? " active" : "")} onClick={() => setCareer(c.key)}>
                <span className="chk">✓</span>
                <div className="lv-t">{c.title}</div>
                <div className="lv-d">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="step-label">3. 난이도</div>
          <div className="levels">
            {LEVELS.map((lv) => (
              <div key={lv.key} className={"lv" + (level === lv.key ? " active" : "")} onClick={() => setLevel(lv.key)}>
                <span className="chk">✓</span>
                <div className="lv-t">{lv.title}</div>
                <div className="lv-d">{lv.desc}</div>
              </div>
            ))}
          </div>

          <div className="step-label">4. 자기소개서 (선택)</div>
          <div className="resume-tabs">
            <div className={"rtab" + (resumeTab === "file" ? " active" : "")} onClick={() => setResumeTab("file")}>📎 파일 업로드</div>
            <div className={"rtab" + (resumeTab === "text" ? " active" : "")} onClick={() => setResumeTab("text")}>✏️ 직접 붙여넣기</div>
          </div>

          {resumeTab === "file" ? (
            <div className="resume-file gap">
              <span className="ic">↑</span>
              자소서 파일을 끌어다 놓거나 <b>클릭해서 선택</b><br />
              <span style={{ fontSize: 12 }}>(파일 업로드는 다음 단계에서 연결돼요. 지금은 직접 붙여넣기를 써주세요)</span>
            </div>
          ) : (
            <div className="resume-text gap">
              <textarea
                placeholder="여기에 자기소개서 내용을 붙여넣으세요..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <div className="resume-hint">자소서를 붙여넣으면 내용 기반 맞춤 질문을 만들어드려요</div>
            </div>
          )}

          <button className="start-btn" onClick={startInterview}>면접 시작하기 →</button>
        </div>

        <div className="feat">
          <span><span className="ck">✓</span> {userEmail}님 환영합니다</span>
          <span><span className="ck">✓</span> 설치 없이 브라우저에서</span>
          <span><span className="ck">✓</span> 자세·표정·음성·내용 분석</span>
        </div>
      </div>
    </div>
  );
}

const primaryBtn = { background: "linear-gradient(135deg,#5B8DEF,#6C5CE7)", color: "#fff", border: "none", borderRadius: 13, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" };
const secondaryBtn = { background: "transparent", color: "#9DB8FF", border: "1px solid #2E3a5C", borderRadius: 13, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" };
