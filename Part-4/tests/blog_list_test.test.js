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

    const blogObjects = helper.blogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))

    console.log('saved')
})

test('All blog list are returned in JSON format', async() => {
    const returnedBlogs = await api.get('/api/blogs').expect('content-type', /application\/json/)

    assert.strictEqual(returnedBlogs.body.length, helper.blogs.length)
})

test.only('id property is available in the document', async() => {
    const response = await api.get('/api/blogs')

    const hasAnIdProperty = response.body.some(blog => blog.id)

    assert(hasAnIdProperty)
})

after(async() => {
    await mongoose.connection.close()
})