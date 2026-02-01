import axios from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constant';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


const refreshToken = async () => {
    const response = await axios.post(
        '/refresh',
        undefined,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN_KEY)}`,
            },
        },
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
        console.log(error, 'errror from request');

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await refreshToken();

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;

                localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
                localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token)

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                alert(`${refreshError} from axsio.js`);
                if (refreshError.response?.status === 401) {

                    localStorage.removeItem(ACCESS_TOKEN_KEY)
                    localStorage.removeItem(REFRESH_TOKEN_KEY)
                    // navigate('/login'); // Redirect to login
                }

                return Promise.reject(refreshError);
            }
        }

        // localStorage.removeItem(ACCESS_TOKEN_KEY)
        // localStorage.removeItem(REFRESH_TOKEN_KEY)
        return Promise.reject(error);
    }
);

export default axiosInstance;