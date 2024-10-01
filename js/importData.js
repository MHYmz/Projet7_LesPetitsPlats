init(); // Lance l'initialisation de l'affichage des recettes et des filtres

function init() {
    displayData(recipes); // Affiche toutes les recettes disponibles sur la page
    displayFilter(recipes); // Affiche tous les filtres (ingrédients, appareils, ustensiles) liés aux recettes
}


function displayData(data) {
    const recipesSection = document.querySelector("#recipes"); // Sélectionne la section dans le DOM où afficher les recettes
    recipesSection.innerHTML = ""; // Vide la section avant d'ajouter les nouvelles recettes

    const fragment = document.createDocumentFragment(); // Utilise un fragment pour améliorer les performances en ajoutant les éléments en une seule opération

    data.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe); // Génère un modèle de recette avec les données fournies
        const recipeCard = recipeModel.getRecipeDOM(); // Récupère l'élément DOM de la recette
        fragment.appendChild(recipeCard); // Ajoute la carte de la recette au fragment
    });

    recipesSection.appendChild(fragment); // Ajoute toutes les cartes des recettes en une seule fois à la section des recettes

    const nbRecette = document.querySelector('#nb-recipes'); // Sélectionne l'élément du DOM où afficher le nombre de recettes
    nbRecette.innerText = data.length; // Affiche le nombre total de recettes disponibles
}

function displayFilter(data) {
    const listIngredients = getListIngredients(data); // Génère une liste unique d'ingrédients à partir des recettes
    const listUstensils = getListUstensils(data); // Génère une liste unique d'ustensiles à partir des recettes
    const listAppareils = getListAppareils(data); // Génère une liste unique d'appareils à partir des recettes

    const selectIngredients = document.querySelector('.filtre-list-ingredients'); // Sélectionne l'élément où afficher les filtres d'ingrédients
    const selectAppareils = document.querySelector('.filtre-list-appareils'); // Sélectionne l'élément où afficher les filtres d'appareils
    const selectUstensils = document.querySelector('.filtre-list-ustensils'); // Sélectionne l'élément où afficher les filtres d'ustensiles

    displayListFiltre(listIngredients, selectIngredients, 'ingredients'); // Affiche la liste des filtres d'ingrédients
    displayListFiltre(listAppareils, selectAppareils, 'appareils'); // Affiche la liste des filtres d'appareils
    displayListFiltre(listUstensils, selectUstensils, 'ustensils'); // Affiche la liste des filtres d'ustensiles
}

function getListIngredients(recipes) {
    const listIngredients = []; // Initialise une liste vide pour les ingrédients
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const found = listIngredients.find((element) => element.toLowerCase() === ingredient.ingredient.toLowerCase()); // Cherche si l'ingrédient est déjà dans la liste
            if (!found) {
                listIngredients.push(ingredient.ingredient); // Ajoute l'ingrédient à la liste s'il n'y est pas encore
            }
        });
    });
    
    return listIngredients; // Retourne la liste complète des ingrédients uniques
}

function getListUstensils(recipes) {
    const listUstensils = []; // Initialise une liste vide pour les ustensiles
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            const found = listUstensils.find((element) => element.toLowerCase() === ustensil.toLowerCase()); // Cherche si l'ustensile est déjà dans la liste
            if (!found) {
                listUstensils.push(ustensil); // Ajoute l'ustensile à la liste s'il n'y est pas encore
            }
        });
    });
    
    return listUstensils; // Retourne la liste complète des ustensiles uniques
}

function getListAppareils(recipes) {
    const listAppareils = []; // Initialise une liste vide pour les appareils
    recipes.forEach((recipe) => {
        const found = listAppareils.find((element) => element.toLowerCase() === recipe.appliance.toLowerCase()); // Cherche si l'appareil est déjà dans la liste
        if (!found) {
            listAppareils.push(recipe.appliance); // Ajoute l'appareil à la liste s'il n'y est pas encore
        }
    });

    return listAppareils; // Retourne la liste complète des appareils uniques
}
