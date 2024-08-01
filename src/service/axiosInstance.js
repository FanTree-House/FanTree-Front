import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // 스프링 백엔드의 기본 URL
    withCredentials: true,
    timeout: 10000, // 응답 대기 시간 설정 (1초에서 10초로 증가)
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;