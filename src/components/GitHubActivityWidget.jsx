import { useState, useEffect } from 'react';
import { fetchGitHubActivity } from '../services/githubService';
import ErrorBoundary from './ErrorBoundary';

const EVENT_LABELS = {
  PushEvent: { label: 'Pushed to', icon: '~' },
  PullRequestEvent: { label: 'PR', icon: '~' },
  IssuesEvent: { label: 'Issue', icon: '~' },
  CreateEvent: { label: 'Created', icon: '+' },
  DeleteEvent: { label: 'Deleted', icon: '-' },
  WatchEvent: { label: 'Starred', icon: '*' },
  ForkEvent: { label: 'Forked', icon: '/' },
  IssueCommentEvent: { label: 'Commented', icon: '#' },
  PullRequestReviewEvent: { label: 'Reviewed', icon: '>' },
  ReleaseEvent: { label: 'Released', icon: '^' },
};

function relativeTime(timestamp) {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;

  if (Number.isNaN(diffMs) || diffMs < 0) return 'just now';

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatFetchedAt(fetchedAt) {
  if (!fetchedAt) return '';
  return new Date(fetchedAt).toLocaleTimeString();
}

function ActivityItem({ event }) {
  const eventInfo = EVENT_LABELS[event.type] || { label: event.type, icon: '.' };

  return (
    <li className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid var(--lm-border)' }}>
      <span
        className="flex size-6 shrink-0 items-center justify-center text-xs"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--lm-accent)' }}
        aria-hidden="true"
      >
        {eventInfo.icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="text-sm" style={{ color: 'var(--lm-text)' }}>
          {eventInfo.label}
        </span>
        {' '}
        {event.url ? (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm transition-colors"
            style={{ color: 'var(--lm-accent)' }}
          >
            {event.repo}
          </a>
        ) : (
          <span className="text-sm" style={{ color: 'var(--lm-text-secondary)' }}>{event.repo}</span>
        )}
      </div>
      <time
        className="shrink-0 text-xs"
        style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}
        dateTime={event.timestamp}
      >
        {relativeTime(event.timestamp)}
      </time>
    </li>
  );
}

function GitHubActivityWidgetInner() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [cached, setCached] = useState(false);
  const [stale, setStale] = useState(false);
  const [fetchedAt, setFetchedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const result = await fetchGitHubActivity();

      if (cancelled) return;

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setEvents(result.data || []);
      setCached(!!result.cached);
      setStale(!!result.stale);
      setFetchedAt(result.fetchedAt);
      setError(null);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div data-testid="github-activity-loading" className="mc-card h-full p-5">
        <h2 className="mc-heading mb-4 text-lg">GitHub</h2>
        <p className="text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="github-activity-error" className="mc-card h-full p-5">
        <h2 className="mc-heading mb-4 text-lg">GitHub</h2>
        <p className="text-sm" style={{ color: 'var(--lm-danger)' }}>{error}</p>
      </div>
    );
  }

  return (
    <div data-testid="github-activity-widget" className="mc-card h-full p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mc-heading text-lg">GitHub</h2>
        {(cached || stale) && (
          <span
            data-testid="cached-badge"
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--lm-warning)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em' }}
          >
            {stale ? 'stale' : 'cached'}
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>No recent activity.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <ActivityItem key={`${event.type}-${event.repo}-${event.timestamp}-${index}`} event={event} />
          ))}
        </ul>
      )}

      {fetchedAt && (
        <p data-testid="last-fetched" className="mt-3 text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          Last fetched {formatFetchedAt(fetchedAt)}
        </p>
      )}
    </div>
  );
}

function GitHubActivityWidget() {
  return (
    <ErrorBoundary>
      <GitHubActivityWidgetInner />
    </ErrorBoundary>
  );
}

export default GitHubActivityWidget;
