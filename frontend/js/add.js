//  Sélection des éléments du DOM pour la gestion de la modale et du formulaire

const modal = document.getElementById("modal"); // Fenêtre modale d'ajout
const openModal = document.getElementById("openModal"); // Bouton pour ouvrir la modale
const closeModal = document.getElementById("closeModal");  // Bouton pour fermer la modale
const submitExcuse = document.getElementById("submitExcuse"); // Bouton d'envoi du formulaire
const responseEl = document.getElementById("response"); // Élément où afficher la réponse du serveur

// Ouvrir la modale au clic sur le bouton "Ajouter une excuse"
openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

// Fermer la modale au clic sur le bouton de fermeture "×"
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Soumettre l'excuse via le formulaire
submitExcuse.addEventListener("click", () => {

   // Récupération des valeurs saisies par l'utilisateur
  const http_code = document.getElementById("http_code").value;
  const message = document.getElementById("message").value;
  const tag = document.getElementById("tag").value || "Autre";

  //  Vérification des champs obligatoire
  if (!http_code || !message) {
    alert("Le code HTTP et le message sont obligatoires !");
    return;
  }

   //  Envoi des données au serveur via une requête `POST`

fetch("http://localhost:3001/api/excuses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ http_code: parseInt(http_code), message, tag })
})
.then(response => response.json()) // Conversion de la réponse en JSON
.then(data => {
    if (data.error) {
        alert("❌ " + data.error); // Afficher un message si le code HTTP existe déjà
    } else {
        alert("✅ Excuse ajoutée avec succès !");
        modal.style.display = "none";

        // Réinitialisation des champs du formulaire
        document.getElementById("http_code").value = "";
        document.getElementById("message").value = "";
        document.getElementById("tag").value = "";
    }
})
.catch(error => {

  //  Gestion des erreurs de requête (ex: serveur non disponible)
    alert("❌ Erreur lors de l'ajout.");
    console.error("Erreur :", error);
});



});
