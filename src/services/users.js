// services/api.js
import axios from 'axios';

// ضبط التكوين الأساسي لـ Axios
let token = localStorage.getItem("authToken");
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// دالة للحصول على قائمة المستخدمين
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
