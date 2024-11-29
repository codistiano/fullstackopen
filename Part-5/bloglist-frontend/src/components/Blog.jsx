import { useState } from 'react'

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
      {blog.title} - {blog.author} <button onClick={() => setVisible((prev) => !prev)}>{ visible ? 'hide' : 'view'}</button>
      <div>
        <div style={{ display: visible ? '' : 'none'}}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likePlus}>Like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && <button onClick={blogToBeDeleted}>Delete</button>}
        </div>
      </div>
    </div>  
  )
}

export default Blog