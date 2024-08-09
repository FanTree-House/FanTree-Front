import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
        formData.append('artistIds', JSON.stringify(artistIds));

        try {
            const response = await createArtistGroup(formData, token);
            if (response.ok) {
                setEnterName('');
                setGroupName('');
                setArtistProfilePicture(null);
                setGroupInfo('');
                setArtistIdsInput('');
                fetchArtistGroups();
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setArtistProfilePicture(file);
    };

    return (
        <>
            <Header />
            <div className="container">
                <h2 className="centered-title">Artist Group Manager</h2>
                <label className="image-upload-wrapper centered">
                    {artistProfilePicture ? (
                        <img
                            src={URL.createObjectURL(artistProfilePicture)}
                            alt="Uploaded"
                            className="uploaded-image"
                        />
                    ) : (
                        <div className="image-placeholder">이미지를 넣어주세요</div>
                    )}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="image-input"
                        accept="image/*"
                    />
                </label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                    className="input-field centered"
                />
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="input-field centered"
                />
                <textarea
                    placeholder="Group Info"
                    value={groupInfo}
                    onChange={(e) => setGroupInfo(e.target.value)}
                    className="textarea-field centered"
                />
                <textarea
                    placeholder="Enter Artist IDs, separated by commas"
                    value={artistIdsInput}
                    onChange={(e) => setArtistIdsInput(e.target.value)}
                    className="textarea-field centered"
                />
                <button onClick={handleCreateGroup} className="submit-button centered">Create Artist Group</button>
                <ul className="group-list centered">
                    {Array.isArray(artistGroups) && artistGroups.map((group) => (
                        <li key={group.id}>{group.groupName}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ArtistGroupCreatePage;