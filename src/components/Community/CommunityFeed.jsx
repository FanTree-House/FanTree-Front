import React, { useEffect, useState } from 'react';
import './CommunityFeed.css';
import { createComment, fetchComments } from '../../service/communityApi';
import { useParams } from 'react-router-dom';

const CommunityFeed = ({ feed }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contents, setContents] = useState([]); // 댓글 상태
    const [newComment, setNewComment] = useState(''); // 새로운 댓글 상태
    const { groupName } = useParams();

    // 모달 열릴 때 댓글을 불러오는 useEffect
    useEffect(() => {
        if (isModalOpen) {
            const loadComments = async () => {
                try {
                    const loadedComments = await fetchComments(groupName, feed.id);
                    setContents(loadedComments);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            };
            loadComments();
        }
    }, [isModalOpen, groupName, feed.id]);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;
        try {
            await createComment(newComment, groupName, feed.id);
            setNewComment('');
            const loadedComments = await fetchComments(groupName, feed.id);
            setContents(loadedComments);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <>
            <div className="feed-container" onClick={handleClick}>
                <div className="feed-image-container">
                    <img src={feed.imageUrls} alt="Feed" className="feed-image" />
                </div>
                <div className="feed-content">
                    <h2>{feed.contents}</h2>
                    <p className="feed-nickname">{feed.nickname}</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={feed.imageUrls} alt="Feed" className="modal-image" />
                        <h2>{feed.contents}</h2>
                        <p className="modal-nickname">{feed.nickname}</p>

                        {/* 댓글 입력 필드 및 버튼 */}
                        <div className="comment-section">
                            <input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="댓글을 입력하세요"
                                className="comment-input"
                            />
                            <button onClick={handleCommentSubmit} className="add-comment-button">등록하기</button>
                            <button className="modal-close-button" onClick={handleCloseModal}>닫기</button>
                        </div>

                        {/* 댓글 목록 표시 */}
                        <div className="comments-list">
                            {contents.length > 0 ? (
                                contents.map((comment, index) => (
                                    <div key={`comment-item_${index}`} className="comment-item">
                                        <p>{comment.nickname}</p>
                                        <p>{comment.contents}</p>
                                    </div>
                                ))
                            ) : (
                                <p>등록된 댓글이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommunityFeed;
