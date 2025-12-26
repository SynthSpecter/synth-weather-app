// Traductions pour les conditions météo et autres textes / Translations for weather conditions and other texts
const TRANSLATIONS = {
  fr: {
    weatherConditions: {
      Sunny: 'Ensoleillé',
      Clear: 'Clair',
      Partly_cloudy: 'Partiellement nuageux',
      Cloudy: 'Nuageux',
      Overcast: 'Couvert',
      Mist: 'Brume',
      Patchy_rain_possible: 'Possibilité de pluie éparse',
      Patchy_snow_possible: 'Possibilité de neige éparse',
      Patchy_sleet_possible: 'Possibilité de grésil épars',
      Patchy_freezing_drizzle_possible:
        'Possibilité de bruine verglaçante éparse',
      Thundery_outbreaks_possible: "Possibilité d'orages",
      Blowing_snow: 'Poudrerie',
      Blizzard: 'Blizzard',
      Fog: 'Brouillard',
      Freezing_fog: 'Brouillard givrant',
      Patchy_light_drizzle: 'Bruine légère éparse',
      Light_drizzle: 'Bruine légère',
      Freezing_drizzle: 'Bruine verglaçante',
      Heavy_freezing_drizzle: 'Forte bruine verglaçante',
      Patchy_light_rain: 'Pluie légère éparse',
      Light_rain: 'Pluie légère',
      Moderate_rain_at_times: 'Pluie modérée par moments',
      Moderate_rain: 'Pluie modérée',
      Heavy_rain_at_times: 'Forte pluie par moments',
      Heavy_rain: 'Forte pluie',
      Light_freezing_rain: 'Pluie verglaçante légère',
      Moderate_or_heavy_freezing_rain: 'Pluie verglaçante modérée ou forte',
      Light_sleet: 'Grésil léger',
      Moderate_or_heavy_sleet: 'Grésil modéré ou fort',
      Patchy_light_snow: 'Neige légère éparse',
      Light_snow: 'Neige légère',
      Patchy_moderate_snow: 'Neige modérée éparse',
      Moderate_snow: 'Neige modérée',
      Patchy_heavy_snow: 'Forte neige éparse',
      Heavy_snow: 'Forte neige',
      Ice_pellets: 'Granules de glace',
      Light_rain_shower: 'Averse de pluie légère',
      Moderate_or_heavy_rain_shower: 'Averse de pluie modérée ou forte',
      Torrential_rain_shower: 'Averse de pluie torrentielle',
      Light_sleet_showers: 'Averses de grésil légères',
      Moderate_or_heavy_sleet_showers: 'Averses de grésil modérées ou fortes',
      Light_snow_showers: 'Averses de neige légères',
      Moderate_or_heavy_snow_showers: 'Averses de neige modérées ou fortes',
      Light_showers_of_ice_pellets: 'Averses légères de granules de glace',
      Moderate_or_heavy_showers_of_ice_pellets:
        'Averses modérées ou fortes de granules de glace',
      Patchy_light_rain_with_thunder: 'Pluie légère éparse avec tonnerre',
      Moderate_or_heavy_rain_with_thunder:
        'Pluie modérée ou forte avec tonnerre',
      Patchy_light_snow_with_thunder: 'Neige légère éparse avec tonnerre',
      Moderate_or_heavy_snow_with_thunder:
        'Neige modérée ou forte avec tonnerre',
      wind: 'Vent',
      pressure: 'Pression',
      humidity: 'Humidité',
      uv: 'Indice UV',
      visibility: 'Visibilité',
      feelslike: 'Ressenti',
      cloudcover: 'Couverture nuageuse',
      precipitation: 'Précipitations',
    },
    uiTexts: {
      placeholder: 'Entrez une ville',
      button: 'Obtenir la météo',
      error: 'Erreur lors du chargement des données météo.',
      loading: 'Chargement des données météo...',
      locationButton: 'Météo à ma position',
      languageButton: 'English',
      details: 'Détails',
      forecast: 'Prévisions',
      invalidCity: 'Veuillez entrer un nom de ville valide',
      geoNotSupported: 'Géolocalisation non supportée par ce navigateur',
      geoDenied: "L'accès à la géolocalisation a été refusé",
      geoTimeout: 'La requête de géolocalisation a expiré',
      geoUnavailable:
        'Les informations de géolocalisation ne sont pas disponibles',
      cityNotFound: 'Ville non trouvée',
      history: 'Historique des recherches',
      clearHistory: "Effacer l'historique",
    },
  },
  en: {
    weatherConditions: {
      Sunny: 'Sunny',
      Clear: 'Clear',
      Partly_cloudy: 'Partly Cloudy',
      Cloudy: 'Cloudy',
      Overcast: 'Overcast',
      Mist: 'Mist',
      Patchy_rain_possible: 'Patchy Rain Possible',
      Patchy_snow_possible: 'Patchy Snow Possible',
      Patchy_sleet_possible: 'Patchy Sleet Possible',
      Patchy_freezing_drizzle_possible: 'Patchy Freezing Drizzle Possible',
      Thundery_outbreaks_possible: 'Thundery Outbreaks Possible',
      Blowing_snow: 'Blowing Snow',
      Blizzard: 'Blizzard',
      Fog: 'Fog',
      Freezing_fog: 'Freezing Fog',
      Patchy_light_drizzle: 'Patchy Light Drizzle',
      Light_drizzle: 'Light Drizzle',
      Freezing_drizzle: 'Freezing Drizzle',
      Heavy_freezing_drizzle: 'Heavy Freezing Drizzle',
      Patchy_light_rain: 'Patchy Light Rain',
      Light_rain: 'Light Rain',
      Moderate_rain_at_times: 'Moderate Rain at Times',
      Moderate_rain: 'Moderate Rain',
      Heavy_rain_at_times: 'Heavy Rain at Times',
      Heavy_rain: 'Heavy Rain',
      Light_freezing_rain: 'Light Freezing Rain',
      Moderate_or_heavy_freezing_rain: 'Moderate or Heavy Freezing Rain',
      Light_sleet: 'Light Sleet',
      Moderate_or_heavy_sleet: 'Moderate or Heavy Sleet',
      Patchy_light_snow: 'Patchy Light Snow',
      Light_snow: 'Light Snow',
      Patchy_moderate_snow: 'Patchy Moderate Snow',
      Moderate_snow: 'Moderate Snow',
      Patchy_heavy_snow: 'Patchy Heavy Snow',
      Heavy_snow: 'Heavy Snow',
      Ice_pellets: 'Ice Pellets',
      Light_rain_shower: 'Light Rain Shower',
      Moderate_or_heavy_rain_shower: 'Moderate or Heavy Rain Shower',
      Torrential_rain_shower: 'Torrential Rain Shower',
      Light_sleet_showers: 'Light Sleet Showers',
      Moderate_or_heavy_sleet_showers: 'Moderate or Heavy Sleet Showers',
      Light_snow_showers: 'Light Snow Showers',
      Moderate_or_heavy_snow_showers: 'Moderate or Heavy Snow Showers',
      Light_showers_of_ice_pellets: 'Light Showers of Ice Pellets',
      Moderate_or_heavy_showers_of_ice_pellets:
        'Moderate or Heavy Showers of Ice Pellets',
      Patchy_light_rain_with_thunder: 'Patchy Light Rain with Thunder',
      Moderate_or_heavy_rain_with_thunder:
        'Moderate or Heavy Rain with Thunder',
      Patchy_light_snow_with_thunder: 'Patchy Light Snow with Thunder',
      Moderate_or_heavy_snow_with_thunder:
        'Moderate or Heavy Snow with Thunder',
      wind: 'Wind',
      pressure: 'Pressure',
      humidity: 'Humidity',
      uv: 'UV Index',
      visibility: 'Visibility',
      feelslike: 'Feels Like',
      cloudcover: 'Cloud Cover',
      precipitation: 'Precipitation',
    },
    uiTexts: {
      placeholder: 'Enter a city',
      button: 'Get Weather',
      error: 'Error loading weather data.',
      loading: 'Loading weather data...',
      locationButton: 'Weather at my location',
      languageButton: 'Français',
      details: 'Details',
      forecast: 'Forecast',
      invalidCity: 'Please enter a valid city name',
      geoNotSupported: 'Geolocation not supported by this browser',
      geoDenied: 'Access to geolocation was denied',
      geoTimeout: 'The request to get user location timed out',
      geoUnavailable: 'Location information is unavailable',
      cityNotFound: 'City not found',
      history: 'Search History',
      clearHistory: 'Clear History',
    },
  },
}

