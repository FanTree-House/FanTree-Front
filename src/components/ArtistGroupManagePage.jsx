import React, { useState, useEffect } from 'react';
import { getAllArtistGroups, updateArtistGroup, deleteArtistGroup, createArtistGroup } from '../service/CreateGroupService';
import Header from '../components/Header';

const ArtistGroupManagePage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupInfo, setNewGroupInfo] = useState('');
    const [newFile, setNewFile] = useState(null);
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
    };

    const handleUpdate = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('groupName', newGroupName);
            formData.append('groupInfo', newGroupInfo);
            if (newFile) {
                formData.append('file', newFile);
            }

            await updateArtistGroup(editingGroup.groupName, formData, token);
            alert('그룹이 성공적으로 수정되었습니다.'); // 성공 알림
            setEditingGroup(null);
            fetchArtistGroups();
        } catch (error) {
            alert('그룹 수정에 실패했습니다.'); // 실패 알림
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

    const handleCreate = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('groupName', newGroupName);
            formData.append('groupInfo', newGroupInfo);
            if (newFile) {
                formData.append('file', newFile);
            }

            await createArtistGroup(formData, token);
            alert('그룹이 성공적으로 생성되었습니다.'); // 생성 성공 알림
            fetchArtistGroups();
        } catch (error) {
            alert('그룹 생성에 실패했습니다.'); // 생성 실패 알림
        }
    };

    return (
        <>
            <Header />
            <div className="artist-group-manage-container" style={{ marginTop: '20px' }}> {/* 공백 추가 */}
                <h2>아티스트 그룹 관리</h2>
                {message && <p className="message">{message}</p>}
                <ul className="artist-group-list">
                    {artistGroups.map((group) => (
                        <li key={group.id} className="artist-group-item">
                            {editingGroup && editingGroup.id === group.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={newGroupName}
                                        onChange={(e) => setNewGroupName(e.target.value)}
                                    />
                                    <textarea
                                        value={newGroupInfo}
                                        onChange={(e) => setNewGroupInfo(e.target.value)}
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => setNewFile(e.target.files[0])}
                                    />
                                    <button onClick={handleUpdate}>저장</button>
                                    <button onClick={() => setEditingGroup(null)}>취소</button>
                                </div>
                            ) : (
                                <>
                                    <img src={group.artistGroupProfileImageUrl} alt={group.groupName} />
                                    <h3>{group.groupName}</h3>
                                    <p>{group.groupInfo}</p>
                                    <button onClick={() => handleEdit(group)}>수정</button>
                                    <button onClick={() => handleDelete(group.groupName)}>삭제</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ArtistGroupManagePage;