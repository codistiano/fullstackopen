const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

const mongoUrl = config.LOCAL_MONGODB_URI

mongoose.connect(mongoUrl)
.then(() => {
  logger.info('Connected to MongoDB')
})
.catch(error => {
  logger.error('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
