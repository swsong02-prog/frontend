import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// 회차별 종합 점수 라인 차트 (인라인 SVG, 라이브러리 미사용)
function ScoreChart({ points }) {
  const W = 640, H = 260;
  const PAD_L = 42, PAD_R = 20, PAD_T = 16, PAD_B = 34;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const n = points.length;
  const x = (i) => (n === 1 ? PAD_L + innerW / 2 : PAD_L + (i / (n - 1)) * innerW);
  const y = (v) => PAD_T + innerH - (Math.max(0, Math.min(100, v || 0)) / 100) * innerH;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.total_score).toFixed(1)}`)
    .join(" ");

  const gridVals = [0, 25, 50, 75, 100];

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="회차별 종합 점수 추이">
        {/* 기준선 + y축 라벨 */}
        {gridVals.map((v) => (
          <g key={v}>
            <line x1={PAD_L} y1={y(v)} x2={W - PAD_R} y2={y(v)}
              stroke="var(--border)" strokeWidth={v === 0 ? 1.5 : 1}
              strokeDasharray={v === 0 ? "none" : "3 4"} />
            <text x={PAD_L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{v}</text>
          </g>
        ))}

        {/* 점수 라인 */}
        {n > 1 && (
          <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* 데이터 포인트 + 값/회차 라벨 */}
        {points.map((p, i) => (
          <g key={p.round}>
            <circle cx={x(i)} cy={y(p.total_score)} r="4.5" fill="var(--surface)"
              stroke="var(--accent)" strokeWidth="2.5" />
            <text x={x(i)} y={y(p.total_score) - 11} textAnchor="middle" fontSize="12"
              fontWeight="600" fill="var(--accent)">{p.total_score}</text>
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--muted)">{p.round}회</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// 나의 성장 화면. 토큰을 받아서 /growth 데이터를 불러와 보여준다.
export default function Growth({ token, onBack }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`${API}/growth`, {
      headers: { "Authorization": "Bearer " + token },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr("일시적으로 성장 기록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요."));
  }, [token]);

  const points = data && data.points ? data.points : [];
  const last = points.length ? points[points.length - 1] : null;
  const totalDelta =
    data && data.improvement && typeof data.improvement.total === "number"
      ? data.improvement.total
      : points.length > 1
        ? (last.total_score || 0) - (points[0].total_score || 0)
        : null;

  return (
    <div className="page">
      <div className="growth-head">
        <h1 className="page-title">나의 성장</h1>
        <button onClick={onBack} className="btn-ghost">홈으로</button>
      </div>

      {err && <div className="growth-err">{err}</div>}
      {!data && !err && <div className="growth-loading">불러오는 중...</div>}

      {data && data.count === 0 && (
        <div className="growth-empty">
          <div className="t">아직 면접 기록이 없습니다</div>
          <div className="d">
            첫 모의면접을 마치면 이곳에 회차별 점수와 성장 추이가 기록됩니다.
          </div>
          <button onClick={onBack} className="btn-primary">첫 면접 시작하기</button>
        </div>
      )}

      {data && data.count > 0 && (
        <>
          {/* 요약 스탯 */}
          <div className="stat-row rise" style={{ "--ri": 0 }}>
            <div className="stat">
              <div className="k">총 연습 횟수</div>
              <div className="v">{data.count}<small>회</small></div>
            </div>
            <div className="stat">
              <div className="k">최근 종합 점수</div>
              <div className="v accent">{last ? last.total_score : "-"}<small>점</small></div>
            </div>
            <div className="stat">
              <div className="k">첫 회차 대비 변화</div>
              {totalDelta == null ? (
                <div className="v">-</div>
              ) : (
                <div className={"v" + (totalDelta > 0 ? " up" : totalDelta < 0 ? " down" : "")}>
                  {totalDelta > 0 ? "+" : ""}{totalDelta}<small>점</small>
                </div>
              )}
            </div>
          </div>

          {/* 세부 향상 지표 */}
          {data.improvement && (
            <div className="card rise" style={{ marginBottom: 20, "--ri": 1 }}>
              <div className="card-t">첫 회차 대비 변화 (세부)</div>
              <div className="score-split">
                <Delta label="자세·표정" value={data.improvement.posture} />
                <Delta label="답변 내용" value={data.improvement.content} />
                <Delta label="종합" value={data.improvement.total} />
              </div>
            </div>
          )}

          {/* 회차별 종합점수 차트 */}
          <div className="card rise" style={{ marginBottom: 20, "--ri": 2 }}>
            <div className="card-t">회차별 종합 점수</div>
            <ScoreChart points={points} />
          </div>

          {/* 회차 목록 */}
          <div className="card rise" style={{ "--ri": 3 }}>
            <div className="card-t">전체 기록 ({data.count}회)</div>
            {points.slice().reverse().map((p) => (
              <div key={p.round} className="growth-row">
                <span className="round">{p.round}회차</span>
                <span>
                  <span className="ps">자세 {p.posture_score}</span>
                  {"  ·  "}
                  <span className="cs">내용 {p.content_score}</span>
                  {"  ·  "}
                  <span className="ts">종합 {p.total_score}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 향상 수치 하나 (+7 / -3 같은 표시)
function Delta({ label, value }) {
  const up = value > 0, down = value < 0;
  return (
    <div className="score-item">
      <div className="k">{label}</div>
      <div className="v" style={{ color: up ? "var(--primary)" : down ? "var(--danger)" : "var(--muted)" }}>
        {up ? "+" : ""}{value}
      </div>
    </div>
  );
}
