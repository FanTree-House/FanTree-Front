// 엔터 생성 서비스

import axios from 'axios';

// API URL 정의
const API_URL = 'http://localhost:8080/enter';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWVudGVyMSIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI0NzI2MTAsImlhdCI6MTcyMjQ3MDgxMH0.U2LqSA-d0fuuEAzNrotJqWAGNwflfC_7GipqhqG-4v8'; // 직접 입력한 JWT 토큰

// 엔터테인먼트 생성 함수
export const createEntertainment = async (enterData) => {
    try {
        const response = await axios.post(API_URL, enterData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // JWT 토큰 추가
            },
            withCredentials: true // 쿠키를 포함한 요청
        });

        return response.data; // 생성된 데이터 반환
    } catch (error) {
        console.error('Error creating entertainment:', error);
        throw error; // 오류 전달
    }
};