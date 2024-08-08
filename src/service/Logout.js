import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const token = window.localStorage.getItem('accessToken'); // JWT 토큰

export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/logout`, {}, {
            headers: {
                'Authorization': `${token}`
            },
            withCredentials: true
        });

        if (response.status === 200) {
            window.localStorage.clear();
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};