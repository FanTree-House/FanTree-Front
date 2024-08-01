import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroupDetails, fetchArtistFeeds, subscribeToGroup, likeFeed } from '../service/groupService'; // likeFeed 추가
import FeedPopup from './FeedPopup';
import './GroupPage.css';

const GroupPage = () => {
    const { groupName } = useParams();
    const enterName = 'SM'; // 엔터 이름을 직접 선언
    const [groupDetails, setGroupDetails] = useState(null);
    const [artistFeeds, setArtistFeeds] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState(null); // 선택된 피드

    useEffect(() => {
        const loadGroupDetails = async () => {
            try {
                const details = await fetchGroupDetails(enterName, groupName);
                setGroupDetails(details);
            } catch (error) {
                alert(error.message);
            }
        };

        const loadArtistFeeds = async () => {
            try {
                const feeds = await fetchArtistFeeds(groupName);
                setArtistFeeds(feeds);
            } catch (error) {
                alert(error.message);
            }
        };

        loadGroupDetails();
        loadArtistFeeds();
    }, [enterName, groupName]);

    const handleSubscribe = async () => {
        try {
            await subscribeToGroup(groupName);
            setIsSubscribed(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const openFeedPopup = (feed) => {
        setSelectedFeed(feed);
    };

    const closeFeedPopup = () => {
        setSelectedFeed(null);
    };

    const handleLike = async (feedId, index) => {
        try {
            await likeFeed(feedId);
            // 좋아요 수 증가
            setArtistFeeds((prevFeeds) => {
                const newFeeds = [...prevFeeds];
                newFeeds[index].likeCount += 1; // likes 필드를 증가시킵니다.
                return newFeeds;
            });
        } catch (error) {
            alert('Error liking feed: ', error.message);
        }
    };

    if (!groupDetails) return <div>Loading...</div>;

    return (
        <div className="group-page">
            <div className="group-header">
                <div className="group-image">
                    <img src={groupDetails.imageUrl} alt={`${groupDetails.name} 이미지`} />
                </div>
                <div className="group-info">
                    <h1>{groupDetails.name}</h1>
                    <button onClick={handleSubscribe} disabled={isSubscribed}>
                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                    <p>{groupDetails.info}</p>
                    <ul>
                        {groupDetails.artists.map((artist) => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="artist-feeds">
                {artistFeeds.map((feed, index) => (
                    <div className="feed" key={feed.id} onClick={() => openFeedPopup(feed)}>
                        <div className="feed-header">
                            <img src={feed.artist.imageUrl} alt={`${feed.artist.name} 이미지`} />
                            <span>{feed.artist.name}</span>
                        </div>
                        <div className="feed-content">
                            <p>
                                {feed.contents.length > 100 ? (
                                    <>
                                        {feed.contents.substring(0, 100)}...
                                        <span className="more">더보기</span>
                                    </>
                                ) : (
                                    feed.contents
                                )}
                            </p>
                            {feed.imageUrl && <img src={feed.imageUrl} alt="게시물 이미지" />}
                        </div>
                        <div className="feed-footer">
                            <span>❤️ {feed.likeCount}</span> {/* 좋아요 수 표시 */}
                            <span>💬 {feed.commentCount}</span>
                            <button onClick={(e) => { e.stopPropagation(); handleLike(feed.id, index); }}>좋아요</button> {/* 좋아요 버튼 */}
                        </div>
                    </div>
                ))}
            </div>
            {selectedFeed && (
                <FeedPopup feed={selectedFeed} onClose={closeFeedPopup} isSubscribed={isSubscribed} />
            )}
        </div>
    );
};

export default GroupPage;