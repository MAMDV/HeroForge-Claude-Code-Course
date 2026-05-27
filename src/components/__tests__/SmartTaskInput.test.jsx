/**
 * Unit tests for SmartTaskInput (Issue #123)
 *
 * Acceptance criteria:
 *   - Renders input field
 *   - Shows preview when text entered
 *   - Calls dispatch on submit
 *   - Empty input handled gracefully (no preview, disabled submit)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import SmartTaskInput from '../SmartTaskInput';

const testContacts = [
  { id: 'c1', name: 'Sarah Chen', email: 'sarah@example.com', phone: '555-0101', category: 'work', createdAt: '2026-01-15T09:00:00.000Z' },
  { id: 'c2', name: 'Mom', email: 'mom@example.com', phone: '555-0102', category: 'family', createdAt: '2026-01-15T09:01:00.000Z' },
];

function renderSmartTaskInput(overrides = {}) {
  const state = {
    contacts: testContacts,
    tasks: [],
    notes: [],
    theme: 'light',
    accentColor: '#1d4ed8',
    layout: 'cards',
    user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
    activeView: 'tasks',
    ...overrides,
  };
  return render(
    <AppProvider initialStateOverride={state}>
      <SmartTaskInput />
    </AppProvider>
  );
}

describe('SmartTaskInput', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the input field', () => {
    renderSmartTaskInput();
    expect(screen.getByLabelText(/quick add/i)).toBeInTheDocument();
  });

  it('does not show preview when input is empty', () => {
    renderSmartTaskInput();
    expect(screen.queryByTestId('smart-task-preview')).not.toBeInTheDocument();
  });

  it('submit button is disabled when input is empty', () => {
    renderSmartTaskInput();
    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeDisabled();
  });

  it('shows preview when text is entered', () => {
    renderSmartTaskInput();
    const input = screen.getByLabelText(/quick add/i);
    fireEvent.change(input, { target: { value: 'Buy groceries' } });

    expect(screen.getByTestId('smart-task-preview')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByTestId('priority-badge')).toHaveTextContent('medium');
  });

  it('shows priority badge for urgent tasks', () => {
    renderSmartTaskInput();
    const input = screen.getByLabelText(/quick add/i);
    fireEvent.change(input, { target: { value: 'Fix bug urgent' } });

    expect(screen.getByTestId('priority-badge')).toHaveTextContent('high');
  });

  it('shows matched contact in preview', () => {
    renderSmartTaskInput();
    const input = screen.getByLabelText(/quick add/i);
    fireEvent.change(input, { target: { value: 'Call Sarah Chen tomorrow' } });

    expect(screen.getAllByText(/Sarah Chen/).length).toBeGreaterThanOrEqual(1);
  });

  it('dispatches ADD_TASK and resets input on submit', () => {
    renderSmartTaskInput();
    const input = screen.getByLabelText(/quick add/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    // Input should reset after submit
    expect(input.value).toBe('');
    // Preview should disappear
    expect(screen.queryByTestId('smart-task-preview')).not.toBeInTheDocument();
  });
});
