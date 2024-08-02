import React, { useState, useEffect } from 'react';
import { getAllArtistGroups } from '../services/groupService';
import { createArtistGroup } from "../services/createGroupService";
import './ArtistGroupCreatePage.css';

const ArtistGroupCreatePage = () => {
    const [enterName, setEnterName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [artistProfilePicture, setArtistProfilePicture] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const [artistIdsInput, setArtistIdsInput] = useState(''); // 쉼표로 구분된 아티스트 ID 입력값
    const [artistGroups, setArtistGroups] = useState([]);

    const handleCreateGroup = async () => {
        if (!enterName || !groupName || !artistProfilePicture || !groupInfo) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        // 쉼표로 구분된 ID를 배열로 변환
        const artistIds = artistIdsInput.split(',').map(id => id.trim());

        const groupData = {
            enterName,
            groupName,
            artistProfilePicture,
            groupInfo,
            artistIds, // 변환된 artistIdsInput 사용
        };

        try {
            await createArtistGroup(groupData);
            // fetchArtistGroups();
            setEnterName('');
            setGroupName('');
            setArtistProfilePicture('');
            setGroupInfo('');
            setArtistIdsInput(''); // 입력 초기화
        } catch (error) {
            console.error("Failed to create artist group:", error);
        }
    };

    const fetchArtistGroups = async () => {
        try {
            const groups = await getAllArtistGroups();
            setArtistGroups(groups);
        } catch (error) {
            console.error("Failed to fetch artist groups:", error);
        }
    };

    /*useEffect(() => {
        fetchArtistGroups();
    }, []);
*/
    return (
        <div className="container">
            <h2>Artist Group Manager</h2>
            <input
                type="text"
                placeholder="Enter Name"
                value={enterName}
                onChange={(e) => setEnterName(e.target.value)}
                className="input-field"
            />
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
            <textarea
                placeholder="Enter Artist IDs, separated by commas"
                value={artistIdsInput}
                onChange={(e) => setArtistIdsInput(e.target.value)}
                className="textarea-field"
            />
            <button onClick={handleCreateGroup} className="submit-button">Create Artist Group</button>
            <h3>Existing Artist Groups</h3>
            <ul className="group-list">
                {Array.isArray(artistGroups) && artistGroups.map((group) => (
                    <li key={group.id}>{group.groupName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArtistGroupCreatePage;