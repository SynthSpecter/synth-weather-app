// Icônes météo pour différentes conditions / Weather icons for different conditions
const WEATHER_ICONS = {
  // Ciel dégagé / Clear sky
  113: { day: 'wsymbol_0001_sunny', night: 'wsymbol_0008_clear_sky_night' },
  // Partiellement nuageux / Partly cloudy
  116: {
    day: 'wsymbol_0002_sunny_intervals',
    night: 'wsymbol_0034_clear_sky_night',
  },
  119: {
    day: 'wsymbol_0003_white_cloud',
    night: 'wsymbol_0004_black_low_cloud',
  },
  122: {
    day: 'wsymbol_0004_black_low_cloud',
    night: 'wsymbol_0004_black_low_cloud',
  },
  // Brouillard / Fog
  143: { day: 'wsymbol_0006_mist', night: 'wsymbol_0006_mist' },
  248: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' },
  260: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' },
  // Pluie / Rain
  263: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  266: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  281: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' }, // brouillard givrant
  284: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' }, // brouillard givrant
  293: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  296: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  299: { day: 'wsymbol_0013_heavy_rain', night: 'wsymbol_0013_heavy_rain' },
  302: {
    day: 'wsymbol_0013_heavy_rain',
    night: 'wsymbol_0027_heavy_rain_night',
  },
  305: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  308: {
    day: 'wsymbol_0013_heavy_rain',
    night: 'wsymbol_0027_heavy_rain_night',
  },
  311: {
    day: 'wsymbol_0020_rain_showers',
    night: 'wsymbol_0036_rain_showers_night',
  },
  314: {
    day: 'wsymbol_0020_rain_showers',
    night: 'wsymbol_0036_rain_showers_night',
  },
  317: {
    day: 'wsymbol_0020_rain_showers',
    night: 'wsymbol_0036_rain_showers_night',
  },
  320: {
    day: 'wsymbol_0013_heavy_rain',
    night: 'wsymbol_0027_heavy_rain_night',
  },
  // Neige / Snow
  323: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  326: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  329: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  332: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  335: {
    day: 'wsymbol_0024_thunderstorms',
    night: 'wsymbol_0040_thunderstorms_night',
  },
  338: {
    day: 'wsymbol_0024_thunderstorms',
    night: 'wsymbol_0040_thunderstorms_night',
  },
  // Autres conditions
  350: {
    day: 'wsymbol_0021_cloudy_with_sleet',
    night: 'wsymbol_0037_cloudy_with_sleet_night',
  },
  353: {
    day: 'wsymbol_0020_rain_showers',
    night: 'wsymbol_0036_rain_showers_night',
  },
  356: {
    day: 'wsymbol_0010_heavy_rain_showers',
    night: 'wsymbol_0026_heavy_rain_showers_night',
  },
  359: {
    day: 'wsymbol_0013_heavy_rain',
    night: 'wsymbol_0027_heavy_rain_night',
  },
  362: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  365: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  368: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  371: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
  374: {
    day: 'wsymbol_0021_cloudy_with_sleet',
    night: 'wsymbol_0037_cloudy_with_sleet_night',
  },
  377: {
    day: 'wsymbol_0021_cloudy_with_sleet',
    night: 'wsymbol_0037_cloudy_with_sleet_night',
  },
  386: {
    day: 'wsymbol_0024_thunderstorms',
    night: 'wsymbol_0040_thunderstorms_night',
  },
  389: {
    day: 'wsymbol_0024_thunderstorms',
    night: 'wsymbol_0040_thunderstorms_night',
  },
  392: {
    day: 'wsymbol_0013_heavy_rain',
    night: 'wsymbol_0027_heavy_rain_night',
  },
  395: {
    day: 'wsymbol_0012_heavy_snow_showers',
    night: 'wsymbol_0028_heavy_snow_showers_night',
  },
}

// Valeurs par défaut pour les codes météo non définis
const DEFAULT_ICONS = {
  day: 'wsymbol_0001_sunny',
  night: 'wsymbol_0008_clear_sky_night',
}

// Fonction pour obtenir les icônes météo
function getWeatherIcons(code) {
  return WEATHER_ICONS[code] || DEFAULT_ICONS
}
