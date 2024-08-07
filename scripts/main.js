// Version avec programmation fonctionnelle pour filtrer les recettes en fonction du terme de recherche
function filterBySearch_v2(_recipes, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Filtre le tableau des recettes
  return _recipes.filter(recipe => {
    // Convertit le nom et la description de la recette en minuscule une seule fois
    const lowerCaseName = recipe.name.toLowerCase();
    const lowerCaseDescription = recipe.description.toLowerCase();

    // Vérifie si le terme de recherche est inclus dans le nom, la description ou les ingrédients de la recette
    return lowerCaseName.includes(lowerCaseSearchTerm) ||
           lowerCaseDescription.includes(lowerCaseSearchTerm) ||
           recipe.ingredients.some(ingredient => {
             const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
             return lowerCaseIngredient.includes(lowerCaseSearchTerm);
           });
  });
}