import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import TaskList from '../TaskList';

const testContacts = [
  { id: 'c1', name: 'Sarah Chen', email: 'sarah@example.com', phone: '555-0101', category: 'work', createdAt: '2026-01-01' },
  { id: 'c2', name: 'Mom', email: 'mom@example.com', phone: '555-0102', category: 'family', createdAt: '2026-01-01' },
];

const testTasks = [
  { id: 't1', title: 'Email project update', completed: false, priority: 'high', dueDate: null, contactId: 'c1', createdAt: '2026-01-01' },
  { id: 't2', title: 'Buy groceries', completed: false, priority: 'medium', dueDate: null, contactId: null, createdAt: '2026-01-02' },
  { id: 't3', title: 'Call Mom about plans', completed: true, priority: 'low', dueDate: null, contactId: 'c2', createdAt: '2026-01-03' },
];

function renderWithProvider(initialStateOverride) {
  const state = {
    contacts: testContacts,
    tasks: testTasks,
    notes: [],
    theme: 'light',
    accentColor: '#2563eb',
    layout: 'cards',
    user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
    activeView: 'tasks',
    ...initialStateOverride,
  };
  return render(
    <AppProvider initialStateOverride={state}>
      <TaskList />
    </AppProvider>
  );
}

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders list of tasks with priorities', () => {
    renderWithProvider();
    expect(screen.getByText('Email project update')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Call Mom about plans')).toBeInTheDocument();
    expect(screen.getByTestId('priority-badge-t1')).toHaveTextContent('High');
    expect(screen.getByTestId('priority-badge-t2')).toHaveTextContent('Medium');
    expect(screen.getByTestId('priority-badge-t3')).toHaveTextContent('Low');
  });

  it('filters by active/completed/all', () => {
    renderWithProvider();

    // Default: All — 3 tasks visible
    expect(screen.getByText('Email project update')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Call Mom about plans')).toBeInTheDocument();

    // Click Active — only incomplete tasks (t1, t2)
    fireEvent.click(screen.getByTestId('filter-active'));
    expect(screen.getByText('Email project update')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText('Call Mom about plans')).not.toBeInTheDocument();

    // Click Completed — only completed task (t3)
    fireEvent.click(screen.getByTestId('filter-completed'));
    expect(screen.queryByText('Email project update')).not.toBeInTheDocument();
    expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    expect(screen.getByText('Call Mom about plans')).toBeInTheDocument();

    // Click All — back to all 3
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByText('Email project update')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Call Mom about plans')).toBeInTheDocument();
  });

  it('displays contact name on assigned tasks', () => {
    renderWithProvider();
    expect(screen.getByTestId('contact-badge-t1')).toHaveTextContent('Sarah Chen');
    expect(screen.getByTestId('contact-badge-t3')).toHaveTextContent('Mom');
    // t2 has no contact — no badge
    expect(screen.queryByTestId('contact-badge-t2')).not.toBeInTheDocument();
  });
});
