const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    ingredients: {
        type: String,
        require: true
    },
    instructions: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Recipe', recipeSchema)