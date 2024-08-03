import axios from "axios";

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWVudGVyMSIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI1NjQ5MTMsImlhdCI6MTcyMjU2MzExM30.LbJTmPJKEqiUJM30DKFAmHNwEpBnRmJe1DZBBROs_LU'; // JWT 토큰을 여기에 삽입하세요.

export const createArtistGroup = async (groupData) => {
    try {
        const data = {
            ...groupData // 나머지 그룹 데이터
        };

        const response = await axios.post(`${API_BASE_URL}/artistgroup`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error creating artist group:', error);
        throw error;
    }
};

export const getAllArtistGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artistgroup`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching artist groups:', error);
        throw error;
    }
};

// 새로운 함수: 모든 아티스트 가져오기
export const getAllArtists = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artists`, { // 아티스트 API 경로에 맞게 수정
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
};