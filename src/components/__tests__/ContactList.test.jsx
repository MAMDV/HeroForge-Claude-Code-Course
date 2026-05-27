import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import ContactList from '../ContactList';

const testContacts = [
  { id: 'c1', name: 'Sarah Chen', email: 'sarah.chen@example.com', phone: '555-0101', category: 'friend' },
  { id: 'c2', name: 'Mom', email: 'mom@example.com', phone: '555-0102', category: 'family' },
  { id: 'c3', name: 'Bob Builder', email: 'bob.builder@example.com', phone: '555-0103', category: 'work' },
];

const testTasks = [
  { id: 't1', title: 'Call Mom', contactId: 'c2', completed: false, priority: 'high', createdAt: '2026-01-01' },
  { id: 't2', title: 'Buy groceries', contactId: null, completed: false, priority: 'medium', createdAt: '2026-01-01' },
];

function renderWithProvider(initialStateOverride) {
  const state = {
    contacts: testContacts,
    tasks: testTasks,
    notes: [],
    theme: 'light',
    accentColor: '#2563eb',
    layout: 'cards',
    user: { name: 'User', bio: '', city: '', avatarEmoji: '👤' },
    activeView: 'contacts',
    ...initialStateOverride,
  };
  return render(
    <AppProvider initialStateOverride={state}>
      <ContactList />
    </AppProvider>
  );
}

describe('ContactList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders list of contacts', () => {
    renderWithProvider();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Mom')).toBeInTheDocument();
    expect(screen.getByText('Bob Builder')).toBeInTheDocument();
  });

  it('filters contacts by search term', () => {
    renderWithProvider();
    const searchInput = screen.getByLabelText('Search contacts');
    fireEvent.change(searchInput, { target: { value: 'sarah' } });
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.queryByText('Mom')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Builder')).not.toBeInTheDocument();
  });

  it('shows empty state when no contacts', () => {
    renderWithProvider({ contacts: [] });
    expect(screen.getByText('No contacts yet. Add your first contact above.')).toBeInTheDocument();
  });
});
