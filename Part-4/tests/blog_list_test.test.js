const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./blog_testing_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})

    const blogObjects = helper.newBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))

    console.log('saved')
})

test('All blog list are returned in JSON format', async() => {
    const returnedBlogs = await api.get('/api/blogs').expect('content-type', /application\/json/)

    assert.strictEqual(returnedBlogs.body.length, helper.blogs.length)
})

test('id property is available in the document', async() => {
    const response = await api.get('/api/blogs')

    const hasAnIdProperty = response.body.some(blog => blog.id)

    assert(hasAnIdProperty)
})

test.only('Create a new blog post', async() => {
    const newBlog = {
        title: 'A pretty new blog',
        author: "Jess Doe",
        url: "http://www.example.com/blog/23",
        likes: 23
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.newBlogs.length + 1)
    assert(blogsAtEnd[helper.newBlogs.length])
})

after(async() => {
    await mongoose.connection.close()
})