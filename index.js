require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors')
const express = require('express')
const connectDB = require('./config/db')
const recipeRoutes = require('./routes/recipeRoutes')

const app = express()

connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Hello Backend')
})

app.use('/api/recipes', recipeRoutes)

// Catch ALL route
app.get('*', (req, res) => {
    res.send('Invalid Route: 404')
})

//Listener
app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})