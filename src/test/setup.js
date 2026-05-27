import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Auto-mock githubService to prevent act() warnings from async useEffect in GitHubActivityWidget.
// Tests that need specific mock behavior (e.g. GitHubActivityWidget.test.jsx) override with their own vi.mock.
vi.mock('../services/githubService', () => ({
  fetchGitHubActivity: vi.fn().mockReturnValue(new Promise(() => {})),
}));

// Automatically clean up after each test
afterEach(() => {
  cleanup();
});

// Spy on console.error to fail tests on unexpected console errors
const consoleErrorSpy = vi.spyOn(console, 'error');

afterEach(() => {
  const calls = consoleErrorSpy.mock.calls;
  if (calls.length > 0) {
    consoleErrorSpy.mockClear();
    throw new Error(
      `Unexpected console.error calls:\n${calls.map((args) => args.join(' ')).join('\n')}`
    );
  }
  consoleErrorSpy.mockClear();
});
