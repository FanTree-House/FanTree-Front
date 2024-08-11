// src/services/entertainmentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/enter';

// 엔터테인먼트 계정 생성
export const createEntertainment = async (enterData, token) => {
    try {
        const formData = new FormData();
        formData.append('file', enterData.file);
        formData.append('enterName', enterData.enterName);
        formData.append('enterNumber', enterData.enterNumber);

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Authorization': `${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating entertainment:', error);
        throw error;
    }
};

// 엔터테인먼트 계정 조회
export const getEntertainment = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/my`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        return response.data.data; // ResponseDataDto 구조에 맞춰 수정
    } catch (error) {
        console.error('Error fetching entertainment:', error);
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

        const response = await axios.patch(`${API_URL}/${enterName}`, formData, {
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
        const response = await axios.delete(`${API_URL}/${enterName}`, {
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