import React, { useState, useEffect } from 'react';
import { fetchFeedComments, postComment, likeFeed, fetchArtistFeed, fetchFeedLikes, getIsLiked, updateComment, deleteComment } from '../service/GroupService';
import './FeedPopup.css';
import { useParams } from "react-router-dom";

const FeedPopup = () => {
    const { groupName, feedId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [feedData, setFeedData] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const loadedFeed = await fetchArtistFeed(groupName, feedId);
                setFeedData(loadedFeed);
                const loadedComments = await fetchFeedComments(groupName, feedId);
                setComments(loadedComments);

                // 좋아요 상태 가져오기
                const liked = await getIsLiked(groupName, feedId);
                setIsLiked(liked);
            } catch (error) {
                console.error('Error fetching feed:', error);
            }
        };

        loadFeed();
    }, [feedId, groupName]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;

        try {
            await postComment(groupName, feedId, newComment);
            setNewComment('');
            const loadedComments = await fetchFeedComments(groupName, feedId);
            setComments(loadedComments);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleLike = async () => {
        try {
            await likeFeed(groupName, feedId);
            const likesCount = await fetchFeedLikes(groupName, feedId);
            setFeedData(prevFeedData => ({
                ...prevFeedData,
                likesCount,
            }));
        } catch (error) {
            console.error('Error liking feed:', error);
        }
    };

    const openEditModal = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.contents);
        console.log("댓글 수정 전", comment);
        setIsModalOpen(true);
    };

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };

    const handleEditCommentSubmit = async () => {
        if (editingCommentContent.trim() === '') return;

        try {
            console.log("댓글 수정 할 때", editingCommentId);
            await updateComment(groupName, feedId, editingCommentId, editingCommentContent);
            const loadedComments = await fetchFeedComments(groupName, feedId);
            setComments(loadedComments);
            setIsModalOpen(false);
            setEditingCommentId(null);
            setEditingCommentContent('');
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleEditCancel = () => {
        setIsModalOpen(false);
        setEditingCommentId(null);
        setEditingCommentContent('');
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                await deleteComment(groupName, feedId, commentId);
                const loadedComments = await fetchFeedComments(groupName, feedId);
                setComments(loadedComments);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    return (
        <div className="feed-popup">
            <div className="popup-content">
                {feedData ? (
                    <div className="feed-details">
                        <h2>{feedData.artistName}</h2>
                        <p>{feedData.contents}</p>
                        {feedData.imageUrls && <img src={feedData.imageUrls} alt="게시물 이미지" />}
                        <div className="feed-actions">
                            <button onClick={handleLike}>{isLiked ? '❤️' : '🤍'} {feedData.likesCount}</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="feed-comments">
                    <h3>Comments</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.contents}</p>
                            <div>
                                <button onClick={() => openEditModal(comment)}>수정</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                            </div>
                        </div>
                    ))}
                    <div className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                        />
                        <button onClick={handleCommentSubmit}>게시글 작성</button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>댓글 수정</h4>
                        <textarea
                            value={editingCommentContent}
                            onChange={handleEditCommentChange}
                            placeholder="수정할 내용을 입력하세요..."
                        />
                        <div className="modal-actions">
                            <button onClick={handleEditCommentSubmit}>수정 완료</button>
                            <button onClick={handleEditCancel}>수정 취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedPopup;
