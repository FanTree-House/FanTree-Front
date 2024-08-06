import axios from 'axios';

const API_URL = 'http://localhost:8080/feed';

export const createNotice = async ({title, contents}) => {
    try {
        const response = await axios.post(`${API_URL}/hybe/notice`, {
            title, contents
        }, {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI5NDYwMjMsImlhdCI6MTcyMjk0NDIyM30.3FXuKZ8KHlkVe0z6aH-XLOnDUs7yJExdxrVJE-iurCI"
            } ,withCredentials: true
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('공지사항을 생성하지 못했습니다.');
        }
        return response.data;
    } catch (error) {
        console.error('Error adding notice:', error);
        throw error;
    }
}

export const createSchedule = async ({ title, contents, date  }) => {
    try {
        const response = await axios.post(`${API_URL}/hybe/schedule`, {
                title, contents, date },
            {headers:
                {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI5NDYwMjMsImlhdCI6MTcyMjk0NDIyM30.3FXuKZ8KHlkVe0z6aH-XLOnDUs7yJExdxrVJE-iurCI"
            }, withCredentials: true});
        // if (response.status !== 200 && response.status !== 201) {
        //     throw new Error('일정을 추가하지 못했습니다.');
        // }
        return response.data;
    } catch (error) {
        console.error('Error adding schedule:', error);
        throw error;
    }
};


export const fetchNotices = async () => {
    try {
        const response = await axios.get(`${API_URL}/hybe/notice`);
        console.log('Server response data:', response.data); // 응답 데이터 확인
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && typeof response.data === 'object') {
            // 응답이 객체인 경우, 적절한 키를 찾아 반환
            const noticesArray = response.data.notices || response.data.data || [];
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

export const fetchSchedule = async () => {
    try {
        const response = await axios.get(`${API_URL}/hybe/schedule`);
        console.log(response.data); console.log(Array.isArray(response.data.data)); console.log(typeof response.data);
        if (Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.warn('Schedule data is not an array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return [];
    }
};
