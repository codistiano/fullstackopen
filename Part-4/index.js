const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')

mongoose.set('strictQuery', false)

const mongoUrl = process.env.LOCAL_MONGODB_URI

mongoose.connect(mongoUrl)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch(error => {
  console.log('Error connecting to MongoDB:', error.message)
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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
