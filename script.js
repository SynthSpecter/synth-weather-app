document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '47f1c97685c2671f61983cdb9ef458a6'
  const cityInput = document.querySelector('.city-input')
  const getWeatherButton = document.querySelector('.get-weather-btn')
  const errorMessageElement = document.querySelector('.error-message')

  getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value
    getWeatherData(city)
  })

  const cityElement = document.querySelector('.city')
  const temperatureElement = document.querySelector('.temperature')
  const conditionElement = document.querySelector('.condition')

  async function getWeatherData(city = 'Paris') {
    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.info)
      }

      cityElement.textContent = data.location.name
      temperatureElement.textContent = `${data.current.temperature}°C`
      conditionElement.textContent = data.current.weather_descriptions[0]
      updateBackground(data.current.weather_descriptions[0])
      updateWeatherIcon(data.current.weather_descriptions[0])
      errorMessageElement.style.display = 'none'
    } catch (error) {
      console.error('Error fetching weather data:', error)
      cityElement.textContent = 'Error'
      errorMessageElement.style.display = 'block'
    }
  }

  getWeatherData()

  function updateBackground(condition) {
    document.body.className = condition.toLowerCase().replace(/\s+/g, '-')
  }

  function updateWeatherIcon(condition) {
    const iconElement = document.querySelector('.weather-icon')
    const iconName = condition.toLowerCase().replace(/\s+/g, '-')
    iconElement.src = `icons/${iconName}.png`
    iconElement.alt = condition
  }
})
