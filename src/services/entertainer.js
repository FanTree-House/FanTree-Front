import axios from 'axios';

const API_URL = 'http://localhost:8080/feed';

export const createNotice = async (noticeData) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API_URL}/notice`,
            headers: {
                Authorization: "Bearer " + "your-token-here",
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: noticeData, // noticeData에는 title, category, description이 포함되어야 함
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error('공지사항을 생성하지 못했습니다.');
        }
        return response.data; // axios는 자동으로 response.json()을 수행합니다
    } catch (error) {
        console.error('Error adding notice:', error);
        throw error;
    }
}

export const fetchSchedule = async () => {
    try {
        const response = await fetch(`${API_URL}/schedule`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched schedule data:', data); // 응답 데이터 로그 출력
        return Array.isArray(data) ? data : []; // 데이터가 배열이 아닌 경우 빈 배열 반환
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return []; // 오류 발생 시 빈 배열 반환
    }
}

