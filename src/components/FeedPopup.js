import React, { useState, useEffect } from 'react';
import { fetchFeedComments, postComment, likeFeed } from '../service/groupService';
import './FeedPopup.css';

const FeedPopup = ({ feed, onClose, isSubscribed }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const loadComments = async () => {
            try {
                const loadedComments = await fetchFeedComments(feed.id);
                setComments(loadedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        loadComments();
    }, [feed.id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;

        try {
            await postComment(feed.id, newComment);
            setNewComment('');
            const loadedComments = await fetchFeedComments(feed.id); // 새 댓글을 불러오기 위해 댓글 목록 갱신
            setComments(loadedComments);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleLike = async () => {
        try {
            await likeFeed(feed.id);
        } catch (error) {
            console.error('Error liking feed:', error);
        }
    };

    return (
        <div className="feed-popup">
            <div className="popup-content">
                <div className="feed-details">
                    <h2>{feed.artist.name}</h2>
                    <p>{feed.contents}</p>
                    {feed.imageUrl && <img src={feed.imageUrl} alt="게시물 이미지" />}
                    <div className="feed-actions">
                        {isSubscribed && (
                            <>
                                <button onClick={handleLike}>❤️ Like</button>
                                <span>{feed.likeCount}</span>
                            </>
                        )}
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
                <div className="feed-comments">
                    <h3>Comments</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                    {isSubscribed && (
                        <div className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Write a comment..."
                            />
                            <button onClick={handleCommentSubmit}>Post Comment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedPopup;