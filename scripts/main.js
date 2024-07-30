// Version avec programmation fonctionnelle pour filtrer les recettes en fonction du terme de recherche
function filterBySearch_v2(recipes, searchTerm) {
    // Filtre le tableau des recettes
    return recipes.filter(recipe => {
      // Vérifie si le terme de recherche est inclus dans le titre ou la description de la recette
      return recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
             // Vérifie si le terme de recherche est inclus dans l'un des ingrédients de la recette
             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase()));
    });
}  