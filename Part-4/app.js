const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info("Connected to the Database")
})
.catch((err) => {
    logger.error("Could not connect to the Database", err)
})

app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogsRouter)

module.exports = app
