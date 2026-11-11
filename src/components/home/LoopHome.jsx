import { useEffect, useState } from "react";
import {
  listGoals, listPlans, updatePlan, getFeed, getProgress,
  loopErrorText, kstToday, dDayLabel, dDay, fmtShort,
} from "../../loopApi";
import { isAuthExpired } from "../../ui";
import { MessageCircle, CalendarCheck, Briefcase, FileText, Flame, ListChecks, Target, Megaphone } from "lucide-react";

/* ============================================================
   홈 루프 블록 (목표 → 할 일 → 연속 기록 → 같은 직무 소식)
   - 각 블록이 자기 데이터를 직접 불러온다. reloadKey가 바뀌면 다시 불러온다.
   - 상태 4가지: 불러오는 중(skeleton) / 오류(한 줄 + 다시 시도) / 비어 있음 / 정상
   ============================================================ */

/* 공통: 비동기 로드 훅 */
function useLoad(fn, deps) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => { if (!cancelled) setState({ loading: false, error: null, data }); })
      .catch((e) => { if (!cancelled && !isAuthExpired(e)) setState({ loading: false, error: e, data: null }); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);
  return [state, () => setTick((n) => n + 1), setState];
}

export function LoopError({ error, what, onRetry }) {
  return (
    <p className="loop-err" role="alert">
      <span>{loopErrorText(error, what)}</span>
      {onRetry && <button type="button" className="btn btn-text btn-sm" onClick={onRetry}>다시 시도</button>}
    </p>
  );
}

export function LoopSkeleton({ rows = 3 }) {
  return (
    <div className="loop-skel" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => <span key={i} className="skel" style={{ width: `${88 - i * 14}%` }} />)}
    </div>
  );
}

