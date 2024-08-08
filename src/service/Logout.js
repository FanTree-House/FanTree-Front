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
        if (response.status === 200) { // 상태 코드를 체크하도록 수정
            const token = response.headers['authorization']; // 헤더를 올바르게 읽어오기
            window.localStorage.clear();
            return response.data;
        } else {
            throw new Error(response.data.message || '로그아웃 실패');
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};