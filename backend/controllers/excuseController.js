import db from '../db/database.js';


// Récupère toutes les excuses
export const getAllExcuses = async (req, res) => {
  await db.read();
  db.data ||= { excuses: [] };
  res.json(db.data.excuses);
};

// Récupère une excuse par son code HTTP
export const getExcuseByCode = async (req, res) => {
  const code = parseInt(req.params.code);
  await db.read();
  const excuse = db.data.excuses.find(e => e.http_code === code);

  if (!excuse) {
    return res.status(404).json({ error: 'Excuse non trouvée' });
  }

  res.json(excuse);
};

// Ajoute une nouvelle excuse
export const addExcuse = async (req, res) => {
  const { http_code, message, tag } = req.body;
  if (!http_code || !message) {
    return res.status(400).json({ error: 'Code HTTP et message obligatoires.' });
  }

  await db.read();
  const exists = db.data.excuses.some(e => e.http_code === parseInt(http_code));
  if (exists) {
    return res.status(400).json({ error: 'Ce code HTTP existe déjà.' });
  }

  const newExcuse = {
    http_code: parseInt(http_code),
    message,
    tag: tag || 'Autre'
  };

  db.data.excuses.push(newExcuse);
  await db.write();

  res.status(201).json({ message: 'Excuse ajoutée', excuse: newExcuse });
};
