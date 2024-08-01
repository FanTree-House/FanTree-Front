import React, { useState, useEffect } from 'react';
import { getAllArtistGroups } from '../service/groupService';
import { createArtistGroup } from "../service/createGroupService";
import './ArtistGroupCreatePage.css';

const ArtistGroupCreatePage = () => {
    const [enterName, setEnterName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [artistProfilePicture, setArtistProfilePicture] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const [artistIds, setArtistIds] = useState([]); // 아티스트 ID 리스트 상태 추가
    const [availableArtists, setAvailableArtists] = useState([]); // 선택 가능한 아티스트 리스트
    const [artistGroups, setArtistGroups] = useState([]); // 초기값을 빈 배열로 설정

    const handleCreateGroup = async () => {
        if (!enterName || !groupName || !artistProfilePicture || !groupInfo) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        const groupData = {
            enterName,
            groupName,
            artistProfilePicture,
            groupInfo,
            artistIds, // artistIds로 설정
        };

        try {
            await createArtistGroup(enterName, groupData);
            fetchArtistGroups();
            setEnterName('');
            setGroupName('');
            setArtistProfilePicture('');
            setGroupInfo('');
            setArtistIds([]); // 리스트 초기화
        } catch (error) {
            console.error("Failed to create artist group:", error);
        }
    };

    const fetchArtistGroups = async () => {
        try {
            const groups = await getAllArtistGroups();
            setArtistGroups(groups); // groups가 배열인지 확인
        } catch (error) {
            console.error("Failed to fetch artist groups:", error);
        }
    };

   /* const fetchAvailableArtists = async () => {
        // 아티스트 리스트를 가져오는 API 호출 (예시)
        try {
            const response = await getAllArtists(); // 이 함수는 아티스트를 가져오는 API 호출을 수행해야 함
            setAvailableArtists(response);
        } catch (error) {
            console.error("Failed to fetch available artists:", error);
        }
    };*/

/*    useEffect(() => {
        fetchArtistGroups();
        fetchAvailableArtists(); // 아티스트 리스트 가져오기
    }, []);*/

    const handleArtistIdChange = (e) => {
        const value = e.target.value;
        if (artistIds.includes(value)) {
            setArtistIds(artistIds.filter(id => id !== value)); // 이미 선택된 경우 제거
        } else {
            setArtistIds([...artistIds, value]); // 새로 선택된 경우 추가
        }
    };

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
            <h3>Select Artist IDs</h3>
            <ul>
                {availableArtists.map((artist) => (
                    <li key={artist.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={artist.id}
                                checked={artistIds.includes(artist.id)}
                                onChange={handleArtistIdChange}
                            />
                            {artist.name} {/* 아티스트 이름 표시 */}
                        </label>
                    </li>
                ))}
            </ul>
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