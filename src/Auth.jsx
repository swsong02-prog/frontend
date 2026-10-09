import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* 브랜드 일러스트: 정장 입은 면접자 (히어로/마스코트와 동일 인물, 한 손 인사 + 문서/체크 말풍선 데코) */
function AuthIllust() {
  return (
    <svg viewBox="0 0 240 170" fill="none" aria-hidden="true" className="auth-illust">
      <defs>
        <linearGradient id="ccAuSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B486C" /><stop offset="1" stopColor="#212B4B" />
        </linearGradient>
        <linearGradient id="ccAuArm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5680" /><stop offset="1" stopColor="#2C3757" />
        </linearGradient>
        <radialGradient id="ccAuFace" cx="0.38" cy="0.3" r="1">
          <stop offset="0" stopColor="#FFE7D3" /><stop offset="1" stopColor="#F4C09B" />
        </radialGradient>
        <linearGradient id="ccAuHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D455F" /><stop offset="1" stopColor="#1F2539" />
        </linearGradient>
        <linearGradient id="ccAuShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E4E9F7" />
        </linearGradient>
        <linearGradient id="ccAuTie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C93F7" /><stop offset="1" stopColor="#4453D6" />
        </linearGradient>
      </defs>

      {/* 배경 데코 */}
      <circle cx="216" cy="20" r="12" fill="rgba(255,255,255,.10)" />
      <circle cx="18" cy="132" r="8" fill="rgba(255,255,255,.12)" />
      <circle cx="230" cy="122" r="5" fill="rgba(255,255,255,.18)" />

      {/* 좌측 문서 데코 */}
      <g>
        <rect x="14" y="58" width="44" height="56" rx="10" fill="#DCE2FF" />
        <line x1="23" y1="72" x2="49" y2="72" stroke="#1B64DA" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="23" y1="83" x2="49" y2="83" stroke="#8A97FF" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="23" y1="94" x2="41" y2="94" stroke="#8A97FF" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* 우측 체크 말풍선 데코 */}
      <g>
        <rect x="178" y="42" width="52" height="40" rx="14" fill="#FFFFFF" />
        <path d="M186 80 L181 93 L198 82 Z" fill="#FFFFFF" />
        <path d="M193 61 l6 6 l12 -12" stroke="#1B64DA" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* 정장 면접자 상반신 (소프트 3D: 그라데이션 볼륨 + 하이라이트 + 홍조 + 바닥 그림자) */}
      <g transform="translate(45,22)">
        {/* 바닥 그림자 */}
        <ellipse cx="75" cy="131" rx="46" ry="8" fill="rgba(20,28,64,.22)" />
        {/* 흔드는 팔(뒤) */}
        <path d="M108 92 Q127 78 127 52" stroke="url(#ccAuArm)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="128" cy="46" r="9" fill="url(#ccAuFace)" />
        {/* 목 */}
        <rect x="67" y="72" width="16" height="16" rx="7" fill="#EFB58E" />
        {/* 몸통(정장) */}
        <path d="M40 131 C40 98 54 85 75 85 C96 85 110 98 110 131 Z" fill="url(#ccAuSuit)" />
        <ellipse cx="58" cy="97" rx="10" ry="5" fill="#FFFFFF" opacity="0.08" transform="rotate(-26 58 97)" />
        {/* 셔츠 */}
        <path d="M64 88 L75 113 L86 88 Q75 82 64 88 Z" fill="url(#ccAuShirt)" />
        {/* 라펠 */}
        <path d="M64 87 L75 101 L58 99 Z" fill="#182140" />
        <path d="M86 87 L75 101 L92 99 Z" fill="#182140" />
        {/* 넥타이 */}
        <path d="M75 99 L79.5 106 L75 126 L70.5 106 Z" fill="url(#ccAuTie)" />
        <ellipse cx="73.5" cy="103" rx="1.5" ry="2.2" fill="#FFFFFF" opacity="0.35" />
        {/* 서류 든 팔 */}
        <path d="M45 100 Q37 111 43 120" stroke="url(#ccAuArm)" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* 손에 든 서류 */}
        <g transform="rotate(8 40 116)">
          <rect x="22" y="104" width="34" height="24" rx="5" fill="url(#ccAuShirt)" />
          <line x1="28" y1="112" x2="50" y2="112" stroke="#4C93F7" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="28" y1="119" x2="44" y2="119" stroke="#A9B6F2" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <circle cx="44" cy="123" r="8" fill="url(#ccAuFace)" />
        {/* 귀 */}
        <circle cx="46" cy="56" r="5.5" fill="#F2BA92" />
        <circle cx="104" cy="56" r="5.5" fill="#F2BA92" />
        {/* 얼굴 */}
        <circle cx="75" cy="52" r="30" fill="url(#ccAuFace)" />
        {/* 머리카락 */}
        <path d="M45 54 C44.4 29 57.5 19 75 19 C92.5 19 105.6 29 105 54 C104 40.5 96.7 32 75 32 C53.3 32 46 40.5 45 54 Z" fill="url(#ccAuHair)" />
        <ellipse cx="61" cy="26" rx="7.5" ry="3" fill="#FFFFFF" opacity="0.16" transform="rotate(-16 61 26)" />
        {/* 눈썹/눈 */}
        <path d="M58 45 q4 -2.5 8 -1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M84 44 q4 -1.5 8 1" stroke="#2A3148" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="63" cy="53" r="3" fill="#2A3148" />
        <circle cx="87" cy="53" r="3" fill="#2A3148" />
        <circle cx="64" cy="52" r="0.9" fill="#FFFFFF" />
        <circle cx="88" cy="52" r="0.9" fill="#FFFFFF" />
        {/* 미소 */}
        <path d="M66 63 Q75 70.5 84 63" stroke="#C96F4A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        {/* 뺨 홍조 */}
        <ellipse cx="56" cy="61" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
        <ellipse cx="94" cy="61" rx="4.6" ry="3" fill="#FFB9A0" opacity="0.8" />
        {/* 얼굴 하이라이트 */}
        <ellipse cx="60" cy="39" rx="6" ry="3" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 60 39)" />
      </g>
    </svg>
  );
}

