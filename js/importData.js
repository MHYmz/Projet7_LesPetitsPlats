// Appelle la fonction d'initialisation pour commencer le processus
init();

function init() {
    // Récupère les données des recettes et les affiche
    displayData(recipes); // Affiche toutes les recettes
    displayFilter(recipes); // Affiche les filtres disponibles
}

function displayData(data) {
    // Sélectionne la section où les recettes seront affichées
    const recipesSection = document.querySelector("#recipes");
    recipesSection.innerHTML = ""; // Vide la section pour éviter les doublons

    // Remplacement de .forEach() par une boucle for
    for (let i = 0; i < data.length; i++) {
        const recipe = data[i];
        const recipeModel = recipeTemplate(recipe); // Crée un modèle pour la recette
        const recipeCard = recipeModel.getRecipeDOM(); // Obtient l'élément DOM de la recette
        recipesSection.appendChild(recipeCard); // Ajoute la carte de recette à la section
    }

    // Met à jour le nombre total de recettes affichées
    const nbRecette = document.querySelector('#nb-recipes');
    nbRecette.innerText = data.length; // Affiche le nombre de recettes
}

function displayFilter(data) {
    // (Optionnel) Efface les filtres de recherche précédents
    // document.querySelector('#filtre-selected').innerHTML = '';

    // Récupère les listes d'ingrédients, d'ustensiles et d'appareils
    const listIngredients = getListIngredients(data);
    const listUstensils = getListUstensils(data);
    const listAppareils = getListAppareils(data);

    // Sélectionne les éléments de la liste de filtres dans le DOM
    const selectIngredients = document.querySelector('.filtre-list-ingredients');
    const selectAppareils = document.querySelector('.filtre-list-appareils');
    const selectUstensils = document.querySelector('.filtre-list-ustensils');

    // Affiche les listes de filtres pour chaque catégorie
    displayListFiltre(listIngredients, selectIngredients, 'ingredients');
    displayListFiltre(listAppareils, selectAppareils, 'appareils');
    displayListFiltre(listUstensils, selectUstensils, 'ustensils');
}

// Récupère une liste unique d'ingrédients à partir des recettes
function getListIngredients(recipes) {
    const listIngredients = []; // Tableau pour stocker les ingrédients uniques
    for (let i = 0; i < recipes.length; i++) {
        const ingredients = recipes[i].ingredients; // Récupère les ingrédients de la recette
        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j];
            // Vérifie si l'ingrédient n'est pas déjà dans la liste
            const found = listIngredients.find((element) => element.toLowerCase() === ingredient.ingredient.toLowerCase());
            if (found === undefined) {
                listIngredients.push(ingredient.ingredient); // Ajoute l'ingrédient à la liste
            }
        }
    }

    return listIngredients; // Retourne la liste des ingrédients uniques
}

// Récupère une liste unique d'ustensiles à partir des recettes
function getListUstensils(recipes) {
    const listUstensils = []; // Tableau pour stocker les ustensiles uniques
    for (let i = 0; i < recipes.length; i++) {
        const ustensils = recipes[i].ustensils; // Récupère les ustensiles de la recette
        for (let j = 0; j < ustensils.length; j++) {
            const ustensil = ustensils[j];
            // Vérifie si l'ustensile n'est pas déjà dans la liste
            const found = listUstensils.find((element) => element.toLowerCase() === ustensil.toLowerCase());
            if (found === undefined) {
                listUstensils.push(ustensil); // Ajoute l'ustensile à la liste
            }
        }
    }

    return listUstensils; // Retourne la liste des ustensiles uniques
}

// Récupère une liste unique d'appareils à partir des recettes
function getListAppareils(recipes) {
    const listAppareils = []; // Tableau pour stocker les appareils uniques
    for (let i = 0; i < recipes.length; i++) {
        const appareils = recipes[i].appliance; // Récupère l'appareil de la recette
        // Vérifie si l'appareil n'est pas déjà dans la liste
        const found = listAppareils.find((element) => element.toLowerCase() === appareils.toLowerCase());
        if (found === undefined) {
            listAppareils.push(appareils); // Ajoute l'appareil à la liste
        }
    }

    return listAppareils; // Retourne la liste des appareils uniques
}
