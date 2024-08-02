import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('/api/users/login', { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Login failed: ', error);
        throw error;
    }
};