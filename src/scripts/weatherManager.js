// Gestion des données météo / Weather data management
class WeatherManager {
  constructor(uiManager) {
    this.uiManager = uiManager
    this.apiKey = CONFIG.API_KEY
    this.cache = {} // Cache pour les données météo
    this.searchHistory =
      JSON.parse(localStorage.getItem('weatherSearches')) || [] // Historique des recherches

    // Charger l'historique dans l'interface
    this.uiManager.loadSearchHistory()
  }

  /**
   * Récupère les données météo pour une ville donnée
   * Fetches weather data for a given city
   * @param {string} city - Le nom de la ville / The name of the city
   */
  async getWeatherData(city = CONFIG.DEFAULT_CITY) {
    // Validation de la ville
    if (!this.validateCity(city)) {
      this.uiManager.showError(translateUIText('invalidCity'))
      return
    }

    // Vérifier le cache
    const cachedData = this.getFromCache(city)
    if (cachedData) {
      this.uiManager.updateWeatherInfo(cachedData)
      this.uiManager.hideError()
      return
    }

    try {
      this.uiManager.showLoading()
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${
          this.apiKey
        }&query=${encodeURIComponent(city)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Données API reçues:', data)

      if (data.error) {
        throw new Error(data.error.info || translateUIText('error'))
      }

      // Stocker dans le cache
      this.addToCache(city, data)
      // Sauvegarder dans l'historique
      this.saveToHistory(city)
      this.uiManager.updateWeatherInfo(data)
      this.uiManager.hideError()

      // Mettre à jour l'historique dans l'interface
      this.uiManager.loadSearchHistory()
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error)
      let errorMessage = translateUIText('error')
      if (error.message.includes('404')) {
        errorMessage = translateUIText('cityNotFound')
      }
      this.uiManager.showError(errorMessage)
    } finally {
      this.uiManager.hideLoading()
    }
  }

  /**
   * Récupère les données météo pour la position actuelle de l'utilisateur
   * Fetches weather data for the user's current location
   */
  async getWeatherByLocation() {
    if (!navigator.geolocation) {
      console.error("La géolocalisation n'est pas supportée par ce navigateur.")
      this.uiManager.showError(translateUIText('geoNotSupported'))
      return
    }

    try {
      this.uiManager.showLoading()
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      })

      const lat = position.coords.latitude
      const lon = position.coords.longitude

      // On utilise une clé spéciale pour le cache de la géolocalisation
      const cacheKey = `geo-${lat.toFixed(2)}-${lon.toFixed(2)}`

      // Vérifier le cache pour cette position
      const cachedData = this.getFromCache(cacheKey)
      if (cachedData) {
        this.uiManager.updateWeatherInfo(cachedData)
        this.uiManager.hideError()
        this.uiManager.hideLoading()
        return
      }

      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${this.apiKey}&query=${lat},${lon}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Données API reçues:', data)

      if (data.error) {
        throw new Error(data.error.info || translateUIText('error'))
      }

      // Stocker dans le cache avec la clé spéciale
      this.addToCache(cacheKey, data)
      this.uiManager.updateWeatherInfo(data)
      this.uiManager.hideError()
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error)
      let errorMessage = translateUIText('error')
      if (error.message.includes('denied')) {
        errorMessage = translateUIText('geoDenied')
      } else if (error.message.includes('timeout')) {
        errorMessage = translateUIText('geoTimeout')
      } else if (error.message.includes('unavailable')) {
        errorMessage = translateUIText('geoUnavailable')
      }
      this.uiManager.showError(errorMessage)
    } finally {
      this.uiManager.hideLoading()
    }
  }

  /**
   * Valide le nom de la ville
   * Validates the city name
   * @param {string} city - Le nom de la ville / The name of the city
   * @returns {boolean} True si la ville est valide, false sinon
   */
  validateCity(city) {
    if (!city || city.trim() === '') {
      return false
    }
    // Vérifie que la ville ne contient que des lettres, espaces, tirets et apostrophes
    const cityRegex = /^[a-zA-ZÀ-ÿ\s-'',.]+$/
    return cityRegex.test(city)
  }

  /**
   * Récupère les données météo depuis le cache
   * Gets weather data from cache
   * @param {string} key - La clé du cache
   * @returns {object|null} Les données météo ou null si non trouvées
   */
  getFromCache(key) {
    if (!CONFIG.USE_CACHE) return null

    const cachedItem = this.cache[key]
    if (!cachedItem) return null

    // Vérifier si le cache est toujours valide (TTL)
    const now = new Date()
    if (now.getTime() - cachedItem.timestamp < CONFIG.CACHE_TTL * 60 * 1000) {
      return cachedItem.data
    }
    return null
  }

  /**
   * Ajoute des données météo au cache
   * Adds weather data to cache
   * @param {string} key - La clé du cache
   * @param {object} data - Les données météo
   */
  addToCache(key, data) {
    if (!CONFIG.USE_CACHE) return

    this.cache[key] = {
      data: data,
      timestamp: new Date().getTime(),
    }
  }

  /**
   * Sauvegarde une recherche dans l'historique
   * Saves a search to history
   * @param {string} city - La ville recherchée
   */
  saveToHistory(city) {
    // Éviter les doublons
    this.searchHistory = this.searchHistory.filter((item) => item !== city)
    this.searchHistory.unshift(city) // Ajouter au début
    if (this.searchHistory.length > 5) {
      this.searchHistory.pop() // Garder seulement 5 éléments
    }
    localStorage.setItem('weatherSearches', JSON.stringify(this.searchHistory))

    // Mettre à jour l'interface
    this.uiManager.loadSearchHistory()
  }

  /**
   * Charge une ville depuis l'historique
   * Loads a city from history
   * @param {string} city - La ville à charger
   */
  loadFromHistory(city) {
    this.getWeatherData(city)
  }

  /**
   * Efface une ville de l'historique
   * Removes a city from history
   * @param {string} city - La ville à effacer
   */
  removeFromHistory(city) {
    this.searchHistory = this.searchHistory.filter((item) => item !== city)
    localStorage.setItem('weatherSearches', JSON.stringify(this.searchHistory))
    this.uiManager.loadSearchHistory()
  }

  /**
   * Efface tout l'historique
   * Clears all history
   */
  clearHistory() {
    this.searchHistory = []
    localStorage.removeItem('weatherSearches')
    this.uiManager.loadSearchHistory()
  }
}
