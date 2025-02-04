require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors')
const express = require('express')
const connectDB = require('./config/db')

const recipeRoutes = require('./routes/recipeRoutes')
const Recipe = require('./models/recipeSchema')
const starterRecipes = require('./config/recipe_seed')

const app = express()

connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Backend')
})

app.use('/api/recipes', recipeRoutes)

app.get('/api/seed', async (req, res) => {
    try {
        console.log('Seeding data...')
        await Recipe.deleteMany({})
        let recipeSeedData = await Recipe.create(starterRecipes)

        res.json([
            recipeSeedData,
        ])
    } catch (error) {
        console.log(`Something went wrong loading seed data: ${error.message}`)
    }
})

app.get('*', (req, res) => {
    res.send('Invalid Route: 404')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})