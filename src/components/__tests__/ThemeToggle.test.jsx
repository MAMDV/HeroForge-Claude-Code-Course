import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, appReducer } from '../../context/AppContext';
import App from '../../App';

const baseState = {
  contacts: [],
  tasks: [],
  notes: [],
  theme: 'light',
  accentColor: '#2563eb',
  layout: 'cards',
  user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
  activeView: 'dashboard',
};

describe('TOGGLE_THEME reducer action', () => {
  it('switches theme from light to dark', () => {
    const state = { ...baseState, theme: 'light' };
    const result = appReducer(state, { type: 'TOGGLE_THEME' });
    expect(result.theme).toBe('dark');
  });

  it('switches theme from dark to light', () => {
    const state = { ...baseState, theme: 'dark' };
    const result = appReducer(state, { type: 'TOGGLE_THEME' });
    expect(result.theme).toBe('light');
  });
});

describe('ThemeToggle button', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders a theme toggle button', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <App />
      </AppProvider>
    );
    const toggle = screen.getByTestId('theme-toggle');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveTextContent('Dark');
  });

  it('dispatches TOGGLE_THEME on click', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <App />
      </AppProvider>
    );
    const toggle = screen.getByTestId('theme-toggle');
    fireEvent.click(toggle);
    // After clicking, the button label should switch to 'Light'
    expect(toggle).toHaveTextContent('Light');
  });

  it('adds dark class to document.documentElement when theme is dark', () => {
    render(
      <AppProvider initialStateOverride={{ ...baseState, theme: 'dark' }}>
        <App />
      </AppProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document.documentElement when theme is light', () => {
    document.documentElement.classList.add('dark');
    render(
      <AppProvider initialStateOverride={{ ...baseState, theme: 'light' }}>
        <App />
      </AppProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
