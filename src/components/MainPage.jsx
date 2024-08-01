import React, { useEffect, useState } from 'react';
import ArtistGroupService from '../service/ArtistGroupService'; // 서비스 임포트
import './MainPage.css'; // 기존 스타일 파일

const MainPage = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [artistProfiles, setArtistProfiles] = useState([]);

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups('', 0, 15); // 페이지 0, 크기 15로 호출
                setArtistGroups(data); // 상태 업데이트
            } catch (error) {
                console.error('Error fetching artist groups:', error);
            }
        };

        const fetchAllArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getAllArtistGroups(); // 모든 아티스트 그룹 조회
                console.log(data)
                setArtistProfiles(data); // 모든 아티스트 그룹 저장

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
                    <button className="login-button">로그인</button>
                    <button className="signup-button">회원가입</button>
                </div>
            </header>
            <div className="ranking-section">
                <h2>아티스트 그룹 랭킹</h2>
                <div className="ranking-section">
                    <ul className="ranking-list">
                        {/* 1위 항목 */}
                        <li key={artistGroups[0]?.id} className="ranking-item first">
                            <span className="ranking-position">1위</span>
                            <img src={artistGroups[0]?.artistProfilePicture} alt={artistGroups[0]?.groupName}
                                 className="artist-image"/>
                            <span className="group-name">{artistGroups[0]?.groupName}</span>
                        </li>
                    </ul>
                    <ul className="ranking-list">
                        {/* 2위부터 15위까지 항목 */}
                        {artistGroups.slice(1, 15).map((group, index) => (
                            <li key={group?.id} className="ranking-item">
                                <span className="ranking-position">{index + 2}위</span>
                                <img src={group?.artistProfilePicture} alt={group?.groupName} className="artist-image"/>
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
                            <li key={artist?.id} className="profile-item">
                                <img src={artist?.artistProfilePicture} alt={artist?.artistName}
                                     className="artist-profile-image"/>
                                <span className="profile-group-name">{artist?.groupName}</span>
                            </li>
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
