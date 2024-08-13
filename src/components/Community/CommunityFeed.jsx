// src/components/CommunityFeed.jsx
import React from 'react';

const CommunityFeed = ({ feed }) => {
    return (
        <div>
            <h2>{feed.nickname}</h2>
            <p>{feed.contents}</p>
            {feed.post_picture && <img src={feed.post_picture} alt="Feed" />}
        </div>
    );
};

export default CommunityFeed;
