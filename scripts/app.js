// ===== POINT D'ENTRÉE / ENTRY POINT =====

// Attend que la page soit prête / Waits until the page is ready
document.addEventListener('DOMContentLoaded', () => {
  // Crée la couche UI / Creates the UI layer
  const ui = new UIManager()
  // Crée la couche de données météo / Creates the weather data layer
  const weather = new WeatherManager()

  // Initialise textes et thème / Initializes texts and theme
  ui.init()
  // Affiche l'historique sauvegardé / Renders saved history
  ui.renderHistory(weather.history, (city) => loadCity(city))

  // Lance la recherche au submit / Runs search on submit
  ui.elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    loadCity(ui.elements.cityInput.value)
  })

  // Lance la géolocalisation / Runs geolocation
  ui.elements.locationButton.addEventListener('click', () => {
    loadCurrentPosition()
  })

  // Bascule le thème / Toggles theme
  ui.elements.themeButton.addEventListener('click', () => {
    ui.toggleTheme()
  })

  // Change la langue / Changes language
  ui.elements.languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.language)
    })
  })

  // Vide l'historique / Clears history
  ui.elements.clearHistoryButton.addEventListener('click', () => {
    weather.clearHistory()
    ui.renderHistory(weather.history, (city) => loadCity(city))
  })

  // Rafraîchit les textes dynamiques après changement de langue / Refreshes dynamic text after language change
  onLanguageChange(() => {
    ui.refreshLanguage((city) => loadCity(city))
  })

  // Charge la ville par défaut / Loads the default city
  loadCity(CONFIG.defaultCity)

  // Charge une ville et met à jour l'interface / Loads a city and updates the interface
  async function loadCity(city) {
    try {
      ui.setLoading(true)
      ui.hideError()

      const data = await weather.getWeatherByCity(city)

      ui.elements.cityInput.value = data.locationLabel.split(',')[0]
      ui.renderWeather(data)
      ui.renderHistory(weather.history, (historyCity) => loadCity(historyCity))
    } catch (error) {
      ui.showError(translate(error.message || 'networkError'))
    } finally {
      ui.setLoading(false)
    }
  }

  // Charge la météo de la position actuelle / Loads weather for current position
  async function loadCurrentPosition() {
    if (!navigator.geolocation) {
      ui.showError(translate('geolocationUnavailable'))
      return
    }

    try {
      ui.setLoading(true)
      ui.hideError()

      const position = await getCurrentPosition()
      const data = await weather.getWeatherByCoordinates(
        position.coords.latitude,
        position.coords.longitude,
      )

      ui.renderWeather(data)
    } catch (error) {
      ui.showError(translateGeolocationError(error))
    } finally {
      ui.setLoading(false)
    }
  }

  // Promesse autour de navigator.geolocation / Promise wrapper around navigator.geolocation
  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      })
    })
  }

  // Traduit les erreurs de géolocalisation / Translates geolocation errors
  function translateGeolocationError(error) {
    if (error.code === 1) return translate('geolocationDenied')
    if (error.code === 3) return translate('geolocationTimeout')
    if (error.code === 2) return translate('geolocationGeneric')
    return translate('networkError')
  }
})
