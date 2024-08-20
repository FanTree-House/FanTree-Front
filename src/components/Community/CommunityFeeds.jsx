import React, { useEffect, useState } from 'react';
import { fetchAllFeeds } from '../../service/communityApi';
import CommunityFeed from './CommunityFeed';
import {useParams} from "react-router-dom";
import communityFeed from "./CommunityFeed";
import Header from "../../components/Header";


const CommunityFeeds = () => {
    const [feeds, setFeeds] = useState([]);
    const {groupName} = useParams();

    useEffect(() => {
        const getFeeds = async () => {
            try {
                const data = await fetchAllFeeds(groupName);
                setFeeds(data);
            } catch (error) {
                if (error.response.data.errorType == "ARTIST_NOT_SUBSCRIBED") {
                    window.history.back()
                }
                alert(error.response.data.message);
            }
        };
        getFeeds();
    }, [groupName]);

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className={'feedList'}>
                {feeds.length > 0 ? (
                    feeds.map((feed) => (
                        <CommunityFeed key={`community-feed_${feed.id}`} feed={feed}/>
                    ))
                ) : (
                    <p>피드가 없습니다.</p> // 피드가 없을 때 메시지 표시
                )}
            </div>
        </div>
    );
};

export default CommunityFeeds;
