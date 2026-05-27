// Infrastructure service: OpenWeatherMap API integration
// See ADR-008 (runtime fetch, Anti-Corruption Layer) and DDD context: App → External Integration → Weather

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Maps HTTP status codes to user-friendly error messages.
 */
function mapHttpError(status) {
  switch (status) {
    case 401:
      return 'API key invalid — check your .env file';
    case 404:
      return 'City not found';
    case 429:
      return 'Rate limited — try again in a few minutes';
    default:
      if (status >= 500) return 'Service temporarily unavailable';
      return `Unexpected error (${status})`;
  }
}

/**
 * Anti-Corruption Layer: transforms OpenWeatherMap response into app's internal shape.
 *
 * External shape (OpenWeatherMap):
 *   { main: { temp, humidity }, weather: [{ description, icon }], wind: { speed }, name, sys: { country } }
 *
 * Internal shape (LifeOps):
 *   { temp, description, icon, humidity, windSpeed, city, country }
 */
function transformToAppShape(data) {
  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    city: data.name,
    country: data.sys.country,
  };
}

/**
 * Builds the OpenWeatherMap API URL for a given city.
 */
function buildUrl(city, apiKey) {
  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'metric',
  });
  return `${BASE_URL}?${params.toString()}`;
}

/**
 * Fetches weather data for a city from OpenWeatherMap.
 *
 * Follows the service layer pattern from ADR-008:
 *   1. Build URL with parameters
 *   2. Call fetch() with error handling
 *   3. Transform external response → app's internal shape (Anti-Corruption Layer)
 *   4. Return structured result or error object
 *
 * @param {string} city - City name to fetch weather for
 * @returns {Promise<{ temp: number, description: string, icon: string, humidity: number, windSpeed: number, city: string, country: string } | { error: string }>}
 */
export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    return { error: 'Add API key to .env' };
  }

  if (!city || typeof city !== 'string' || !city.trim()) {
    return { error: 'Please enter a city name' };
  }

  try {
    const response = await fetch(buildUrl(city.trim(), apiKey));

    if (!response.ok) {
      return { error: mapHttpError(response.status) };
    }

    const data = await response.json();
    return transformToAppShape(data);
  } catch (error) {
    if (error.name === 'TypeError' || error.message?.includes('fetch')) {
      return { error: 'No internet connection — check your network' };
    }
    return { error: 'No internet connection — check your network' };
  }
}
