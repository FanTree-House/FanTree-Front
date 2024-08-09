import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL

// 피드 생성 함수
export const createFeed = async (groupName, content, image) => {
    const formData = new FormData();

    // CreateFeedRequestDto를 위한 JSON 객체 생성
    const requestDto = JSON.stringify({ contents: content });

    // requestDto를 Blob으로 변환하여 FormData에 추가
    formData.append('requestDto', new Blob([requestDto], { type: 'application/json' }));

    if (image) {
        formData.append('file', image);
    }

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