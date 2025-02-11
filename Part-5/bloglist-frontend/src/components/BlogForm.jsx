import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenVisible = { display: formVisible ? 'none': ''}
  const showWhenVisible = { display: formVisible ? '': 'none'}

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setFormVisible(true)}>New Note</button>
      </div>
      <div style={showWhenVisible}>
        <form>
          <label htmlFor='title'>Title: </label>
          <input id='title' type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <br />
          <label htmlFor='author'>Author: </label>
          <input id='author' type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
          <br />
          <label htmlFor='url'>Url: </label>
          <input id='url' type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
          <br />
          <button onClick={addBlog}>Create</button> <br />
          <button onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      </div>
    </>
    )
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  export default BlogForm;