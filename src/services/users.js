
import axios from 'axios';

let token = localStorage.getItem("authToken");
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const getUsers = async (query = '') => {
  try {
    const response = await api.get(`/users?username=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default api;
