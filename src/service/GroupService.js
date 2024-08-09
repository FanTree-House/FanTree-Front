import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
// 그룹 조회니까 구독한 유저, 그룹에 속해있는 아티스트 토큰
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbnRlcjEiLCJhdXRoIjoiRU5URVJUQUlOTUVOVCIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIzMTg1MDExLCJpYXQiOjE3MjMxODMyMTF9.M-xN85od-smGgNbyLYIFxI9T7fViurQL1FHpw4IykEs'; // JWT 토큰

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

// 좋아요 수 반환
export const fetchFeedLikes = async (groupName, artistFeedId) => {
    const response = await axios.get(`${API_BASE_URL}/${groupName}/feed/${artistFeedId}/likes`);
    return response.data; // 서버에서 반환된 좋아요 수
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

// 현재 그룹에 대한 구독 여부
export const getIsSubscribed = async (groupName) => {
    const response = await axios.get(`${API_BASE_URL}/artistGroup/subscript/${groupName}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    });
    return response.data;
};

// 좋아요 여부
export const getIsLiked = async (groupName, artistFeedId) => {
    const response = await axios.get(`${API_BASE_URL}/${groupName}/feed/${artistFeedId}/check`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    });
    return response.data;
};

// 구독하기
export const subscribeToGroup = async (groupName) => {
    try {
        await axios.post(`${API_BASE_URL}/artistGroup/subscript/${groupName}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};

// 구독 취소
export const cancelSubscribe = async (groupName) => {
    try {
        await axios.delete(`${API_BASE_URL}/artistGroup/subscript/${groupName}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};

// 좋아요 or 좋아요 취소
export const likeFeed = async (groupName, artistFeedId) => {
    try {
        await axios.post(`${API_BASE_URL}/${groupName}/feed/${artistFeedId}`,{}, {
            headers: { Authorization:  `Bearer ${token}` },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error liking feed:', error);
        throw error;
    }
};