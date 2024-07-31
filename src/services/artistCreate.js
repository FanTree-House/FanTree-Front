import axios from 'axios';

const API_URL = 'http://localhost:8080/artist';

export const createArtist = async (artistName, photo) => {
    const formData = new FormData();
    formData.append('artistName', artistName);
    // formData.append('photo', photo);

    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                headers: { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJBUlRJU1QiLCJzdGF0dXMiOiJBQ1RJVkVfVVNFUiIsImV4cCI6MTcyMjQ0NDI2MSwiaWF0IjoxNzIyNDQyNDYxfQ.2FBbOLbOR-UX4chYXmhAeh5gu1kGmBC9qkCtmvrNKRE" },
                withCredentials: true
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('계정 생성 중 오류가 발생했습니다.');
    }
};
