const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})
  
blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user.id,
  })
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.status(201).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(
    req.params.id,
    blog,
    { new: true }
  )
  res.end()
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === user.id.toString()) {
    delete blog
  } else {
    return res.status(404).json({ error: "An Error Occurred while try to delete a blog" })
  }
  

  console.log(user)
  console.log(blog)

  // const blogToBeDeleted = await Blog.findByIdAndDelete(req.params.id)
  // return res.status(204).end()
})

module.exports = blogsRouter;