function recipeTemplate(data) {
    // On extrait les données nécessaires de la recette
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    const picture = `assets/img-recette/${image}`; // Détermine le chemin de l'image de la recette

    function getRecipeDOM() {
        const article = document.createElement('article'); // Crée un élément article pour contenir la recette
        article.setAttribute('onclick', 'linkURL(' + id + ')'); // Ajoute un événement 'onclick' pour rediriger vers la page de la recette
        article.setAttribute('aria-label', 'Lien vers la page de ' + name); // Ajoute une description pour les lecteurs d'écran
        article.dataset.name = name; // Associe le nom de la recette aux données de l'article

        const timeCard = document.createElement('span'); // Crée un élément pour afficher la durée de préparation
        timeCard.classList.add('time'); // Ajoute une classe CSS pour styliser la durée
        timeCard.innerText = time + 'min'; // Affiche le temps de préparation

        const img = document.createElement('img'); // Crée un élément image pour l'image de la recette
        img.setAttribute("src", picture); // Définit le chemin de l'image

        const divText = document.createElement('div'); // Crée un conteneur pour le texte de la recette
        divText.classList.add('card-text'); // Applique un style pour la section texte

        const h2 = document.createElement('h2'); // Crée un titre pour le nom de la recette
        h2.classList.add('title-name'); // Applique un style au titre
        h2.textContent = name; // Définit le texte du titre avec le nom de la recette

        const h4Recette = document.createElement('h4'); // Crée un sous-titre "RECETTE"
        h4Recette.textContent = 'RECETTE'; // Ajoute le texte

        const pDescription = document.createElement('p'); // Crée un paragraphe pour la description
        pDescription.classList.add('description'); // Applique un style à la description
        pDescription.textContent = description.slice(0, 250) + (description.length > 250 ? "..." : ""); // Limite la description à 250 caractères maximum

        const h4Ingredients = document.createElement('h4'); // Crée un sous-titre "INGREDIENTS"
        h4Ingredients.textContent = 'INGREDIENTS'; // Ajoute le texte

        const divIngredients = document.createElement('div'); // Crée un conteneur pour la liste des ingrédients
        divIngredients.classList.add('ingredients'); // Applique un style à la section ingrédients

        // Boucle sur chaque ingrédient pour l'ajouter à la section
        ingredients.forEach((ingredient) => {
            const divIngredient = document.createElement('div'); // Crée un conteneur pour chaque ingrédient

            const pIngredient = document.createElement('p'); // Crée un paragraphe pour le nom de l'ingrédient
            pIngredient.textContent = ingredient.ingredient; // Affiche le nom de l'ingrédient

            const pQuantity = document.createElement('p'); // Crée un paragraphe pour la quantité de l'ingrédient
            pQuantity.classList.add('quantity'); // Applique un style pour la quantité
            pQuantity.textContent = ingredient.quantity + (ingredient.unit ? ' ' + ingredient.unit : ''); // Affiche la quantité et l'unité (si disponible)

            divIngredient.appendChild(pIngredient); // Ajoute le nom de l'ingrédient au conteneur
            divIngredient.appendChild(pQuantity); // Ajoute la quantité au conteneur

            divIngredients.appendChild(divIngredient); // Ajoute l'ingrédient complet à la section ingrédients
        });

        // Ajoute les différents éléments texte au conteneur texte
        divText.appendChild(h2);
        divText.appendChild(h4Recette);
        divText.appendChild(pDescription);
        divText.appendChild(h4Ingredients);
        divText.appendChild(divIngredients);

        // Ajoute les éléments visuels (temps, image, texte) à l'article
        article.appendChild(timeCard);
        article.appendChild(img);
        article.appendChild(divText);
        
        return article; // Retourne l'article complet prêt à être affiché
    }

    return { name, image, getRecipeDOM }; // Retourne les informations utiles de la recette et la fonction pour générer l'article DOM
}

function displayListFiltre(liste, select, type) {
    select.innerHTML = ''; // Vide le conteneur de filtres avant d'ajouter de nouveaux filtres

    const fragment = document.createDocumentFragment(); // Crée un fragment pour optimiser l'ajout des filtres

    const filtreActif = document.querySelectorAll("#filtre-selected > span"); // Sélectionne les filtres actifs actuellement

    liste.forEach((element) => { // Parcourt chaque élément de la liste (ingrédients, ustensiles, appareils)
        let actif = false; // Indique si l'élément est déjà actif
        if (filtreActif.length > 0) {
            filtreActif.forEach((f) => {
                if (f.innerText === element) {
                    actif = true; // Si l'élément est déjà sélectionné, le marque comme actif
                }
            });
        }

        if (!actif) { // Si l'élément n'est pas actif, on l'ajoute
            const div = document.createElement("div"); // Crée un conteneur pour le filtre
            div.setAttribute('onclick', 'selectElement(this);'); // Ajoute un événement 'onclick' pour sélectionner le filtre

            const p = document.createElement("p"); // Crée un paragraphe pour afficher le texte du filtre
            p.innerText = element; // Définit le texte du filtre
            p.dataset.group = type; // Associe le type (ingrédient, ustensile, appareil) au filtre

            div.appendChild(p); // Ajoute le paragraphe dans le conteneur du filtre
            fragment.appendChild(div); // Ajoute le conteneur au fragment
        }
    });

    select.appendChild(fragment); // Ajoute tous les filtres en une seule fois au conteneur
}