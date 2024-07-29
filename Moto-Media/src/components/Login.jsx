import api from '../api';

export const login = async (username, password) => {
    try {
        const response = await api.post('token/', { username, password });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.post('token/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
        });
        localStorage.setItem('access_token', response.data.access);
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login'; // Redirect to login page
};

