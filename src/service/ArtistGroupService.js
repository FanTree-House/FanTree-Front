import apiClient from './apiClient';

const ArtistGroupService = {
    // 아티스트 그룹 랭킹
    getArtistGroups: async () => {
        try {
            const response = await apiClient.get(`/artistgroup/ranking`);
            return response.data.data; // 아티스트 그룹 리스트 반환
        } catch (error) {
            console.error('Error fetching artist groups:', error);
            throw error; // 에러를 상위로 전달
        }
    },

    //아티스트 프로필 조회
    getAllArtistGroups: async () => {
        try {
            const response = await apiClient.get('/artistgroup');
            return response.data.data; // 모든 아티스트 그룹 목록 반환
        } catch (error) {
            console.error('Error fetching all artist groups:', error);
            throw error;
        }
    }
};

export default ArtistGroupService;
