import apiClient from './apiClient';

export const createNotice = async ({enterName, title, contents}) => {
    const token = window.localStorage.getItem('accessToken');
    try {
        const response = await apiClient.post(`/feed/${enterName}/notice`, {
            title, contents
        }, {
            headers: {
                'Authorization': `${token}`
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

export const createSchedule = async ({enterName, title, contents, date  }) => {
    const token = window.localStorage.getItem('accessToken');
    try {
        const response = await apiClient.post(`/feed/${enterName}/schedule`, {
                title, contents, date },
            {
                headers: {
                        'Authorization': `${token}`
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


export const fetchNotices = async (enterName) => {
    try {
        const response = await apiClient.get(`/feed/${enterName}/notice`);
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

export const fetchSchedule = async (enterName) => {
    try {
        const response = await apiClient.get(`/feed/${enterName}/schedule`);
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