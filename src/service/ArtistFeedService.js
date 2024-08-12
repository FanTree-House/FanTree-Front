import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL

// 아티스트의 그룹 이름을 가져오는 함수
export const getArtistGroupName = async () => {
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_BASE_URL}/artist/group`, {
            headers: {
                'Authorization': `${token}` // 토큰을 Bearer 형식으로 추가
            },
        });
        return response.data.data; // 그룹 이름 반환
    } catch (error) {
        console.error('Error fetching artist group name:', error);
        throw error;
    }
};

// 피드 생성 함수
export const createFeed = async (groupName, content, images) => {
    const formData = new FormData();

    // CreateFeedRequestDto를 위한 JSON 객체 생성
    const requestDto = JSON.stringify({ contents: content });

    // requestDto를 Blob으로 변환하여 FormData에 추가
    formData.append('requestDto', new Blob([requestDto], { type: 'application/json' }));

    images.forEach((image, index) => {
        formData.append(`file${index}`, image); // 여러 파일을 위한 키 이름을 다르게 설정
    });

    // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await axios.post(`${API_BASE_URL}/${groupName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}` // 토큰을 Bearer 형식으로 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};

// 아티스트의 피드를 가져오는 함수
export const getArtistFeed = async () => {
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`/${groupName}/feed/${artistFeedId}`, {
            headers: {
                'Authorization': `${token}` // 토큰을 Bearer 형식으로 추가
            },
        });
        return response.data.data; // 그룹 이름 반환
    } catch (error) {
        console.error('Error fetching artist group name:', error);
        throw error;
    }
};

// 피드 업데이트 함수
export const updateFeed = async (groupName, artistFeedId, formData) => {
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await axios.patch(`${API_BASE_URL}/${groupName}/feed/${artistFeedId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating feed:', error);
        throw error;
    }
};

// 피드 삭제 함수
export const deleteFeed = async (groupName, artistFeedId) => {
    const token = window.localStorage.getItem('accessToken'); // Add this line

    try {
        await axios.delete(`${API_BASE_URL}/${groupName}/feed/${artistFeedId}`, {
            headers: {
                'Authorization': `${token}` // Fix here
            },
        });
    } catch (error) {
        console.error('Error deleting feed:', error);
        throw error;
    }
};