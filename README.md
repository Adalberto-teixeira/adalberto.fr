# CV en ligne — Adalberto Teixeira

Site CV interactif développé en HTML, CSS et JavaScript, avec un assistant conversationnel intégré qui répond aux questions des visiteurs (parcours, compétences, formation, projets, contact...).

## 🔗 Aperçu

- **Accueil** — `/`
- **CV** — `/cv/`
- **Projets** — `/projets/`
- **Contact** — `/contact/`

Chaque page vit dans son propre dossier (`cv/index.html`, `projets/index.html`, `contact/index.html`) pour obtenir des URLs propres sans extension `.html`. C'est la structure standard reconnue nativement par GitHub Pages et la plupart des hébergeurs statiques — aucune configuration serveur supplémentaire n'est nécessaire.

## 🛠️ Stack technique

- HTML5 / CSS3 / JavaScript (vanilla + jQuery pour quelques interactions du template)
- Bootstrap 5
- Font Awesome (icônes)
- Assistant conversationnel maison (règles + mots-clés, sans dépendance externe)

## 📁 Structure

```
├── index.html           → page d'accueil (/)
├── cv/index.html         → page CV (/cv/)
├── projets/index.html    → page Projets (/projets/)
├── contact/index.html    → page Contact (/contact/)
├── assets/
│   ├── css/          → styles du site (main.css = template, enhance.css = personnalisations)
│   ├── js/            → scripts du site (main.js = template, enhance.js = personnalisations)
│   ├── img/            → images utilisées sur le site
│   ├── chat/           → moteur de l'assistant conversationnel (css/js)
│   └── cv/             → CV téléchargeable au format PDF
```

> ⚠️ Test en local : ouvrir directement les fichiers en double-cliquant (`file://`) ne fonctionne pas bien avec cette structure en dossiers. Utiliser un petit serveur local (voir ci-dessous) ou tester une fois le site publié.

## 🚀 Lancer en local

Aucune installation nécessaire — c'est un site statique. Il suffit d'un petit serveur local pour éviter les soucis de CORS avec les scripts :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans un navigateur.

## ✏️ Modifier le contenu

- **Textes** : directement dans les fichiers `.html`.
- **Assistant conversationnel** : le contenu des réponses se trouve dans le bloc `<div class="sections">` (identique dans les 4 pages HTML — à mettre à jour partout si modifié).
- **Projets** : ajouter un projet dans `projets.html` (section `<!-- PROJET N -->`) et penser à l'ajouter aussi dans le flux `data-flow-id="projets"` de l'assistant.

## 📄 Licence

Projet personnel — tous droits réservés.
