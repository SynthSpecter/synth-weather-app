// ===== DONNÉES MÉTÉO / WEATHER DATA =====

class WeatherManager {
  // Prépare cache et historique / Prepares cache and history
  constructor() {
    this.cache = new Map()
    this.history = this.readHistory()
  }

  // Charge la météo d'une ville / Loads weather for a city
  async getWeatherByCity(city) {
    const normalizedCity = city.trim()

    if (!this.validateCity(normalizedCity)) {
      throw new Error('invalidCity')
    }

    const cacheKey = `city:${currentLanguage}:${normalizedCity.toLowerCase()}`
    const cachedWeather = this.getFromCache(cacheKey)
    if (cachedWeather) return cachedWeather

    const location = await this.findLocation(normalizedCity)
    const weather = await this.getWeatherForLocation(location)

    this.addToCache(cacheKey, weather)
    this.saveToHistory(location.name)

    return weather
  }

  // Charge la météo depuis les coordonnées / Loads weather from coordinates
  async getWeatherByCoordinates(latitude, longitude) {
    const location = {
      name: translate('currentPosition'),
      country: '',
      latitude,
      longitude,
    }
    const cacheKey = `geo:${latitude.toFixed(3)}:${longitude.toFixed(3)}`
    const cachedWeather = this.getFromCache(cacheKey)
    if (cachedWeather) return cachedWeather

    const weather = await this.getWeatherForLocation(location)

    this.addToCache(cacheKey, weather)
    return weather
  }

  // Recherche une ville via Open-Meteo / Searches a city through Open-Meteo
  async findLocation(city) {
    const url = new URL(CONFIG.geocodingUrl)

    url.searchParams.set('name', city)
    url.searchParams.set('count', '5')
    url.searchParams.set('language', currentLanguage)
    url.searchParams.set('format', 'json')

    const response = await fetch(url)
    if (!response.ok) throw new Error('networkError')

    const data = await response.json()
    const location = this.chooseLocation(data.results || [], city)

    if (!location) throw new Error('cityNotFound')

    return location
  }

  // Choisit le résultat de géocodage le plus utile / Chooses the most useful geocoding result
  chooseLocation(results, city) {
    if (results.length === 0) return null

    const exactMatch = results.find((result) => {
      return result.name.toLowerCase() === city.toLowerCase()
    })

    const selected = exactMatch || results[0]

    return {
      name: selected.name,
      country: selected.country || '',
      admin1: selected.admin1 || '',
      latitude: selected.latitude,
      longitude: selected.longitude,
    }
  }

  // Récupère la météo pour un lieu / Fetches weather for one location
  async getWeatherForLocation(location) {
    const url = new URL(CONFIG.forecastUrl)

    url.searchParams.set('latitude', location.latitude)
    url.searchParams.set('longitude', location.longitude)
    url.searchParams.set('current', [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(','))
    url.searchParams.set('daily', [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
    ].join(','))
    url.searchParams.set('timezone', 'auto')
    url.searchParams.set('forecast_days', String(CONFIG.forecastDays))

    const response = await fetch(url)
    if (!response.ok) throw new Error('networkError')

    const data = await response.json()
    return this.normalizeWeather(location, data)
  }

  // Normalise la réponse API pour l'interface / Normalizes API response for the interface
  normalizeWeather(location, data) {
    const currentInfo = getWeatherCodeInfo(data.current.weather_code)

    return {
      locationLabel: this.formatLocation(location),
      current: {
        time: data.current.time,
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        cloudCover: data.current.cloud_cover,
        pressure: data.current.pressure_msl,
        windSpeed: data.current.wind_speed_10m,
        windDirectionLabel: getWindDirectionLabel(data.current.wind_direction_10m),
        labelKey: currentInfo.labelKey,
        icon: currentInfo.icon,
        mood: currentInfo.mood,
      },
      forecast: data.daily.time.map((date, index) => {
        const info = getWeatherCodeInfo(data.daily.weather_code[index])

        return {
          date,
          labelKey: info.labelKey,
          icon: info.icon,
          mood: info.mood,
          min: data.daily.temperature_2m_min[index],
          max: data.daily.temperature_2m_max[index],
          precipitation: data.daily.precipitation_sum[index],
        }
      }),
    }
  }

  // Formate le nom du lieu / Formats location name
  formatLocation(location) {
    return [location.name, location.admin1, location.country].filter(Boolean).join(', ')
  }

  // Valide une recherche ville / Validates a city search
  validateCity(city) {
    return /^[a-zA-ZÀ-ÿ\s'.-]{2,80}$/.test(city)
  }

  // Lit le cache mémoire / Reads memory cache
  getFromCache(key) {
    const cachedItem = this.cache.get(key)
    if (!cachedItem) return null

    const ageInMinutes = (Date.now() - cachedItem.timestamp) / 60000
    return ageInMinutes <= CONFIG.cacheMinutes ? cachedItem.data : null
  }

  // Ajoute au cache mémoire / Adds to memory cache
  addToCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  // Lit l'historique local / Reads local history
  readHistory() {
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.history))
      return Array.isArray(history) ? history : []
    } catch {
      return []
    }
  }

  // Sauvegarde une ville dans l'historique / Saves a city into history
  saveToHistory(city) {
    this.history = this.history.filter((item) => item !== city)
    this.history.unshift(city)
    this.history = this.history.slice(0, CONFIG.maxHistoryItems)
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(this.history))
  }

  // Vide l'historique / Clears history
  clearHistory() {
    this.history = []
    localStorage.removeItem(STORAGE_KEYS.history)
  }
}
