import React, { useState, useEffect } from 'react';
import { getAllArtistGroups, updateArtistGroup, deleteArtistGroup, createArtistGroup } from '../service/CreateGroupService';
import Header from '../components/Header';
import './ArtistGroupManagePage.css'; // 스타일시트 추가

const ArtistGroupManagePage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupInfo, setNewGroupInfo] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [newArtistIds, setNewArtistIds] = useState([]);
    const [newEnterName, setNewEnterName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchArtistGroups();
    }, []);

    const fetchArtistGroups = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const groups = await getAllArtistGroups(token);
            setArtistGroups(groups);
        } catch (error) {
            setMessage('아티스트 그룹을 불러오는데 실패했습니다.');
        }
    };

    const handleEdit = (group) => {
        setEditingGroup(group);
        setNewGroupName(group.groupName);
        setNewGroupInfo(group.groupInfo);
        setNewEnterName(group.enterName);
        setNewArtistIds(group.artistDtos.map(artist => artist.id));
    };

    const handleUpdate = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('groupName', newGroupName);
            formData.append('groupInfo', newGroupInfo);
            formData.append('enterName', newEnterName);
            formData.append('artistIds', newArtistIds.join(','));
            if (newFile) {
                formData.append('file', newFile);
            }

            await updateArtistGroup(editingGroup.groupName, formData, token);
            alert('그룹이 성공적으로 수정되었습니다.');
            setEditingGroup(null);
            fetchArtistGroups();
        } catch (error) {
            alert('그룹 수정에 실패했습니다.');
        }
    };

    const handleDelete = async (groupName) => {
        if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
            try {
                const token = window.localStorage.getItem('accessToken');
                await deleteArtistGroup(groupName, token);
                alert('그룹이 성공적으로 삭제되었습니다.');
                fetchArtistGroups();
            } catch (error) {
                alert('그룹 삭제에 실패했습니다.');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingGroup(null);
    };

    return (
        <>
            <Header />
            <div className="header-spacing" /> {/* 헤더와 내용 사이의 공간 추가 */}
            <div className="artist-group-manage-container">
                {message && <p className="message">{message}</p>}
                {artistGroups.map((group) => (
                    <div key={group.id} className="card">
                        {editingGroup && editingGroup.id === group.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="그룹 이름"
                                />
                                <input
                                    type="text"
                                    value={newEnterName}
                                    onChange={(e) => setNewEnterName(e.target.value)}
                                    placeholder="엔터테인먼트 이름"
                                />
                                <textarea
                                    value={newGroupInfo}
                                    onChange={(e) => setNewGroupInfo(e.target.value)}
                                    placeholder="그룹 정보"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setNewFile(e.target.files[0])}
                                />
                                <button className="btn btn-primary" onClick={handleUpdate}>저장</button>
                                <button className="btn btn-secondary" onClick={handleCancelEdit}>취소</button>
                            </div>
                        ) : (
                            <>
                                <img src={group.artistGroupProfileImageUrl} className="card-img-top" alt={group.groupName} />
                                <div className="card-body">
                                    <h5 className="card-title">{group.groupName}</h5>
                                    <p className="card-text">엔터테인먼트: {group.enterName}</p>
                                    <p className="card-text">정보: {group.groupInfo}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {group.artistDtos.map(artist => (
                                        <li key={artist.id} className="list-group-item">아티스트 ID: {artist.id}</li>
                                    ))}
                                </ul>
                                <div className="card-body">
                                    <button className="btn btn-primary" onClick={() => handleEdit(group)}>수정</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(group.groupName)}>삭제</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ArtistGroupManagePage;