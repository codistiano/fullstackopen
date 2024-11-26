const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body

  const user = req.user

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid'})
  }

  const userData = await User.findById(decodedToken.id)
  if (!userData) return res.status(404).json({ error: 'User not found' })
  
  const blog = new Blog({
    url: body.url,
    user: user,
    title: body.title,
    author: body.author,
    likes: body.likes || 0
  })

  if (!blog.user) {
    return res.status(400).json({ error: 'User ID is missing' });
  }

  
  const savedBlog = await blog.save()

  userData.blogs = userData.blogs.concat(savedBlog._id)
  await userData.save()
  res.status(201).json(savedBlog)
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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid'})
  }

  const userData = await User.findById(decodedToken.id)
  if (!userData) return res.status(404).json({ error: 'User not found' })

  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== userData.id.toString()) {
    console.log(blog.user.toString(), "========", userData.id.toString())
    return res.status(401).json({ error: 'Not authorized to delete this blog' })
  }
  
  await Blog.findByIdAndDelete(req.params.id)
  return res.status(204).end()
})

module.exports = blogsRouter;