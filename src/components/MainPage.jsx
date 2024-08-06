import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link along with useNavigate
import ArtistGroupService from '../service/ArtistGroupService';
import './MainPage.css';

const MainPage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [artistProfiles, setArtistProfiles] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups('', 0, 15); // 페이지 0, 크기 15로 호출
                setArtistGroups(data); // 상태 업데이트
                const data = await ArtistGroupService.getArtistGroups('', 0, 15);
                console.log(data);
                setArtistGroups(data);
            } catch (error) {
                console.error('Error fetching artist groups:', error);
            }
        };

        const fetchAllArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getAllArtistGroups(); // 모든 아티스트 그룹 조회
                setArtistProfiles(data); // 모든 아티스트 그룹 저장
                const data = await ArtistGroupService.getAllArtistGroups();
                console.log(data);
                setArtistProfiles(data);
            } catch (error) {
                console.error('Error fetching all artist groups:', error);
            }
        };

        fetchArtistGroups();
        fetchAllArtistGroups();
    }, []);

    return (
        <div className="main-page">
            <header className="header">
                <div className="logo">FanTree House</div>
                <div className="search-container">
                    <input type="text" placeholder="검색..." className="search-input"/>
                    <button className="search-button">검색</button>
                </div>
                <div className="auth-buttons">
                    <button className="login-button" onClick={() => navigate('/login')}>로그인</button> {/* Navigate to LoginPage */}
                    <button className="signup-button" onClick={() => navigate('/signup')}>회원가입</button> {/* Navigate to SignupForm */}
                </div>
            </header>
            <div className="ranking-section">
                <h2>아티스트 그룹 랭킹</h2>
                <div className="ranking-section">
                    <ul className="ranking-list">
                        {/* 1위 항목 */}
                        <li key={artistGroups[0]?.id} className="ranking-item first">
                            <span className="ranking-position">1위</span>
                            <img src={artistGroups[0]?.artistGroupProfileImageUrl} alt={artistGroups[0]?.groupName}
                                 className="artist-image"/>
                            <span className="group-name">{artistGroups[0]?.groupName}</span>
                        </li>
                    </ul>
                    <ul className="ranking-list">
                        {/* 2위부터 15위까지 항목 */}
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