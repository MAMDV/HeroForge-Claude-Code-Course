import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '../NoteCard';

const testNote = {
  id: 'n1',
  title: 'Sprint Planning Notes',
  body: 'Discussed backlog priorities for Q2. Focus on API performance and onboarding flow improvements.',
  category: 'meeting',
  createdAt: '2026-01-15T10:00:00.000Z',
  updatedAt: '2026-01-15T10:30:00.000Z',
};

describe('NoteCard', () => {
  let onUpdate;
  let onDelete;

  beforeEach(() => {
    onUpdate = vi.fn();
    onDelete = vi.fn();
  });

  it('renders note title, body, category, and updatedAt in view mode', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    expect(screen.getByText('Sprint Planning Notes')).toBeInTheDocument();
    expect(screen.getByText('meeting')).toBeInTheDocument();
    expect(screen.getByText(/Discussed backlog/)).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2026')).toBeInTheDocument();
  });

  it('has Edit button in view mode', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    expect(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ })).toBeInTheDocument();
  });

  it('toggles to edit mode when Edit is clicked', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));
    expect(screen.getByLabelText(/Edit title for/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edit body for/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
  });

  it('populates edit fields with current note values', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));
    expect(screen.getByLabelText(/Edit title for/).value).toBe('Sprint Planning Notes');
    expect(screen.getByLabelText(/Edit body for/).value).toBe(testNote.body);
  });

  it('Save dispatches onUpdate with changes', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));

    fireEvent.change(screen.getByLabelText(/Edit title for/), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText(/Edit body for/), { target: { value: 'New body content' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(onUpdate).toHaveBeenCalledWith('n1', { title: 'Updated Title', body: 'New body content' });
  });

  it('returns to view mode after Save', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    expect(screen.queryByLabelText(/Edit title for/)).not.toBeInTheDocument();
    expect(screen.getByText('Sprint Planning Notes')).toBeInTheDocument();
  });

  it('Cancel reverts to display mode without calling onUpdate', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));

    fireEvent.change(screen.getByLabelText(/Edit title for/), { target: { value: 'Changed title' } });
    fireEvent.click(screen.getByRole('button', { name: /Cancel/ }));

    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.queryByLabelText(/Edit title for/)).not.toBeInTheDocument();
    expect(screen.getByText('Sprint Planning Notes')).toBeInTheDocument();
  });

  it('does not save when title is empty', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit Sprint Planning Notes/ }));

    fireEvent.change(screen.getByLabelText(/Edit title for/), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('Delete button calls onDelete', () => {
    render(<NoteCard note={testNote} onUpdate={onUpdate} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /Delete Sprint Planning Notes/ }));
    expect(onDelete).toHaveBeenCalledWith('n1');
  });
});
