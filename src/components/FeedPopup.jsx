import React, { useState, useEffect } from 'react';
import { fetchFeedComments, postComment, likeFeed, fetchArtistFeed } from '../service/GroupService';
import './FeedPopup.css';
import {useParams} from "react-router-dom";

const FeedPopup = () => {
    const { groupName, feedId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [feedData, setFeedData] = useState(null); // 새로 추가된 상태

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const loadedFeed = await fetchArtistFeed(groupName, feedId); // groupName과 feed.id를 사용하여 데이터 가져오기
                console.log(loadedFeed);
                setFeedData(loadedFeed);
                const loadedComments = await fetchFeedComments(groupName, feedId);
                console.log(loadedComments);
                setComments(loadedComments);
            } catch (error) {
                console.error('Error fetching feed:', error);
            }
        };

        loadFeed();
    }, [feedId, groupName]); // groupName도 의존성 배열에 추가

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
                {feedData ? ( // feedData가 로드되었을 때만 렌더링
                    <div className="feed-details">
                        <h2>{feedData.artistName}</h2>
                        <p>{feedData.contents}</p>
                        {feedData.imageUrls && <img src={feedData.imageUrls} alt="게시물 이미지" />}
                        <div className="feed-actions">
                            {(
                                <>
                                    <button onClick={handleLike}>❤️ Like</button>
                                    <span>{feedData.likesCount}</span>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p> // 데이터가 로드 중일 때 보여줄 로딩 메시지
                )}
                <div className="feed-comments">
                    <h3>Comments</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.contents}</p>
                        </div>
                    ))}
                    {(
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
