import axios from 'axios';

const API_URL = 'http://localhost:8080/artist';

export const createArtist = async (artistData) => {
    try {
        const response = await axios.post(`${API_URL}`, artistData, {
            headers: {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzIiwiYXV0aCI6IkFSVElTVCIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIyODU1NDkzLCJpYXQiOjE3MjI4NTM2OTN9.dEJdWmh7cfbVjHdt1wgwe86rqPneVQmvzjPVEIFiKY0"},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error('계정 생성 중 오류가 발생했습니다.');
    }
};
