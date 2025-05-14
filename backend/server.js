import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import excuseRoutes from './routes/excuseRoutes.js';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
app.use('/api/excuses', excuseRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Page /lost
app.get('/lost', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/lost.html'));
});

// Route dynamique pour /<code>
app.get('/:code', (req, res, next) => {
  const code = req.params.code;

  // Vérifie si c'est un code numérique
  if (/^\d+$/.test(code)) {
    res.sendFile(path.join(__dirname, '../frontend/code.html'));
  } else {
    next(); // Laisse passer aux autres routes (comme /lost ou /404)
  }
});


// Catch-all pour les erreurs 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur backend à l'écoute sur http://localhost:${PORT}`);
});
