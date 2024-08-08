import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn('No token found in localStorage');
            return false;
        }

        const response = await axios.post(`${API_BASE_URL}/users/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            localStorage.removeItem('token');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};