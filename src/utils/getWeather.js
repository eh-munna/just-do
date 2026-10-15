const WMO_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  97: 'Heavy thunderstorm',
  99: 'Thunderstorm with heavy hail',
};

export const getWeather = async (city) => {
  const { latitude, longitude } = city;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,visibility,surface_pressure,uv_index`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const {
      temperature_2m,
      apparent_temperature,
      relative_humidity_2m,
      wind_speed_10m,
      wind_direction_10m,
      weather_code,
      visibility,
      surface_pressure,
      uv_index,
    } = data.current;
    return {
      city: city.name,
      country: city.country,
      temp: Math.round(temperature_2m),
      feelsLike: Math.round(apparent_temperature),
      humidity: relative_humidity_2m,
      windSpeed: wind_speed_10m,
      windDir: wind_direction_10m,
      visibility: (visibility / 1000).toFixed(1),
      pressure: surface_pressure,
      uvIndex: uv_index,
      condition: WMO_CODES[weather_code] ?? `Code ${weather_code}`,
      description: WMO_CODES[weather_code] ?? `Code ${weather_code}`,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data', { cause: error });
  }
};

