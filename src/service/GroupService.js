import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
// 그룹 조회니까 구독한 유저, 그룹에 속해있는 아티스트 토큰
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJVU0VSIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI4NjQ5MjgsImlhdCI6MTcyMjg2MzEyOH0.DuSBAx29AbMYcf531JUjW531xBMzQWQdB63yIAyZQJM'; // JWT 토큰

// 아티스트 그룹 불러오기
export const fetchGroupDetails = async (groupName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artistgroup/${groupName}`);
        return response.data.data; // 응답에서 data 필드에 접근
    } catch (error) {
        console.error('Error fetching group details:', error);
        throw error;
    }
};

// 아티스트 피드 불러오기 (페이지네이션) 5개씩
export const fetchArtistFeeds = async (groupName, page = 0) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${groupName}/feeds?page=${page}`);
        return response.data.data.content;
    } catch (error) {
        console.error('Error fetching artist feeds:', error);
        throw error;
    }
};

// 아티스트 피드 불러오기 1개
export const fetchArtistFeed = async (groupName, artistFeedId) => {
    try {
        const response = await axios.get(`http://localhost:8080/${groupName}/feed/${artistFeedId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data; // ResponseDataDto에서 실제 데이터 반환
    } catch (error) {
        console.error('Error fetching artist feed:', error);
        throw error; // 오류 발생 시 상위로 던짐
    }
};

// 아티스트피드 댓글들 가져오기
export const fetchFeedComments = async (groupName, feedId, page = 0) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${groupName}/feed/${feedId}/comments?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });
        return response.data.data.content;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// 댓글 생성
export const postComment = async (groupName, feedId, newComment) => {
    try {
        await axios.post(`${API_BASE_URL}/${groupName}/feed/${feedId}/comment`, { "contents" : newComment }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

export const getAllArtistGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artistgroup`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching artist groups:', error);
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