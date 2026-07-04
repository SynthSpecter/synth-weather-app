// ===== CONFIGURATION / CONFIGURATION =====

// Paramètres centraux de l'application / Central application settings
const CONFIG = {
  // Ville chargée au démarrage / City loaded at startup
  defaultCity: 'Paris',
  // Pays utilisé pour lever les ambiguïtés de la ville par défaut / Country used to disambiguate the default city
  defaultCountry: 'France',
  // API de géocodage publique sans clé / Public keyless geocoding API
  geocodingUrl: 'https://geocoding-api.open-meteo.com/v1/search',
  // API météo publique sans clé / Public keyless weather API
  forecastUrl: 'https://api.open-meteo.com/v1/forecast',
  // Durée du cache en minutes / Cache duration in minutes
  cacheMinutes: 20,
  // Nombre maximal d'éléments d'historique / Maximum number of history items
  maxHistoryItems: 6,
  // Nombre de jours de prévision / Number of forecast days
  forecastDays: 5,
}

// Clés de stockage local / Local storage keys
const STORAGE_KEYS = {
  // Langue choisie / Chosen language
  language: 'synthWeatherLanguage',
  // Thème choisi / Chosen theme
  theme: 'synthWeatherTheme',
  // Historique des recherches / Search history
  history: 'synthWeatherHistory',
}
