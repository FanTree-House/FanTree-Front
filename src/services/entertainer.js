import axios from 'axios';

const API_URL = 'http://localhost:8080/feed';

export const createNotice = async ({title, contents}) => {
    try {
        const response = await axios.post(`${API_URL}/hybe/notice`, {
            title, contents
        }, {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI4NjU2NTMsImlhdCI6MTcyMjg2Mzg1M30.VGe75tNxosUK3EsDGO_mOHLpEEeH76SdAIqd9DBk-Fs"
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
                {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNCIsImF1dGgiOiJFTlRFUlRBSU5NRU5UIiwic3RhdHVzIjoiQUNUSVZFX1VTRVIiLCJleHAiOjE3MjI4NjU2NTMsImlhdCI6MTcyMjg2Mzg1M30.VGe75tNxosUK3EsDGO_mOHLpEEeH76SdAIqd9DBk-Fs"
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
        throw error;
    }
};

export const fetchSchedule = async () => {
    try {
        const response = await axios.get(`${API_URL}/hybe/schedule`);
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.warn('Schedule data is not an array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return [];
    }
};
