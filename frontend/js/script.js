const button = document.querySelector("button"); // Bouton pour générer une excuse
const excuseEl = document.getElementById("excuse"); // Zone d'affichage de l'excuse
const loader = document.getElementById("loader"); // Indicateur de chargement

let excuses = []; // Liste des excuses récupérées depuis l'API
let usedExcuses = new Set(); // Ensemble pour éviter la répétition des excuses

//  Charger les excuses depuis l'API
fetch('/api/excuses') 
  .then(response => {
    if (!response.ok) throw new Error("Erreur lors du chargement des excuses"); // Gestion d'erreur si la requête échoue
    return response.json();
  })
  .then(data => {
    excuses = data; // Stocker les excuses récupérées
  })
  .catch(error => {
    excuseEl.textContent = "Impossible de charger les excuses."; // Affichage d'un message d'erreur en cas d'échec
    console.error(error);
  });

//  Gérer le clic sur le bouton "Générer une excuse
button.addEventListener("click", () => {
  loader.style.display = "block"; // Afficher l'indicateur de chargement
  excuseEl.style.display = "none"; // Cacher l'excuse actuelle le temps du chargement

  const delay = Math.floor(Math.random() * 4000) + 1000; // Aléatoire entre 1000ms (1s) et 5000ms (5s)

  setTimeout(() => {
    if (excuses.length === 0) {
      excuseEl.textContent = "Aucune excuse disponible."; // Gérer le cas où aucune excuse n'est chargée
    } else {
      let excuse;
      do {
        excuse = excuses[Math.floor(Math.random() * excuses.length)].message; // Sélection aléatoire d'une excuse
      } while (usedExcuses.has(excuse) && usedExcuses.size < excuses.length); // Vérification pour éviter les répétitions

      usedExcuses.add(excuse);
      if (usedExcuses.size === excuses.length) usedExcuses.clear();

      excuseEl.textContent = excuse;
    }

    loader.style.display = "none"; // Cacher le loader après chargement
    excuseEl.style.display = "block";
  }, delay);
});
