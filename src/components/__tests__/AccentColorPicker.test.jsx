import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, appReducer } from '../../context/AppContext';
import AccentColorPicker, { COLOR_PRESETS } from '../AccentColorPicker';

const baseState = {
  contacts: [],
  tasks: [],
  notes: [],
  theme: 'light',
  accentColor: '#C9A84C',
  layout: 'cards',
  user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' },
  activeView: 'dashboard',
};

describe('SET_ACCENT reducer action', () => {
  it('updates accentColor in state', () => {
    const state = { ...baseState };
    const result = appReducer(state, { type: 'SET_ACCENT', payload: { color: '#9F5C5C' } });
    expect(result.accentColor).toBe('#9F5C5C');
  });
});

describe('AccentColorPicker component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--color-accent');
  });

  it('renders 6 color swatches', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <AccentColorPicker />
      </AppProvider>
    );
    const picker = screen.getByTestId('accent-color-picker');
    expect(picker).toBeInTheDocument();

    const swatches = COLOR_PRESETS.map((p) =>
      screen.getByTestId(`accent-swatch-${p.name.toLowerCase()}`)
    );
    expect(swatches).toHaveLength(6);
  });

  it('dispatches SET_ACCENT on click and updates CSS custom property', () => {
    render(
      <AppProvider initialStateOverride={baseState}>
        <AccentColorPicker />
      </AppProvider>
    );
    const roseSwatch = screen.getByTestId('accent-swatch-rose');
    fireEvent.click(roseSwatch);

    const accentValue = document.documentElement.style.getPropertyValue('--color-accent');
    expect(accentValue).toBe('#9F5C5C');
  });

  it('shows active indicator for current accent color', () => {
    render(
      <AppProvider initialStateOverride={{ ...baseState, accentColor: '#6B8F6B' }}>
        <AccentColorPicker />
      </AppProvider>
    );
    const sageSwatch = screen.getByTestId('accent-swatch-sage');
    // Active swatch should have a ring box-shadow
    expect(sageSwatch.style.boxShadow).toContain('0 0 0 2px');
  });

  it('uses dark mode hex values when theme is dark', () => {
    render(
      <AppProvider initialStateOverride={{ ...baseState, theme: 'dark', accentColor: '#D4B65A' }}>
        <AccentColorPicker />
      </AppProvider>
    );
    const goldSwatch = screen.getByTestId('accent-swatch-gold');
    expect(goldSwatch.style.backgroundColor).toBeTruthy();

    // Click rose in dark mode should dispatch the dark hex
    const roseSwatch = screen.getByTestId('accent-swatch-rose');
    fireEvent.click(roseSwatch);
    const accentValue = document.documentElement.style.getPropertyValue('--color-accent');
    expect(accentValue).toBe('#C48A8A');
  });
});
