const searchBar = document.querySelector('#search-bar'); // Sélectionne la barre de recherche dans le DOM

searchBar.addEventListener('keyup', reseach); // Ajoute un écouteur d'événement qui déclenche la fonction 'reseach' à chaque fois qu'une touche est relâchée dans la barre de recherche

function reseach() {
    const clear = document.querySelector(".clear-searchbar"); // Sélectionne le bouton ou élément permettant de nettoyer la barre de recherche
    if (searchBar.value.length > 0) {
        clear.style.display = "block"; // Affiche le bouton de nettoyage si du texte est saisi
    } else {
        clear.style.display = "none"; // Cache le bouton de nettoyage si la barre est vide
    }

    const allRecipes = []; // Initialise un tableau pour stocker les recettes filtrées

    // Si la saisie contient à minima 3 caractères
    if (searchBar.value.length >= 3) {
        
        recipes.forEach((recipe) => {
            // Vérifie si le nom de la recette correspond à la recherche
            if (recipe.name.toLowerCase().indexOf(searchBar.value.toLowerCase()) > -1) {
                if (!allRecipes.includes(recipe)) {
                    allRecipes.push(recipe); // Ajoute la recette au tableau si elle n'y est pas déjà
                }
            // Sinon, vérifie si la description correspond à la recherche
            } else if (recipe.description.toLowerCase().indexOf(searchBar.value.toLowerCase()) > -1) {
                if (!allRecipes.includes(recipe)) {
                    allRecipes.push(recipe); // Ajoute la recette au tableau
                }
            } else {
                // Vérifie si l'un des ingrédients correspond à la recherche
                recipe.ingredients.forEach((ingredient) => {
                    if (ingredient.ingredient.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1) {
                        if (!allRecipes.includes(recipe)) {
                            allRecipes.push(recipe); // Ajoute la recette si un ingrédient correspond
                        }
                    }
                });
            }
        });

        applyFilter(allRecipes); // Applique les filtres aux recettes trouvées
    } else {
        applyFilter(recipes); // Applique les filtres à toutes les recettes si la recherche est trop courte
    }
}

function applyFilter(allRecipes) {
    const selectFilter = document.querySelectorAll('#filtre-selected > span'); // Sélectionne les filtres actifs dans le DOM

    const newRecipe = []; // Initialise un tableau pour stocker les recettes filtrées

    const errorMessage = document.querySelector('#error-message'); // CeciEstUnAjout

    allRecipes.forEach((recipe) => {
        let recipeTrue = true; // Initialise un drapeau pour valider la recette

        selectFilter.forEach((filtre) => {
            if (filtre.dataset.group === 'ingredients') {
                // Vérifie si la recette contient l'ingrédient sélectionné
                if (recipe.ingredients.filter((element) => element.ingredient.toLowerCase() === filtre.innerText.toLowerCase()).length === 0) {
                    recipeTrue = false; // Invalide la recette si elle ne contient pas l'ingrédient
                }
            }

            if (filtre.dataset.group === 'appareils') {
                // Vérifie si la recette utilise l'appareil sélectionné
                if (recipe.appliance.toLowerCase() !== filtre.innerText.toLowerCase()) {
                    recipeTrue = false; // Invalide la recette si l'appareil ne correspond pas
                }
            }

            if (filtre.dataset.group === 'ustensils') {
                // Vérifie si la recette utilise l'ustensile sélectionné
                if (recipe.ustensils.filter((element) => element.toLowerCase() === filtre.innerText.toLowerCase()).length === 0) {
                    recipeTrue = false; // Invalide la recette si l'ustensile ne correspond pas
                }
            }
        });

        if (recipeTrue) {
            newRecipe.push(recipe); // Si tous les filtres sont valides, ajoute la recette
        }
    });

    // Afficher le message d'erreur si aucune recette n'est trouvée
    if (newRecipe.length === 0) {
        errorMessage.style.display = "block"; // Affiche le message d'erreur
    } else {
        errorMessage.style.display = "none"; // Cache le message d'erreur
    }

    displayData(newRecipe); // Affiche les recettes filtrées
    displayFilter(newRecipe); // Met à jour les filtres affichés
}

function clearSearch(element) {
    element.parentNode.parentNode.querySelector("input").value = ""; // Vide la barre de recherche
    displayData(recipes); // Affiche toutes les recettes
    displayFilter(recipes); // Affiche tous les filtres
}