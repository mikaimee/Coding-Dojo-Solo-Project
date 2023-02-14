const mongoose = require("mongoose")

const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    typeOfQuantity: {
        type: String,
        enum: [
            'Cups',
            'Ounces',
            'Table Spoons',
            'Tea Spoons',
            'Pounds',
            'milligrams',
            'grams',
            'kilograms',
            'millilitres',
            'litres'
        ]
    }
})

const DirectionsSchema = new mongoose.Schema({
    directions: {
        type: String,
        required: true
    },
    pictureGuide: {
        type:String,
        required: false
    }
})


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
        type: [IngredientsSchema], 
        required: [true, "ingredients are required"]
    },
    directions: {
        type: [DirectionsSchema], 
        required: [true, "directions are required"]
    },
    boxArt: {
        type: String, 
        required: [true, "A picture is required"]
    },
    creator : {
        type: String
    },
    likes : {
        type: [String]
    }
}, {timestamps: true})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;