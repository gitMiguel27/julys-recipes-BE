const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipeSchema')

router.get('/', async (req, res) => {
    try {
        let allRecipes = await Recipe.find({})

        res.json(allRecipes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        let createdRecipe = await Recipe.create(req.body)
        res.status(201).json(createdRecipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//         let singleRecipe = await Recipe.findById(req.params.id)
//         res.json(singleRecipe)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// })

router.put('/:id', async (req, res) => {
    try {
        let updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (updatedRecipe == null) {
            return res.status(404).json({ error: 'Cannot find user' })
        }
        res.json(updatedRecipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Deleted Recipe' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router