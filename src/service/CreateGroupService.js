import apiClient from './apiClient';

export const createArtistGroup = async (groupData, token) => {
    try {
        const response = await apiClient.post(`/artistgroup`, groupData, {
            headers: {
                'Authorization': `${token}`, // 토큰을 헤더에 추가합니다.
                'Content-Type': 'multipart/form-data', // FormData 사용 시 Content-Type을 명시합니다.
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating artist group:', error);
        throw error;
    }
};

export const getAllArtistGroups = async (token) => {
    try {
        const response = await apiClient.get(`/artistgroup`, {
            headers: { 'Authorization': `${token}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching artist groups:', error);
        throw error;
    }
};

export const updateArtistGroup = async (groupName, groupData, token) => {
    try {
        const response = await apiClient.patch(`/artistgroup/${groupName}`, groupData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating artist group:', error);
        throw error;
    }
};

export const deleteArtistGroup = async (groupName, token) => {
    try {
        const response = await apiClient.delete(`/artistgroup/${groupName}`, {
            headers: { 'Authorization': `${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting artist group:', error);
        throw error;
    }
};


// 새로운 함수: 모든 아티스트 가져오기
export const getAllArtists = async (token) => {
    try {
        const response = await apiClient.get(`/artistgroup/artists`, {
            headers: {
                'Authorization': `${token}`, // 토큰을 헤더에 추가합니다.
            },
            withCredentials: true
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
};