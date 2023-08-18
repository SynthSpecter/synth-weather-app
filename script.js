document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '47f1c97685c2671f61983cdb9ef458a6'
  const city = 'Thiers' // Change this to the desired city

  const cityElement = document.querySelector('.city')
  const temperatureElement = document.querySelector('.temperature')
  const conditionElement = document.querySelector('.condition')

  async function getWeatherData() {
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.info)
      }

      cityElement.textContent = data.location.name
      temperatureElement.textContent = `${data.current.temperature}°C`
      conditionElement.textContent = data.current.weather_descriptions[0]
    } catch (error) {
      console.error('Error fetching weather data:', error)
      cityElement.textContent = 'Error'
    }
  }

  getWeatherData()
})
