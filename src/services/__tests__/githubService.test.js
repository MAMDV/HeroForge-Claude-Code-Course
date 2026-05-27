/**
 * Unit tests for githubService.js (Issue #126)
 *
 * Validates acceptance criteria from Issue #126 and ADR-008:
 *   - fetchGitHubActivity(username) calls GitHub public events API
 *   - Client-side caching: 5-10 min TTL in localStorage
 *   - Returns cached data when rate limited (with stale: true flag)
 *   - Username from VITE_GITHUB_USERNAME env var
 *   - Optional VITE_GITHUB_TOKEN for higher rate limits
 *   - "Last fetched" timestamp in response
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Use the real module (override global auto-mock from test setup)
vi.unmock('../githubService.js');

import { fetchGitHubActivity } from '../githubService.js';

// Sample GitHub event from the API
const mockGitHubEvent = {
  type: 'PushEvent',
  repo: { name: 'octocat/hello-world', url: 'https://api.github.com/repos/octocat/hello-world' },
  created_at: '2026-03-16T10:00:00Z',
  payload: {},
};

// Transformed event (app shape per ADR-008 ACL)
const expectedAppEvent = {
  type: 'PushEvent',
  repo: 'octocat/hello-world',
  timestamp: '2026-03-16T10:00:00Z',
  url: 'https://github.com/octocat/hello-world',
};

describe('githubService', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    localStorage.clear();
    delete import.meta.env.VITE_GITHUB_USERNAME;
    delete import.meta.env.VITE_GITHUB_TOKEN;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('fetches events from GitHub public events API', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    const result = await fetchGitHubActivity('octocat');

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch.mock.calls[0][0]).toContain(
      'https://api.github.com/users/octocat/events/public'
    );
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toEqual(expectedAppEvent);
  });

  it('transforms events through Anti-Corruption Layer (ADR-008)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    const result = await fetchGitHubActivity('octocat');
    const event = result.data[0];

    expect(event).toHaveProperty('type');
    expect(event).toHaveProperty('repo');
    expect(event).toHaveProperty('timestamp');
    expect(event).toHaveProperty('url');
    expect(event).not.toHaveProperty('payload');
    expect(event).not.toHaveProperty('created_at');
  });

  it('returns cached data within TTL without fetching', async () => {
    const cacheData = {
      events: [expectedAppEvent],
      fetchedAt: Date.now() - 60 * 1000,
    };
    localStorage.setItem('github-activity-octocat', JSON.stringify(cacheData));

    global.fetch = vi.fn();

    const result = await fetchGitHubActivity('octocat');

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.cached).toBe(true);
    expect(result.data).toEqual([expectedAppEvent]);
    expect(result.fetchedAt).toBe(cacheData.fetchedAt);
  });

  it('fetches fresh data when cache is expired', async () => {
    const cacheData = {
      events: [expectedAppEvent],
      fetchedAt: Date.now() - 6 * 60 * 1000,
    };
    localStorage.setItem('github-activity-octocat', JSON.stringify(cacheData));

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    const result = await fetchGitHubActivity('octocat');

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(result.cached).toBe(false);
  });

  it('writes fetched data to localStorage cache', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    await fetchGitHubActivity('octocat');

    const cached = JSON.parse(localStorage.getItem('github-activity-octocat'));
    expect(cached).toBeTruthy();
    expect(cached.events).toHaveLength(1);
    expect(cached.events[0]).toEqual(expectedAppEvent);
    expect(cached.fetchedAt).toBeTypeOf('number');
  });

  it('returns stale cached data on rate limit (403) with stale: true', async () => {
    const cacheData = {
      events: [expectedAppEvent],
      fetchedAt: Date.now() - 6 * 60 * 1000,
    };
    localStorage.setItem('github-activity-octocat', JSON.stringify(cacheData));

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
    });

    const result = await fetchGitHubActivity('octocat');

    expect(result.stale).toBe(true);
    expect(result.cached).toBe(true);
    expect(result.data).toEqual([expectedAppEvent]);
    expect(result.fetchedAt).toBe(cacheData.fetchedAt);
  });

  it('returns error when rate limited with no cache', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
    });

    const result = await fetchGitHubActivity('octocat');

    expect(result.error).toContain('Rate limited');
  });

  it('returns stale cached data on network error', async () => {
    const cacheData = {
      events: [expectedAppEvent],
      fetchedAt: Date.now() - 10 * 60 * 1000,
    };
    localStorage.setItem('github-activity-octocat', JSON.stringify(cacheData));

    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    const result = await fetchGitHubActivity('octocat');

    expect(result.stale).toBe(true);
    expect(result.cached).toBe(true);
    expect(result.data).toEqual([expectedAppEvent]);
  });

  it('uses VITE_GITHUB_USERNAME when no username argument provided', async () => {
    import.meta.env.VITE_GITHUB_USERNAME = 'envuser';

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    await fetchGitHubActivity();

    expect(global.fetch.mock.calls[0][0]).toContain('/users/envuser/');
  });

  it('falls back to mamd69 when no username and no env var', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    await fetchGitHubActivity();

    expect(global.fetch.mock.calls[0][0]).toContain('/users/mamd69/');
  });

  it('sends Authorization header when VITE_GITHUB_TOKEN is set', async () => {
    import.meta.env.VITE_GITHUB_TOKEN = 'ghp_testtoken123';

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await fetchGitHubActivity('octocat');

    const headers = global.fetch.mock.calls[0][1].headers;
    expect(headers.Authorization).toBe('Bearer ghp_testtoken123');
  });

  it('does not send Authorization header without token', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await fetchGitHubActivity('octocat');

    const headers = global.fetch.mock.calls[0][1].headers;
    expect(headers.Authorization).toBeUndefined();
  });

  it('includes fetchedAt timestamp on fresh fetch', async () => {
    const before = Date.now();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockGitHubEvent]),
    });

    const result = await fetchGitHubActivity('octocat');

    expect(result.fetchedAt).toBeTypeOf('number');
    expect(result.fetchedAt).toBeGreaterThanOrEqual(before);
  });

  it('includes fetchedAt timestamp on cached response', async () => {
    const fetchedAt = Date.now() - 60 * 1000;
    localStorage.setItem(
      'github-activity-octocat',
      JSON.stringify({ events: [expectedAppEvent], fetchedAt })
    );

    const result = await fetchGitHubActivity('octocat');

    expect(result.fetchedAt).toBe(fetchedAt);
  });

  it('returns error for 404 (user not found)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchGitHubActivity('nonexistentuser12345');

    expect(result.error).toContain('not found');
  });

  it('returns network error when fetch fails with no cache', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    const result = await fetchGitHubActivity('octocat');

    expect(result.error).toContain('internet');
  });

  it('handles events with missing repo gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ type: 'WatchEvent', created_at: '2026-03-16T10:00:00Z' }]),
    });

    const result = await fetchGitHubActivity('octocat');

    expect(result.data[0].repo).toBe('unknown');
    expect(result.data[0].url).toBeNull();
  });
});
