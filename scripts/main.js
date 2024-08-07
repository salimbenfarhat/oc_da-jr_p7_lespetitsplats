/*
Sources de données pour les trois filtres.
Ces listes vont changer lors du filtrage des recettes, et servent de base lors du filtrage dans chacune des listes.
*/
let ingredients = [];
let appliances = [];
let utensils = [];

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

// Filtrer les recettes en fonction des ingrédients sélectionnés
function filterByIngredients(_recipes) {
  const filterIngredients = Array.from(
    document
      .getElementById("ingredientsDropdown")
      .querySelector(`[data-list="ingredientsSelectedList"]`).children
  ).map((a) => a.textContent);

  for (let i = 0; i < filterIngredients.length; i++) {
    for (let j = _recipes.length - 1; j >= 0; j--) {
      let contains = false;
      for (let k = 0; k < _recipes[j].ingredients.length; k++) {
        if (_recipes[j].ingredients[k].ingredient === filterIngredients[i]) {
          contains = true;
          break;
        }
      }
      if (!contains) {
        _recipes.splice(j, 1);
      }
    }
  }

  return _recipes;
}

// Filtrer les recettes en fonction des appareils sélectionnés
function filterByAppliances(_recipes) {
  const filterAppliances = Array.from(
    document
      .getElementById("appliancesDropdown")
      .querySelector(`[data-list="appliancesSelectedList"]`).children
  ).map((a) => a.textContent);

  for (let i = 0; i < filterAppliances.length; i++) {
    for (let j = _recipes.length - 1; j >= 0; j--) {
      if (_recipes[j].appliance !== filterAppliances[i]) {
        _recipes.splice(j, 1);
      }
    }
  }

  return _recipes;
}

// Filtrer les recettes en fonction des ustensiles sélectionnés
function filterByUtensils(_recipes) {
  const filterUstensils = Array.from(
    document
      .getElementById("utensilsDropdown")
      .querySelector(`[data-list="utensilsSelectedList"]`).children
  ).map((a) => a.textContent);
  for (let i = 0; i < filterUstensils.length; i++) {
    for (let j = _recipes.length - 1; j >= 0; j--) {
      if (!_recipes[j].ustensils.includes(filterUstensils[i])) {
        _recipes.splice(j, 1);
      }
    }
  }

  return _recipes;
}

// Afficher les recettes filtrées
function displayRecipes(_recipes, searchTerm = "") {
  const totalRecipes = document.getElementById("totalRecipes");
  const container = document.getElementById("recipes");
  const template = document.getElementById("recipeCard");

  container.innerHTML = "";
  // Mise à jour du nombre total de recettes dans le DOM
  totalRecipes.textContent =
    _recipes.length === 1 ? `1 recette` : `${_recipes.length} recettes`;
  if (_recipes.length === 0) {
    const noRecipes = document.createElement("p");
    noRecipes.setAttribute("id", "no-recipes");
    noRecipes.innerHTML = `Aucune recette ne contient <b><u>${searchTerm}</u></b>. Vous pouvez chercher <b>tarte aux pommes</b>, <b>poisson</b>, etc.`;
    container.appendChild(noRecipes);
  } else {
    // Mise à jour des recettes affichées sous forme de card
    _recipes.forEach((recipe) => {
      // Cloner le template pour chaque nouvelle recette
      const clone = template.content.cloneNode(true);
      // Injecter les informations de la recette dans le template
      clone.querySelector(
        ".card-img-top"
      ).src = `./assets/img/Recettes/Resized/${recipe.image}`;
      clone.querySelector(".card-img-top").alt = recipe.name;
      clone.querySelector(".badge").textContent = `${recipe.time} min`;
      clone.querySelector(".card-title").textContent = recipe.name;
      clone.querySelector(".card-text").textContent = recipe.description;
      const ingredientsListElement = clone.querySelector("#ingredientsList");
      // Parcourir les ingrédients
      recipe.ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        // Afficher les informations de l'ingrédient
        listItem.innerHTML = `${
          ingredient.ingredient
        } <span class="ingredient-quantity">${ingredient.quantity || ""} ${
          ingredient.unit || ""
        }</span>`;
        ingredientsListElement.appendChild(listItem);
      });
      container.appendChild(clone);
    });
  }
}

