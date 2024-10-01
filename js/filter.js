function showDropdown(element) {
    // Affiche ou masque le contenu du filtre en fonction de son état
    element.parentNode.querySelector('.filtre-content').classList.toggle("show"); // Affiche ou cache la liste déroulante
    element.querySelector('img').classList.toggle("rotate"); // Fait pivoter l'icône de la flèche vers le bas ou le haut
}

function filterElement(search) {
    const input = search.value; // Récupère la valeur saisie dans l'input du filtre
    const filter = input.toUpperCase(); // Met la valeur en majuscules pour une comparaison insensible à la casse

    const element = search.parentNode.parentNode.querySelectorAll(".filtre-list > div > p"); // Sélectionne tous les éléments de la liste des filtres

    element.forEach((e) => {
        const valueSpan = e.innerText; // Récupère le texte de chaque filtre
        if (valueSpan.toUpperCase().indexOf(filter) > -1) {
            e.style.display = ""; // Affiche l'élément si le texte correspond à la saisie
        } else {
            e.style.display = "none"; // Cache l'élément si le texte ne correspond pas
        }
    });
}

function selectElement(element) {
    console.log(element); // Affiche dans la console l'élément snonélectionné (utile pour le débogage)

    const select = document.querySelector('#filtre-selected'); // Sélectionne le conteneur des filtres actifs
    const span = document.createElement('span'); // Crée un nouvel élément 'span' pour afficher le filtre sélectionné
    span.innerText = element.children[0].innerText; // Définit le texte du filtre sélectionné
    span.dataset.group = element.children[0].dataset.group; // Associe le groupe (ingrédient, appareil, ustensile) au filtre
    span.setAttribute('class', 'filtre-select'); // Ajoute une classe pour le styliser comme filtre sélectionné

    const img = document.createElement('img'); // Crée une icône de suppression pour le filtre sélectionné
    img.setAttribute("src", "./assets/svg/close-black.svg"); // Définit l'image de l'icône
    img.setAttribute("onclick", "deleteFilter(this)"); // Ajoute un événement 'onclick' pour supprimer le filtre

    span.appendChild(img); // Ajoute l'icône de suppression au 'span'
    select.appendChild(span); // Ajoute le 'span' dans la liste des filtres sélectionnés

    reseach(); // Relance la recherche avec les nouveaux filtres sélectionnés
}


function deleteFilter(element) {
    document.querySelector("#filtre-selected").removeChild(element.parentNode); // Supprime le filtre actif en cliquant sur l'icône
    reseach(); // Relance la recherche après suppression du filtre
}

function clearFilter(element) {
    const input = element.parentNode.parentNode.querySelector("input"); // Sélectionne l'input de filtre associé
    input.value = ""; // Vide la saisie de l'input
    filterElement(input); // Rafraîchit la liste des filtres affichés après nettoyage de l'input
}
