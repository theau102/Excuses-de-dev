// delete.js : Supprime une excuse de la base SQLite selon le code HTTP
import db from './db/db.js';

// Récupération de l'argument en ligne de commande (ex: node delete.js 701)

const codeToDelete = process.argv[2];

// Vérification que l'argument est bien fourni et numérique

if (!codeToDelete || isNaN(codeToDelete)) {
  console.error("❌ Utilisation : node delete.js <code_http>");
  process.exit(1);
}

// Préparation de la requête SQL pour supprimer l'excuse correspondant au code

const deleteStmt = db.prepare('DELETE FROM excuses WHERE http_code = ?');
const result = deleteStmt.run(parseInt(codeToDelete));

// Affichage du résultat : supprimé ou non trouvé

if (result.changes > 0) {
  console.log(`✅ Excuse avec code ${codeToDelete} supprimée.`);
} else {
  console.log(`⚠️ Aucune excuse trouvée avec le code ${codeToDelete}.`);
}
