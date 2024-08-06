import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchArtistFeeds, fetchGroupDetails, likeFeed, subscribeToGroup, cancelSubscribe} from '../service/GroupService';
import './GroupPage.css';

const GroupPage = () => {
    const navigate = useNavigate();
    const { groupName } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [artistFeeds, setArtistFeeds] = useState([]);
    const [Subscribe, setSubscribe] = useState(false);

    useEffect(() => {
        const loadGroupDetails = async () => {
            try {
                const details = await fetchGroupDetails(groupName);
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
    }, [groupName]);

    // Feed 상세 페이지
    const openFeedPopup = (feedId) => {
        navigate(`/group/${groupName}/feed/${feedId}`); // 피드 ID에 따라 URL 변경
    };

    // 구독버튼
    const handleSubscribe = async () => {
        try {
            if (Subscribe === false){
                await subscribeToGroup(groupName);
            } else {
                await cancelSubscribe(groupName);
            }
            setSubscribe(!Subscribe);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLike = async (feedId, index) => {
        try {
            await likeFeed(feedId);
            setArtistFeeds((prevFeeds) => {
                const newFeeds = [...prevFeeds];
                newFeeds[index].likesCount += 1; // likesCount 필드를 증가시킵니다.
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
                    <img src={groupDetails.artistGroupProfileImageUrl} alt={`${groupDetails.groupName} 이미지`} />
                </div>
                <div className="group-info">
                    <h1>{groupDetails.name}</h1>
                    <button onClick={handleSubscribe} disabled={Subscribe}>
                        {Subscribe ? 'Cancel a subscription' : 'Subscribe'}
                    </button>
                    <p>{groupDetails.info}</p>
                    <ul>
                        {groupDetails.artistDtos.map((artist) => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="artist-feeds">
                <h2>Feed</h2>
                {artistFeeds.map((feed, index) => (
                    <div className="feed" key={feed.id} onClick={() => openFeedPopup(feed.id)}> {/* 클릭 이벤트 추가 */}
                        <div className="feed-header">
                            {/* 피드 헤더 내용 */}
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
                            {feed.imageUrls && <img src={feed.imageUrls} alt="게시물 이미지" />}
                        </div>
                        <div className="feed-footer">
                            <span>❤️ {feed.likesCount}</span>
                            <span>💬 {feed.commentCount}</span>
                            <button onClick={(e) => { e.stopPropagation(); handleLike(feed.id, index); }}>좋아요</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupPage;
