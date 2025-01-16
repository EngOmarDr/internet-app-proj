
import axios from 'axios';
import { accessToken } from '../utils/constant';
import axiosInstance from "../utils/axios";

let token = localStorage.getItem(accessToken);
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

export const fetchUserOperations = async (groupId, userId) => {
  try {
      const response = await axiosInstance.get(`/groups/${groupId}/users/${userId}/operations`);
      return response.data;
  } catch (error) {
      console.error('Error fetching user operations:', error);
      throw error;
  }
};

export default api;
