import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtistGroupService from '../service/ArtistGroupService';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import { useAuthDispatch } from '../context/AuthContext';
import './MainPage.css';

const MainPage = () => {

    const dispatch = useAuthDispatch();

    useEffect(() => {
        // 로컬 스토리지에서 새로 고침 여부 확인
        const hasRefreshed = localStorage.getItem('hasRefreshed');

        if (!hasRefreshed) {
            // 새로 고침하지 않은 경우, 새로 고침 수행
            window.location.reload();

            // 로컬 스토리지에 새로 고침 상태 저장
            localStorage.setItem('hasRefreshed', 'true');
        }

        // 컴포넌트가 언마운트될 때 로컬 스토리지 초기화 (원하는 경우)
        return () => {
            localStorage.removeItem('hasRefreshed');
        };
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: user,
            });
        }
    }, [dispatch]);

    const [artistGroups, setArtistGroups] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artistProfiles, setArtistProfiles] = useState([]);

    useEffect(() => {
        const fetchArtistGroups = async () => {
            try {
                const data = await ArtistGroupService.getArtistGroups();
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                // 마지막 인덱스를 넘지 않도록 설정
                if (prevIndex >= Math.floor((artistGroups.length - 2) / 2)) {
                    return 0; // 처음으로 돌아감
                }
                return prevIndex + 1; // 다음 인덱스로 이동
            });
        }, 10000); // 10초마다 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [artistGroups.length]);

    const getCurrentGroups = () => {
        return artistGroups.slice(currentIndex * 2 + 1, currentIndex * 2 + 3); // 2위부터 15위까지 2개씩 반환
    };

    return (
        <div className="main-page">
            <header className="header">
                <Header />
            </header>
            <div className="main-content">
                <div className="ranking-section">
                    <h2>아티스트 그룹 랭킹</h2>
                    <ul className="ranking-list">
                        <li key={artistGroups[0]?.id} className="ranking-item first">
                            <span className="ranking-position">1위</span>
                            <img src={artistGroups[0]?.artistGroupProfileImageUrl} alt={artistGroups[0]?.groupName}
                                 className="artist-image"/>
                            <span className="group-name">{artistGroups[0]?.groupName}</span>
                            <span className="subscribe-count">구독자 수 : {artistGroups[0]?.subscribeCount}</span>
                        </li>
                        {getCurrentGroups().map((group, index) => (
                            <li key={group?.id} className="ranking-item">
                                <span className="ranking-position">{currentIndex * 2 + index + 2}위</span>
                                <img src={group?.artistGroupProfileImageUrl} alt={group?.groupName}
                                     className="artist-image"/>
                                <span className="group-name">{group?.groupName}</span>
                                <span className="subscribe-count">구독자 수 : {group?.subscribeCount}</span>
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
                                to={`/group/${artist.groupName}?enter=${artist.enterName}`}
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