// Extraire les ingrédients disponibles des recettes affichées
function extractIngredients(_recipes) {
  const filterIngredients = Array.from(
    document
      .getElementById("ingredientsDropdown")
      .querySelector(`[data-list="ingredientsSelectedList"]`).children
  ).map((a) => a.textContent);

  let ingredients = [];
  _recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (
        !ingredients.includes(ingredient.ingredient) &&
        !filterIngredients.includes(ingredient.ingredient)
      ) {
        ingredients.push(ingredient.ingredient);
      }
    });
  });
  return ingredients;
}

// Extraire les appareils disponibles des recettes affichées
function extractAppliances(_recipes) {
  const filterAppliances = Array.from(
    document
      .getElementById("appliancesDropdown")
      .querySelector(`[data-list="appliancesSelectedList"]`).children
  ).map((a) => a.textContent);

  let appliances = [];
  _recipes.forEach((recipe) => {
    if (
      !appliances.includes(recipe.appliance) &&
      !filterAppliances.includes(recipe.appliance)
    ) {
      appliances.push(recipe.appliance);
    }
  });
  return appliances;
}

// Extraire les ustensiles disponibles des recettes affichées
function extractUtensils(_recipes) {
  const filterUtensils = Array.from(
    document
      .getElementById("utensilsDropdown")
      .querySelector(`[data-list="utensilsSelectedList"]`).children
  ).map((a) => a.textContent);

  let utensils = [];
  _recipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      if (!utensils.includes(utensil) && !filterUtensils.includes(utensil)) {
        utensils.push(utensil);
      }
    });
  });
  return utensils;
}

// Fonction principale de filtrage des recettes
function filterRecipes() {
  let _recipes = [...recipes];
  const searchTerm = document.querySelector("#searchbar input").value;

  // Choisir la méthode de filtrage (mettre true pour utiliser les boucles natives)
  const useNativeLoops = false; // ou false pour la version fonctionnelle

  if (searchTerm && searchTerm.trim().length > 2) {
    if (useNativeLoops) {
      console.error(
        "La fonction filterBySearch_v1 n'est pas disponible. Veuillez la récupérer depuis la branche option-1."
      );
    } else {
      _recipes = filterBySearch_v2(_recipes, searchTerm.toLowerCase());
    }
  }

  _recipes = filterByIngredients(_recipes);
  _recipes = filterByAppliances(_recipes);
  _recipes = filterByUtensils(_recipes);
  // filtrer quand on a selectionner des ing etc...

  ingredients = extractIngredients(_recipes);
  displayFilter("ingredients", ingredients);

  appliances = extractAppliances(_recipes);
  displayFilter("appliances", appliances);

  utensils = extractUtensils(_recipes);
  displayFilter("utensils", utensils);

  displayRecipes(_recipes, searchTerm);
}

// Filtrer la liste des filtres en fonction du terme de recherche
function searchFilterList(type, initialData, searchValue) {
  searchValue = searchValue.toLowerCase();
  let _data = [];
  for (let i = 0; i < initialData.length; i++) {
    if (initialData[i].toLowerCase().indexOf(searchValue) >= 0) {
      _data.push(initialData[i]);
    }
  }
  displayFilter(type, _data);
}

// Supprimer un élément de la liste des filtres sélectionnés
function removeItemFromList(type, itemText) {
  const selectedList = document.querySelectorAll(
    `[data-list="${type}SelectedList"] li`
  );
  selectedList.forEach((item) => {
    if (item.textContent === itemText) {
      item.remove();
    }
  });

  const badgesContainer = document.getElementById("badgesContainer");
  badgesContainer.querySelectorAll(".badge").forEach((badge) => {
    if (badge.querySelector("span").textContent === itemText) {
      badge.remove();
    }
  });

  filterRecipes();
}

