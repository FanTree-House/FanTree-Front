import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchArtistFeeds, fetchGroupDetails, likeFeed, subscribeToGroup, cancelSubscribe, getIsSubscribed, fetchFeedLikes, getIsLiked } from '../service/GroupService';
import './GroupPage.css';

const GroupPage = () => {
    const navigate = useNavigate();
    const { groupName } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [artistFeeds, setArtistFeeds] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [likedFeeds, setLikedFeeds] = useState({}); // 좋아요 상태를 저장할 객체

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
                // 피드의 좋아요 수를 가져오는 추가 로직
                await Promise.all(feeds.map(async (feed) => {
                    const likesCount = await fetchFeedLikes(groupName, feed.id);
                    feed.likesCount = likesCount; // 가져온 좋아요 수를 feed에 설정

                    // 각 피드의 좋아요 여부를 확인
                    const liked = await getIsLiked(groupName, feed.id);
                    setLikedFeeds(prevState => ({
                        ...prevState,
                        [feed.id]: liked // 피드 ID를 키로 하여 좋아요 상태 저장
                    }));
                }));
            } catch (error) {
                alert(error.message);
            }
        };

        // 구독 유무
        const checkSubscriptionStatus = async () => {
            try {
                const subscribed = await getIsSubscribed(groupName);
                setIsSubscribed(subscribed);
            } catch (error) {
                alert(error.message);
            }
        };


        loadGroupDetails();
        loadArtistFeeds();
        checkSubscriptionStatus();
    }, [groupName]);

    // Feed 상세 페이지
    const openFeedPopup = (feedId) => {
        navigate(`/group/${groupName}/feed/${feedId}`); // 피드 ID에 따라 URL 변경
    };

    // 구독버튼
    const handleSubscribe = async () => {
        try {
            if (!isSubscribed){
                await subscribeToGroup(groupName);
            } else {
                await cancelSubscribe(groupName);
            }
            // 구독 상태를 다시 확인하여 새로고침
            const subscribed = await getIsSubscribed(groupName);
            setIsSubscribed(subscribed);
        } catch (error) {
            alert(error.message);
        }
    };

    // 좋아요 or 좋아요 취소
    const handleLike = async (feedId) => {
        try {
            await likeFeed(groupName, feedId);

            // 좋아요 수를 다시 가져와서 업데이트
            const likesCount = await fetchFeedLikes(groupName, feedId);

            // 좋아요 상태 수정
            setLikedFeeds(prevState => ({
                ...prevState,
                [feedId]: !prevState[feedId] // 현재 상태를 반전시킴
            }));

            setArtistFeeds(prevFeeds =>
                prevFeeds.map(feed =>
                    feed.id === feedId ? { ...feed, likesCount } : feed
                )
            );

        } catch (error) {
            alert(error.message);
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
                    <button onClick={handleSubscribe} >
                        {isSubscribed ? '구독중' : '구독'}
                    </button>
                    <p>{groupDetails.info}</p>
                    <ul>
                        {groupDetails.artistDtos.map((artist) => (
                            <li key={artist.id}>{artist.artistName}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="artist-feeds">
                <h2>Feed</h2>
                {artistFeeds.map((feed) => (
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
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleLike(feed.id);
                            }}>
                                {likedFeeds[feed.id] ? '❤️' : '🤍'} {feed.likesCount}
                            </button>
                            <span>💬 {feed.commentCount}</span>
                            {/*<button onClick={(e) => { e.stopPropagation(); handleLike(feed.id); }}>좋아요</button>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupPage;
