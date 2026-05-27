import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import ImportContactsButton from '../ImportContactsButton';

function renderWithProvider(override = {}) {
  const state = {
    contacts: [], tasks: [], notes: [], theme: 'light', accentColor: '#2563eb',
    layout: 'cards', user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
    activeView: 'contacts', ...override,
  };
  return render(<AppProvider initialStateOverride={state}><ImportContactsButton /></AppProvider>);
}

describe('ImportContactsButton', () => {
  beforeEach(() => { localStorage.clear(); delete import.meta.env.VITE_GOOGLE_WORKSPACE_ENABLED; });

  it('renders import button', () => {
    renderWithProvider();
    expect(screen.getByRole('button', { name: /import from google/i })).toBeInTheDocument();
  });

  it('imports mock contacts on click', async () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: /import from google/i }));
    await waitFor(() => { expect(screen.getByRole('status')).toBeInTheDocument(); });
    expect(screen.getByRole('status').textContent).toContain('Imported 3 contacts');
    expect(screen.getByRole('status').textContent).toContain('mock');
  });

  it('skips duplicates', async () => {
    renderWithProvider({
      contacts: [
        { id: 'e1', name: 'Diana Prince', email: 'diana.prince@example.com', phone: '', category: 'work', createdAt: '2026-01-01T00:00:00.000Z' },
        { id: 'e2', name: 'Clark Kent', email: 'clark.kent@example.com', phone: '', category: 'work', createdAt: '2026-01-01T00:00:00.000Z' },
        { id: 'e3', name: 'Lois Lane', email: 'lois.lane@example.com', phone: '', category: 'personal', createdAt: '2026-01-01T00:00:00.000Z' },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: /import from google/i }));
    await waitFor(() => { expect(screen.getByRole('status')).toBeInTheDocument(); });
    expect(screen.getByRole('status').textContent).toContain('All contacts already imported');
  });
});
