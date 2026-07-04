// ===== INTERFACE UTILISATEUR / USER INTERFACE =====

class UIManager {
  // Récupère les éléments utilisés par l'app / Gets elements used by the app
  constructor() {
    this.elements = {
      cityInput: document.getElementById('cityInput'),
      searchForm: document.getElementById('searchForm'),
      locationButton: document.getElementById('locationButton'),
      themeButton: document.getElementById('themeButton'),
      themeIcon: document.getElementById('themeIcon'),
      themeLabel: document.getElementById('themeLabel'),
      languageButtons: document.querySelectorAll('[data-language]'),
      errorMessage: document.getElementById('errorMessage'),
      loadingOverlay: document.getElementById('loadingOverlay'),
      locationLine: document.getElementById('locationLine'),
      temperatureLine: document.getElementById('temperatureLine'),
      conditionLine: document.getElementById('conditionLine'),
      updatedLine: document.getElementById('updatedLine'),
      weatherSymbol: document.getElementById('weatherSymbol'),
      feelsLikeValue: document.getElementById('feelsLikeValue'),
      windValue: document.getElementById('windValue'),
      humidityValue: document.getElementById('humidityValue'),
      pressureValue: document.getElementById('pressureValue'),
      cloudsValue: document.getElementById('cloudsValue'),
      precipitationValue: document.getElementById('precipitationValue'),
      forecastList: document.getElementById('forecastList'),
      historyList: document.getElementById('historyList'),
      clearHistoryButton: document.getElementById('clearHistoryButton'),
    }
    this.lastWeather = null
    this.lastHistory = []
  }

  // Initialise textes et thème / Initializes texts and theme
  init() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'synth'

    document.documentElement.setAttribute('data-theme', savedTheme)
    applyTranslations()
    this.updateThemeButton(savedTheme)
  }

  // Affiche ou masque le chargement / Shows or hides loading
  setLoading(isLoading) {
    this.elements.loadingOverlay.classList.toggle('hidden', !isLoading)
  }

  // Affiche une erreur / Shows an error
  showError(message) {
    this.elements.errorMessage.textContent = message
    this.elements.errorMessage.classList.remove('hidden')
  }

  // Masque l'erreur / Hides the error
  hideError() {
    this.elements.errorMessage.classList.add('hidden')
  }

  // Affiche les données météo / Renders weather data
  renderWeather(weather) {
    this.lastWeather = weather

    this.elements.locationLine.textContent = weather.locationLabel
    this.elements.temperatureLine.textContent = translate('temperatureValue', {
      value: Math.round(weather.current.temperature),
    })
    this.elements.conditionLine.textContent = translate(weather.current.labelKey)
    this.elements.updatedLine.textContent = translate('updatedAt', {
      time: this.formatLocalTime(weather.current.time),
    })
    this.elements.weatherSymbol.textContent = weather.current.icon
    this.elements.feelsLikeValue.textContent = translate('temperatureValue', {
      value: Math.round(weather.current.apparentTemperature),
    })
    this.elements.windValue.textContent = translate('windDirection', {
      speed: Math.round(weather.current.windSpeed),
      direction: weather.current.windDirectionLabel,
    })
    this.elements.humidityValue.textContent = translate('humidityValue', {
      value: Math.round(weather.current.humidity),
    })
    this.elements.pressureValue.textContent = translate('pressureValue', {
      value: Math.round(weather.current.pressure),
    })
    this.elements.cloudsValue.textContent = translate('cloudsValue', {
      value: Math.round(weather.current.cloudCover),
    })
    this.elements.precipitationValue.textContent = translate('precipitationValue', {
      value: weather.current.precipitation.toFixed(1),
    })

    this.renderForecast(weather.forecast)
    this.updateWeatherMood(weather.current.mood)
  }

  // Affiche la prévision courte / Renders short forecast
  renderForecast(forecastItems) {
    this.elements.forecastList.replaceChildren()

    forecastItems.forEach((item) => {
      const row = document.createElement('article')
      const icon = document.createElement('span')
      const copy = document.createElement('div')
      const date = document.createElement('strong')
      const condition = document.createElement('span')
      const temp = document.createElement('strong')

      row.className = 'forecast-item'
      icon.className = 'forecast-icon'
      icon.textContent = item.icon
      copy.className = 'forecast-copy'
      date.className = 'forecast-date'
      date.textContent = this.formatForecastDate(item.date)
      condition.className = 'forecast-condition'
      condition.textContent = translate(item.labelKey)
      temp.className = 'forecast-temp'
      temp.textContent = translate('forecastTemperature', {
        min: Math.round(item.min),
        max: Math.round(item.max),
      })

      copy.append(date, condition)
      row.append(icon, copy, temp)
      this.elements.forecastList.appendChild(row)
    })
  }

  // Affiche l'historique / Renders history
  renderHistory(history, onSelect) {
    this.lastHistory = history
    this.elements.historyList.replaceChildren()

    if (history.length === 0) {
      const empty = document.createElement('p')
      empty.className = 'empty-state'
      empty.textContent = translate('emptyHistory')
      this.elements.historyList.appendChild(empty)
      return
    }

    history.forEach((city) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'history-item'
      button.textContent = city
      button.addEventListener('click', () => onSelect(city))
      this.elements.historyList.appendChild(button)
    })
  }

  // Change l'ambiance du fond / Changes the background mood
  updateWeatherMood(mood) {
    document.body.classList.remove(
      'weather-clear',
      'weather-cloudy',
      'weather-rain',
      'weather-snow',
      'weather-storm',
    )
    document.body.classList.add(`weather-${mood}`)
  }

  // Met à jour le bouton de thème / Updates the theme button
  updateThemeButton(theme) {
    this.elements.themeIcon.textContent = theme === 'synth' ? '◐' : '◑'
    this.elements.themeLabel.textContent = translate(theme === 'synth' ? 'themeSynth' : 'themeDaylight')
  }

  // Bascule le thème / Toggles the theme
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'synth'
    const nextTheme = currentTheme === 'synth' ? 'daylight' : 'synth'

    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem(STORAGE_KEYS.theme, nextTheme)
    this.updateThemeButton(nextTheme)
  }

  // Rafraîchit les textes après changement de langue / Refreshes text after language change
  refreshLanguage(onHistorySelect) {
    const theme = document.documentElement.getAttribute('data-theme') || 'synth'

    this.updateThemeButton(theme)
    if (this.lastWeather) this.renderWeather(this.lastWeather)
    this.renderHistory(this.lastHistory, onHistorySelect)
  }

  // Formate l'heure locale / Formats local time
  formatLocalTime(value) {
    return new Date(value).toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Formate une date de prévision / Formats a forecast date
  formatForecastDate(value) {
    return new Date(`${value}T12:00:00`).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }
}
