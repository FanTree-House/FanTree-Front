import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createArtistGroup, getAllArtistGroups } from '../services/groupService';
import './ArtistGroupCreatePage.css'; // 스타일 시트 임포트

const ArtistGroupCreatePage = () => {
    const { enterName } = useParams();
    const [groupName, setGroupName] = useState('');
    const [artistProfilePicture, setArtistProfilePicture] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const [artistIds, setArtistIds] = useState([]);
    const [artistGroups, setArtistGroups] = useState([]);

    const handleCreateGroup = async () => {
        if (!enterName) {
            console.error('Enter name is not available.');
            return;
        }

        const groupData = {
            groupName,
            artistProfilePicture,
            groupInfo,
            artistIds,
        };

        try {
            await createArtistGroup(enterName, groupData);
            fetchArtistGroups();
            setGroupName('');
            setArtistProfilePicture('');
            setGroupInfo('');
            setArtistIds([]);
        } catch (error) {
            console.error("Failed to create artist group:", error);
        }
    };

    const fetchArtistGroups = async () => {
        if (!enterName) {
            console.error('Enter name is not available.');
            return;
        }

        try {
            const groups = await getAllArtistGroups(enterName);
            setArtistGroups(groups);
        } catch (error) {
            console.error("Failed to fetch artist groups:", error);
        }
    };

    useEffect(() => {
        fetchArtistGroups();
    }, [enterName]);

    return (
        <div className="container">
            <h2>Artist Group Manager for {enterName}</h2>
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Profile Picture URL"
                value={artistProfilePicture}
                onChange={(e) => setArtistProfilePicture(e.target.value)}
                className="input-field"
            />
            <textarea
                placeholder="Group Info"
                value={groupInfo}
                onChange={(e) => setGroupInfo(e.target.value)}
                className="textarea-field"
            />
            <input
                type="text"
                placeholder="Artist IDs (comma-separated)"
                value={artistIds.join(', ')}
                onChange={(e) => setArtistIds(e.target.value.split(',').map(id => id.trim()).filter(id => id))}
                className="input-field"
            />
            <button onClick={handleCreateGroup} className="submit-button">Create Artist Group</button>
            <h3>Existing Artist Groups</h3>
            <ul className="group-list">
                {artistGroups.map((group) => (
                    <li key={group.id}>{group.groupName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArtistGroupCreatePage;