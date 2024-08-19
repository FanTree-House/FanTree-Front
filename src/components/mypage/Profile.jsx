import React, { useEffect, useState } from "react";
import { Image } from 'react-bootstrap';
import apiClient from "../../service/apiClient";
import './Profile.css';

const Profile = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [userImage, setUserImage] = useState("holder.js/100x100");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [editing, setEditing] = useState(false);
    const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);

    const [originalNickname, setOriginalNickname] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");
    const [originalUserImage, setOriginalUserImage] = useState("holder.js/100x100");

    const [nicknameChanged, setNicknameChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);

    useEffect(() => {
        getUserData();
    }, [accessToken]);

    const getUserData = () => {
        apiClient.get('/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
            .then(response => {
                setNickname(response.data.nickname);
                setEmail(response.data.email);
                setUserImage(response.data.profileImageUrl || "holder.js/100x100");

                setOriginalNickname(response.data.nickname);
                setOriginalEmail(response.data.email);
                setOriginalUserImage(response.data.profileImageUrl || "holder.js/100x100");
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageChanged(true);
            saveProfileImage(file);
        }
    };

    const saveProfileImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await apiClient.put('/users/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${accessToken}`
                }
            });
            console.log('Profile image updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate new password and confirmation
        if (newPassword !== newPasswordConfirm) {
            alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();

        if (nicknameChanged) {
            formData.append('nickname', nickname);
        }
        if (emailChanged) {
            formData.append('email', email);
        }
        if (passwordChanged && newPassword) {
            formData.append('password', password); // 현재 비밀번호
            formData.append('newPassword', newPassword); // 새 비밀번호
        }
        if (imageChanged) {
            const fileInput = document.getElementById('image-upload');
            const file = fileInput.files[0];
            if (file) {
                formData.append('file', file);
            }
        }

        try {
            const response = await apiClient.put('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${accessToken}`
                }
            });
            console.log('Profile updated successfully:', response.data);
            getUserData();  // 여기서 업데이트된 사용자 데이터를 다시 불러옵니다.
            resetEditingState();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const verifyCurrentPassword = async () => {
        try {
            const response = await apiClient.post('/users/checkCurrentPassword', { password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                }
            });
            if (response.data.result) {
                setCurrentPasswordVerified(true); // 비밀번호가 올바른 경우
            } else {
                alert("현재 비밀번호가 올바르지 않습니다."); // 비밀번호가 올바르지 않은 경우
            }
        } catch (error) {
            console.error('Error verifying password:', error);
        }
    };

    const handleSettingsClick = () => {
        if (editing) {
            if (currentPasswordVerified) {
                const formHasChanges =
                    nicknameChanged ||
                    emailChanged ||
                    passwordChanged ||
                    imageChanged;

                if (formHasChanges) {
                    const confirmSave = window.confirm("저장하시겠습니까?");
                    if (confirmSave) {
                        document.getElementById('mypage-profile-form').requestSubmit();
                    } else {
                        resetEditingState();
                    }
                } else {
                    resetEditingState();
                }
            } else {
                resetEditingState();
            }
        } else {
            // 편집 모드로 전환
            setEditing(true);
        }
    };

    const resetEditingState = () => {
        setEditing(false);
        setCurrentPasswordVerified(false);
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        setNicknameChanged(false);
        setEmailChanged(false);
        setPasswordChanged(false);
        setImageChanged(false);
    };

    return (
        <div className="status-message"
             style={{
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 minHeight: '100px',
                 height: '230px',
                 overflow: 'hidden',
             }}>

            {/* 왼쪽: 프로필 이미지 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="image-upload" className="image-upload">
                    <Image src={userImage} roundedCircle className="user-image" title={"이미지 바꾸기"} />
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>

            {/* 가운데: 상태 메시지, 닉네임, 이메일 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {editing ? (
                    currentPasswordVerified ? (
                        <form id="mypage-profile-form" onSubmit={handleSubmit}>
                            <label htmlFor="nickname-input" className="simple-profile-label">
                                nickname:
                                <input
                                    id="nickname-input"
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => {
                                        setNickname(e.target.value);
                                        setNicknameChanged(true);
                                    }}
                                    placeholder="닉네임을 입력하세요"
                                    className="simple-profile-input-field"
                                />
                            </label>
                            <label htmlFor="email-input" className="simple-profile-label">
                                email:
                                <input
                                    id="email-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailChanged(true);
                                    }}
                                    className="simple-profile-input-field"
                                />
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setPasswordChanged(true);
                                }}
                                className="simple-profile-input-field-password"
                                placeholder="새 비밀번호를 입력하세요"
                            />
                            <input
                                type="password"
                                value={newPasswordConfirm}
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                className="simple-profile-input-field-password"
                                placeholder="새 비밀번호를 한 번 더 입력하세요"
                            />
                            <button type="submit" style={{ display: 'none' }}>Save</button>
                            {/* 숨겨진 제출 버튼 */}
                        </form>
                    ) : (
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="simple-profile-input-field-password"
                                placeholder="현재 비밀번호를 입력하세요"
                            />
                            <button onClick={verifyCurrentPassword} className="simple-profile-custom-button">
                                비밀번호 확인
                            </button>
                        </div>
                    )
                ) : (
                    <>
                        <span style={{ marginTop: '10px' }}>{nickname}</span>
                        <span style={{ marginTop: '5px', color: 'gray' }}>{email}</span>
                    </>
                )}
            </div>

            {/* 오른쪽: "프로필 편집" 버튼 */}
            <div style={{ alignSelf: 'flex-start' }}>
                <button onClick={handleSettingsClick} className="simple-profile-custom-button">
                    {editing ? (currentPasswordVerified ? "저장" : "취소") : "프로필 편집"}
                </button>
            </div>
        </div>
    );
};

export default Profile;

