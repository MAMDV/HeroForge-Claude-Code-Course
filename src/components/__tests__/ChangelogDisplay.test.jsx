import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChangelogDisplay from '../ChangelogDisplay';

describe('ChangelogDisplay', () => {
  it('renders the Changelog heading', () => {
    render(<ChangelogDisplay />);
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('renders all five session entries', () => {
    render(<ChangelogDisplay />);
    expect(screen.getByText(/Session 3:/)).toBeInTheDocument();
    expect(screen.getByText(/Session 4:/)).toBeInTheDocument();
    expect(screen.getByText(/Session 5:/)).toBeInTheDocument();
    expect(screen.getByText(/Session 6:/)).toBeInTheDocument();
    expect(screen.getByText(/Session 7:/)).toBeInTheDocument();
  });

  it('renders session titles', () => {
    render(<ChangelogDisplay />);
    expect(screen.getByText(/Real Projects, Real Git/)).toBeInTheDocument();
    expect(
      screen.getByText(/Multi-File Apps and CLAUDE\.md/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Connecting to the Outside World/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cloud Tasks and Mobile Control/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Cowork and Automation/)).toBeInTheDocument();
  });

  it('renders feature items for a session', () => {
    render(<ChangelogDisplay />);
    expect(screen.getByText('Contact management')).toBeInTheDocument();
    expect(screen.getByText('Theme toggle')).toBeInTheDocument();
    expect(screen.getByText('Weather widget')).toBeInTheDocument();
    expect(screen.getByText('Unit test suite')).toBeInTheDocument();
    expect(screen.getByText('About page')).toBeInTheDocument();
  });
});
