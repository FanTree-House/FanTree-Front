import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 API의 기본 URL
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJBUlRJU1QiLCJzdGF0dXMiOiJBQ1RJVkVfVVNFUiIsImV4cCI6MTcyMjU3MTcxMiwiaWF0IjoxNzIyNTY5OTEyfQ.iyXjTXLNSGtIW_XY4tLu2MTKIjBLHaCd9llgoUDaRrc';

// 피드 생성
export const createFeed = async (groupName, content, image) => {
    const formData = new FormData();
    formData.append('contents', content);
    if (image) {
        formData.append('postPicture', image);
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/${groupName}`, formData, { // API 경로 수정
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