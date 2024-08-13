import React, { useEffect, useState } from 'react';
import { fetchAllFeeds } from '../../service/communityApi';
import CommunityFeed from './CommunityFeed';

const CommunityFeeds = () => {
    const [feeds, setFeeds] = useState([]);
    const groupName = "easpa"; // groupName을 "easpa"로 설정

    useEffect(() => {
        const getFeeds = async () => {
            try {
                const data = await fetchAllFeeds(groupName);
                setFeeds(data);
            } catch (error) {
                console.error('Error fetching feeds:', error);
            }
        };

        getFeeds();
    }, [groupName]);

    return (
        <div>
            <h1>Community Feeds</h1>
            {feeds.length > 0 ? (
                feeds.map(feed => (
                    <CommunityFeed key={feed.id} feed={feed} />
                ))
            ) : (
                <p>피드가 없습니다.</p> // 피드가 없을 때 메시지 표시
            )}
        </div>
    );
};

export default CommunityFeeds;
