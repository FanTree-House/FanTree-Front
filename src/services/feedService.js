import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJBUlRJU1QiLCJzdGF0dXUiOiJBQ1RJVkVfVVNFUiIsImV4cCI6MTcyMjQ4MTk2MywiaWF0IjoxNzIyNDgwMTYzfQ.ieSNrK3uPRyu25LBK0HzFl5uv0wQr0A2xgn59VCaFik'; // JWT 토큰은 실제로 환경 변수 등으로 관리하는 것이 좋습니다

// 피드 생성
export const createFeed = async (groupName, content, image) => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/${groupName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};