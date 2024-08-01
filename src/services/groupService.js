import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
// 그룹 조회니까 구독한 유저, 그룹에 속해있는 아티스트 토큰
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWVudGVyMSIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI1MTk5NjQsImlhdCI6MTcyMjUxODE2NH0.Qix_5EibKflJyu2Efp7s58zFrjXRYNRTx4nsY6W7PvU'; // JWT 토큰

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

// 다른 서비스 함수들도 여기에 추가


export const fetchArtistFeeds = async (groupName, page = 0) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${groupName}/feeds?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching artist feeds:', error);
        throw error;
    }
};

export const subscribeToGroup = async (artistGroupName) => {
    try {
        await axios.post(`${API_BASE_URL}/artistGroup/subscript/${artistGroupName}`);
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};

// 새로 추가된 부분
export const fetchFeedComments = async (feedId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/feeds/${feedId}/comments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const postComment = async (feedId, commentText) => {
    try {
        await axios.post(`${API_BASE_URL}/feeds/${feedId}/comments`, { text: commentText }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

export const likeFeed = async (feedId) => {
    try {
        await axios.post(`${API_BASE_URL}/feeds/${feedId}/like`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error liking feed:', error);
        throw error;
    }
};