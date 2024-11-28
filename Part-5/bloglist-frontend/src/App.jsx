import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css';
import BlogForm from './components/BlogForm.';

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

  const createBlog = async (blogObject) => {
    
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
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

      {user && <BlogForm createBlog={createBlog} />}
      
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App