// Afficher les filtres disponibles dans la liste des filtres
function displayFilter(type, _data) {
  const filterMainContainer = document
    .getElementById(type + "Dropdown")
    .querySelector(`[data-list="${type}MainList"]`);

  filterMainContainer.innerHTML = "";
  for (let i = 0; i < _data.length; i++) {
    const li = document.createElement("li");
    li.textContent = _data[i];
    li.addEventListener("click", () => {
      toggleDropdownVisibility(type + "Dropdown");

      // add item to top of list
      const selectedList = document
        .getElementById(type + "Dropdown")
        .querySelector(`[data-list="${type}SelectedList"]`);
      const badgesContainer = document.getElementById("badgesContainer");
      const selectedLi = document.createElement("li");
      selectedLi.textContent = _data[i];
      selectedLi.classList.add("selected");

      const closeIcon = document.createElement("img");
      closeIcon.src = "./assets/icons/close-2.svg";
      closeIcon.classList.add("close-icon");
      closeIcon.addEventListener("click", () => {
        removeItemFromList(type, _data[i]);
        toggleDropdownVisibility(type + "Dropdown");
      });
      selectedLi.appendChild(closeIcon);
      selectedList.appendChild(selectedLi);
      // add item tag
      const badge = document.createElement("span");
      badge.classList.add("badge");

      const badgeText = document.createElement("span");
      badgeText.textContent = _data[i];
      const closeSvg = document.createElement("img");
      closeSvg.src = "./assets/icons/close.svg";
      closeSvg.addEventListener("click", () => {
        removeItemFromList(type, _data[i]);
      });

      badge.appendChild(badgeText);
      badge.appendChild(closeSvg);
      badgesContainer.appendChild(badge);

      filterRecipes();
    });
    filterMainContainer.appendChild(li);
  }
}

// Basculer l'icône de flèche pour les dropdowns
function toggleArrowIcon(button) {
  const arrow = button.querySelector(".arrow svg");
  arrow.classList.toggle("rotate180");
}

// Afficher ou masquer les dropdowns list
function toggleDropdownVisibility(dropdownId) {
  const dropdownElement = document.getElementById(dropdownId);
  const isHidden = dropdownElement.classList.contains("d-none");
  const button = document.querySelector(
    `[data-btn="${dropdownId.replace("Dropdown", "")}"]`
  );

  if (isHidden) {
    dropdownElement.classList.replace("d-none", "d-block");
  } else {
    dropdownElement.classList.replace("d-block", "d-none");
  }

  toggleArrowIcon(button);
}

// Ajouter des écouteurs d'événements pour les dropdowns
function attachDropdownListeners() {
  // Boutons de dropdown pour ingrédients, appareils et ustensiles
  const dropdownButtons = document.querySelectorAll("[data-btn]");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownType = this.getAttribute("data-btn");
      const dropdownId = dropdownType + "Dropdown";
      toggleDropdownVisibility(dropdownId);
    });
  });
}

// Initialiser les événements de l'interface utilisateur
function initEvents() {
  const searchBar = document.querySelector("#searchbar");
  const searchInput = searchBar.querySelector("input");

  searchInput.addEventListener("input", filterRecipes);

  const ingredientFilterSearch = document.getElementById("ingredients");
  ingredientFilterSearch.addEventListener("input", () => {
    searchFilterList("ingredients", ingredients, ingredientFilterSearch.value);
  });

  const applianceFilterSearch = document.getElementById("appliances");
  applianceFilterSearch.addEventListener("input", () => {
    searchFilterList("appliances", appliances, applianceFilterSearch.value);
  });

  const utensilFilterSearch = document.getElementById("utensils");
  utensilFilterSearch.addEventListener("input", () => {
    searchFilterList("utensils", utensils, utensilFilterSearch.value);
  });

  attachDropdownListeners();
}

// Initialiser l'application
function init() {
  initEvents();
  filterRecipes();
}

// Appel de la fonction d'initialisation après chargement du DOM
window.addEventListener("DOMContentLoaded", init);