# synth-weather-app

## Français

`synth-weather-app` est une application météo synthwave en HTML, CSS et JavaScript. Elle permet de chercher une ville, d'utiliser la position du navigateur, de consulter la météo actuelle et de lire une prévision courte sur cinq jours.

### Fonctionnalités

- Recherche météo par ville.
- Géolocalisation via le navigateur.
- Météo actuelle : température, ressenti, vent, humidité, pression, nuages et précipitations.
- Prévisions sur cinq jours.
- Historique local des recherches.
- Interface bilingue français/anglais.
- Thème synthwave et thème clair.
- Cache mémoire court pour éviter des appels répétés pendant la session.
- Code commenté en français/anglais pour faciliter la lecture.
- Aucun framework et aucune clé API à stocker côté client.

### Source météo

L'application utilise les API publiques Open-Meteo :

- Geocoding API pour transformer une ville en coordonnées.
- Forecast API pour récupérer la météo actuelle et les prévisions.

### Lancer l'application

Tu peux ouvrir `index.html` directement dans ton navigateur.

Tu peux aussi lancer le serveur local fourni :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:4176`.

### Vérifier le code

```bash
npm run check
```

Cette commande vérifie la syntaxe des fichiers JavaScript.

### Structure

```text
synth-weather-app/
├── index.html
├── package.json
├── assets/
│   ├── data/
│   │   └── Multilingual_Weather_Conditions.csv
│   └── fonts/
│       └── Audiowide-Regular.ttf
├── styles/
│   └── main.css
└── scripts/
    ├── config.js
    ├── translations.js
    ├── weatherIcons.js
    ├── uiManager.js
    ├── weatherManager.js
    ├── app.js
    └── server.js
```

### Pistes d'amélioration

- Ajouter une carte météo.
- Ajouter les favoris persistants.
- Ajouter un mode unités impériales.
- Ajouter une vue heure par heure.
- Ajouter une gestion offline avec dernier résultat sauvegardé.

## English

`synth-weather-app` is a synthwave weather app built with HTML, CSS, and JavaScript. It lets users search for a city, use browser location, view current weather, and read a short five-day forecast.

### Features

- Weather search by city.
- Browser geolocation.
- Current weather: temperature, feels-like, wind, humidity, pressure, clouds, and precipitation.
- Five-day forecast.
- Local search history.
- French/English interface.
- Synthwave theme and light theme.
- Short in-memory cache to avoid repeated calls during a session.
- French/English comments to make the code easier to understand.
- No framework and no client-side API key to store.

### Weather Source

The app uses the public Open-Meteo APIs:

- Geocoding API to turn a city into coordinates.
- Forecast API to load current weather and forecasts.

### Run The App

You can open `index.html` directly in your browser.

You can also start the included local server:

```bash
npm run dev
```

The app will be available at `http://localhost:4176`.

### Check The Code

```bash
npm run check
```

This command checks the syntax of the JavaScript files.

### Structure

```text
synth-weather-app/
├── index.html
├── package.json
├── assets/
│   ├── data/
│   │   └── Multilingual_Weather_Conditions.csv
│   └── fonts/
│       └── Audiowide-Regular.ttf
├── styles/
│   └── main.css
└── scripts/
    ├── config.js
    ├── translations.js
    ├── weatherIcons.js
    ├── uiManager.js
    ├── weatherManager.js
    ├── app.js
    └── server.js
```

### Improvement Ideas

- Add a weather map.
- Add persistent favorites.
- Add imperial units.
- Add an hourly view.
- Add offline handling with the last saved result.

## Licence / License

MIT
