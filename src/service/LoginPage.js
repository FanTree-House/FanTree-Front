import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const login = async (id, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      id,
      password
    });

    if (response.data.status === 200) {
      // 로그인 성공 시 처리
      // 예: 토큰 저장
      const token = response.headers.get("authorization")
      console.log(token)
      console.log(response.headers['authorization']);
      localStorage.setItem('token', token);
      return response.data;
    } else {
      throw new Error(response.data.message || '로그인 실패');
    }
  } catch (error) {
    // 에러 처리
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