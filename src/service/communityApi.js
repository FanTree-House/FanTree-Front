// src/services/communityApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/artist'; // 기본 URL

// 모든 피드 조회
export const fetchAllFeeds = async (groupName) => {
    try {
        const response = await axios.get(`${API_URL}/${groupName}/feeds`, {
            headers: { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIiLCJhdXRoIjoiVVNFUiIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIyNDIwMTcxLCJpYXQiOjE3MjI0MTgzNzF9.orupaEiXfJ5j8XpA5pZkoshCXR1s04zRN4nq64b3iFo" },
            withCredentials: true
        });


        return response.data;
    } catch (error) {
        console.error('Error fetching feeds:', error);
        throw error;
    }
};

// 피드 생성
export const createFeed = async (groupName, feedData) => {
    try {
        const response = await axios.post(`${API_URL}/${groupName}/feeds`, feedData);
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};

// 피드 선택 조회
export const fetchFeed = async (groupName, feedId) => {
    try {
        const response = await axios.get(`${API_URL}/${groupName}/feeds/${feedId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feed:', error);
        throw error;
    }
};

// 피드 수정
export const updateFeed = async (groupName, feedId, feedData) => {
    try {
        const response = await axios.patch(`${API_URL}/${groupName}/feeds/${feedId}`, feedData);
        return response.data;
    } catch (error) {
        console.error('Error updating feed:', error);
        throw error;
    }
};

// 피드 삭제
export const deleteFeed = async (groupName, feedId) => {
    try {
        const response = await axios.delete(`${API_URL}/${groupName}/feeds/${feedId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting feed:', error);
        throw error;
    }
};
