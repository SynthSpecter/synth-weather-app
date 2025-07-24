// Initialisation de l'application / Application initialization
document.addEventListener('DOMContentLoaded', function () {
  // Initialiser les composants
  const uiManager = new UIManager()
  const weatherManager = new WeatherManager(uiManager)

  // Éléments du DOM / DOM elements
  const cityInput = document.querySelector('.city-input')
  const getWeatherButton = document.querySelector('.get-weather-btn')
  const locationBtn = document.querySelector('.location-btn')
  const languageBtn = document.querySelector('.language-btn')

  // Événements principaux / Main events
  if (getWeatherButton && cityInput) {
    getWeatherButton.addEventListener('click', () => {
      const city = cityInput.value
      weatherManager.getWeatherData(city)
    })
  }

  // Événement pour la touche Entrée dans le champ de saisie
  if (cityInput) {
    cityInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const city = cityInput.value
        weatherManager.getWeatherData(city)
      }
    })

    // Ajouter un événement pour le debounce sur la saisie
    cityInput.addEventListener(
      'input',
      debounce(() => {
        const city = cityInput.value
        if (weatherManager.validateCity(city) && city.length > 2) {
          // Recherche automatique après 3 caractères
          weatherManager.getWeatherData(city)
        }
      }, 1000)
    )
  }

  // Événement pour le bouton de géolocalisation
  if (locationBtn) {
    locationBtn.addEventListener('click', () => {
      weatherManager.getWeatherByLocation()
    })
  }

  // Événement pour le bouton de langue
  if (languageBtn) {
    languageBtn.addEventListener('click', () => {
      const newLang = currentLanguage === 'fr' ? 'en' : 'fr'
      setLanguage(newLang)
      uiManager.updateUITexts()

      // Rafraîchir les données avec les nouvelles traductions
      const city = cityInput ? cityInput.value : CONFIG.DEFAULT_CITY
      weatherManager.getWeatherData(city)
    })
  }

  // Charger la météo par défaut au démarrage
  weatherManager.getWeatherData()

  // Fonction de debounce pour la recherche en temps réel
  function debounce(func, delay) {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }

  // Exposer les instances pour le débogage (dans une vraie appli, utiliser un pattern plus propre)
  window.weatherManager = weatherManager
  window.uiManager = uiManager

  // Ajouter une méthode pour gérer les clics sur l'historique
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('history-item')) {
      const city = e.target.textContent.replace('×', '').trim()
      cityInput.value = city
      weatherManager.getWeatherData(city)
    } else if (e.target.classList.contains('clear-history-btn')) {
      weatherManager.clearHistory()
    }
  })
})
