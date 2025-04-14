// Importation des modules nécessaires
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;
const FILE_PATH = './excuses.json';

// Configuration des middlewares
app.use(cors()); // Permet les requêtes cross-origin (CORS)
app.use(express.json()); // Active l'interprétation du JSON dans les requêtes
app.use(express.static(path.join(__dirname, '../frontend'))); // Sert les fichiers statiques du frontend

// Fonction pour charger les excuses depuis le fichier JSON
function getExcuses() {
  try {
    const rawData = fs.readFileSync(FILE_PATH);
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}

// Route API pour récupérer toutes les excuses
app.get('/api/excuses', (req, res) => {
  const excuses = getExcuses();
  res.json(excuses);
});

// Route API pour ajouter une nouvelle excuse
app.post('/excuses', (req, res) => {
  let { http_code, message, tag } = req.body;

  if (!http_code || !message) {
    return res.status(400).json({ error: "Le code HTTP et le message sont obligatoires." });
  }

  http_code = parseInt(http_code, 10);

  let data = getExcuses();

  // Vérification si le code HTTP existe déjà
  if (data.some(excuse => parseInt(excuse.http_code, 10) === http_code)) {
    return res.status(400).json({ error: `Le code HTTP ${http_code} existe déjà !` });
  }

  const newExcuse = { http_code, tag: tag || "Autre", message };
  data.push(newExcuse);

  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    res.status(201).json({ message: "Excuse ajoutée avec succès !", excuse: newExcuse });
  } catch (err) {
    res.status(500).json({ error: "Impossible d'ajouter l'excuse." });
  }
});

// Route pour la page "lost"
app.get('/lost', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/lost.html'));
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Route API pour récupérer une excuse par son code HTTP
app.get('/api/:code', (req, res) => {
  const excuses = getExcuses();
  const excuse = excuses.find(e => e.http_code == req.params.code);
  if (excuse) {
    res.json(excuse);
  } else {
    res.status(404).json({ error: 'Excuse not found' });
  }
});

// Route dynamique pour afficher `code.html` avec des données personnalisées
app.get('/:code', (req, res, next) => {
  const code = req.params.code;
  const excuses = getExcuses();
  const excuse = excuses.find(e => e.http_code == code);

  if (excuse) {
    const htmlPath = path.join(__dirname, '../frontend/code.html');
    fs.readFile(htmlPath, 'utf8', (err, htmlData) => {
      if (err) {
        return res.status(500).send('Erreur de lecture du fichier HTML.');
      }

      const rendered = htmlData
        .replace('{{http_code}}', excuse.http_code)
        .replace('{{message}}', excuse.message || 'Pas de message')
        .replace('{{tag}}', excuse.tag || '');

      res.send(rendered);
    });
  } else {
    next();
  }
});

// Catch-all pour les routes inconnues
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
