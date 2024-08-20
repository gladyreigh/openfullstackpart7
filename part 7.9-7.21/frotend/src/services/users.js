import axios from 'axios';

const baseUrl = '/api/users';

// Get all users
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log('API response for getAll:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a user by ID (if needed in the future)
const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    console.log('API response for getById:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update a user (if needed in the future)
const update = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedUser);
    console.log('API response for update:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a user (if needed in the future)
const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    console.log('User removed successfully');
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default {
  getAll,
  getById,
  update,
  remove,
};
