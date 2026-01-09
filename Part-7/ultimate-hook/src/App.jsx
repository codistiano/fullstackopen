import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    reset: () => setValue('')
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(res => {
      setResources(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const { reset: contentReset, ...contentProps } = content;
  const { reset: nameReset, ...nameProps } = name;
  const { reset: numberReset, ...numberProps } = number;

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    contentReset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    nameReset()
    numberReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentProps} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameProps} /> <br/>
        number <input {...numberProps} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App