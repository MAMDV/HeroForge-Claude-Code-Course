import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  it('renders the app description heading', () => {
    render(<AboutPage />);
    expect(
      screen.getByText('About LifeOps Command Center')
    ).toBeInTheDocument();
  });

  it('renders the app description text', () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/personal productivity dashboard/i)
    ).toBeInTheDocument();
  });

  it('renders the changelog section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('renders changelog session entries', () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/Session 3: Real Projects, Real Git/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Session 7: Cowork and Automation/)
    ).toBeInTheDocument();
  });
});
