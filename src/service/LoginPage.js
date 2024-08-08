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

// 소셜 로그인을 위한 추가 함수들
export const kakaoLogin = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/kakao`, { token });
    // 응답 처리
    return response.data;
  } catch (error) {
    console.error('Kakao login error:', error);
    throw error;
  }
};