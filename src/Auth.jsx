import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// 로그인/회원가입 화면. 로그인 성공하면 onLogin(토큰, 이메일)을 불러준다.
export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setMsg("");
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
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMsg(data.detail || "회원가입에 실패했어요.");
          setBusy(false);
          return;
        }
        setMsg("회원가입 완료! 이제 로그인해주세요.");
        setMode("login");
        setBusy(false);
        return;
      }

      // 2) 로그인 요청
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.detail || "로그인에 실패했어요.");
        setBusy(false);
        return;
      }
      // 3) 로그인 성공 → 토큰을 부모(App)에게 넘김
      onLogin(data.access_token, email);
    } catch (e) {
      setMsg("서버에 연결하지 못했어요. 백엔드가 켜져 있는지 확인해주세요.");
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400, background: "#141A2A", border: "1px solid #232B40", borderRadius: 18, padding: 32 }}>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, color: "#fff" }}>
          🎯 코치<span style={{ color: "#7AA5FF" }}>코치</span>
        </div>
        <div style={{ color: "#9098AC", fontSize: 14, marginBottom: 24 }}>
          {mode === "login" ? "로그인하고 면접 기록을 쌓아보세요" : "회원가입하고 시작해보세요"}
        </div>

        {/* 로그인/회원가입 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            onClick={() => { setMode("login"); setMsg(""); }}
            style={tabStyle(mode === "login")}
          >로그인</button>
          <button
            onClick={() => { setMode("signup"); setMsg(""); }}
            style={tabStyle(mode === "signup")}
          >회원가입</button>
        </div>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          style={inputStyle}
        />

        {msg && (
          <div style={{ fontSize: 13, color: "#FFB4B4", marginBottom: 12 }}>{msg}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={busy}
          style={{
            width: "100%", background: "linear-gradient(135deg,#5B8DEF,#6C5CE7)",
            color: "#fff", border: "none", borderRadius: 12, padding: "14px",
            fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", marginBottom: 12,
  background: "#0E1424", border: "1px solid #232B40", borderRadius: 10,
  padding: "13px 14px", fontSize: 14, color: "#fff", outline: "none",
};

function tabStyle(active) {
  return {
    flex: 1, padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 700,
    cursor: "pointer", border: "1px solid " + (active ? "#5B8DEF" : "#232B40"),
    background: active ? "#1B2540" : "transparent",
    color: active ? "#fff" : "#9098AC",
  };
}
