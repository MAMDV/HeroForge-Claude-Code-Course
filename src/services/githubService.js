// Infrastructure service: GitHub public events API integration
// See ADR-008 (runtime fetch, Anti-Corruption Layer, 5-10 min cache TTL)
// DDD context: App → External Integration → GitHub
// SPARC Phase 2 pseudocode: fetchGitHubActivity algorithm

const BASE_URL = 'https://api.github.com';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes (ADR-008: 5-10 min TTL)

/**
 * Maps HTTP status codes to user-friendly error messages.
 */
function mapHttpError(status) {
  switch (status) {
    case 403:
      return 'Rate limited — try again in a few minutes';
    case 404:
      return 'GitHub user not found';
    case 422:
      return 'Invalid username';
    default:
      if (status >= 500) return 'GitHub is temporarily unavailable';
      return `Unexpected error (${status})`;
  }
}

/**
 * Anti-Corruption Layer: transforms GitHub event into app's internal shape.
 *
 * External shape (GitHub Events API):
 *   { type, repo: { name }, created_at, payload: { ... } }
 *
 * Internal shape (LifeOps):
 *   { type, repo, timestamp, url }
 */
function transformEvent(event) {
  return {
    type: event.type,
    repo: event.repo?.name || 'unknown',
    timestamp: event.created_at,
    url: event.repo?.url
      ? `https://github.com/${event.repo.name}`
      : null,
  };
}

/**
 * Builds the GitHub public events API URL for a given username.
 */
function buildUrl(username) {
  return `${BASE_URL}/users/${encodeURIComponent(username)}/events/public?per_page=10`;
}

/**
 * Builds request headers, optionally including auth token for higher rate limits.
 * ADR-008: Optional VITE_GITHUB_TOKEN with public_repo + read:user scope only.
 */
function buildHeaders(token) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Returns the cache key for a given username.
 */
function cacheKey(username) {
  return 'github-activity-' + username;
}

/**
 * Reads cached data from localStorage.
 * Returns null if no cache or if cache is expired beyond TTL.
 */
function readCache(username) {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Writes data to localStorage cache with current timestamp.
 */
function writeCache(username, events) {
  try {
    localStorage.setItem(
      cacheKey(username),
      JSON.stringify({ events, fetchedAt: Date.now() })
    );
  } catch {
    // localStorage full or unavailable — silently ignore (ADR-008: graceful degradation)
  }
}

/**
 * Fetches GitHub public activity for a user with client-side caching.
 *
 * Follows the service layer pattern from ADR-008:
 *   1. Check cache (5 min TTL in localStorage)
 *   2. Build URL with parameters
 *   3. Call fetch() with error handling
 *   4. Transform external response → app's internal shape (Anti-Corruption Layer)
 *   5. Return structured result with fetchedAt timestamp
 *
 * SPARC Phase 2 pseudocode: fetchGitHubActivity algorithm
 *
 * @param {string} username - GitHub username to fetch activity for
 * @returns {Promise<{ data: Array, cached: boolean, stale?: boolean, fetchedAt: number } | { error: string }>}
 */
export async function fetchGitHubActivity(username) {
  const user = username || import.meta.env.VITE_GITHUB_USERNAME || 'mamd69';

  if (!user || typeof user !== 'string' || !user.trim()) {
    return { error: 'Set VITE_GITHUB_USERNAME in .env' };
  }

  const trimmedUser = user.trim();

  // Step 1: Check cache (ADR-008: 5-10 min TTL)
  const cached = readCache(trimmedUser);
  if (cached && (Date.now() - cached.fetchedAt) < CACHE_TTL_MS) {
    return {
      data: cached.events,
      cached: true,
      fetchedAt: cached.fetchedAt,
    };
  }

  // Step 2: Fetch from GitHub API
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  try {
    const response = await fetch(buildUrl(trimmedUser), {
      headers: buildHeaders(token),
    });

    if (!response.ok) {
      // Return cached data when rate limited, with stale flag (ADR-008)
      if (cached) {
        return {
          data: cached.events,
          cached: true,
          stale: true,
          fetchedAt: cached.fetchedAt,
        };
      }
      return { error: mapHttpError(response.status) };
    }

    const rawEvents = await response.json();
    const events = rawEvents.map(transformEvent);

    // Step 3: Write to cache
    writeCache(trimmedUser, events);

    return {
      data: events,
      cached: false,
      fetchedAt: Date.now(),
    };
  } catch (error) {
    // Network error — return cached data if available
    if (cached) {
      return {
        data: cached.events,
        cached: true,
        stale: true,
        fetchedAt: cached.fetchedAt,
      };
    }
    if (error.name === 'TypeError' || error.message?.includes('fetch')) {
      return { error: 'No internet connection — check your network' };
    }
    return { error: 'No internet connection — check your network' };
  }
}
