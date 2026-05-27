import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import GitHubActivityWidget from '../GitHubActivityWidget';

// Mock the githubService module
vi.mock('../../services/githubService', () => ({
  fetchGitHubActivity: vi.fn(),
}));

import { fetchGitHubActivity } from '../../services/githubService';

const mockEvents = [
  { type: 'PushEvent', repo: 'user/repo-a', timestamp: new Date().toISOString(), url: 'https://github.com/user/repo-a' },
  { type: 'PullRequestEvent', repo: 'user/repo-b', timestamp: new Date(Date.now() - 3600000).toISOString(), url: 'https://github.com/user/repo-b' },
  { type: 'IssuesEvent', repo: 'user/repo-c', timestamp: new Date(Date.now() - 7200000).toISOString(), url: null },
];

describe('GitHubActivityWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    fetchGitHubActivity.mockReturnValue(new Promise(() => {})); // never resolves
    render(<GitHubActivityWidget />);
    expect(screen.getByTestId('github-activity-loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows activity items on successful fetch', async () => {
    fetchGitHubActivity.mockResolvedValue({
      data: mockEvents,
      cached: false,
      fetchedAt: Date.now(),
    });

    render(<GitHubActivityWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('github-activity-widget')).toBeInTheDocument();
    });

    expect(screen.getByText('Pushed to')).toBeInTheDocument();
    expect(screen.getByText('PR')).toBeInTheDocument();
    expect(screen.getByText('Issue')).toBeInTheDocument();
    expect(screen.getByText('user/repo-a')).toBeInTheDocument();
    expect(screen.getByText('user/repo-b')).toBeInTheDocument();
    expect(screen.getByText('user/repo-c')).toBeInTheDocument();
  });

  it('shows "last fetched" timestamp', async () => {
    const now = Date.now();
    fetchGitHubActivity.mockResolvedValue({
      data: mockEvents,
      cached: false,
      fetchedAt: now,
    });

    render(<GitHubActivityWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('last-fetched')).toBeInTheDocument();
    });

    const expectedTime = new Date(now).toLocaleTimeString();
    expect(screen.getByTestId('last-fetched')).toHaveTextContent(`Last fetched ${expectedTime}`);
  });

  it('shows cached badge when data is cached', async () => {
    fetchGitHubActivity.mockResolvedValue({
      data: mockEvents,
      cached: true,
      fetchedAt: Date.now(),
    });

    render(<GitHubActivityWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('cached-badge')).toBeInTheDocument();
    });

    expect(screen.getByTestId('cached-badge')).toHaveTextContent('cached');
  });

  it('shows stale badge when data is stale', async () => {
    fetchGitHubActivity.mockResolvedValue({
      data: mockEvents,
      cached: true,
      stale: true,
      fetchedAt: Date.now() - 600000,
    });

    render(<GitHubActivityWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('cached-badge')).toBeInTheDocument();
    });

    expect(screen.getByTestId('cached-badge')).toHaveTextContent('stale');
  });

  it('shows error message on failure', async () => {
    fetchGitHubActivity.mockResolvedValue({
      error: 'Rate limited — try again in a few minutes',
    });

    render(<GitHubActivityWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('github-activity-error')).toBeInTheDocument();
    });

    expect(screen.getByText('Rate limited — try again in a few minutes')).toBeInTheDocument();
  });
});
