import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    fetchFeedComments,
    postComment,
    likeFeed,
    fetchArtistFeed,
    fetchFeedLikes,
    getIsLiked,
    updateComment,
    deleteComment,
    likeComment,
    getCommentIsLiked,
    getCommentLikeCount,
} from '../service/GroupService';
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
    const [likedComments, setLikedComments] = useState({}); // 댓글 좋아요 상태를 저장할 객체

    useEffect(() => {
        const loadFeed = async () => {
            try {
                // 피드 데이터 불러오기
                const loadedFeed = await fetchArtistFeed(groupName, feedId);
                setFeedData(loadedFeed);

                // 댓글 데이터 불러오기
                const loadedComments = await fetchFeedComments(groupName, feedId);

                // 댓글에 좋아요 상태와 개수 추가하기
                const commentsWithLikes = await Promise.all(loadedComments.map(async (comment) => {
                    const likeCountResponse = await getCommentLikeCount(comment.id);
                    const isLikedResponse = await getCommentIsLiked(comment.id);
                    return {
                        ...comment,
                        likeCount: likeCountResponse.data.likeCount,
                        isLiked: isLikedResponse.data.isLiked,
                    };
                }));

                setComments(commentsWithLikes);

                // 좋아요 상태 가져오기
                const liked = await getIsLiked(groupName, feedId);
                setIsLiked(liked);
            } catch (error) {
                console.error('Error fetching feed:', error);
            }
        };

        loadFeed();
    }, [feedId, groupName]);


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;

        try {
            await postComment(groupName, feedId, newComment);
            setNewComment('');
            const Comments = await fetchFeedComments(groupName, feedId);
            setComments(Comments);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleLike = async () => {
        try {
            await likeFeed(groupName, feedId);
            const likesCount = await fetchFeedLikes(groupName, feedId);

            // 좋아요 상태 업데이트
            setIsLiked(prevIsLiked => !prevIsLiked);

            setFeedData(prevFeedData => ({
                ...prevFeedData,
                likesCount,
            }));
        } catch (error) {
            console.error('Error liking feed:', error);
        }
    };

    const handleCommnetLike = async (commentId) => {
        try {
            // 현재 좋아요 상태 조회
            const isLikedResponse = await getCommentIsLiked(commentId);
            const newIsLiked = !isLikedResponse.data.isLiked; // 현재 상태 반전

            // 좋아요 API 호출
            await likeComment(groupName, feedId, commentId);

            // 좋아요 개수 조회
            const likeCountResponse = await getCommentLikeCount(commentId);
            console.log("좋아요 수", likeCountResponse);

            // 댓글의 좋아요 개수와 상태 업데이트
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            likeCount: likeCountResponse.data.likeCount,
                            isLiked: newIsLiked
                        }
                        : comment
                )
            );

        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };


    const openEditModal = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.contents);
        setIsModalOpen(true);
    };

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };

    const handleEditCommentSubmit = async () => {
        if (editingCommentContent.trim() === '') return;

        try {
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
                        {feedData.imageUrls && feedData.imageUrls.length > 0 && (
                            feedData.imageUrls.length > 1 ? (
                                <Slider {...sliderSettings}>
                                    {feedData.imageUrls.map((imageUrl, index) => (
                                        <div key={index}>
                                            <img src={imageUrl} alt={`게시물 이미지 ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <img src={feedData.imageUrls[0]} alt="게시물 이미지" style={{ width: '100%', borderRadius: '8px' }} />
                            )
                        )}
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
                            <div>
                                <button onClick={() => handleCommnetLike(comment.id)}>
                                    {comment.isLiked ? '❤️' : '🤍'} {comment.likeCount}
                                </button>
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
