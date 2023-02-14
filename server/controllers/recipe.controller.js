const Recipe = require("../models/recipe.model")
jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    createRecipe: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET)
        Recipe.create({...req.body, creator: user._id})
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

    getRecipeByUser: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET)
        Recipe.find({creator: user._id})
            .then((recipeFromUser) => {
                console.log(recipeFromUser)
                res.json(recipeFromUser)
            })
            .catch((err) => {
                console.log(err)
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
    },

    likeRecipe: (req, res) => {
        Recipe.findOneAndUpdate({_id: req.params.id}, 
            req.body, 
            {new:true, runValidators: true})
            .then((likeRecipe) => {
                res.json(likeRecipe)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    unlikeRecipe: (req, res) => {
        Recipe.findOneAndUpdate({_id: req.params.id}, 
            req.body, 
            {new:true, runValidators: true})
            .then((unlikeRecipe) => {
                console.log(unlikeRecipe)
                res.json(unlikeRecipe)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    }
};