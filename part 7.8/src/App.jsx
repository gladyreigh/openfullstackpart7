import { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook for managing form field state
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook for managing resources (fetching and creating)
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Function to fetch resources from the backend
  const fetchResources = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  // Fetch resources when component mounts or baseUrl changes
  useEffect(() => {
    fetchResources()
  }, [baseUrl])

  // Function to create a new resource
  const create = async (newResource) => {
    const response = await axios.post(baseUrl, newResource)
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

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onChange({ target: { value: '' } }) // Clear input after submission
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.onChange({ target: { value: '' } }) // Clear input after submission
    number.onChange({ target: { value: '' } }) // Clear input after submission
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App
