// Gestion de l'interface utilisateur / User Interface management
class UIManager {
  constructor() {
    this.elements = {
      cityInput: document.querySelector('.city-input'),
      getWeatherButton: document.querySelector('.get-weather-btn'),
      errorMessage: document.querySelector('.error-message'),
      city: document.querySelector('.city'),
      temperature: document.querySelector('.temperature'),
      condition: document.querySelector('.condition'),
      icon: document.querySelector('.weather-icon'),
      leftMenuBtn: document.getElementById('leftMenuBtn'),
      rightMenuBtn: document.getElementById('rightMenuBtn'),
      leftMenu: document.getElementById('leftMenu'),
      rightMenu: document.getElementById('rightMenu'),
    }

    this.initEventListeners()
  }

  initEventListeners() {
    this.elements.leftMenuBtn.addEventListener('click', () =>
      this.toggleMenu('left')
    )
    this.elements.rightMenuBtn.addEventListener('click', () =>
      this.toggleMenu('right')
    )
  }

  toggleMenu(side) {
    const menu = this.elements[`${side}Menu`]
    if (menu.classList.contains('open')) {
      this.closeMenu(menu)
    } else {
      this.openMenu(menu)
    }
  }

  openMenu(menu) {
    menu.style.visibility = 'visible'
    menu.classList.add('open')
  }

  closeMenu(menu) {
    menu.classList.remove('open')
    menu.classList.add('closing')
    setTimeout(() => {
      menu.classList.remove('closing')
      menu.style.visibility = 'hidden'
    }, 500)
  }

  updateWeatherInfo(data) {
    this.elements.city.textContent = data.location.name
    this.elements.temperature.textContent = `${data.current.temperature}°C`
    const frenchCondition = translateCondition(
      data.current.weather_descriptions[0]
    )
    this.elements.condition.textContent = frenchCondition
    this.updateBackground(data.current.weather_code)
    this.updateWeatherIcon(
      data.current.weather_code,
      data.current.is_day === 'yes'
    )
    this.updateSideMenus(data)
  }

  updateBackground(weatherCode) {
    let backgroundClass = 'default'
    if (weatherCode <= 113) backgroundClass = 'sunny'
    else if (weatherCode <= 248) backgroundClass = 'cloudy'
    else if (weatherCode <= 356) backgroundClass = 'rainy'
    else backgroundClass = 'snowy'

    document.body.className = backgroundClass
  }

  updateWeatherIcon(weatherCode, isDay) {
    const iconInfo = WEATHER_ICONS[weatherCode] || WEATHER_ICONS[113]
    const iconName = isDay ? iconInfo.day : iconInfo.night
    this.elements.icon.src = `https://assets.weatherstack.com/images/wsymbols01_png_64/${iconName}.png`
    this.elements.icon.alt = this.elements.condition.textContent
  }

  updateSideMenus(data) {
    document.getElementById(
      'wind'
    ).textContent = `${data.current.wind_speed} km/h ${data.current.wind_dir}`
    document.getElementById(
      'pressure'
    ).textContent = `${data.current.pressure} mb`
    document.getElementById(
      'humidity'
    ).textContent = `${data.current.humidity}%`
    document.getElementById('uv').textContent = data.current.uv_index || 'N/A'
    document.getElementById(
      'visibility'
    ).textContent = `${data.current.visibility} km`
    document.getElementById(
      'feelslike'
    ).textContent = `${data.current.feelslike}°C`
    document.getElementById(
      'cloudcover'
    ).textContent = `${data.current.cloudcover}%`
    document.getElementById(
      'precipitation'
    ).textContent = `${data.current.precip} mm`
  }

  showError() {
    this.elements.city.textContent = 'Erreur'
    this.elements.errorMessage.style.display = 'block'
  }

  hideError() {
    this.elements.errorMessage.style.display = 'none'
  }
}
