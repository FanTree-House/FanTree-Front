import axios from 'axios';

const BASE_URL = 'http://localhost:8080/artistgroup';

const ArtistGroupService = {
    getArtistGroups: async (groupName = '', page = 0, size = 15) => {
        try {
            const response = await axios.get(`${BASE_URL}/search?groupName=${groupName}&page=${page}&size=${size}`);
            return response.data.data.content; // 아티스트 그룹 리스트 반환
        } catch (error) {
            console.error('Error fetching artist groups:', error);
            throw error; // 에러를 상위로 전달
        }
    },

    getAllArtistGroups: async () => {
        try {
            const response = await axios.get(BASE_URL);
            console.log("consolelog--------", response.data.data);
            return response.data.data; // 모든 아티스트 그룹 목록 반환
        } catch (error) {
            console.error('Error fetching all artist groups:', error);
            throw error;
        }
    }
};

export default ArtistGroupService;
