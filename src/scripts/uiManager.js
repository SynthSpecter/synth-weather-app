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
      languageBtn: document.querySelector('.language-btn'),
      locationBtn: document.querySelector('.location-btn'),
      loadingSpinner: document.querySelector('.loading-spinner'),
      searchHistoryContainer: document.querySelector('.search-history'),
      clearHistoryBtn: document.querySelector('.clear-history-btn'),
    }
    this.initEventListeners()
    this.updateUITexts()
  }

  initEventListeners() {
    this.elements.leftMenuBtn.addEventListener('click', () =>
      this.toggleMenu('left')
    )
    this.elements.rightMenuBtn.addEventListener('click', () =>
      this.toggleMenu('right')
    )

    // Bouton de changement de langue
    if (this.elements.languageBtn) {
      this.elements.languageBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'fr' ? 'en' : 'fr'
        setLanguage(newLang)
        this.updateUITexts()

        // Rafraîchir les données avec les nouvelles traductions
        const cityInput = this.elements.cityInput
        if (cityInput && cityInput.value) {
          // On suppose que weatherManager est accessible ici
          // En réalité, il faudrait un meilleur mécanisme pour y accéder
          // Pour l'instant, nous laissons cette partie commentée
          // weatherManager.getWeatherData(cityInput.value);
        }
      })
    }

    // Gestion des clics en dehors des menus
    document.addEventListener('click', (event) => {
      const leftMenu = this.elements.leftMenu
      const rightMenu = this.elements.rightMenu
      const leftBtn = this.elements.leftMenuBtn
      const rightBtn = this.elements.rightMenuBtn

      if (
        leftMenu.classList.contains('open') &&
        !leftMenu.contains(event.target) &&
        !leftBtn.contains(event.target)
      ) {
        this.closeMenu(leftMenu)
      }
      if (
        rightMenu.classList.contains('open') &&
        !rightMenu.contains(event.target) &&
        !rightBtn.contains(event.target)
      ) {
        this.closeMenu(rightMenu)
      }
    })

    // Écouteur pour la touche Échap pour fermer les menus
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const leftMenu = this.elements.leftMenu
        const rightMenu = this.elements.rightMenu

        if (leftMenu.classList.contains('open')) {
          this.closeMenu(leftMenu)
        }
        if (rightMenu.classList.contains('open')) {
          this.closeMenu(rightMenu)
        }
      }
    })
  }

  /**
   * Met à jour les textes de l'UI dans la langue actuelle
   * Updates UI texts in the current language
   */
  updateUITexts() {
    if (this.elements.cityInput) {
      this.elements.cityInput.placeholder = translateUIText('placeholder')
    }
    if (this.elements.getWeatherButton) {
      this.elements.getWeatherButton.textContent = translateUIText('button')
    }
    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = translateUIText('error')
    }
    if (this.elements.locationBtn) {
      this.elements.locationBtn.textContent = translateUIText('locationButton')
    }
    if (this.elements.languageBtn) {
      this.elements.languageBtn.textContent = translateUIText('languageButton')
    }
    // Mettre à jour les titres des menus latéraux
    const leftMenuTitle = this.elements.leftMenu.querySelector('h2')
    const rightMenuTitle = this.elements.rightMenu.querySelector('h2')
    if (leftMenuTitle) leftMenuTitle.textContent = translateUIText('details')
    if (rightMenuTitle) rightMenuTitle.textContent = translateUIText('forecast')

    // Mettre à jour le texte du bouton d'effacement de l'historique
    if (this.elements.clearHistoryBtn) {
      this.elements.clearHistoryBtn.textContent =
        translateUIText('clearHistory')
    }
  }

  /**
   * Affiche un indicateur de chargement
   * Shows a loading indicator
   */
  showLoading() {
    if (this.elements.loadingSpinner) {
      this.elements.loadingSpinner.style.display = 'flex'
    }
  }

  /**
   * Masque l'indicateur de chargement
   * Hides the loading indicator
   */
  hideLoading() {
    if (this.elements.loadingSpinner) {
      this.elements.loadingSpinner.style.display = 'none'
    }
  }

  /**
   * Affiche un message d'erreur
   * Shows an error message
   * @param {string} message - Le message d'erreur à afficher
   */
  showError(message) {
    if (this.elements.errorMessage) {
      this.elements.errorMessage.textContent = message
      this.elements.errorMessage.style.display = 'block'
    }
  }

  /**
   * Masque le message d'erreur
   * Hides the error message
   */
  hideError() {
    if (this.elements.errorMessage) {
      this.elements.errorMessage.style.display = 'none'
    }
  }

  /**
   * Met à jour les informations météo
   * Updates weather information
   * @param {object} data - Les données météo
   */
  updateWeatherInfo(data) {
    if (this.elements.city) {
      this.elements.city.textContent = data.location.name
    }
    if (this.elements.temperature) {
      this.elements.temperature.textContent = `${data.current.temperature}°C`
    }

    const condition = data.current.weather_descriptions[0]
    if (this.elements.condition) {
      this.elements.condition.textContent = translateCondition(condition)
    }

    this.updateBackground(data.current.weather_code)
    this.updateWeatherIcon(
      data.current.weather_code,
      data.current.is_day === 'yes'
    )
    this.updateSideMenus(data)
  }

  /**
   * Met à jour l'arrière-plan en fonction du code météo
   * Updates background based on weather code
   * @param {number} weatherCode - Le code météo
   */
  updateBackground(weatherCode) {
    let backgroundClass = 'default'
    if (weatherCode <= 113) backgroundClass = 'sunny'
    else if (weatherCode <= 248) backgroundClass = 'cloudy'
    else if (weatherCode <= 356) backgroundClass = 'rainy'
    else backgroundClass = 'snowy'
    document.body.className = backgroundClass
  }

  /**
   * Met à jour l'icône météo
   * Updates weather icon
   * @param {number} weatherCode - Le code météo
   * @param {boolean} isDay - Indique si c'est le jour ou la nuit
   */
  updateWeatherIcon(weatherCode, isDay) {
    if (!this.elements.icon) return

    const iconInfo = WEATHER_ICONS[weatherCode] || WEATHER_ICONS[113]
    const iconName = isDay ? iconInfo.day : iconInfo.night
    this.elements.icon.src = `https://assets.weatherstack.com/images/wsymbols01_png_64/${iconName}.png`
    this.elements.icon.alt = this.elements.condition.textContent
  }

  /**
   * Met à jour les menus latéraux avec les détails météo
   * Updates side menus with weather details
   * @param {object} data - Les données météo
   */
  updateSideMenus(data) {
    if (!data || !data.current) return

    const weatherData = {
      wind: `${data.current.wind_speed} km/h ${data.current.wind_dir}`,
      pressure: `${data.current.pressure} mb`,
      humidity: `${data.current.humidity}%`,
      uv: data.current.uv_index || 'N/A',
      visibility: `${data.current.visibility} km`,
      feelslike: `${data.current.feelslike}°C`,
      cloudcover: `${data.current.cloudcover}%`,
      precipitation: `${data.current.precip} mm`,
    }

    for (const [id, value] of Object.entries(weatherData)) {
      const element = document.getElementById(id)
      if (element) element.textContent = value
    }
  }

  /**
   * Basculer l'affichage d'un menu latéral
   * Toggle a side menu
   * @param {string} side - Le côté du menu ('left' ou 'right')
   */
  toggleMenu(side) {
    const menu = this.elements[`${side}Menu`]
    if (menu.classList.contains('open')) {
      this.closeMenu(menu)
    } else {
      // Fermer l'autre menu si ouvert
      const otherSide = side === 'left' ? 'right' : 'left'
      const otherMenu = this.elements[`${otherSide}Menu`]
      if (otherMenu.classList.contains('open')) {
        this.closeMenu(otherMenu)
      }
      this.openMenu(menu)
    }
  }

  /**
   * Ouvrir un menu latéral
   * Open a side menu
   * @param {HTMLElement} menu - L'élément du menu à ouvrir
   */
  openMenu(menu) {
    menu.style.visibility = 'visible'
    menu.classList.add('open')
  }

  /**
   * Fermer un menu latéral
   * Close a side menu
   * @param {HTMLElement} menu - L'élément du menu à fermer
   */
  closeMenu(menu) {
    menu.classList.remove('open')
    menu.classList.add('closing')
    setTimeout(() => {
      menu.classList.remove('closing')
      menu.style.visibility = 'hidden'
    }, 500)
  }

  /**
   * Charge l'historique des recherches dans l'interface
   * Loads search history into the UI
   */
  loadSearchHistory() {
    if (!this.elements.searchHistoryContainer) return

    // Effacer l'historique actuel
    this.elements.searchHistoryContainer.innerHTML =
      '<h3>' + translateUIText('history') + '</h3>'

    // Ajouter un bouton pour effacer l'historique
    const clearBtn = document.createElement('button')
    clearBtn.className = 'clear-history-btn'
    clearBtn.textContent = translateUIText('clearHistory')
    clearBtn.addEventListener('click', () => {
      // Nous aurons besoin d'une référence à weatherManager ici
      // En réalité, il faudrait un meilleur mécanisme pour y accéder
      // Pour l'instant, nous laissons cette partie commentée
      // weatherManager.clearHistory();
    })
    this.elements.searchHistoryContainer.appendChild(clearBtn)

    // Récupérer l'historique depuis le localStorage
    const history = JSON.parse(localStorage.getItem('weatherSearches')) || []

    // Ajouter chaque élément à l'historique
    history.forEach((city) => {
      const div = document.createElement('div')
      div.className = 'history-item'
      div.textContent = city
      div.addEventListener('click', () => {
        // Charger la ville depuis l'historique
        this.elements.cityInput.value = city
        // Nous aurons besoin d'une référence à weatherManager ici
        // weatherManager.loadFromHistory(city);
      })

      // Ajouter un bouton pour supprimer cet élément de l'historique
      const deleteBtn = document.createElement('button')
      deleteBtn.className = 'delete-history-item'
      deleteBtn.textContent = '×'
      deleteBtn.style.float = 'right'
      deleteBtn.style.background = 'none'
      deleteBtn.style.border = 'none'
      deleteBtn.style.color = '#ff0000'
      deleteBtn.style.cursor = 'pointer'
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        // Nous aurons besoin d'une référence à weatherManager ici
        // weatherManager.removeFromHistory(city);
        div.remove()
      })

      div.appendChild(deleteBtn)
      this.elements.searchHistoryContainer.appendChild(div)
    })
  }
}
