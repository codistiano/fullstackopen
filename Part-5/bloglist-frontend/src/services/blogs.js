import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blogObj) => {
  const config = {
    header: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, create, setToken, addLike, deleteBlog }