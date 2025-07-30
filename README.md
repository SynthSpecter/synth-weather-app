# SynthWeather / SynthWeather

Une application météo simple et fonctionnelle / A simple and functional weather application

---

## À propos / About

SynthWeather est une application météo web qui permet d'obtenir les conditions météorologiques actuelles pour n'importe quelle ville dans le monde.
/ SynthWeather is a web weather application that allows getting current weather conditions for any city in the world.

Ce projet a été développé avec l'assistance d'un système d'IA, ce qui signifie que le code est fonctionnel mais pourrait être amélioré.
/ This project was developed with the assistance of an AI system, which means the code is functional but could be improved.

---

## Fonctionnalités / Features

✅ Affichage des conditions météo actuelles
✅ Recherche par nom de ville
✅ Détection de la position géographique
✅ Interface bilingue (Français/Anglais)
✅ Historique des recherches récentes
✅ Menu latéral avec détails météorologiques
✅ Indicateur de chargement
✅ Gestion des erreurs

✅ Display of current weather conditions
✅ Search by city name
✅ Geographic position detection
✅ Bilingual interface (French/English)
✅ Recent search history
✅ Side menu with weather details
✅ Loading indicator
✅ Error handling

---

## Configuration / Configuration

Pour utiliser cette application / To use this application:

1. Obtenez une clé API gratuite sur [Weatherstack](https://weatherstack.com/)
   / Get a free API key from [Weatherstack](https://weatherstack.com/)
2. Remplacez la valeur `API_KEY` dans `scripts/config.js` par votre clé
   / Replace the `API_KEY` value in `scripts/config.js` with your key

## Installation / Installation

Clonez ce dépôt ou téléchargez les fichiers / Clone this repository or download the files
Ouvrez simplement index.html dans votre navigateur préféré / Simply open index.html in your preferred browser
Limitations connues / Known Limitations
Comme ce projet a été développé avec l'aide d'un assistant IA, il présente certaines limitations :
/ Since this project was developed with AI assistance, it has some limitations:

La clé API est exposée côté client (dans un projet réel, elle devrait être côté serveur) / The API key is exposed on the client side (in a real project, it should be server-side)
L'architecture pourrait être mieux structurée / The architecture could be better structured
Certains aspects de l'accessibilité pourraient être améliorés / Some accessibility aspects could be improved
Le code pourrait bénéficier d'une refactorisation / The code could benefit from refactoring

## Structure du projet / Project Structure

/
├── index.html          # Page principale / Main page
├── styles.css          # Feuille de style / Stylesheet
└── scripts/
    ├── config.js       # Configuration
    ├── translations.js # Multilingual management / Gestion multilingue
    ├── weatherIcons.js # Weather icons mapping / Mapping des icônes météo
    ├── uiManager.js    # Interface management / Gestion de l'interface
    ├── weatherManager.js # Weather data management / Gestion des données météo
    └── app.js          # Point d'entrée / Entry point

## Contribuer / Contribute

Ce projet est ouvert aux contributions. Voici quelques pistes d'amélioration :
/ This project is open to contributions. Here are some improvement ideas:

Implémenter un backend pour cacher la clé API / Implement a backend to hide the API key
Améliorer le système de cache / Improve the cache system
Ajouter des prévisions à long terme / Add long-term forecasts
Implémenter une meilleure gestion des erreurs / Implement better error handling
Améliorer l'accessibilité / Improve accessibility

Pour contribuer / To contribute:

Forkez le projet / Fork the project
Créez une branche pour votre modification (git checkout -b ma-fonctionnalite) / Create a branch for your feature (git checkout -b my-feature)
Commitez vos changements (git commit -am 'Ajout d'une nouvelle fonctionnalité') / Commit your changes (git commit -am 'Added new feature')
Pushez la branche (git push origin ma-fonctionnalite) / Push the branch (git push origin my-feature)
Ouvrez une Pull Request / Open a Pull Request

## Remerciements / Acknowledgments

Un grand merci à l'assistant IA qui a aidé à développer cette application. Bien que le résultat soit fonctionnel, il est clair qu'un travail humain supplémentaire serait nécessaire pour arrêter le projet dans un état plus professionnel et optimisé.
/ A big thank you to the AI assistant that helped develop this application. While the result is functional, it's clear that additional human work would be needed to bring the project to a more professional and optimized state.
