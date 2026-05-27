import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  const STORAGE_KEY = "lifeops-state";

  const initialValue = {
    contacts: [],
    tasks: [],
    notes: [],
    theme: "light",
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns initialValue when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );
    expect(result.current[0]).toEqual(initialValue);
  });

  it("reads and deserializes existing localStorage data", () => {
    const stored = { ...initialValue, theme: "dark" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );
    expect(result.current[0].theme).toBe("dark");
  });

  it("merges stored data with initialValue defaults", () => {
    // Stored data missing some keys
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: "dark" }));

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );
    expect(result.current[0].theme).toBe("dark");
    expect(result.current[0].contacts).toEqual([]);
    expect(result.current[0].tasks).toEqual([]);
  });

  it("falls back to initialValue on corrupted localStorage data", () => {
    localStorage.setItem(STORAGE_KEY, "not-valid-json{{{");

    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );
    expect(result.current[0]).toEqual(initialValue);
  });

  it("serializes and syncs state to localStorage on change", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );

    const updatedState = { ...initialValue, theme: "dark" };
    act(() => {
      result.current[1](updatedState);
    });

    expect(result.current[0].theme).toBe("dark");
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.theme).toBe("dark");
  });

  it("works with the specific lifeops-state key", () => {
    const { result } = renderHook(() =>
      useLocalStorage("lifeops-state", initialValue)
    );

    act(() => {
      result.current[1]({ ...initialValue, contacts: [{ id: "c1", name: "Alice" }] });
    });

    const stored = JSON.parse(localStorage.getItem("lifeops-state"));
    expect(stored.contacts).toHaveLength(1);
    expect(stored.contacts[0].name).toBe("Alice");
  });

  it("handles localStorage.setItem failure gracefully", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );

    // Mock setItem to throw (e.g., storage full)
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    // Should not throw
    act(() => {
      result.current[1]({ ...initialValue, theme: "dark" });
    });

    expect(result.current[0].theme).toBe("dark");
  });

  it("supports functional updates via setValue", () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEY, initialValue)
    );

    act(() => {
      result.current[1]((prev) => ({ ...prev, theme: "dark" }));
    });

    expect(result.current[0].theme).toBe("dark");
  });
});
