// src/services/entertainmentService.js
import apiClient from './apiClient';

// 엔터테인먼트 계정 생성
export const createEntertainment = async (enterData, token) => {
    try {
        const formData = new FormData();
        formData.append('file', enterData.file);
        formData.append('enterName', enterData.enterName);
        formData.append('enterNumber', enterData.enterNumber);

        const response = await apiClient.post(`/enter`, formData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating entertainment:', error);
        throw error;
    }
};

// 엔터테인먼트 계정 수정
export const updateEntertainment = async (enterName, enterData, token) => {
    try {
        const formData = new FormData();
        formData.append('file', enterData.file);
        formData.append('enterName', enterData.enterName);
        formData.append('enterNumber', enterData.enterNumber);

        const response = await apiClient.patch(`/enter/${enterName}`, formData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating entertainment:', error);
        throw error;
    }
};

// 엔터테인먼트 계정 삭제
export const deleteEntertainment = async (enterName, token) => {
    try {
        const response = await apiClient.delete(`/enter/${enterName}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting entertainment:', error);
        throw error;
    }
};
// 엔터테인먼트 계정 조회
export const getEntertainment = async (token) => {
    try {
        const response = await apiClient.get('/enter/my', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.data; // Adjust based on actual response structure
    } catch (error) {
        console.error('Error fetching entertainment');
        throw error;
    }
};