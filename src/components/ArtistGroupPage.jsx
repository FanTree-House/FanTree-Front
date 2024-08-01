/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ArtistInfo = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const FeedItem = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
`;

const ArtistGroupPage = () => {
    const [artistGroup, setArtistGroup] = useState(null);
    const [feed, setFeed] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchArtistGroup();
        fetchFeed();
    }, []);

    const fetchArtistGroup = async () => {
        try {
            const enterName = 'Entertainment'; // 적절한 엔터테인먼트 이름으로 변경
            const groupName = 'Group'; // 적절한 그룹 이름으로 변경
            const response = await axios.get(`/artist-groups/${enterName}/${groupName}`);
            setArtistGroup(response.data);
        } catch (error) {
            console.error('아티스트 그룹을 찾을 수 없습니다:', error);
        }
    };

    const fetchFeed = async () => {
        try {
            // 피드 API 엔드포인트를 백엔드에 맞게 수정해야 합니다.
            const response = await axios.get(`/api/feed`, {
                params: { page, size: 10 } // 페이지 사이즈를 적절히 조정
            });
            setFeed(prevFeed => [...prevFeed, ...response.data.content]);
            setPage(prevPage => prevPage + 1);
            setHasMore(!response.data.last); // 마지막 페이지 여부 확인
        } catch (error) {
            console.error('피드를 찾을 수 없습니다:', error);
        }
    };

    return (
        <PageContainer>
            <Header>
                <h1>FanTree House</h1>
                <input type="text" placeholder="Search..." />
                <div>User Icon</div>
            </Header>

            {artistGroup && (
                <ArtistInfo>
                    <img src={artistGroup.artistProfilePicture} alt={artistGroup.groupName} />
                    <div>
                        <h2>{artistGroup.groupName}</h2>
                        <p>{artistGroup.groupInfo}</p>
                        <p>Entertainment: {artistGroup.entertainment.enterName}</p>
                        <button>구독하기</button>
                    </div>
                </ArtistInfo>
            )}

            <h3>Artists</h3>
            {artistGroup && artistGroup.artists.map(artist => (
                <div key={artist.id}>{artist.artistName}</div>
            ))}

            <h3>Feed</h3>
            <InfiniteScroll
                dataLength={feed.length}
                next={fetchFeed}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {feed.map((item, index) => (
                    <FeedItem key={index}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <div>
                            <span>좋아요 {item.likes}</span>
                            <span>댓글 {item.comments}</span>
                        </div>
                        <button>좋아요</button>
                        <button>댓글 달기</button>
                    </FeedItem>
                ))}
            </InfiniteScroll>
        </PageContainer>
    );
};

export default ArtistGroupPage;*/