import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWVudGVyMSIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI0ODA2MTgsImlhdCI6MTcyMjQ3ODgxOH0.OszWV0AD7r2_JXpTJLroQEcCthJhmscoGrHbF_l48wg'; // JWT 토큰, 실제로는 환경 변수 등으로 관리하는 것이 좋습니다

// 엔터 네임 가져오기
export const fetchEnterName = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/enterName`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.enterName;
    } catch (error) {
        console.error('Error fetching enter name:', error);
        throw error;
    }
};

// 아티스트 그룹 생성
export const createArtistGroup = async (enterName, groupData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/entertainments/${enterName}`, groupData, {
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

export const fetchGroupDetails = async (enterName, groupName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/entertainments/${enterName}/groups/${groupName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching group details:', error);
        throw error;
    }
};

// 모든 아티스트 그룹 가져오기
export const getAllArtistGroups = async (enterName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/entertainments/${enterName}/groups`);
        return response.data;
    } catch (error) {
        console.error('Error fetching artist groups:', error);
        throw error;
    }
};


// 아티스트 게시글 가져오기
export const fetchArtistFeeds = async (groupName, page = 0) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${groupName}/feeds?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching artist feeds:', error);
        throw error;
    }
};

// 구독 처리
export const subscribeToGroup = async (artistGroupName) => {
    try {
        await axios.post(`${API_BASE_URL}/artistGroup/subscript/${artistGroupName}`);
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};