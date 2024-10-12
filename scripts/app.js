// Initialisation de l'application / Application initialization
document.addEventListener('DOMContentLoaded', function () {
  const weatherManager = new WeatherManager(new UIManager())

  // Éléments du DOM / DOM elements
  const cityInput = document.querySelector('.city-input')
  const getWeatherButton = document.querySelector('.get-weather-btn')

  // Événement pour obtenir les données météo / Event to fetch weather data
  getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value
    weatherManager.getWeatherData(city)
  })

  // Appel initial pour charger la météo par défaut / Initial call to load default weather
  weatherManager.getWeatherData()
})
