import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchWeather } from '../services/weatherService';
import ErrorBoundary from './ErrorBoundary';

/**
 * WeatherDisplay -- luxury minimal weather data display.
 */
function WeatherDisplay({ weather }) {
  return (
    <div data-testid="weather-display" className="mt-4 flex items-center gap-4">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="size-14"
      />
      <div>
        <p className="mc-data text-2xl">
          {weather.temp}&deg;C
        </p>
        <p className="mt-0.5 text-sm capitalize" style={{ color: 'var(--lm-text-secondary)' }}>
          {weather.description}
        </p>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          {weather.city}, {weather.country}
        </p>
      </div>
      <div className="ml-auto text-right text-xs" style={{ color: 'var(--lm-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
        <p>Humidity {weather.humidity}%</p>
        <p>Wind {weather.windSpeed} m/s</p>
      </div>
    </div>
  );
}

/**
 * WeatherWidgetInner -- luxury minimal weather search.
 */
function WeatherWidgetInner() {
  const { state } = useAppContext();
  const defaultCity = state.user.city || 'London';

  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    const result = await fetchWeather(city.trim());

    if (result.error) {
      setError(result.error);
    } else {
      setWeather(result);
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div
      data-testid="weather-widget"
      className="mc-card h-full p-5"
    >
      <h2 className="mc-heading mb-4 text-lg">Weather</h2>

      <div className="flex gap-2">
        <input
          type="text"
          data-testid="city-search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city"
          aria-label="City name for weather search"
          className="lm-input flex-1"
        />
        <button
          data-testid="city-search-button"
          onClick={handleSearch}
          disabled={loading}
          aria-label="Search weather"
          className="lm-btn lm-btn-accent shrink-0 disabled:opacity-50"
        >
          Search
        </button>
      </div>

      {loading && (
        <p data-testid="weather-loading" role="status" className="mt-4 text-sm" style={{ color: 'var(--lm-text-tertiary)' }}>
          Loading...
        </p>
      )}

      {error && (
        <p data-testid="weather-error" role="alert" className="mt-4 text-sm" style={{ color: 'var(--lm-danger)' }}>
          {error}
        </p>
      )}

      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

function WeatherWidget() {
  return (
    <ErrorBoundary>
      <WeatherWidgetInner />
    </ErrorBoundary>
  );
}

export default WeatherWidget;
