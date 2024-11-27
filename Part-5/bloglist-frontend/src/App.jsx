import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css';

const Notification = ({ message, type })  => {
  if (message === '') {
    return null
  }
  return (
    <div className="notification" style={{ backgroundColor: type === 'error'? 'red' : 'green' }}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })
  
  useEffect(() => {
    const blogs = blogService.getAll()
    .then((blogs) => {
      setBlogs( blogs )
    })
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedInAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({message: "Logged In Successfully", type: "success"})
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 3000)
    } catch (error) {
      console.log(error)
      setNotification({message: "Wrong Username and Period", type: "error"})
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const createBlog = async (e) => {
    e.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const newBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotification({message: "Created a blog successfully", type: "success"})
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    } catch (error) {
      console.log(error)
      setNotification({message: "Error Creating Blog", type: "error"})
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 3000)
    }
  }
  
  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInAppUser')
    setUser(null)
    setNotification({message: "Logged Out Successfully", type: "success"})
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <h2>Log in to application</h2>
        <form>
          <label>Username:</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input value={password} onChange={e => setPassword(e.target.value)} />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      <br />
      <h2>Create New</h2>
      <form>
        <label>Title: </label>
        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <br />
        <label>Author: </label>
        <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
        <br />
        <label>Url: </label>
        <input type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
        <br />
        <button onClick={createBlog}>Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App