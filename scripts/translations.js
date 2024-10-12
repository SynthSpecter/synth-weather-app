// Traductions françaises des conditions météo / French translations for weather conditions
const FRENCH_TRANSLATIONS = {
  Sunny: 'Ensoleillé',
  Clear: 'Clair',
  Partly_cloudy: 'Partiellement nuageux',
  Cloudy: 'Nuageux',
  Overcast: 'Couvert',
  Mist: 'Brume',
  Patchy_rain_possible: 'Possibilité de pluie éparse',
  Patchy_snow_possible: 'Possibilité de neige éparse',
  Patchy_sleet_possible: 'Possibilité de grésil épars',
  Patchy_freezing_drizzle_possible: 'Possibilité de bruine verglaçante éparse',
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
  Moderate_or_heavy_rain_with_thunder: 'Pluie modérée ou forte avec tonnerre',
  Patchy_light_snow_with_thunder: 'Neige légère éparse avec tonnerre',
  Moderate_or_heavy_snow_with_thunder: 'Neige modérée ou forte avec tonnerre',
}

/**
 * Traduit une condition météo en français
 * Translates a weather condition to French
 * @param {string} condition - La condition météo en anglais / The weather condition in English
 * @returns {string} La condition traduite en français / The condition translated to French
 */
function translateCondition(condition) {
  return FRENCH_TRANSLATIONS[condition] || condition
}
