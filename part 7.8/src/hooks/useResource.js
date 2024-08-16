// /src/hooks/useResource.js
import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Function to fetch resources from the backend
  const fetchResources = async () => {
    try {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.error('Error fetching resources:', error)
    }
  }

  // Fetch resources when component mounts or baseUrl changes
  useEffect(() => {
    fetchResources()
  }, [baseUrl])

  // Function to create a new resource
  const create = async (newResource) => {
    try {
      const response = await axios.post(baseUrl, newResource)
      setResources(resources.concat(response.data))
    } catch (error) {
      console.error('Error creating resource:', error)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource
