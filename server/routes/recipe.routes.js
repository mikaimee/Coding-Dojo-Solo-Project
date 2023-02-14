const RecipeController = require("../controllers/recipe.controller")
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/recipes", RecipeController.createRecipe);
    app.get("/api/recipes", RecipeController.getAllRecipes);
    app.get("/api/recipes/:id", RecipeController.getOneRecipe);
    app.put("/api/recipes/:id", RecipeController.updateRecipe);
    app.delete("/api/recipes/:id", RecipeController.deleteRecipe);
    app.get("/api/getRecipeByUser", RecipeController.getRecipeByUser);
    app.put("/api/recipes/liked/:id", RecipeController.likeRecipe);
    app.put("/api/recipes/unliked/:id", RecipeController.unlikeRecipe);
}