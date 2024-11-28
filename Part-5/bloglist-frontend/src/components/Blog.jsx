import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={() => setVisible((prev) => !prev)}>{ visible ? 'hide' : 'view'}</button>
      <div>
        <div style={{ display: visible ? '' : 'none'}}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likePlus}>Like</button></p>
          <p>{blog.user.name}</p>
        </div>
      </div>
    </div>  
  )
}

export default Blog