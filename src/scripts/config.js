// Configuration de l'application / Application configuration
const CONFIG = {
  API_KEY: '47f1c97685c2671f61983cdb9ef458a6', // Dans une vraie appli, cette clé devrait être côté serveur
  DEFAULT_CITY: 'Paris',
  // Configuration du cache
  USE_CACHE: true,
  CACHE_TTL: 30, // Durée de vie du cache en minutes
  // Configuration de l'historique
  MAX_HISTORY_ITEMS: 5,
  // Configuration de la langue par défaut
  DEFAULT_LANGUAGE: 'fr',
  // Configuration du débogage
  DEBUG_MODE: false,
  // URL de l'API (pour un éventuel proxy)
  API_URL: 'https://api.weatherstack.com/current',
}