/* 버튼 안 인라인 로딩 스피너 (제출 처리 중 표시) */
function BtnSpinner({ size = 14 }) {
  return (
    <svg className="btn-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 1-6.36 2.64" />
    </svg>
  );
}

/* 브랜드 패널 신뢰 포인트용 작은 체크 아이콘 */
function AuthPointIcon() {
  return (
    <span className="auth-point-ic" aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 12.5 9.5 18 20 6.5" />
      </svg>
    </span>
  );
}

// 로그인/회원가입 화면. 로그인 성공하면 onLogin(토큰, 이메일)을 불러준다.
export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgOk, setMsgOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setMsg("");
    setMsgOk(false);
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
          setMsg(data.detail || "회원가입에 실패했습니다. 다시 시도해주세요.");
          setBusy(false);
          return;
        }
        setMsgOk(true);
        setMsg("회원가입이 완료되었습니다. 이제 로그인해주세요.");
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
        setMsg(data.detail || "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        setBusy(false);
        return;
      }
      // 3) 로그인 성공 → 토큰을 부모(App)에게 넘김
      onLogin(data.access_token, email);
    } catch (e) {
      setMsg("일시적으로 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      {/* 배경 데코: 은은한 파스텔 원 (표시 전용) */}
      <span className="auth-deco d1" aria-hidden="true" />
      <span className="auth-deco d2" aria-hidden="true" />
      <span className="auth-deco d3" aria-hidden="true" />
      <div className="auth-card">
        {/* 상단 브랜드 일러스트 영역 */}
        <div className="auth-brand">
          <div className="auth-logo">
            <span className="mark">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <polyline points="8.5 11.5 11 14 15.5 9.5" />
              </svg>
            </span>
            코치코치
          </div>
          <div className="auth-tag">실전 같은 모의면접, AI 코칭과 함께</div>
          <ul className="auth-points">
            <li className="auth-point"><AuthPointIcon />AI 맞춤 질문 생성</li>
            <li className="auth-point"><AuthPointIcon />자세·음성·내용 3중 분석</li>
            <li className="auth-point"><AuthPointIcon />회차별 성장 추적</li>
          </ul>
          {/* 실제 서비스 구성 수치 (백엔드 직무 데이터 기준) */}
          <div className="auth-stats">
            <div className="as"><b>13개</b><span>직군</span></div>
            <span className="as-div" aria-hidden="true" />
            <div className="as"><b>54개</b><span>세부 직무</span></div>
            <span className="as-div" aria-hidden="true" />
            <div className="as"><b>3중</b><span>자세·음성·내용 분석</span></div>
          </div>
          <AuthIllust />
        </div>

        <div className="auth-body">
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
            <label className="sr-only" htmlFor="auth-email">이메일</label>
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
            <label className="sr-only" htmlFor="auth-password">비밀번호</label>
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
