// Version avec boucles natives pour filtrer les recettes en fonction du terme de recherche
function filterBySearch_v1(_recipes, searchTerm) {
  let results = []; // Initialise le tableau des résultats
  // Parcourt le tableau des recettes
  for (let i = 0; i < _recipes.length; i++) {
    let recipe = _recipes[i]; // la recette courante
    // Vérifie si le terme de recherche est inclus dans le titre ou la description de la recette
    if (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      results.push(recipe); // Ajoute la recette aux résultats si correspondance
      continue; // Passe à la recette suivante
    }

    // Parcourt chaque ingrédient de la recette courante
    for (let j = 0; j < recipe.ingredients.length; j++) {
      // Vérifie si le terme de recherche est inclus dans l'ingrédient
      if (
        recipe.ingredients[j].ingredient
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        results.push(recipe); // Ajoute la recette aux résultats si correspondance
        break; // Sort de la boucle d'ingrédients car correspondance trouvée
      }
    }
  }
  return results; // Retourne le tableau des résultats
}