/**
 * Unit tests for taskParser (Issue #133)
 *
 * 12 tests covering:
 *   - Priority detection (4): !!!, urgent, asap, low priority/whenever
 *   - Date extraction (4): by <date>, due <date>, tomorrow, today
 *   - Contact matching (1): case-insensitive substring
 *   - Defaults (1): medium priority, no date
 *   - Edge cases (2): empty string, no recognizable patterns
 */
import { describe, it, expect } from 'vitest';
import { parseTaskInput } from '../taskParser';

const testContacts = [
  { id: 'c1', name: 'Sarah Chen' },
  { id: 'c2', name: 'Mom' },
];

describe('taskParser', () => {
  // --- Priority detection (4) ---
  describe('priority detection', () => {
    it('detects !!! as high priority', () => {
      const result = parseTaskInput('Fix bug !!!', []);
      expect(result.priority).toBe('high');
      expect(result.title).toBe('Fix bug');
    });

    it('detects "urgent" as high priority', () => {
      const result = parseTaskInput('Deploy hotfix urgent', []);
      expect(result.priority).toBe('high');
      expect(result.title).toBe('Deploy hotfix');
    });

    it('detects "asap" as high priority', () => {
      const result = parseTaskInput('Review PR asap', []);
      expect(result.priority).toBe('high');
      expect(result.title).toBe('Review PR');
    });

    it('detects "low priority" or "whenever" as low priority', () => {
      const lowPriority = parseTaskInput('Clean desk low priority', []);
      expect(lowPriority.priority).toBe('low');
      expect(lowPriority.title).toBe('Clean desk');

      const whenever = parseTaskInput('Organize files whenever', []);
      expect(whenever.priority).toBe('low');
      expect(whenever.title).toBe('Organize files');
    });
  });

  // --- Date extraction (4) ---
  describe('date extraction', () => {
    it('extracts "by <date>" format', () => {
      const result = parseTaskInput('Finish report by March 15, 2026', []);
      expect(result.dueDate).toBe('2026-03-15');
      expect(result.title).toBe('Finish report');
    });

    it('extracts "due <date>" format', () => {
      const result = parseTaskInput('Submit proposal due January 10, 2026', []);
      expect(result.dueDate).toBe('2026-01-10');
      expect(result.title).toBe('Submit proposal');
    });

    it('extracts "tomorrow"', () => {
      const result = parseTaskInput('Call dentist tomorrow', []);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const expected = tomorrow.toISOString().slice(0, 10);
      expect(result.dueDate).toBe(expected);
      expect(result.title).toBe('Call dentist');
    });

    it('extracts "today"', () => {
      const result = parseTaskInput('Buy groceries today', []);
      const expected = new Date().toISOString().slice(0, 10);
      expect(result.dueDate).toBe(expected);
      expect(result.title).toBe('Buy groceries');
    });
  });

  // --- Contact matching (1) ---
  describe('contact matching', () => {
    it('matches contact name case-insensitively', () => {
      const result = parseTaskInput('Call sarah chen about project', testContacts);
      expect(result.matchedContactName).toBe('Sarah Chen');
    });
  });

  // --- Defaults (1) ---
  describe('defaults', () => {
    it('returns medium priority and no date when nothing detected', () => {
      const result = parseTaskInput('Buy groceries', []);
      expect(result.priority).toBe('medium');
      expect(result.dueDate).toBeNull();
      expect(result.matchedContactName).toBeNull();
      expect(result.title).toBe('Buy groceries');
    });
  });

  // --- Edge cases (2) ---
  describe('edge cases', () => {
    it('handles empty string', () => {
      const result = parseTaskInput('', []);
      expect(result.title).toBe('');
      expect(result.priority).toBe('medium');
      expect(result.dueDate).toBeNull();
      expect(result.matchedContactName).toBeNull();
    });

    it('handles input with no recognizable patterns', () => {
      const result = parseTaskInput('Just a simple task', []);
      expect(result.title).toBe('Just a simple task');
      expect(result.priority).toBe('medium');
      expect(result.dueDate).toBeNull();
      expect(result.matchedContactName).toBeNull();
    });
  });
});
