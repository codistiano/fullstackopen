import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  
const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likePlus = () => {
    addLike({
      id: blog.id,
      user: blog.user.id,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const blogToBeDeleted = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} - <span data-testid='blog-author'>{blog.author}</span> <button onClick={() => setVisible((prev) => !prev)}>{ visible ? 'hide' : 'view'}</button>
      <div>
        <div style={{ display: visible ? '' : 'none'}} data-testid='hidden-details'>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likePlus}>Like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && <button onClick={blogToBeDeleted}>Delete</button>}
        </div>
      </div>
    </div>  
  )
}

Blog.propType = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}



export default Blog