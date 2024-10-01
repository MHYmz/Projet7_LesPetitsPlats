// Affiche ou masque le menu déroulant des filtres
function showDropdown(element) {
    // Bascule la classe "show" pour afficher/masquer le contenu du filtre
    element.parentNode.querySelector('.filtre-content').classList.toggle("show");
    // Fait pivoter l'icône de flèche pour indiquer l'ouverture/fermeture du menu
    element.querySelector('img').classList.toggle("rotate");
}

// Filtre les éléments de la liste en fonction de l'entrée de recherche
function filterElement(search) {
    const input = search.value; // Récupère la valeur saisie dans le champ de recherche
    const filter = input.toUpperCase(); // Convertit la valeur en majuscules pour une comparaison insensible à la casse

    // Sélectionne tous les éléments de la liste de filtres
    const element = search.parentNode.parentNode.querySelectorAll(".filtre-list > div > p");
    console.log(search.parentNode.parentNode); // Affiche l'élément parent dans la console (pour le débogage)
    
    // Parcourt chaque élément de la liste et applique le filtre
    element.forEach((e) => {
        const valueSpan = e.innerText; // Récupère le texte de l'élément
        // Vérifie si le texte contient la valeur de filtre
        if (valueSpan.toUpperCase().indexOf(filter) > -1) {
            e.style.display = ""; // Affiche l'élément s'il correspond au filtre
        } else {
            e.style.display = "none"; // Masque l'élément s'il ne correspond pas
        }
    });
}

// Sélectionne un élément de la liste de filtres
function selectElement(element) {
    // Masque l'élément sélectionné
    element.style.display = 'none';

    // Récupère l'élément qui contiendra les filtres sélectionnés
    const select = document.querySelector('#filtre-selected');
    const span = document.createElement('span'); // Crée un nouvel élément span pour le filtre sélectionné
    span.innerText = element.children[0].innerText; // Définit le texte du span avec le texte de l'élément sélectionné
    span.dataset.group = element.children[0].dataset.group; // Ajoute l'attribut de données pour le groupe
    span.setAttribute('class', 'filtre-select'); // Définit la classe du span

    // Crée un élément img pour le bouton de suppression du filtre
    const img = document.createElement('img');
    img.setAttribute("src", "./assets/svg/close-black.svg"); // Définit l'icône de fermeture
    img.setAttribute("onclick", "deleteFilter(this)"); // Ajoute un gestionnaire d'événements pour supprimer le filtre

    span.appendChild(img); // Ajoute l'icône au span
    select.appendChild(span); // Ajoute le span au conteneur des filtres sélectionnés

    // Réexécute la fonction de recherche pour mettre à jour les résultats
    reseach();
}

// Supprime un filtre sélectionné
function deleteFilter(element) {
    // Supprime le filtre du conteneur
    document.querySelector("#filtre-selected").removeChild(element.parentNode);
    // Réexécute la fonction de recherche pour mettre à jour les résultats
    reseach();
}
