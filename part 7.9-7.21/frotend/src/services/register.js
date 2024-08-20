// src/services/register.js
import axios from 'axios';

const baseUrl = '/api/register'; // Ensure this matches your backend route

const register = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.error('Registration service error:', error.response?.data || error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default { register };
