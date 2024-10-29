// utils/api.js

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.response.use(
  response => response,
  error => {
    const message = error.response ? error.response.data.message : "Network Error";
    return Promise.reject(new Error(message));
  }
);

export default axios;
