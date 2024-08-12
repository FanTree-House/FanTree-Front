import React, { useEffect, useState } from 'react';
import { getFeed, updateFeed, deleteFeed } from '../service/ArtistFeedService';

function FeedManager({ groupName, artistFeedId }) {
    const [feed, setFeed] = useState(null);
    const [contents, setContents] = useState('');
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchFeed();
    }, [artistFeedId]);

    const fetchFeed = async () => {
        try {
            const response = await getFeed(groupName, artistFeedId);
            setFeed(response.data.data);
            setContents(response.data.data.contents);
        } catch (error) {
            console.error('Failed to fetch feed', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('contents', contents);
            if (file) {
                formData.append('file', file);
            }

            await updateFeed(groupName, artistFeedId, formData);
            alert('Feed updated successfully!');
            setIsEditing(false);
            fetchFeed(); // 업데이트된 피드 다시 불러오기
        } catch (error) {
            console.error('Failed to update feed', error);
            alert('Failed to update feed');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFeed(groupName, artistFeedId);
            alert('Feed deleted successfully!');
            // 피드 삭제 후 추가 로직 (페이지 이동 등)
        } catch (error) {
            console.error('Failed to delete feed', error);
            alert('Failed to delete feed');
        }
    };

    if (!feed) return <div>Loading...</div>;

    return (
        <div>
            {isEditing ? (
                <div>
                    <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{feed.contents}</p>
                    {feed.imageUrls && feed.imageUrls.map((url, idx) => (
                        <img key={idx} src={url} alt={`Feed image ${idx}`} style={{ width: '200px' }} />
                    ))}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default FeedManager;