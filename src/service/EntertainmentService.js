// src/services/entertainmentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/enter';

export const createEntertainment = async (enterData, token) => {
    try {
        const formData = new FormData();
        formData.append('file', enterData.file);
        formData.append('enterName', enterData.enterName);
        formData.append('enterNumber', enterData.enterNumber);

        const response = await axios.post(API_URL, formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `${token}` // 여기에 토큰을 사용합니다
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating entertainment:', error);
        throw error;
    }
};