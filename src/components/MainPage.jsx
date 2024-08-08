import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArtistGroupService from '../service/ArtistGroupService';
import './MainPage.css';

const MainPage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [artistProfiles, setArtistProfiles] = useState([]);
    const [loginType, setLoginType] = useState(null); // 로그인 타입 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups('', 0, 15);
                setArtistGroups(data);
            } catch (error) {
                console.error('Error fetching artist groups:', error);
            }
        };

        const fetchAllArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getAllArtistGroups();
                setArtistProfiles(data);
            } catch (error) {
                console.error('Error fetching all artist groups:', error);
            }
        };

        fetchArtistGroups();
        fetchAllArtistGroups();
    }, []);

    // 로그인 상태를 업데이트하는 함수 (예시로 사용)
    const handleLogin = (type) => {
        setLoginType(type);
        navigate('/'); // 메인 페이지로 이동
    };

    const renderAuthButtons = () => {
        if (!loginType) {
            return (
                <>
                    <button className="login-button" onClick={() => navigate('/login')}>로그인</button>
                    <button className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
                </>
            );
        }

        switch (loginType) {
            case 'USER':
                return (
                    <>
                        <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                        <button onClick={() => handleLogout()}>로그아웃</button>
                    </>
                );
            case 'ADMIN':
                return (
                    <>
                        <button onClick={() => navigate('/admin')}>관리자 버튼</button>
                        <button onClick={() => handleLogout()}>로그아웃</button>
                    </>
                );
            case 'ENTER':
                return (
                    <>
                        <button onClick={() => navigate('/create-artist')}>엔터 생성</button>
                        <button onClick={() => navigate('/create-artist-group')}>아티스트 그룹 생성</button>
                        <button onClick={() => handleLogout()}>로그아웃</button>
                    </>
                );
            case 'ARTIST':
                return (
                    <>
                        <button onClick={() => navigate('/create-post')}>게시글 작성</button>
                        <button onClick={() => handleLogout()}>로그아웃</button>
                    </>
                );
            default:
                return null;
        }
    };

    const handleLogout = () => {
        setLoginType(null); // 로그인 타입 초기화
        navigate('/'); // 메인 페이지로 이동
    };

    return (
        <div className="main-page">
            <header className="header">
                <div className="logo">FanTree House</div>
                <div className="search-container">
                    <input type="text" placeholder="검색..." className="search-input"/>
                    <button className="search-button">검색</button>
                </div>
                <div className="auth-buttons">
                    {renderAuthButtons()} {/* 권한별 버튼 렌더링 */}
                </div>
            </header>
            <div className="ranking-section">
                <h2>아티스트 그룹 랭킹</h2>
                <div className="ranking-section">
                    <ul className="ranking-list">
                        <li key={artistGroups[0]?.id} className="ranking-item first">
                            <span className="ranking-position">1위</span>
                            <img src={artistGroups[0]?.artistGroupProfileImageUrl} alt={artistGroups[0]?.groupName}
                                 className="artist-image"/>
                            <span className="group-name">{artistGroups[0]?.groupName}</span>
                        </li>
                    </ul>
                    <ul className="ranking-list">
                        {artistGroups.slice(1, 15).map((group, index) => (
                            <li key={group?.id} className="ranking-item">
                                <span className="ranking-position">{index + 2}위</span>
                                <img src={group?.artistGroupProfileImageUrl} alt={group?.groupName} className="artist-image"/>
                                <span className="group-name">{group?.groupName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="profile-section">
                <h2>아티스트 프로필</h2>
                <ul className="profile-list">
                    {artistProfiles.length > 0 ? (
                        artistProfiles.map((artist) => (
                            <Link
                                to={`/group/${artist.groupName}`}
                                key={artist?.id}
                                className="profile-item"
                            >
                                <img src={artist?.artistGroupProfileImageUrl} alt={artist?.artistName}
                                     className="artist-profile-image"/>
                                <span className="profile-group-name">{artist?.groupName}</span>
                            </Link>
                        ))
                    ) : (
                        <li>아티스트 프로필이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;