// Sélectionne la barre de recherche par son ID
const searchBar = document.querySelector('#search-bar');

// Ajoute un écouteur d'événements qui déclenche la fonction 'reseach' à chaque frappe de touche dans la barre de recherche
searchBar.addEventListener('keyup', reseach);

// Fonction de recherche qui s'exécute lorsque l'utilisateur tape dans la barre de recherche
function reseach() {
    // Sélectionne le bouton d'effacement de la recherche
    const clear = document.querySelector(".clear-searchbar");
    
    // Affiche le bouton d'effacement si la barre de recherche contient du texte, sinon le cache
    if (searchBar.value.length > 0) {
        clear.style.display = "block"; // Affiche le bouton d'effacement
    } else {
        clear.style.display = "none"; // Cache le bouton d'effacement
    }

    // Tableau pour stocker les recettes qui correspondent à la recherche
    let allRecipes = [];

    // Vérifie si la longueur du texte de recherche est supérieure à 3 caractères
    if (searchBar.value.length > 3) {
        // Crée une expression régulière pour effectuer une recherche insensible à la casse
        const regexSearch = new RegExp(`${searchBar.value.toLowerCase()}`);
        
        // Parcourt toutes les recettes pour trouver des correspondances
        for (let i = 0; i < recipes.length; i++) {
            let reseachTrue = false; // Indicateur de correspondance

            // Vérifie si le nom de la recette correspond
            if (regexSearch.test(recipes[i].name.toLowerCase())) {
                reseachTrue = true; // La recette correspond
            } 
            // Vérifie si la description de la recette correspond
            else if (regexSearch.test(recipes[i].description.toLowerCase())) {
                reseachTrue = true; // La recette correspond
            } 
            // Vérifie si les ingrédients correspondent
            else {
                for (let u = 0; u < recipes[i].ingredients.length; u++) {
                    if (regexSearch.test(recipes[i].ingredients[u].ingredient.toLowerCase())) {
                        reseachTrue = true; // Au moins un ingrédient correspond
                    }
                }
            }

            // Si une correspondance est trouvée, ajoute la recette au tableau
            if (reseachTrue) {
                allRecipes.push(recipes[i]);
            }
        }
        // Applique les filtres aux recettes trouvées
        applyFilter(allRecipes);
    } else {
        // Si moins de 4 caractères, affiche toutes les recettes
        applyFilter(recipes);
    }
}

// Fonction pour appliquer les filtres aux recettes
function applyFilter(allRecipes) {
    // Sélectionne tous les filtres sélectionnés
    const selectFilter = document.querySelectorAll('#filtre-selected > span');

    // Tableau pour stocker les recettes filtrées
    const newRecipe = [];

    // Parcourt toutes les recettes trouvées pour appliquer les filtres
    for (let i = 0; i < allRecipes.length; i++) {
        let recipeTrue = 0; // Compteur de correspondances

        // Parcourt chaque filtre sélectionné
        for (let f = 0; f < selectFilter.length; f++) {
            // Vérifie les filtres d'ingrédients
            if (selectFilter[f].dataset.group === 'ingredients') {
                let checkIngredient = false; // Indicateur de correspondance des ingrédients
                for (let u = 0; u < allRecipes[i].ingredients.length; u++) {
                    // Vérifie si l'ingrédient correspond au filtre sélectionné
                    if (allRecipes[i].ingredients[u].ingredient.toLowerCase() === selectFilter[f].innerText.toLowerCase()) {
                        checkIngredient = true; // Correspondance trouvée
                    }
                }
                // Incrémente le compteur si un ingrédient correspond
                if (checkIngredient) {
                    recipeTrue++;
                }
            }

            // Vérifie les filtres d'appareils
            if (selectFilter[f].dataset.group === 'appareils') {
                let checkAppareils = false; // Indicateur de correspondance des appareils
                // Vérifie si l'appareil correspond au filtre sélectionné
                if (allRecipes[i].appliance.toLowerCase() === selectFilter[f].innerText.toLowerCase()) {
                    checkAppareils = true; // Correspondance trouvée
                }
                // Incrémente le compteur si un appareil correspond
                if (checkAppareils) {
                    recipeTrue++;
                }
            }

            // Vérifie les filtres d'ustensiles
            if (selectFilter[f].dataset.group === 'ustensils') {
                let checkUstensils = false; // Indicateur de correspondance des ustensiles
                // Vérifie si l'ustensile correspond au filtre sélectionné
                if (allRecipes[i].ustensils.toLowerCase() === selectFilter[f].innerText.toLowerCase()) {
                    checkUstensils = true; // Correspondance trouvée
                }
                // Incrémente le compteur si un ustensile correspond
                if (checkUstensils) {
                    recipeTrue++;
                }
            }
        }

        // Si toutes les conditions des filtres sont remplies, ajoute la recette au tableau
        if (recipeTrue === selectFilter.length) {
            newRecipe.push(allRecipes[i]);
        }
    }
    // Affiche les données des nouvelles recettes filtrées
    displayData(newRecipe);
    // Affiche les filtres appliqués
    displayFilter(newRecipe);
}

// Fonction pour effacer la recherche
function clearSearch(element) {
    // Réinitialise la valeur du champ de recherche
    element.parentNode.parentNode.querySelector("input").value = "";
    // Affiche toutes les recettes après réinitialisation
    displayData(recipes);
    // Réinitialise les filtres affichés
    displayFilter(recipes);
}
