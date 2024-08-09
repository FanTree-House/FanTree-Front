import axios from "axios";

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL

export const createArtistGroup = async (groupData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/artistgroup`, groupData, {
            headers: {
                'Authorization': `${token}`, // 토큰을 헤더에 추가합니다.
                'Content-Type': 'multipart/form-data', // FormData 사용 시 Content-Type을 명시합니다.
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating artist group:', error);
        throw error;
    }
};

export const getAllArtistGroups = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artistgroup`, {
            headers: {
                'Authorization': `${token}`, // 토큰을 헤더에 추가합니다.
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
export const getAllArtists = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artists`, { // 아티스트 API 경로에 맞게 수정
            headers: {
                'Authorization': `${token}`, // 토큰을 헤더에 추가합니다.
            },
            withCredentials: true
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
};