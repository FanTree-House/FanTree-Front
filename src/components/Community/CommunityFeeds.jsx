import React, { useEffect, useState } from 'react';
import { fetchAllFeeds } from '../../service/communityApi';
import CommunityFeed from './CommunityFeed';
import {useParams} from "react-router-dom";
import communityFeed from "./CommunityFeed";

const CommunityFeeds = () => {
    const [feeds, setFeeds] = useState([]);
    const {groupName} = useParams();

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
                    <CommunityFeed key={communityFeed.id} feed={feed} />
                ))
            ) : (
                <p>피드가 없습니다.</p> // 피드가 없을 때 메시지 표시
            )}
        </div>
    );
};

export default CommunityFeeds;
