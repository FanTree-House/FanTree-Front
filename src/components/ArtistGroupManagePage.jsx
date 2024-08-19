import React, { useState, useEffect } from 'react';
import { getAllArtistGroups, updateArtistGroup, deleteArtistGroup } from '../service/CreateGroupService';
import axios from 'axios';
import Header from '../components/Header';
import './ArtistGroupManagePage.css';

const API_BASE_URL = 'http://localhost:8080/artistgroup';

const ArtistGroupManagePage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupInfo, setNewGroupInfo] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [newArtistIds, setNewArtistIds] = useState([]);
    const [newEnterName, setNewEnterName] = useState('');
    const [message, setMessage] = useState('');
    const [newArtistId, setNewArtistId] = useState('');

    useEffect(() => {
        fetchArtistGroups();
    }, []);

    const fetchArtistGroups = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const groups = await getAllArtistGroups(token);
            setArtistGroups(groups || []);  // 데이터가 없을 경우 빈 배열로 초기화
        } catch (error) {
            setMessage('아티스트 그룹을 불러오는데 실패했습니다.');
            setArtistGroups([]);  // 실패했을 경우에도 빈 배열로 초기화
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
            alert(error.response.data.message);
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
                alert(error.response.data.message);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingGroup(null);
    };

    // 아티스트를 그룹에서 제거하는 함수
    const handleRemoveArtist = async (artistId) => {
        if (window.confirm('정말로 이 아티스트를 그룹에서 제거하시겠습니까?')) {
            try {
                const token = window.localStorage.getItem('accessToken');
                await axios.delete(`${API_BASE_URL}/${editingGroup.groupName}/artists/${artistId}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                alert('아티스트가 성공적으로 그룹에서 제거되었습니다.');
                setNewArtistIds(newArtistIds.filter(id => id !== artistId)); // 제거된 아티스트를 목록에서 제외
            } catch (error) {
                alert(error.response.data.message);
            }
        }
    };

    const handleAddArtist = () => {
        if (!newArtistId) {
            alert('아티스트 ID를 입력해 주세요.');
            return;
        }

        // 아티스트가 그룹에 추가되는지 확인
        if (!newArtistIds.includes(newArtistId)) {
            setNewArtistIds([...newArtistIds, newArtistId]);
            setNewArtistId('');
        } else {
            alert('이미 그룹에 있는 아티스트입니다.');
        }
    };

    return (
        <>
            <Header />
            <div className="header-spacing" />
            <div className="artist-group-manage-container">
                {message && <p className="message">{message}</p>}
                {artistGroups.length > 0 ? (
                    artistGroups.map((group) => (
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
                                    <div>
                                        <h5>그룹 아티스트:</h5>
                                        <ul>
                                            {newArtistIds.map(artistId => (
                                                <li key={artistId}>
                                                    아티스트 ID: {artistId}
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoveArtist(artistId)}
                                                    >
                                                        제거
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5>아티스트 추가:</h5>
                                        <input
                                            type="text"
                                            value={newArtistId}
                                            onChange={(e) => setNewArtistId(e.target.value)}
                                            placeholder="아티스트 ID 입력"
                                        />
                                        <button
                                            className="btn btn-success"
                                            onClick={handleAddArtist}
                                        >
                                            추가
                                        </button>
                                    </div>
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
                    ))
                ) : (
                    <p>아티스트 그룹이 없습니다.</p>
                )}
            </div>
        </>
    );
};

export default ArtistGroupManagePage;