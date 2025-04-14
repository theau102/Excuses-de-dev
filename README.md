# 🧑‍💻 Excuses de Dev – Projet Bachelor FOREACH Academy

Bienvenue dans le projet "Excuses de Dev" réalisé dans le cadre de l'examen d'entré de FOREACH Academy.

---

## 🚀 Objectif

Fournir une application web simple permettant d'afficher aléatoirement ou par code HTTP des excuses de développeur, avec un backend Node.js et un frontend HTML/CSS/JS séparé.

---

## 📁 Structure du projet

```
Excuses de dev/
├── backend/
│   ├── server.js         # Serveur Node.js
│   ├── excuses.json      # Données des excuses
│   └── start.bat         # Lancement rapide sous Windows
│
├── frontend/
│   ├── code.html         # Page d'affichage dynamique d'une excuse
│   ├── index.html        # Page d'accueil
│   ├── 404.html          # Page d'erreur
│   ├── lost.html         # Page si on est perdu 
│   ├── add.html          # Page d'ajout d'une excuse 
│   ├── css/
│   |   ├── 404.css       # Styles de la page 404
│   |   ├── index.css     # Styles de la page index
│   │   ├── code.css      # Styles de la page code
│   │   └── lost.css      # Styles de la page lost
│   ├── js/
│   |   ├── script.js     # Affichage d'une excuse aléatoire
│   |   └── add.js        # ajout d'une excuse
│   ├── gif/
│   └── lost.gif          # Gif pour la page lost
│
├── README.md             # Ce fichier
```

---

## ⚙️ Installation et lancement

### 1. Pré-requis

- [Node.js](https://nodejs.org/) installé

### 2. Démarrer le serveur

double-clique sur `start.bat` (Windows)

Ou 

```bash
cd backend
node server.js
```

### 3. Ouvrir dans le navigateur

```
http://localhost:3001

```

## 📌 Fonctionnalités

- ✅ Affichage d'excuses
- 🔁 Affichage d'excuses aléatoires via un bouton
- ✍️ Ajout d'une excuse via une modale 
- 📂 Stockage des excuses dans excuses.json
- 🏠 `/` → revient a la page d'accueil 
- 🗺️ `/lost` → Affiche une page lost 
- ⚠️ `/*` →  Affiche une page d'erreur 404
- 🔢 `/701` → Affiche une excuse pour le code HTTP `701`


---



## 👨‍🏫 Réalisé par

> Projet encadré par FOREACH Academy  
> Développé par LANSIAU Theau
