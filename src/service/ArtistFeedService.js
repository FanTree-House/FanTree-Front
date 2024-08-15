import apiClient from './apiClient';

// 아티스트의 그룹 이름을 가져오는 함수
export const getArtistGroupName = async () => {
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await apiClient.get(`/artist/group`, {
            headers: {
                'Authorization': `${token}` // 토큰을 Bearer 형식으로 추가
            },
        });
        return response.data.data; // 그룹 이름 반환
    } catch (error) {
        console.error('Error fetching artist group name:', error);
        throw error;
    }
};

// 피드 생성 함수
export const createFeed = async (groupName, content, images) => {
    const formData = new FormData();
    formData.append('contents', content);

    images.forEach((image, index) => {
        formData.append(`file`, image); // 여러 파일을 위한 키 이름을 다르게 설정
    });

    // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
    const token = window.localStorage.getItem('accessToken');

    try {
        const response = await apiClient.post(`/${groupName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}` // 토큰을 Bearer 형식으로 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};