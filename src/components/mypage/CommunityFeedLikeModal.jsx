import React, {useState, useEffect} from 'react';
import './ButtonWithModal.css'; // 기존 CSS 파일 재사용
import './ArtistFeedLikeModal.css'; // 모달 CSS 재사용
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

const CommunityFeedLikeModal = ({onClose}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState({});
    const [updatedLikes, setUpdatedLikes] = useState({});
    const [expandedPostIds, setExpandedPostIds] = useState(new Set()); // 게시글 확장 상태
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/communityFeed/likes`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`
                    }
                });

                console.log('API response:', response.data);

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
                console.error('Error fetching post data:', fetchError);
                setError('Failed to fetch post data');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [accessToken]);

    const toggleExpandPost = (postId) => {
        setExpandedPostIds(prevExpandedPostIds => {
            const newExpandedPostIds = new Set(prevExpandedPostIds);
            if (newExpandedPostIds.has(postId)) {
                newExpandedPostIds.delete(postId);
            } else {
                newExpandedPostIds.add(postId);
            }
            return newExpandedPostIds;
        });
    };

    // 좋아요 상태를 토글하는 함수 (서버로 즉시 전송하지 않음)
    const handleLikeToggle = (communityFeedId) => {
        const currentLikedState = liked[communityFeedId];
        const newLikedState = !currentLikedState;

        setLiked(prevLiked => ({
            ...prevLiked,
            [communityFeedId]: newLikedState
        }));

        setUpdatedLikes(prevUpdatedLikes => ({
            ...prevUpdatedLikes,
            [communityFeedId]: newLikedState ? currentLikedState : null
        }));
    };

    // 모달을 닫을 때 좋아요 상태를 서버로 전송하는 함수
    const handleClose = async () => {
        try {
            const updates = Object.keys(updatedLikes).map(async communityFeedId => {
                const endpoint = `http://localhost:8080/artist/cancelLike/${communityFeedId}`;
                const likedStatus = updatedLikes[communityFeedId];

                // 상태가 null이 아닐 때만 서버로 전송
                if (likedStatus !== null) {
                    return axios.post(endpoint, {liked: likedStatus}, {
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

    if (error || posts.length === 0) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="no-like-message">좋아요한 커뮤니티 게시글이 없습니다.</div>
                    <button className="modal-close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>Close</button>
                <div className="modal-body">
                    {posts.length === 0 ? (
                        <p>좋아요한 게시글이 없습니다.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="modal-post">
                                <h3 className="post-nickname">{post.nickname}</h3>
                                <Carousel
                                    controls={true} // 컨트롤 표시
                                    touch={true}
                                    indicators={false} // 인디케이터 표시
                                    interval={null} // 자동 슬라이드 비활성화
                                    prevIcon={<span className="carousel-control-prev-icon"
                                                    aria-hidden="true"/>} // 좌측 버튼 아이콘
                                    nextIcon={<span className="carousel-control-next-icon"
                                                    aria-hidden="true"/>} // 우측 버튼 아이콘
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
                                <div className="like-and-indicator-container">
                                    <div className="like-container">
                                        <button
                                            className="like-button"
                                            onClick={() => handleLikeToggle(post.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faHeartSolid}
                                                size="2x"
                                                style={{color: liked[post.id] ? "#ccc" : "#c70000"}}
                                            />
                                        </button>
                                        <span className="like-count">{post.likeCount}</span>
                                    </div>
                                    <div className="carousel-indicators">
                                        {post.imageUrls.map((_, idx) => (
                                            <span key={idx} className="indicator-dot"></span>
                                        ))}
                                    </div>
                                </div>
                                <div className="post-contents">
                                    {expandedPostIds.has(post.id) ? (
                                        <p>{post.contents}</p> // 전체 내용 표시
                                    ) : (
                                        <p>
                                            {post.contents.length > 30 ? (
                                                <>
                                                    {post.contents.slice(0, 30)}...
                                                    <button
                                                        className="more-button"
                                                        onClick={() => toggleExpandPost(post.id)}
                                                    >
                                                        ...더 보기
                                                    </button>
                                                </>
                                            ) : (
                                                post.contents
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityFeedLikeModal;
