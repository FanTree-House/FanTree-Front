// 그룹 페이지
import React, { useEffect, useState } from 'react';
import { fetchGroupDetails, fetchArtistFeeds, subscribeToGroup } from '../services/groupService';
import './GroupPage.css';

const GroupPage = ({ enterName, groupName }) => {
    const [groupDetails, setGroupDetails] = useState(null);
    const [artistFeeds, setArtistFeeds] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const loadGroupDetails = async () => {
            try {
                const details = await fetchGroupDetails(enterName, groupName);
                setGroupDetails(details);
            } catch (error) {
                alert(error.message); // 에러 메시지 표시
            }
        };

        const loadArtistFeeds = async () => {
            try {
                const feeds = await fetchArtistFeeds(groupName);
                setArtistFeeds(feeds);
            } catch (error) {
                alert(error.message); // 에러 메시지 표시
            }
        };

        loadGroupDetails();
        loadArtistFeeds();
    }, [enterName, groupName]); // enterName과 groupName을 의존성 배열에 추가

    const handleSubscribe = async () => {
        try {
            await subscribeToGroup(groupName);
            setIsSubscribed(true);
        } catch (error) {
            alert(error.message); // 에러 메시지 표시
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
                {artistFeeds.map((feed) => (
                    <div className="feed" key={feed.id}>
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
                            <span>❤️ {feed.likeCount}</span>
                            <span>💬 {feed.commentCount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupPage;