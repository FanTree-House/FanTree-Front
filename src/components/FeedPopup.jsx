import React, { useState, useEffect } from 'react';
import { fetchFeedComments, postComment, likeFeed, fetchArtistFeed } from '../service/GroupService';
import './FeedPopup.css';
import { useParams } from "react-router-dom";

const FeedPopup = () => {
    const { groupName, feedId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [feedData, setFeedData] = useState(null);

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const loadedFeed = await fetchArtistFeed(groupName, feedId);
                setFeedData(loadedFeed);
                const loadedComments = await fetchFeedComments(groupName, feedId);
                setComments(loadedComments);
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
            await likeFeed(feedId);
        } catch (error) {
            console.error('Error liking feed:', error);
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
                            <button onClick={handleLike}>❤️ Like</button>
                            <span>{feedData.likesCount}</span>
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
        </div>
    );
};

export default FeedPopup;
