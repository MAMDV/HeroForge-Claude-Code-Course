import { describe, it, expect } from "vitest";
import { generateId, formatDate, resolveDate } from "../helpers";

describe("generateId", () => {
  it("returns a string", () => {
    expect(typeof generateId()).toBe("string");
  });

  it("returns a valid UUID v4 format", () => {
    const uuid = generateId();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    expect(uuid).toMatch(uuidRegex);
  });

  it("returns unique values on successive calls", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it("uses fallback when crypto.randomUUID is unavailable", () => {
    const original = crypto.randomUUID;
    try {
      crypto.randomUUID = undefined;
      const id = generateId();
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      expect(id).toMatch(uuidRegex);
    } finally {
      crypto.randomUUID = original;
    }
  });
});

describe("formatDate", () => {
  it("formats an ISO date string to human-readable format", () => {
    const result = formatDate("2026-03-16T00:00:00.000Z");
    expect(result).toContain("Mar");
    expect(result).toContain("2026");
    expect(result).toContain("16");
  });

  it("formats a date-only ISO string", () => {
    const result = formatDate("2024-12-25");
    expect(result).toContain("Dec");
    expect(result).toContain("25");
    expect(result).toContain("2024");
  });

  it("returns null for null input", () => {
    expect(formatDate(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(formatDate(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(formatDate("")).toBeNull();
  });

  it("returns null for invalid date string", () => {
    expect(formatDate("not-a-date")).toBeNull();
  });
});

describe("resolveDate", () => {
  // Use a fixed reference date: Monday, March 16, 2026
  const monday = new Date(2026, 2, 16);

  it('resolves "today" to the current date', () => {
    expect(resolveDate("today", monday)).toBe("2026-03-16");
  });

  it('resolves "tomorrow" to the next day', () => {
    expect(resolveDate("tomorrow", monday)).toBe("2026-03-17");
  });

  it('resolves "next friday" to the upcoming Friday', () => {
    expect(resolveDate("next friday", monday)).toBe("2026-03-20");
  });

  it('resolves "next monday" to the following Monday (7 days later)', () => {
    expect(resolveDate("next monday", monday)).toBe("2026-03-23");
  });

  it('resolves "next sunday" correctly', () => {
    expect(resolveDate("next sunday", monday)).toBe("2026-03-22");
  });

  it("is case-insensitive", () => {
    expect(resolveDate("TODAY", monday)).toBe("2026-03-16");
    expect(resolveDate("Tomorrow", monday)).toBe("2026-03-17");
    expect(resolveDate("Next Friday", monday)).toBe("2026-03-20");
  });

  it("trims whitespace", () => {
    expect(resolveDate("  today  ", monday)).toBe("2026-03-16");
  });

  it("returns null for null input", () => {
    expect(resolveDate(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(resolveDate(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(resolveDate("")).toBeNull();
  });

  it("returns null for unrecognized text", () => {
    expect(resolveDate("gobbledygook")).toBeNull();
  });

  it("returns null for non-string input", () => {
    expect(resolveDate(42)).toBeNull();
    expect(resolveDate({})).toBeNull();
  });
});
