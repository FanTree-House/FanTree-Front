import apiClient from './apiClient';

// 그룹 조회니까 구독한 유저, 그룹에 속해있는 아티스트 토큰
const token = window.localStorage.getItem('accessToken'); // JWT 토큰

// 아티스트 그룹 불러오기
export const fetchGroupDetails = async (groupName) => {
    try {
        const response = await apiClient.get(`/artistgroup/${groupName}`);
        return response.data.data; // 응답에서 data 필드에 접근
    } catch (error) {
        console.error('Error fetching group details:', error);
        throw error;
    }
};

// 아티스트 피드 불러오기 (페이지네이션) 5개씩
export const fetchArtistFeeds = async (groupName, page = 0) => {
    try {
        const response = await apiClient.get(`/${groupName}/feeds?page=${page}`);
        return response.data.data.content;
    } catch (error) {
        console.error('Error fetching artist feeds:', error);
        throw error;
    }
};

// 아티스트 피드 불러오기 1개
export const fetchArtistFeed = async (groupName, artistFeedId) => {
    try {
        const response = await apiClient.get(`/${groupName}/feed/${artistFeedId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        return response.data.data; // ResponseDataDto에서 실제 데이터 반환
    } catch (error) {
        console.error('Error fetching artist feed:', error);
        throw error; // 오류 발생 시 상위로 던짐
    }
};

// 아티스트피드 댓글들 가져오기
export const fetchFeedComments = async (groupName, feedId, page = 0) => {
    try {
        const response = await apiClient.get(`/${groupName}/feed/${feedId}/comments?page=${page}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data.data.content;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// 댓글 생성
export const postComment = async (groupName, feedId, newComment) => {
    try {
        await apiClient.post(`/${groupName}/feed/${feedId}/comment`, { "contents" : newComment }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

// 좋아요 수 반환
export const fetchFeedLikes = async (groupName, artistFeedId) => {
    const response = await apiClient.get(`/feed/${artistFeedId}/likes`);
    return response.data; // 서버에서 반환된 좋아요 수
};

// 댓글 좋아요 수 반환
export const fetchCommentLikes = async (artistFeedId) => {
    const response = await apiClient.get(`/feed/comment/${artistFeedId}/LikeCount`);
    console.log("댓글 좋아요 수", response);
    return response.data; // 서버에서 반환된 좋아요 수
};

export const getAllArtistGroups = async () => {
    try {
        const response = await apiClient.get(`/artistgroup`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching artist groups:', error);
        throw error;
    }
};

// 현재 그룹에 대한 구독 여부
export const getIsSubscribed = async (groupName) => {
    try {
        const response = await apiClient.get(`/artistGroup/subscript/${groupName}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
        return response.data.data.isSubscribe;
    } catch (e) {
        console.error("구독 여부 불러오기 실패", e);
    }

};

// 좋아요 여부
export const getIsLiked = async (groupName, artistFeedId) => {
    const response = await apiClient.get(`/feed/${artistFeedId}/check`, {
        headers: { Authorization: `${token}` },
        withCredentials: true
    });
    return response.data;
};

// 구독하기
export const subscribeToGroup = async (groupName) => {
    try {
        await apiClient.post(`/artistGroup/subscript/${groupName}`, {}, {
            headers: {
                'Authorization': `${token}`
            },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};

// 구독 취소
export const cancelSubscribe = async (groupName) => {
    try {
        await apiClient.delete(`/artistGroup/subscript/${groupName}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error subscribing to group:', error);
        throw error;
    }
};

// 좋아요 or 좋아요 취소
export const likeFeed = async (groupName, artistFeedId) => {
    try {
        await apiClient.post(`/feed/${artistFeedId}`,{}, {
            headers: { Authorization:  `${token}` },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error liking feed:', error);
        throw error;
    }
};


// 댓글 좋아요 or 취소
export const likeComment = async (groupName,  feedId, commentId) => {
    try {
        const response = await apiClient.post(`/${groupName}/feed/${feedId}/comment/${commentId}`, {}, {
            headers: {Authorization: `${token}`},
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error liking comment:', error);
        throw error;
    }
};

// 댓글 좋아요수
export const getCommentLikeCount = async (commentId) => {
    try {
        const response = await apiClient.get(`/feed/comment/${commentId}/LikeCount`);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching like count:', error);
        throw error; // 에러 처리
    }
};

// 댓글 좋아요 상태
export const getCommentIsLiked = async (commentId) => {
    try {
        const response = await apiClient.get(`/feed/comment/${commentId}/like`);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching like status:', error);
        throw error; // 에러 처리
    }
};

// 댓글 수정
export const updateComment = async (groupName, feedId, commentId, newComment) => {
    const response = await apiClient.put(`/${groupName}/feed/${feedId}/comment/${commentId}`, {
        contents: newComment
    }, {
        headers: { Authorization:  `${token}` },
        withCredentials: true});
    return response.data;
};

// 댓글 삭제
export const deleteComment = async (groupName, feedId, commentId) => {
    const response = await apiClient.delete(`/${groupName}/feed/${feedId}/comment/${commentId}`, {
        headers: { Authorization:  `${token}` },
        withCredentials: true
    });
    return response.data;
};

// 피드 삭제
export const deleteFeed = async (groupName, artistFeedId) => {
    try {
        await apiClient.delete(`/${groupName}/feed/${artistFeedId}`, {
            headers: { Authorization: `${token}` },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error deleting feed:', error);
        throw error;
    }
};
