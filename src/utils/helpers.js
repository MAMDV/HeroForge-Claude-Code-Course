/**
 * Shared utility functions for the LifeOps Command Center.
 * All exports are pure functions with no side effects.
 */

/**
 * Generates a unique identifier (UUID v4).
 *
 * Uses `crypto.randomUUID()` when available (modern browsers and Node 19+),
 * falling back to a spec-compliant polyfill.
 *
 * @returns {string} A UUID v4 string, e.g. "3b241101-e2bb-4d7a-8702-9e1a4f2c67d3"
 */
export function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback UUID v4 implementation (RFC 4122 compliant)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Converts an ISO date string to a human-readable format.
 *
 * @param {string|null|undefined} isoString - An ISO 8601 date string (e.g. "2026-03-16")
 * @returns {string|null} A formatted date string like "Mar 16, 2026", or null for falsy input
 *
 * @example
 * formatDate("2026-03-16T00:00:00.000Z"); // "Mar 16, 2026"
 * formatDate(null);                        // null
 */
export function formatDate(isoString) {
  if (!isoString) return null;

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Parses relative date text into an ISO date string (YYYY-MM-DD).
 *
 * Supported inputs:
 * - "today"
 * - "tomorrow"
 * - "next monday", "next tuesday", ... "next sunday"
 *
 * @param {string|null|undefined} dateText - A relative date phrase
 * @param {Date} [referenceDate=new Date()] - The date to resolve relative to (useful for testing)
 * @returns {string|null} An ISO date string like "2026-03-17", or null if the input cannot be parsed
 *
 * @example
 * resolveDate("tomorrow");          // "2026-03-17" (if today is 2026-03-16)
 * resolveDate("next friday");       // "2026-03-20" (if today is 2026-03-16, a Monday)
 * resolveDate("gobbledygook");      // null
 */
export function resolveDate(dateText, referenceDate) {
  if (!dateText || typeof dateText !== "string") return null;

  const text = dateText.trim().toLowerCase();
  const today = referenceDate instanceof Date ? referenceDate : new Date();

  if (text === "today") {
    return toISODate(today);
  }

  if (text === "tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return toISODate(tomorrow);
  }

  const nextDayMatch = text.match(
    /^next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/
  );
  if (nextDayMatch) {
    const targetDay = DAY_MAP[nextDayMatch[1]];
    const date = new Date(today);
    const currentDay = date.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    date.setDate(date.getDate() + daysUntil);
    return toISODate(date);
  }

  return null;
}

// --- Internal helpers ---

const DAY_MAP = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * Formats a Date object as an ISO date string (YYYY-MM-DD).
 * @param {Date} date
 * @returns {string}
 */
function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
