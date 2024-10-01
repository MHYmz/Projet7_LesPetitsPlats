// Fonction qui crée un modèle de recette à partir des données fournies
function recipeTemplate(data) {
    // Décomposition des propriétés de l'objet de recette
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

    // Chemin de l'image de la recette
    const picture = `./assets/img-recette/${image}`;
    
    // Fonction qui génère l'élément DOM de la recette
    function getRecipeDOM() {
        const article = document.createElement('article'); // Crée un élément article pour la recette
        article.setAttribute('onclick', 'linkURL('+id+')'); // Définit un gestionnaire d'événements pour le clic
        article.setAttribute('aria-label', 'Lien vers la page de '+name); // Améliore l'accessibilité
        article.dataset.name = name; // Ajoute le nom de la recette comme attribut de données

        // Crée un élément pour afficher le temps de préparation
        const timeCard = document.createElement('span');
        timeCard.classList.add('time');
        timeCard.innerText = time+' min'; // Affiche le temps en minutes

        // Crée l'image de la recette
        const img = document.createElement('img');
        img.setAttribute("src", picture); // Définit la source de l'image

        // Crée un conteneur pour le texte de la recette
        const divText = document.createElement('div');
        divText.classList.add('card-text');

        // Crée le titre de la recette
        const h2 = document.createElement('h2');
        h2.classList.add('title-name');
        h2.textContent = name; // Définit le nom de la recette comme texte

        // Crée une sous-titre "RECETTE"
        const h4Recette = document.createElement('h4');
        h4Recette.textContent = 'RECETTE';

        // Crée une description de la recette
        const pDescription = document.createElement('p');
        pDescription.classList.add('description');
        // Limite la description à 250 caractères
        pDescription.textContent = description.slice(0, 250) + (description.length > 250 ? "..." : "");

        // Crée une sous-titre "INGREDIENTS"
        const h4Ingredients = document.createElement('h4');
        h4Ingredients.textContent = 'INGREDIENTS';

        // Crée un conteneur pour les ingrédients
        const divIngredients = document.createElement('div');
        divIngredients.classList.add('ingredients');

        // Parcourt chaque ingrédient pour créer ses éléments DOM
        ingredients.forEach((ingredient) => {
            const divIngredient = document.createElement('div'); // Crée un conteneur pour chaque ingrédient

            const pIngredient = document.createElement('p');
            pIngredient.textContent = ingredient.ingredient; // Affiche le nom de l'ingrédient

            const pQuantity = document.createElement('p');
            pQuantity.classList.add('quantity');
            // Vérifie si l'ingrédient a une unité et l'affiche
            if (ingredient.unit) {
                pQuantity.textContent = ingredient.quantity + ' ' + ingredient.unit;
            } else {
                pQuantity.textContent = ingredient.quantity; // Affiche juste la quantité si pas d'unité
            }

            // Ajoute les éléments de l'ingrédient au conteneur
            divIngredient.appendChild(pIngredient);
            divIngredient.appendChild(pQuantity);

            // Ajoute l'ingrédient au conteneur des ingrédients
            divIngredients.appendChild(divIngredient);
        });

        // Ajoute tous les éléments de texte au conteneur principal
        divText.appendChild(h2);
        divText.appendChild(h4Recette);
        divText.appendChild(pDescription);
        divText.appendChild(h4Ingredients);
        divText.appendChild(divIngredients);

        // Ajoute tous les éléments créés à l'article de recette
        article.appendChild(timeCard);
        article.appendChild(img);
        article.appendChild(divText);
        
        return (article); // Retourne l'article contenant la recette
    }
    
    // Retourne les informations de la recette ainsi que la fonction pour générer le DOM
    return {name, image, getRecipeDOM};
}

// Fonction qui affiche une liste de filtres
function displayListFiltre(liste, select, type) {
    select.innerHTML = ''; // Vide la liste de filtres actuelle
    liste.forEach((element) => {
        const div = document.createElement("div"); // Crée un conteneur pour chaque filtre
        div.setAttribute('onclick','selectElement(this);'); // Ajoute un gestionnaire d'événements pour la sélection

        const p = document.createElement("p");
        p.innerText = element; // Définit le texte du filtre
        p.dataset.group = type; // Ajoute un attribut de groupe pour le type de filtre

        // Ajoute le texte du filtre au conteneur
        div.appendChild(p);
        // Ajoute le conteneur du filtre à la liste de sélection
        select.appendChild(div);
    });
}
