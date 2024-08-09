import axios from 'axios';
const token = window.localStorage.getItem('accessToken');
// 기본 API URL 설정
const API_URL = 'http://localhost:8080/artist';

// 아티스트 계정을 생성하는 함수
export const createArtist = async (artistData) => {
    try {
        const response = await axios.post(API_URL, artistData, {
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
        const response = await axios.get(`${API_URL}/${artistId}`, {
            headers: {
                Authorization: `Bearer YOUR_ACCESS_TOKEN`, // 필요에 따라 헤더 설정
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('아티스트 정보를 가져오는 중 오류가 발생했습니다.');
    }
};
