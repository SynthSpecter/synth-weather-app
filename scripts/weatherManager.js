// Gestion des données météo / Weather data management
class WeatherManager {
  constructor(uiManager) {
    this.uiManager = uiManager
    this.apiKey = CONFIG.API_KEY
  }

  /**
   * Récupère les données météo pour une ville donnée
   * Fetches weather data for a given city
   * @param {string} city - Le nom de la ville / The name of the city
   */
  async getWeatherData(city = CONFIG.DEFAULT_CITY) {
    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${this.apiKey}&query=${city}`
      )
      const data = await response.json()
      console.log('Données API reçues:', data) // Pour le débogage / For debugging

      if (data.error) {
        throw new Error(data.error.info)
      }

      this.uiManager.updateWeatherInfo(data)
      this.uiManager.hideError()
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error)
      this.uiManager.showError()
    }
  }
}
