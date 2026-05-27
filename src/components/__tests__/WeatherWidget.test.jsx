import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import WeatherWidget from '../WeatherWidget';

// Mock the weatherService module
vi.mock('../../services/weatherService', () => ({
  fetchWeather: vi.fn(),
}));

import { fetchWeather } from '../../services/weatherService';

const baseState = {
  contacts: [],
  tasks: [],
  notes: [],
  theme: 'light',
  accentColor: '#2563eb',
  layout: 'cards',
  user: { name: 'User', bio: '', city: 'Paris', avatarEmoji: '\u{1F464}' },
  activeView: 'dashboard',
};

function renderWidget(stateOverride = {}) {
  return render(
    <AppProvider initialStateOverride={{ ...baseState, ...stateOverride }}>
      <WeatherWidget />
    </AppProvider>
  );
}

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders city search input with default city from state.user.city', () => {
    renderWidget();
    const input = screen.getByTestId('city-search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Paris');
  });

  it('defaults to London when state.user.city is empty', () => {
    renderWidget({ user: { name: 'User', bio: '', city: '', avatarEmoji: '\u{1F464}' } });
    const input = screen.getByTestId('city-search-input');
    expect(input).toHaveValue('London');
  });

  it('shows loading state when searching', async () => {
    // Make fetchWeather hang until we resolve it
    let resolvePromise;
    fetchWeather.mockImplementation(() => new Promise((resolve) => { resolvePromise = resolve; }));

    renderWidget();
    fireEvent.click(screen.getByTestId('city-search-button'));

    expect(screen.getByTestId('weather-loading')).toBeInTheDocument();
    expect(screen.getByTestId('weather-loading')).toHaveTextContent('Loading...');

    // Clean up: resolve the pending promise
    resolvePromise({ error: 'cancelled' });
    await waitFor(() => expect(screen.queryByTestId('weather-loading')).not.toBeInTheDocument());
  });

  it('shows weather data on successful fetch', async () => {
    fetchWeather.mockResolvedValue({
      temp: 22,
      description: 'clear sky',
      icon: '01d',
      humidity: 45,
      windSpeed: 3.5,
      city: 'Paris',
      country: 'FR',
    });

    renderWidget();
    fireEvent.click(screen.getByTestId('city-search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('weather-display')).toBeInTheDocument();
    });

    expect(screen.getByText(/22/)).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('Paris, FR')).toBeInTheDocument();
    expect(screen.getByText('Humidity 45%')).toBeInTheDocument();
    expect(screen.getByText('Wind 3.5 m/s')).toBeInTheDocument();
  });

  it('shows error message on failed fetch', async () => {
    fetchWeather.mockResolvedValue({ error: 'City not found' });

    renderWidget();
    fireEvent.click(screen.getByTestId('city-search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('weather-error')).toBeInTheDocument();
    });

    expect(screen.getByTestId('weather-error')).toHaveTextContent('City not found');
  });

  it('shows API key missing message', async () => {
    fetchWeather.mockResolvedValue({ error: 'Add API key to .env' });

    renderWidget();
    fireEvent.click(screen.getByTestId('city-search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('weather-error')).toBeInTheDocument();
    });

    expect(screen.getByTestId('weather-error')).toHaveTextContent('Add API key to .env');
  });

  it('renders search button', () => {
    renderWidget();
    expect(screen.getByTestId('city-search-button')).toBeInTheDocument();
    expect(screen.getByTestId('city-search-button')).toHaveTextContent('Search');
  });
});
