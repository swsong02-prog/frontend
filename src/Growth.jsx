import { useState, useEffect } from "react";
import {
  CountUp, ScoreBadge, RecordLogo, fmtDateDot, keyActivate, LineChart, weekStartDate, sessionTitle,
  IconChevron, IconArrowR, IconTrendUp, IconTrendDown, IconTrendFlat, IconTrophy,
  IconCalendarSm, IconTarget, IconPlay, authFetch, isAuthExpired,
} from "./ui";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const GOAL = 80; // "우수" 기준선

const SERIES_ALL = [
  { key: "total_score", label: "종합", color: "var(--primary)" },
  { key: "posture_score", label: "자세·표정", color: "var(--sky-ink)" },
  { key: "content_score", label: "답변 내용", color: "var(--accent)" },
];
const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

/* 빈 상태 일러스트: 파스텔 막대 3단 + 새싹 (소프트 3D 문법) */
function GrowthEmptyIllust() {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden="true" className="gr-empty-illust">
      <defs>
        <linearGradient id="grB1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DFE3FF" /><stop offset="1" stopColor="#B7C0FA" /></linearGradient>
        <linearGradient id="grB2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C9D0FF" /><stop offset="1" stopColor="#96A0F7" /></linearGradient>
        <linearGradient id="grB3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#AEB8FF" /><stop offset="1" stopColor="#6B7CFF" /></linearGradient>
        <linearGradient id="grLeaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FE9C6" /><stop offset="1" stopColor="#35C08E" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="138" rx="80" ry="7" fill="rgba(90,108,243,.13)" />
      <g fill="#FFFFFF" opacity="0.9"><ellipse cx="34" cy="38" rx="14" ry="7" /><ellipse cx="46" cy="34" rx="9" ry="6" /></g>
      <rect x="36" y="92" width="34" height="40" rx="8" fill="url(#grB1)" />
      <rect x="83" y="66" width="34" height="66" rx="8" fill="url(#grB2)" />
      <rect x="130" y="40" width="34" height="92" rx="8" fill="url(#grB3)" />
      <rect x="40" y="96" width="8" height="30" rx="4" fill="#FFFFFF" opacity="0.35" />
      <rect x="87" y="70" width="8" height="56" rx="4" fill="#FFFFFF" opacity="0.35" />
      <rect x="134" y="44" width="8" height="82" rx="4" fill="#FFFFFF" opacity="0.35" />
      <path d="M147 40 C147 30 146 24 147 16" stroke="#2CA97C" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M146 28 C136 28 131 19 133 12 C141 12 147 19 146 28 Z" fill="url(#grLeaf)" />
      <path d="M148 22 C158 22 163 13 161 6 C153 6 147 13 148 22 Z" fill="url(#grLeaf)" />
      <path d="M175 60v7 M171.5 63.5h7" stroke="#B9C0FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 70v6 M19 73h6" stroke="#C9CFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M112 22v5 M109.5 24.5h5" stroke="#A5E8CB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* 스켈레톤: 히어로 4칸 + 차트 블록 + 리스트 3행 */
function GrowthSkeleton() {
  return (
    <div className="skel-wrap" aria-label="기록을 불러오는 중">
      <div className="gr-hero">
        {[0, 1, 2, 3].map((i) => <span className="skel gr-skel-stat" key={i} />)}
      </div>
      <div className="gr-cols">
        <div className="gr-main">
          <div className="dcard"><span className="skel skel-line w40" style={{ height: 14, marginBottom: 16 }} /><span className="skel gr-skel-chart" /></div>
          <div className="dcard">
            {[0, 1, 2].map((i) => (
              <div className="skel-row" key={i}>
                <span className="skel skel-avatar" />
                <span className="skel-lines"><span className="skel skel-line w60" /><span className="skel skel-line w40" /></span>
                <span className="skel skel-pill" />
              </div>
            ))}
          </div>
        </div>
        <aside className="gr-rail">
          <div className="dcard rail-card"><span className="skel skel-line w50" style={{ height: 14, marginBottom: 14 }} /><span className="skel skel-block" /></div>
          <div className="dcard rail-card"><span className="skel skel-line w50" style={{ height: 14, marginBottom: 14 }} /><span className="skel skel-block" /></div>
        </aside>
      </div>
    </div>
  );
}

/* 나의 기록(성장) 화면. /growth(회차별 점수) + /history(직무·회사) 표시 레이어 */
export default function Growth({ token, onBack, onOpenDetail, onStart, onFeedback }) {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [err, setErr] = useState("");
  const [show, setShow] = useState({ total_score: true, posture_score: false, content_score: false });

  useEffect(() => {
    // 응답 상태를 반드시 확인한다.
    // (r.ok 미확인 시 401 만료 토큰·서버 오류의 {"detail": ...}이 data로 들어가
    //  count가 undefined가 되고, 빈 상태도 본문도 렌더되지 않는 '완전 빈 화면'이 된다)
    let cancelled = false;
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
  }, [token]);

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
  const todayIdx = (new Date().getDay() + 6) % 7;
  const weekDays = DAY_LABELS.map((lb, i) => {
    const d0 = new Date(wk); d0.setDate(wk.getDate() + i);
    const d1 = new Date(d0); d1.setDate(d0.getDate() + 1);
    const n = weekRows.filter((p) => { const t = new Date(p.created_at); return t >= d0 && t < d1; }).length;
    return { lb, n, today: i === todayIdx, future: i > todayIdx };
  });

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

  const trendIcon = totalDelta == null ? null : totalDelta > 0 ? <IconTrendUp /> : totalDelta < 0 ? <IconTrendDown /> : <IconTrendFlat />;
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

  return (
    <div className="page wide growth-page">
      <div className="growth-head">
        <div>
          <h1 className="page-title">나의 기록</h1>
          <p className="page-sub" style={{ margin: "6px 0 0" }}>회차별 점수와 성장 흐름을 한눈에 확인하세요.</p>
        </div>
        <button onClick={onBack} className="btn-ghost">홈으로</button>
      </div>

      {err && (
        <div className="growth-empty rise">
          <div className="t">기록을 불러오지 못했어요</div>
          <div className="d">{err}</div>
          <button onClick={onBack} className="btn-primary">홈으로 돌아가기</button>
        </div>
      )}
      {!data && !err && <GrowthSkeleton />}

      {data && count === 0 && (
        <div className="gr-empty rise">
          <GrowthEmptyIllust />
          <div className="gr-empty-body">
            <div className="t">아직 면접 기록이 없어요</div>
            <div className="d">첫 모의면접을 마치면 회차별 점수, 최고 기록, 이번 주 활동이 이곳에 쌓여요.</div>
            <ol className="re-steps">
              <li><span className="re-num">1</span>직무·난이도를 고르고 자기소개서를 붙여넣어요</li>
              <li><span className="re-num">2</span>웹캠 앞에서 실전처럼 답변해요</li>
              <li><span className="re-num">3</span>AI 점수와 피드백이 이곳에 쌓여요</li>
            </ol>
            <button onClick={() => onStart && onStart(null)} className="re-cta">첫 모의면접 시작하기 <IconArrowR size={13} /></button>
          </div>
        </div>
      )}

      {/* 방어: 기록 수는 있는데 점수 포인트가 비어 있는 형식 불일치 응답 */}
      {data && count > 0 && rows.length === 0 && (
        <div className="growth-empty rise">
          <div className="t">기록은 있지만 점수 데이터를 불러오지 못했어요</div>
          <div className="d">
            면접 기록 {count}회가 저장되어 있지만 점수 정보를 표시할 수 없습니다.
            잠시 후 다시 시도하거나, 새 모의면접을 진행해보세요.
          </div>
          <button onClick={onBack} className="btn-primary">홈으로 돌아가기</button>
        </div>
      )}

      {data && count > 0 && rows.length > 0 && (
        <>
          {/* 1. 히어로 스트립: 큰 숫자 3 + 코치 코멘트 */}
          <section className="gr-hero rise" style={{ "--ri": 0 }}>
            <div className="gr-stat">
              <div className="k">총 연습 횟수</div>
              <div className="v"><CountUp value={count} /><small>회</small></div>
              <div className="s">이번 주 {weekRows.length}회 · 첫 기록 {first.created_at ? fmtDateDot(first.created_at) : "-"}</div>
            </div>
            <div className="gr-stat">
              <div className="k">최근 종합 점수</div>
              <div className="v accent">{num(last.total_score) != null ? <CountUp value={last.total_score} /> : "-"}<small>점</small></div>
              <div className="s"><ScoreBadge score={num(last.total_score)} /><span>{last.round}회차 · {fmtDateDot(last.created_at)}</span></div>
            </div>
            <div className="gr-stat">
              <div className="k">첫 회차 대비 변화</div>
              {totalDelta == null ? (
                <>
                  <div className="v muted">-</div>
                  <div className="s">다음 면접을 마치면 변화가 계산돼요</div>
                </>
              ) : (
                <>
                  <div className={"v" + (totalDelta > 0 ? " up" : totalDelta < 0 ? " down" : " muted")}>
                    <span className="ti">{trendIcon}</span>{totalDelta > 0 ? "+" : ""}<CountUp value={totalDelta} /><small>점</small>
                  </div>
                  <div className="s">
                    {postureDelta != null && <span className={"dl" + (postureDelta > 0 ? " up" : postureDelta < 0 ? " down" : "")}>자세 {postureDelta > 0 ? "+" : ""}{postureDelta}</span>}
                    {contentDelta != null && <span className={"dl" + (contentDelta > 0 ? " up" : contentDelta < 0 ? " down" : "")}>내용 {contentDelta > 0 ? "+" : ""}{contentDelta}</span>}
                  </div>
                </>
              )}
            </div>
            <div className={"gr-coach " + coach.tone}>
              <div className="gc-k">코치 코멘트</div>
              <div className="gc-t">{coach.t}</div>
              <div className="gc-d">{coach.d}</div>
            </div>
          </section>

          <div className="gr-cols rise" style={{ "--ri": 1 }}>
            <div className="gr-main">
              {/* 2. 메인 차트 */}
              <div className="dcard">
                <div className="dcard-head gr-chart-head">
                  <div className="dcard-t">회차별 점수 추이</div>
                  <div className="gr-legend" role="group" aria-label="표시 계열 선택">
                    {SERIES_ALL.map((s) => (
                      <button
                        key={s.key} type="button"
                        className={"gr-lg" + (show[s.key] ? " on" : "")}
                        style={{ "--c": s.color }}
                        onClick={() => toggle(s.key)} aria-pressed={!!show[s.key]}
                      >
                        <span className="dot" />{s.label}
                      </button>
                    ))}
                    <span className="gr-goal"><span className="gl" />우수 기준 {GOAL}점</span>
                  </div>
                </div>
                <LineChart points={rows} series={series} goal={GOAL} ariaLabel="회차별 점수 추이" />
                {rows.length === 1 && (
                  <div className="chart-note">첫 기록이 저장됐어요. 2회차부터 점수를 잇는 추이 선이 그려집니다.</div>
                )}
              </div>

              {/* 3. 전체 기록 리스트 */}
              <div className="dcard">
                <div className="dcard-head">
                  <div className="dcard-t">전체 기록 ({count}회)</div>
                  <span className="dist-total">최신순 · 클릭하면 상세 보기</span>
                </div>
                <div className="recent-list">
                  {rows.slice().reverse().map((p, i) => {
                    const s = p.sess;
                    const canOpen = p.session_id != null && typeof onOpenDetail === "function";
                    const company = s && s.company && String(s.company).trim() ? String(s.company).trim() : "";
                    return (
                      <div
                        className={"recent-row gr-row" + (canOpen ? " clickable" : "")}
                        key={p.session_id ?? p.round}
                        onClick={() => { if (canOpen) onOpenDetail(p.session_id); }}
                        {...(canOpen ? { role: "button", tabIndex: 0, onKeyDown: keyActivate(() => onOpenDetail(p.session_id)) } : {})}
                      >
                        <span className="gr-round">{p.round}</span>
                        <RecordLogo company={company} job={s ? s.job : ""} idx={i} />
                        <div className="rinfo">
                          <div className="rjob">{sessionTitle(s)}{s && s.sub_job ? <span className="rsub"> · {s.sub_job}</span> : null}</div>
                          <div className="rdate">
                            {fmtDateDot(p.created_at)}
                            {num(p.posture_score) != null && num(p.content_score) != null && (
                              <span className="rmini"> · 자세 {p.posture_score} · 내용 {p.content_score}</span>
                            )}
                          </div>
                        </div>
                        <span className="gr-total">{num(p.total_score) != null ? p.total_score : "-"}<small>점</small></span>
                        <ScoreBadge score={num(p.total_score)} />
                        {canOpen && <span className="rgo"><IconChevron /></span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. 우측 레일 */}
            <aside className="gr-rail">
              {best && (
                <div className="dcard rail-card gr-best">
                  <div className="rail-t"><span className="gr-ic peach"><IconTrophy size={15} /></span>최고 기록</div>
                  <div className="gb-score">
                    <b><CountUp value={best.total_score} /></b><span>점</span>
                    <ScoreBadge score={best.total_score} />
                  </div>
                  <div className="gb-meta">{best.round}회차 · {fmtDateDot(best.created_at)}</div>
                  <div className="gb-sess">
                    <RecordLogo company={best.sess ? best.sess.company : ""} job={best.sess ? best.sess.job : ""} idx={1} />
                    <div className="gb-sess-txt">
                      <b>{sessionTitle(best.sess)}</b>
                      <span>{best.sess && best.sess.sub_job ? best.sess.sub_job : `자세 ${best.posture_score ?? "-"} · 내용 ${best.content_score ?? "-"}`}</span>
                    </div>
                  </div>
                  {best.session_id != null && typeof onOpenDetail === "function" && (
                    <button className="dlink" onClick={() => onOpenDetail(best.session_id)}>기록 상세 보기 <IconChevron size={12} /></button>
                  )}
                </div>
              )}

              <div className="dcard rail-card">
                <div className="rail-t"><span className="gr-ic sky"><IconCalendarSm size={15} /></span>이번 주 활동</div>
                <div className="gw-stats">
                  <div className="gw-stat"><b>{weekRows.length}</b><span>회 연습</span></div>
                  <div className="gw-stat"><b>{weekAvg != null ? weekAvg : "-"}</b><span>평균 점수</span></div>
                </div>
                <div className="gw-days" aria-label="요일별 연습 여부">
                  {weekDays.map((d) => (
                    <div className={"gw-day" + (d.n > 0 ? " on" : "") + (d.today ? " today" : "") + (d.future ? " future" : "")} key={d.lb} title={`${d.lb}요일 ${d.n}회`}>
                      <span className="gd-dot">{d.n > 1 ? d.n : ""}</span>
                      <span className="gd-lb">{d.lb}</span>
                    </div>
                  ))}
                </div>
                <div className="gw-note">
                  {weekRows.length === 0
                    ? "이번 주는 아직 연습 전이에요. 한 문항이라도 시작해볼까요?"
                    : weekRows.length >= 3
                      ? "이번 주 3회 이상 연습했어요. 좋은 리듬이에요!"
                      : "주 3회 연습을 목표로 해보세요."}
                </div>
              </div>

              {rows.length === 1 && (
                <div className="dcard rail-card gr-next-goal">
                  <div className="rail-t"><span className="gr-ic mint"><IconTarget size={15} /></span>다음 목표</div>
                  <div className="gn-d">2회차를 마치면 첫 회차 대비 변화와 추이 선이 그려져요. 같은 직무로 한 번 더 도전해보세요.</div>
                </div>
              )}

              <div className="dcard rail-card gr-next">
                <div className="rail-t"><span className="gr-ic lav"><IconPlay size={13} /></span>다음 면접 추천</div>
                {startPreset ? (
                  <>
                    <div className="gn-chips">
                      {startPreset.company && String(startPreset.company).trim() && (
                        <span className="gn-chip"><RecordLogo company={startPreset.company} job={startPreset.job} />{String(startPreset.company).trim()}</span>
                      )}
                      {startPreset.job && <span className="gn-chip">{startPreset.job}{startPreset.sub ? ` · ${startPreset.sub}` : ""}</span>}
                    </div>
                    <div className="gn-d">마지막으로 연습한 조건이에요. 같은 조건으로 연습하면 점수 비교가 정확해져요.</div>
                    <button className="rail-start" onClick={() => onStart && onStart(startPreset)}>지난 조건으로 면접 설정 <IconArrowR size={15} /></button>
                  </>
                ) : (
                  <>
                    <div className="gn-d">직무를 골라 새 모의면접을 시작해보세요.</div>
                    <button className="rail-start" onClick={() => onStart && onStart(null)}>모의면접 시작하기 <IconArrowR size={15} /></button>
                  </>
                )}
                {typeof onFeedback === "function" && (
                  <button className="btn-secondary gn-fb" onClick={onFeedback}>피드백 분석 보기</button>
                )}
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
