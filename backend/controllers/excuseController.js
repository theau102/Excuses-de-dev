import db from '../db/db.js';

// Récupère toutes les excuses depuis la base de données

export const getAllExcuses = (req, res) => {
  try {
    const excuses = db.prepare('SELECT * FROM excuses').all();
    res.json(excuses);
  } catch (err) {
    console.error('Erreur SQL (getAll):', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupère une excuse spécifique en fonction de son code HTTP

export const getExcuseByCode = (req, res) => {
  try {
    const code = parseInt(req.params.code);
    const excuse = db.prepare('SELECT * FROM excuses WHERE http_code = ?').get(code);

    if (!excuse) {
      return res.status(404).json({ error: 'Excuse non trouvée' });
    }

    res.json(excuse);
  } catch (err) {
    console.error('Erreur SQL (getByCode):', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Ajoute une nouvelle excuse dans la base

export const addExcuse = (req, res) => {
  const { http_code, message, tag } = req.body;

    // Validation des champs obligatoires

  if (!http_code || !message) {
    return res.status(400).json({ error: 'Code HTTP et message obligatoires.' });
  }

  try {
    const insert = db.prepare(`
      INSERT INTO excuses (http_code, message, tag)
      VALUES (?, ?, ?)
    `);
    
    // Insertion de l'excuse dans la base avec fallback pour le tag
    insert.run(http_code, message, tag || 'Autre');

    res.status(201).json({ message: 'Excuse ajoutée avec succès' });
  } catch (err) {
        // Gestion du cas de doublon sur le code HTTP
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ error: 'Ce code HTTP existe déjà.' });
    } else {
      console.error('Erreur SQL (add):', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};