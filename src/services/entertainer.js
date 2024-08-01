import axios from 'axios';

const API_URL = 'http://localhost:8080/feed';

//
// title,
//     contents,
//     date
export const createNotice = async ({title, contents}) => {

    try {
        const response = await axios.post(`${API_URL}/hybe/notice`, {
            title, contents
        }, {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbnRlcjEiLCJhdXRoIjoiRU5URVJUQUlOTUVOVCIsInN0YXR1cyI6IkFDVElWRV9VU0VSIiwiZXhwIjoxNzIyNTIyMDI2LCJpYXQiOjE3MjI1MjAyMjZ9.ARg6g7SflfyjGfIQgt60iqeo0VTuHEPM1ZHqN7ssy10"
            } ,withCredentials: true
        });
        // if (response.status !== 200 && response.status !== 201) {
        //     throw new Error('공지사항을 생성하지 못했습니다.');
        // }
        return response.data;
    } catch (error) {
        console.error('Error adding notice:', error);
        throw error;
    }
}

export const fetchNotices = async () => {
    try {
        const response = await axios.get(`${API_URL}/hybe/notice`);
        console.log('Fetched notices data:', response.data); // 전체 응답 데이터 로그
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && typeof response.data === 'object') {
            // 응답이 객체인 경우, 적절한 키를 찾아 반환
            const noticesArray = response.data.notices || response.data.data || [];
            console.log('Extracted notices array:', noticesArray);
            return noticesArray;
        } else {
            console.warn('Unexpected data format:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching notices:', error);
        throw error;
    }
};

export const fetchSchedule = async (enterName) => {
    try {
        const response = await axios.get(`${API_URL}/hybe/schedule`);
        // 응답 데이터가 배열인지 확인 후 반환
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.warn('Schedule data is not an array:', response.data);
            return []; // 배열이 아닌 경우 빈 배열 반환
        }
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return [];
    }
};

