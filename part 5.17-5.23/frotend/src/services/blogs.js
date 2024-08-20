import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

// Set or clear the authorization token
const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
  console.log('Token set:', token); // Log the token for debugging
};

// Login method to get the token
const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get all blogs
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log('API response for getAll:', response.data); // Confirm API response
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a new blog
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('Creating blog with config:', config); // Log config for debugging
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update an existing blog
const update = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('Updating blog with config:', config); // Log the config for debugging
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a blog
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('Removing blog with config:', config); // Log the config for debugging
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (error) {
    console.error('Error deleting blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Like a blog
const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}/like`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error liking blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Unlike a blog
const unlike = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}/like`, config);
    return response.data;
  } catch (error) {
    console.error('Error unliking blog:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a single blog by its ID
const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    console.log('API response for getById:', response.data); // Confirm API response
    return response.data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a comment to a blog
const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('Adding comment with config:', config); // Log the config for debugging
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { content: comment }, config);
    return response.data; // Ensure the backend returns the updated blog object
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  remove,
  like,
  unlike, // Ensure 'unlike' is exported
  setToken,
  login,
  getById,
  addComment,
};
