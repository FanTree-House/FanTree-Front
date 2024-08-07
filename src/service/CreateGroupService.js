import axios from "axios";

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbnRlcjEiLCJhdXRoIjoiRU5URVJUQUlOTUVOVCIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIyOTE5NDM0LCJpYXQiOjE3MjI5MTc2MzR9.HPOprE7SKh8vTR76TtdP45k6EwW5lWcgprtaShlVJX8'; // JWT 토큰을 여기에 삽입하세요.

export const createArtistGroup = async (groupData) => {
    try {

        for (let key of groupData.keys()) {
            console.log(key, ":", groupData.get(key));
        }
        const response = await axios.post(`${API_BASE_URL}/artistgroup`, groupData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            // withCredentials: true
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