import axios from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constant';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


const refreshToken = async () => {
    const response = await axiosInstance.post(
        '/refresh',
        null,
        { headers: `Bearer ${localStorage.getItem(REFRESH_TOKEN_KEY)}` },
    );
    console.log('-----------------------------------------------------------');
    console.log(response.data);
    console.log('-----------------------------------------------------------');

    return response.data;
};


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest && !originalRequest._retry) {
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
            
            originalRequest._retry = true;
            try {
                console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                const res = await refreshToken();
                console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;

                localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
                localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token)
                console.log('----------------------');

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuu');
                console.log(refreshError);
                console.log('=======-============-------');

                localStorage.removeItem(ACCESS_TOKEN_KEY)
                localStorage.removeItem(REFRESH_TOKEN_KEY)
                return Promise.reject(refreshError);
            }
        }

        // localStorage.removeItem(ACCESS_TOKEN_KEY)
        // localStorage.removeItem(REFRESH_TOKEN_KEY)
        return Promise.reject(error);
    }
);

export default axiosInstance;