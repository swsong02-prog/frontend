import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import AuthIntro from "./components/AuthIntro";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function BtnSpinner({ size = 14 }) {
  return <LoaderCircle className="btn-spin" size={size} aria-hidden="true" />;
}

// 로그인/회원가입 화면. 로그인 성공하면 onLogin(토큰, 이메일, 이름)을 불러준다.
export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgOk, setMsgOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setMsg("");
    setMsgOk(false);
    if (mode === "signup" && !name.trim()) {
      setMsg("이름을 입력해주세요.");
      return;
    }
    if (!email || !password) {
      setMsg("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        // 1) 회원가입 요청
        const res = await fetch(`${API}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name: name.trim() }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMsg(data.detail || "회원가입에 실패했습니다. 다시 시도해주세요.");
          setBusy(false);
          return;
        }
        // 가입 성공 → 바로 아래 로그인 요청으로 이어서 자동 로그인
      }

      // 2) 로그인 요청
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.detail || "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        setBusy(false);
        return;
      }
      // 3) 로그인 성공 → 토큰을 부모(App)에게 넘김
      onLogin(data.access_token, email, data.name || (mode === "signup" ? name.trim() : ""));
    } catch (e) {
      setMsg("일시적으로 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <AuthIntro />

        <div className="auth-body">
          <h2 className="auth-form-title">{mode === "login" ? "다시 만나 반가워요" : "첫 면접 준비를 시작해요"}</h2>
          <div className="auth-sub">
            {mode === "login" ? "로그인하고 면접 기록을 쌓아보세요" : "회원가입하고 시작해보세요"}
          </div>

          {/* 로그인/회원가입 탭 */}
          <div className="auth-tabs">
            <button
              type="button"
              className={"auth-tab" + (mode === "login" ? " active" : "")}
              aria-pressed={mode === "login"}
              onClick={() => { setMode("login"); setMsg(""); }}
            >로그인</button>
            <button
              type="button"
              className={"auth-tab" + (mode === "signup" ? " active" : "")}
              aria-pressed={mode === "signup"}
              onClick={() => { setMode("signup"); setMsg(""); }}
            >회원가입</button>
          </div>

          {/* form으로 감싸 이메일 칸에서도 Enter로 제출 + 브라우저 비밀번호 저장 지원 */}
          <form onSubmit={(e) => { e.preventDefault(); if (!busy) handleSubmit(); }} noValidate>
            {mode === "signup" && (
              <>
                <label className="auth-field-label" htmlFor="auth-name">이름</label>
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  placeholder="이름 (예: 송경원)"
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </>
            )}
            <label className="auth-field-label" htmlFor="auth-email">이메일</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              aria-invalid={!!msg && !msgOk}
              aria-describedby={msg ? "auth-msg" : undefined}
            />
            <label className="auth-field-label" htmlFor="auth-password">비밀번호</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              aria-invalid={!!msg && !msgOk}
              aria-describedby={msg ? "auth-msg" : undefined}
            />

            {msg && (
              <div id="auth-msg" className={"auth-msg" + (msgOk ? " ok" : "")} role={msgOk ? "status" : "alert"}>{msg}</div>
            )}

            <button type="submit" disabled={busy} className="auth-submit">
              {busy ? <><BtnSpinner />처리 중...</> : mode === "login" ? "로그인" : "회원가입"}
            </button>
          </form>
        </div>
      </div>
      <p className="auth-note">웹캠과 마이크만 있으면, 어디서든 실전처럼 면접을 연습할 수 있어요.</p>
    </div>
  );
}
