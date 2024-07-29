import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Your backend URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token'); // Get the token from localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
