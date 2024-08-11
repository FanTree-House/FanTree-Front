import React, { useState, useEffect } from 'react';
import './ButtonWithModal.css'; // 기존 CSS 파일을 사용할 수 있습니다.
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

const ArtistFeedLikeModal = ({ postId, onClose }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState({});
    const [updatedLikes, setUpdatedLikes] = useState({});
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/feed/likes`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`
                    }
                });
                // 반환된 DTO에서 필요한 필드 추출
                const data = response.data.data;
                setPosts(data);

                // 초기 좋아요 상태 설정
                const initialLikedState = {};
                data.forEach(post => {
                    initialLikedState[post.id] = post.liked; // liked 상태가 응답에 있는 경우
                });
                setLiked(initialLikedState);

            } catch (fetchError) {
                console.error('Error fetching post:', fetchError);
                setError('Failed to fetch post data');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [accessToken]);

    // 좋아요 상태를 토글하는 함수 (서버로 즉시 전송하지 않음)
    const handleLikeToggle = (artistFeedId) => {
        const currentLikedState = liked[artistFeedId];
        const newLikedState = !currentLikedState;

        // 상태를 변경하고 서버에 전송할 필요가 없는 상태 업데이트 객체에 추가
        setLiked(prevLiked => ({
            ...prevLiked,
            [artistFeedId]: newLikedState
        }));

        // 상태 업데이트를 위한 객체에 추가 (홀수번 클릭 시 변경된 상태를 서버로 전송하지 않음)
        setUpdatedLikes(prevUpdatedLikes => ({
            ...prevUpdatedLikes,
            [artistFeedId]: newLikedState ? currentLikedState : null // 상태를 null로 설정하면 서버 전송에서 제외
        }));
    };

    // 모달을 닫을 때 좋아요 상태를 서버로 전송하는 함수
    const handleClose = async () => {
        try {
            const updates = Object.keys(updatedLikes).map(async artistFeedId => {
                const endpoint = `http://localhost:8080/feed/${artistFeedId}`;
                const likedStatus = updatedLikes[artistFeedId];

                // 상태가 null이 아닐 때만 서버로 전송
                if (likedStatus !== null) {
                    return axios.post(endpoint, { liked: likedStatus }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${accessToken}`
                        }
                    });
                }
            });

            await Promise.all(updates.filter(update => update)); // null 값 필터링

        } catch (error) {
            console.error('Error updating like statuses:', error);
        } finally {
            onClose(); // 모달 닫기
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}> {/* 모달 창 클릭 시 닫히지 않도록 수정 */}
            <div className="modal-content">
                {posts.length > 0 ? (
                    <>
                        <table className="posts-table">
                            <thead>
                            <tr>
                                <th>Artist Name</th>
                                <th>Images</th>
                                <th>Like Count</th>
                                <th>Content</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.artistName}</td>
                                    <td>
                                        <Carousel
                                            controls={true} // <---- 변경된 부분: 컨트롤 표시
                                            indicators={false} // <---- 변경된 부분: 인디케이터 숨기기
                                            interval={null} // <---- 변경된 부분: 자동 슬라이드 비활성화
                                            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />} // <---- 변경된 부분: 좌측 버튼 아이콘
                                            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />} // <---- 변경된 부분: 우측 버튼 아이콘
                                        >
                                            {post.imageUrls.map((image, imgIndex) => (
                                                <Carousel.Item key={imgIndex}>
                                                    <img
                                                        className="d-block w-100 post-image"
                                                        src={image}
                                                        alt={`Slide ${imgIndex}`}
                                                    />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </td>
                                    <td>{post.likeCount}</td>
                                    <td>{post.content}</td>
                                    <td>
                                        <button
                                            className="like-button"
                                            onClick={() => handleLikeToggle(post.id)} // 좋아요 토글
                                        >

                                            <FontAwesomeIcon
                                                icon={faHeartSolid} // 상태에 따라 하트 아이콘 변경
                                                size="lg"
                                                style={{color: liked[post.id] ? "#ccc" : "#c70000"}}  // 하트 색상 변경
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>좋아요한 게시글이 없습니다.</p>
                )}
                <button className="modal-close" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default ArtistFeedLikeModal;
