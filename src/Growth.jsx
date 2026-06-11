import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
      .catch(() => setErr("성장 데이터를 불러오지 못했어요."));
  }, [token]);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>📈 나의 성장</h1>
        <button onClick={onBack} style={backBtn}>← 돌아가기</button>
      </div>

      {err && <div style={{ color: "#FFB4B4" }}>{err}</div>}
      {!data && !err && <div style={{ color: "#9098AC" }}>불러오는 중...</div>}

      {data && data.count === 0 && (
        <div style={{ color: "#9098AC", padding: "40px 0", textAlign: "center" }}>
          아직 면접 기록이 없어요. 면접을 한 번 보고 오면 여기에 성장 곡선이 그려져요.
        </div>
      )}

      {data && data.count > 0 && (
        <>
          {/* 첫 회차 대비 향상 */}
          {data.improvement && (
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>첫 회차 대비 변화</div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <Delta label="자세·표정" value={data.improvement.posture} />
                <Delta label="답변 내용" value={data.improvement.content} />
                <Delta label="종합" value={data.improvement.total} />
              </div>
            </div>
          )}

          {/* 간단 막대 그래프 (회차별 종합점수) */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>회차별 종합 점수</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 180 }}>
              {data.points.map((p) => (
                <div key={p.round} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#7AA5FF", marginBottom: 4 }}>{p.total_score}</div>
                  <div style={{
                    height: (p.total_score || 0) * 1.4 + "px",
                    background: "linear-gradient(180deg,#5B8DEF,#6C5CE7)",
                    borderRadius: "6px 6px 0 0",
                  }}></div>
                  <div style={{ fontSize: 12, color: "#9098AC", marginTop: 6 }}>{p.round}회</div>
                </div>
              ))}
            </div>
          </div>

          {/* 회차 목록 */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 12 }}>전체 기록 ({data.count}회)</div>
            {data.points.slice().reverse().map((p) => (
              <div key={p.round} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #232B40", fontSize: 14 }}>
                <span style={{ color: "#C7CEDD" }}>{p.round}회차</span>
                <span>
                  <span style={{ color: "#4ADE80" }}>자세 {p.posture_score}</span>
                  {"  ·  "}
                  <span style={{ color: "#7AA5FF" }}>내용 {p.content_score}</span>
                  {"  ·  "}
                  <span style={{ fontWeight: 700 }}>종합 {p.total_score}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 향상 수치 하나 (▲+7 같은)
function Delta({ label, value }) {
  const up = value > 0, down = value < 0;
  const color = up ? "#4ADE80" : down ? "#FF9B9B" : "#9098AC";
  const sign = up ? "▲ +" : down ? "▼ " : "− ";
  return (
    <div>
      <div style={{ fontSize: 13, color: "#9098AC", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{sign}{Math.abs(value)}</div>
    </div>
  );
}

const backBtn = {
  background: "transparent", color: "#9098AC", border: "1px solid #232B40",
  borderRadius: 10, padding: "8px 16px", fontSize: 14, cursor: "pointer",
};