// Langue actuelle / Current language
let currentLanguage = 'fr'

/**
 * Change la langue de l'application / Changes the application language
 * @param {string} lang - La langue à utiliser ('fr' ou 'en') / The language to use ('fr' or 'en')
 */
function setLanguage(lang) {
  currentLanguage = lang
  updateLanguageButton()
}

/**
 * Met à jour le texte du bouton de langue / Updates the language button text
 */
function updateLanguageButton() {
  const langButton = document.querySelector('.language-btn')
  if (langButton) {
    langButton.textContent = currentLanguage === 'fr' ? 'English' : 'Français'
  }
}

/**
 * Traduit une condition météo / Translates a weather condition
 * @param {string} condition - La condition météo en anglais / The weather condition in English
 * @returns {string} La condition traduite / The translated condition
 */
function translateCondition(condition) {
  const translations = TRANSLATIONS[currentLanguage].weatherConditions
  return translations[condition] || condition
}

/**
 * Traduit un texte de l'UI / Translates a UI text
 * @param {string} key - La clé du texte à traduire / The key of the text to translate
 * @returns {string} Le texte traduit / The translated text
 */
function translateUIText(key) {
  const translations = TRANSLATIONS[currentLanguage].uiTexts
  return translations[key] || key
}

// Initialisation de la langue / Initialize language
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageButton()
})
