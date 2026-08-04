const SESSION_KEY = "session_meta";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const REFRESH_THRESHOLD_MS = 5 * 24 * 60 * 60 * 1000;

interface SessionMeta {
  expiresAt: number;
  lastRefreshAt: number;
}

export type SessionStatus = "valid" | "expired" | "needs-refresh" | "missing";

function readSessionMeta(): SessionMeta | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionMeta;
  } catch {
    return null;
  }
}

function writeSessionMeta(meta: SessionMeta) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(meta));
}

export function startSession() {
  const now = Date.now();
  writeSessionMeta({ expiresAt: now + SESSION_DURATION_MS, lastRefreshAt: now });
}

export function refreshSession() {
  const now = Date.now();
  writeSessionMeta({ expiresAt: now + SESSION_DURATION_MS, lastRefreshAt: now });
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionStatus(): SessionStatus {
  const meta = readSessionMeta();
  if (!meta) return "missing";

  const now = Date.now();
  if (now > meta.expiresAt) return "expired";
  if (now - meta.lastRefreshAt >= REFRESH_THRESHOLD_MS) return "needs-refresh";
  return "valid";
}
