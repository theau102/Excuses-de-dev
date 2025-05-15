import db from './db/db.js';

// Tableau d'excuses à insérer dans la base si elles n'existent pas déjà

const excuses = [
  { http_code: 701, message: "Meh", tag: "Inexcusable" },
  { http_code: 702, message: "Emacs", tag: "Inexcusable" },
  { http_code: 703, message: "Explosion", tag: "Inexcusable" },
  { http_code: 704, message: "Goto Fail", tag: "Inexcusable" },
  { http_code: 705, message: "I wrote the code and missed the necessary validation by an oversight (see 795)", tag: "Inexcusable" }
];

// Préparation de la requête d'insertion avec IGNORE en cas de doublon

const insert = db.prepare(`INSERT OR IGNORE INTO excuses (http_code, message, tag) VALUES (?, ?, ?)`);

// Insertion de chaque excuse une à une dans la base

for (const excuse of excuses) {
  insert.run(excuse.http_code, excuse.message, excuse.tag);
}

console.log("✅ Excuses insérées dans la base SQLite");
