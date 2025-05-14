import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

// Récupère le chemin du fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, '../excuses.json');

// Initialise l'adaptateur JSON
const adapter = new JSONFile(file);

const db = new Low(adapter, { excuses: [] });

await db.read();
db.data ||= { excuses: [] };

export default db;
