document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '47f1c97685c2671f61983cdb9ef458a6'
  const cityInput = document.querySelector('.city-input')
  const getWeatherButton = document.querySelector('.get-weather-btn')
  const errorMessageElement = document.querySelector('.error-message')
  const cityElement = document.querySelector('.city')
  const temperatureElement = document.querySelector('.temperature')
  const conditionElement = document.querySelector('.condition')
  const iconElement = document.querySelector('.weather-icon')

  const weatherIcons = {
    113: { day: 'wsymbol_0001_sunny', night: 'wsymbol_0008_clear_sky_night' },
    116: {
      day: 'wsymbol_0002_sunny_intervals',
      night: 'wsymbol_0008_clear_sky_night',
    },
    119: {
      day: 'wsymbol_0003_white_cloud',
      night: 'wsymbol_0004_black_low_cloud',
    },
    122: {
      day: 'wsymbol_0004_black_low_cloud',
      night: 'wsymbol_0004_black_low_cloud',
    },
    143: { day: 'wsymbol_0006_mist', night: 'wsymbol_0006_mist' },
    248: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' },
    260: { day: 'wsymbol_0007_fog', night: 'wsymbol_0007_fog' },
    305: {
      day: 'wsymbol_0010_heavy_rain_showers',
      night: 'wsymbol_0026_heavy_rain_showers_night',
    },
    356: {
      day: 'wsymbol_0010_heavy_rain_showers',
      night: 'wsymbol_0026_heavy_rain_showers_night',
    },
    377: {
      day: 'wsymbol_0021_cloudy_with_sleet',
      night: 'wsymbol_0037_cloudy_with_sleet_night',
    },
    389: {
      day: 'wsymbol_0024_thunderstorms',
      night: 'wsymbol_0040_thunderstorms_night',
    },
    395: {
      day: 'wsymbol_0012_heavy_snow_showers',
      night: 'wsymbol_0028_heavy_snow_showers_night',
    },
  }

  const frenchTranslations = {
    Sunny: 'Ensoleillé',
    Clear: 'Clair',
    'Partly cloudy': 'Partiellement nuageux',
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
    Moderate_or_heavy_rain_with_thunder: 'Pluie modérée ou forte avec tonnerre',
    Patchy_light_snow_with_thunder: 'Neige légère éparse avec tonnerre',
    Moderate_or_heavy_snow_with_thunder: 'Neige modérée ou forte avec tonnerre',
  }

  function translateCondition(condition) {
    return frenchTranslations[condition] || condition
  }

  getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value
    getWeatherData(city)
  })

  async function getWeatherData(city = 'Paris') {
    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.info)
      }

      updateWeatherInfo(data)
      errorMessageElement.style.display = 'none'
    } catch (error) {
      console.error('Error fetching weather data:', error)
      cityElement.textContent = 'Error'
      errorMessageElement.style.display = 'block'
    }
  }

  function updateWeatherInfo(data) {
    cityElement.textContent = data.location.name
    temperatureElement.textContent = `${data.current.temperature}°C`
    const englishCondition = data.current.weather_descriptions[0]
    const frenchCondition = translateCondition(englishCondition)
    conditionElement.textContent = frenchCondition
    updateBackground(data.current.weather_code)
    updateWeatherIcon(data.current.weather_code, data.current.is_day === 'yes')
  }

  function updateBackground(weatherCode) {
    let backgroundClass = 'default'
    if (weatherCode <= 113) backgroundClass = 'sunny'
    else if (weatherCode <= 248) backgroundClass = 'cloudy'
    else if (weatherCode <= 356) backgroundClass = 'rainy'
    else backgroundClass = 'snowy'

    document.body.className = backgroundClass
  }

  function updateWeatherIcon(weatherCode, isDay) {
    const iconInfo = weatherIcons[weatherCode] || weatherIcons[113] // Default to sunny if code not found
    const iconName = isDay ? iconInfo.day : iconInfo.night
    iconElement.src = `https://assets.weatherstack.com/images/wsymbols01_png_64/${iconName}.png`
    iconElement.alt = conditionElement.textContent
  }

  // Initialisation
  getWeatherData()
})
