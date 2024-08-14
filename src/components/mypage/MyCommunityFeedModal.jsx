import React, {useEffect, useState} from 'react';
import './ButtonWithModal.css'; // 기존 CSS 파일을 사용
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons"; // 모달의 CSS 재사용
import Carousel from 'react-bootstrap/Carousel';
import './ArtistFeedLikeModal.css';

const MyCommunityFeedModal = ({onClose}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState({});
    const [updatedLikes, setUpdatedLikes] = useState({});
    const [expandedPostIds, setExpandedPostIds] = useState(new Set());
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/communityFeed/myFeeds`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`
                    }
                });
                const data = response.data.data;
                if (data.length === 0) {
                    setError("등록한 커뮤니티 게시글이 없습니다.");
                } else {
                    setPosts(data);

                    // 각각의 포스트에 대한 좋아요 상태를 가져오는 추가 코드
                    const likedStatuses = await Promise.all(data.map(async (post) => {
                        try {
                            const likedResponse = await axios.get(`http://localhost:8080/check/${post.id}`, {
                                headers: {
                                    'Authorization': `${accessToken}`
                                }
                            });
                            return { [post.id]: likedResponse.data };
                        } catch (error) {
                            console.error(`Error fetching liked status for post ${post.id}:`, error);
                            return { [post.id]: false }; // 에러 발생 시 기본 값으로 false 설정
                        }
                    }));

                    const likedMap = likedStatuses.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                    setLiked(prev => ({ ...prev, ...likedMap }));

                }
            } catch (fetchError) {
                console.error('Error fetching community posts:', fetchError);

                if (fetchError.response && fetchError.response.status === 404) {
                    setError("구독하신 아티스트의 커뮤니티에 작성하신 게시글이 없습니다");
                } else if (fetchError.response && fetchError.response.status === 204) {
                    setError("활동하고 싶은 커뮤니티의 아티스트 그룹을 구독하세요.");
                } else {
                    setError('Failed to fetch community post data');
                }
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

        // 상태를 변경하고 서버에 전송할 필요가 없는 상태 업데이트 객체에 추가
        setLiked(prevLiked => ({
            ...prevLiked,
            [communityFeedId]: newLikedState
        }));

        // 상태 업데이트를 위한 객체에 추가 (홀수번 클릭 시 변경된 상태를 서버로 전송하지 않음)
        // setUpdatedLikes(prevUpdatedLikes => ({
        //     ...prevUpdatedLikes,
        //     [communityFeedId]: newLikedState ? currentLikedState : null // 상태를 null로 설정하면 서버 전송에서 제외
        // }));
    };

    // 모달을 닫을 때 좋아요 상태를 서버로 전송하는 함수
    const handleClose = async () => {
        try {
            const updates = Object.keys(updatedLikes).map(async communityFeedId => {
                const likedStatus = updatedLikes[communityFeedId];
                const endpoint = likedStatus === true
                    ? `http://localhost:8080/artist/addLike/${communityFeedId}`
                    : `http://localhost:8080/artist/cancelLike/${communityFeedId}`;

                if (likedStatus === true) {
                    // 좋아요 추가 요청 (POST)
                    return axios.post(endpoint, {}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${accessToken}`
                        }
                    });
                } else if (likedStatus === false) {
                    // 좋아요 취소 요청 (DELETE)
                    return axios.delete(endpoint, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${accessToken}`
                        }
                    });
                }
            });

            await Promise.all(updates.filter((update) => update));  // null 값 필터링

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
                    <div className="no-posts-message"> 작성한 커뮤니티 게시글이 없습니다.</div>
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
                        <p>게시글이 없습니다.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="modal-post">
                                <h3 className="post-author-name">{post.nickname}</h3>

                                {/* 이미지와 작성자 이름을 포함하는 컨테이너 */}
                                <div className="carousel-container">
                                    <Carousel
                                        controls={true}
                                        touch={true}
                                        indicators={true}
                                        interval={null}
                                        prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true"/>}
                                        nextIcon={<span className="carousel-control-next-icon" aria-hidden="true"/>}
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
                                                onClick={() => handleLikeToggle(post.id)} // 좋아요 토글
                                            >

                                                <FontAwesomeIcon
                                                    icon={faHeartSolid}
                                                    size="2x"
                                                    style={{color: liked[post.id] ? "#c70000" : "#ccc"}}
                                                />
                                            </button>
                                            <span className="like-count">{post.likeCount}</span> {/* 좋아요 갯수 표시 */}
                                        </div>
                                        <div className="carousel-indicators">
                                            {post.imageUrls.map((_, idx) => (
                                                <span key={idx} className="indicator-dot"></span>
                                            ))}
                                        </div>
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

export default MyCommunityFeedModal;