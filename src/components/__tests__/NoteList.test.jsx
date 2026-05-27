import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import NoteList from '../NoteList';

const testNotes = [
  { id: 'n1', title: 'Sprint Planning Notes', body: 'Discussed backlog priorities for Q2.', category: 'meeting', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:30:00.000Z' },
  { id: 'n2', title: 'App Gamification Concept', body: 'What if we added streaks for completing tasks?', category: 'idea', createdAt: '2026-01-20T14:00:00.000Z', updatedAt: '2026-01-21T09:15:00.000Z' },
  { id: 'n3', title: 'Vite Environment Variables', body: 'Prefix all client-side env vars with VITE_.', category: 'reference', createdAt: '2026-01-25T16:00:00.000Z', updatedAt: '2026-01-25T16:00:00.000Z' },
];

function renderWithProvider(initialStateOverride) {
  const state = { contacts: [], tasks: [], notes: testNotes, theme: 'light', accentColor: '#1d4ed8', layout: 'cards', user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' }, activeView: 'notes', ...initialStateOverride };
  return render(<AppProvider initialStateOverride={state}><NoteList /></AppProvider>);
}

describe('NoteList', () => {
  beforeEach(() => { localStorage.clear(); });

  it('renders list of notes', () => {
    renderWithProvider();
    expect(screen.getByText('Sprint Planning Notes')).toBeInTheDocument();
    expect(screen.getByText('App Gamification Concept')).toBeInTheDocument();
    expect(screen.getByText('Vite Environment Variables')).toBeInTheDocument();
  });

  it('filters notes by search term', () => {
    renderWithProvider();
    const searchInput = screen.getByLabelText('Search notes');
    fireEvent.change(searchInput, { target: { value: 'gamification' } });
    expect(screen.getByText('App Gamification Concept')).toBeInTheDocument();
    expect(screen.queryByText('Sprint Planning Notes')).not.toBeInTheDocument();
    expect(screen.queryByText('Vite Environment Variables')).not.toBeInTheDocument();
  });
});
