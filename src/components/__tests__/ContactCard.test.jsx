/**
 * Unit tests for ContactCard — Issue #109
 *
 * ADR-011: Reverse lookup pattern — ContactCard shows tasks where
 * task.contactId === contact.id, demonstrating the many-to-one relationship.
 * DDD Context: Contact Management ← Task Management (cross-context query).
 * SPARC Phase: Refinement (TDD Red-Green-Refactor per ADR-010).
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactCard from '../ContactCard';

const mockContact = {
  id: 'c1',
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  phone: '555-0101',
  category: 'work',
};

const mockTasks = [
  { id: 't1', title: 'Email project update', contactId: 'c1', completed: false, priority: 'high' },
  { id: 't2', title: 'Schedule meeting', contactId: 'c1', completed: true, priority: 'medium' },
];

describe('ContactCard — related tasks (Issue #109, ADR-011)', () => {
  it('shows list of tasks assigned to the contact', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} tasks={mockTasks} />);
    expect(screen.getByText('Email project update')).toBeInTheDocument();
    expect(screen.getByText('Schedule meeting')).toBeInTheDocument();
  });

  it('shows "No tasks assigned" when contact has no tasks', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} tasks={[]} />);
    expect(screen.getByText('No tasks assigned')).toBeInTheDocument();
  });

  it('shows "No tasks assigned" when tasks prop is omitted (defaults to empty)', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} />);
    expect(screen.getByText('No tasks assigned')).toBeInTheDocument();
  });

  it('displays completed tasks with strikethrough styling', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} tasks={mockTasks} />);
    const completedTask = screen.getByText('Schedule meeting');
    expect(completedTask.closest('li')).toHaveClass('line-through');
  });

  it('displays active tasks without strikethrough styling', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} tasks={mockTasks} />);
    const activeTask = screen.getByText('Email project update');
    expect(activeTask.closest('li')).not.toHaveClass('line-through');
  });

  it('renders the "Assigned Tasks" section heading', () => {
    render(<ContactCard contact={mockContact} onDelete={vi.fn()} tasks={mockTasks} />);
    expect(screen.getByText('Assigned Tasks')).toBeInTheDocument();
  });
});
