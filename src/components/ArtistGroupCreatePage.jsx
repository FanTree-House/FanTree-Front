import React, { useState, useEffect } from 'react';
import { getAllArtistGroups, createArtistGroup } from '../service/CreateGroupService';
import Header from '../components/Header';
import './ArtistGroupCreatePage.css';

const ArtistGroupCreatePage = () => {
    const [enterName, setEnterName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [artistProfilePicture, setArtistProfilePicture] = useState(null);
    const [groupInfo, setGroupInfo] = useState('');
    const [artistIdsInput, setArtistIdsInput] = useState('');
    const [artistGroups, setArtistGroups] = useState([]);

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

        const artistIds = artistIdsInput.trim();

        const formData = new FormData();
        formData.append('enterName', enterName);
        formData.append('groupName', groupName);
        formData.append('groupInfo', groupInfo);
        formData.append('file', artistProfilePicture);
        formData.append('artistIds', artistIds);

        try {
            const result = await createArtistGroup(formData, token);
            alert("아티스트 그룹이 성공적으로 생성되었습니다!");

            setEnterName('');
            setGroupName('');
            setArtistProfilePicture(null);
            setGroupInfo('');
            setArtistIdsInput('');
            fetchArtistGroups();
        } catch (error) {
            console.error("Failed to create artist group:", error);
        }
    };

    const fetchArtistGroups = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
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
        <>
            <Header />
            <div className="content-container">
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
                <div className="image-upload-container">
                    <label className="image-upload-label">
                        {artistProfilePicture ? (
                            <img src={URL.createObjectURL(artistProfilePicture)} alt="Artist" className="preview-image" />
                        ) : (
                            <div className="image-placeholder">이미지를 클릭하여 추가하세요</div>
                        )}
                        <input
                            type="file"
                            onChange={(e) => setArtistProfilePicture(e.target.files[0])}
                            className="file-input"
                            accept="image/*"
                        />
                    </label>
                </div>
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
                <ul className="group-list">
                    {Array.isArray(artistGroups) && artistGroups.map((group) => (
                        <li key={group.id}>{group.groupName}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ArtistGroupCreatePage;