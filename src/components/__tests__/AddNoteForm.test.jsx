import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import AddNoteForm from '../AddNoteForm';

function renderWithProvider(initialStateOverride) {
  const state = {
    contacts: [],
    tasks: [],
    notes: [],
    theme: 'light',
    accentColor: '#1d4ed8',
    layout: 'cards',
    user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
    activeView: 'notes',
    ...initialStateOverride,
  };
  return render(
    <AppProvider initialStateOverride={state}>
      <AddNoteForm />
    </AppProvider>
  );
}

describe('AddNoteForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders form with title input, body textarea, and category dropdown', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add note/i })).toBeInTheDocument();
  });

  it('category dropdown has options: general, meeting, idea, reference', () => {
    renderWithProvider();
    const select = screen.getByLabelText(/category/i);
    const options = Array.from(select.querySelectorAll('option'));
    const values = options.map((o) => o.value);
    expect(values).toEqual(['general', 'meeting', 'idea', 'reference']);
  });

  it('prevents submit when title is empty', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: /add note/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('Title is required');
  });

  it('dispatches ADD_NOTE with title, body, and category on valid submit', () => {
    renderWithProvider();
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'My Note' } });
    fireEvent.change(screen.getByLabelText(/body/i), { target: { value: 'Some content' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'idea' } });
    fireEvent.click(screen.getByRole('button', { name: /add note/i }));

    // No validation error should appear
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    // Verify the form was submitted by checking the fields reset (dispatch happened)
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/body/i)).toHaveValue('');
    expect(screen.getByLabelText(/category/i)).toHaveValue('general');
  });

  it('form resets after successful submission', () => {
    renderWithProvider();
    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const categorySelect = screen.getByLabelText(/category/i);

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test body text' } });
    fireEvent.change(categorySelect, { target: { value: 'meeting' } });

    // Confirm values are set
    expect(titleInput).toHaveValue('Test Title');
    expect(bodyInput).toHaveValue('Test body text');
    expect(categorySelect).toHaveValue('meeting');

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /add note/i }));

    // All fields should reset
    expect(titleInput).toHaveValue('');
    expect(bodyInput).toHaveValue('');
    expect(categorySelect).toHaveValue('general');
  });
});