/* ---------- 내 목표 줄 ---------- */
export function GoalStrip({ token, reloadKey, onOpen }) {
  const [st, retry] = useLoad(() => listGoals(token), [token, reloadKey]);
  const goals = st.data || [];
  const active = goals.filter((g) => !g.achieved_at)
    .sort((a, b) => (dDay(a.due_date) ?? 9999) - (dDay(b.due_date) ?? 9999));
  const achieved = goals.length - active.length;
  return (
    <section className="goal-strip" aria-labelledby="gs-title">
      <div className="gs-head">
        <h2 id="gs-title"><Target size={16} strokeWidth={2.2} className="ic ic-rose" aria-hidden="true" />내 목표</h2>
        {st.data && <span className="xs c3 num">진행 {active.length}개, 달성 {achieved}개</span>}
        <button type="button" className="btn btn-text btn-sm gs-more" onClick={onOpen}>목표·플래너</button>
      </div>
      {st.loading && !st.data ? <LoopSkeleton rows={1} />
        : st.error ? <LoopError error={st.error} what="목표" onRetry={retry} />
          : active.length === 0 ? (
            <p className="gs-empty">
              <span>{achieved > 0 ? "진행 중인 목표 없음" : "등록한 목표 없음"}</span>
              <button type="button" className="btn btn-secondary btn-sm" onClick={onOpen}>목표 추가</button>
            </p>
          ) : (
            <ul className="gs-list">
              {active.slice(0, 4).map((g) => {
                const dd = dDayLabel(g.due_date);
                const n = dDay(g.due_date);
                return (
                  <li key={g.id}>
                    <button type="button" onClick={onOpen}>
                      <span className={"dd num" + (n != null && n <= 7 ? " hot" : "")}>{dd || "기한 없음"}</span>
                      <span className="gs-title">{g.title}</span>
                      <span className="xs c3 gs-job">{g.job}{g.is_public ? "" : ", 비공개"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
    </section>
  );
}

/* ---------- 오늘 할 일 (홈 오른쪽) ---------- */
export function TodayPlans({ token, reloadKey, onChanged, onOpen }) {
  const today = kstToday();
  const [st, retry, setSt] = useLoad(() => listPlans(token, today, today), [token, reloadKey, today]);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");
  const plans = st.data || [];
  const done = plans.filter((p) => p.done).length;

  async function toggle(p) {
    setBusyId(p.id);
    setErr("");
    try {
      const np = await updatePlan(token, p.id, { done: !p.done });
      setSt((s) => ({ ...s, data: (s.data || []).map((x) => (x.id === p.id ? { ...x, done: np.id != null ? np.done : !p.done } : x)) }));
      onChanged && onChanged();
    } catch (e) {
      if (!isAuthExpired(e)) setErr(loopErrorText(e, "할 일"));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section aria-labelledby="tp-title">
      <div className="side-h">
        <h2 id="tp-title"><ListChecks size={17} strokeWidth={2.2} className="ic ic-blue" aria-hidden="true" />오늘 할 일</h2>
        {st.data && <span className="xs c3 num">{done} / {plans.length}</span>}
      </div>
      {st.loading && !st.data ? <LoopSkeleton rows={3} />
        : st.error ? <LoopError error={st.error} what="할 일" onRetry={retry} />
          : plans.length === 0 ? (
            <p className="side-empty">오늘 등록한 할 일 없음 <button type="button" className="btn btn-text btn-sm" onClick={onOpen}>플래너 열기</button></p>
          ) : (
            <ul className="todo">
              {plans.map((p) => (
                <li key={p.id}>
                  <label>
                    <input type="checkbox" checked={p.done} disabled={busyId === p.id} onChange={() => toggle(p)} />
                    <span className={"sm" + (p.done ? " is-done" : "")}>{p.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
      {err && <p className="loop-err" role="alert">{err}</p>}
    </section>
  );
}

/* ---------- 연속 기록 + 주간 퀘스트 ---------- */
export function StreakQuest({ token, reloadKey }) {
  const [st, retry] = useLoad(() => getProgress(token), [token, reloadKey]);
  const p = st.data;
  return (
    <section className="sq-box" aria-labelledby="sq-title">
      <div className="side-h">
        <h2 id="sq-title"><Flame size={17} strokeWidth={2.2} className="ic ic-amber" aria-hidden="true" />이번 주 퀘스트</h2>
        <span className="xs c3">월요일 시작</span>
      </div>
      {st.loading && !p ? <LoopSkeleton rows={3} />
        : st.error ? <LoopError error={st.error} what="연속 기록" onRetry={retry} />
          : (
            <>
              <dl className="sq-kpis">
                <div><dt>연속 기록</dt><dd className="num">{p.streak_days}<small>일</small></dd></div>
                <div><dt>이번 주 면접</dt><dd className="num">{p.week.interviews}<small>회</small></dd></div>
                <div><dt>완료한 할 일</dt><dd className="num">{p.week.plans_done}<small>개</small></dd></div>
              </dl>
              {p.quests.length === 0 ? <p className="side-empty">이번 주 퀘스트 없음</p> : (
                <ul className="sq-list">
                  {p.quests.map((q) => {
                    const pct = Math.min(100, Math.round((q.current / q.target) * 100));
                    return (
                      <li key={q.key} className={q.done ? "is-done" : ""}>
                        <div className="sq-row">
                          <span className="sm">{q.label}</span>
                          <span className="xs num">{q.done ? <b className="good">완료</b> : <>{Math.min(q.current, q.target)} / {q.target}</>}</span>
                        </div>
                        <div className="meter" role="progressbar" aria-label={q.label} aria-valuemin={0} aria-valuemax={q.target} aria-valuenow={Math.min(q.current, q.target)}>
                          <span style={{ width: pct + "%" }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
    </section>
  );
}

/* ---------- 같은 직무 소식과 공개 목표 ---------- */
export function AchievementFeed({ token, job, reloadKey, onOpen }) {
  const [scopePick, setScope] = useState("job");
  const scope = job ? scopePick : "all"; // 직무를 모르면 전체
  const [tab, setTab] = useState("posts");
  const effJob = scope === "job" ? job : "";
  const [st, retry] = useLoad(() => getFeed(token, effJob, 20), [token, effJob, reloadKey]);
  const posts = st.data ? st.data.posts : [];
  const goals = st.data ? st.data.goals : [];

  return (
    <section className="sec feed" aria-labelledby="af-title">
      <div className="sec-h">
        <h2 id="af-title"><Megaphone size={18} strokeWidth={2.2} className="ic ic-green" aria-hidden="true" />다른 회원 목표와 소식 <small>{effJob ? effJob : "전체 직무"}</small></h2>
        {job && (
          <div className="seg seg-sm" role="group" aria-label="소식 범위">
            <button type="button" className={scope === "job" ? "on" : ""} aria-pressed={scope === "job"} onClick={() => setScope("job")}>내 직무</button>
            <button type="button" className={scope === "all" ? "on" : ""} aria-pressed={scope === "all"} onClick={() => setScope("all")}>전체</button>
          </div>
        )}
      </div>
      <div className="tabs-u" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "posts"} className={tab === "posts" ? "on" : ""} onClick={() => setTab("posts")}>달성 소식<span className="n num">{st.data ? posts.length : ""}</span></button>
        <button type="button" role="tab" aria-selected={tab === "goals"} className={tab === "goals" ? "on" : ""} onClick={() => setTab("goals")}>공개 목표<span className="n num">{st.data ? goals.length : ""}</span></button>
      </div>
      {st.loading && !st.data ? <LoopSkeleton rows={3} />
        : st.error ? <LoopError error={st.error} what="소식" onRetry={retry} />
          : tab === "posts" ? (
            posts.length === 0 ? (
              <p className="feed-empty">아직 올라온 달성 소식 없음. 목표를 달성하면 첫 소식을 남길 수 있어요. <button type="button" className="btn btn-text btn-sm" onClick={onOpen}>내 목표 보기</button></p>
            ) : (
              <ul className="feed-list">
                {posts.map((p) => (
                  <li key={p.id}>
                    <span className="feed-who"><b className="sm">{p.author || "회원"}</b><span className="xs c3">{p.job}</span></span>
                    <p className="sm">{p.message}</p>
                    <span className="xs c3 num nw">{fmtShort(p.created_at)}</span>
                  </li>
                ))}
              </ul>
            )
          ) : (
            goals.length === 0 ? (
              <p className="feed-empty">공개된 목표 없음. 목표를 공개로 두면 같은 직무 회원에게 보입니다.</p>
            ) : (
              <table className="t">
                <thead><tr><th>회원</th><th>목표</th><th className="hide-m">직무</th><th>기한</th><th>상태</th></tr></thead>
                <tbody>
                  {goals.map((g, i) => (
                    <tr key={i}>
                      <td className="nw">{g.author || "회원"}</td>
                      <td>{g.title}</td>
                      <td className="hide-m c3">{g.job}</td>
                      <td className="num nw c3">{g.due_date ? fmtShort(g.due_date) : "-"}</td>
                      <td className="nw">{g.achieved ? <span className="tag tag-good">달성</span> : <span className="tag">진행 중</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
    </section>
  );
}

/* ---------- 바로가기 타일 4개 (잡코리아 맞춤 정보 타일 참고) ---------- */
export function QuickMenu({ onWarmup, onPlanner, onJobs, onResume }) {
  const items = [
    { label: ["말문 트기", "연습"], Icon: MessageCircle, tone: "blue", on: onWarmup },
    { label: ["목표", "플래너"], Icon: CalendarCheck, tone: "green", on: onPlanner },
    { label: ["채용공고", "보기"], Icon: Briefcase, tone: "amber", on: onJobs },
    { label: ["자소서", "다듬기"], Icon: FileText, tone: "rose", on: onResume },
  ];
  return (
    <nav className="qm" aria-label="바로가기">
      {items.map(({ label, Icon, tone, on }) => (
        <button key={label[0]} type="button" className="qm-tile" onClick={on}>
          <span className="qm-t">{label[0]}<br />{label[1]}</span>
          <span className={"qm-ic ic-bg-" + tone} aria-hidden="true"><Icon size={16} strokeWidth={2.2} /></span>
        </button>
      ))}
    </nav>
  );
}

/* ---------- v6 홈 "내 준비" 상자용 한 줄 부품 (11/10) ---------- */
/* 이번 주 기록을 막대 3개 대신 한 문장으로 */
export function WeekLine({ token, reloadKey }) {
  const [st] = useLoad(() => getProgress(token), [token, reloadKey]);
  const p = st.data;
  if (st.loading && !p) return <p className="prep-week"><span className="skel" style={{ width: "80%" }} /></p>;
  if (st.error || !p) return <p className="prep-week">이번 주 기록을 불러오지 못했어요.</p>;
  const { interviews = 0, plans_done = 0 } = p.week || {};
  if (!interviews && !plans_done && !p.streak_days) return <p className="prep-week">첫 면접을 마치면 이번 주 기록이 여기에 모여요.</p>;
  return (
    <p className="prep-week">
      이번 주 면접 <b className="num">{interviews}</b>회, 할 일 <b className="num">{plans_done}</b>개 끝냈어요.
      {p.streak_days > 0 && <> <b className="num">{p.streak_days}</b>일째 이어 가는 중이에요.</>}
    </p>
  );
}

/* 가장 가까운 목표 하나 */
export function TopGoal({ token, reloadKey, onOpen }) {
  const [st] = useLoad(() => listGoals(token), [token, reloadKey]);
  if (st.loading || st.error) return null;
  const active = (st.data || []).filter((g) => !g.achieved_at)
    .sort((a, b) => (dDay(a.due_date) ?? 9999) - (dDay(b.due_date) ?? 9999));
  if (!active.length) {
    return <p className="prep-goal"><span className="c3">정해 둔 목표가 없어요.</span><button type="button" className="lnk" onClick={onOpen}>목표 정하기</button></p>;
  }
  const g = active[0];
  const n = dDay(g.due_date);
  return (
    <p className="prep-goal">
      <button type="button" className="prep-goal-t" onClick={onOpen} title="목표와 플래너 열기">{g.title}{active.length > 1 && <span className="c3"> 외 {active.length - 1}개</span>}</button>
      <span className={"dd num" + (n != null && n <= 7 ? " hot" : "")}>{dDayLabel(g.due_date) || "기한 없음"}</span>
    </p>
  );
}
