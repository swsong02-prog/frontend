import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import {
  listGoals, createGoal, updateGoal, deleteGoal,
  listPlans, createPlan, updatePlan, deletePlan, postFeed,
  loopErrorText, kstToday, ymd, dDay, dDayLabel, fmtShort, feedTemplate,
} from "../loopApi";
import { isAuthExpired } from "../ui";
import { LoopError, LoopSkeleton } from "../components/home/LoopHome";

/* ============================================================
   목표·플래너 화면
   위: 목표 표(추가, 공개 토글, 달성 → 소식 남기기, 삭제)
   아래: 월 캘린더 + 선택한 날의 할 일(추가, 체크, 삭제)
   저장은 모두 서버 API (spec_loop.md 1장)
   ============================================================ */

const WEEK = ["월", "화", "수", "목", "금", "토", "일"];

function monthGrid(year, month) {
  // 월요일 시작 6주 격자
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - lead);
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

export default function GoalPlanner({ token, jobNames = [], defaultJob = "", showToast, onChanged, suggestions = [] }) {
  /* ---------- 목표 ---------- */
  const [goals, setGoals] = useState(null);
  const [gErr, setGErr] = useState(null);
  const [gTick, setGTick] = useState(0);
  const [form, setForm] = useState({ job: defaultJob, title: "", due_date: "", is_public: false });
  const [saving, setSaving] = useState(false);
  const [busyGoal, setBusyGoal] = useState(null);
  const [share, setShare] = useState(null); // { goal, message, sending, error }
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setGErr(null);
    listGoals(token)
      .then((d) => { if (!cancelled) setGoals(d); })
      .catch((e) => { if (!cancelled && !isAuthExpired(e)) { setGErr(e); setGoals(null); } });
    return () => { cancelled = true; };
  }, [token, gTick]);

  useEffect(() => { if (!form.job && defaultJob) setForm((f) => ({ ...f, job: defaultJob })); }, [defaultJob]); // eslint-disable-line react-hooks/exhaustive-deps

  const fail = (e, what) => { if (!isAuthExpired(e)) showToast("error", loopErrorText(e, what)); };

  async function addGoal(e) {
    e.preventDefault();
    const title = form.title.trim();
    if (!form.job.trim()) { showToast("info", "직무를 고르세요."); return; }
    if (!title) { showToast("info", "목표 내용을 입력하세요."); return; }
    setSaving(true);
    try {
      const body = { job: form.job.trim(), title, is_public: form.is_public };
      if (form.due_date) body.due_date = form.due_date;
      const g = await createGoal(token, body);
      if (g.id != null) setGoals((prev) => [g, ...(prev || [])]); else setGTick((n) => n + 1);
      setForm((f) => ({ ...f, title: "", due_date: "" }));
      onChanged && onChanged();
    } catch (err) { fail(err, "목표"); } finally { setSaving(false); }
  }

  async function patchGoal(g, body) {
    setBusyGoal(g.id);
    try {
      const ng = await updateGoal(token, g.id, body);
      setGoals((prev) => (prev || []).map((x) => (x.id === g.id ? (ng.id != null ? ng : { ...x, ...body }) : x)));
      onChanged && onChanged();
      return ng.id != null ? ng : { ...g, ...body };
    } catch (err) { fail(err, "목표"); return null; } finally { setBusyGoal(null); }
  }

  async function achieve(g) {
    const ng = await patchGoal(g, { achieved: true });
    if (ng) setShare({ goal: ng, message: feedTemplate(ng), sending: false, error: "" });
  }

  async function removeGoal(g) {
    if (!window.confirm(`"${g.title}" 목표를 삭제할까요?`)) return;
    setBusyGoal(g.id);
    try {
      await deleteGoal(token, g.id);
      setGoals((prev) => (prev || []).filter((x) => x.id !== g.id));
      if (share && share.goal.id === g.id) setShare(null);
      onChanged && onChanged();
    } catch (err) { fail(err, "목표"); } finally { setBusyGoal(null); }
  }

  async function sendShare() {
    const msg = share.message.trim();
    if (!msg) { setShare((s) => ({ ...s, error: "소식 내용을 입력하세요." })); return; }
    setShare((s) => ({ ...s, sending: true, error: "" }));
    try {
      await postFeed(token, { goal_id: share.goal.id, message: msg });
      setShare(null);
      showToast("success", "달성 소식을 올렸습니다.");
      onChanged && onChanged();
    } catch (err) {
      if (isAuthExpired(err)) return;
      setShare((s) => ({ ...s, sending: false, error: loopErrorText(err, "소식") }));
    }
  }

  const active = (goals || []).filter((g) => !g.achieved_at)
    .sort((a, b) => (dDay(a.due_date) ?? 9999) - (dDay(b.due_date) ?? 9999));
  const achieved = (goals || []).filter((g) => g.achieved_at);
  const shown = showDone ? [...active, ...achieved] : active;

  /* ---------- 플래너 ---------- */
  const today = kstToday();
  const [cursor, setCursor] = useState(() => { const t = new Date(today + "T00:00:00"); return { y: t.getFullYear(), m: t.getMonth() }; });
  const [selDate, setSelDate] = useState(today);
  const [plans, setPlans] = useState(null);
  const [pErr, setPErr] = useState(null);
  const [pTick, setPTick] = useState(0);
  const [planText, setPlanText] = useState("");
  const [planGoal, setPlanGoal] = useState("");
  const [busyPlan, setBusyPlan] = useState(null);

  const grid = useMemo(() => monthGrid(cursor.y, cursor.m), [cursor]);
  const from = ymd(grid[0]);
  const to = ymd(grid[grid.length - 1]);

  useEffect(() => {
    let cancelled = false;
    setPErr(null);
    listPlans(token, from, to)
      .then((d) => { if (!cancelled) setPlans(d); })
      .catch((e) => { if (!cancelled && !isAuthExpired(e)) { setPErr(e); setPlans(null); } });
    return () => { cancelled = true; };
  }, [token, from, to, pTick]);

  const byDate = useMemo(() => {
    const m = {};
    (plans || []).forEach((p) => { (m[p.date] = m[p.date] || []).push(p); });
    return m;
  }, [plans]);
  const dayPlans = byDate[selDate] || [];
  const goalTitle = (id) => { const g = (goals || []).find((x) => x.id === id); return g ? g.title : ""; };

  async function addPlan(e, preset) {
    if (e) e.preventDefault();
    const text = (preset || planText).trim();
    if (!text) return;
    setBusyPlan("new");
    try {
      const body = { date: selDate, text };
      if (planGoal) body.goal_id = Number(planGoal) || planGoal;
      const p = await createPlan(token, body);
      if (p.id != null) setPlans((prev) => [...(prev || []), p]); else setPTick((n) => n + 1);
      if (!preset) setPlanText("");
      onChanged && onChanged();
    } catch (err) { fail(err, "할 일"); } finally { setBusyPlan(null); }
  }
  async function togglePlan(p) {
    setBusyPlan(p.id);
    try {
      const np = await updatePlan(token, p.id, { done: !p.done });
      setPlans((prev) => (prev || []).map((x) => (x.id === p.id ? (np.id != null ? np : { ...x, done: !p.done }) : x)));
      onChanged && onChanged();
    } catch (err) { fail(err, "할 일"); } finally { setBusyPlan(null); }
  }
  async function removePlan(p) {
    setBusyPlan(p.id);
    try {
      await deletePlan(token, p.id);
      setPlans((prev) => (prev || []).filter((x) => x.id !== p.id));
      onChanged && onChanged();
    } catch (err) { fail(err, "할 일"); } finally { setBusyPlan(null); }
  }

  const move = (d) => setCursor((c) => { const t = new Date(c.y, c.m + d, 1); return { y: t.getFullYear(), m: t.getMonth() }; });
  const goToday = () => { const t = new Date(today + "T00:00:00"); setCursor({ y: t.getFullYear(), m: t.getMonth() }); setSelDate(today); };
  const selD = new Date(selDate + "T00:00:00");
  const selLabel = `${selD.getMonth() + 1}월 ${selD.getDate()}일 ${"일월화수목금토"[selD.getDay()]}요일`;
  const monthDone = (plans || []).filter((p) => p.date.slice(0, 7) === `${cursor.y}-${String(cursor.m + 1).padStart(2, "0")}`);

  return (
    <div className="page planner">
      <div className="ph">
        <div>
          <h1>목표·플래너</h1>
          <p className="meta sep-dot">
            <span>진행 중인 목표 {goals ? active.length : "-"}개</span>
            <span>달성 {goals ? achieved.length : "-"}개</span>
            <span>이번 달 할 일 {plans ? `${monthDone.filter((p) => p.done).length} / ${monthDone.length}` : "-"}</span>
          </p>
        </div>
      </div>

      {/* ---------- 목표 ---------- */}
      <section className="sec" aria-labelledby="gp-goals">
        <div className="sec-h">
          <h2 id="gp-goals">내 목표</h2>
          {achieved.length > 0 && (
            <label className="xs c3 gp-toggle"><input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} /> 달성한 목표 함께 보기</label>
          )}
        </div>

        <form className="gp-form" onSubmit={addGoal}>
          <div className="gp-f-job">
            <label className="lbl" htmlFor="gp-job">직무</label>
            <input id="gp-job" className="input" list="gp-job-list" value={form.job} maxLength={40}
              placeholder="예: 클라우드 엔지니어" onChange={(e) => setForm({ ...form, job: e.target.value })} />
            <datalist id="gp-job-list">{jobNames.map((n) => <option key={n} value={n} />)}</datalist>
          </div>
          <div className="gp-f-title">
            <label className="lbl" htmlFor="gp-title">목표</label>
            <input id="gp-title" className="input" value={form.title} maxLength={80}
              placeholder="예: 한국수자원공사 1차 면접 대비 모의면접 10회" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="gp-f-date">
            <label className="lbl" htmlFor="gp-date">기한 <span className="c3">선택</span></label>
            <input id="gp-date" className="input" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
          </div>
          <label className="gp-f-pub">
            <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} />
            <span className="sm">같은 직무 회원에게 공개</span>
          </label>
          <button type="submit" className={"btn gp-f-btn " + (share ? "btn-secondary" : "btn-primary")} disabled={saving}>{saving ? "추가 중" : "목표 추가"}</button>
        </form>

        {share && (
          <div className="box-key gp-share" role="dialog" aria-labelledby="gp-share-t">
            <div className="gp-share-h">
              <h3 id="gp-share-t">소식 남기기</h3>
              <span className="xs c3">"{share.goal.title}" 달성</span>
            </div>
            <textarea className="textarea" rows={3} maxLength={300} value={share.message}
              onChange={(e) => setShare({ ...share, message: e.target.value })} aria-label="달성 소식 내용" />
            <div className="gp-share-f">
              <span className="xs c3">올린 소식은 같은 직무 회원의 홈에 이름 일부를 가린 채 보입니다.</span>
              <span className="gp-share-btns">
                <button type="button" className="btn btn-secondary" onClick={() => setShare(null)} disabled={share.sending}>건너뛰기</button>
                <button type="button" className="btn btn-primary" onClick={sendShare} disabled={share.sending}>{share.sending ? "올리는 중" : "소식 올리기"}</button>
              </span>
            </div>
            {share.error && <p className="loop-err" role="alert">{share.error}</p>}
          </div>
        )}

        {gErr ? <LoopError error={gErr} what="목표" onRetry={() => setGTick((n) => n + 1)} />
          : goals == null ? <LoopSkeleton rows={3} />
            : shown.length === 0 ? (
              <p className="feed-empty">{achieved.length > 0 ? "진행 중인 목표 없음. 다음 목표를 추가하세요." : "등록한 목표 없음. 위 칸에 직무와 목표를 적고 추가하세요."}</p>
            ) : (
              <table className="t gp-table">
                <thead><tr><th>기한</th><th>목표</th><th className="hide-m">직무</th><th className="hide-m">공개</th><th className="ta-r">관리</th></tr></thead>
                <tbody>
                  {shown.map((g) => {
                    const n = dDay(g.due_date);
                    const done = !!g.achieved_at;
                    return (
                      <tr key={g.id} className={done ? "is-done" : ""}>
                        <td className="nw">
                          {done ? <span className="tag tag-good">달성 {fmtShort(g.achieved_at)}</span>
                            : <><span className={"dd num" + (n != null && n <= 7 ? " hot" : "")}>{dDayLabel(g.due_date) || "-"}</span>{g.due_date && <span className="xs c3 num gp-date"> {fmtShort(g.due_date)}</span>}</>}
                        </td>
                        <td><span className="gp-title">{g.title}</span><span className="xs c3 show-m">{g.job}</span></td>
                        <td className="hide-m c2">{g.job}</td>
                        <td className="hide-m">
                          <label className="switch">
                            <input type="checkbox" checked={g.is_public} disabled={busyGoal === g.id} onChange={() => patchGoal(g, { is_public: !g.is_public })} />
                            <span className="xs">{g.is_public ? "공개" : "비공개"}</span>
                          </label>
                        </td>
                        <td className="ta-r nw">
                          {done ? (
                            <>
                              <button type="button" className="btn btn-text btn-sm" disabled={busyGoal === g.id}
                                onClick={() => setShare({ goal: g, message: feedTemplate(g), sending: false, error: "" })}>소식</button>
                              <button type="button" className="btn btn-text btn-sm" disabled={busyGoal === g.id} onClick={() => patchGoal(g, { achieved: false })}>되돌리기</button>
                            </>
                          ) : (
                            <button type="button" className="btn btn-secondary btn-sm" disabled={busyGoal === g.id} onClick={() => achieve(g)}>달성</button>
                          )}
                          <button type="button" className="btn btn-text btn-sm icon-only" aria-label={`${g.title} 삭제`} disabled={busyGoal === g.id} onClick={() => removeGoal(g)}><Trash2 size={15} aria-hidden="true" /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
      </section>

      {/* ---------- 플래너 ---------- */}
      <section className="sec" aria-labelledby="gp-plan">
        <div className="sec-h">
          <h2 id="gp-plan">데일리 플래너 <small>할 일을 체크하면 연속 기록에 반영</small></h2>
        </div>
        <div className="gp-plan">
          <div className="cal">
            <div className="cal-h">
              <button type="button" className="btn btn-text btn-sm icon-only" aria-label="이전 달" onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
              <b className="num">{cursor.y}년 {cursor.m + 1}월</b>
              <button type="button" className="btn btn-text btn-sm icon-only" aria-label="다음 달" onClick={() => move(1)}><ChevronRight size={18} aria-hidden="true" /></button>
              <button type="button" className="btn btn-secondary btn-sm cal-today" onClick={goToday}>오늘</button>
            </div>
            <div className="cal-grid" role="grid" aria-label={`${cursor.y}년 ${cursor.m + 1}월 달력`}>
              {WEEK.map((w) => <span key={w} className="cal-w" role="columnheader">{w}</span>)}
              {grid.map((d) => {
                const k = ymd(d);
                const list = byDate[k] || [];
                const doneN = list.filter((p) => p.done).length;
                const out = d.getMonth() !== cursor.m;
                const cls = ["cal-d", out ? "out" : "", k === today ? "today" : "", k === selDate ? "on" : ""].filter(Boolean).join(" ");
                return (
                  <button type="button" key={k} className={cls} role="gridcell" aria-selected={k === selDate}
                    aria-label={`${d.getMonth() + 1}월 ${d.getDate()}일${list.length ? `, 할 일 ${list.length}개 중 ${doneN}개 완료` : ""}`}
                    onClick={() => setSelDate(k)}>
                    <span className="num">{d.getDate()}</span>
                    {list.length > 0 && <span className={"cal-n num" + (doneN === list.length ? " all" : "")}>{doneN}/{list.length}</span>}
                  </button>
                );
              })}
            </div>
            {pErr && <LoopError error={pErr} what="할 일" onRetry={() => setPTick((n) => n + 1)} />}
          </div>

          <div className="day">
            <div className="side-h">
              <h3>{selLabel}{selDate === today && <span className="tag tag-a">오늘</span>}</h3>
              <span className="xs c3 num">{dayPlans.filter((p) => p.done).length} / {dayPlans.length}</span>
            </div>
            <form className="day-add" onSubmit={addPlan}>
              <input className="input" value={planText} maxLength={100} placeholder="할 일 추가 (예: 지원동기 답변 3번 말해 보기)"
                aria-label="할 일 내용" onChange={(e) => setPlanText(e.target.value)} disabled={!!pErr} />
              {active.length > 0 && (
                <select className="input day-goal" value={planGoal} onChange={(e) => setPlanGoal(e.target.value)} aria-label="연결할 목표">
                  <option value="">목표 연결 안 함</option>
                  {active.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
                </select>
              )}
              <button type="submit" className="btn btn-secondary" disabled={!planText.trim() || busyPlan === "new" || !!pErr}>추가</button>
            </form>
            {plans == null && !pErr ? <LoopSkeleton rows={3} />
              : dayPlans.length === 0 ? <p className="side-empty">이날 등록한 할 일 없음</p>
                : null}
            {plans == null || pErr || dayPlans.length === 0 ? null
                : (
                  <ul className="todo day-list">
                    {dayPlans.map((p) => (
                      <li key={p.id}>
                        <label>
                          <input type="checkbox" checked={p.done} disabled={busyPlan === p.id} onChange={() => togglePlan(p)} />
                          <span>
                            <span className={"sm" + (p.done ? " is-done" : "")}>{p.text}</span>
                            {p.goal_id != null && goalTitle(p.goal_id) && <span className="xs c3 day-goal-t">{goalTitle(p.goal_id)}</span>}
                          </span>
                        </label>
                        <button type="button" className="btn btn-text btn-sm icon-only" aria-label={`${p.text} 삭제`} disabled={busyPlan === p.id} onClick={() => removePlan(p)}><Trash2 size={15} aria-hidden="true" /></button>
                      </li>
                    ))}
                  </ul>
                )}
            {plans != null && !pErr && suggestions.length > 0 && (() => {
              const left = suggestions.filter((t) => !dayPlans.some((p) => p.text === t));
              return left.length > 0 && (
                <div className="day-sug">
                  <span className="xs c3">면접 전 점검 추천</span>
                  <ul className="chips">
                    {left.slice(0, 6).map((t) => (
                      <li key={t}><button type="button" className="chip chip-sm" disabled={busyPlan === "new"} onClick={() => addPlan(null, t)}>+ {t}</button></li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
