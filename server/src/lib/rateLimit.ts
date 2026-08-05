/**
 * Minimal in-memory rate limiter (no database / Redis needed).
 * Good enough for a single-instance Render web service fronting a
 * low-traffic contact form. Resets are per-process, so a redeploy
 * clears the window — that's fine for this use case.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // per IP, per window

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}

// Periodically clear stale keys so the map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of hits.entries()) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}, WINDOW_MS).unref();
