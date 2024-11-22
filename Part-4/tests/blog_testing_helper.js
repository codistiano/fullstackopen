const Blog = require('../models/blog')
const User = require('../models/user')

const newBlogs = [
  {
    title: "This is a blog post",
    author: "John Doe",
    url: "https://www.example.com/blog/1",
    likes: 10,
  },
  {
    title: "Another blog post",
    author: "Jane Doe",
    url: "https://www.example.com/blog/2",
    likes: 5,
  },
  {
    title: "Last blog post",
    author: "Bob Smith",
    url: "https://www.example.com/blog/3",
    likes: 0,
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async() => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  newBlogs,
  blogsInDb,
  usersInDb
};
