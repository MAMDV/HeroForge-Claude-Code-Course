import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import PersonalizationPanel from '../PersonalizationPanel';

const baseState = {
  contacts: [],
  tasks: [],
  notes: [],
  theme: 'light',
  accentColor: '#2563eb',
  layout: 'cards',
  user: { name: 'TestUser', bio: 'A test bio', city: 'Paris', avatarEmoji: '\u{1F600}' },
  activeView: 'settings',
};

describe('PersonalizationPanel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders layout picker with Cards and List options', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );
    expect(screen.getByTestId('layout-cards')).toBeInTheDocument();
    expect(screen.getByTestId('layout-list')).toBeInTheDocument();
  });

  it('renders profile fields with current values', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );
    expect(screen.getByTestId('profile-name')).toHaveValue('TestUser');
    expect(screen.getByTestId('profile-bio')).toHaveValue('A test bio');
    expect(screen.getByTestId('profile-city')).toHaveValue('Paris');
    expect(screen.getByTestId('profile-avatar')).toHaveValue('\u{1F600}');
  });

  it('renders accent color picker', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );
    expect(screen.getByTestId('accent-color-picker')).toBeInTheDocument();
  });

  it('renders reset to defaults button', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );
    expect(screen.getByTestId('reset-defaults')).toBeInTheDocument();
  });

  it('resets profile fields when reset button is clicked', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );

    fireEvent.click(screen.getByTestId('reset-defaults'));

    expect(screen.getByTestId('profile-name')).toHaveValue('User');
    expect(screen.getByTestId('profile-bio')).toHaveValue('');
    expect(screen.getByTestId('profile-city')).toHaveValue('');
  });

  it('dispatches SET_LAYOUT when layout button is clicked', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <PersonalizationPanel />
      </AppProvider>
    );

    const listBtn = screen.getByTestId('layout-list');
    fireEvent.click(listBtn);
    // After click, list button should have active styling (aria-pressed)
    expect(listBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
