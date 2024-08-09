import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { getAllArtistGroups, createArtistGroup } from '../service/CreateGroupService';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import './ArtistGroupCreatePage.css';

const ArtistGroupCreatePage = () => {
    const [enterName, setEnterName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [artistProfilePicture, setArtistProfilePicture] = useState(null);
    const [groupInfo, setGroupInfo] = useState('');
    const [artistIdsInput, setArtistIdsInput] = useState(''); // 쉼표로 구분된 아티스트 ID 입력값
    const [artistGroups, setArtistGroups] = useState([]);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handleCreateGroup = async () => {
        if (!enterName || !groupName || !artistProfilePicture) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        const token = window.localStorage.getItem('accessToken');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const artistIds = artistIdsInput.trim().split(',').map(id => id.trim());
        const formData = new FormData();
        formData.append('enterName', enterName);
        formData.append('groupName', groupName);
        formData.append('groupInfo', groupInfo);
        formData.append('file', artistProfilePicture);
        formData.append('artistIds', JSON.stringify(artistIds)); // 배열을 JSON 문자열로 변환하여 추가

        try {
            const response = await createArtistGroup(formData, token);
            if (response.ok) {
                setEnterName('');
                setGroupName('');
                setArtistProfilePicture(null);
                setGroupInfo('');
                setArtistIdsInput(''); // 입력 초기화
                fetchArtistGroups(); // 그룹 목록 새로고침
            } else {
                throw new Error('엔터 그룹 생성에 실패했습니다.');
            }
        } catch (error) {
            console.error("Failed to create artist group:", error);
        }
    };

    const fetchArtistGroups = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            if (!token) throw new Error('로그인이 필요합니다.');
            const groups = await getAllArtistGroups(token);
            setArtistGroups(groups);
        } catch (error) {
            console.error("Failed to fetch artist groups:", error);
        }
    };

    useEffect(() => {
        fetchArtistGroups();
    }, []);

    return (
        <div className="container">
            <Header /> {/* 헤더 컴포넌트 추가 */}
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
                type="file"
                onChange={(e) => setArtistProfilePicture(e.target.files[0])}
                className="input-field"
                accept="image/*"
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