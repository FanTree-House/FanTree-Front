import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {fetchArtistFeeds, fetchGroupDetails, likeFeed, subscribeToGroup, cancelSubscribe, getIsSubscribed, fetchFeedLikes, getIsLiked } from '../service/GroupService';
import Header from '../components/Header';
import './GroupPage.css';

const GroupPage = () => {
    const navigate = useNavigate();
    const { groupName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [enterName, setEnterName] = useState('');
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
                console.log(error.message);
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
                console.log(error.message);
            }
        };

        // 구독 유무
        const checkSubscriptionStatus = async () => {
            try {
                const subscribed = await getIsSubscribed(groupName);
                setIsSubscribed(subscribed);
            } catch (error) {
                console.log(error.message);
            }
        };


        loadGroupDetails();
        loadArtistFeeds();
        checkSubscriptionStatus();
        setEnterName(searchParams.get('enter'))
        console.log("enterName : " )
    }, [groupName]);

    // Feed 상세 페이지
    const openFeedPopup = (feedId) => {
        if (null == window.localStorage.getItem('accessToken')){
            alert("로그인 후 이용해주세요.")
        } else {
            navigate(`/group/${groupName}/feed/${feedId}`); // 피드 ID에 따라 URL 변경
        }
    };

    // Enter 페이지로
    const openEnterPage = () =>
        navigate(`/group/${groupName}/enter/${enterName}`);

    const openCommunityPage = () =>
        navigate(`/group/${groupName}/community`)

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
            alert("로그인 후 이용해주세요.");
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
            alert("로그인 후 이용해주세요.");
        }
    };

    if (!groupDetails) return <div>Loading...</div>;

    return (
        <div className="group-page">
            <Header/>
            <div>
                <div className="nav_btn">
                    <button className="subscript-button" onClick={handleSubscribe}>{isSubscribed ? '구독중' : '구독'}</button>
                    <button className="notice-button" key={enterName} onClick={() => openEnterPage()}>공지사항</button>
                    <button className="community-button" onClick={() => openCommunityPage()}>커뮤니티</button>
                </div>
            </div>
            <div className="group-header">
                <div className="group-image">
                    <img src={groupDetails.artistGroupProfileImageUrl} alt={`${groupDetails.groupName} 이미지`}/>
                </div>
                <div className="group-info">
                    <h1>{groupDetails.name}</h1>
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
                            <img src={feed.profileUrl} alt="Profile" className="profile-image"/>
                            <div className="nickname">{feed.artistName}</div>
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
                            {feed.imageUrls && (
                                feed.imageUrls.length > 1 ? (
                                    <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                                        {feed.imageUrls.map((imageUrl, index) => (
                                            <div key={index}>
                                                <img src={imageUrl} alt={`게시물 이미지 ${index + 1}`} style={{width: '100%', borderRadius: '8px'}}/>
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <img src={feed.imageUrls[0]} alt="게시물 이미지" style={{ width: '100%', borderRadius: '8px' }} />
                                )
                            )}
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
