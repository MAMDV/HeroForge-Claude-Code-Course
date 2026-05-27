import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

describe('StatCard', () => {
  it('renders label, value, and icon correctly', () => {
    render(<StatCard label="Contacts" count={42} icon="👥" />);
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
  });
});
