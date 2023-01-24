const Recipe = require("../models/recipe.model")

module.exports = {
    createRecipe: (req, res) => {
        Recipe.create(req.body)
            .then((newRecipe) => {
                res.json({newRecipe})
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getAllRecipes: (req, res) => {
        Recipe.find({})
            .then((allRecipes) => {
                console.log(allRecipes);
                res.json(allRecipes);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getOneRecipe: (req, res) => {
        Recipe.findOne({_id: req.params.id})
            .then((oneRecipe) => {
                console.log(oneRecipe);
                res.json(oneRecipe);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    updateRecipe: (req, res) => {
        Recipe.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        )
            .then((updatedRecipe) => {
                console.log(updatedRecipe);
                res.json(updatedRecipe);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    deleteRecipe: (req, res) => {
        Recipe.deleteOne({_id: req.params.id})
            .then((deletedRecipe) => {
                console.log(deletedRecipe);
                res.json(deletedRecipe);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    }
};