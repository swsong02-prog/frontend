/* ============================================================
   루프 기능 API (목표 / 플래너 / 소식 / 연속 기록)
   계약: spec_loop.md 1장. 모든 요청은 JWT(Bearer).
   - 실패하면 LoopApiError를 던진다. status 404는 "서버에 아직 기능이 없음"으로 화면에서 구분한다.
   - 401은 authFetch가 자동 로그아웃을 처리하고 AuthExpiredError를 던진다.
   ============================================================ */
import { authFetch } from "./ui";

export const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export class LoopApiError extends Error {
  constructor(status, detail) {
    super(detail || `http_${status}`);
    this.name = "LoopApiError";
    this.status = status;
    this.detail = detail || "";
  }
}

async function call(token, method, path, body) {
  const headers = { "Authorization": "Bearer " + token };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  let res;
  try {
    res = await authFetch(`${API}${path}`, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch (e) {
    if (e && e.name === "AuthExpiredError") throw e;
    throw new LoopApiError(0, "network");
  }
  let data = null;
  try { data = await res.json(); } catch (e) { /* 204 등 본문 없음 */ }
  if (!res.ok) {
    const detail = data && typeof data.detail === "string" ? data.detail : "";
    throw new LoopApiError(res.status, detail);
  }
  return data;
}

/* 화면에 보여 줄 오류 한 줄 (404 = 서버 준비 전) */
export function loopErrorText(e, what = "정보") {
  if (!e) return "";
  if (e.status === 404 || e.status === 405) return `서버에 ${what} 기능이 아직 열리지 않았습니다.`;
  if (e.status === 0) return `서버에 연결하지 못해 ${what}를 불러오지 못했습니다.`;
  if (e.detail && e.detail !== "network") return e.detail;
  return `${what}를 불러오지 못했습니다.`;
}

/* ---------- 날짜 (KST 기준 YYYY-MM-DD) ---------- */
export function kstToday() {
  const d = new Date(Date.now() + 9 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}
export function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
export function dDay(due) {
  if (!due) return null;
  const t = new Date(due + "T00:00:00");
  const n = new Date(kstToday() + "T00:00:00");
  if (isNaN(t.getTime())) return null;
  return Math.round((t - n) / 86400000);
}
export function dDayLabel(due) {
  const n = dDay(due);
  if (n == null) return "";
  return n === 0 ? "D-day" : n > 0 ? `D-${n}` : `D+${-n}`;
}
export function fmtShort(s) {
  if (!s) return "";
  const t = new Date(String(s).length <= 10 ? s + "T00:00:00" : s);
  if (isNaN(t.getTime())) return "";
  return `${String(t.getMonth() + 1).padStart(2, "0")}.${String(t.getDate()).padStart(2, "0")}`;
}

/* ---------- 응답 정리 (계약과 다르게 와도 화면이 깨지지 않게) ---------- */
const arr = (v) => (Array.isArray(v) ? v.filter((x) => x && typeof x === "object") : []);
const str = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));

function normGoal(g) {
  return {
    id: g.id,
    job: str(g.job),
    title: str(g.title),
    due_date: g.due_date ? str(g.due_date).slice(0, 10) : null,
    is_public: !!g.is_public,
    achieved_at: g.achieved_at || null,
    created_at: g.created_at || null,
  };
}
function normPlan(p) {
  return { id: p.id, date: str(p.date).slice(0, 10), text: str(p.text), done: !!p.done, goal_id: p.goal_id ?? null };
}

/* ---------- 목표 ---------- */
export const listGoals = async (token) => arr(await call(token, "GET", "/goals")).map(normGoal);
export const createGoal = async (token, body) => normGoal(await call(token, "POST", "/goals", body) || {});
export const updateGoal = async (token, id, body) => normGoal(await call(token, "PATCH", `/goals/${id}`, body) || {});
export const deleteGoal = (token, id) => call(token, "DELETE", `/goals/${id}`);

/* ---------- 플래너 ---------- */
export const listPlans = async (token, from, to) =>
  arr(await call(token, "GET", `/plans?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)).map(normPlan);
export const createPlan = async (token, body) => normPlan(await call(token, "POST", "/plans", body) || {});
export const updatePlan = async (token, id, body) => normPlan(await call(token, "PATCH", `/plans/${id}`, body) || {});
export const deletePlan = (token, id) => call(token, "DELETE", `/plans/${id}`);

/* ---------- 소식 ---------- */
export const postFeed = (token, body) => call(token, "POST", "/feed", body);
export async function getFeed(token, job, limit = 20) {
  const q = new URLSearchParams();
  if (job) q.set("job", job);
  q.set("limit", String(limit));
  const d = await call(token, "GET", `/feed?${q.toString()}`);
  return {
    posts: arr(d && d.posts).map((p) => ({ id: p.id, author: str(p.author), job: str(p.job), message: str(p.message), created_at: p.created_at || null })),
    goals: arr(d && d.goals).map((g) => ({ author: str(g.author), job: str(g.job), title: str(g.title), due_date: g.due_date ? str(g.due_date).slice(0, 10) : null, achieved: !!g.achieved })),
  };
}

/* ---------- 연속 기록·주간 퀘스트 ---------- */
export async function getProgress(token) {
  const d = await call(token, "GET", "/me/progress");
  const week = d && d.week && typeof d.week === "object" ? d.week : {};
  const num = (v) => (typeof v === "number" && isFinite(v) ? v : 0);
  return {
    streak_days: num(d && d.streak_days),
    week: { interviews: num(week.interviews), plans_done: num(week.plans_done) },
    quests: arr(d && d.quests).map((q) => ({ key: str(q.key), label: str(q.label), current: num(q.current), target: Math.max(1, num(q.target)), done: !!q.done })),
  };
}

/* 달성 소식 문장 틀 */
export function feedTemplate(goal) {
  const job = goal.job ? `${goal.job} 준비 중, ` : "";
  return `${job}"${goal.title}" 목표를 달성했습니다.`;
}
