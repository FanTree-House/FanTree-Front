import apiClient from './apiClient';
const token = window.localStorage.getItem('accessToken');

// 아티스트 계정을 생성하는 함수
export const createArtist = async (artistData) => {
    try {
        const response = await apiClient.post(`/artist`, artistData, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('계정 생성 중 오류가 발생했습니다.');
    }
};

// 아티스트 정보를 가져오는 함수
export const fetchArtistById = async (artistId) => {
    try {
        const response = await apiClient.get(`/artist/${artistId}`, {
            headers: {
                Authorization: `Bearer YOUR_ACCESS_TOKEN`, // 필요에 따라 헤더 설정
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('아티스트 정보를 가져오는 중 오류가 발생했습니다.');
    }
};
