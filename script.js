// script.js

document.getElementById('searchButton').addEventListener('click', onSearch);

function onSearch() {
    const query = document.getElementById('searchField').value;
    searchRecipes(query).then(recipes => {
        const recipeListView = document.getElementById('recipeListView');
        recipeListView.innerHTML = '';

        if (recipes.length > 0) {
            recipes.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe.title;
                li.addEventListener('click', () => displayRecipe(recipe));
                recipeListView.appendChild(li);
            });

            displayRecipe(recipes[0]);
        } else {
            document.getElementById('statusLabel').textContent = 'No recipes found';
        }
    });
}

function displayRecipe(recipe) {
    document.getElementById('nameLabel').textContent = recipe.title;
    document.getElementById('ingredientsTextArea').value = recipe.ingredients.replace(/\|/g, '\n');
    document.getElementById('instructionsTextArea').value = recipe.instructions;
}

async function searchRecipes(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodedQuery}`, {
            headers: { 'X-Api-Key': 'LnElYU9jM73Va5OWZJCdZQ==5yXrmAxbDgN0M4ES' }
        });

        if (!response.ok) {
            throw new Error(`Unexpected code ${response.status}`);
        }

        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error(error);
        document.getElementById('statusLabel').textContent = 'Error fetching recipes';
        return [];
    }
}
