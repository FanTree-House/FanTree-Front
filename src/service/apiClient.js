import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://3.34.53.57:8080';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            const expiresAt = window.localStorage.getItem('expiresAt');
            const now = Date.now();

            // AccessToken이 만료되었는지 확인
            if (now >= expiresAt) {
                // RefreshToken을 사용하여 AccessToken 재발급
                return refreshAccessToken().then(newAccessToken => {
                    if (newAccessToken) {
                        config.headers['Authorization'] = `${newAccessToken}`;
                        return config;
                    } else {
                        // 새로 발급받은 AccessToken이 없으면 에러를 던짐
                        return Promise.reject(new Error('Unable to refresh access token'));
                    }
                });
            }
            config.headers['Authorization'] = `${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// AccessToken을 재발급하는 함수
const refreshAccessToken = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error('No refresh token available');
        return null;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/users/refresh`, { headers: {
                'Authorization': accessToken,
                'Refresh_token': refreshToken,
            },
        });
        const newAccessToken = response.data.data;

        if (newAccessToken) {
            window.localStorage.setItem('accessToken', newAccessToken);

            const tokenValue = newAccessToken.split(' ')[1]; // "actual_token" 부분만 추출
            // 새로운 AccessToken의 만료 시간 저장
            const decodedToken = jwtDecode(tokenValue);
            const expiresAt = decodedToken.exp * 1000; // 만료 시간을 밀리초로 변환
            window.localStorage.setItem('expiresAt', expiresAt);

            return newAccessToken;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error.response ? error.response.data : error.message);
    }

    return null;
};

export default apiClient;
