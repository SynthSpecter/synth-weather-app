// ===== CODES MÉTÉO / WEATHER CODES =====

// Table WMO utilisée par Open-Meteo / WMO table used by Open-Meteo
const WEATHER_CODE_MAP = {
  0: { labelKey: 'clear', icon: '☀', mood: 'clear' },
  1: { labelKey: 'mainlyClear', icon: '🌤', mood: 'clear' },
  2: { labelKey: 'partlyCloudy', icon: '⛅', mood: 'cloudy' },
  3: { labelKey: 'overcast', icon: '☁', mood: 'cloudy' },
  45: { labelKey: 'fog', icon: '≋', mood: 'cloudy' },
  48: { labelKey: 'fog', icon: '≋', mood: 'cloudy' },
  51: { labelKey: 'drizzle', icon: '☂', mood: 'rain' },
  53: { labelKey: 'drizzle', icon: '☂', mood: 'rain' },
  55: { labelKey: 'drizzle', icon: '☂', mood: 'rain' },
  56: { labelKey: 'freezingDrizzle', icon: '❄', mood: 'snow' },
  57: { labelKey: 'freezingDrizzle', icon: '❄', mood: 'snow' },
  61: { labelKey: 'rain', icon: '☔', mood: 'rain' },
  63: { labelKey: 'rain', icon: '☔', mood: 'rain' },
  65: { labelKey: 'rain', icon: '☔', mood: 'rain' },
  66: { labelKey: 'freezingRain', icon: '❄', mood: 'snow' },
  67: { labelKey: 'freezingRain', icon: '❄', mood: 'snow' },
  71: { labelKey: 'snow', icon: '✦', mood: 'snow' },
  73: { labelKey: 'snow', icon: '✦', mood: 'snow' },
  75: { labelKey: 'snow', icon: '✦', mood: 'snow' },
  77: { labelKey: 'snowGrains', icon: '✧', mood: 'snow' },
  80: { labelKey: 'rainShowers', icon: '☔', mood: 'rain' },
  81: { labelKey: 'rainShowers', icon: '☔', mood: 'rain' },
  82: { labelKey: 'rainShowers', icon: '☔', mood: 'rain' },
  85: { labelKey: 'snowShowers', icon: '✦', mood: 'snow' },
  86: { labelKey: 'snowShowers', icon: '✦', mood: 'snow' },
  95: { labelKey: 'thunderstorm', icon: '⚡', mood: 'storm' },
  96: { labelKey: 'thunderstorm', icon: '⚡', mood: 'storm' },
  99: { labelKey: 'thunderstorm', icon: '⚡', mood: 'storm' },
}

// Valeur de secours / Fallback value
const DEFAULT_WEATHER_CODE = { labelKey: 'unknown', icon: '○', mood: 'cloudy' }

// Retourne les infos visuelles d'un code météo / Returns visual info for a weather code
function getWeatherCodeInfo(code) {
  return WEATHER_CODE_MAP[code] || DEFAULT_WEATHER_CODE
}

// Convertit les degrés du vent en direction / Converts wind degrees into direction
function getWindDirectionLabel(degrees) {
  const directionKeys = [
    'north',
    'northEast',
    'east',
    'southEast',
    'south',
    'southWest',
    'west',
    'northWest',
  ]
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const index = Math.round(normalizedDegrees / 45) % directionKeys.length

  return translate(directionKeys[index])
}
