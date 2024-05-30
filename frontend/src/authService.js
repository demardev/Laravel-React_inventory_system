import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
};

const register = async (name, email, password, password_confirmation) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
    if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
};

const logout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access_token) {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${user.access_token}`
            }
        });
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    }
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
};
