// lire.js : Affiche toutes les excuses de la base SQLite
import db from './db/db.js';

try {
    // Exécute une requête SQL pour récupérer toutes les excuses

  const excuses = db.prepare('SELECT * FROM excuses').all();

    // Si aucune excuse n'est trouvée, afficher un message d'information

  if (excuses.length === 0) {
    console.log("⚠️ La base de données est vide.");
  } else {
    
        // Affichage formaté de chaque excuse

    console.log("📋 Excuses dans la base :");
    excuses.forEach(excuse => {
      console.log(`- [${excuse.http_code}] ${excuse.message} (#${excuse.tag})`);
    });
  }
} catch (err) {
  console.error("❌ Erreur lors de la lecture de la base :", err);
}
