// src/services/communityApi.js
import apiClient from './apiClient';

// const API_URL = 'http://localhost:8080'; // 기본 URL

const token = window.localStorage.getItem('accessToken');

// 모든 피드 조회
export const fetchAllFeeds = async (groupName) => {
    try {
        const response = await apiClient.get(`/artist/${groupName}/feeds`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });console.log("피드데이터", response)

        return response.data;
    } catch (error) {
        console.error('Error fetching feeds:', error);
        throw error;
    }
};

// 피드 생성
export const createFeed = async (groupName, feedData) => {
    try {
        console.log("폼데이터", feedData.get("file"));
        const response = await apiClient.post(`/artist/${groupName}/feeds`, feedData, {
            headers: {
                Authorization: `${token}`, 'Content-Type': 'multipart/form-data' }
            ,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};

// 피드 선택 조회
export const fetchFeedDetail = async (groupName, feedId) => {
    try {
        const response = await apiClient.get(`/artist/${groupName}/feeds/${feedId}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching feed:', error);
        throw error;
    }
};

// 피드 수정
export const updateFeed = async (groupName, feedId, feedData) => {
    try {
        const response = await apiClient.patch(`/artist/${groupName}/feeds/${feedId}`, feedData, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error updating feed:', error);
        throw error;
    }
};

// 피드 삭제
export const deleteFeed = async (groupName, feedId) => {
    try {
        const response = await apiClient.delete(`/artist/${groupName}/feeds/${feedId}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting feed:', error);
        throw error;
    }
};

// 댓글 조회
export const fetchComments = async (groupName, feedId) => {
    const response = await apiClient.get(`/artist/${groupName}/feeds/${feedId}/comments`, {
        headers: { Authorization: `${token}` },
        withCredentials: true
    });
    return response.data; // 반환된 댓글 데이터
};

// 댓글 생성
export const createComment = async (contents, groupName, feedId) => {
    const data = JSON.stringify({ contents: contents });
    await apiClient.post(`/artist/${groupName}/feeds/${feedId}/comments`, data,{
        headers: { Authorization: `${token}` },
        withCredentials: true
    });
};