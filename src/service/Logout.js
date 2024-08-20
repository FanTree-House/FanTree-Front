import axios from 'axios';

const API_BASE_URL = 'http://3.34.53.57:8080';
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
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('expiresAt');
            window.localStorage.removeItem('user');
            return response.data;
        } else {
            throw new Error(response.data.message || '로그아웃 실패');
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};