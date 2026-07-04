// ===== TRADUCTIONS / TRANSLATIONS =====

// Langues supportées / Supported languages
const SUPPORTED_LANGUAGES = ['fr', 'en']
// Callbacks appelés quand la langue change / Callbacks called when language changes
const languageListeners = []

// Dictionnaire bilingue de l'interface / Bilingual interface dictionary
const translations = {
  fr: {
    skipLink: 'Aller à la recherche',
    appKicker: 'Station météo',
    themeTitle: 'Changer le thème',
    themeSynth: 'Synth',
    themeDaylight: 'Clair',
    searchLabel: 'Ville',
    cityPlaceholder: 'Paris, Tokyo, Montréal...',
    searchButton: 'Rechercher',
    locationButton: 'Ma position',
    defaultLocation: 'Paris, France',
    conditionWaiting: 'En attente des données',
    updatedWaiting: 'Pas encore actualisé',
    feelsLikeLabel: 'Ressenti',
    windLabel: 'Vent',
    humidityLabel: 'Humidité',
    pressureLabel: 'Pression',
    cloudsLabel: 'Nuages',
    precipitationLabel: 'Précipitations',
    forecastTitle: 'Prévisions',
    historyTitle: 'Historique',
    clearHistoryButton: 'Effacer',
    loadingText: 'Chargement de la météo...',
    emptyHistory: 'Aucune recherche récente.',
    invalidCity: 'Entre un nom de ville valide.',
    cityNotFound: 'Ville introuvable. Essaie une autre recherche.',
    networkError: 'Impossible de charger la météo pour le moment.',
    geolocationUnavailable: 'La géolocalisation n’est pas disponible dans ce navigateur.',
    geolocationDenied: 'L’accès à la position a été refusé.',
    geolocationTimeout: 'La géolocalisation a pris trop de temps.',
    geolocationGeneric: 'Impossible de récupérer ta position.',
    currentPosition: 'Position actuelle',
    updatedAt: 'Actualisé à {time}',
    windDirection: '{speed} km/h {direction}',
    precipitationValue: '{value} mm',
    pressureValue: '{value} hPa',
    humidityValue: '{value}%',
    cloudsValue: '{value}%',
    temperatureValue: '{value}°C',
    forecastTemperature: '{min}° / {max}°',
    north: 'N',
    northEast: 'NE',
    east: 'E',
    southEast: 'SE',
    south: 'S',
    southWest: 'SO',
    west: 'O',
    northWest: 'NO',
    clear: 'Ciel dégagé',
    mainlyClear: 'Plutôt dégagé',
    partlyCloudy: 'Partiellement nuageux',
    overcast: 'Couvert',
    fog: 'Brouillard',
    drizzle: 'Bruine',
    freezingDrizzle: 'Bruine verglaçante',
    rain: 'Pluie',
    freezingRain: 'Pluie verglaçante',
    snow: 'Neige',
    snowGrains: 'Neige en grains',
    rainShowers: 'Averses de pluie',
    snowShowers: 'Averses de neige',
    thunderstorm: 'Orage',
    unknown: 'Condition inconnue',
  },
  en: {
    skipLink: 'Skip to search',
    appKicker: 'Weather station',
    themeTitle: 'Change theme',
    themeSynth: 'Synth',
    themeDaylight: 'Light',
    searchLabel: 'City',
    cityPlaceholder: 'Paris, Tokyo, Montreal...',
    searchButton: 'Search',
    locationButton: 'My location',
    defaultLocation: 'Paris, France',
    conditionWaiting: 'Waiting for data',
    updatedWaiting: 'Not updated yet',
    feelsLikeLabel: 'Feels like',
    windLabel: 'Wind',
    humidityLabel: 'Humidity',
    pressureLabel: 'Pressure',
    cloudsLabel: 'Clouds',
    precipitationLabel: 'Precipitation',
    forecastTitle: 'Forecast',
    historyTitle: 'History',
    clearHistoryButton: 'Clear',
    loadingText: 'Loading weather...',
    emptyHistory: 'No recent search.',
    invalidCity: 'Enter a valid city name.',
    cityNotFound: 'City not found. Try another search.',
    networkError: 'Unable to load weather right now.',
    geolocationUnavailable: 'Geolocation is not available in this browser.',
    geolocationDenied: 'Location access was denied.',
    geolocationTimeout: 'Geolocation took too long.',
    geolocationGeneric: 'Unable to get your location.',
    currentPosition: 'Current position',
    updatedAt: 'Updated at {time}',
    windDirection: '{speed} km/h {direction}',
    precipitationValue: '{value} mm',
    pressureValue: '{value} hPa',
    humidityValue: '{value}%',
    cloudsValue: '{value}%',
    temperatureValue: '{value}°C',
    forecastTemperature: '{min}° / {max}°',
    north: 'N',
    northEast: 'NE',
    east: 'E',
    southEast: 'SE',
    south: 'S',
    southWest: 'SW',
    west: 'W',
    northWest: 'NW',
    clear: 'Clear sky',
    mainlyClear: 'Mainly clear',
    partlyCloudy: 'Partly cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    freezingDrizzle: 'Freezing drizzle',
    rain: 'Rain',
    freezingRain: 'Freezing rain',
    snow: 'Snow',
    snowGrains: 'Snow grains',
    rainShowers: 'Rain showers',
    snowShowers: 'Snow showers',
    thunderstorm: 'Thunderstorm',
    unknown: 'Unknown condition',
  },
}

// Langue active relue depuis localStorage / Active language read from localStorage
let currentLanguage = readSavedLanguage()

// Lit la langue sauvegardée / Reads the saved language
function readSavedLanguage() {
  const savedLanguage = localStorage.getItem(STORAGE_KEYS.language)
  return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : 'fr'
}

// Traduit une clé avec variables optionnelles / Translates a key with optional variables
function translate(key, values = {}) {
  const dictionary = translations[currentLanguage] || translations.fr
  const fallback = translations.fr[key] || key
  const template = dictionary[key] || fallback

  return Object.entries(values).reduce((text, [name, value]) => {
    return text.replaceAll(`{${name}}`, value)
  }, template)
}

// Change la langue active / Changes the active language
function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) return

  currentLanguage = language
  localStorage.setItem(STORAGE_KEYS.language, language)
  applyTranslations()
  languageListeners.forEach((listener) => listener(language))
}

// Enregistre un callback de changement de langue / Registers a language-change callback
function onLanguageChange(callback) {
  languageListeners.push(callback)
}

// Applique les traductions statiques / Applies static translations
function applyTranslations() {
  document.documentElement.lang = currentLanguage

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translate(element.dataset.i18n)
  })

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder)
  })

  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    element.title = translate(element.dataset.i18nTitle)
  })

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.classList.toggle('active', button.dataset.language === currentLanguage)
  })
}
