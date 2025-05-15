import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../excuses.db');
const db = new Database(dbPath);

// Création automatique de la table si elle n'existe pas
db.prepare(`
  CREATE TABLE IF NOT EXISTS excuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    http_code INTEGER UNIQUE NOT NULL,
    message TEXT NOT NULL,
    tag TEXT DEFAULT 'Autre'
  )
`).run();

export default db;