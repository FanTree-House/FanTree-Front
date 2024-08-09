// src/service/LoginPage.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const login = async (id, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { id, password });

    if (response.status === 200) { // 상태 코드 체크
      const accessToken = response.headers['authorization']; // 헤더에서 'authorization'를 읽어옴
      const refreshToken = response.headers['refresh_token']; // 헤더에서 'refresh_token'을 읽어옴

      if (accessToken && refreshToken) {
        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);

        // 사용자 정보를 포함하여 로컬 스토리지에 저장
        window.localStorage.setItem('user', JSON.stringify({
          user: response.data.userId,
          userRole: response.data.userRole,
        }));
      } else {
        throw new Error('토큰이 응답에 없습니다.');
      }

      return response.data;
    } else {
      throw new Error(response.data.message || '로그인 실패');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};