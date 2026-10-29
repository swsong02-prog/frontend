import { useState, useEffect } from "react";
import {
  CountUp, fmtDateDot, LineChart, weekStartDate, sessionTitle, scoreGrade,
  IconChevron, authFetch, isAuthExpired,
} from "./ui";
import { Button, PageHeader, SectionHeader, EmptyState, Stat } from "./ds";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const GOAL = 80; // "우수" 기준선
const LEVEL_TEXT = { "하": "쉬움", "중": "보통", "상": "어려움" };

const SERIES_ALL = [
  { key: "total_score", label: "종합", color: "var(--c-accent)" },
  { key: "content_score", label: "답변 내용", color: "var(--c-ink)" },
  { key: "posture_score", label: "자세·표정", color: "var(--c-chart-3)" },
];

/* 나의 기록(성장) 화면. /growth(회차별 점수) + /history(직무·회사) 표시 레이어 */
export default function Growth({ token, onBack, onOpenDetail, onStart, onFeedback }) {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [err, setErr] = useState("");
  const [reload, setReload] = useState(0); // '다시 시도'
  const [show, setShow] = useState({ total_score: true, posture_score: false, content_score: false });

  useEffect(() => {
    // 응답 상태를 반드시 확인한다.
    // (r.ok 미확인 시 401 만료 토큰·서버 오류의 {"detail": ...}이 data로 들어가
    //  count가 undefined가 되고, 빈 상태도 본문도 렌더되지 않는 '완전 빈 화면'이 된다)
    let cancelled = false;
    setErr("");
    const headers = { "Authorization": "Bearer " + token };
    authFetch(`${API}/growth`, { headers })
      .then(async (r) => {
        if (!r.ok) throw new Error("server");
        const d = await r.json();
        if (!d || typeof d !== "object" || Array.isArray(d)) throw new Error("format");
        return d;
      })
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => {
        if (cancelled || isAuthExpired(e)) return; // 401은 App에서 자동 로그아웃 처리
        setErr("일시적으로 성장 기록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    // 직무·회사 표시용 (실패해도 점수 화면은 그대로 동작)
    authFetch(`${API}/history`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((l) => { if (!cancelled) setHistory(Array.isArray(l) ? l : []); })
      .catch(() => { if (!cancelled) setHistory([]); });
    return () => { cancelled = true; };
  }, [token, reload]);

  // 응답 형식 방어: points가 배열이 아니거나 count가 숫자가 아니어도 안전하게 계산
  const points = data && Array.isArray(data.points)
    ? data.points.filter((p) => p && typeof p === "object")
    : [];
  const count = data
    ? (typeof data.count === "number" ? data.count : points.length)
    : 0;
  const sessById = new Map(
    (history || []).filter((s) => s && s.session_id != null).map((s) => [s.session_id, s])
  );
  const rows = points.map((p, i) => ({
    ...p,
    round: typeof p.round === "number" ? p.round : i + 1,
    sess: sessById.get(p.session_id) || null,
  }));
  const last = rows.length ? rows[rows.length - 1] : null;
  const first = rows.length ? rows[0] : null;
  const num = (v) => (typeof v === "number" ? v : null);
  const totalDelta =
    data && data.improvement && typeof data.improvement.total === "number"
      ? data.improvement.total
      : rows.length > 1 && num(last.total_score) != null && num(first.total_score) != null
        ? last.total_score - first.total_score
        : null;
  const postureDelta = data && data.improvement && typeof data.improvement.posture === "number"
    ? data.improvement.posture : null;
  const contentDelta = data && data.improvement && typeof data.improvement.content === "number"
    ? data.improvement.content : null;

  // 최고 기록
  const best = rows.reduce((b, p) => (num(p.total_score) != null && (b == null || p.total_score > b.total_score) ? p : b), null);

  // 이번 주 활동 (월요일 시작)
  const wk = weekStartDate();
  const weekRows = rows.filter((p) => {
    const t = new Date(p.created_at);
    return !isNaN(t.getTime()) && t >= wk;
  });
  const weekAvg = weekRows.length
    ? Math.round(weekRows.reduce((a, p) => a + (num(p.total_score) || 0), 0) / weekRows.length)
    : null;
  // 최근 상승 연속 횟수 (코치 코멘트용)
  let streak = 0;
  for (let i = rows.length - 1; i > 0; i--) {
    if (num(rows[i].total_score) != null && num(rows[i - 1].total_score) != null && rows[i].total_score > rows[i - 1].total_score) streak++;
    else break;
  }

  // 코치 코멘트 (데이터 조건부 문구, 가짜 수치 없음)
  const coach = (() => {
    if (rows.length === 1) {
      return { tone: "lav", t: "첫 기록이 저장됐어요", d: "한 번 더 연습하면 첫 회차 대비 변화와 추이 선이 그려져요. 오늘 한 문항이면 충분해요." };
    }
    if (totalDelta == null) return { tone: "lav", t: "점수 흐름을 모으는 중", d: "회차가 쌓이면 상승·정체 여부를 여기서 알려드려요." };
    if (totalDelta >= 5) {
      return {
        tone: "mint", t: streak >= 2 ? `${streak + 1}회 연속 상승 중이에요` : "상승 흐름이에요",
        d: `첫 회차보다 ${totalDelta}점 올랐어요. ${num(last.total_score) >= GOAL ? "우수 기준(80점)을 넘겼으니 난이도를 한 단계 올려보세요." : `우수 기준(80점)까지 ${GOAL - last.total_score}점 남았어요.`}`,
      };
    }
    if (totalDelta <= -5) {
      return { tone: "peach", t: "최근 점수가 첫 회차보다 낮아요", d: `${Math.abs(totalDelta)}점 내려갔어요. 컨디션보다 답변 구조(결론 → 근거)를 먼저 점검해보세요.` };
    }
    return { tone: "cream", t: "점수가 비슷하게 유지되고 있어요", d: "정체 구간이에요. 피드백 분석에서 자주 지적받은 포인트 하나만 골라 집중해보세요." };
  })();

  const series = SERIES_ALL.filter((s) => show[s.key]);
  const toggle = (key) => setShow((prev) => {
    const next = { ...prev, [key]: !prev[key] };
    if (!Object.values(next).some(Boolean)) return prev; // 최소 1계열 유지
    return next;
  });

  const lastSess = last && last.sess ? last.sess : (history && history[0]) || null;
  const startPreset = lastSess
    ? { job: lastSess.job, sub: lastSess.sub_job, company: lastSess.company, level: lastSess.level, career: lastSess.career }
    : null;
  const hasData = data && count > 0 && rows.length > 0;
  const signed = (v) => (v > 0 ? "+" : "") + v;

  return (
    <div className="page records">
      <PageHeader title="나의 기록"
        desc={hasData ? `총 ${count}회 · 첫 기록 ${first.created_at ? fmtDateDot(first.created_at) : "-"} · 이번 주 ${weekRows.length}회` : null}
        actions={hasData ? <Button variant="primary" onClick={() => onStart && onStart(startPreset)}>{startPreset ? "지난 조건으로 연습" : "모의면접 시작"}</Button> : null} />

      {err && (
        <EmptyState title="기록을 불러오지 못했어요" desc={err} action="다시 시도" onAction={() => setReload((n) => n + 1)} />
      )}
      {!data && !err && (
        <div className="skel-stack lg" aria-label="기록을 불러오는 중"><span className="skel" /><span className="skel" /><span className="skel" /><span className="skel" /></div>
      )}

      {data && count === 0 && (
        <EmptyState title="아직 분석할 면접이 없습니다."
          desc="첫 면접을 완료하면 답변 속도, 내용, 반복 표현, 점수 변화를 분석해드립니다."
          action="첫 모의면접 시작" onAction={() => onStart && onStart(null)} />
      )}

      {/* 방어: 기록 수는 있는데 점수 포인트가 비어 있는 형식 불일치 응답 */}
      {data && count > 0 && rows.length === 0 && (
        <EmptyState title="기록은 있지만 점수 데이터를 불러오지 못했어요"
          desc={`면접 기록 ${count}회가 저장되어 있지만 점수 정보를 표시할 수 없습니다. 잠시 후 다시 시도해주세요.`}
          action="홈으로" onAction={onBack} />
      )}

      {hasData && (
        <>
          <section className="block rec-top" aria-labelledby="rec-chart-title">
            <div className="kpis">
              <Stat label="최근 종합 점수" tone="accent"
                value={num(last.total_score) != null ? <CountUp value={last.total_score} /> : "—"} unit={num(last.total_score) != null ? "점" : ""}
                note={`${last.round}회차 · ${fmtDateDot(last.created_at)}`} />
              <Stat label="첫 회차 대비" value={totalDelta == null ? "—" : signed(totalDelta)} unit={totalDelta == null ? "" : "점"}
                tone={totalDelta == null ? "" : totalDelta > 0 ? "up" : totalDelta < 0 ? "down" : ""}
                note={totalDelta == null ? "2회차부터 계산돼요" : [postureDelta != null ? `자세 ${signed(postureDelta)}` : "", contentDelta != null ? `내용 ${signed(contentDelta)}` : ""].filter(Boolean).join(" · ") || null} />
              <Stat label="최고 기록" value={best ? best.total_score : "—"} unit={best ? "점" : ""} note={best ? `${best.round}회차 · ${fmtDateDot(best.created_at)}` : null} />
              <Stat label="이번 주" value={weekRows.length} unit="회" note={weekAvg != null ? `평균 ${weekAvg}점 · 목표 3회` : "목표 3회"} />
            </div>
            <SectionHeader id="rec-chart-title" title="점수 변화">
              <div className="legend-toggle" role="group" aria-label="표시 계열 선택">
                {SERIES_ALL.map((s) => (
                  <button key={s.key} type="button" className={"chip chip-sm" + (show[s.key] ? " on" : "")}
                    onClick={() => toggle(s.key)} aria-pressed={!!show[s.key]}>
                    <span className="lg-dot" style={{ background: s.color }} />{s.label}
                  </button>
                ))}
              </div>
            </SectionHeader>
            <LineChart points={rows} series={series} goal={GOAL} ariaLabel="회차별 점수 추이" height={220} width={typeof window !== "undefined" && window.innerWidth < 768 ? 600 : 1100} />
            <p className="t-caption">{rows.length === 1 ? "2회차부터 점수를 잇는 선이 그려져요. " : ""}{coach.t}. {coach.d}</p>
          </section>

          <section className="block" aria-labelledby="rec-list-title">
            <SectionHeader id="rec-list-title" title="전체 기록" meta={`${count}회 · 최신순`} />
            <div className="table-wrap">
              <table className="table table-rows">
                <thead>
                  <tr>
                    <th scope="col" className="c-round">회차</th>
                    <th scope="col">날짜</th>
                    <th scope="col">직무</th>
                    <th scope="col">회사</th>
                    <th scope="col">조건</th>
                    <th scope="col" className="c-num">자세</th>
                    <th scope="col" className="c-num">내용</th>
                    <th scope="col" className="c-num">종합</th>
                    <th scope="col" className="c-act"><span className="sr-only">상세보기</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice().reverse().map((p) => {
                    const s = p.sess;
                    const canOpen = p.session_id != null && typeof onOpenDetail === "function";
                    const company = s && s.company && String(s.company).trim() ? String(s.company).trim() : "";
                    const g = scoreGrade(num(p.total_score));
                    return (
                      <tr key={p.session_id ?? p.round} className={canOpen ? "clickable" : ""}
                        onClick={() => { if (canOpen) onOpenDetail(p.session_id); }}>
                        <td className="c-round num">{p.round}</td>
                        <td className="num nowrap">{fmtDateDot(p.created_at)}</td>
                        <td><span className="cell-strong">{s && s.job ? s.job : "—"}</span>{s && s.sub_job ? <span className="cell-sub">{s.sub_job}</span> : null}</td>
                        <td>{company || <span className="muted">—</span>}</td>
                        <td className="nowrap">{s ? [s.career, s.level ? LEVEL_TEXT[s.level] || s.level : ""].filter(Boolean).join(" · ") || "—" : "—"}</td>
                        <td className="c-num num">{num(p.posture_score) ?? "—"}</td>
                        <td className="c-num num">{num(p.content_score) ?? "—"}</td>
                        <td className="c-num"><b className="num">{num(p.total_score) ?? "—"}</b>{g && <span className={"grade grade-" + g.cls}>{g.label}</span>}</td>
                        <td className="c-act">
                          {canOpen && (
                            <button type="button" className="btn btn-text btn-sm" onClick={(e) => { e.stopPropagation(); onOpenDetail(p.session_id); }}
                              aria-label={`${p.round}회차 ${sessionTitle(s)} 상세보기`}>
                              상세 <IconChevron size={12} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {typeof onFeedback === "function" && (
              <div className="page-foot"><Button variant="secondary" onClick={onFeedback}>피드백 분석 보기</Button></div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
