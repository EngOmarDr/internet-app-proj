// src/services/AuthService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const register = async (username, email, password, password_confirmation) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      password_confirmation,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    }, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export default {
  register,
  loginUser,
};
