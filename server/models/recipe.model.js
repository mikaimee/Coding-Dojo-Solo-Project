const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    servings: {
        type: Number,
        required: [true, "number of servings is required"]
    },
    timeTaken: {
        type: String,
        required: [true, "time is required"]
    },
    ingredients: {
        type: String, 
        required: [true, "ingredients are required"]
    },
    directions: {
        type: String, 
        required: [true, "directions are required"]
    },
    boxArt: {
        type: String, 
        required: [true, "A picture is required"]
    },
    creator : {
        type: String
    }
}, {timestamps: true})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;